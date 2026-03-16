// ── MOBILE NAV ──
function toggleNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// Close mobile nav when clicking a link (supports both .mobile-nav and .nav-mobile)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mobile-nav a, .nav-mobile a').forEach(function (a) {
    a.addEventListener('click', function () {
      var m = document.getElementById('mobileNav') || document.getElementById('navMobile');
      if (m) m.classList.remove('open');
    });
  });
});

// ── NAV SCROLL ──
window.addEventListener('scroll', function () {
  document.querySelector('nav').style.background =
    window.scrollY > 60 ? 'rgba(10,22,40,1)' : 'rgba(10,22,40,0.97)';
});

// ── LIGHTBOX ──
var lbData = [];
var lbIdx = 0;

function initLightbox() {
  lbData = [];
  document.querySelectorAll('.gfull img, .gc img').forEach(function (img) {
    lbData.push({ s: img.src, c: img.alt });
  });
}

function openLightbox(i) {
  initLightbox();
  lbIdx = i;
  showLightbox();
  document.getElementById('lightbox').classList.add('on');
  document.body.style.overflow = 'hidden';
}

function showLightbox() {
  if (!lbData[lbIdx]) return;
  document.getElementById('lbImg').src  = lbData[lbIdx].s;
  document.getElementById('lbCap').textContent = lbData[lbIdx].c;
  document.getElementById('lbNum').textContent  = (lbIdx + 1) + ' / ' + lbData.length;
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('on');
  document.body.style.overflow = '';
}

function lbNav(dir) {
  lbIdx = (lbIdx + dir + lbData.length) % lbData.length;
  showLightbox();
}

document.addEventListener('keydown', function (e) {
  if (!document.getElementById('lightbox').classList.contains('on')) return;
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'Escape')     closeLightbox();
});

// ── PRICE CALCULATOR ──
var RATE = 210;
var CLEANING_FEE = 60;
var SECURITY_DEPOSIT = 500;

function calcPrice() {
  var ci = document.getElementById('checkin');
  var co = document.getElementById('checkout');
  if (!ci || !co || !ci.value || !co.value) return;

  var nights = Math.round((new Date(co.value) - new Date(ci.value)) / 86400000);
  if (nights < 1) return;

  var disc = 0, discLabel = '';
  if (nights >= 7) {
    disc = Math.round(nights * RATE * 0.1);
    discLabel = '10% weekly discount';
  }

  var sub = nights * RATE;
  var tot = sub - disc + CLEANING_FEE;

  document.getElementById('priceBox').style.display = 'block';
  document.getElementById('prNightly').textContent  = '$' + RATE + '/night';
  document.getElementById('prNights').textContent   = nights + ' night' + (nights !== 1 ? 's' : '');
  document.getElementById('prSubtotal').textContent = '$' + sub.toLocaleString();
  document.getElementById('prCleaning').textContent = '$' + CLEANING_FEE;
  document.getElementById('prTotal').textContent    = '$' + tot.toLocaleString();
  document.getElementById('prDeposit').textContent  = '$' + Math.round(tot * 0.5).toLocaleString();
  document.getElementById('prSecurity').textContent  = '$' + SECURITY_DEPOSIT.toLocaleString();
  document.getElementById('prSavings').textContent  = '~$' + Math.round(tot * 0.18).toLocaleString();

  var discRow = document.getElementById('discRow');
  if (disc > 0) {
    discRow.style.display = 'flex';
    document.getElementById('discLabel').textContent = discLabel;
    document.getElementById('discAmt').textContent   = '-$' + disc.toLocaleString();
  } else {
    discRow.style.display = 'none';
  }
}

// ── BOOKING SUBMIT (stays on page, no redirect) ──
// Replace with your Formspree form ID from https://formspree.io (e.g. formspree.io/f/xyzabc → use xyzabc)
var BOOKING_FORM_ENDPOINT = 'https://formspree.io/f/mvzwbopj';

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('bookingForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = document.getElementById('bookingSubmitBtn');
    var errEl = document.getElementById('bookingError');
    var thankYou = document.getElementById('bookingThankYou');
    if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    var data = {};
    var names = ['first_name', 'last_name', 'email', 'phone', 'check_in', 'check_out', 'guests', 'how_heard', 'special_requests'];
    names.forEach(function (name) {
      var input = form.querySelector('[name="' + name + '"]');
      if (input && input.value) data[name] = input.value.trim();
    });
    var prTotal = document.getElementById('prTotal');
    var prDeposit = document.getElementById('prDeposit');
    var prSecurity = document.getElementById('prSecurity');
    if (prTotal && prTotal.textContent) data.estimated_total = prTotal.textContent;
    if (prDeposit && prDeposit.textContent) data.deposit = prDeposit.textContent;
    if (prSecurity && prSecurity.textContent) data.security_deposit = prSecurity.textContent;
    fetch(BOOKING_FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          if (thankYou) thankYou.style.display = 'block';
        } else {
          throw new Error('Something went wrong. Please try again or email casadecoronavr@gmail.com');
        }
      })
      .catch(function (err) {
        if (errEl) {
          errEl.textContent = err.message || 'Could not send. Please email casadecoronavr@gmail.com';
          errEl.style.display = 'block';
        }
        if (btn) { btn.disabled = false; btn.textContent = 'Submit Booking Request →'; }
      });
    return false;
  });
});
