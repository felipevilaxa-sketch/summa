(function(){
  const SUGGESTIONS = [
    {group:'Palabras clave', items:['Financiamiento progresivo','Lectoescritura','Equidad vertical','Plan de mejoramiento','Formación docente']},
    {group:'Países', items:['Chile','Brasil','Estados Unidos','Colombia','Perú','Guatemala']},
    {group:'Conceptos', items:['Weighted Student Funding','Alumno prioritario','Adecuación del gasto','Condiciones habilitantes','Marco WISE']}
  ];

  function resultsHref(q){
    const dc = /\.dc\.html?$/i.test(location.pathname);
    return (dc ? 'Resultados.dc.html' : 'resultados.html') + '?q=' + encodeURIComponent(q || '');
  }

  class SiteSearch extends HTMLElement {
    connectedCallback(){
      if(this._mounted) return;
      this._mounted = true;
      this.style.display = 'block';
      this.innerHTML = `
        <button type="button" data-toggle aria-label="Buscar" aria-expanded="false" style="width:40px;height:40px;border-radius:50%;border:1.5px solid #0D4A57;background:none;color:#0D4A57;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .15s,color .15s">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </button>
        <div data-scrim hidden style="position:fixed;left:0;right:0;bottom:0;top:0;background:rgba(23,36,42,.45);z-index:48;opacity:0;transition:opacity .2s ease"></div>
        <div data-panel hidden style="position:fixed;left:0;right:0;top:0;background:#fff;border-top:1px solid #ECF1EF;box-shadow:0 14px 30px -12px rgba(13,74,87,.22);z-index:51;max-height:calc(100dvh - 72px);overflow-y:auto;-webkit-overflow-scrolling:touch">
          <div style="max-width:1240px;margin:0 auto;padding:26px clamp(20px,4vw,40px) 30px">
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:40px">
              <div style="flex:1;min-width:240px;display:flex;align-items:center;gap:12px;border:1.5px solid #DCE3E1;border-radius:12px;padding:0 16px;background:#fff">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8CA0A5" stroke-width="2" style="flex-shrink:0"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input data-input type="search" placeholder="Busca un caso, una línea de reforma, un país o un concepto" style="flex:1;border:none;outline:none;background:none;font-family:'Google Sans Text',system-ui,sans-serif;font-size:15px;color:#17242A;padding:15px 0">
              </div>
              <button type="button" data-submit style="font-family:'Google Sans',sans-serif;background:#0D4A57;border:1.5px solid #0D4A57;color:#fff;font-size:13px;letter-spacing:.03em;padding:0 30px;border-radius:999px;cursor:pointer;white-space:nowrap;transition:background .15s,color .15s">BUSCAR</button>
              <button type="button" data-close aria-label="Cerrar buscador" style="width:52px;height:52px;flex-shrink:0;border:1.5px solid #0D4A57;background:none;color:#0D4A57;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            <div data-sugg style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px"></div>
          </div>
        </div>`;

      const btn = this.querySelector('[data-toggle]');
      const panel = this.querySelector('[data-panel]');
      const input = this.querySelector('[data-input]');
      const submit = this.querySelector('[data-submit]');

      btn.addEventListener('mouseenter', function(){ btn.style.background = '#0D4A57'; btn.style.color = '#fff'; });
      btn.addEventListener('mouseleave', function(){ btn.style.background = 'none'; btn.style.color = '#0D4A57'; });
      submit.addEventListener('mouseenter', function(){ submit.style.background = '#fff'; submit.style.color = '#0D4A57'; });
      submit.addEventListener('mouseleave', function(){ submit.style.background = '#0D4A57'; submit.style.color = '#fff'; });

      const sugg = this.querySelector('[data-sugg]');
      SUGGESTIONS.forEach(function(g){
        const col = document.createElement('div');
        const h = document.createElement('div');
        h.setAttribute('style', "font-family:'Google Sans',sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8CA0A5;margin-bottom:11px");
        h.textContent = g.group;
        col.appendChild(h);
        const row = document.createElement('div');
        row.setAttribute('style', 'display:flex;flex-wrap:wrap;gap:8px');
        g.items.forEach(function(t){
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.setAttribute('style', "font-family:'Google Sans',sans-serif;font-size:12.5px;font-weight:600;color:#0D4A57;background:#F4F7F6;border:1px solid transparent;border-radius:999px;padding:8px 14px;cursor:pointer;transition:border-color .15s,background .15s");
          chip.textContent = t;
          chip.addEventListener('mouseenter', function(){ chip.style.borderColor = '#8BC53F'; chip.style.background = '#fff'; });
          chip.addEventListener('mouseleave', function(){ chip.style.borderColor = 'transparent'; chip.style.background = '#F4F7F6'; });
          chip.addEventListener('click', function(){ location.href = resultsHref(t); });
          row.appendChild(chip);
        });
        col.appendChild(row);
        sugg.appendChild(col);
      });

      const scrim = this.querySelector('[data-scrim]');
      const header = () => {
        const nav = this.closest('nav');
        return nav ? nav.parentElement : null;
      };
      const place = () => {
        const hdr = header();
        const hBottom = hdr ? hdr.getBoundingClientRect().bottom : 81;
        const hHeight = hdr ? hdr.getBoundingClientRect().height : 81;
        panel.style.top = hBottom + 'px';
        panel.style.maxHeight = 'calc(100dvh - ' + hBottom + 'px)';
        scrim.style.top = hBottom + 'px';
        // keep the header spacer in sync when the nav wraps
        if(hdr && getComputedStyle(hdr).position === 'fixed'){
          const sp = hdr.nextElementSibling;
          if(sp && sp.getAttribute('aria-hidden') === 'true' && !sp.children.length) sp.style.height = hHeight + 'px';
        }
      };
      window.addEventListener('resize', place);
      window.addEventListener('load', place);
      place();
      const SVG_LUPA = '<circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>';
      const SVG_CLOSE = '<line x1="6" y1="6" x2="18" y2="18"></line><line x1="6" y1="18" x2="18" y2="6"></line>';
      const open = () => {
        place();
        scrim.hidden = false;
        requestAnimationFrame(function(){ scrim.style.opacity = '1'; });
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
        if (window.innerWidth <= 900) btn.querySelector('svg').innerHTML = SVG_CLOSE;
        document.dispatchEvent(new CustomEvent('platform:search-open'));
        setTimeout(function(){ input.focus(); }, 20);
      };
      const close = () => {
        scrim.style.opacity = '0';
        setTimeout(function(){ scrim.hidden = true; }, 200);
        panel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        if (window.innerWidth <= 900) btn.querySelector('svg').innerHTML = SVG_LUPA;
      };
      document.addEventListener('platform:nav-open', function(){ if (!panel.hidden) close(); });
      btn.addEventListener('click', function(){ panel.hidden ? open() : close(); });
      const closeBtn = this.querySelector('[data-close]');
      closeBtn.addEventListener('click', close);
      var mobStyle = document.createElement('style');
      mobStyle.textContent = '@media(max-width:900px){[data-close]{display:none!important}[data-sugg]{display:none!important}}';
      document.head.appendChild(mobStyle);
      closeBtn.addEventListener('mouseenter', function(){ closeBtn.style.background = '#0D4A57'; closeBtn.style.color = '#fff'; });
      closeBtn.addEventListener('mouseleave', function(){ closeBtn.style.background = 'none'; closeBtn.style.color = '#0D4A57'; });
      scrim.addEventListener('click', close);
      const go = function(){ location.href = resultsHref(input.value.trim()); };
      submit.addEventListener('click', go);
      input.addEventListener('keydown', function(e){ if(e.key === 'Enter') go(); });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
    }
  }
  if(!customElements.get('site-search')) customElements.define('site-search', SiteSearch);
})();
