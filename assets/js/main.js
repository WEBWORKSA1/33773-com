/* 33773.com — site behaviour. No dependencies. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* Relay endpoint is assembled at runtime so the inbox address never appears in page markup. */
  function relay() {
    var p = (S._k || []).map(function (x) { return atob(x).split("").reverse().join(""); });
    return "https://formsubmit.co/ajax/" + p.join("@");
  }

  /* Mobile menu */
  var mb = $(".menu-btn"), nav = $(".nav");
  if (mb && nav) mb.addEventListener("click", function () {
    var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o ? "true" : "false");
  });

  /* Year */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Hurricane-season tracker (Atlantic season: June 1 – November 30) */
  var sz = $("[data-season]");
  if (sz) {
    var now = new Date(), y = now.getFullYear();
    var start = new Date(y, 5, 1), end = new Date(y, 10, 30, 23, 59);
    var day = 864e5, status, pct;
    if (now < start) {
      status = Math.ceil((start - now) / day) + " days until the season opens";
      pct = 0;
    } else if (now > end) {
      var next = new Date(y + 1, 5, 1);
      status = "Off-season. " + Math.ceil((next - now) / day) + " days to June 1";
      pct = 100;
    } else {
      var left = Math.ceil((end - now) / day);
      var d = Math.floor((now - start) / day) + 1;
      var peak = now >= new Date(y, 7, 15) && now <= new Date(y, 9, 15);
      status = "In season: day " + d + ". " + left + " days left" + (peak ? " (peak window)" : "");
      pct = Math.min(100, (now - start) / (end - start) * 100);
    }
    $("[data-season-status]", sz).textContent = status;
    $(".track .now", sz).style.left = pct + "%";
  }

  /* Cookie / ads notice */
  var ck = $(".cookie");
  if (ck && !store("ck33773")) ck.classList.add("show");
  $$("[data-cookie]").forEach(function (b) {
    b.addEventListener("click", function () { store("ck33773", b.getAttribute("data-cookie")); ck.classList.remove("show"); });
  });

  /* Forms: every form with data-form posts to the relay */
  $$("form[data-form]").forEach(function (f) {
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var msg = $(".form-msg", f), btn = $("[type=submit]", f);
      if (f.querySelector(".hp input") && f.querySelector(".hp input").value) return;
      if (!f.checkValidity()) { f.reportValidity(); return; }
      var data = {};
      new FormData(f).forEach(function (v, k) { if (k !== "_hp") data[k] = data[k] ? data[k] + ", " + v : v; });
      data._subject = "[33773.com] " + (f.getAttribute("data-form") || "form") + " submission";
      data._template = "table";
      data._captcha = "false";
      data.page = location.pathname;
      if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending…"; }
      fetch(relay(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.j.success) === "false") throw new Error(res.j.message || "Relay rejected");
          var go = f.getAttribute("data-next");
          if (go) { location.href = go; return; }
          if (msg) { msg.className = "form-msg ok"; msg.textContent = f.getAttribute("data-ok") || "Sent. We'll reply within two business days."; }
          f.reset();
        })
        .catch(function () {
          if (msg) { msg.className = "form-msg err"; msg.textContent = "That didn't send. Check your connection and press the button again."; }
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t; } });
    });
  });

  /* Multi-step quote form */
  $$("[data-steps]").forEach(function (f) {
    var steps = $$(".step", f), bars = $$(".steps-bar i", f), i = 0;
    var pre = new URLSearchParams(location.search).get("service");
    if (pre) { var r = f.querySelector('input[name="service"][value="' + pre + '"]'); if (r) r.checked = true; }
    function show(n, quiet) {
      i = n; steps.forEach(function (s, k) { s.classList.toggle("on", k === n); });
      bars.forEach(function (b, k) { b.classList.toggle("on", k <= n); });
      var h = steps[n].querySelector("h3, .legend"); if (h && !quiet) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
    function valid(n) {
      var ok = true;
      $$("input,select,textarea", steps[n]).forEach(function (el) { if (ok && !el.checkValidity()) { el.reportValidity(); ok = false; } });
      return ok;
    }
    $$("[data-next-step]", f).forEach(function (b) { b.addEventListener("click", function () { if (valid(i)) show(i + 1); }); });
    $$("[data-prev-step]", f).forEach(function (b) { b.addEventListener("click", function () { show(i - 1); }); });
    show(0, true);
  });

  /* Prefill contest / support forms from links */
  var q = new URLSearchParams(location.search);
  $$("[data-prefill]").forEach(function (el) { var v = q.get(el.getAttribute("data-prefill")); if (v) el.value = v; });

  /* In-page links that preselect a form option (contest, package, role, amount) */
  [["data-contest", "#c-contest"], ["data-pkg", "#a-pkg"], ["data-role", "#j-role"]].forEach(function (p) {
    $$("[" + p[0] + "]").forEach(function (a) {
      a.addEventListener("click", function () { var s = $(p[1]); if (s) s.value = a.getAttribute(p[0]); });
    });
  });
  $$("[data-amt]").forEach(function (a) {
    a.addEventListener("click", function () {
      var r = document.querySelector('input[name="amount"][value="$' + a.getAttribute("data-amt") + '"]'); if (r) r.checked = true;
    });
  });

  /* Lightweight YouTube embeds: thumbnail first, iframe on click (privacy-enhanced domain) */
  $$(".video[data-yt]").forEach(function (v) {
    var id = v.getAttribute("data-yt");
    v.innerHTML = '<img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg"><button type="button" aria-label="Play video: ' + (v.getAttribute("data-title") || "video") + '">&#9658;</button>';
    v.addEventListener("click", function () {
      v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (v.getAttribute("data-title") || "Video") + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }, { once: true });
  });

  /* Support page: payment buttons switch on when links exist in config */
  var pay = S.payments || {};
  $$("[data-pay]").forEach(function (a) {
    var u = pay[a.getAttribute("data-pay")];
    if (u) { a.href = u; a.hidden = false; a.target = "_blank"; a.rel = "noopener"; }
  });
  var anyPay = Object.keys(pay).some(function (k) { return pay[k]; });
  $$("[data-pay-none]").forEach(function (el) { el.hidden = anyPay; });

  /* ---------- Tools ---------- */
  function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
  function num(id) { var el = document.getElementById(id); return el ? parseFloat(el.value) || 0 : 0; }

  /* Storm kit calculator: Ready.gov baseline of 1 gallon water per person per day */
  var kit = $("#kit-calc");
  if (kit) {
    var runKit = function () {
      var p = num("k-people"), pets = num("k-pets"), d = num("k-days");
      var water = p * d + pets * d * 0.5;
      var meals = p * d * 3;
      $("#k-water").textContent = Math.ceil(water) + " gal";
      $("#k-meals").textContent = meals + " meals";
      $("#k-meds").textContent = Math.max(7, d) + " days";
      $("#k-cash").textContent = money(Math.max(200, p * 100));
    };
    kit.addEventListener("input", runKit); runKit();
  }

  /* Mortgage + taxes + insurance (PITI) */
  var mc = $("#mort-calc");
  if (mc) {
    var runM = function () {
      var price = num("m-price"), down = num("m-down"), rate = num("m-rate") / 100 / 12, yrs = num("m-years");
      var tax = num("m-tax"), ins = num("m-ins"), flood = num("m-flood"), hoa = num("m-hoa");
      var loan = Math.max(0, price - down), n = yrs * 12;
      var pi = rate ? loan * rate / (1 - Math.pow(1 + rate, -n)) : loan / Math.max(n, 1);
      var total = pi + tax / 12 + ins / 12 + flood / 12 + hoa;
      $("#m-total").textContent = money(total) + "/mo";
      $("#m-break").textContent = "Principal & interest " + money(pi) + " · Tax " + money(tax / 12) + " · Wind/home insurance " + money(ins / 12) + " · Flood " + money(flood / 12) + " · HOA " + money(hoa);
    };
    mc.addEventListener("input", runM); runM();
  }

  /* Homestead savings estimate */
  var hs = $("#home-calc");
  if (hs) {
    var runH = function () {
      var av = num("h-av"), mills = num("h-mills"), school = num("h-school");
      var first = Math.min(25000, av);
      var second = Math.max(0, Math.min(26411, av - 50000));
      var save = first * mills / 1000 + second * Math.max(0, mills - school) / 1000;
      $("#h-save").textContent = money(save) + "/yr";
      $("#h-detail").textContent = "First $25,000 exemption saves " + money(first * mills / 1000) + "; additional exemption (non-school levies) saves " + money(second * Math.max(0, mills - school) / 1000) + ".";
    };
    hs.addEventListener("input", runH); runH();
  }

  /* Go-bag checklist with saved progress */
  $$("[data-checklist]").forEach(function (list) {
    var key = "cl-" + list.getAttribute("data-checklist");
    var saved = {}; try { saved = JSON.parse(store(key) || "{}"); } catch (e) {}
    var boxes = $$("input[type=checkbox]", list), meter = $("[data-meter='" + list.getAttribute("data-checklist") + "']");
    function upd() {
      var done = boxes.filter(function (b) { return b.checked; }).length;
      if (meter) { $("i", meter).style.width = (done / boxes.length * 100) + "%"; }
      var c = $("[data-count='" + list.getAttribute("data-checklist") + "']"); if (c) c.textContent = done + " of " + boxes.length + " packed";
    }
    boxes.forEach(function (b, k) {
      b.checked = !!saved[k];
      b.addEventListener("change", function () { saved[k] = b.checked; store(key, JSON.stringify(saved)); upd(); });
    });
    upd();
  });

  /* Flood-risk self-check → routes to the right quote */
  var fq = $("#risk-quiz");
  if (fq) fq.addEventListener("change", function () {
    var score = $$("input:checked", fq).reduce(function (a, b) { return a + parseInt(b.value, 10); }, 0);
    var out = $("#risk-out"), lvl, txt;
    if (score >= 6) { lvl = "High exposure"; txt = "Your answers point to real flood exposure. A flood policy has a 30-day wait for NFIP coverage, so price one before the next storm is named."; }
    else if (score >= 3) { lvl = "Moderate exposure"; txt = "Low-lying streets and heavy-rain flooding hit inland Largo too. Compare an NFIP quote with a private flood quote."; }
    else { lvl = "Lower exposure"; txt = "Lower doesn't mean none: FEMA reports that more than 20% of flood insurance claims come from outside high-risk zones, and lower-risk properties usually price lower."; }
    out.hidden = false; $("b", out).textContent = lvl; $("p", out).textContent = txt;
  });
})();
