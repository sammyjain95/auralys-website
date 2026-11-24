/* ==========================================================================
   Auralys AI — shared mobile navigation.
   One menu pattern for every page. The breakpoint (1340px) and the panel
   styling live in assets/css/main.css. Each page carries the same two
   pieces of markup: a <button class="hamburger" id="hbg"
   onclick="toggleMMenu()"> inside the <nav>, and a
   <div class="mobile-menu" id="mmenu"> right after the </nav>.
   The menu lists the full standard nav (Consulting, Engagement,
   Portfolio, Insights, Secure AI, Webinars, Case Studies, FAQ,
   Contact Us) on every page, so mobile visitors always reach
   everything; the Book button in the menu mirrors the page's own
   desktop call to action.
   ========================================================================== */
(function () {
  var mOpen = false;
  var btn = document.getElementById('hbg');
  var menu = document.getElementById('mmenu');
  if (!btn || !menu) return;

  function toggleMMenu() {
    mOpen = !mOpen;
    btn.classList.toggle('open', mOpen);
    btn.setAttribute('aria-expanded', String(mOpen));
    menu.classList.toggle('open', mOpen);
    document.body.style.overflow = mOpen ? 'hidden' : '';
  }

  function closeMMenu() {
    if (!mOpen) return;
    mOpen = false;
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Inline onclick="toggleMMenu()" on the button needs globals. */
  window.toggleMMenu = toggleMMenu;
  window.closeMMenu = closeMMenu;

  /* Close when the user taps outside the panel or the button. */
  document.addEventListener('click', function (e) {
    if (mOpen && !e.target.closest('#mmenu') && !e.target.closest('#hbg')) closeMMenu();
  });

  /* Close on Escape, on any menu link tap, and when the viewport
     grows back past the mobile breakpoint. */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMMenu();
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMMenu();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1340 && mOpen) closeMMenu();
  });
})();
