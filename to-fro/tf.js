(function() {
  var FLAT = [["abbotsford", "Abbotsford", "abbotsford yxx abbotsford airport"], ["alert-bay", "Alert Bay", "alert bay cormorant island"], ["barkerville", "Barkerville", "barkerville"], ["bella-bella", "Bella Bella", "bella bella mcloughlin bay waglisla"], ["bella-coola", "Bella Coola", "bella coola"], ["bowen-island", "Bowen Island", "bowen island snug cove"], ["brentwood-bay", "Brentwood Bay", "brentwood bay saanich peninsula"], ["burnaby", "Burnaby", "burnaby"], ["burns-lake", "Burns Lake", "burns lake"], ["calgary", "Calgary, AB", "calgary, ab yyc"], ["campbell-river", "Campbell River", "campbell river"], ["castlegar", "Castlegar", "castlegar"], ["chilliwack", "Chilliwack", "chilliwack"], ["clearwater", "Clearwater", "clearwater"], ["comox", "Comox", "comox little river comox valley"], ["coquitlam", "Coquitlam", "coquitlam"], ["cortes-island", "Cortes Island", "cortes island whaletown"], ["courtenay", "Courtenay (Comox Valley)", "courtenay (comox valley)"], ["cranbrook", "Cranbrook", "cranbrook"], ["creston", "Creston", "creston"], ["delta", "Delta", "delta tsawwassen ladner"], ["denman-island", "Denman Island", "denman island gravelly bay"], ["duncan", "Duncan (Cowichan Valley)", "duncan (cowichan valley)"], ["fernie", "Fernie", "fernie"], ["gabriola-island", "Gabriola Island", "gabriola island descanso bay"], ["galiano-island", "Galiano Island", "galiano island sturdies bay"], ["gibsons", "Gibsons", "gibsons langdale sunshine coast"], ["golden", "Golden", "golden"], ["haida-gwaii", "Haida Gwaii", "haida gwaii skidegate sandspit alliford bay queen charlotte daajing giids masset"], ["harrison-hot-springs", "Harrison Hot Springs", "harrison hot springs"], ["hope", "Hope", "hope"], ["hornby-island", "Hornby Island", "hornby island shingle spit"], ["houston", "Houston", "houston"], ["kamloops", "Kamloops", "kamloops"], ["kaslo", "Kaslo", "kaslo"], ["kelowna", "Kelowna", "kelowna ylw kelowna airport"], ["kimberley", "Kimberley", "kimberley"], ["ladysmith", "Ladysmith", "ladysmith"], ["langford", "Langford", "langford"], ["langley", "Langley", "langley carvolth"], ["maple-ridge", "Maple Ridge", "maple ridge"], ["mayne-island", "Mayne Island", "mayne island village bay"], ["merritt", "Merritt", "merritt"], ["mill-bay", "Mill Bay", "mill bay"], ["mission", "Mission", "mission"], ["nanaimo", "Nanaimo", "nanaimo departure bay duke point hullo"], ["nelson", "Nelson", "nelson"], ["new-hazelton", "New Hazelton", "new hazelton"], ["new-westminster", "New Westminster", "new westminster"], ["north-cowichan", "North Cowichan (Chemainus & Crofton)", "north cowichan (chemainus & crofton) chemainus crofton"], ["north-vancouver", "North Vancouver", "north vancouver lonsdale quay north van lynn valley"], ["ocean-falls", "Ocean Falls", "ocean falls"], ["oliver", "Oliver", "oliver"], ["osoyoos", "Osoyoos", "osoyoos"], ["parksville", "Parksville", "parksville"], ["pemberton", "Pemberton", "pemberton"], ["pender-island", "Pender Island", "pender island otter bay"], ["penelakut-island", "Penelakut Island", "penelakut island"], ["penticton", "Penticton", "penticton"], ["port-alberni", "Port Alberni", "port alberni"], ["port-coquitlam", "Port Coquitlam", "port coquitlam"], ["port-hardy", "Port Hardy", "port hardy bear cove"], ["port-mcneill", "Port McNeill", "port mcneill"], ["port-moody", "Port Moody", "port moody"], ["port-renfrew", "Port Renfrew", "port renfrew"], ["powell-river", "Powell River", "powell river saltery bay westview sunshine coast"], ["prince-george", "Prince George", "prince george"], ["prince-rupert", "Prince Rupert", "prince rupert"], ["princeton", "Princeton", "princeton"], ["quadra-island", "Quadra Island", "quadra island quathiaski cove heriot bay"], ["qualicum-beach", "Qualicum Beach", "qualicum beach"], ["quesnel", "Quesnel", "quesnel"], ["revelstoke", "Revelstoke", "revelstoke"], ["richmond", "Richmond", "richmond"], ["rossland", "Rossland", "rossland"], ["saanich", "Saanich", "saanich"], ["salmon-arm", "Salmon Arm", "salmon arm"], ["salt-spring-island", "Salt Spring Island", "salt spring island ssi fulford vesuvius long harbour ganges"], ["saturna-island", "Saturna Island", "saturna island lyall harbour"], ["seattle", "Seattle, WA", "seattle, wa seatac sea-tac"], ["sechelt", "Sechelt", "sechelt sunshine coast"], ["shearwater", "Shearwater", "shearwater denny island"], ["sicamous", "Sicamous", "sicamous"], ["smithers", "Smithers", "smithers"], ["sointula", "Sointula", "sointula malcolm island"], ["sooke", "Sooke", "sooke"], ["squamish", "Squamish", "squamish"], ["summerland", "Summerland", "summerland"], ["surrey", "Surrey", "surrey"], ["terrace", "Terrace", "terrace"], ["texada-island", "Texada Island", "texada island blubber bay"], ["thetis-island", "Thetis Island", "thetis island preedy harbour"], ["tofino", "Tofino", "tofino"], ["trail", "Trail", "trail"], ["ucluelet", "Ucluelet", "ucluelet"], ["vancouver", "Vancouver", "vancouver yvr vancouver airport downtown vancouver"], ["vanderhoof", "Vanderhoof", "vanderhoof"], ["vernon", "Vernon", "vernon"], ["victoria", "Victoria", "victoria yyj victoria airport swartz bay sidney"], ["west-kelowna", "West Kelowna", "west kelowna"], ["west-vancouver", "West Vancouver", "west vancouver horseshoe bay"], ["whistler", "Whistler", "whistler"], ["williams-lake", "Williams Lake", "williams lake ywl williams lake airport"]].map(function(o) {
    return {value: o[0], label: o[1], search: o[2]};
  });
  var LABEL = {};
  FLAT.forEach(function(o) { LABEL[o.value] = o.label; });

  var f = document.getElementById('tf-from'), t = document.getElementById('tf-to');
  if (!f || !t) return;
  var chosen = { 'tf-from': window.TF_SEL[0], 'tf-to': window.TF_SEL[1] };

  function setLabel(btn) { btn.textContent = LABEL[chosen[btn.id]] || 'Choose'; }
  setLabel(f); setLabel(t);

  // one shared popup, re-anchored to whichever trigger is open
  var backdrop = document.createElement('div');
  backdrop.className = 'tf-pop-backdrop'; backdrop.hidden = true;
  document.body.appendChild(backdrop);
  var pop = document.createElement('div');
  pop.className = 'tf-pop'; pop.setAttribute('role', 'listbox'); pop.hidden = true;
  var search = document.createElement('input');
  search.className = 'tf-pop-search'; search.type = 'text';
  search.setAttribute('placeholder', 'Type to filter…');
  search.setAttribute('autocomplete', 'off');
  pop.appendChild(search);
  document.body.appendChild(pop);
  var optEls = [];   // rendered .tf-pop-opt nodes, in display order (filtered view)
  var openBtn = null, activeIdx = -1;

  function addOpt(o, cur) {
    var el = document.createElement('div');
    el.className = 'tf-pop-opt'; el.textContent = o.label;
    el.setAttribute('role', 'option'); el.dataset.value = o.value;
    if (o.value === cur) el.setAttribute('aria-selected', 'true');
    el.addEventListener('click', function() { pick(o.value); });
    el.addEventListener('mousemove', function() { setActive(optEls.indexOf(el)); });
    pop.appendChild(el); optEls.push(el);
  }

  function render(btn, filterText) {
    while (pop.lastChild !== search) pop.removeChild(pop.lastChild);
    optEls = [];
    var cur = chosen[btn.id];
    var q = (filterText || '').trim().toLowerCase();
    if (!q) {
      FLAT.forEach(function(o) { addOpt(o, cur); });
      return;
    }
    var matches = FLAT.filter(function(o) { return o.search.indexOf(q) !== -1; });
    if (!matches.length) {
      var e = document.createElement('div');
      e.className = 'tf-pop-empty'; e.textContent = 'No matches';
      pop.appendChild(e);
      return;
    }
    matches.forEach(function(o) { addOpt(o, cur); });
  }
  function setActive(i) {
    if (activeIdx > -1 && optEls[activeIdx]) optEls[activeIdx].classList.remove('tf-active');
    activeIdx = i;
    if (i > -1 && optEls[i]) {
      optEls[i].classList.add('tf-active');
      optEls[i].scrollIntoView({ block: 'nearest' });
    }
  }
  function place(btn) {
    var r = btn.getBoundingClientRect();
    pop.style.left = pop.style.top = pop.style.bottom = 'auto';
    pop.hidden = false;                       // measure with real dimensions
    var pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.min(r.left + window.scrollX, window.scrollX + document.documentElement.clientWidth - pw - 8);
    left = Math.max(window.scrollX + 8, left);
    var below = window.innerHeight - r.bottom;
    pop.style.left = left + 'px';
    if (below < ph + 12 && r.top > below) {   // flip up when there's more room above
      pop.style.top = (r.top + window.scrollY - ph - 4) + 'px';
    } else {
      pop.style.top = (r.bottom + window.scrollY + 4) + 'px';
    }
  }
  function open(btn) {
    if (openBtn) close();
    openBtn = btn; search.value = ''; render(btn, '');
    place(btn);
    backdrop.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    var sel = optEls.map(function(e) { return e.dataset.value; }).indexOf(chosen[btn.id]);
    setActive(sel > -1 ? sel : 0);
    search.focus();
  }
  function close() {
    if (!openBtn) return;
    pop.hidden = true;
    backdrop.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    if (activeIdx > -1 && optEls[activeIdx]) optEls[activeIdx].classList.remove('tf-active');
    openBtn = null; activeIdx = -1;
  }
  function pick(value) {
    if (!openBtn) return;
    var btn = openBtn;
    chosen[btn.id] = value; setLabel(btn);
    close(); btn.focus();
  }
  function onBtnKey(e) {
    if (openBtn) return;   // once open, the search box owns keyboard nav
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); open(e.currentTarget);
    }
  }
  function onSearchKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(activeIdx + 1, optEls.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(activeIdx - 1, 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0); }
    else if (e.key === 'End') { e.preventDefault(); setActive(optEls.length - 1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx > -1) pick(optEls[activeIdx].dataset.value);
    }
    else if (e.key === 'Escape') { e.preventDefault(); var b = openBtn; close(); b.focus(); }
    else if (e.key === 'Tab') { close(); }
    // all other keys (letters, space, backspace…) type into the box normally;
    // the 'input' listener below re-filters on every change.
  }
  search.addEventListener('keydown', onSearchKey);
  search.addEventListener('input', function() {
    render(openBtn, search.value);
    setActive(optEls.length ? 0 : -1);
    place(openBtn);
  });
  [f, t].forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (openBtn === btn) { close(); } else { open(btn); }
    });
    btn.addEventListener('keydown', onBtnKey);
  });
  backdrop.addEventListener('mousedown', function() { close(); });
  document.addEventListener('mousedown', function(e) {
    if (openBtn && !pop.contains(e.target) && e.target !== openBtn) close();
  });
  window.addEventListener('resize', function() { if (openBtn) place(openBtn); });
  window.addEventListener('scroll', function() { if (openBtn) place(openBtn); }, true);

  document.getElementById('tf-go').addEventListener('click', function() {
    if (chosen['tf-from'] === chosen['tf-to']) {
      document.getElementById('tf-samespot').style.display = 'block';
      return;
    }
    document.getElementById('tf-samespot').style.display = 'none';
    window.location.href = '/to-fro/' + chosen['tf-from'] + '/' + chosen['tf-to'] + '/';
  });
})();
