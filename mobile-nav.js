(function(){
  var LINKS = [
    ['Modelo conceptual', 'Marco WISE.dc.html', 'marco-wise.html'],
    ['Líneas de Reforma', 'Lineas de Reforma.dc.html', 'lineas-de-reforma.html']
  ];
  var DC = location.pathname.indexOf('.dc.html') > -1;
  function href(l){ return DC ? l[1] : l[2]; }
  var CASES = DC ? 'Casos.dc.html' : 'casos.html';

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
      var dotsWrap = document.createElement('div');
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
      wrap.style.cssText = opts.wrapStyle || 'margin:22px 0 22px';

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
        hint.style.cssText = 'margin:0 0 8px;font-family:Lato,sans-serif;font-size:12.5px;color:#7C8B8D;line-height:1.45';
        wrap.appendChild(hint);
      }
      var selWrap = document.createElement('div');
      selWrap.style.cssText = 'position:relative';
      selWrap.appendChild(sel);
      selWrap.appendChild(chevron);
      wrap.appendChild(selWrap);
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

  /* ── Marco WISE premises cards carousel ─────────────────────────── */
  patchCarousel('[data-m="premises"]');

  /* ── Líneas de Reforma: criterios y pasos carousel ─────────────── */
  patchCarousel('[data-m="lr-criteria"]');
  patchCarousel('[data-m="lr-steps"]');

  /* ── Criterios de Selección: filtros carousel ──────────────────── */
  patchCarousel('[data-m="cds-filters"]');

  /* ── Detalle de Caso: main tabs → select principal ───────────────── */
  patchTabsAsSelect('[data-m="dc-main-tabs"]', {
    hint: 'Este caso está organizado en secciones. Usa el menú para navegar entre ellas.',
    placeholder: '__mob-main-sel',
    wrapStyle: 'margin:12px 0 16px'
  });

  /* ── Detalle de Caso: secondary tabs → select secundario ─────────── */
  patchTabsAsSelect('[data-m="dc-sec-tabs"]', {
    color: '#4F6B72',
    border: '1px solid #DCE3E1',
    fontSize: '13px',
    fontWeight: '500',
    padding: '10px 36px 10px 14px',
    chevronColor: '#4F6B72',
    placeholder: '__mob-sec-sel',
    wrapStyle: 'margin:0 0 32px'
  });

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
      triggerLabel.textContent = 'Selecciona casos';
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
          empty.style.cssText = 'padding:12px 16px;font-family:Lato,sans-serif;font-size:13px;color:#8CA0A5';
          empty.textContent = 'Sin casos para esta línea';
          dropdown.appendChild(empty);
          return;
        }

        filtered.forEach(function(c) {
          var item = document.createElement('label');
          item.style.cssText = 'display:flex;align-items:flex-start;gap:10px;padding:9px 16px;cursor:pointer;transition:background .1s';
          item.addEventListener('mouseenter', function() { item.style.background = '#F4F7F6'; });
          item.addEventListener('mouseleave', function() { item.style.background = ''; });

          var cb = document.createElement('input');
          cb.type = 'checkbox';
          cb.style.cssText = 'width:15px;height:15px;margin-top:2px;accent-color:#0D4A57;cursor:pointer;flex-shrink:0';
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
          titleEl.style.cssText = 'display:block;font-family:Lato,sans-serif;font-size:13.5px;color:#17242A;line-height:1.3';
          titleEl.textContent = c.title;
          var lineaEl = document.createElement('span');
          lineaEl.style.cssText = 'display:block;font-family:Lato,sans-serif;font-size:11.5px;color:#8CA0A5;margin-top:1px';
          lineaEl.textContent = c.lineaLabel;
          info.appendChild(titleEl);
          info.appendChild(lineaEl);

          item.appendChild(cb);
          item.appendChild(info);
          dropdown.appendChild(item);
          cb._case = c;
        });

        var note = document.createElement('div');
        note.style.cssText = 'padding:7px 16px 3px;font-family:Lato,sans-serif;font-size:11px;color:#8CA0A5;border-top:1px solid #F0F4F3;margin-top:4px';
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

      /* Insert after the header element */
      header.insertAdjacentElement('afterend', row);
      return true;
    }

    if (!tryPatch()) {
      var obs = new MutationObserver(function() { tryPatch(); });
      obs.observe(document.body, { childList: true, subtree: true });
    }
  })();
})();
