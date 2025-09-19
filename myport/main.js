// ปีในฟุตเตอร์
var y = document.getElementById('year');
if (y) { y.textContent = new Date().getFullYear(); }

// โหมดสว่าง/มืด
var root = document.documentElement;
var modeBtn = document.getElementById('mode');
var saved = localStorage.getItem('theme');
if (saved === 'light') { root.classList.add('light'); }
if (modeBtn) {
  modeBtn.addEventListener('click', function () {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  });
}

// Counter animation
var counters = Array.prototype.slice.call(document.querySelectorAll('.counter'));
function animateCounters() {
  counters.forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target') || '0', 10);
    var cur = parseInt(el.textContent || '0', 10);
    if (cur < target) { el.textContent = String(cur + 1); }
  });
  var unfinished = counters.some(function (el) {
    return parseInt(el.textContent || '0', 10) <
           parseInt(el.getAttribute('data-target') || '0', 10);
  });
  if (unfinished) { requestAnimationFrame(animateCounters); }
}
var counterIO = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { requestAnimationFrame(animateCounters); counterIO.disconnect(); }
  });
});
counters.forEach(function (c) { counterIO.observe(c); });

// Scroll reveal
var revealIO = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revealIO.unobserve(e.target); }
  });
}, { threshold: 0.1 });
Array.prototype.forEach.call(document.querySelectorAll('.reveal'),
  function (el) { revealIO.observe(el); }
);

// Simple marquee
var mq = document.querySelector('.marquee');
if (mq) {
  var start = 0;
  var speed = 30;
  function tick() {
    if (getComputedStyle(mq).whiteSpace !== 'nowrap') { return; }
    start -= speed / 60;
    mq.scrollLeft = -start;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Fit text ให้พอดีกล่องแบบเรียลไทม์
function fit(el) {
  var max = 40, min = 20, size = max;
  el.style.fontSize = size + 'px';
  var parent = el.parentElement; if (!parent) return;
  while (el.scrollWidth > parent.clientWidth && size > min) {
    size -= 1; el.style.fontSize = size + 'px';
  }
}
var fitEls = Array.prototype.slice.call(document.querySelectorAll('[data-fit]'));
var ro = new ResizeObserver(function () { fitEls.forEach(fit); });
fitEls.forEach(function (el) { fit(el); ro.observe(el.parentElement || el); });
