(function(){
  var LINKS = [
    ['¿Qué es?', 'que-es.html', 'que-es.html'],
    ['Modelo conceptual', 'Marco WISE.dc.html', 'marco-wise.html'],
    ['Criterios de selección', 'Criterios de Seleccion.dc.html', 'criterios-de-seleccion.html']
  ];
  var DC = location.pathname.indexOf('.dc.html') > -1;
  function href(l){ return DC ? l[1] : l[2]; }
  var CASES = DC ? 'Casos.dc.html' : 'casos.html';
  var AREAS = DC ? 'Lineas de Reforma.dc.html' : 'lineas-de-reforma.html';

  /* ── Push platform header below #sih (mobile only) ───────────────── */
  function adjustForSih(navWrapper) {
    if (document.getElementById('__sih-adj')) return;
    var sih = document.getElementById('sih');
    if (!sih) return;

    /* Mark platform header for CSS targeting */
    if (navWrapper) navWrapper.setAttribute('data-plat-header', '');

    var sihH = sih.offsetHeight || 63;
    /* Platform header height — measure navWrapper if available, else fall back */
    var platH = (navWrapper && navWrapper.offsetHeight) ? navWrapper.offsetHeight : 72;

    /* Add hamburger icon to #sih-right if not already there */
    var sihRight = document.getElementById('sih-right');
    if (sihRight && !document.getElementById('__sih-burger')) {
      var burger = document.createElement('div');
      burger.id = '__sih-burger';
      burger.innerHTML =
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
        '<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>';
      burger.style.cssText = 'display:flex;align-items:center;justify-content:center;margin-left:10px;cursor:pointer;color:#333';
      sihRight.appendChild(burger);
    }

    document.documentElement.style.setProperty('--sih-plat-top', sihH + 'px');
    var style = document.createElement('style');
    style.id = '__sih-adj';
    style.textContent =
      '@media(max-width:900px){' +
        '[data-plat-header]{top:var(--sih-plat-top)!important}' +
        '[data-m="spacer"]{height:' + platH + 'px!important}' +
        '#sih-search{display:flex!important}' +
        '#sih-flags{display:flex!important;align-items:center;gap:6px}' +
        '#sih-social{display:none!important}' +
        '#sih-right{flex-shrink:0!important}' +
      '}';
    document.head.appendChild(style);
    window.addEventListener('scroll', function() {
      if (window.innerWidth > 900) return;
      var scrollY = window.scrollY || window.pageYOffset;
      document.documentElement.style.setProperty('--sih-plat-top', Math.max(0, sihH - scrollY) + 'px');
    }, {passive: true});
  }

  /* ── Mobile-only hero image (home page) ──────────────────────────── */
  function patchHomeHero() {
    if (!location.pathname.match(/index(\.html)?$|\/$|\/index$/)) return;
    if (document.getElementById('__hero-mob-style')) return;
    function inject() {
      var bgEl = Array.from(document.querySelectorAll('[style*="hero-story"]'))[0];
      if (!bgEl) return false;
      bgEl.classList.add('__hero-bg');
      var s = document.createElement('style');
      s.id = '__hero-mob-style';
      s.textContent =
        '@media(max-width:900px){' +
          '.__hero-bg{' +
            'background-image:url("assets/hero-mobile.png")!important;' +
            'background-position:center center!important' +
          '}' +
        '}';
      document.head.appendChild(s);
      return true;
    }
    if (!inject()) {
      var obs = new MutationObserver(function() { if (inject()) obs.disconnect(); });
      obs.observe(document.body, {childList:true, subtree:true});
      setTimeout(function() { obs.disconnect(); }, 5000);
    }
  }
  patchHomeHero();

  /* ── Platform mobile hamburger ────────────────────────────────────── */
  class MobileNav extends HTMLElement {
    connectedCallback(){
      if(this._mounted) return; this._mounted = true;
      var self = this;

      var navWrapper = this.closest('div[data-noprint]');
      adjustForSih(navWrapper);

      this.innerHTML =
        '<button type="button" aria-expanded="false" aria-label="Abrir menú" ' +
        'style="width:44px;height:44px;border-radius:50%;border:1.5px solid rgba(255,255,255,0.7);background:none;color:#fff;' +
        'display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">' +
        '<line x1="3" y1="7" x2="21" y2="7"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="17" x2="21" y2="17"></line></svg></button>' +
        '<div data-drawer hidden style="position:fixed;left:0;right:0;bottom:0;z-index:70;background:rgba(13,36,42,.5);display:flex;flex-direction:column;justify-content:flex-start">' +
          '<div data-sheet style="background:#fff;padding:18px clamp(20px,5vw,28px) 26px;box-shadow:0 18px 34px -14px rgba(13,74,87,.4);overflow-y:auto;max-height:100%">' +
            '<nav style="display:flex;flex-direction:column;gap:2px;margin-bottom:20px">' +
              LINKS.map(function(l){
                return '<a href="' + href(l) + '" style="font-family:Lato,sans-serif;font-size:17px;font-weight:600;color:#0D4A57;text-decoration:none;padding:15px 2px;border-bottom:1px solid #ECF1EF;display:flex;align-items:center;justify-content:space-between">' + l[0] +
                  '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8CA0A5" stroke-width="2.2" aria-hidden="true"><polyline points="9 6 15 12 9 18"></polyline></svg></a>';
              }).join('') +
            '</nav>' +
            '<a href="' + AREAS + '" style="font-family:Lato,sans-serif;display:flex;align-items:center;justify-content:center;border:1.5px solid #0D4A57;background:#fff;color:#0D4A57;font-size:14px;letter-spacing:.03em;padding:15px 22px;border-radius:999px;text-decoration:none;margin-bottom:10px">ÁREAS DE REFORMA</a>' +
            '<a href="' + CASES + '" style="font-family:Lato,sans-serif;display:flex;align-items:center;justify-content:center;border:1.5px solid #0D4A57;background:#0D4A57;color:#fff;font-size:14px;letter-spacing:.03em;padding:15px 22px;border-radius:999px;text-decoration:none">EXPLORAR CASOS</a>' +
          '</div>' +
        '</div>';

      var btn = this.querySelector('button');
      var drawer = this.querySelector('[data-drawer]');
      var sheet = this.querySelector('[data-sheet]');

      function place(){
        var hdr = self.closest('nav') ? self.closest('nav').parentElement : null;
        var h = hdr ? hdr.getBoundingClientRect().bottom : 72;
        drawer.style.top = Math.max(0, h) + 'px';
      }
      function open(){
        place();
        drawer.hidden = false;
        btn.setAttribute('aria-expanded','true');
        btn.setAttribute('aria-label','Cerrar menú');
        btn.querySelector('svg').innerHTML = '<line x1="6" y1="6" x2="18" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line>';
        document.body.style.overflow = 'hidden';
        document.dispatchEvent(new CustomEvent('platform:nav-open'));
      }
      function close(){
        drawer.hidden = true;
        btn.setAttribute('aria-expanded','false');
        btn.setAttribute('aria-label','Abrir menú');
        btn.querySelector('svg').innerHTML = '<line x1="3" y1="7" x2="21" y2="7"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="17" x2="21" y2="17"></line>';
        document.body.style.overflow = '';
      }
      document.addEventListener('platform:search-open', function(){ if (!drawer.hidden) close(); });
      btn.addEventListener('click', function(){ drawer.hidden ? open() : close(); });
      drawer.addEventListener('click', function(e){ if(e.target === drawer) close(); });
      sheet.addEventListener('click', function(e){ if(e.target.closest('a')) close(); });
      window.addEventListener('keydown', function(e){ if(e.key === 'Escape' && !drawer.hidden) close(); });
      window.addEventListener('resize', function(){
        if(window.innerWidth > 900 && !drawer.hidden) close();
        else if(!drawer.hidden) place();
      });
    }
  }
  if(!customElements.get('mobile-nav')) customElements.define('mobile-nav', MobileNav);

  /* ── Globe ficha modal: full-screen bottom sheet on mobile ─────── */
  (function(){
    var s = document.createElement('style');
    s.textContent =
      '@media(max-width:900px){' +
        /* Overlay: align content to bottom so tapping top area closes */
        '#rg-modal-ov{' +
          'align-items:flex-end!important;' +
          'padding:0!important' +
        '}' +
        /* Inner container: full width, rounded top corners, 88vh max */
        '#rg-modal-ov>div{' +
          'max-width:100%!important;' +
          'width:100%!important;' +
          'border-radius:20px 20px 0 0!important;' +
          'max-height:88vh!important;' +
          'box-shadow:none!important' +
        '}' +
        /* Header: sticky so close button always visible at top */
        '#rg-modal-ov>div>div:first-child{' +
          'position:sticky!important;top:0!important;' +
          'background:#fff!important;z-index:1!important;' +
          'border-radius:20px 20px 0 0!important' +
        '}' +
        /* Table: narrow label column */
        '#rg-modal-body table td:first-child{' +
          'white-space:normal!important;' +
          'width:32%!important' +
        '}' +
      '}';
    document.head.appendChild(s);
  })();

  /* ── Reusable mobile carousel with dots ─────────────────────────── */
  (function(){
    var s = document.createElement('style');
    s.id = '__carousel-base';
    s.textContent = '@media(max-width:900px){[data-mob-car]::-webkit-scrollbar{display:none}}';
    document.head.appendChild(s);
  })();

  function patchCarousel(containerSel) {
    if (window.innerWidth > 900) return;

    function tryPatch() {
      var container = document.querySelector(containerSel);
      if (!container || container.dataset.mobCar) return false;

      var scFor = container.querySelector('sc-for');
      var items = scFor
        ? Array.from(scFor.children).filter(function(c){ return c.tagName !== 'TEMPLATE'; })
        : Array.from(container.children);

      if (items.length < 2) return false;
      container.dataset.mobCar = '1';

      /* Carousel container – stay within parent padding, no negative margins */
      container.style.cssText = container.getAttribute('style') || '';
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.overflowX = 'auto';
      container.style.WebkitOverflowScrolling = 'touch';
      container.style.scrollSnapType = 'x mandatory';
      container.style.scrollbarWidth = 'none';
      container.style.gap = '12px';
      container.style.paddingBottom = '4px';

      if (scFor) scFor.style.display = 'contents';

      /* Card: 88% of container lets ~12% of next card peek through */
      items.forEach(function(item){
        item.style.flex = '0 0 88%';
        item.style.width = '88%';
        item.style.minWidth = '0';
        item.style.scrollSnapAlign = 'start';
        item.style.boxSizing = 'border-box';
        item.style.height = 'auto';
      });

      /* Dots – idénticos al home: 8px círculos, scale(1.5) activo */
      /* Remove ALL stale dot rows after the container (any flex-center row of buttons) */
      var sib = container.nextElementSibling;
      while (sib) {
        var nextSib = sib.nextElementSibling;
        if (sib.children.length > 0 && sib.children[0].tagName === 'BUTTON' &&
            sib.style.display === 'flex' && sib.style.justifyContent === 'center') {
          sib.parentNode.removeChild(sib);
        }
        sib = nextSib;
      }
      var dotsWrap = document.createElement('div');
      dotsWrap.dataset.mobCarDots = '1';
      dotsWrap.style.cssText = 'display:flex;justify-content:center;align-items:center;gap:8px;margin-top:18px;margin-bottom:24px';
      var dotBtns = [];

      function setActive(i) {
        dotBtns.forEach(function(btn, j){
          var active = j === i;
          btn.style.background = active ? '#0D4A57' : '#DCE3E1';
          btn.style.transform  = active ? 'scale(1.5)' : 'scale(1)';
        });
      }

      for (var i = 0; i < items.length; i++) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Ir a tarjeta ' + (i + 1));
        btn.style.cssText = 'width:8px;height:8px;border-radius:50%;border:none;padding:0;' +
          'background:#DCE3E1;cursor:pointer;transition:background .2s,transform .2s';
        dotsWrap.appendChild(btn);
        dotBtns.push(btn);
        (function(idx){
          btn.addEventListener('click', function(){
            container.scrollTo({ left: idx * container.offsetWidth, behavior: 'smooth' });
          });
        })(i);
      }
      container.insertAdjacentElement('afterend', dotsWrap);
      setActive(0);

      container.addEventListener('scroll', function(){
        var w = container.offsetWidth || 1;
        var idx = Math.round(container.scrollLeft / w);
        setActive(Math.max(0, Math.min(idx, dotBtns.length - 1)));
      }, { passive: true });

      /* Delayed cleanup: remove any DC-runtime-created dots that appear after ours */
      setTimeout(function() {
        var s = container.nextElementSibling;
        while (s) {
          var ns = s.nextElementSibling;
          if (s !== dotsWrap && s.children.length > 0 && s.children[0].tagName === 'BUTTON' &&
              s.style.display === 'flex' && s.style.justifyContent === 'center') {
            s.parentNode.removeChild(s);
          }
          s = ns;
        }
      }, 600);

      return true;
    }

    if (!tryPatch()) {
      var obs = new MutationObserver(function(){ if (tryPatch()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function(){ obs.disconnect(); }, 5000);
    }
  }
  window.__patchCarousel = patchCarousel;

  /* ── patchTabsAsSelect: convierte un tablist en <select> desplegable ─ */
  function patchTabsAsSelect(tablistSel, opts) {
    if (window.innerWidth > 900) return;
    opts = opts || {};
    function tryPatch() {
      var tablist = document.querySelector(tablistSel);
      if (!tablist || tablist.dataset.mobSelect) return false;
      var btns = Array.from(tablist.querySelectorAll('[role="tab"]'));
      if (btns.length < 2) return false;
      tablist.dataset.mobSelect = '1';
      tablist.style.display = 'none';

      var wrap = document.createElement('div');
      wrap.style.cssText = 'position:relative;' + (opts.wrapStyle || 'margin:22px 0 22px');

      var selColor = opts.color || '#0D4A57';
      var borderStyle = opts.border || '1.5px solid #0D4A57';
      var fontSize = opts.fontSize || '15px';
      var fontWeight = opts.fontWeight || '600';
      var padding = opts.padding || '13px 42px 13px 16px';
      var sel = document.createElement('select');
      sel.style.cssText = 'width:100%;appearance:none;-webkit-appearance:none;font-family:Lato,sans-serif;font-size:' + fontSize + ';font-weight:' + fontWeight + ';color:' + selColor + ';background:#fff;border:' + borderStyle + ';border-radius:10px;padding:' + padding + ';cursor:pointer;outline:none;box-sizing:border-box';

      btns.forEach(function(btn, i) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = btn.textContent.trim();
        if (btn.getAttribute('aria-selected') === 'true') opt.selected = true;
        sel.appendChild(opt);
      });

      var chevronColor = opts.chevronColor || '#0D4A57';
      var chevron = document.createElement('div');
      chevron.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="' + chevronColor + '" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      chevron.style.cssText = 'position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;align-items:center';

      sel.addEventListener('change', function() {
        var btn = btns[parseInt(sel.value)];
        if (btn) btn.click();
      });

      if (opts.hint) {
        var hint = document.createElement('p');
        hint.textContent = opts.hint;
        hint.style.cssText = 'margin:0 0 10px;font-family:Lato,sans-serif;font-size:12.5px;color:#7C8B8D;line-height:1.45';
        wrap.appendChild(hint);
      }
      wrap.appendChild(sel);
      wrap.appendChild(chevron);
      var placeholder = opts.placeholder ? document.getElementById(opts.placeholder) : null;
      if (placeholder) { placeholder.appendChild(wrap); }
      else { tablist.insertAdjacentElement('afterend', wrap); }

      /* Sync select when aria-selected changes programmatically */
      var mo = new MutationObserver(function() {
        btns.forEach(function(btn, i) {
          if (btn.getAttribute('aria-selected') === 'true') sel.value = i;
        });
      });
      btns.forEach(function(btn) {
        mo.observe(btn, { attributes: true, attributeFilter: ['aria-selected'] });
      });
      return true;
    }
    if (!tryPatch()) {
      var obs = new MutationObserver(function() { if (tryPatch()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function() { obs.disconnect(); }, 5000);
    }
  }
  window.__patchTabsAsSelect = patchTabsAsSelect;

  /* ── Inicio: plataforma pillar cards carousel ───────────────────── */
  patchCarousel('[data-m="plat-pillars"]');

  /* ── Inicio: audience/profile cards carousel ────────────────────── */
  patchCarousel('[data-m="audience-cards"]');

  /* ── Marco WISE premises cards carousel ─────────────────────────── */
  patchCarousel('[data-m="premises"]');

  /* ── Inicio: financiamiento section — fix mobile layout ─────────── */
  if (window.innerWidth <= 900) {
    (function patchFinanciamiento() {
      var sections = document.querySelectorAll('section');
      var finSection = null;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].innerText.indexOf('financiamiento de:') >= 0) {
          finSection = sections[i];
          break;
        }
      }
      if (!finSection) return;
      var box = finSection.querySelector('div[style*="flex-wrap"]');
      if (!box) return;
      box.style.flexDirection = 'column';
      box.style.alignItems = 'center';
      box.style.textAlign = 'center';
      box.style.gap = '16px';
      var divider = box.querySelector('div[aria-hidden="true"]');
      if (divider) divider.style.display = 'none';
    })();
  }

  /* ── Líneas de Reforma: criterios y pasos carousel ─────────────── */
  patchCarousel('[data-m="lr-criteria"]');
  patchCarousel('[data-m="lr-steps"]');

  /* ── Criterios de Selección: filtros carousel ──────────────────── */
  patchCarousel('[data-m="cds-filters"]');

  /* ── Submenú de secciones (mobile, ≤900px) ──────────────────────────────
     Componente común: reemplaza las pestañas de una página por un solo control.
     Botón del color del menú sobre una franja blanca de ancho completo, con un panel desplegable
     propio (agrupado si hay pestañas secundarias); la franja queda fija bajo el header de la
     plataforma al hacer scroll. Se usa en Detalle de caso, Modelo conceptual, Áreas de Reforma
     y el detalle de un área de reforma. */
  function mobileSubmenu(cfg){
    if (window.innerWidth > 900) return;
    var BAR_BG = '#0D4A57', INK = '#FFFFFF', PAD = 'clamp(20px,4vw,40px)';

    function headBottom(){
      var tn = document.querySelector('[data-m=topnav]');
      return tn && tn.parentElement ? Math.max(0, Math.round(tn.parentElement.getBoundingClientRect().bottom)) : 0;
    }

    function tryPatch(){
      var src = cfg.collect();   /* {groups:[{label, btns}], hide:[elementos], spot:elemento, hint:texto|null} */
      if (!src) return false;
      src.hide.forEach(function(el){ el.dataset.mobSelect = '1'; el.style.display = 'none'; });
      var groups = src.groups;
      var all = [];
      groups.forEach(function(g){ all = all.concat(g.btns); });

      var hint = null;
      if (src.hint) {
        hint = document.createElement('p');
        hint.textContent = src.hint;
        hint.style.cssText = 'margin:14px 0 10px;font-family:Lato,sans-serif;font-size:14px;color:#516268;line-height:1.45';
      }

      var anchor = document.createElement('div');   /* guarda el lugar cuando la barra pasa a estar fija */

      var bar = document.createElement('div');
      bar.setAttribute('data-m', 'mob-submenu');
      bar.style.cssText = 'position:relative;z-index:45;background:#fff;margin:0 calc(-1 * ' + PAD + ') 16px;padding:10px ' + PAD + ' 10px';
      var box = document.createElement('div');
      box.style.cssText = 'position:relative';

      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.setAttribute('aria-haspopup', 'listbox');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;font-family:Lato,sans-serif;font-size:16px;font-weight:700;color:' + INK + ';background:' + BAR_BG + ';border:none;border-radius:12px;padding:14px 18px;cursor:pointer;text-align:left;box-shadow:0 8px 18px -10px rgba(13,74,87,.55)';
      var label = document.createElement('span');
      label.style.cssText = 'display:flex;flex-direction:column;gap:1px;min-width:0';
      var kicker = document.createElement('span');
      kicker.style.cssText = 'font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#D4FBA1';
      kicker.textContent = 'Sección';
      var current = document.createElement('span');
      current.style.cssText = 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap';
      label.appendChild(kicker); label.appendChild(current);
      var chev = document.createElement('span');
      chev.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="' + INK + '" stroke-width="2.6" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      chev.style.cssText = 'display:flex;flex-shrink:0;transition:transform .2s';
      trigger.appendChild(label); trigger.appendChild(chev);

      var panel = document.createElement('div');
      panel.setAttribute('role', 'listbox');
      panel.style.cssText = 'display:none;position:absolute;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #DCE3E1;border-radius:12px;box-shadow:0 18px 38px -12px rgba(13,74,87,.35);padding:6px 0;max-height:60vh;overflow-y:auto;-webkit-overflow-scrolling:touch';

      var items = [];
      groups.forEach(function(g, gi){
        if (groups.length > 1) {   /* títulos de grupo solo si hay más de un grupo */
          var h = document.createElement('div');
          h.textContent = g.label;
          h.style.cssText = 'font-family:Lato,sans-serif;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#7C8B8D;padding:' + (gi ? '12px' : '8px') + ' 18px 6px;' + (gi ? 'border-top:1px solid #ECF1EF;margin-top:4px' : '');
          panel.appendChild(h);
        }
        g.btns.forEach(function(b){
          var it = document.createElement('button');
          it.type = 'button';
          it.setAttribute('role', 'option');
          it.textContent = b.textContent.trim();
          it.style.cssText = 'display:flex;align-items:center;justify-content:space-between;width:100%;font-family:Lato,sans-serif;font-size:16px;color:#17242A;background:none;border:none;padding:12px 18px;text-align:left;cursor:pointer';
          it.addEventListener('click', function(){ choose(b); });
          panel.appendChild(it);
          items.push({btn:b, el:it});
        });
      });

      box.appendChild(trigger); box.appendChild(panel); bar.appendChild(box);
      var after = src.spot;
      if (hint) { after.insertAdjacentElement('afterend', hint); after = hint; }
      after.insertAdjacentElement('afterend', anchor);
      anchor.insertAdjacentElement('afterend', bar);

      function sync(){
        items.forEach(function(x){
          var on = x.btn.getAttribute('aria-selected') === 'true';
          x.el.setAttribute('aria-selected', on ? 'true' : 'false');
          x.el.style.fontWeight = on ? '700' : '500';
          x.el.style.background = on ? '#E6F0F3' : 'none';
          x.el.style.boxShadow = on ? 'inset 4px 0 0 ' + BAR_BG : 'none';
          if (on) current.textContent = x.el.textContent;
        });
      }
      sync();
      var mo = new MutationObserver(sync);
      all.forEach(function(b){ mo.observe(b, { attributes:true, attributeFilter:['aria-selected'] }); });

      function open(v){
        panel.style.display = v ? 'block' : 'none';
        trigger.setAttribute('aria-expanded', v ? 'true' : 'false');
        chev.style.transform = v ? 'rotate(180deg)' : 'none';
      }
      trigger.addEventListener('click', function(e){ e.stopPropagation(); open(panel.style.display !== 'block'); });
      panel.addEventListener('click', function(e){ e.stopPropagation(); });
      document.addEventListener('click', function(){ open(false); });
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape') open(false); });

      function toContent(){
        var y = anchor.getBoundingClientRect().top + window.pageYOffset - headBottom();
        if (window.pageYOffset > y) window.scrollTo(0, y);
        place();
      }
      function choose(b){
        open(false);
        b.click();
        setTimeout(toContent, 450);
      }

      /* fija bajo el header al pasar por su posición */
      var fixed = false;
      function place(){
        var top = headBottom();
        var shouldFix = anchor.getBoundingClientRect().top <= top;
        if (shouldFix && !fixed) {
          fixed = true;
          anchor.style.height = bar.offsetHeight + 'px';
          anchor.style.marginBottom = '16px';
          bar.style.position = 'fixed';
          bar.style.left = '0'; bar.style.right = '0';
          bar.style.margin = '0';
          bar.style.boxShadow = '0 6px 14px -10px rgba(23,36,42,.35)';
        } else if (!shouldFix && fixed) {
          fixed = false;
          anchor.style.height = ''; anchor.style.marginBottom = '';
          bar.style.position = 'relative';
          bar.style.left = ''; bar.style.right = '';
          bar.style.margin = '0 calc(-1 * ' + PAD + ') 16px';
          bar.style.boxShadow = 'none';
          bar.style.removeProperty('top');
        }
        if (fixed) bar.style.setProperty('top', top + 'px', 'important');
      }
      window.addEventListener('scroll', function(){ place(); setTimeout(place, 220); }, { passive:true });
      window.addEventListener('resize', place);
      place();
      /* si la página abrió una pestaña desde un enlace (#ancla o botón del hero), dejar el contenido bajo la franja */
      window.__mobSubmenuToContent = toContent;
      return true;
    }
    if (!tryPatch()) {
      var obs = new MutationObserver(function(){ if (tryPatch()) obs.disconnect(); });
      obs.observe(document.body, { childList:true, subtree:true });
      setTimeout(function(){ obs.disconnect(); }, 8000);
    }
  }

  /* Detalle de caso: secciones + materiales de apoyo en un solo submenú */
  mobileSubmenu({ collect: function(){
    var main = document.querySelector('[data-m="dc-main-tabs"]');
    var sec  = document.querySelector('[data-m="dc-sec-tabs"]');
    if (!main || main.dataset.mobSelect) return null;
    var mainBtns = Array.from(main.querySelectorAll('[role="tab"]'));
    var secBtns  = sec ? Array.from(sec.querySelectorAll('[role="tab"]')) : [];
    if (mainBtns.length < 2) return null;
    var groups = [{label:'Secciones del caso', btns:mainBtns}];
    if (secBtns.length) groups.push({label:'Materiales de apoyo', btns:secBtns});
    return { groups:groups, hide: sec ? [main, sec] : [main],
             spot: document.getElementById('__mob-main-sel') || main,
             hint: 'Este caso está organizado en secciones. Usa el menú para navegar entre ellas.' };
  }});

  /* Modelo conceptual, Áreas de Reforma y detalle de un área: la barra de pestañas fija pasa a submenú */
  mobileSubmenu({ collect: function(){
    var bar = document.querySelector('[data-m="mw-tabs"]');
    if (!bar || bar.dataset.mobSelect) return null;
    var btns = Array.from(bar.querySelectorAll('[role="tab"]'));
    if (btns.length < 2) return null;
    return { groups:[{label:'Secciones', btns:btns}], hide:[bar], spot:bar, hint:null };
  }});

  /* ── Criterios de Selección: dos selectores (línea + caso) ─────────
     Aplica en desktop y mobile. Los controles originales quedan ocultos
     en el HTML fuente (display:none); este bloque crea la fila visible. */
  (function(){
    var SEL_CSS = 'appearance:none;-webkit-appearance:none;font-family:Lato,sans-serif;font-size:15px;font-weight:600;color:#0D4A57;background:#fff;border:1.5px solid #0D4A57;border-radius:10px;padding:13px 42px 13px 16px;cursor:pointer;outline:none;box-sizing:border-box;width:auto';
    var CHEVRON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D4A57" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>';

    function makeSelectWrap(btns, activeAttr) {
      var outer = document.createElement('div');
      outer.style.cssText = 'position:relative;flex:0 0 auto';
      var sel = document.createElement('select');
      sel.style.cssText = SEL_CSS;
      btns.forEach(function(btn, i) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.textContent = btn.textContent.trim();
        if (btn.getAttribute(activeAttr) === 'true') opt.selected = true;
        sel.appendChild(opt);
      });
      var chev = document.createElement('div');
      chev.innerHTML = CHEVRON_SVG;
      chev.style.cssText = 'position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;align-items:center';
      sel.addEventListener('change', function() {
        var btn = btns[parseInt(sel.value)];
        if (btn) btn.click();
      });
      var mo = new MutationObserver(function() {
        btns.forEach(function(btn, i) {
          if (btn.getAttribute(activeAttr) === 'true') sel.value = i;
        });
      });
      btns.forEach(function(btn) {
        mo.observe(btn, { attributes: true, attributeFilter: [activeAttr] });
      });
      outer.appendChild(sel);
      outer.appendChild(chev);
      outer.__rebuild = function(newBtns){
        btns.length = 0;
        newBtns.forEach(function(b){ btns.push(b); mo.observe(b, { attributes: true, attributeFilter: [activeAttr] }); });
        while (sel.options.length) sel.remove(0);
        btns.forEach(function(btn, i){
          var opt = document.createElement('option');
          opt.value = i;
          opt.textContent = btn.textContent.trim();
          if (btn.getAttribute(activeAttr) === 'true') opt.selected = true;
          sel.appendChild(opt);
        });
      };
      return outer;
    }

    function tryPatch() {
      var lineaEl  = document.querySelector('[data-m="cds-linea-tabs"]');
      var casosEl  = document.querySelector('[data-m="cds-casos-wrap"]');
      var instrEl  = document.querySelector('[data-m="cds-inst"]');
      if (!lineaEl || !casosEl || !instrEl || instrEl.dataset.cdsDone) return false;
      var lineaBtns = Array.from(lineaEl.querySelectorAll('[role="tab"]'));
      var casosBtns = Array.from(casosEl.querySelectorAll('button'));
      if (lineaBtns.length < 1 || casosBtns.length < 2) return false;
      instrEl.dataset.cdsDone = '1';

      /* Ocultar controles originales una vez que los botones ya existen */
      lineaEl.style.display = 'none';
      casosEl.style.display = 'none';

      var isMob = window.innerWidth < 900;
      var row = document.createElement('div');
      row.style.cssText = isMob
        ? 'display:flex;flex-direction:column;gap:12px;margin:16px 0 22px'
        : 'display:flex;gap:16px;flex-wrap:wrap;margin:16px 0 22px';
      var w1 = makeSelectWrap(lineaBtns, 'aria-selected');
      var w2 = makeSelectWrap(casosBtns, 'aria-pressed');
      if (isMob) {
        w1.style.cssText = 'position:relative;width:100%';
        w2.style.cssText = 'position:relative;width:100%';

        var casosSel = w2.querySelector('select');

        /* Al cambiar la línea, volver a Todos los casos (índice 0) */
        if (casosSel) {
          var lineaSel = w1.querySelector('select');
          if (lineaSel) {
            lineaSel.addEventListener('change', function() {
              setTimeout(function() {
                w2.__rebuild(Array.from(casosEl.querySelectorAll('button')));
                if (casosSel.options.length > 0) casosSel.selectedIndex = 0;
              }, 180);
            });
          }
        }

        row.appendChild(w1);
        row.appendChild(w2);
        instrEl.insertAdjacentElement('afterend', row);
      } else {
        /* ── Desktop: caso único, layout 4 columnas ── */

        /* Select de casos: custom para poder reconstruirlo al cambiar línea */
        var casoOuterDt = document.createElement('div');
        casoOuterDt.style.cssText = 'position:relative;flex:0 0 auto';
        var casosSelDt = document.createElement('select');
        casosSelDt.style.cssText = SEL_CSS;
        var chevDt = document.createElement('div');
        chevDt.innerHTML = CHEVRON_SVG;
        chevDt.style.cssText = 'position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;align-items:center';

        var activeDtBtns = casosBtns;

        function buildDtCasoOpts(btns) {
          while (casosSelDt.options.length > 0) casosSelDt.remove(0);
          btns.forEach(function(btn, i) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.textContent = btn.textContent.trim();
            if (btn.getAttribute('aria-pressed') === 'true') opt.selected = true;
            casosSelDt.appendChild(opt);
          });
          activeDtBtns = btns;
        }
        buildDtCasoOpts(activeDtBtns);

        casosSelDt.addEventListener('change', function() {
          var btn = activeDtBtns[parseInt(casosSelDt.value)];
          if (btn) btn.click();
          setTimeout(updateDtCaseHeader, 80);
        });
        casoOuterDt.appendChild(casosSelDt);
        casoOuterDt.appendChild(chevDt);

        /* Cuando cambia la línea, reconstruir opciones de casos y resetear placeholder */
        var lineaSelDt = w1.querySelector('select');
        if (lineaSelDt) {
          lineaSelDt.addEventListener('change', function() {
            setTimeout(function() {
              var newBtns = Array.from(casosEl.querySelectorAll('button'));
              buildDtCasoOpts(newBtns);
              updateDtCaseHeader();
              addDtCellBorders();
            }, 180);
          });
        }

        /* Encabezado del caso seleccionado, encima de la tabla */
        var caseHeaderEl = document.createElement('div');
        caseHeaderEl.style.cssText = 'padding:12px 22px;border:1px solid #DCE3E1;background:#F9FBFB;border-radius:12px;margin-bottom:12px;display:flex;align-items:center;gap:14px;flex-wrap:wrap';

        function updateDtCaseHeader() {
          var ts = document.querySelector('[data-m="table-scroll"]');
          if (!ts) return;
          var colH = ts.querySelector('[role="row"]:first-child [role="columnheader"]:last-child');
          if (!colH) return;
          var countryEl = colH.querySelector('span');
          var linkEl = colH.querySelector('a');
          var country = countryEl ? countryEl.textContent.trim() : '';
          var title = linkEl ? linkEl.textContent.trim() : '';
          var href = linkEl ? linkEl.getAttribute('href') : '#';
          caseHeaderEl.innerHTML =
            '<span style="font-family:Lato,sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8CA0A5">' + country + '</span>' +
            '<a href="' + href + '" style="font-family:Lato,sans-serif;font-size:14.5px;font-weight:700;color:#0D4A57;text-decoration:none">' + title + '</a>';
        }

        /* Borde derecho en celdas de valor de la columna izquierda */
        function addDtCellBorders() {
          var ts = document.querySelector('[data-m="table-scroll"]');
          if (!ts) return;
          var dRows = Array.from(ts.querySelectorAll('[role="row"]')).slice(1);
          dRows.forEach(function(row, i) {
            var cell = row.querySelector('[role="cell"]');
            if (cell) cell.style.borderRight = (i % 2 === 0) ? '2px solid #DCE3E1' : '';
          });
        }

        row.appendChild(w1);
        row.appendChild(casoOuterDt);
        instrEl.insertAdjacentElement('afterend', row);

        var tableScrollDt = document.querySelector('[data-m="table-scroll"]');
        if (tableScrollDt) {
          tableScrollDt.insertAdjacentElement('beforebegin', caseHeaderEl);
          updateDtCaseHeader();
          addDtCellBorders();
          var tmoD = new MutationObserver(function() {
            updateDtCaseHeader();
            addDtCellBorders();
          });
          tmoD.observe(tableScrollDt, { childList: true, subtree: true });
        }
      }
      return true;
    }
    if (!tryPatch()) {
      var obs = new MutationObserver(function() { if (tryPatch()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function() { obs.disconnect(); }, 5000);
    }
  })();

  /* ── Marco WISE dimensions: instruction after title + modal on mobile */
  (function(){
    if (window.innerWidth > 900) return;
    if (document.getElementById('__wise-mob')) return;

    /* CSS: hide bottom hint, make detail panel a bottom-sheet modal */
    var s = document.createElement('style');
    s.id = '__wise-mob';
    s.textContent =
      '@media(max-width:900px){' +
        '[data-m="wise-hint"]{display:none!important}' +
        '[data-m="wise-detail"]{' +
          'position:fixed!important;' +
          'left:0!important;right:0!important;bottom:0!important;top:auto!important;' +
          'width:100%!important;max-width:none!important;' +
          'z-index:200!important;' +
          'border-radius:20px 20px 0 0!important;' +
          'border:none!important;' +
          'background:#fff!important;' +
          'max-height:88vh!important;overflow-y:auto!important;' +
          'animation:slideUpSheet .32s cubic-bezier(.25,1,.4,1) both!important' +
        '}' +
        /* Header sticky + close button always top-right */
        '[data-m="wise-detail"]>div:first-child{' +
          'position:sticky!important;top:0!important;z-index:1!important;' +
          'flex-wrap:nowrap!important;align-items:flex-start!important' +
        '}' +
        '[data-m="wise-detail"]>div:first-child>div:first-child{' +
          'min-width:0!important;flex:1!important' +
        '}' +
        '[data-m="wise-detail"]>div:first-child [aria-label="Cerrar dimensión"]{' +
          'flex-shrink:0!important;margin-top:2px!important' +
        '}' +
        '@keyframes slideUpSheet{from{transform:translateY(100%)}to{transform:translateY(0)}}' +
        '@keyframes fadeInBd{from{opacity:0}to{opacity:1}}' +
      '}';
    document.head.appendChild(s);

    function tryPatch() {
      var section = document.getElementById('esquema');
      if (!section) return false;
      var h2 = section.querySelector('h2');
      if (!h2) return false;
      if (document.getElementById('__wise-instr')) return true;

      /* Insert instruction text right after h2 */
      var instr = document.createElement('p');
      instr.id = '__wise-instr';
      instr.style.cssText = 'font-size:13px;color:#8CA0A5;margin:8px 0 0;line-height:1.5';
      instr.textContent = 'Toca una dimensión para ver sus subdimensiones e indicadores.';
      h2.insertAdjacentElement('afterend', instr);

      /* Backdrop: appears when wise-detail is in the DOM */
      var backdrop = null;
      new MutationObserver(function(){
        var detail = section.querySelector('[data-m="wise-detail"]');
        if (detail && !backdrop) {
          backdrop = document.createElement('div');
          backdrop.style.cssText =
            'position:fixed;inset:0;z-index:199;background:rgba(13,36,42,.45);' +
            'animation:fadeInBd .2s ease';
          backdrop.addEventListener('click', function(){
            var closeBtn = detail.querySelector('[aria-label="Cerrar dimensión"]');
            if (closeBtn) closeBtn.click();
          });
          document.body.appendChild(backdrop);
          var sy = window.scrollY;
          document.body.style.cssText = 'overflow:hidden;position:fixed;top:-' + sy + 'px;width:100%';
          backdrop._scrollY = sy;
        } else if (!detail && backdrop) {
          var sy = backdrop._scrollY || 0;
          backdrop.remove();
          backdrop = null;
          document.body.style.cssText = '';
          window.scrollTo(0, sy);
        }
      }).observe(section, { childList: true, subtree: true });

      return true;
    }

    if (!tryPatch()) {
      var obs = new MutationObserver(function(){ if (tryPatch()) obs.disconnect(); });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(function(){ obs.disconnect(); }, 5000);
    }
  })();

  /* ── Footer logo+text: stack vertically on mobile ────────────────── */
  (function(){
    var s = document.createElement('style');
    s.textContent =
      '@media(max-width:900px){' +
        'footer [data-m="footer-row"]>div:first-child>div{' +
          'flex-direction:column!important;' +
          'align-items:flex-start!important;' +
          'gap:10px!important' +
        '}' +
        'footer [data-m="footer-row"]>div:first-child>div>span{' +
          'border-left:none!important;' +
          'padding-left:0!important' +
        '}' +
      '}';
    document.head.appendChild(s);
  })();

  /* ── Selectores: ancho completo en mobile + layout 4col desktop ─── */
  (function(){
    var s = document.createElement('style');
    s.textContent =
      '@media(max-width:900px){' +
        'select{width:100%!important;box-sizing:border-box!important}' +
        '[data-m="ldr-hero-icon"]{display:none!important}' +
        '[data-m="table-scroll"]{overflow-x:hidden!important}' +
        '[data-m="table-scroll"] [role="table"]{display:block!important;min-width:0!important;width:100%!important}' +
        '[data-m="table-scroll"] [role="row"]{display:block!important}' +
        '[data-m="table-scroll"] [role="row"]:first-child{display:none!important}' +
        '[data-m="table-scroll"] [role="rowheader"]{position:static!important;width:100%!important;padding:14px 16px 10px!important;border-bottom:none!important;box-sizing:border-box!important}' +
        '[data-m="table-scroll"] [role="cell"]{display:block!important;padding:2px 16px 14px!important;border-left:none!important}' +
        '[data-m="table-scroll"] [role="row"]:last-child [role="cell"]{border-bottom:none!important}' +
      '}' +
      '@media(min-width:901px){' +
        '[data-m="table-scroll"]{overflow-x:hidden!important}' +
        '[data-m="table-scroll"] [role="table"]{grid-template-columns:210px 1fr 210px 1fr!important;min-width:0!important;width:100%!important}' +
        '[data-m="table-scroll"] [role="row"]:first-child{display:none!important}' +
      '}';
    document.head.appendChild(s);
  })();

  /* ── Comparador de casos: selectores de línea + casos ───────────── */
  (function(){

    var SEL_CSS = 'appearance:none;-webkit-appearance:none;font-family:Lato,sans-serif;font-size:15px;font-weight:600;color:#0D4A57;background:#fff;border:1.5px solid #0D4A57;border-radius:10px;padding:13px 42px 13px 16px;cursor:pointer;outline:none;box-sizing:border-box';
    /* mobile: tamaños mínimos de texto */
    if (window.innerWidth < 900) SEL_CSS = SEL_CSS.replace('font-size:15px', 'font-size:16px');
    var CHEVRON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D4A57" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    var CHEV_CSS = 'position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;display:flex;align-items:center';

    function makeChev() {
      var d = document.createElement('div');
      d.innerHTML = CHEVRON;
      d.style.cssText = CHEV_CSS;
      return d;
    }

    function tryPatch() {
      var header = document.querySelector('[data-m="cmp-header"]');
      var pool   = document.querySelector('[data-m="cmp-pool-wrap"]');
      var hint   = document.querySelector('[data-m="cmp-hint"]');
      if (!header || !pool || pool.dataset.cmpSelDone) return false;
      var btns = Array.from(pool.querySelectorAll('button[aria-pressed]'));
      if (btns.length < 2) return false;
      pool.dataset.cmpSelDone = '1';

      /* Extract case data from rendered buttons via textContent parsing */
      var cases = btns.map(function(btn) {
        var text = btn.textContent.trim();
        // format: "icon Title · LineaLabel"
        var dotIdx = text.lastIndexOf('· ');
        var lineaLabel = dotIdx > -1 ? text.slice(dotIdx + 2).trim() : '';
        if (!lineaLabel) { dotIdx = text.lastIndexOf('· '); lineaLabel = dotIdx > -1 ? text.slice(dotIdx + 2).trim() : ''; }
        var titlePart = dotIdx > -1 ? text.slice(0, dotIdx) : text;
        var title = titlePart.trim().replace(/^[✓✗+]\s*/, '').trim();
        return { btn: btn, title: title, lineaLabel: lineaLabel };
      });

      /* Unique lineas in order of appearance */
      var lineas = [], seen = {};
      cases.forEach(function(c) {
        if (c.lineaLabel && !seen[c.lineaLabel]) { seen[c.lineaLabel] = true; lineas.push(c.lineaLabel); }
      });

      /* Hide originals */
      header.style.display = 'none';
      pool.style.display   = 'none';
      if (hint) hint.style.display = 'none';

      /* ── Build UI container ── */
      var isMob = window.innerWidth < 900;
      var row = document.createElement('div');
      row.style.cssText = isMob
        ? 'display:flex;flex-direction:column;gap:12px;margin-bottom:24px'
        : 'display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:24px';

      /* ── Línea selector (single-select) ── */
      var lineaWrap = document.createElement('div');
      lineaWrap.style.cssText = isMob ? 'position:relative;width:100%' : 'position:relative;flex:0 0 auto';

      var lineaSel = document.createElement('select');
      lineaSel.style.cssText = isMob ? SEL_CSS + ';width:100%' : SEL_CSS;

      var allOpt = document.createElement('option');
      allOpt.value = 'todas'; allOpt.textContent = 'Todas las líneas';
      lineaSel.appendChild(allOpt);
      lineas.forEach(function(l) {
        var o = document.createElement('option'); o.value = l; o.textContent = l;
        lineaSel.appendChild(o);
      });

      lineaWrap.appendChild(lineaSel);
      lineaWrap.appendChild(makeChev());

      /* ── Casos custom multi-select (max 3) ── */
      var casosWrap = document.createElement('div');
      casosWrap.style.cssText = isMob ? 'position:relative;width:100%' : 'position:relative;flex:0 0 auto';

      function getSelectedBtns() {
        return btns.filter(function(b) { return b.getAttribute('aria-pressed') === 'true'; });
      }
      function getLabelText() {
        var sel = getSelectedBtns();
        if (!sel.length) return 'Selecciona casos';
        if (sel.length === 1) {
          var found = null;
          cases.forEach(function(c) { if (c.btn === sel[0]) found = c; });
          return found ? found.title : '1 caso seleccionado';
        }
        return sel.length + ' casos seleccionados';
      }

      var trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.style.cssText = isMob
        ? SEL_CSS + ';width:100%;text-align:left;position:relative;display:flex;align-items:center;box-sizing:border-box'
        : SEL_CSS + ';min-width:220px;text-align:left;position:relative;display:inline-flex;align-items:center';

      var triggerLabel = document.createElement('span');
      triggerLabel.textContent = getLabelText(); /* refleja casos ya preseleccionados (p. ej. desde "Comparar" en una tarjeta) */
      triggerLabel.style.cssText = 'flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-right:4px';
      trigger.appendChild(triggerLabel);
      trigger.appendChild(makeChev());

      var dropdown = document.createElement('div');
      dropdown.style.cssText = isMob
        ? 'position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border:1.5px solid #0D4A57;border-radius:10px;padding:6px 0 4px;z-index:200;box-shadow:0 8px 24px rgba(13,74,87,.12);display:none'
        : 'position:absolute;top:calc(100% + 6px);left:0;min-width:300px;background:#fff;border:1.5px solid #0D4A57;border-radius:10px;padding:6px 0 4px;z-index:200;box-shadow:0 8px 24px rgba(13,74,87,.12);display:none';

      var isOpen = false;

      function buildDropdown() {
        var lineaFilter = lineaSel.value;
        dropdown.innerHTML = '';
        var filtered = cases.filter(function(c) {
          return lineaFilter === 'todas' || c.lineaLabel === lineaFilter;
        });

        if (!filtered.length) {
          var empty = document.createElement('div');
          empty.style.cssText = 'padding:12px 16px;font-family:Lato,sans-serif;font-size:' + (isMob ? '14px' : '13px') + ';color:#8CA0A5';
          empty.textContent = 'Sin casos para esta línea';
          dropdown.appendChild(empty);
          return;
        }

        filtered.forEach(function(c) {
          var item = document.createElement('label');
          item.style.cssText = 'display:flex;align-items:flex-start;gap:' + (isMob ? '12px' : '10px') + ';padding:' + (isMob ? '12px 16px' : '9px 16px') + ';cursor:pointer;transition:background .1s';
          item.addEventListener('mouseenter', function() { item.style.background = '#F4F7F6'; });
          item.addEventListener('mouseleave', function() { item.style.background = ''; });

          var cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.style.cssText = (isMob ? 'width:20px;height:20px;margin-top:1px;' : 'width:15px;height:15px;margin-top:2px;') + 'accent-color:#0D4A57;cursor:pointer;flex-shrink:0';
          cb.checked = c.btn.getAttribute('aria-pressed') === 'true';

          cb.addEventListener('change', function(e) {
            e.stopPropagation();
            if (cb.checked && getSelectedBtns().length >= 3) {
              cb.checked = false;
              return;
            }
            c.btn.click();
            setTimeout(function() {
              syncCheckboxes();
              triggerLabel.textContent = getLabelText();
            }, 60);
          });

          var info = document.createElement('div');
          var titleEl = document.createElement('span');
          titleEl.style.cssText = 'display:block;font-family:Lato,sans-serif;font-size:' + (isMob ? '16px' : '13.5px') + ';color:#17242A;line-height:1.3';
          titleEl.textContent = c.title;
          var lineaEl = document.createElement('span');
          lineaEl.style.cssText = 'display:block;font-family:Lato,sans-serif;font-size:' + (isMob ? '14px' : '11.5px') + ';color:' + (isMob ? '#4F6B72' : '#8CA0A5') + ';margin-top:' + (isMob ? '3px' : '1px');
          lineaEl.textContent = c.lineaLabel;
          info.appendChild(titleEl);
          info.appendChild(lineaEl);

          item.appendChild(cb);
          item.appendChild(info);
          dropdown.appendChild(item);
          cb._case = c;
        });

        var note = document.createElement('div');
        note.style.cssText = 'padding:' + (isMob ? '10px 16px 6px' : '7px 16px 3px') + ';font-family:Lato,sans-serif;font-size:' + (isMob ? '13px' : '11px') + ';color:#7C8B8D;border-top:1px solid #F0F4F3;margin-top:4px';
        note.textContent = 'Máximo 3 casos a la vez';
        dropdown.appendChild(note);
      }

      function syncCheckboxes() {
        var cbs = Array.from(dropdown.querySelectorAll('input[type="checkbox"]'));
        cbs.forEach(function(cb) {
          if (cb._case) cb.checked = cb._case.btn.getAttribute('aria-pressed') === 'true';
        });
      }

      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        isOpen = !isOpen;
        if (isOpen) { buildDropdown(); dropdown.style.display = 'block'; }
        else dropdown.style.display = 'none';
      });

      document.addEventListener('click', function() {
        if (isOpen) { isOpen = false; dropdown.style.display = 'none'; }
      });
      dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

      lineaSel.addEventListener('change', function() {
        if (isOpen) buildDropdown();
      });

      /* Sync trigger label when DC state changes */
      var mo = new MutationObserver(function() {
        triggerLabel.textContent = getLabelText();
        if (isOpen) syncCheckboxes();
      });
      btns.forEach(function(b) { mo.observe(b, { attributes: true, attributeFilter: ['aria-pressed'] }); });

      casosWrap.appendChild(trigger);
      casosWrap.appendChild(dropdown);

      row.appendChild(lineaWrap);
      row.appendChild(casosWrap);

      /* Insert into the toolbar slot when present, otherwise after the header element */
      var slot = document.querySelector('[data-m="cmp-selectors-slot"]');
      if (slot) {
        row.style.marginBottom = '0';
        slot.appendChild(row);
      } else {
        header.insertAdjacentElement('afterend', row);
      }
      return true;
    }

    if (!tryPatch()) {
      var obs = new MutationObserver(function() { tryPatch(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  })();
})();

/* ── Tamaños mínimos de texto en mobile (≤760px) ────────────────────
   Párrafos principales y descripción del hero: 16px · texto secundario: 14px ·
   etiquetas cortas / mayúsculas / chips: 12px · campos de formulario: 16px.
   No toca desktop, el header institucional (#sih) ni textos dentro de gráficos SVG. */
(function(){
  if (window.__mobileTypeInit) return;
  window.__mobileTypeInit = true;

  var MQ = window.matchMedia('(max-width:760px)');
  var MARK = 'data-fs-min';

  function ownText(el){
    var s = '';
    for (var i = 0; i < el.childNodes.length; i++) {
      var n = el.childNodes[i];
      if (n.nodeType === 3) s += n.textContent;
    }
    return s.replace(/\s+/g, ' ').trim();
  }

  function targetFor(el, fs, cs, text){
    var tag = el.tagName;
    if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return 16;
    if (tag === 'P' && el.closest('[data-m="hero-story"]')) return 16;
    if (cs.textTransform === 'uppercase' || text.length <= 40) return 12;
    if (tag === 'P' && fs >= 14.5) return 16;
    return 14;
  }

  function fix(el){
    if (el.nodeType !== 1 || el.closest('#sih') || el.closest('svg')) return;
    var tag = el.tagName;
    var isField = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
    var heroDesc = tag === 'P' && !!el.closest('[data-m="hero-story"]');
    var text = isField ? 'campo' : ownText(el);
    /* la descripción del hero cambia con cada diapositiva (a veces vacía): se fija igual para evitar saltos */
    if (!text && !heroDesc) return;
    if (el.hasAttribute(MARK)) return;
    var cs = getComputedStyle(el);
    var fs = parseFloat(cs.fontSize);
    if (!fs || fs >= 16) return;
    var target = targetFor(el, fs, cs, text);
    if (fs < target) {
      el.style.setProperty('font-size', target + 'px', 'important');
      el.setAttribute(MARK, target);
    }
  }

  function scan(root){
    if (!MQ.matches) return;
    if (root.nodeType === 1) fix(root);
    var all = (root.querySelectorAll ? root.querySelectorAll('*') : []);
    for (var i = 0; i < all.length; i++) fix(all[i]);
  }

  function undo(){
    var els = document.querySelectorAll('[' + MARK + ']');
    for (var i = 0; i < els.length; i++) {
      els[i].style.removeProperty('font-size');
      els[i].removeAttribute(MARK);
    }
  }

  /* El contenido se renderiza y cambia después de la carga (pestañas, comparador, menús):
     se vuelve a revisar lo nuevo, agrupando los cambios en una sola pasada. */
  var pending = [], queued = false;
  function queue(node){
    pending.push(node);
    if (queued) return;
    queued = true;
    setTimeout(function(){
      queued = false;
      var list = pending; pending = [];
      for (var i = 0; i < list.length; i++) scan(list[i]);
    }, 30);
  }
  var mo = new MutationObserver(function(muts){
    if (!MQ.matches) return;
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === 'childList') {
        for (var j = 0; j < m.addedNodes.length; j++) if (m.addedNodes[j].nodeType === 1) queue(m.addedNodes[j]);
        if (m.target.nodeType === 1) queue(m.target);
      } else if (m.type === 'attributes' && m.target.hasAttribute && m.target.hasAttribute(MARK)) {
        /* si el runtime reescribe el estilo en línea, se vuelve a aplicar el mínimo */
        var el = m.target;
        if (!el.style.getPropertyValue('font-size') || el.style.getPropertyPriority('font-size') !== 'important') {
          el.removeAttribute(MARK);
          queue(el);
        }
      } else if (m.type === 'characterData' && m.target.parentElement) {
        queue(m.target.parentElement);
      }
    }
  });

  function start(){
    mo.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['style'] });
    [0, 300, 900, 1800].forEach(function(ms){ setTimeout(function(){ scan(document.body); }, ms); });
  }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);

  var onChange = function(){ if (MQ.matches) scan(document.body); else undo(); };
  if (MQ.addEventListener) MQ.addEventListener('change', onChange); else MQ.addListener(onChange);
})();

/* ── Selectores con el mismo panel desplegable en todo el sitio ─────────
   Los <select> nativos (filtros de Explorar casos, Tendencias, selectores de Criterios y del
   comparador) abren, en vez de la lista del navegador, el mismo panel del selector de casos:
   blanco, borde turquesa, radio redondeado, una fila por opción con marcador circular y la
   opción elegida en negrita. El <select> original sigue en su lugar y es el que cambia el valor,
   así que la lógica de cada página no cambia. En mobile usa los tamaños mínimos (16px). */
(function(){
  if (window.__selectSkinInit) return;
  window.__selectSkinInit = true;

  var isMob = function(){ return window.innerWidth < 900; };
  var openState = null;   /* {sel, panel} del selector abierto */
  var setValue = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set;

  function close(){
    if (!openState) return;
    openState.panel.remove();
    openState.sel.setAttribute('aria-expanded', 'false');
    openState = null;
  }

  function position(){
    if (!openState) return;
    var r = openState.sel.getBoundingClientRect(), p = openState.panel;
    var vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var w = Math.min(Math.max(r.width, 240), vw - 16);
    var left = Math.min(Math.max(8, r.left), vw - w - 8);
    var below = vh - r.bottom - 12, above = r.top - 12;
    p.style.left = left + 'px';
    p.style.width = w + 'px';
    if (below >= 180 || below >= above) {
      p.style.top = (r.bottom + 6) + 'px'; p.style.bottom = '';
      p.style.maxHeight = Math.max(140, below) + 'px';
    } else {
      p.style.top = ''; p.style.bottom = (vh - r.top + 6) + 'px';
      p.style.maxHeight = Math.max(140, above) + 'px';
    }
  }

  function choose(sel, idx){
    close();
    if (sel.selectedIndex === idx) return;
    setValue.call(sel, sel.options[idx].value);           /* setter nativo: React detecta el cambio */
    sel.dispatchEvent(new Event('input', { bubbles: true }));
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    sel.focus();
  }

  function open(sel){
    if (openState && openState.sel === sel) { close(); return; }
    close();
    var mob = isMob();
    var panel = document.createElement('div');
    panel.setAttribute('role', 'listbox');
    panel.setAttribute('data-select-panel', '');
    panel.style.cssText = 'position:fixed;z-index:3000;background:#fff;border:1.5px solid #0D4A57;border-radius:10px;padding:6px 0 4px;box-shadow:0 8px 24px rgba(13,74,87,.12);overflow-y:auto;-webkit-overflow-scrolling:touch';
    Array.prototype.forEach.call(sel.options, function(o, i){
      if (o.hidden) return;
      var on = i === sel.selectedIndex;
      var row = document.createElement('button');
      row.type = 'button';
      row.setAttribute('role', 'option');
      row.setAttribute('aria-selected', on ? 'true' : 'false');
      row.disabled = o.disabled;
      row.style.cssText = 'display:flex;align-items:center;gap:' + (mob ? '12px' : '10px') + ';width:100%;padding:' + (mob ? '12px 16px' : '9px 16px') + ';background:none;border:none;text-align:left;cursor:' + (o.disabled ? 'default' : 'pointer') + ';font-family:Lato,sans-serif;font-size:' + (mob ? '16px' : '13.5px') + ';line-height:1.3;color:' + (o.disabled ? '#B0BBBF' : '#17242A') + ';font-weight:' + (on ? '700' : '400') + ';transition:background .1s';
      var dot = document.createElement('span');
      var d = mob ? 20 : 15;
      dot.style.cssText = 'width:' + d + 'px;height:' + d + 'px;border-radius:50%;border:1.5px solid ' + (on ? '#0D4A57' : '#8CA0A5') + ';flex-shrink:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box';
      if (on) {
        var inner = document.createElement('span');
        inner.style.cssText = 'width:' + (d - 9) + 'px;height:' + (d - 9) + 'px;border-radius:50%;background:#0D4A57';
        dot.appendChild(inner);
      }
      var txt = document.createElement('span');
      txt.textContent = o.textContent.trim();
      row.appendChild(dot); row.appendChild(txt);
      row.addEventListener('mouseenter', function(){ if (!o.disabled) row.style.background = '#F4F7F6'; });
      row.addEventListener('mouseleave', function(){ row.style.background = 'none'; });
      row.addEventListener('click', function(e){ e.stopPropagation(); if (!o.disabled) choose(sel, i); });
      panel.appendChild(row);
    });
    panel.addEventListener('mousedown', function(e){ e.stopPropagation(); });
    panel.addEventListener('touchstart', function(e){ e.stopPropagation(); }, { passive: true });
    document.body.appendChild(panel);
    openState = { sel: sel, panel: panel };
    sel.setAttribute('aria-expanded', 'true');
    position();
    var cur = panel.querySelector('[aria-selected="true"]');
    if (cur) { cur.scrollIntoView({ block: 'nearest' }); cur.focus({ preventScroll: true }); }
  }

  function skin(sel){
    if (sel.__skinned || sel.multiple || sel.closest('#sih') || sel.hasAttribute('data-native')) return;
    sel.__skinned = true;
    sel.setAttribute('aria-haspopup', 'listbox');
    sel.setAttribute('aria-expanded', 'false');
    /* evitar la lista nativa y abrir el panel propio (mouse, toque y teclado) */
    sel.addEventListener('mousedown', function(e){ e.preventDefault(); sel.focus(); open(sel); });
    sel.addEventListener('touchstart', function(e){ e.preventDefault(); open(sel); }, { passive: false });
    sel.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp' || (e.altKey && e.key === 'ArrowDown')) {
        e.preventDefault(); open(sel);
      }
    });
  }

  function scan(root){
    var list = (root || document).querySelectorAll ? (root || document).querySelectorAll('select') : [];
    Array.prototype.forEach.call(list, skin);
  }

  /* navegación con teclado dentro del panel */
  document.addEventListener('keydown', function(e){
    if (!openState) return;
    if (e.key === 'Escape') { var s = openState.sel; close(); s.focus(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      var rows = Array.prototype.slice.call(openState.panel.querySelectorAll('[role="option"]:not([disabled])'));
      var i = rows.indexOf(document.activeElement);
      var n = e.key === 'ArrowDown' ? Math.min(rows.length - 1, i + 1) : Math.max(0, i - 1);
      if (rows[n]) { rows[n].focus(); e.preventDefault(); }
    }
  });
  document.addEventListener('mousedown', function(e){ if (openState && !openState.panel.contains(e.target) && e.target !== openState.sel) close(); });
  document.addEventListener('touchstart', function(e){ if (openState && !openState.panel.contains(e.target) && e.target !== openState.sel) close(); }, { passive: true });
  window.addEventListener('scroll', function(){ position(); }, { passive: true });
  window.addEventListener('resize', function(){ position(); });

  var pending = false;
  var mo = new MutationObserver(function(){
    if (pending) return;
    pending = true;
    setTimeout(function(){ pending = false; scan(document); if (openState && !document.body.contains(openState.sel)) close(); }, 60);
  });
  function start(){ scan(document); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
