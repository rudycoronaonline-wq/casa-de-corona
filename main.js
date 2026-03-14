// ── MOBILE NAV ──
function toggleNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}

// Close mobile nav when clicking a link
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.mobile-nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.getElementById('mobileNav').classList.remove('open');
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
var RATE = 320;

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
  var tot = sub - disc;

  document.getElementById('priceBox').style.display = 'block';
  document.getElementById('prNightly').textContent  = '$' + RATE + '/night';
  document.getElementById('prNights').textContent   = nights + ' night' + (nights !== 1 ? 's' : '');
  document.getElementById('prSubtotal').textContent = '$' + sub.toLocaleString();
  document.getElementById('prTotal').textContent    = '$' + tot.toLocaleString();
  document.getElementById('prDeposit').textContent  = '$' + Math.round(tot * 0.5).toLocaleString();
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

// ── BOOKING SUBMIT ──
function submitBooking(e) {
  e.preventDefault();
  // Connect to Tally form — open in same tab so user completes booking there
  window.location.href = 'https://tally.so/r/Ek0qdA';
}
