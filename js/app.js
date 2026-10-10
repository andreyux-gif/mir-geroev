/* Мир героев — статический сайт без сервера и без сбора данных.
   Прогресс (подсказки, находки, шапка, звук, день/ночь) хранится только в браузере. */
(function () {
  'use strict';

  /* ---------- Данные ---------- */

  var HEROES = [
    { id: 'ulyana', name: 'Ульяна', of: 'Ульяны', sky: '#DDEFFF',
      character: 'Очень добрая. У неё есть крылышки, но она с ними плохо летает. На проказы Йоши может ответить тем же.',
      power: 'Может летать', powerShort: 'может летать',
      world: { short: 'Там, где всегда радуга', text: 'Там, где всегда радуга (где она всегда спит и скатывается вниз)',
        night: 'Ночь. Ульяна спит на радуге… и скатывается вниз', alt: 'Радуга над зелёными холмами' },
      friends: [], eye: { grad: ['#B9F28A', '#4FC24A', '#1F7A3A'], pupil: '#173A22' } },
    { id: 'lana', name: 'Лана', of: 'Ланы', sky: '#EADFFF',
      character: 'Добрая :3, милая, отзывчивая.',
      power: 'Может разговаривать с кисиками (кошками)', powerShort: 'говорит с кошками',
      world: { short: 'Там, где всё (почти) в кошках :3', text: 'Там, где всё (почти) в кошках :3',
        night: 'Ночь. Тсс… кошки спят', alt: 'Кошки на зелёной поляне' },
      friends: ['yoshi', 'ulyana'], eye: { grad: ['#F2B36E', '#A9561F', '#5C2A0E'], pupil: '#2E1408' } },
    { id: 'yoshi', name: 'Йоши', of: 'Йоши', sky: '#FFF2B8', phrase: '«Прости, пожалуйста»',
      character: 'Добрый, но иногда любит попакостить.',
      power: 'Может призвать своего кота', powerShort: 'призывает своего кота',
      world: { short: 'С жёлтым небом', text: 'Мир с жёлтым небом.',
        night: 'Ночь. Даже жёлтое небо стало тёмным', alt: 'Жёлтое небо, вдалеке Ульяна' },
      friends: [], eye: { grad: ['#F1F7FB', '#BBD8EC', '#7FA5C2'], pupil: '#24384A' } },
    { id: 'liza', name: 'Лиза', of: 'Лизы', sky: '#FFE9D4',
      character: 'Умная, добрая и хитрая.',
      power: 'Может облить друзей или врагов чаем или дать им чай: им можно вылечиться или, наоборот, сделать больно', powerShort: 'чай, который лечит или ранит',
      world: { short: 'С чайком и печеньками', text: 'Мир с чайком и печеньками.',
        night: 'Ночь. Самое время для вечернего чая', alt: 'Чашка чая с паром, чайник и печеньки' },
      friends: ['candy', 'lana', 'yoshi', 'ulyana'], eye: { grad: ['#F1F7FB', '#BBD8EC', '#7FA5C2'], pupil: '#24384A' }, wink: true },
    { id: 'candy', name: 'Кенди', of: 'Кенди', sky: '#DDF6F2',
      character: 'Добрая и весёлая, иногда (немного) дерзкая.',
      power: 'Её шапка может делать её невидимой <3', powerShort: 'шапка-невидимка <3',
      world: { short: 'С конфетами', text: 'Мир с конфетами.',
        night: 'Ночь. Конфеты спят в фантиках', alt: 'Розовое небо, леденцы и конфеты на мятной поляне' },
      friends: ['lana', 'yoshi', 'ulyana', 'liza'], eye: { grad: ['#FFBDB4', '#F5646C', '#C73A4C'], pupil: '#6A1A28' } }
  ];
  var BY = {};
  HEROES.forEach(function (h) { BY[h.id] = h; });

  var POWERS = {
    ulyana: { label: 'Полетать', result: 'Взлетела… и чуть не упала! Летает она пока плохо.', fx: 'translateY(-46px) rotate(-10deg)' },
    lana: { label: 'Поговорить с кошкой', result: '«Мяу!» — что ответила кошка, скоро напишет автор.' },
    yoshi: { label: 'Позвать кота', result: 'Кот пришёл! Йоши доволен.' },
    liza: { label: 'Дать чай' },
    candy: { label: 'Надеть шапку', result: 'Кенди стала невидимой! Зато теперь видно спрятанное — поищи звёздочку и загляни в лобби.' }
  };

  // Находки разбросаны по всему сайту и появляются только при условии
  var ITEMS = [
    { id: 'feather', name: 'Перо Ульяны', bg: '#DDEFFF', riddle: 'Падает, когда кто-то пытается полетать' },
    { id: 'yarn', name: 'Клубок Ланы', bg: '#EADFFF', riddle: 'Ночью там, где все собираются' },
    { id: 'paw', name: 'След кота Йоши', bg: '#FFF2B8', riddle: 'Кот Йоши гуляет там, где все дружат' },
    { id: 'cookie', name: 'Печенька Лизы', bg: '#FFE9D4', riddle: 'Лизина сладость в чужом сладком мире' },
    { id: 'candy', name: 'Конфета Кенди', bg: '#FFE3EE', riddle: 'Появляется, когда чай получился коварным' },
    { id: 'key', name: 'Ключик Йоши', bg: '#FFF2B8', riddle: 'Там, где ничего нет' },
    { id: 'spoon', name: 'Ложечка Лизы', bg: '#FFE9D4', riddle: 'Встряхни — и что-то прольётся' },
    { id: 'bell', name: 'Колокольчик кота Йоши', bg: '#FFF2B8', riddle: 'Его носит тот, кто убегает от пальца' }
  ];
  var HINTS_TOTAL = 3;

  var LINKS = [['lana', 'yoshi'], ['lana', 'ulyana'], ['liza', 'candy'], ['liza', 'lana'], ['liza', 'yoshi'], ['liza', 'ulyana'], ['candy', 'lana'], ['candy', 'yoshi'], ['candy', 'ulyana']];
  var PRANKS = [['ulyana', 'yoshi']];
  var MAP_POS = { ulyana: [50, 15], lana: [83, 39], yoshi: [71, 77], liza: [29, 77], candy: [17, 39] };

  /* ---------- Хранилище (с запасным вариантом в памяти) ---------- */

  var mem = {};
  function get(key, def) {
    try {
      var v = window.localStorage.getItem('lizaWorld.' + key);
      if (v !== null) return JSON.parse(v);
    } catch (e) { /* хранилище недоступно */ }
    return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : def;
  }
  function set(key, val) {
    mem[key] = val;
    try { window.localStorage.setItem('lizaWorld.' + key, JSON.stringify(val)); } catch (e) { /* ничего */ }
  }
  function addTo(key, id) {
    var list = get(key, []).slice();
    if (list.indexOf(id) < 0) list.push(id);
    set(key, list);
    return list;
  }
  function has(key, id) { return get(key, []).indexOf(id) >= 0; }

  function isNight() {
    var pref = get('night', null);
    if (pref === 'night') return true;
    if (pref === 'day') return false;
    var hr = new Date().getHours();
    return hr >= 21 || hr < 7;
  }

  /* ---------- Звук (синтез, без файлов) ---------- */

  var ac = null;
  var SOUNDS = {
    pop: [[220, 90]], pick: [[660]], hint: [[784], [988], [1319]], item: [[1046], [1318]], sorry: [[523], [392]],
    hat: [[880], [660], [440]], on: [[523], [784]], tea: [[1046], [1318], [1568]],
    ulyana: [[440, 880]], lana: [[760, 520]], yoshi: [[520, 700]], liza: [[1046, 1318]], candy: [[880, 440]]
  };
  function beep(kind) {
    if (!get('sound', false)) return;
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      ac = ac || new C();
      (SOUNDS[kind] || [[600]]).forEach(function (n, i) {
        var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + i * 0.12;
        o.type = kind === 'lana' ? 'triangle' : 'sine';
        o.frequency.setValueAtTime(n[0], t);
        if (n[1]) o.frequency.linearRampToValueAtTime(n[1], t + 0.3);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (n[1] ? 0.4 : 0.2));
        o.connect(g); g.connect(ac.destination);
        o.start(t); o.stop(t + 0.45);
      });
    } catch (e) { /* без звука */ }
  }

  /* ---------- Мелочи ---------- */

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function heroImg(id) { return 'img/heroes/' + id + '.svg'; }
  function itemImg(id) { return 'img/items/' + id + '.svg'; }

  var toastTimer;
  function toast(text, sub, face) {
    var el = document.getElementById('toast');
    el.classList.toggle('with-face', !!face);
    el.innerHTML = (face ? '<span class="toast-face sticker-face">' + emoImg(face[0], face[1], '', true) + '</span>' : '') + '<span>' + esc(text) + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</span>';
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2800);
  }

  var ICON = {
    eyes: '<svg aria-hidden="true" width="26" height="16" viewBox="0 0 26 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="6.5" cy="8" r="5.2"/><circle cx="19.5" cy="8" r="5.2"/><circle cx="7.4" cy="9" r="2.1" fill="currentColor" stroke="none"/><circle cx="20.4" cy="9" r="2.1" fill="currentColor" stroke="none"/></svg>',
    back: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    left: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
    star: function (size, fill) { return '<svg aria-hidden="true" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"><path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z" fill="' + (fill || '#FFC94D') + '" stroke="#2B2233" stroke-width="1.8" stroke-linejoin="round"/></svg>'; },
    soundOn: '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    soundOff: '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>',
    bolt: '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
    lock: '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8C8298" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    sparkle: '<svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>',
    moon: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#FFF3B0" stroke="#2B2233" stroke-width="2"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>',
    note: '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/></svg>',
    sun: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" stroke="#2B2233" stroke-width="2"><circle cx="12" cy="12" r="5" fill="#FFD25E"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" fill="none"/></svg>'
  };

  function hintPill() {
    var n = get('hints', []).length;
    return '<div class="pill" aria-label="Найдено подсказок: ' + n + ' из ' + HINTS_TOTAL + '">' + ICON.eyes + '<span>' + n + '/' + HINTS_TOTAL + '</span></div>';
  }
  function backBtn(href, text) {
    return '<a class="btn" href="' + href + '">' + ICON.back + '<span>' + (text || 'Назад') + '</span></a>';
  }
  function findBtn(act, img, label, style) {
    return '<button class="find" data-act="' + act + '" aria-label="' + esc(label) + '" style="' + style + '"><img src="' + img + '" alt=""></button>';
  }

  /* ---------- Навигация ---------- */

  var NAV = [
    ['#/', 'Герои', 'heroes', '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.2c2.8.3 5 2.6 5 5.8"/></svg>'],
    ['#/world', 'Миры', 'world', '<svg aria-hidden="true" viewBox="0 0 26 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="6.5" cy="8" r="5.2"/><circle cx="19.5" cy="8" r="5.2"/><circle cx="7.4" cy="9" r="2.1" fill="currentColor" stroke="none"/><circle cx="20.4" cy="9" r="2.1" fill="currentColor" stroke="none"/></svg>'],
    ['#/album', 'Альбом', 'album', '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M12 8h5M12 12h5"/></svg>'],
    ['#/friends', 'Дружба', 'friends', '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="7" r="3"/><circle cx="18" cy="7" r="3"/><circle cx="12" cy="18" r="3"/><path d="M8.5 9l2 6.5M15.5 9l-2 6.5M9 7h6"/></svg>'],
    ['#/more', 'Ещё', 'more', '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.4 5.3 5.6.6-4.2 3.8 1.2 5.6L12 15.4l-5 2.9 1.2-5.6L4 8.9l5.6-.6z"/></svg>']
  ];
  function renderNav(section) {
    document.getElementById('nav').innerHTML = NAV.map(function (n) {
      var cur = n[2] === section || (section === 'hero' && n[2] === 'heroes') || (n[2] === 'more' && ['fly', 'cipher', 'card', 'stickers', 'lost', 'quiz', 'invite', 'hi', 'wallpapers', 'draw', 'pack', 'eyes', 'hospital', 'case', 'tower'].indexOf(section) >= 0);
      return '<a href="' + n[0] + '"' + (cur ? ' aria-current="page"' : '') + '>' + n[3] + '<span>' + n[1] + '</span></a>';
    }).join('');
  }

  /* ---------- Состояние экранов (в памяти) ---------- */

  var DAY = Math.floor(Date.now() / 86400000) % HEROES.length;
  var ui = {
    lobby: DAY,
    pranks: [['flipTitle', 'flipCta', 'catTitle', 'swapName'][Math.floor(Math.random() * 4)]],
    prankFixed: false,
    tried: false, heal: false,
    world: 'ulyana',
    friend: 'ulyana',
    card: { name: '', poured: false, heal: false }
  };

  var cleanups = [];
  function cleanup() { cleanups.forEach(function (f) { f(); }); cleanups = []; }

  /* ---------- Лобби ---------- */

  // Следящие глаза лобби — точная копия глаз рисунка (тот же размер радужки, зрачка и бликов),
  // только радужка двигается за пальцем внутри белка. Поэтому при смене эмоции глаз не «прыгает».
  var EYE_WHITE = { candy: '#FFF0EE', lana: '#F1EAFF' };
  function eyeOverlay(h) {
    var cxs = h.wink ? [253] : [147, 253];
    var g = h.eye.grad;
    var defs = '<defs><radialGradient id="ovIris" cx=".5" cy=".62" r=".6"><stop offset="0" stop-color="' + g[0] + '"/><stop offset=".55" stop-color="' + g[1] + '"/><stop offset="1" stop-color="' + g[2] + '"/></radialGradient>' +
      '<radialGradient id="ovWhite" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="' + (EYE_WHITE[h.id] || '#E8F3FF') + '"/></radialGradient>' +
      '<radialGradient id="ovSkin" gradientUnits="userSpaceOnUse" cx="182.1" cy="185.1" r="156.8"><stop offset="0" stop-color="#FFF4EC"/><stop offset="1" stop-color="#FFDCC8"/></radialGradient>' +
      cxs.map(function (cx) { return '<clipPath id="ovc' + cx + '"><circle cx="' + cx + '" cy="228" r="42.5"/></clipPath>'; }).join('') + '</defs>';
    var eyes = cxs.map(function (cx) {
      var ix = cx + (cx < 200 ? 3 : -3);
      return '<circle cx="' + cx + '" cy="228" r="42.5" fill="url(#ovWhite)"/>' +
        '<g clip-path="url(#ovc' + cx + ')"><g class="pupil">' +
        '<circle cx="' + ix + '" cy="234" r="35" fill="url(#ovIris)" stroke="#2B2233" stroke-width="3"/>' +
        '<circle cx="' + ix + '" cy="237" r="21" fill="' + h.eye.pupil + '"/>' +
        '<circle cx="' + (ix + 12) + '" cy="221" r="10" fill="#fff"/>' +
        '<circle cx="' + (ix - 11) + '" cy="250" r="5" fill="#fff"/></g></g>' +
        '<g class="lid"><circle cx="' + cx + '" cy="228" r="43" fill="url(#ovSkin)"/><path d="M' + (cx - 38) + ' 226 Q' + cx + ' 250 ' + (cx + 38) + ' 226" fill="none" stroke="#2B2233" stroke-width="6.5" stroke-linecap="round"/></g>';
    }).join('');
    return '<svg class="eyes-ov" aria-hidden="true" viewBox="0 0 400 720">' + defs + eyes + '</svg>';
  }

  function renderLobby() {
    var h = HEROES[ui.lobby];
    var hat = get('hat', false);
    var sound = get('sound', false);
    var hints = get('hints', []);
    var pranks = ui.prankFixed ? [] : ui.pranks;
    var hol = holidayNow();
    var allHats = get('allHats', false);
    var pot = potionToday(h.id);
    var night = isNight();
    var stars = [[8, 12, 4], [23, 25, 3], [38, 14, 5], [54, 30, 3], [67, 12, 4], [85, 27, 3], [46, 22, 3], [15, 32, 4]].map(function (s) {
      return '<i class="star-dot" style="left:' + s[0] + '%;top:' + s[1] + '%;width:' + s[2] + 'px;height:' + s[2] + 'px"></i>';
    }).join('');
    var html =
      '<section class="lobby' + (hol === 'birthday' ? ' party' : '') + '">' +
      '<div class="bg" aria-hidden="true"><div class="sun"></div><div class="moon"></div>' +
      '<div class="cloud" style="left:24px;top:140px;width:92px"></div><div class="cloud" style="left:58%;top:200px;width:70px;height:26px"></div>' + stars +
      '<div class="hill h1"></div><div class="hill h2"></div>' + festiveScene(hol) + '</div>' +
      '<div class="lobby-head"><div class="site-name hand">Мир героев</div><div style="display:flex;gap:6px;align-items:center">' +
      '<button class="btn btn-round" data-act="music" aria-pressed="' + music.on + '" aria-label="Музыка"' + (music.on ? ' style="background:var(--lav)"' : '') + '>' + ICON.note + '</button>' +
      '<button class="btn btn-round" data-act="sound" aria-pressed="' + sound + '" aria-label="Звуки">' + (sound ? ICON.soundOn : ICON.soundOff) + '</button>' +
      (hat ? '<button class="btn btn-round" data-act="hat" aria-label="Снять шапку-невидимку" style="padding:4px;background:#DDF6F2"><img src="' + itemImg('hat') + '" alt="" style="width:100%;height:100%"></button>' : '') +
      hintPill() + '</div></div>' +
      '<div style="position:relative"><h1 class="hand lobby-title' + (pranks.indexOf('flipTitle') >= 0 ? ' pranked-title' : '') + '">Выбери героя</h1>' +
      (pranks.indexOf('catTitle') >= 0 ? '<img src="img/worlds/yoshi-cat.svg" alt="Кот Йоши уселся на заголовок" style="position:absolute;left:190px;top:-8px;width:56px;height:70px">' : '') + '</div>' +
      (hol === 'birthday' ? '<div class="bday hand">Сегодня день рождения сайта — все в пижамах!</div>' : '') +
      (hol === 'halloween' ? '<div class="bday hand" style="background:#FF9A3D">Сладость или гадость? Ищи тыквы по всему сайту!</div>' : '') +
      (hol === 'newyear' ? '<div class="bday hand" style="background:#BFE3FF">С Новым годом! В мире Йоши падает особая снежинка</div>' : '') +
      '<div class="stage">' + welcomeCard() +
      (hints.length >= HINTS_TOTAL ? '<div class="card" role="status" style="position:absolute;left:16px;right:16px;top:6px;z-index:3;background:var(--violet);color:#fff;text-align:center;font-weight:900">Все подсказки найдены! Секретный герой открыт: скоро здесь появится — его придумывает автор</div>' : '') +
      '<div class="fig' + (h.id === 'candy' && hat ? ' ghost' : '') + (pot ? ' reacting' : '') + '" id="fig" data-hero="' + h.id + '">' + emoImg(h.id, pot ? (pot.heal ? 'joy' : 'angry') : null, h.name) + (hol === 'birthday' ? pajamaOverlay(h.id) : '') + eyeOverlay(h) +
      (allHats ? '<img class="allhat" src="' + itemImg('hat') + '" alt="">' : festiveOverlay(hol)) + '</div>' +
      '<div class="hillcap" aria-hidden="true"></div>' +
      '<div class="zzz hand" aria-hidden="true">Z<span>z</span><span>z</span></div>' +
      (hat && hints.indexOf('lobby-hat') < 0 ? '<button class="find twinkle" data-act="hint" data-id="lobby-hat" aria-label="Что-то блестит на холме" style="right:54px;bottom:58px;padding:4px">' + ICON.star(34) + '</button>' : '') +
      (night && !has('items', 'yarn') ? findBtn('item', itemImg('yarn'), 'Что-то круглое в траве', 'left:20px;bottom:40px;width:38px;height:38px;padding:6px') : '') +
      (pranks.length ? '<button class="yoshi-peek" data-act="sorry" aria-label="Йоши что-то натворил? Нажми на него"><img src="' + heroImg('yoshi') + '" alt=""></button>' : '') +
      '<button class="btn btn-round arrow left" data-act="lobby-prev" aria-label="Предыдущий герой">' + ICON.left + '</button>' +
      '<button class="btn btn-round arrow right" data-act="lobby-next" aria-label="Следующий герой">' + ICON.right + '</button>' +
      '</div>' +
      '<div class="lobby-bottom"><div style="display:flex;align-items:center;gap:8px">' +
      '<div class="nameplate">' + (ui.lobby === DAY ? '<span class="badge-day">Герой дня</span>' : '') +
      '<span class="hand">' + (pranks.indexOf('swapName') >= 0 ? HEROES[(ui.lobby + 2) % HEROES.length].name : h.name) + '</span><small>' + esc(h.powerShort) + '</small></div>' +
      (h.id === 'candy' ? '<button class="btn hat-btn" data-act="hat" aria-pressed="' + hat + '" aria-label="Шапка-невидимка Кенди"><img src="' + itemImg('hat') + '" alt="" style="width:100%;height:100%"></button>' : '') +
      '</div><div class="thumbs">' + HEROES.map(function (t, i) {
        return '<button class="thumb" data-act="lobby-pick" data-i="' + i + '" aria-label="' + t.name + '" aria-pressed="' + (i === ui.lobby) + '"><img src="' + heroImg(t.id) + '" alt=""></button>';
      }).join('') + '</div>' +
      '<a class="btn btn-big btn-violet' + (pranks.indexOf('flipCta') >= 0 ? ' pranked-cta' : '') + '" href="#/hero/' + h.id + '">Открыть карточку</a>' +
      '</div></section>';
    return html;
  }

  function mountLobby() {
    var fig = document.getElementById('fig');
    if (!fig) return;
    var pupils = fig.querySelectorAll('.pupil');
    function look(e) {
      var r = fig.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height * 228 / 720;
      var dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 140));
      var dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 200));
      var t = 'translate(' + (dx * 7).toFixed(1) + 'px, ' + (dy * 6).toFixed(1) + 'px)';
      pupils.forEach(function (p) { p.style.transform = t; });
    }
    document.addEventListener('pointermove', look);
    document.addEventListener('pointerdown', look);
    var blink = setInterval(function () {
      fig.classList.add('blink');
      setTimeout(function () { fig.classList.remove('blink'); }, 160);
    }, 3600);
    cleanups.push(function () {
      document.removeEventListener('pointermove', look);
      document.removeEventListener('pointerdown', look);
      clearInterval(blink);
    });
  }

  /* ---------- Профиль ---------- */

  function renderHero(id) {
    var h = BY[id] || HEROES[0];
    var p = POWERS[h.id];
    var on = ui.tried;
    var hints = get('hints', []);
    var result = h.id === 'liza' ? (ui.heal ? 'Чай вылечил! Другу сразу стало лучше.' : 'Ой! Этот чай сделал больно. Хитрая Лиза…') : p.result;
    var fx = on && p.fx ? p.fx : 'none';
    var op = on && h.id === 'candy' ? '0.12' : '1';
    var friends = h.friends.length ?
      '<div class="friends">' + h.friends.map(function (f) {
        return '<a class="friend" href="#/hero/' + f + '"><span class="ava"><img src="' + heroImg(f) + '" alt=""></span>' + BY[f].name + '</a>';
      }).join('') + '</div>' :
      '<span class="chip">с кем дружит — скоро напишет автор</span>';
    return '<div class="page paper">' +
      '<div class="topbar">' + backBtn('#/', 'Все герои') + hintPill() + '</div>' +
      '<div class="party" role="group" aria-label="Выбор героя">' + HEROES.map(function (t) {
        return '<a class="ava" href="#/hero/' + t.id + '" aria-label="' + t.name + '"' + (t.id === h.id ? ' aria-current="page"' : '') + '><img src="' + heroImg(t.id) + '" alt=""></a>';
      }).join('') + '</div>' +
      '<section class="card card-shadow profile">' +
      '<div class="portrait" style="background:' + h.sky + '">' +
      heroFigure(h.id, 'hero-img', 'transform:' + fx + ';opacity:' + op, on ? POWER_EMO[h.id] : (potionToday(h.id) ? (potionToday(h.id).heal ? 'joy' : 'angry') : null)) +
      (on && h.id === 'yoshi' ? '<img src="img/worlds/yoshi-cat.svg" alt="Кот Йоши" style="position:absolute;left:2px;bottom:14px;width:56px;height:70px">' : '') +
      (on && h.id === 'ulyana' && !has('items', 'feather') ? findBtn('item', itemImg('feather'), 'Что-то упало', 'left:84px;bottom:24px;width:36px;height:36px;padding:5px;transform:rotate(30deg)') : '') +
      (on && h.id === 'candy' && hints.indexOf('candy-hero') < 0 ? '<button class="find twinkle" data-act="hint" data-id="candy-hero" aria-label="Забрать спрятанную подсказку" style="right:6px;top:20px;padding:6px">' + ICON.star(32) + '</button>' : '') +
      '<div class="grass" aria-hidden="true"></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;min-width:0"><h1 class="hand">' + h.name + '</h1>' +
      '<div class="label" style="margin-top:4px">Мир</div><div style="font-size:15px;line-height:1.3">' + esc(h.world.short) + '</div></div>' +
      '</section>' +
      '<section style="display:flex;flex-direction:column;gap:8px"><h2 class="hand">Характер</h2><p class="card" style="margin:0;font-size:16px;line-height:1.4">' + esc(h.character) + '</p>' +
      (h.phrase ? '<div class="phrase"><div class="label" style="color:#4A3D73">Любимая фраза</div><div class="hand" style="font-size:28px">' + esc(h.phrase) + '</div></div>' : '') +
      '</section>' +
      '<section class="card power">' + ICON.sparkle + '<div><div class="hand" style="font-size:26px;line-height:1">Особенность</div><div style="font-size:16px;font-weight:800">' + esc(h.power) + '</div></div></section>' +
      '<section style="display:flex;flex-direction:column;gap:10px">' +
      '<button class="btn btn-big btn-yellow" data-act="power">' + ICON.bolt + '<span>' + (on ? 'Вернуть как было' : p.label) + '</span></button>' +
      (on ? '<div class="card result" role="status">' + esc(result) + '</div>' : '') +
      (h.id === 'liza' ? '<a class="btn btn-big" href="#/card" style="background:#FFE9D4;font-size:16px">Открытка «Чай от Лизы» для друга</a><a class="btn btn-big" href="#/case" style="background:#FFE9D4;font-size:16px">Кто взял мою печеньку?</a>' : '') +
      (h.id === 'ulyana' ? '<a class="btn btn-big" href="#/fly" style="background:#DDEFFF;font-size:16px">Игра: Ульяна учится летать</a>' : '') +
      (h.id === 'lana' ? '<a class="btn btn-big" href="#/cipher" style="background:#EADFFF;font-size:16px">Кошачий шифр Ланы</a>' : '') +
      (h.id === 'yoshi' ? '<a class="btn btn-big" href="#/diary" style="background:#FFF2B8;font-size:16px">Дневник пакостей Йоши</a>' : '') +
      potionBlock(h) +
      '</section>' +
      (h.id === 'liza' ? teaLeaves() : '') +
      '<section style="display:flex;flex-direction:column;gap:10px"><h2 class="hand">Друзья</h2>' + friends + '</section>' +
      '<a class="btn btn-big btn-violet" href="#/world/' + h.id + '">' + ICON.eyes.replace('width="26" height="16"', 'width="36" height="22"') + '<span>Посмотри моими глазами</span></a>' +
      renderStickerSet(h) +
      '</div>';
  }

  /* ---------- Мир ---------- */

  function renderWorld(id) {
    var h = BY[id] || BY[ui.world];
    ui.world = h.id;
    var night = isNight();
    var pref = get('night', null);
    var timeLabel = pref === 'night' ? 'Ночь' : pref === 'day' ? 'День' : (night ? 'Авто: ночь' : 'Авто: день');
    var src = 'img/worlds/world-' + h.id + '.svg';
    var hintHere = h.id === 'lana' && !has('hints', 'lana-world');
    var cookieHere = h.id === 'candy' && !has('items', 'cookie');
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/hero/' + h.id) +
      '<button class="btn time-btn' + (night ? ' night-on' : '') + '" data-act="time" aria-label="Время суток: ' + timeLabel + '. Нажми, чтобы поменять" style="font-size:13px">' + (night ? ICON.moon : ICON.sun) + '<span>' + timeLabel + '</span></button>' +
      hintPill() + '</div>' +
      '<div class="tabs" role="group" aria-label="Чей мир смотреть">' + HEROES.map(function (t) {
        return '<a class="btn" href="#/world/' + t.id + '"' + (t.id === h.id ? ' aria-current="true"' : '') + '>' + t.name + '</a>';
      }).join('') + '</div>' +
      '<div><h1 class="hand" style="font-size:42px">Мир ' + h.of + '</h1><p class="sub">Вот что я вижу своими глазами</p><div style="margin-top:8px">' + weatherChip(h.id) + '</div></div>' +
      '<div class="eyes' + (night ? ' night' : '') + '">' +
      '<div class="lens l"><img class="view" src="' + src + '" alt="' + esc(h.world.alt) + '"><div class="dark"></div>' + weatherLayer(h.id, 1) + '</div>' +
      '<div class="lens r"><img class="view" src="' + src + '" alt=""><div class="dark"></div>' + weatherLayer(h.id, 2) +
      (hintHere ? '<button class="find" data-act="hint" data-id="lana-world" aria-label="Что-то блестит над кошками" style="left:54%;top:15%;padding:10px">' + ICON.star(22) + '</button>' : '') +
      (cookieHere ? findBtn('item', itemImg('cookie'), 'Что-то не похожее на конфету', 'left:12%;top:58%;width:34px;height:34px;padding:5px') : '') +
      seasonFind(h.id) + clueFind(h.id) +
      '</div></div>' +
      '<div class="world-say">' + heroFigure(h.id, 'say-fig') + '<div class="card hand">' + esc(night ? h.world.night : h.world.text) + '</div></div>' +
      '</div>';
  }

  /* ---------- Альбом ---------- */

  function renderAlbum() {
    var items = get('items', []);
    var hints = get('hints', []);
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/') + '</div>' +
      '<div><h1 class="hand">Альбом находок</h1><p class="sub">Находки спрятаны по всему сайту. Некоторые появляются, только если что-то сделать. Загадки подскажут, где искать.</p></div>' +
      '<div><div style="display:flex;justify-content:space-between;font-weight:900"><span>Находки</span><span>' + items.length + ' из ' + ITEMS.length + '</span></div>' +
      '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="' + ITEMS.length + '" aria-valuenow="' + items.length + '" aria-label="Собрано находок"><div style="width:' + Math.round(items.length / ITEMS.length * 100) + '%"></div></div></div>' +
      '<div class="album">' + ITEMS.map(function (it, i) {
        var got = items.indexOf(it.id) >= 0;
        return '<div class="card' + (got ? '' : ' missing') + '" style="background:' + (got ? it.bg : '#fff') + ';transform:rotate(' + ['-1.5', '1', '1.5', '-1', '.5'][i] + 'deg)">' +
          '<img src="' + itemImg(it.id) + '" alt="' + (got ? it.name : 'Ещё не найдено') + '">' +
          '<div style="font-size:15px;font-weight:900">' + (got ? it.name : '???') + '</div>' +
          '<div class="riddle">' + esc(it.riddle) + '</div></div>';
      }).join('') + '</div>' +
      renderSpecialAlbum() +
      '<div class="card" style="display:flex;justify-content:space-between;align-items:center;background:var(--yellow)"><span style="font-weight:900">Подсказки секрета</span><span role="img" aria-label="Найдено подсказок: ' + hints.length + ' из ' + HINTS_TOTAL + '" style="display:flex;gap:4px">' +
      [0, 1, 2].map(function (i) { return ICON.star(26, i < hints.length ? '#FFC94D' : '#FFFFFF'); }).join('') + '</span></div>' +
      '<div class="card"><div style="display:flex;justify-content:space-between;font-weight:900"><span>Печати с наклеек</span><span>' + get('stamps', []).length + ' из ' + HEROES.length + '</span></div>' +
      '<div style="display:flex;gap:8px;margin-top:8px">' + HEROES.map(function (h) {
        var got = has('stamps', h.id);
        return '<span class="ava" title="' + h.name + '" style="width:48px;height:48px;' + (got ? '' : 'filter:grayscale(1);opacity:.3') + '"><img src="' + heroImg(h.id) + '" alt="' + (got ? 'Печать: ' + h.name : 'Нет печати') + '"></span>';
      }).join('') + '</div><a href="#/stickers" style="display:inline-block;margin-top:8px;font-size:13px">Где взять наклейки?</a></div>' +
      '<div class="card" style="display:flex;gap:12px;align-items:center;background:#DDF6F2"><span class="ava" style="width:48px;height:48px;flex-shrink:0"><img src="' + heroImg('candy') + '" alt=""></span><div><div style="font-weight:900">Прятки с Кенди</div><div style="font-size:14px">' +
      (seekState().last === dayNumber() ? 'Сегодня нашёл! ' : 'Сегодня Кенди где-то прячется — ищи ушки. ') + 'Серия: ' + seekState().streak + ' дн. подряд</div></div></div>' +
      '<button class="btn" data-act="reset" style="align-self:center;border-style:dashed;box-shadow:none">Начать поиски заново</button>' +
      '</div>';
  }

  /* ---------- Дружба ---------- */

  function renderFriends() {
    var sel = BY[ui.friend] ? ui.friend : 'ulyana';
    function line(p, prank) {
      var a = MAP_POS[p[0]], b = MAP_POS[p[1]];
      var hot = p[0] === sel || p[1] === sel;
      return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + (prank ? '#F08A3C' : '#7A4DD8') + '" stroke-width="' + (hot ? 1.8 : 0.9) + '"' + (prank ? ' stroke-dasharray="3 2.4"' : '') + ' stroke-linecap="round" opacity="' + (hot ? 1 : 0.25) + '"/>';
    }
    var names = LINKS.filter(function (p) { return p[0] === sel || p[1] === sel; }).map(function (p) { return BY[p[0] === sel ? p[1] : p[0]].name; });
    var prankText = sel === 'ulyana' ? 'С Йоши — проказы: на его проказы Ульяна может ответить тем же.' : sel === 'yoshi' ? 'С Ульяной — проказы: он любит попакостить, она отвечает тем же.' : '';
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/') + '</div>' +
      '<div><h1 class="hand">Карта дружбы</h1><p class="sub">Нажми на героя — увидишь, с кем он дружит</p></div>' +
      '<div class="map"><svg class="lines" viewBox="0 0 100 100" aria-hidden="true">' +
      LINKS.map(function (p) { return line(p, false); }).join('') + PRANKS.map(function (p) { return line(p, true); }).join('') + '</svg>' +
      HEROES.map(function (h) {
        var pos = MAP_POS[h.id];
        return '<button class="node" data-act="friend" data-id="' + h.id + '" aria-pressed="' + (h.id === sel) + '" style="left:' + pos[0] + '%;top:' + pos[1] + '%"><span class="ava" style="background:' + h.sky + '">' + emoImg(h.id, h.id === sel ? 'joy' : null, '', true) + '</span><span class="n">' + h.name + '</span></button>';
      }).join('') +
      (sel === 'yoshi' && !has('items', 'paw') ? findBtn('item', itemImg('paw'), 'Чей-то след в углу', 'right:3%;bottom:3%;width:34px;height:34px;padding:6px;transform:rotate(-24deg)') : '') +
      '</div>' +
      '<div class="legend"><span><i style="border-top:4px solid #7A4DD8"></i>дружба</span><span><i style="border-top:4px dashed #F08A3C"></i>проказы</span></div>' +
      '<div class="card card-shadow"><div class="hand" style="font-size:28px">' + BY[sel].name + '</div>' +
      '<div style="margin-top:4px;font-size:15px;font-weight:800;line-height:1.4">Дружит с: ' + names.join(', ') + '</div>' +
      (prankText ? '<div style="margin-top:4px;font-size:14px;color:#8A4A12">' + prankText + '</div>' : '') +
      '</div></div>';
  }

  /* ---------- Открытка ---------- */

  function cardTexts() {
    var who = ui.card.name.trim() || 'Друг';
    return {
      line1: who + ', Лиза налила тебе чай!',
      line2: ui.card.heal ? 'Чай лечебный — выздоравливай!' : 'Чай коварный — ой, горячо! Хитрая Лиза…'
    };
  }

  function renderCard() {
    var c = ui.card;
    var t = cardTexts();
    var candyHere = c.poured && !c.heal && !has('items', 'candy');
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/hero/liza', 'К Лизе') + '</div>' +
      '<div><h1 class="hand" style="font-size:42px">Чай от Лизы</h1><p class="sub">Лиза нальёт чай твоему другу. Какой попадётся — лечебный или коварный?</p></div>' +
      '<div style="display:flex;gap:8px;align-items:flex-end"><label class="field"><span>Кому чай?</span><input id="friendName" maxlength="20" placeholder="Имя друга" autocomplete="off" value="' + esc(c.name) + '"></label>' +
      '<button class="btn btn-violet" data-act="pour" style="height:46px;border-radius:14px;white-space:nowrap">Налить чай</button></div>' +
      '<div class="tea-card' + (c.poured && c.heal ? ' heal' : '') + '">' +
      '<div class="txt"><div class="hand" style="font-size:34px;line-height:1">' + esc(c.poured ? t.line1 : 'Напиши имя и нажми «Налить чай»') + '</div>' +
      '<div style="margin-top:6px;font-size:17px;font-weight:900;color:' + (c.poured ? (c.heal ? '#2E6B2A' : '#8A3B2A') : '#5A5066') + '">' + esc(c.poured ? t.line2 : 'Лиза уже держит чайник…') + '</div></div>' +
      emoImg('liza', c.poured ? (c.heal ? 'love' : 'joy') : null, 'Лиза', true).replace('<img', '<img class="liza"') +
      '<div class="cup"><svg aria-hidden="true" width="150" height="150" viewBox="0 0 150 150"><ellipse cx="75" cy="128" rx="62" ry="13" fill="#fff" stroke="#2B2233" stroke-width="4"/><path d="M120 70 c26 -2 28 34 2 36" fill="none" stroke="#2B2233" stroke-width="8" stroke-linecap="round"/><path d="M26 60 h96 q-4 60 -48 64 q-44 -4 -48 -64 z" fill="#fff" stroke="#2B2233" stroke-width="4" stroke-linejoin="round"/><path d="M31 82 h86" stroke="#FF8FA8" stroke-width="7"/><ellipse cx="74" cy="60" rx="48" ry="9" fill="' + (c.poured && c.heal ? '#7CC46A' : '#C98A4E') + '" stroke="#2B2233" stroke-width="4"/></svg>' +
      '<div class="steam" aria-hidden="true"><span></span><span></span><span></span></div></div>' +
      (candyHere ? findBtn('item', itemImg('candy'), 'Конфетка в утешение', 'right:150px;bottom:16px;width:40px;height:40px;padding:5px;transform:rotate(-12deg)') : '') +
      '<div style="position:absolute;right:14px;bottom:6px;font-size:11px;color:#6E5A4A">Мир героев</div></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
      '<button class="btn" data-act="save"' + (c.poured ? '' : ' disabled style="opacity:.5"') + '>Сохранить картинку</button>' +
      '<button class="btn btn-yellow" data-act="share"' + (c.poured ? '' : ' disabled style="opacity:.5"') + '>Отправить другу</button></div>' +
      '<p class="sub" style="text-align:center;font-size:12px">Имя друга никуда не отправляется — картинка делается прямо на телефоне.</p>' +
      '</div>';
  }

  function cardBlob(done) {
    var t = cardTexts();
    var heal = ui.card.heal;
    var W = 640, H = 760;
    var cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    var img = new Image();
    function wrap(text, x, y, maxW, lh) {
      var line = '';
      text.split(' ').forEach(function (w) {
        var test = line ? line + ' ' + w : w;
        if (c.measureText(test).width > maxW && line) { c.fillText(line, x, y); line = w; y += lh; } else { line = test; }
      });
      if (line) c.fillText(line, x, y);
    }
    img.onload = function () {
      c.fillStyle = heal ? '#E3F6E0' : '#FFE3C7';
      c.fillRect(0, 0, W, H);
      c.lineWidth = 12; c.strokeStyle = '#2B2233'; c.strokeRect(6, 6, W - 12, H - 12);
      c.drawImage(img, 20, 250, 280, 504);
      c.lineWidth = 7; c.fillStyle = '#fff';
      c.beginPath(); c.ellipse(470, 640, 120, 24, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      c.beginPath(); c.moveTo(370, 520); c.lineTo(570, 520); c.quadraticCurveTo(562, 640, 470, 648); c.quadraticCurveTo(378, 640, 370, 520); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = heal ? '#7CC46A' : '#C98A4E';
      c.beginPath(); c.ellipse(470, 520, 100, 18, 0, 0, Math.PI * 2); c.fill(); c.stroke();
      c.fillStyle = '#2B2233'; c.font = '700 60px Caveat, cursive';
      wrap(t.line1, 34, 90, W - 68, 62);
      c.font = '900 34px Nunito, sans-serif'; c.fillStyle = heal ? '#2E6B2A' : '#8A3B2A';
      wrap(t.line2, 34, 250, W - 68, 42);
      c.font = '700 24px Nunito, sans-serif'; c.fillStyle = '#6E5A4A';
      c.fillText('Мир героев', W - 170, H - 26);
      cv.toBlob(function (b) { done(b); }, 'image/png');
    };
    img.onerror = function () { done(null); };
    var go = function () { img.src = heroImg('liza'); };
    if (document.fonts && document.fonts.load) {
      Promise.all([document.fonts.load('700 60px Caveat'), document.fonts.load('900 34px Nunito')]).then(go, go);
    } else { go(); }
  }

  function inArtifact() { return !!(window.claude && typeof window.claude.use === 'function'); }
  function saveFile(blob, name, okMsg) {
    if (inArtifact()) {
      window.claude.use('downloads').then(function (d) {
        if (!d) { toast('Здесь сохранить нельзя', 'На опубликованном сайте будет работать'); return; }
        d.save({ filename: name, data: blob }).then(function () { toast(okMsg || 'Сохранено!'); }, function (e) {
          if (!e || e.code !== 'declined') toast('Не получилось сохранить');
        });
      });
      return;
    }
    try { downloadBlob(blob, name); toast(okMsg || 'Сохранено!'); } catch (e) { toast('Не получилось сохранить'); }
  }
  function shareFile(blob, name, title, okMsg) {
    try {
      var file = new File([blob], name, { type: 'image/png' });
      if (!inArtifact() && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: title }).catch(function () {});
        return;
      }
    } catch (e) { /* сохраним */ }
    saveFile(blob, name, okMsg);
  }
  function downloadBlob(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name || 'chai-ot-lizy.png';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  /* ---------- Чаинки Лизы: предсказание дня ---------- */

  // TODO(автор): заменить своими предсказаниями — это примеры
  var PREDICTIONS = [
    'Сегодня кто-то тебе неожиданно улыбнётся.',
    'Хороший день, чтобы нарисовать что-то новое.',
    'Тебя ждёт маленький сюрприз. Совсем маленький, но приятный.',
    'Чай советует: не спеши — всё получится.',
    'Сегодня лучше дружить, чем спорить.',
    'Кто-то думает о тебе прямо сейчас.',
    'Будь хитрой, как Лиза, и доброй, как Лиза.',
    'Твоя идея окажется лучше, чем кажется.',
    'Сегодня отличный день для печеньки.',
    'Кошки Ланы передают привет. Мяу!',
    'Йоши сегодня пакостит. Будь начеку!',
    'Ульяна попробует взлететь — поддержи её.',
    'Сегодня можно немного подерзить. Совсем чуть-чуть, как Кенди.',
    'Если что-то потерялось — оно найдётся.'
  ];
  function dayNumber() { return Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000); }
  function seeded(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  function teaLeaves() {
    var d = dayNumber();
    var rnd = seeded(d);
    var dots = '';
    for (var i = 0; i < 16; i++) {
      var a = rnd() * Math.PI * 2, r = 8 + rnd() * 30;
      dots += '<ellipse cx="' + (50 + Math.cos(a) * r).toFixed(1) + '" cy="' + (50 + Math.sin(a) * r).toFixed(1) + '" rx="' + (1.5 + rnd() * 3).toFixed(1) + '" ry="' + (1 + rnd() * 2).toFixed(1) + '" fill="#6E4128" transform="rotate(' + Math.round(rnd() * 180) + ' ' + (50 + Math.cos(a) * r).toFixed(1) + ' ' + (50 + Math.sin(a) * r).toFixed(1) + ')"/>';
    }
    return '<section class="card" style="display:flex;gap:14px;align-items:center;background:#FFF6EC">' +
      '<svg aria-hidden="true" width="92" height="92" viewBox="0 0 100 100" style="flex-shrink:0"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#2B2233" stroke-width="4"/><circle cx="50" cy="50" r="38" fill="#F3D9B8" stroke="#C98A4E" stroke-width="2"/>' + dots + '</svg>' +
      '<div><div class="hand" style="font-size:26px;line-height:1">Чаинки дня</div><div style="margin-top:4px;font-size:15px;font-weight:800;line-height:1.35">' + esc(PREDICTIONS[d % PREDICTIONS.length]) + '</div>' +
      '<div class="sub" style="font-size:12px">Сегодня у всех одинаковое — завтра будет новое</div></div></section>';
  }

  /* ---------- Погода в мирах ---------- */

  var WEATHER = {
    ulyana: { name: 'Радужная морось', kind: 'drop', colors: ['#FF5A6E', '#FF9A3D', '#FFD84A', '#6FD36A', '#4FB4FF', '#B07CFF'] },
    lana: { name: 'Снегопад из шерсти', kind: 'flake', colors: ['#FFFFFF', '#F3E9FF', '#E9DDF7'] },
    yoshi: { name: 'Жёлтый дождь', kind: 'drop', colors: ['#FFC21A', '#FFD93D'] },
    liza: { name: 'Сахарная метель', kind: 'flake', colors: ['#FFFFFF', '#FFF6EC'] },
    candy: { name: 'Град из драже', kind: 'ball', colors: ['#FF8FB8', '#8FD3FF', '#FFD84A', '#B48CF0', '#7CC46A'] }
  };
  function weatherToday(id) {
    var idx = HEROES.map(function (h) { return h.id; }).indexOf(id);
    return (dayNumber() + idx) % 3 === 0 ? null : WEATHER[id];
  }
  function weatherLayer(id, seedShift) {
    var w = weatherToday(id);
    if (!w) return '';
    var rnd = seeded(dayNumber() * 7 + seedShift);
    var out = '<div class="weather" aria-hidden="true">';
    for (var i = 0; i < 16; i++) {
      out += '<i class="wx ' + w.kind + '" style="left:' + Math.round(rnd() * 96) + '%;background:' + w.colors[i % w.colors.length] + ';animation-duration:' + (1.4 + rnd() * 1.8).toFixed(2) + 's;animation-delay:-' + (rnd() * 3).toFixed(2) + 's"></i>';
    }
    return out + '</div>';
  }
  function weatherChip(id) {
    var w = weatherToday(id);
    return '<span class="chip" style="border-style:solid;border-color:var(--ink);background:#fff">Погода: ' + (w ? w.name.toLowerCase() : 'ясно') + '</span>';
  }

  /* ---------- Кошачий шифр Ланы ---------- */

  var SYL = ['мяу', 'мур', 'мрр', 'фыр', 'ня', 'ур'];
  var ABC = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
  function meowEncode(text) {
    var out = text.toLowerCase().replace(/-/g, '—').split(/(\s+)/).map(function (tok) {
      if (!tok || /^\s+$/.test(tok)) return tok;
      return Array.from(tok).map(function (ch) {
        var i = ABC.indexOf(ch);
        return i < 0 ? ch : SYL[Math.floor(i / 6)] + SYL[i % 6];
      }).join('-');
    }).join('');
    return out.charAt(0).toUpperCase() + out.slice(1);
  }
  function meowDecode(text) {
    var out = text.toLowerCase().split(/(\s+)/).map(function (word) {
      if (!word || /^\s+$/.test(word)) return word;
      return word.split('-').map(function (tok) {
        for (var a = 0; a < SYL.length; a++) {
          if (tok.indexOf(SYL[a]) === 0) {
            var b = SYL.indexOf(tok.slice(SYL[a].length));
            if (b >= 0 && a * 6 + b < ABC.length) return ABC[a * 6 + b];
          }
        }
        return tok === '—' ? '-' : tok;
      }).join('');
    }).join('');
    return out.charAt(0).toUpperCase() + out.slice(1);
  }
  function siteBase() { return location.href.split('#')[0]; }

  function renderCipher(payload) {
    var incoming = payload ? safeDecode(payload) : '';
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/hero/lana', 'К Лане') + '</div>' +
      '<div><h1 class="hand">Кошачий шифр Ланы</h1><p class="sub">Лана переведёт твою фразу на кошачий. Расшифровать её можно только здесь.</p></div>' +
      (incoming ? '<section class="card card-shadow" style="background:#EADFFF"><div class="label" style="color:#4A3D73">Тебе пришла кошачья записка</div><div class="hand" style="font-size:24px;line-height:1.15;margin-top:6px;word-break:break-word">' + esc(incoming) + '</div>' +
        '<button class="btn btn-violet" data-act="cipher-read" style="margin-top:10px">Попросить Лану перевести</button><div id="cipherRead" class="hand" style="font-size:26px;margin-top:8px"></div></section>' : '') +
      '<label class="field"><span>Твоя фраза</span><textarea id="cipherIn" maxlength="200" rows="3" placeholder="Например: встретимся на перемене" style="padding:10px 12px;border:2.5px solid var(--ink);border-radius:14px;font:inherit;font-size:16px;resize:vertical"></textarea></label>' +
      '<button class="btn btn-big btn-violet" data-act="cipher-encode">Перевести на кошачий</button>' +
      '<div id="cipherOut" class="card hand" style="font-size:24px;line-height:1.15;min-height:60px;word-break:break-word;color:var(--muted)">Здесь появится «мяу»…</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn" data-act="cipher-copy">Скопировать</button><button class="btn btn-yellow" data-act="cipher-share">Отправить ссылкой</button></div>' +
      '<details class="card"><summary style="font-weight:900;cursor:pointer">Расшифровать кошачий текст</summary>' +
      '<textarea id="cipherBack" rows="3" maxlength="2000" placeholder="Вставь сюда «мяу-мур…»" style="margin-top:10px;width:100%;padding:10px 12px;border:2.5px solid var(--ink);border-radius:14px;font:inherit;font-size:16px"></textarea>' +
      '<button class="btn" data-act="cipher-decode" style="margin-top:8px">Расшифровать</button><div id="cipherPlain" class="hand" style="font-size:24px;margin-top:8px"></div></details>' +
      '<div class="card" style="background:#EADFFF"><div class="label" style="color:#4A3D73">Лана шепчет секрет</div><div class="hand" style="font-size:20px;line-height:1.15;word-break:break-word">' + esc(meowEncode('в лобби нажми по очереди: ульяна лиза йоши лана кенди')) + '</div></div>' +
      '<p class="sub" style="font-size:12px;text-align:center">Фраза никуда не отправляется — шифр работает прямо в телефоне, а записка живёт только в ссылке.</p>' +
      '</div>';
  }
  function safeDecode(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }

  /* ---------- Ульяна учится летать ---------- */

  function renderFly() {
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/hero/ulyana', 'К Ульяне') + '<div class="pill" style="background:#fff">Рекорд: ' + get('flyBest', 0) + '</div></div>' +
      '<div><h1 class="hand">Ульяна учится летать</h1><p class="sub">Тапай, чтобы она махала крылышками. Лови перья и не урони её на землю — летает она пока криво!</p></div>' +
      '<canvas id="fly" class="fly" role="img" aria-label="Игра: Ульяна летает и ловит перья"></canvas>' +
      '</div>';
  }

  function mountFly() {
    var cv = document.getElementById('fly');
    if (!cv) return;
    var W = Math.min(cv.parentElement.clientWidth, 420), H = 460, dpr = window.devicePixelRatio || 1;
    cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
    var c = cv.getContext('2d'); c.scale(dpr, dpr);
    var imgs = {}, need = { hero: heroImg('ulyana'), feather: itemImg('feather'), bg: 'img/worlds/world-ulyana.svg' }, loaded = 0;
    Object.keys(need).forEach(function (k) { var im = new Image(); im.onload = function () { loaded++; }; im.src = need[k]; imgs[k] = im; });
    var S, raf, last = 0, spawn = 0;
    function reset() { S = { mode: 'ready', x: W / 2, y: H / 2, vx: 0, vy: 0, a: 0, va: 0, score: 0, feathers: [], t: 0 }; }
    reset();
    function flap() {
      if (S.mode === 'over') { reset(); return; }
      if (S.mode === 'ready') S.mode = 'play';
      S.vy = -(5.5 + Math.random() * 3.5);
      S.va += (Math.random() - 0.5) * 0.35;
      S.vx += (Math.random() - 0.5) * 2.4;
      beep('pick');
    }
    function onDown(e) { e.preventDefault(); flap(); }
    function onKey(e) { if (e.code === 'Space' || e.code === 'ArrowUp') { e.preventDefault(); flap(); } }
    cv.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    function step(dt) {
      if (S.mode !== 'play') { S.t += dt; return; }
      S.vy += 0.32 * dt; S.vx += Math.sin(S.a) * 0.25 * dt; S.vx *= Math.pow(0.985, dt); S.va *= Math.pow(0.96, dt);
      S.a = Math.max(-0.9, Math.min(0.9, S.a + S.va * dt));
      S.x += S.vx * dt; S.y += S.vy * dt;
      if (S.x < 30) { S.x = 30; S.vx = Math.abs(S.vx) * 0.6; }
      if (S.x > W - 30) { S.x = W - 30; S.vx = -Math.abs(S.vx) * 0.6; }
      if (S.y < 50) { S.y = 50; S.vy = 0.5; }
      spawn -= dt;
      if (spawn <= 0) { S.feathers.push({ x: 24 + Math.random() * (W - 48), y: -20, vy: 1 + Math.random() * 1.2, ph: Math.random() * 6 }); spawn = 55 + Math.random() * 40; }
      S.feathers.forEach(function (f) { f.y += f.vy * dt; f.ph += 0.05 * dt; f.x += Math.sin(f.ph) * 0.6 * dt; });
      S.feathers = S.feathers.filter(function (f) {
        if (Math.hypot(f.x - S.x, f.y - S.y) < 42) { S.score++; beep('item'); return false; }
        return f.y < H + 20;
      });
      if (S.y > H - 70) {
        S.mode = 'over';
        if (S.score > get('flyBest', 0)) set('flyBest', S.score);
        beep('sorry');
      }
    }
    function draw() {
      c.clearRect(0, 0, W, H);
      if (imgs.bg.complete && imgs.bg.naturalWidth) { var bw = H * 724 / 484; c.drawImage(imgs.bg, (W - bw) / 2, 0, bw, H); } else { c.fillStyle = '#CFE8FF'; c.fillRect(0, 0, W, H); }
      S.feathers.forEach(function (f) { if (imgs.feather.complete) { c.save(); c.translate(f.x, f.y); c.rotate(Math.sin(f.ph) * 0.6); c.drawImage(imgs.feather, -14, -14, 28, 28); c.restore(); } });
      if (imgs.hero.complete && imgs.hero.naturalWidth) {
        var bob = S.mode === 'ready' ? Math.sin(S.t / 10) * 4 : 0;
        c.save(); c.translate(S.x, S.y + bob); c.rotate(S.a); c.drawImage(imgs.hero, -40, -60, 80, 144); c.restore();
      }
      c.fillStyle = '#2B2233'; c.font = '900 22px Nunito, sans-serif'; c.fillText('Перья: ' + S.score, 14, 30);
      if (S.mode !== 'play') {
        c.fillStyle = 'rgba(255,251,243,.88)'; c.fillRect(20, H / 2 - 70, W - 40, 120);
        c.strokeStyle = '#2B2233'; c.lineWidth = 3; c.strokeRect(20, H / 2 - 70, W - 40, 120);
        c.fillStyle = '#2B2233'; c.textAlign = 'center'; c.font = '700 36px Caveat, cursive';
        c.fillText(S.mode === 'ready' ? 'Тапни — и взлетаем!' : 'Бум! Приземлилась…', W / 2, H / 2 - 22);
        c.font = '800 17px Nunito, sans-serif';
        c.fillText(S.mode === 'ready' ? 'Тапай ещё, чтобы держаться в воздухе' : 'Поймано перьев: ' + S.score + ' · рекорд: ' + get('flyBest', 0), W / 2, H / 2 + 12);
        if (S.mode === 'over') c.fillText('Тапни, чтобы попробовать ещё', W / 2, H / 2 + 36);
        c.textAlign = 'left';
      }
    }
    function loop(ts) {
      var dt = last ? Math.min(3, (ts - last) / 16.67) : 1; last = ts;
      step(dt); draw();
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    cleanups.push(function () { cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey); });
  }

  /* ---------- Наклейки с QR и секретные страницы ---------- */

  function renderStickers() {
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar no-print">' + backBtn('#/more') + '<div style="display:flex;gap:6px">' + (inArtifact() ? '' : '<button class="btn" data-act="print">Распечатать</button>') + '<button class="btn btn-violet" data-act="sheet">Лист картинкой</button></div></div>' +
      (inArtifact() ? '<p class="card no-print" style="margin:0;font-size:13px;background:var(--yellow)">Это предпросмотр: QR-коды заработают, когда сайт будет опубликован. Печатать можно из сохранённой картинки.</p>' : '') +
      '<div class="no-print"><h1 class="hand">Наклейки с секретом</h1><p class="sub">Распечатай, вырежи и подари друзьям. Код на наклейке ведёт на секретную страницу героя — там можно получить печать в альбом.</p></div>' +
      '<div class="stickers-print">' + HEROES.map(function (h) {
        return '<div class="sticker-card"><img src="' + heroImg(h.id) + '" alt="' + h.name + '"><div class="hand" style="font-size:28px;line-height:1">' + h.name + '</div><div class="qr" data-qr="' + h.id + '"></div><div style="font-size:11px;font-weight:800;color:var(--muted)">Сканируй — найди секрет</div></div>';
      }).join('') + '</div></div>';
  }
  function mountStickers() {
    function fill() {
      document.querySelectorAll('[data-qr]').forEach(function (el) {
        try {
          var q = window.qrcode(0, 'M');
          q.addData(siteBase() + '#/s/' + el.getAttribute('data-qr'));
          q.make();
          el.innerHTML = q.createSvgTag({ cellSize: 3, margin: 2, scalable: true, alt: 'QR-код' });
        } catch (e) { el.textContent = 'QR не получился'; }
      });
    }
    if (window.qrcode) { fill(); return; }
    var s = document.createElement('script');
    s.src = 'js/vendor/qrcode.js'; s.onload = fill;
    document.head.appendChild(s);
  }

  function sheetBlob(done) {
    var W = 1240, H = 1754, cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    c.fillStyle = '#fff'; c.fillRect(0, 0, W, H);
    var cells = HEROES.map(function (h, i) { return { h: h, x: 40 + (i % 2) * 600, y: 40 + Math.floor(i / 2) * 560 }; });
    var pending = cells.length * 2;
    function finish() { if (--pending === 0) cv.toBlob(function (b) { done(b); }, 'image/png'); }
    c.setLineDash([16, 12]); c.lineWidth = 4; c.strokeStyle = '#2B2233';
    cells.forEach(function (cell) {
      c.strokeRect(cell.x, cell.y, 560, 520);
      c.fillStyle = '#2B2233'; c.font = '700 54px Caveat, cursive'; c.textAlign = 'center';
      c.fillText(cell.h.name, cell.x + 150, cell.y + 470);
      c.font = '800 20px Nunito, sans-serif'; c.fillText('Сканируй — найди секрет', cell.x + 410, cell.y + 470);
      var im = new Image();
      im.onload = function () { c.drawImage(im, cell.x + 60, cell.y + 30, 200, 360); finish(); };
      im.onerror = finish; im.src = heroImg(cell.h.id);
      var svg = '';
      try { var q = window.qrcode(0, 'M'); q.addData(siteBase() + '#/s/' + cell.h.id); q.make(); svg = q.createSvgTag({ cellSize: 6, margin: 2 }); } catch (e) { finish(); return; }
      var qi = new Image(), url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      qi.onload = function () { c.drawImage(qi, cell.x + 300, cell.y + 90, 220, 220); URL.revokeObjectURL(url); finish(); };
      qi.onerror = finish; qi.src = url;
    });
  }
  function renderSecret(id) {
    var h = BY[id];
    if (!h) return renderLost();
    var stamps = addTo('stamps', h.id);
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h));text-align:center;align-items:center">' +
      '<h1 class="hand">Секретная страница</h1>' +
      '<img src="' + heroImg(h.id) + '" alt="' + h.name + '" style="width:150px;height:270px">' +
      '<div class="card card-shadow" style="background:' + h.sky + '"><div class="hand" style="font-size:30px">Ты нашёл наклейку героя ' + h.name + '!</div>' +
      '<div style="font-weight:800;margin-top:4px">Печать поставлена в альбом. Печатей: ' + stamps.length + ' из ' + HEROES.length + '</div></div>' +
      '<div style="display:flex;gap:10px"><a class="btn btn-violet" href="#/album">В альбом</a><a class="btn" href="#/hero/' + h.id + '">Карточка героя</a></div></div>';
  }

  /* ---------- Потерянная страница — проделка Йоши ---------- */

  function renderLost() {
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h));align-items:center;text-align:center">' +
      '<h1 class="hand" style="font-size:40px">Ой! Страница потерялась</h1>' +
      '<div style="position:relative">' +
      emoImg('yoshi', 'sad', 'Йоши', true).replace('<img', '<img style="width:150px;height:270px;transform:rotate(-6deg)"') +
      '<div class="bubble hand" style="position:absolute;right:-110px;top:30px">Прости, пожалуйста!</div>' +
      '<img src="img/worlds/yoshi-cat.svg" alt="" style="position:absolute;left:-70px;bottom:0;width:70px;height:88px">' +
      '</div>' +
      '<p class="card" style="margin:0;font-size:16px;line-height:1.4">Это Йоши опять напакостил: спрятал страницу, которую ты искал. Зато, может, он спрятал тут что-то ещё…</p>' +
      '<a class="btn btn-big btn-violet" href="#/">Вернуть всё на место</a>' +
      (!has('items', 'key') ? findBtn('item', itemImg('key'), 'Что-то блестит в углу', 'position:fixed;right:10px;bottom:calc(var(--nav-h) + 8px);width:34px;height:34px;padding:5px;opacity:.85') : '') +
      '</div>';
  }

  /* ---------- Ещё ---------- */

  function renderMore() {
    var tiles = [
      ['#/tower', 'Башня героев', 'Прыгай по этажам до самой вершины', 'candy', '#DDF6F2'],
      ['#/case', 'Кто взял печеньку?', 'Новое дело каждый день — ищи улики в мирах', 'liza', '#FFE9D4'],
      ['#/hospital', 'Больница для героев', 'Лечи героев: лёд, пластырь, плед… или чай Лизы', 'ulyana', '#E3F6E0'],
      ['#/eyes', 'Угадай по глазам', 'Узнай героя и настроение только по глазам', 'yoshi', '#FFF2B8'],
      ['#/quiz', 'Кто ты из нас?', 'Тест из шести вопросов и картинка для сторис', 'lana', '#EADFFF'],
      ['#/invite', 'Позови друга', 'Другу — подарок, тебе — печать героя', 'candy', '#DDF6F2'],
      ['#/draw', 'Рисуй как я', 'Уроки, шаблон и челлендж «нарисуй своего героя»', 'liza', '#FFE9D4'],
      ['#/wallpapers', 'Обои для телефона', 'Герой в своём мире, днём или ночью', 'ulyana', '#DDEFFF'],
      ['#/pack', 'Стикерпак', 'Все эмоции героев для Telegram и WhatsApp', 'yoshi', '#FFF2B8'],
      ['#/fly', 'Ульяна учится летать', 'Мини-игра: лови перья и не урони Ульяну', 'ulyana', '#DDEFFF'],
      ['#/cipher', 'Кошачий шифр Ланы', 'Тайные записки на кошачьем', 'lana', '#EADFFF'],
      ['#/card', 'Чай от Лизы', 'Открытка для друга: лечебный или коварный?', 'liza', '#FFE9D4'],
      ['#/stickers', 'Наклейки с секретом', 'Распечатай — на них QR-коды', 'candy', '#DDF6F2'],
      ['#/friends', 'Карта дружбы', 'Кто с кем дружит и кто пакостит', 'yoshi', '#FFF2B8'],
      ['#/diary', 'Дневник пакостей Йоши', 'Все пойманные проказы и извинения', 'yoshi', '#FFF2B8']
    ];
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div><h1 class="hand" data-act="more-title">Ещё</h1><p class="sub">Игры и секреты мира героев</p></div>' +
      (ui.moreTaps >= 5 ? '<button class="btn" data-act="holiday-cycle" style="align-self:flex-start;border-style:dashed;box-shadow:none;font-size:13px">Для взрослых — праздник: ' + (HOLIDAY_NAMES[get('holiday', null)] || 'по календарю') + '</button>' : '') +
      tiles.map(function (t) {
        return '<a class="card card-shadow tile" href="' + t[0] + '" style="background:' + t[4] + '"><span class="ava" style="flex-shrink:0"><img src="' + heroImg(t[3]) + '" alt=""></span><span><span class="hand" style="font-size:28px;display:block;line-height:1">' + t[1] + '</span><span style="font-size:14px;font-weight:700;color:#4A4055">' + t[2] + '</span></span></a>';
      }).join('') +
      '<button class="btn" data-act="motion" style="align-self:center">' + (motionOn ? 'Датчики телефона включены' : 'Включить встряхивания телефона') + '</button>' +
      '</div>';
  }

  /* ---------- Герои засыпают ---------- */

  var idleTimer;
  function wake() {
    if (document.body.classList.contains('asleep')) {
      document.body.classList.remove('asleep');
      var sb = reactBox();
      if (sb) { restoreBox(sb); react('wow', REACT_SAY.wake, 1600, sb); }
    }
    clearTimeout(idleTimer);
    idleTimer = setTimeout(fallAsleep, 60000);
  }
  function fallAsleep() {
    document.body.classList.add('asleep');
    var onLobby = !location.hash || location.hash === '#/' || location.hash === '#';
    if (onLobby && ui.prankFixed) {
      ui.prankFixed = false;
      ui.pranks = randomPranks(1);
      route();
      document.body.classList.add('asleep');
    }
    react('sleep', '', -1);
  }
  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, wake, { passive: true }); });
  document.addEventListener('pointermove', function () { if (document.body.classList.contains('asleep')) wake(); }, { passive: true });

  /* ---------- Эмоции-стикеры ---------- */

  // Предложенный набор эмоций — автор может поменять
  var EMOTIONS = [
    { id: 'joy', name: 'Радость' }, { id: 'sad', name: 'Грусть' }, { id: 'angry', name: 'Злость' },
    { id: 'wow', name: 'Удивление' }, { id: 'love', name: 'Любовь' }, { id: 'sleep', name: 'Сплю' }
  ];
  var INK = '#2B2233';
  function heart(cx, cy, s, fill) {
    return '<path transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')" d="M0 6 C-14 -6 -10 -18 0 -10 C10 -18 14 -6 0 6 Z" fill="' + fill + '" stroke="' + INK + '" stroke-width="' + (2.2 / s).toFixed(2) + '" stroke-linejoin="round"/>';
  }

  /* Эмоция собирается прямо внутри рисунка героя: из исходного SVG убираются рот
     и открытые глаза, а на их место рисуются новые — в той же геометрии, теми же
     цветами и с веками цвета кожи головы. Поэтому рот и веки лежат на лице как родные. */
  var heroSvgText = {};
  var emoCache = {};
  function loadHeroSvgs(done) {
    if (!window.fetch) return;
    var left = HEROES.length;
    HEROES.forEach(function (h) {
      fetch(heroImg(h.id)).then(function (r) { return r.ok ? r.text() : null; })
        .then(function (t) { if (t && t.indexOf('<svg') >= 0) heroSvgText[h.id] = t; }, function () {})
        .then(function () { if (--left === 0 && done) done(); });
    });
  }
  function P(d, extra) { return '<path d="' + d + '" ' + (extra || 'fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"') + '/>'; }
  function eyeEmo(cx, emo, white, pupil, lashes) {
    var s = cx < 200 ? 1 : -1;               // +1 — к носу у левого глаза
    var o = cx - 52 * s, n = cx + 52 * s;    // внешний и внутренний край
    if (emo === 'sleep') {
      return P('M' + (cx - 38) + ' 226 Q' + cx + ' 250 ' + (cx + 38) + ' 226', 'fill="none" stroke="' + INK + '" stroke-width="6.5" stroke-linecap="round"') + (!lashes ? '' :
        P('M' + (cx - 34 * s) + ' 233 l' + (-9 * s) + ' 9 M' + (cx - 22 * s) + ' 239 l' + (-5 * s) + ' 11', 'fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"'));
    }
    var ix = cx + 3 * s, iy = 234, pr = 21, big = 10, small = 5;
    if (emo === 'sad') iy = 240;
    if (emo === 'wow') { pr = 11; big = 12; small = 6; iy = 232; }
    if (emo === 'joy') { iy = 230; big = 12; }
    if (emo === 'angry') { pr = 16; iy = 238; }
    var inside;
    if (emo === 'love') {
      inside = '<path transform="translate(' + ix + ' ' + (iy + 6) + ') scale(2.7)" d="M0 7 C-15 -5 -11 -18 0 -10 C11 -18 15 -5 0 7 Z" fill="#FF4F7B" stroke="' + INK + '" stroke-width="1.1" stroke-linejoin="round"/>' +
        '<ellipse cx="' + (ix - 12) + '" cy="' + (iy - 14) + '" rx="8" ry="6" transform="rotate(-30 ' + (ix - 12) + ' ' + (iy - 14) + ')" fill="#fff"/><circle cx="' + (ix + 13) + '" cy="' + (iy - 18) + '" r="3.5" fill="#fff"/>';
    } else {
      inside = '<circle cx="' + ix + '" cy="' + iy + '" r="35" fill="url(#iris)" stroke="' + INK + '" stroke-width="3"/>' +
        '<circle cx="' + ix + '" cy="' + (iy + 3) + '" r="' + pr + '" fill="' + pupil + '"/>' +
        '<circle cx="' + (ix + 12) + '" cy="' + (iy - 13) + '" r="' + big + '" fill="#fff"/>' +
        '<circle cx="' + (ix - 11) + '" cy="' + (iy + 16) + '" r="' + small + '" fill="#fff"/>';
      if (emo === 'sad') inside += '<path d="M' + (cx - 46) + ' 254 Q' + cx + ' 246 ' + (cx + 46) + ' 254 L' + (cx + 46) + ' 280 L' + (cx - 46) + ' 280 Z" fill="#DDF3FF" opacity=".5"/>' +
        P('M' + (cx - 30) + ' 256 Q' + cx + ' 249 ' + (cx + 30) + ' 256', 'fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"');
    }
    var lid = '';
    var edge = 'fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"';
    if (emo === 'angry') lid = P('M' + o + ' 150 L' + n + ' 150 L' + n + ' 222 L' + o + ' 192 Z', 'fill="url(#skinU)"') + P('M' + o + ' 192 L' + n + ' 222', edge);
    if (emo === 'sad') lid = P('M' + o + ' 150 L' + n + ' 150 L' + n + ' 194 L' + o + ' 212 Z', 'fill="url(#skinU)"') + P('M' + o + ' 212 L' + n + ' 194', edge);
    if (emo === 'joy') lid = P('M' + o + ' 300 L' + n + ' 300 L' + n + ' 266 Q' + cx + ' 236 ' + o + ' 266 Z', 'fill="url(#skinU)"') + P('M' + o + ' 266 Q' + cx + ' 236 ' + n + ' 266', edge);
    return '<circle cx="' + cx + '" cy="228" r="46" fill="' + white + '"/>' +
      '<g clip-path="url(#ec' + cx + ')">' + inside + lid + '</g>' +
      '<circle cx="' + cx + '" cy="228" r="46" fill="none" stroke="' + INK + '" stroke-width="7"/>';
  }
  // Йоши — мальчик: у него ресниц нет
  var NO_LASHES = ['yoshi'];
  var MOUTH = {
    joy: P('M172 281 Q201 291 230 281 Q226 318 201 319 Q176 318 172 281 Z', 'fill="#3A1420" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"') +
      P('M180 285 Q201 292 222 285 L220 292 Q201 298 182 292 Z', 'fill="#fff"') +
      P('M185 308 Q201 297 217 308 Q210 317 201 317 Q192 317 185 308 Z', 'fill="#FF8FA8"'),
    sad: P('M181 307 Q201 289 221 307', 'fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"'),
    angry: P('M175 311 Q176 287 201 285 Q226 287 227 311 Q201 301 175 311 Z', 'fill="#3A1420" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"') +
      P('M181 296 Q184 288 201 287 Q218 288 221 296 Q201 292 181 296 Z', 'fill="#fff"') +
      P('M186 307 Q201 300 216 307 Q201 304 186 307 Z', 'fill="#FF8FA8"'),
    wow: '<ellipse cx="201" cy="299" rx="13" ry="16" fill="#3A1420" stroke="' + INK + '" stroke-width="4"/>' +
      P('M192 309 Q201 302 210 309 Q206 313 201 313 Q196 313 192 309 Z', 'fill="#FF8FA8"'),
    love: P('M181 288 Q191 298 201 289 Q211 298 221 288', 'fill="none" stroke="' + INK + '" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"'),
    sleep: '<ellipse cx="201" cy="298" rx="7" ry="6" fill="#3A1420" stroke="' + INK + '" stroke-width="3"/>'
  };
  var BROWS = {
    angry: P('M114 160 L170 180 M286 160 L230 180', 'fill="none" stroke="' + INK + '" stroke-width="8" stroke-linecap="round"'),
    sad: P('M116 168 L166 152 M284 168 L234 152', 'fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"'),
    wow: P('M118 160 Q142 140 168 154 M282 160 Q258 140 232 154', 'fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"')
  };
  var EXTRA = {
    joy: P('M60 150 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 z M322 118 l5 -12 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 z', 'fill="#FFD84A" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"'),
    sad: P('M112 268 q-11 18 0 27 q11 -9 0 -27 z M290 268 q-11 18 0 27 q11 -9 0 -27 z', 'fill="#8FD3FF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"'),
    angry: P('M322 100 q11 -2 11 9 M322 100 q-2 -11 9 -11 M344 118 q-11 2 -11 -9 M344 118 q2 11 -9 11', 'fill="none" stroke="#E5484D" stroke-width="5.5" stroke-linecap="round"'),
    wow: P('M336 108 v44', 'fill="none" stroke="' + INK + '" stroke-width="9" stroke-linecap="round"') + '<circle cx="336" cy="172" r="5.5" fill="' + INK + '"/>',
    love: heart(66, 124, 1.5, '#FF8FB8') + heart(334, 98, 1.15, '#FF8FB8') + heart(326, 160, 0.8, '#FF8FB8'),
    sleep: '<g fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M304 112 h20 l-20 22 h20"/><path d="M334 78 h14 l-14 16 h14"/></g>'
  };
  function emoSvgText(id, emo) {
    var t = heroSvgText[id];
    if (!t || !emo || !MOUTH[emo]) return t || null;
    var key = id + ':' + emo;
    if (emoCache[key]) return emoCache[key];
    var white = (t.match(/r="46" fill="(url\(#\w+\)|#\w+)"/) || [])[1] || '#fff';
    var pupil = (t.match(/r="21" fill="(#\w+)"/) || [])[1] || INK;
    var eyes = [];
    var body = t.replace(/<\/svg>\s*$/, '').split(/(?=<!--)/).filter(function (part) {
      var c = (part.match(/^<!--([\s\S]*?)-->/) || [])[1] || '';
      if (/Улыбк|улыбк|Ротик/.test(c)) return false;
      if (/[Бб]рови/.test(c)) return false;
      if (/Большие круглые глаза/.test(c)) { eyes = [147, 253]; return false; }
      if (/Правый глаз/.test(c)) { eyes = [253]; return false; }
      return true;
    }).join('');
    var defs = '<radialGradient id="skinU" gradientUnits="userSpaceOnUse" cx="182.1" cy="185.1" r="156.8"><stop offset="0" stop-color="#FFF4EC"/><stop offset="1" stop-color="#FFDCC8"/></radialGradient>' +
      '<clipPath id="ec147"><circle cx="147" cy="228" r="43"/></clipPath><clipPath id="ec253"><circle cx="253" cy="228" r="43"/></clipPath>';
    body = body.replace('</defs>', defs + '</defs>');
    var blush = emo === 'joy' || emo === 'love' || emo === 'angry' ? '<ellipse cx="124" cy="284" rx="30" ry="17" fill="url(#blush)"/><ellipse cx="276" cy="284" rx="30" ry="17" fill="url(#blush)"/>' : '';
    var face = '<g class="emo-' + emo + '">' + blush + eyes.map(function (cx) { return eyeEmo(cx, emo, white, pupil, NO_LASHES.indexOf(id) < 0); }).join('') +
      (BROWS[emo] || '') + MOUTH[emo] + EXTRA[emo] + '</g>';
    return (emoCache[key] = body + face + '</svg>');
  }
  var emoUrlCache = {};
  function heroSrc(id, emo) {
    if (!emo) return heroImg(id);
    var key = id + ':' + emo;
    if (emoUrlCache[key]) return emoUrlCache[key];
    var t = emoSvgText(id, emo);
    if (!t) return heroImg(id);
    return (emoUrlCache[key] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(t));
  }
  // Картинка героя с эмоцией; когда SVG догрузятся, refreshEmoImgs() подставит эмоцию
  function emoImg(id, emo, alt, plain) {
    return '<img' + (plain ? '' : ' class="hero-main"') + ' src="' + heroSrc(id, emo) + '" data-hero="' + id + '" data-emo="' + (emo || '') + '" alt="' + esc(alt || '') + '">';
  }
  function refreshEmoImgs() {
    document.querySelectorAll('img[data-emo]').forEach(function (im) {
      var e = im.getAttribute('data-emo');
      if (e) im.src = heroSrc(im.getAttribute('data-hero'), e);
    });
  }
  function stickerHtml(heroId, emo) {
    return '<span class="sticker-face">' + emoImg(heroId, emo, '', true) + '</span>';
  }
  function renderStickerSet(h) {
    return '<section style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline"><h2 class="hand">Эмоции-стикеры</h2><span class="label">нажми — сохранится</span></div>' +
      '<div class="emo-grid">' + EMOTIONS.map(function (e) {
        return '<button class="emo" data-act="sticker" data-id="' + h.id + '" data-emo="' + e.id + '" aria-label="Сохранить стикер: ' + h.name + ', ' + e.name.toLowerCase() + '">' + stickerHtml(h.id, e.id) + '<span class="emo-name">' + e.name + '</span></button>';
      }).join('') + '</div></section>';
  }
  function stickerBlob(heroId, emo, done) {
    var N = 512, cv = document.createElement('canvas');
    cv.width = N; cv.height = N;
    var c = cv.getContext('2d');
    var hero = new Image();
    hero.onload = function () {
      c.fillStyle = '#fff'; c.beginPath(); c.arc(N / 2, N / 2, N / 2 - 4, 0, Math.PI * 2); c.fill();
      c.save(); c.beginPath(); c.arc(N / 2, N / 2, N / 2 - 18, 0, Math.PI * 2); c.clip();
      c.fillStyle = BY[heroId].sky; c.fillRect(0, 0, N, N);
      var k = (N - 36) / 340;
      c.drawImage(hero, 18 - 30 * k, 18 - 30 * k, 400 * k, 720 * k);
      c.restore();
      c.lineWidth = 12; c.strokeStyle = INK; c.beginPath(); c.arc(N / 2, N / 2, N / 2 - 16, 0, Math.PI * 2); c.stroke();
      cv.toBlob(function (b) { done(b); }, 'image/png');
    };
    hero.onerror = function () { done(null); };
    hero.src = heroSrc(heroId, emo);
  }

  /* ---------- Музыка: спокойная, без слов, рождается прямо в браузере ---------- */

  var music = { on: false, timer: null, step: 0, next: 0, master: null };
  // Аккорды C – G – Am – F, мягкий пульс и пентатоническая мелодия
  var CHORDS = [[48, 55, 60, 64], [43, 50, 55, 59], [45, 52, 57, 60], [41, 48, 53, 57]];
  var MELODY = [72, null, 76, 74, null, 72, 69, null, 71, null, 74, 72, null, 67, 69, null,
    72, null, 76, 79, null, 76, 74, null, 72, null, 69, 67, null, 69, 72, null];
  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }
  function tone(t, f, dur, type, vol, attack) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(music.master);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function scheduleMusic() {
    var spb = 60 / 72 / 2; // восьмые при 72 ударах в минуту
    while (music.next < ac.currentTime + 0.4) {
      var s = music.step, t = music.next;
      var chord = CHORDS[Math.floor(s / 8) % 4];
      if (s % 8 === 0) {
        chord.forEach(function (n) { tone(t, midi(n), spb * 8, 'triangle', 0.05, 0.6); });
        tone(t, midi(chord[0] - 12), spb * 7, 'sine', 0.12, 0.05);
      }
      if (s % 4 === 0) tone(t, 55, 0.25, 'sine', 0.16, 0.005);
      if (s % 2 === 1) tone(t, midi(chord[(s >> 1) % 4] + 12), spb * 1.6, 'sine', 0.025, 0.02);
      var m = MELODY[s % MELODY.length];
      if (m) tone(t, midi(m), spb * 2.2, 'sine', 0.06, 0.03);
      music.step = s + 1; music.next = t + spb;
    }
  }
  function startMusic() {
    try {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return;
      ac = ac || new C();
      if (ac.state === 'suspended') ac.resume();
      if (music.on) return;
      music.master = ac.createGain();
      music.master.gain.value = 0.0001;
      music.master.connect(ac.destination);
      music.master.gain.exponentialRampToValueAtTime(0.9, ac.currentTime + 2);
      music.on = true; music.step = 0; music.next = ac.currentTime + 0.1;
      music.timer = setInterval(scheduleMusic, 100);
      scheduleMusic();
    } catch (e) { /* без музыки */ }
  }
  function stopMusic() {
    if (!music.on) return;
    music.on = false;
    clearInterval(music.timer);
    var m = music.master;
    try { m.gain.cancelScheduledValues(ac.currentTime); m.gain.setValueAtTime(m.gain.value, ac.currentTime); m.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.8); } catch (e) { /* ничего */ }
    setTimeout(function () { try { m.disconnect(); } catch (e) { /* ничего */ } }, 1000);
  }
  // Браузеры разрешают звук только после касания — включаем музыку при первом касании, если она была включена
  document.addEventListener('pointerdown', function first() {
    if (get('music', false)) startMusic();
    document.removeEventListener('pointerdown', first);
  });

  /* ---------- Проказы Йоши и его дневник извинений ---------- */

  var PRANK_TYPES = ['flipTitle', 'flipCta', 'catTitle', 'swapName'];
  var PRANK_NAMES = {
    flipTitle: 'Перевернул заголовок вверх ногами',
    flipCta: 'Перевернул кнопку «Открыть карточку»',
    catTitle: 'Посадил кота на заголовок',
    swapName: 'Перепутал имя героя'
  };
  // TODO(автор): варианты «Прости, пожалуйста» — заменить своими
  var APOLOGIES = [
    'Прости, пожалуйста!',
    'Ну прости, пожалуйста…',
    'Прости, пожалуйста, я больше не буду. Наверное.',
    'Прости-прости, пожалуйста!',
    'Прости, пожалуйста, это всё кот!',
    'Прости, пожалуйста, я просто хотел, чтобы было весело.'
  ];
  function randomPranks(n) {
    var pool = PRANK_TYPES.slice(), out = [];
    while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    return out;
  }
  function logSorry(pranks, apology) {
    var diary = get('diary', []).slice();
    pranks.forEach(function (p) { diary.unshift({ p: p, a: apology, t: Date.now() }); });
    set('diary', diary.slice(0, 100));
  }
  function renderDiary() {
    var diary = get('diary', []);
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/hero/yoshi', 'К Йоши') + '<div class="pill" style="background:#FFF2B8">Поймано: ' + diary.length + '</div></div>' +
      '<div><h1 class="hand">Дневник пакостей Йоши</h1><p class="sub">Каждая пойманная проказа — и как Йоши извинился</p></div>' +
      (diary.length ? diary.map(function (e) {
        var d = new Date(e.t);
        return '<div class="card" style="display:flex;gap:12px;align-items:flex-start"><span class="ava" style="width:46px;height:46px;flex-shrink:0;background:#FFF2B8"><img src="' + heroImg('yoshi') + '" alt=""></span>' +
          '<div><div style="font-size:12px;color:var(--muted)">' + d.toLocaleDateString('ru-RU') + ' ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) + '</div>' +
          '<div style="font-weight:900">' + esc(PRANK_NAMES[e.p] || 'Что-то натворил') + '</div><div class="hand" style="font-size:22px">«' + esc(e.a) + '»</div></div></div>';
      }).join('') : '<p class="card" style="margin:0">Пока ни одной пойманной проказы. Загляни в лобби — Йоши точно что-нибудь натворил.</p>') +
      '</div>';
  }

  /* ---------- Праздничная одежда ---------- */

  // Праздники «на пробу»: страница может попросить включить их по очереди на время
  // (window.MIR_TRY = [{ h: 'halloween', ms: 60000 }, { h: 'newyear', ms: 60000 }])
  var trySeq = window.MIR_TRY ? [].concat(window.MIR_TRY) : [];
  var holidayTry = null;
  function nextTry() {
    var t = trySeq.shift();
    holidayTry = t && t.h ? { h: t.h, until: Date.now() + (t.ms || 60000) } : null;
  }
  nextTry();
  function holidayNow() {
    if (holidayTry && Date.now() < holidayTry.until) return holidayTry.h;
    var forced = get('holiday', null);
    if (forced) return forced === 'none' ? null : forced;
    var d = new Date(), m = d.getMonth() + 1, day = d.getDate();
    if (m === 10 && day === 10) return 'birthday';
    if ((m === 12 && day >= 20) || (m === 1 && day <= 10)) return 'newyear';
    if ((m === 10 && day >= 24) || (m === 11 && day <= 1)) return 'halloween';
    if ((m === 8 && day >= 30) || (m === 9 && day <= 2)) return 'school';
    return null;
  }
  function festiveOverlay(hol) {
    var o = '';
    if (hol === 'newyear') {
      o = '<path d="M98 150 C104 80 170 42 236 44 C286 46 318 62 336 92 C312 84 292 86 276 96 C300 110 310 130 304 150 Z" fill="#E5484D" stroke="#2B2233" stroke-width="5" stroke-linejoin="round"/>' +
        '<rect x="88" y="132" width="226" height="34" rx="17" fill="#FFFFFF" stroke="#2B2233" stroke-width="5"/>' +
        '<circle cx="342" cy="96" r="18" fill="#FFFFFF" stroke="#2B2233" stroke-width="5"/>';
    } else if (hol === 'halloween') {
      o = '<ellipse cx="200" cy="128" rx="156" ry="26" fill="#3A2D5C" stroke="#2B2233" stroke-width="5"/>' +
        '<path d="M126 124 C140 60 176 20 214 -6 C228 18 246 46 278 60 C262 70 266 96 276 124 Z" fill="#3A2D5C" stroke="#2B2233" stroke-width="5" stroke-linejoin="round"/>' +
        '<path d="M130 108 L272 108" stroke="#F08A3C" stroke-width="12"/>';
    } else if (hol === 'school') {
      o = '<g transform="translate(290 112) rotate(14)" stroke="#2B2233" stroke-width="5" stroke-linejoin="round" fill="#FFFFFF">' +
        '<path d="M0 0 L-52 -30 L-52 30 Z"/><path d="M0 0 L52 -30 L52 30 Z"/><circle cx="0" cy="0" r="12"/></g>';
    }
    return o ? '<svg class="festive" aria-hidden="true" viewBox="0 0 400 720">' + o + '</svg>' : '';
  }
  function festiveScene(hol) {
    if (hol === 'birthday') {
      var conf = '', rnd = seeded(1010);
      for (var k = 0; k < 40; k++) conf += '<rect x="' + Math.round(rnd() * 400) + '" y="' + Math.round(rnd() * 260) + '" width="6" height="10" rx="2" fill="' + ['#FF8FB8', '#FFD84A', '#8FD3FF', '#B48CF0', '#7CC46A', '#FF9A3D'][k % 6] + '" transform="rotate(' + Math.round(rnd() * 90) + ' 0 0)"/>';
      return '<svg class="confetti" aria-hidden="true" viewBox="0 0 400 260" preserveAspectRatio="none">' + conf + '</svg>';
    }
    if (hol === 'newyear') {
      var bulbs = '';
      for (var i = 0; i < 9; i++) bulbs += '<circle cx="' + (22 + i * 44) + '" cy="' + (16 + (i % 2) * 10) + '" r="7" fill="' + ['#E5484D', '#FFD84A', '#6FD36A', '#4FB4FF'][i % 4] + '" stroke="#2B2233" stroke-width="2.5"/>';
      return '<svg class="garland" aria-hidden="true" viewBox="0 0 400 40" preserveAspectRatio="none"><path d="M0 10 Q22 30 44 16 T88 16 T132 16 T176 16 T220 16 T264 16 T308 16 T352 16 T400 16" fill="none" stroke="#2B2233" stroke-width="2.5"/>' + bulbs + '</svg>';
    }
    if (hol === 'halloween') {
      var bat = function (x, y, s) { return '<path transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0 0 C-6 -10 -16 -10 -22 -4 C-16 -4 -14 2 -16 6 C-10 2 -4 4 0 8 C4 4 10 2 16 6 C14 2 16 -4 22 -4 C16 -10 6 -10 0 0 Z" fill="#2B2233"/>'; };
      return '<svg class="bats" aria-hidden="true" viewBox="0 0 400 200">' + bat(60, 60, 1.6) + bat(300, 40, 1.2) + bat(240, 110, 0.9) + '</svg>';
    }
    return '';
  }

  /* ---------- Чай Лизы как зелье ---------- */

  function potionToday(id) {
    var p = get('potions', {})[id];
    return p && p.d === dayNumber() ? p : null;
  }
  function potionBlock(h) {
    if (h.id === 'liza') return '';
    var p = potionToday(h.id);
    if (p) {
      return '<div class="card" style="display:flex;gap:12px;align-items:center;background:' + (p.heal ? '#E3F6E0' : '#FFE3C7') + '">' +
        stickerHtml(h.id, p.heal ? 'joy' : 'angry').replace('class="sticker-face"', 'class="sticker-face" style="width:64px;flex-shrink:0"') +
        '<div style="font-weight:800;line-height:1.35">' + (p.heal ? h.name + ' выпил' + (h.id === 'yoshi' ? '' : 'а') + ' лечебный чай Лизы и радуется весь день!' : h.name + ' выпил' + (h.id === 'yoshi' ? '' : 'а') + ' коварный чай Лизы и сердится до завтра!') + '</div></div>';
    }
    return '<button class="btn btn-big" data-act="potion" data-id="' + h.id + '" style="background:#FFE9D4;font-size:16px">Напоить чаем Лизы</button>';
  }

  /* ---------- Прятки с Кенди ---------- */

  var SEEK_SPOTS = [
    ['', '', 'right', '38%'], ['hero', 'lana', 'left', '60%'], ['world', 'yoshi', 'right', '30%'], ['album', '', 'left', '45%'],
    ['friends', '', 'right', '66%'], ['more', '', 'left', '72%'], ['card', '', 'right', '52%'], ['hero', 'ulyana', 'right', '24%'],
    ['world', 'liza', 'left', '58%'], ['cipher', '', 'right', '40%']
  ];
  function seekState() { return get('seek', { last: null, streak: 0 }); }
  function addHideSeek(page, param) {
    var s = seekState();
    if (s.last === dayNumber()) return;
    var spot = SEEK_SPOTS[dayNumber() % SEEK_SPOTS.length];
    var p = page === 'lobby' ? '' : page;
    if (p === 'world' && !param) param = ui.world;
    if (spot[0] !== p || (spot[1] && spot[1] !== param)) return;
    var b = document.createElement('button');
    b.className = 'seek ' + spot[2];
    b.style.top = spot[3];
    b.setAttribute('data-act', 'seek');
    b.setAttribute('aria-label', 'Чьи-то ушки выглядывают');
    b.innerHTML = '<svg aria-hidden="true" viewBox="0 0 60 36"><path d="M4 34 L8 2 L26 20 Z M56 34 L52 2 L34 20 Z" fill="#fff" stroke="#2B2233" stroke-width="3" stroke-linejoin="round"/><path d="M10 26 L12 10 L21 19 Z M50 26 L48 10 L39 19 Z" fill="#FF9EC0"/><path d="M6 34 Q30 18 54 34 Z" fill="#7FE6D8" stroke="#2B2233" stroke-width="3" stroke-linejoin="round"/></svg>';
    app.appendChild(b);
  }

  /* ---------- Герои замечают, что тебя не было ---------- */

  // TODO(автор): реплики героев — заменить своими
  var WELCOME = [
    [1, 'yoshi', 'Ты вчера не заходил! Я так скучал, что даже ничего не напакостил. Почти.'],
    [3, 'lana', 'Ты где пропадал? Кошки скучали, а Йоши тут без тебя напакостил вдвойне!'],
    [7, 'ulyana', 'Целую неделю тебя не было! Я за это время научилась летать… нет, не научилась.'],
    [30, 'candy', 'Ты так долго не приходил, что я думала — это ты надел мою шапку-невидимку!']
  ];
  (function noticeAbsence() {
    var last = get('lastVisit', null), now = Date.now();
    set('lastVisit', now);
    if (!last) return;
    var gap = Math.floor((now - last) / 86400000);
    if (gap < 1) return;
    var pick = WELCOME[0];
    WELCOME.forEach(function (w) { if (gap >= w[0]) pick = w; });
    ui.welcome = { hero: pick[1], text: pick[2], gap: gap };
    if (gap >= 3) ui.pranks = randomPranks(2);
  })();
  function welcomeCard() {
    if (!ui.welcome) return '';
    var w = ui.welcome;
    return '<div class="card welcome" role="status"><span class="ava" style="width:52px;height:52px;flex-shrink:0;background:' + BY[w.hero].sky + '"><img src="' + heroImg(w.hero) + '" alt=""></span>' +
      '<div style="flex:1;min-width:0"><div class="hand" style="font-size:22px;line-height:1.1">' + esc(w.text) + '</div></div>' +
      '<button class="btn" data-act="welcome-ok" style="min-height:40px;padding:0 10px">Привет!</button></div>';
  }

  /* ---------- Встряхни — Лиза прольёт чай ---------- */

  var lastShake = 0, motionOn = false;
  function onMotion(e) {
    var a = e.accelerationIncludingGravity || e.acceleration;
    if (!a) return;
    var m = Math.sqrt((a.x || 0) * (a.x || 0) + (a.y || 0) * (a.y || 0) + (a.z || 0) * (a.z || 0));
    if (m > 25 && Date.now() - lastShake > 4000) { lastShake = Date.now(); spillTea(); }
  }
  function enableMotion(fromClick) {
    if (motionOn) return;
    var D = window.DeviceMotionEvent;
    if (!D) { if (fromClick) toast('На этом устройстве нет датчиков движения'); return; }
    if (typeof D.requestPermission === 'function') {
      if (!fromClick) return;
      D.requestPermission().then(function (r) {
        if (r === 'granted') { window.addEventListener('devicemotion', onMotion); motionOn = true; set('motion', true); toast('Готово! Теперь можно трясти телефон'); }
        else toast('Без разрешения встряхивания не работают');
      }, function () { toast('Без разрешения встряхивания не работают'); });
    } else {
      window.addEventListener('devicemotion', onMotion); motionOn = true; set('motion', true);
      if (fromClick) toast('Готово! Теперь можно трясти телефон');
    }
  }
  enableMotion(false);
  function spillTea() {
    var old = document.getElementById('spill');
    if (old) old.remove();
    var d = document.createElement('div');
    d.id = 'spill';
    d.className = 'spill';
    d.innerHTML = '<svg aria-hidden="true" viewBox="0 0 400 800" preserveAspectRatio="none"><path d="M60 300 C20 260 60 200 120 220 C160 150 260 170 270 230 C340 210 380 280 330 330 C380 380 320 460 250 430 C220 500 120 490 110 430 C40 450 10 360 60 300 Z" fill="#C98A4E" opacity=".72"/><circle cx="70" cy="520" r="28" fill="#C98A4E" opacity=".6"/><circle cx="330" cy="560" r="18" fill="#C98A4E" opacity=".6"/><circle cx="300" cy="140" r="14" fill="#C98A4E" opacity=".6"/></svg>' +
      (!has('items', 'spoon') ? '<button class="find" data-act="item" aria-label="Что-то блестит в луже" style="left:calc(50% - 22px);top:40%;pointer-events:auto"><img src="' + itemImg('spoon') + '" alt=""></button>' : '');
    document.body.appendChild(d);
    beep('tea');
    toast('Ой! Лиза пролила чай…', has('items', 'spoon') ? 'Хорошо, что не на тебя' : 'Что это блестит в луже?', ['liza', 'wow']);
    react('wow', REACT_SAY.shake, 1600);
    setTimeout(function () { d.classList.add('dry'); }, 7000);
    setTimeout(function () { d.remove(); }, 8000);
  }

  /* ---------- Кот Йоши бегает от пальца ---------- */

  var px = -999, py = -999;
  document.addEventListener('pointermove', function (e) { px = e.clientX; py = e.clientY; }, { passive: true });
  document.addEventListener('pointerdown', function (e) { px = e.clientX; py = e.clientY; }, { passive: true });
  function maybeRunCat(page) {
    if (['fly', 'tower', 'eyes', 'hospital'].indexOf(page) >= 0) return;
    var chance = has('items', 'bell') ? 0.08 : 0.3;
    if (Math.random() > chance) return;
    var start = setTimeout(function () { runCat(); }, 1500 + Math.random() * 4000);
    cleanups.push(function () { clearTimeout(start); });
  }
  function runCat() {
    var W = window.innerWidth, H = window.innerHeight;
    var cat = document.createElement('button');
    cat.className = 'runcat';
    cat.setAttribute('data-act', 'catch-cat');
    cat.setAttribute('aria-label', 'Кот Йоши! Поймай его');
    cat.innerHTML = '<img src="img/worlds/yoshi-cat.svg" alt="">';
    document.body.appendChild(cat);
    var fromLeft = Math.random() < 0.5;
    var x = fromLeft ? -60 : W + 10, y = H * (0.3 + Math.random() * 0.4), vx = fromLeft ? 2.6 : -2.6, vy = 0, born = performance.now(), raf;
    function tick(ts) {
      var age = ts - born;
      var dx = x + 28 - px, dy = y + 35 - py, dist = Math.hypot(dx, dy);
      if (dist < 130 && age < 14000) { vx += dx / dist * 0.9; vy += dy / dist * 0.9; }
      vx += (Math.random() - 0.5) * 0.3; vy += (Math.random() - 0.5) * 0.3;
      var sp = Math.hypot(vx, vy), max = dist < 130 ? 7 : 3.2;
      if (sp > max) { vx = vx / sp * max; vy = vy / sp * max; }
      x += vx; y += vy;
      if (age < 14000) {
        if (x < 0) { x = 0; vx = Math.abs(vx); }
        if (x > W - 60) { x = W - 60; vx = -Math.abs(vx); }
        if (y < 60) { y = 60; vy = Math.abs(vy); }
        if (y > H - 150) { y = H - 150; vy = -Math.abs(vy); }
      } else { vx = vx < 0 ? -6 : 6; }
      cat.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px) scaleX(' + (vx < 0 ? -1 : 1) + ')';
      if (age > 14000 && (x < -80 || x > W + 80)) { cat.remove(); return; }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    cleanups.push(function () { cancelAnimationFrame(raf); cat.remove(); });
  }

  /* ---------- Секретный код из героев ---------- */

  var SECRET_CODE = ['ulyana', 'liza', 'yoshi', 'lana', 'candy'];
  var codeSeq = [];
  function checkCode(id) {
    codeSeq.push(id);
    if (codeSeq.length > SECRET_CODE.length) codeSeq.shift();
    if (codeSeq.join() === SECRET_CODE.join()) {
      codeSeq = [];
      var on = !get('allHats', false);
      set('allHats', on);
      beep('hint');
      toast(on ? 'Секретный режим: все в шапках Кенди!' : 'Шапки сняты', on ? 'Повтори код, чтобы снять' : '', ['candy', on ? 'joy' : 'wow']);
      return true;
    }
    return false;
  }

  /* ---------- День рождения сайта (10 октября): все в пижамах ---------- */

  var PJ = {
    lana: '<rect width="40" height="40" fill="#EADFFF"/><g stroke="#2B2233" stroke-width="1.6" stroke-linejoin="round"><path d="M6 12 L7 4 L11 9 Z M18 12 L17 4 L13 9 Z" fill="#fff"/><circle cx="12" cy="13" r="6" fill="#fff"/><path d="M26 32 L27 24 L31 29 Z M38 32 L37 24 L33 29 Z" fill="#B48CF0"/><circle cx="32" cy="33" r="6" fill="#B48CF0"/></g><circle cx="10" cy="13" r="1" fill="#2B2233"/><circle cx="14" cy="13" r="1" fill="#2B2233"/><circle cx="30" cy="33" r="1" fill="#2B2233"/><circle cx="34" cy="33" r="1" fill="#2B2233"/>',
    ulyana: '<rect y="0" width="40" height="8" fill="#FFB3BE"/><rect y="8" width="40" height="8" fill="#FFCFA0"/><rect y="16" width="40" height="8" fill="#FFF0A8"/><rect y="24" width="40" height="8" fill="#BDEBB5"/><rect y="32" width="40" height="8" fill="#B5DCFF"/><rect y="40" width="40" height="8" fill="#DCC6FF"/>',
    yoshi: '<rect width="36" height="36" fill="#FFE45C"/><circle cx="9" cy="9" r="3.2" fill="#fff" stroke="#2B2233" stroke-width="1.2"/><circle cx="27" cy="27" r="3.2" fill="#fff" stroke="#2B2233" stroke-width="1.2"/><path d="M27 6 l1.5 3 3 .4 -2.2 2 .6 3 -2.9 -1.6 -2.9 1.6 .6 -3 -2.2 -2 3 -.4z" fill="#FFB020"/>',
    candy: '<rect width="40" height="40" fill="#FFD3E6"/><g stroke="#2B2233" stroke-width="1.4" stroke-linejoin="round"><path d="M6 12 L2 8 L2 16 Z M18 12 L22 8 L22 16 Z" fill="#8FD3FF"/><ellipse cx="12" cy="12" rx="6" ry="4.2" fill="#8FD3FF"/><path d="M26 32 L22 28 L22 36 Z M38 32 L42 28 L42 36 Z" fill="#FFD84A"/><ellipse cx="32" cy="32" rx="6" ry="4.2" fill="#FFD84A"/></g>',
    liza: '<rect width="40" height="40" fill="#FFE9D4"/><g stroke="#2B2233" stroke-width="1.5" stroke-linejoin="round"><path d="M5 9 h12 v4 a6 6 0 0 1 -12 0 z" fill="#fff"/><path d="M17 11 a2.5 2.5 0 0 1 0 5" fill="none"/><circle cx="30" cy="30" r="6" fill="#E8B26A"/></g><circle cx="28" cy="28" r="1.1" fill="#6E4128"/><circle cx="32" cy="31" r="1.1" fill="#6E4128"/><circle cx="29" cy="33" r="1" fill="#6E4128"/>'
  };
  var PJ_SIZE = { lana: [40, 40], ulyana: [40, 48], yoshi: [36, 36], candy: [40, 40], liza: [40, 40] };
  function pajamaOverlay(id) {
    if (!PJ[id]) return '';
    var sz = PJ_SIZE[id], pid = 'pj-' + id;
    var f = 'url(#' + pid + ')', st = ' stroke="#2B2233" stroke-width="5" stroke-linejoin="round"';
    return '<svg class="pajama" aria-hidden="true" viewBox="0 0 400 720"><defs><pattern id="' + pid + '" patternUnits="userSpaceOnUse" width="' + sz[0] + '" height="' + sz[1] + '">' + PJ[id] + '</pattern></defs>' +
      '<rect x="112" y="338" width="32" height="200" rx="16" fill="' + f + '"' + st + '/>' +
      '<rect x="256" y="338" width="32" height="200" rx="16" fill="' + f + '"' + st + '/>' +
      '<circle cx="128" cy="548" r="12" fill="#FFE6D6"' + st.replace('5', '4') + '/><circle cx="272" cy="548" r="12" fill="#FFE6D6"' + st.replace('5', '4') + '/>' +
      '<path d="M146 556 L254 556 L252 678 L208 678 L200 604 L192 678 L148 678 Z" fill="' + f + '"' + st + '/>' +
      '<path d="M142 332 Q200 320 258 332 L258 560 Q258 574 244 574 L156 574 Q142 574 142 560 Z" fill="' + f + '"' + st + '/>' +
      '<path d="M174 328 L200 352 L226 328" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M174 328 L200 352 L226 328" fill="none" stroke="#2B2233" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      [388, 428, 468, 508].map(function (y) { return '<circle cx="200" cy="' + y + '" r="5" fill="#fff" stroke="#2B2233" stroke-width="2.5"/>'; }).join('') +
      '</svg>';
  }
  function isBirthday() { return holidayNow() === 'birthday'; }
  function heroFigure(id, extraClass, style, emo) {
    return '<span class="hero-fig ' + (extraClass || '') + (emo ? ' reacting' : '') + '" data-hero="' + id + '"' + (style ? ' style="' + style + '"' : '') + '>' + emoImg(id, emo, BY[id].name) + (isBirthday() ? pajamaOverlay(id) : '') + '</span>';
  }

  /* ---------- Фейерверки в день рождения сайта ---------- */

  function mountFireworks() {
    var lobby = document.querySelector('.lobby');
    if (!lobby || holidayNow() !== 'birthday') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = document.createElement('canvas');
    cv.className = 'fireworks';
    cv.setAttribute('aria-hidden', 'true');
    var bg = lobby.querySelector('.bg');
    bg.insertBefore(cv, bg.querySelector('.hill'));
    var dpr = window.devicePixelRatio || 1, W, H;
    function size() { W = lobby.clientWidth; H = lobby.clientHeight * 0.62; cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + 'px'; }
    size();
    var c = cv.getContext('2d');
    var COLORS = ['#FF5A7E', '#FFD84A', '#8FD3FF', '#B48CF0', '#7CC46A', '#FF9A3D', '#FFFFFF'];
    var rockets = [], sparks = [], raf, next = 0;
    function launch(x, y) {
      rockets.push({ x: x == null ? W * (0.15 + Math.random() * 0.7) : x, y: H, ty: y == null ? H * (0.12 + Math.random() * 0.35) : y, vy: -(6 + Math.random() * 2.5), color: COLORS[Math.floor(Math.random() * COLORS.length)] });
    }
    function burst(r) {
      var n = 54 + Math.floor(Math.random() * 24), two = Math.random() < 0.4, c2 = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (var i = 0; i < n; i++) {
        var a = Math.PI * 2 * i / n, sp = 2.2 + Math.random() * 2.8;
        sparks.push({ x: r.x, y: r.y, px: r.x, py: r.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, color: two && i % 2 ? c2 : r.color });
      }
      beep('pop');
    }
    function tick(ts) {
      if (ts > next) { launch(); next = ts + 650 + Math.random() * 900; }
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, W, H);
      c.shadowBlur = 8;
      rockets = rockets.filter(function (r) {
        r.y += r.vy; r.vy *= 0.985;
        c.shadowColor = r.color; c.fillStyle = r.color; c.beginPath(); c.arc(r.x, r.y, 3.2, 0, Math.PI * 2); c.fill();
        c.fillStyle = 'rgba(255,240,200,.7)'; c.fillRect(r.x - 1.5, r.y + 4, 3, 16);
        if (r.y <= r.ty || r.vy > -1.2) { burst(r); return false; }
        return true;
      });
      sparks = sparks.filter(function (s) {
        s.px = s.x; s.py = s.y;
        s.x += s.vx; s.y += s.vy; s.vy += 0.04; s.vx *= 0.985; s.vy *= 0.985; s.life -= 0.011;
        if (s.life <= 0) return false;
        c.globalAlpha = Math.max(0, s.life);
        c.shadowColor = s.color; c.strokeStyle = s.color; c.lineWidth = 3; c.lineCap = 'round';
        c.beginPath(); c.moveTo(s.px - s.vx * 2, s.py - s.vy * 2); c.lineTo(s.x, s.y); c.stroke();
        c.globalAlpha = 1;
        return true;
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    function onTap(e) {
      if (e.target.closest('button, a')) return;
      var r = cv.getBoundingClientRect();
      if (e.clientY - r.top < H * 0.8) launch(e.clientX - r.left, Math.max(20, e.clientY - r.top));
    }
    lobby.addEventListener('pointerdown', onTap);
    window.addEventListener('resize', size);
    cleanups.push(function () { cancelAnimationFrame(raf); lobby.removeEventListener('pointerdown', onTap); window.removeEventListener('resize', size); });
  }

  /* ---------- Общие помощники для картинок ---------- */

  function loadImg(src) {
    return new Promise(function (ok, fail) { var im = new Image(); im.onload = function () { ok(im); }; im.onerror = fail; im.src = src; });
  }
  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return Promise.all([document.fonts.load('700 60px Caveat'), document.fonts.load('900 34px Nunito'), document.fonts.load('800 34px Nunito')]).catch(function () {});
  }
  // Пишет текст с переносом по словам; возвращает y следующей строки
  function wrapText(c, text, x, y, maxW, lh) {
    var line = '';
    String(text).split(' ').forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (c.measureText(test).width > maxW && line) { c.fillText(line, x, y); line = w; y += lh; } else { line = test; }
    });
    if (line) { c.fillText(line, x, y); y += lh; }
    return y;
  }
  function roundRect(c, x, y, w, h, r) {
    c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath();
  }
  function worldImg(id) { return 'img/worlds/world-' + id + '.svg'; }

  /* ---------- Особые и сезонные находки ---------- */

  var SPECIAL = [
    { id: 'cake', name: 'Кусочек праздничного торта', bg: '#FFE3EE', when: 'Только 10 октября, в день рождения сайта', riddle: 'Там, где пьют чай с печеньками', season: 'birthday', world: 'liza', spot: 'left:58%;top:56%' },
    { id: 'pumpkin', name: 'Тыква', bg: '#FFE2C4', when: 'Только в неделю Хэллоуина: 24 октября – 1 ноября', riddle: 'Прячется среди кошек', season: 'halloween', world: 'lana', spot: 'left:16%;top:60%' },
    { id: 'snowflake', name: 'Снежинка', bg: '#DDEFFF', when: 'Только в зимние праздники: 20 декабря – 10 января', riddle: 'Падает с жёлтого неба', season: 'newyear', world: 'yoshi', spot: 'left:40%;top:16%' },
    { id: 'pencil', name: 'Карандаш', bg: '#FFF2B8', when: 'Только в начале учебного года: 30 августа – 2 сентября', riddle: 'Там, где учатся рисовать', season: 'school' },
    { id: 'gift', name: 'Подарок от друга', bg: '#EADFFF', when: 'Если друг пришлёт тебе приглашение', riddle: 'Его нельзя найти — только получить' },
    { id: 'ghost', name: 'Призрачок', bg: '#F1EAFF', when: 'Редкая сладость на Хэллоуин', riddle: 'Прячется в тыкве — но не в каждой' }
  ];
  var SPECIAL_BY = {};
  SPECIAL.forEach(function (it) { SPECIAL_BY[it.id] = it; });
  function seasonFind(worldId) {
    var hol = holidayNow();
    var it = SPECIAL.filter(function (x) { return x.world === worldId && x.season === hol; })[0];
    if (!it || has('special', it.id)) return '';
    return findBtn('item', itemImg(it.id), 'Что-то необычное — только сегодня', it.spot + ';width:40px;height:40px;padding:5px');
  }
  function renderSpecialAlbum() {
    var got = get('special', []);
    var candy = get('halloweenCandy', 0);
    return '<div><h2 class="hand">Особые находки</h2><p class="sub" style="font-size:13px">Появляются только в свои дни — как события в играх' + (candy ? '. Конфет за Хэллоуин: ' + candy : '') + '</p></div>' +
      '<div class="album">' + SPECIAL.map(function (it, i) {
        var g = got.indexOf(it.id) >= 0;
        return '<div class="card' + (g ? '' : ' missing') + '" style="background:' + (g ? it.bg : '#fff') + ';transform:rotate(' + ['1', '-1.5', '.5', '-1', '1.5', '-.5'][i] + 'deg)">' +
          '<img src="' + itemImg(it.id) + '" alt="' + (g ? it.name : 'Ещё не найдено') + '">' +
          '<div style="font-size:15px;font-weight:900">' + (g ? it.name : '???') + '</div>' +
          '<div class="riddle">' + esc(it.riddle) + '</div><div class="riddle" style="color:var(--violet)">' + esc(it.when) + '</div></div>';
      }).join('') + '</div>';
  }

  /* ---------- Тест «Кто ты из нас?» ---------- */

  // TODO(автор): вопросы и ответы — черновик по её описаниям героев, автор может переписать
  var QUIZ = [
    { q: 'Друг загрустил. Что ты сделаешь?', a: [['Налью ему чаю — он всё лечит', 'liza'], ['Обниму и скажу что-нибудь доброе', 'lana'], ['Рассмешу его', 'candy'], ['Устрою весёлую проказу, чтобы он улыбнулся', 'yoshi'], ['Прилечу на помощь (даже если плохо летаю)', 'ulyana']] },
    { q: 'Где тебе было бы лучше всего?', a: [['Там, где всегда радуга', 'ulyana'], ['Там, где всё в кошках', 'lana'], ['Под жёлтым небом', 'yoshi'], ['На уютной кухне с чаем и печеньками', 'liza'], ['В мире из конфет', 'candy']] },
    { q: 'Какую особенность ты бы выбрал?', a: [['Летать', 'ulyana'], ['Говорить с кошками', 'lana'], ['Звать своего питомца', 'yoshi'], ['Волшебный чай', 'liza'], ['Становиться невидимым', 'candy']] },
    { q: 'Как тебя описали бы друзья?', a: [['Очень добрый и немного неуклюжий', 'ulyana'], ['Милый и отзывчивый', 'lana'], ['Добрый, но любит попакостить', 'yoshi'], ['Умный и хитрый', 'liza'], ['Весёлый и чуть-чуть дерзкий', 'candy']] },
    { q: 'Над тобой подшутили. Что дальше?', a: [['Отвечу тем же!', 'ulyana'], ['Не обижусь — я добрый', 'lana'], ['Ха! Я сам мастер проказ', 'yoshi'], ['Придумаю хитрый план', 'liza'], ['Посмеюсь и отвечу дерзко', 'candy']] },
    { q: 'Что взять с собой в путешествие?', a: [['Подушку — вдруг захочется поспать', 'ulyana'], ['Кошку, конечно', 'lana'], ['Своего кота', 'yoshi'], ['Термос с чаем', 'liza'], ['Свою шапку', 'candy']] }
  ];
  ui.quiz = { i: 0, score: {}, last: null, done: null };
  function quizOrder(qi) {
    var r = seeded(qi * 7 + 3), a = QUIZ[qi].a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function renderQuiz() {
    var q = ui.quiz;
    var head = '<div class="topbar">' + backBtn('#/more') + '<div class="pill" style="background:var(--lav)">' + (q.done ? 'Готово!' : 'Вопрос ' + (q.i + 1) + ' из ' + QUIZ.length) + '</div></div>';
    if (q.done) {
      var h = BY[q.done];
      return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' + head +
        '<div style="text-align:center"><p class="sub" style="margin:0">Кто ты из нас?</p><h1 class="hand" style="font-size:52px">Ты — ' + h.name + '!</h1></div>' +
        '<div class="quiz-result" style="background:' + h.sky + '">' + heroFigure(h.id, 'quiz-fig', '', 'joy') + '</div>' +
        '<p class="card" style="margin:0;font-size:16px;line-height:1.4">' + esc(h.character) + '</p>' +
        '<div class="card power" style="margin:0">' + ICON.sparkle + '<div><div class="hand" style="font-size:24px;line-height:1">Особенность</div><div style="font-weight:800">' + esc(h.power) + '</div></div></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn" data-act="quiz-save">Картинка для сторис</button><button class="btn btn-yellow" data-act="quiz-share">Отправить другу</button></div>' +
        '<a class="btn btn-big btn-violet" href="#/hero/' + h.id + '">Открыть карточку героя</a>' +
        '<button class="btn" data-act="quiz-again" style="align-self:center">Пройти ещё раз</button></div>';
    }
    var prev = get('quiz', null);
    var qq = QUIZ[q.i];
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' + head +
      (q.i === 0 ? '<div><h1 class="hand">Кто ты из нас?</h1><p class="sub">Шесть вопросов — и узнаешь, какой ты герой.' + (prev && BY[prev] ? ' В прошлый раз вышло: ' + BY[prev].name + '.' : '') + '</p></div>' : '') +
      '<div class="progress" aria-hidden="true"><div style="width:' + Math.round(q.i / QUIZ.length * 100) + '%"></div></div>' +
      '<div class="card card-shadow"><div class="hand" style="font-size:32px;line-height:1.05">' + esc(qq.q) + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px">' + quizOrder(q.i).map(function (a) {
        return '<button class="btn quiz-opt" data-act="quiz-ans" data-id="' + a[1] + '">' + esc(a[0]) + '</button>';
      }).join('') + '</div></div>';
  }
  function quizAnswer(id) {
    var q = ui.quiz;
    q.score[id] = (q.score[id] || 0) + 1; q.last = id; q.i++;
    if (q.i >= QUIZ.length) {
      var best = 0, win = q.last;
      HEROES.forEach(function (h) { var sc = q.score[h.id] || 0; if (sc > best || (sc === best && h.id === q.last)) { best = sc; win = h.id; } });
      q.done = win; set('quiz', win); beep('hint');
    } else beep('pick');
  }
  function storyBlob(id, done) {
    var h = BY[id], W = 1080, H = 1920, cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    Promise.all([loadImg(worldImg(id)), loadImg(heroSrc(id, 'joy')), fontsReady()]).then(function (r) {
      var world = r[0], hero = r[1];
      c.fillStyle = h.sky; c.fillRect(0, 0, W, H);
      var k = Math.max(W / 724, 1260 / 484), ww = 724 * k;
      c.drawImage(world, (W - ww) / 2, 0, ww, 484 * k);
      c.fillStyle = '#FFFBF3'; c.strokeStyle = INK; c.lineWidth = 10;
      roundRect(c, -20, 1180, W + 40, 800, 70); c.fill(); c.stroke();
      c.drawImage(hero, (W - 560) / 2, 250, 560, 1008);
      c.textAlign = 'center';
      c.font = '900 46px Nunito, sans-serif';
      var pw = c.measureText('Кто ты из нас?').width + 70;
      c.fillStyle = '#fff'; c.lineWidth = 7; roundRect(c, (W - pw) / 2, 70, pw, 88, 44); c.fill(); c.stroke();
      c.fillStyle = INK; c.fillText('Кто ты из нас?', W / 2, 130);
      c.font = '700 150px Caveat, cursive'; c.fillText('Я — ' + h.name + '!', W / 2, 1420);
      c.font = '800 42px Nunito, sans-serif'; c.fillStyle = '#4A4055';
      var y = wrapText(c, h.character, W / 2, 1510, 900, 56);
      c.font = '900 40px Nunito, sans-serif'; c.fillStyle = '#7A4DD8';
      wrapText(c, 'Особенность: ' + h.powerShort, W / 2, y + 30, 900, 54);
      c.font = '800 34px Nunito, sans-serif'; c.fillStyle = '#8C8298';
      c.fillText('Мир героев · пройди тест и узнай, кто ты', W / 2, H - 70);
      cv.toBlob(function (b) { done(b); }, 'image/png');
    }, function () { done(null); });
  }

  /* ---------- «Позови друга» — всё в ссылке, без сервера ---------- */

  ui.invite = 'candy';
  // TODO(автор): приветствие для друга — черновик
  var HI_TEXT = 'Привет! Тебя позвали в Мир героев. Держи подарок — и ищи остальные находки!';
  function renderInvite() {
    var h = BY[ui.invite], link = siteBase() + '#/hi/' + h.id;
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/more') + '</div>' +
      '<div><h1 class="hand">Позови друга</h1><p class="sub">Выбери героя, который встретит друга. Друг получит особую находку — подарок, а ты — печать этого героя в альбом.</p></div>' +
      '<div class="party" role="group" aria-label="Кто встретит друга">' + HEROES.map(function (t) {
        return '<button class="ava" data-act="invite-pick" data-id="' + t.id + '" aria-label="' + t.name + '" aria-pressed="' + (t.id === h.id) + '"' + (t.id === h.id ? ' aria-current="true"' : '') + '><img src="' + heroImg(t.id) + '" alt=""></button>';
      }).join('') + '</div>' +
      '<div class="card card-shadow" style="display:flex;gap:12px;align-items:center;background:' + h.sky + '">' + stickerHtml(h.id, 'joy').replace('class="sticker-face"', 'class="sticker-face" style="width:72px;flex-shrink:0"') +
      '<div><div class="hand" style="font-size:28px;line-height:1">' + h.name + ' встретит друга</div><div style="font-size:14px;font-weight:700">и подарит ему подарок</div></div></div>' +
      (inArtifact() ? '<p class="card" style="margin:0;font-size:13px;background:var(--yellow)">Это предпросмотр: ссылка-приглашение заработает, когда сайт будет опубликован.</p>' : '') +
      '<label class="field"><span>Ссылка для друга</span><input id="inviteLink" readonly value="' + esc(link) + '"></label>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button class="btn" data-act="invite-copy">Скопировать</button><button class="btn btn-violet" data-act="invite-share">Отправить</button></div>' +
      '<p class="sub" style="text-align:center;font-size:12px">В ссылке только имя героя — ничего о тебе или друге.</p></div>';
  }
  function inviteDone() {
    var h = BY[ui.invite], had = has('stamps', h.id), st = addTo('stamps', h.id);
    toast(had ? 'Приглашение готово!' : 'Печать героя ' + h.name + ' — в альбоме!', had ? 'Отправь его другу' : 'Печатей: ' + st.length + ' из ' + HEROES.length, [h.id, 'joy']);
  }
  function renderHi(id) {
    var h = BY[id] || BY.candy, gift = !has('special', 'gift');
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h));align-items:center;text-align:center">' +
      '<h1 class="hand" style="font-size:44px">Тебя позвал друг!</h1>' +
      '<div class="hi-stage" style="background:' + h.sky + '">' + heroFigure(h.id, 'hi-fig', '', 'joy') +
      (gift ? findBtn('item', itemImg('gift'), 'Подарок для тебя — нажми', 'right:14%;bottom:12%;width:64px;height:64px;padding:7px') : '') + '</div>' +
      '<p class="card" style="margin:0;font-size:16px;line-height:1.4"><b>' + h.name + ':</b> ' + esc(HI_TEXT) + '</p>' +
      '<a class="btn btn-big btn-violet" href="#/">Войти в Мир героев</a>' +
      '<a class="btn" href="#/quiz">Пройти тест «Кто ты из нас?»</a></div>';
  }

  /* ---------- Обои для телефона ---------- */

  ui.wall = 'ulyana'; ui.wallNight = false;
  var wallUrl = null;
  function renderWallpapers() {
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/more') + '<button class="btn time-btn' + (ui.wallNight ? ' night-on' : '') + '" data-act="wall-night" style="font-size:13px">' + (ui.wallNight ? ICON.moon + '<span>Ночь</span>' : ICON.sun + '<span>День</span>') + '</button></div>' +
      '<div><h1 class="hand">Обои для телефона</h1><p class="sub">Герой в своём мире — под размер экрана телефона</p></div>' +
      '<div class="party" role="group" aria-label="Чьи обои">' + HEROES.map(function (t) {
        return '<button class="ava" data-act="wall-pick" data-id="' + t.id + '" aria-label="' + t.name + '" aria-pressed="' + (t.id === ui.wall) + '"' + (t.id === ui.wall ? ' aria-current="true"' : '') + '><img src="' + heroImg(t.id) + '" alt=""></button>';
      }).join('') + '</div>' +
      '<div class="wall-preview"><img id="wallImg" alt="Обои: ' + BY[ui.wall].name + '"><span class="wall-wait">Рисуем…</span></div>' +
      '<button class="btn btn-big btn-violet" data-act="wall-save">Скачать обои</button>' +
      '<p class="sub" style="text-align:center;font-size:12px">Потом: Настройки → Обои → выбрать картинку из галереи</p></div>';
  }
  function wallBlob(id, night, done) {
    var W = 1080, H = 2340, cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    Promise.all([loadImg(worldImg(id)), loadImg(heroSrc(id, night ? 'sleep' : null)), fontsReady()]).then(function (r) {
      var world = r[0], hero = r[1];
      var wh = 1500, ww = 724 * wh / 484, top = H - wh;
      c.drawImage(world, (W - ww) / 2, top, ww, wh);
      var px = c.getImageData(W / 2, top + 4, 1, 1).data, px2 = c.getImageData(30, top + 4, 1, 1).data;
      var sky = c.createLinearGradient(0, 0, 0, top + 6);
      sky.addColorStop(0, 'rgb(' + Math.round((px[0] + px2[0]) / 2) + ',' + Math.round((px[1] + px2[1]) / 2) + ',' + Math.round((px[2] + px2[2]) / 2) + ')');
      sky.addColorStop(1, 'rgb(' + px[0] + ',' + px[1] + ',' + px[2] + ')');
      c.fillStyle = sky; c.fillRect(0, 0, W, top + 6);
      if (night) {
        c.fillStyle = 'rgba(22,26,70,.55)'; c.fillRect(0, 0, W, H);
        var rnd = seeded(7);
        c.fillStyle = '#FFF6C8';
        for (var i = 0; i < 60; i++) { c.beginPath(); c.arc(rnd() * W, rnd() * (top + 300), 2 + rnd() * 4, 0, Math.PI * 2); c.fill(); }
        c.beginPath(); c.arc(820, 300, 90, 0, Math.PI * 2); c.fill();
        c.fillStyle = 'rgba(22,26,70,.85)'; c.beginPath(); c.arc(780, 270, 80, 0, Math.PI * 2); c.fill();
      }
      c.drawImage(hero, (W - 640) / 2, H - 1152 - 150, 640, 1152);
      c.textAlign = 'center'; c.font = '700 54px Caveat, cursive'; c.fillStyle = night ? 'rgba(255,255,255,.75)' : 'rgba(43,34,51,.55)';
      c.fillText('Мир героев', W / 2, H - 70);
      cv.toBlob(function (b) { done(b); }, 'image/png');
    }, function () { done(null); });
  }
  function mountWallpapers() {
    var img = document.getElementById('wallImg');
    if (!img) return;
    wallBlob(ui.wall, ui.wallNight, function (b) {
      if (!b || !document.body.contains(img)) return;
      if (wallUrl) URL.revokeObjectURL(wallUrl);
      wallUrl = URL.createObjectURL(b);
      img.src = wallUrl; img.parentNode.classList.add('ready');
    });
  }

  /* ---------- «Рисуй как я» и челлендж ---------- */

  var LS = 'stroke="#2B2233" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';
  var LESSON_PARTS = [
    '<rect x="72" y="160" width="56" height="78" rx="8" fill="#C3A2F2" ' + LS + '/><rect x="56" y="164" width="16" height="62" rx="8" fill="#FFE6D6" ' + LS + '/><rect x="128" y="164" width="16" height="62" rx="8" fill="#FFE6D6" ' + LS + '/>',
    '<circle cx="100" cy="96" r="62" fill="#FFF0E6" ' + LS + '/>',
    '<circle cx="73" cy="104" r="25" fill="#fff" stroke="#2B2233" stroke-width="7"/><circle cx="127" cy="104" r="25" fill="#fff" stroke="#2B2233" stroke-width="7"/>',
    '<circle cx="75" cy="107" r="18" fill="#7FB0E0" stroke="#2B2233" stroke-width="2.5"/><circle cx="125" cy="107" r="18" fill="#7FB0E0" stroke="#2B2233" stroke-width="2.5"/><circle cx="75" cy="109" r="11" fill="#24384A"/><circle cx="125" cy="109" r="11" fill="#24384A"/>',
    '<circle cx="81" cy="100" r="5.5" fill="#fff"/><circle cx="131" cy="100" r="5.5" fill="#fff"/><circle cx="70" cy="114" r="2.8" fill="#fff"/><circle cx="120" cy="114" r="2.8" fill="#fff"/>',
    '<ellipse cx="62" cy="134" rx="12" ry="7" fill="#FF9DB5" opacity=".8"/><ellipse cx="138" cy="134" rx="12" ry="7" fill="#FF9DB5" opacity=".8"/><path d="M92 138 Q100 146 108 138" fill="none" ' + LS + ' stroke-width="4"/>',
    '<path d="M38 100 C34 50 70 30 100 30 C132 30 168 52 162 100 C152 82 138 74 124 72 C118 82 108 86 98 86 C96 76 90 70 82 66 C72 78 54 86 38 100 Z" fill="#9A6440" ' + LS + '/><path d="M40 98 C36 140 38 170 44 200 L58 200 C54 160 56 128 62 104 Z M160 98 C164 140 162 170 156 200 L142 200 C146 160 144 128 138 104 Z" fill="#9A6440" ' + LS + '/>'
  ];
  // Порядок слоёв: тело, голова, волосы, а глаза и лицо — поверх, как у героев
  var LESSON_Z = [0, 1, 6, 2, 3, 4, 5];
  // TODO(автор): тексты шагов — черновик; лучше заменить её словами и её рисунками
  var LESSON_STEPS = [
    ['Тело — простой прямоугольник', 'Нарисуй прямоугольник, а по бокам — руки-палочки, прижатые к телу. Поза у всех героев одна.'],
    ['Большая круглая голова', 'Голова почти шире тела — так герои выглядят милее.'],
    ['Огромные круглые глаза', 'Два больших круга почти на пол-лица. Обведи их толстым чёрным контуром — это главная «подпись» стиля.'],
    ['Радужка и зрачок', 'Внутри — цветной круг и тёмный зрачок. Сдвинь их чуть к носу.'],
    ['Блики', 'Один большой белый блик сверху и маленький снизу — глаза сразу заблестят.'],
    ['Румянец и рот', 'Розовые овалы на щеках и маленький рот. Рот меняет эмоцию: улыбка, «о», «ω».'],
    ['Волосы', 'Волосы делают героя непохожим на других: чёлка, хохолок, ушки, цвет. Придумай свои!']
  ];
  function lessonSvg(step) {
    var out = '';
    LESSON_Z.forEach(function (pi) {
      if (pi > step) return;
      out += '<g' + (pi === step ? ' class="new"' : ' opacity="' + (step === LESSON_PARTS.length - 1 ? 1 : 0.45) + '"') + '>' + LESSON_PARTS[pi] + '</g>';
    });
    return '<svg viewBox="20 20 160 230" aria-hidden="true">' + out + '</svg>';
  }
  function renderDraw() {
    var pencil = holidayNow() === 'school' && !has('special', 'pencil');
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/more') + '</div>' +
      '<div><h1 class="hand">Рисуй как я</h1><p class="sub">Семь шагов — и у тебя свой герой в стиле Мира героев. Новое на каждом шаге — ярким.</p></div>' +
      '<div class="lessons">' + LESSON_STEPS.map(function (st, i) {
        return '<div class="card lesson"><div class="lesson-pic">' + lessonSvg(i) + '</div><div><div class="label">Шаг ' + (i + 1) + '</div><div class="hand" style="font-size:26px;line-height:1">' + esc(st[0]) + '</div><div style="font-size:14px;font-weight:700;line-height:1.35;margin-top:4px">' + esc(st[1]) + '</div></div></div>';
      }).join('') + '</div>' +
      '<button class="btn btn-big btn-yellow" data-act="template">Скачать шаблон для рисования</button>' +
      '<div class="card card-shadow" style="background:var(--lav)"><div class="hand" style="font-size:30px;line-height:1">Челлендж: нарисуй своего героя</div>' +
      '<div style="font-size:15px;font-weight:700;line-height:1.4;margin-top:6px">Придумай героя в этом стиле: имя, характер, особенность и мир, который он видит своими глазами. Покажи рисунок взрослому, который ведёт страницы сайта, — самые интересные с твоего разрешения могут появиться здесь. Своё имя и фото присылать не нужно.</div></div>' +
      (pencil ? findBtn('item', itemImg('pencil'), 'Чей-то карандаш', 'position:fixed;right:14px;bottom:calc(var(--nav-h) + 70px);width:40px;height:40px;padding:5px;transform:rotate(20deg)') : '') +
      '</div>';
  }
  function templateBlob(done) {
    var W = 1240, H = 1754, cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    var c = cv.getContext('2d');
    fontsReady().then(function () {
      c.fillStyle = '#fff'; c.fillRect(0, 0, W, H);
      c.fillStyle = INK; c.textAlign = 'center'; c.font = '700 84px Caveat, cursive';
      c.fillText('Мой герой', W / 2, 120);
      c.strokeStyle = '#C9C2D3'; c.lineWidth = 5; c.setLineDash([18, 14]);
      c.beginPath(); c.arc(440, 470, 230, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.arc(352, 500, 84, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.arc(528, 500, 84, 0, Math.PI * 2); c.stroke();
      c.strokeRect(330, 730, 220, 330);
      c.strokeRect(270, 745, 60, 260); c.strokeRect(550, 745, 60, 260);
      c.strokeRect(345, 1060, 75, 170); c.strokeRect(460, 1060, 75, 170);
      c.setLineDash([]);
      c.textAlign = 'left'; c.fillStyle = INK;
      [['Имя героя', 300], ['Характер', 470], ['Особенность', 680], ['Его мир', 890]].forEach(function (f) {
        c.font = '900 34px Nunito, sans-serif'; c.fillText(f[0], 760, f[1]);
        c.strokeStyle = '#2B2233'; c.lineWidth = 3;
        for (var l = 0; l < 2; l++) { c.beginPath(); c.moveTo(760, f[1] + 70 + l * 70); c.lineTo(1160, f[1] + 70 + l * 70); c.stroke(); }
      });
      c.font = '800 30px Nunito, sans-serif'; c.fillStyle = '#8C8298';
      wrapText(c, 'Подсказка: огромные круглые глаза в толстом чёрном контуре, блики, румянец, прямоугольное тело. Характер — в волосах, глазах и одежде.', 120, 1350, 1000, 44);
      c.textAlign = 'center'; c.font = '700 48px Caveat, cursive'; c.fillStyle = '#8C8298';
      c.fillText('Мир героев · Рисуй как я', W / 2, H - 70);
      cv.toBlob(function (b) { done(b); }, 'image/png');
    });
  }

  /* ---------- Стикерпак для Telegram и WhatsApp ---------- */

  // Мини-архиватор ZIP (без сжатия: PNG и так сжаты) — архив собирается прямо в браузере
  var CRC_T = null;
  function crc32(b) {
    if (!CRC_T) { CRC_T = []; for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; CRC_T[n] = c >>> 0; } }
    var crc = 0xFFFFFFFF;
    for (var i = 0; i < b.length; i++) crc = CRC_T[(crc ^ b[i]) & 255] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function zipBlob(files) {
    var parts = [], central = [], offset = 0;
    function head(sig, size) { var v = new DataView(new ArrayBuffer(size)); v.setUint32(0, sig, true); return v; }
    files.forEach(function (f) {
      var name = new TextEncoder().encode(f.name), crc = crc32(f.data), len = f.data.length;
      var h = head(0x04034b50, 30);
      h.setUint16(4, 20, true); h.setUint16(8, 0, true); h.setUint32(14, crc, true); h.setUint32(18, len, true); h.setUint32(22, len, true); h.setUint16(26, name.length, true);
      parts.push(h, name, f.data);
      var c = head(0x02014b50, 46);
      c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint32(16, crc, true); c.setUint32(20, len, true); c.setUint32(24, len, true); c.setUint16(28, name.length, true); c.setUint32(42, offset, true);
      central.push(c, name);
      offset += 30 + name.length + len;
    });
    var size = central.reduce(function (a, x) { return a + (x.byteLength || x.length); }, 0);
    var e = head(0x06054b50, 22);
    e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, size, true); e.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [e]), { type: 'application/zip' });
  }
  function packZip(done) {
    var jobs = [];
    HEROES.forEach(function (h) { EMOTIONS.forEach(function (e) { jobs.push([h.id, e.id]); }); });
    var files = [];
    (function next(i) {
      if (i >= jobs.length) { done(zipBlob(files)); return; }
      stickerBlob(jobs[i][0], jobs[i][1], function (b) {
        if (!b) { done(null); return; }
        b.arrayBuffer().then(function (buf) { files.push({ name: jobs[i][0] + '-' + jobs[i][1] + '.png', data: new Uint8Array(buf) }); next(i + 1); }, function () { done(null); });
      });
    })(0);
  }
  function renderPack() {
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
      '<div class="topbar">' + backBtn('#/more') + '</div>' +
      '<div><h1 class="hand">Стикерпак</h1><p class="sub">30 стикеров: пять героев и шесть эмоций. Скачай архив и сделай из него набор для мессенджера.</p></div>' +
      '<div class="pack-grid">' + HEROES.map(function (h) {
        return EMOTIONS.map(function (e) { return stickerHtml(h.id, e.id); }).join('');
      }).join('') + '</div>' +
      '<button class="btn btn-big btn-violet" data-act="pack-zip">Скачать все стикеры (ZIP)</button>' +
      '<div class="card"><div class="hand" style="font-size:26px">Telegram</div><ol class="steps"><li>Открой бота <b>@Stickers</b> и отправь <b>/newpack</b>.</li><li>Придумай название набора.</li><li>Отправляй картинки из архива по одной <b>как файл</b> и к каждой — подходящий эмодзи.</li><li>В конце — <b>/publish</b> и короткое имя для ссылки.</li></ol></div>' +
      '<div class="card"><div class="hand" style="font-size:26px">WhatsApp</div><ol class="steps"><li>Поставь приложение для своих стикеров (например, «Sticker Maker»).</li><li>Создай набор и добавь картинки из архива (нужно от 3 штук).</li><li>Нажми «Добавить в WhatsApp».</li></ol></div>' +
      '<p class="sub" style="text-align:center;font-size:12px">Набор лучше создавать взрослому со своего аккаунта.</p></div>';
  }

  /* ---------- Приложение на экране телефона (PWA) ---------- */

  if ('serviceWorker' in navigator && !inArtifact() && location.protocol === 'https:') {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  /* ---------- Игра «Угадай по глазам» ---------- */

  var EYES_ROUNDS = 8;
  ui.eyes = null;
  function eyesNew() {
    var used = {}, rounds = [];
    while (rounds.length < EYES_ROUNDS) {
      var h = HEROES[Math.floor(Math.random() * HEROES.length)].id, e = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)].id;
      if (used[h + e]) continue;
      used[h + e] = 1; rounds.push([h, e]);
    }
    ui.eyes = { rounds: rounds, i: 0, score: 0, step: 'who', who: null, emo: null };
  }
  function renderEyes() {
    if (!ui.eyes) eyesNew();
    var g = ui.eyes, best = get('eyesBest', 0);
    var head = '<div class="topbar">' + backBtn('#/more') + '<div class="pill" style="background:var(--lav)">Очки: ' + g.score + '</div></div>';
    if (g.i >= EYES_ROUNDS) {
      return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h));text-align:center;align-items:center">' + head +
        '<h1 class="hand">Глаза угаданы!</h1><div class="card card-shadow" style="font-size:20px;font-weight:900">' + g.score + ' из ' + EYES_ROUNDS * 2 + ' очков' +
        '<div style="font-size:14px;font-weight:700;color:var(--muted);margin-top:4px">Рекорд: ' + best + '</div></div>' +
        '<div class="eyes-row">' + HEROES.map(function (h) { return stickerHtml(h.id, 'joy'); }).join('') + '</div>' +
        '<button class="btn btn-big btn-violet" data-act="eyes-again">Играть ещё</button></div>';
    }
    var cur = g.rounds[g.i], reveal = g.step === 'reveal';
    var body;
    if (g.step === 'who') {
      body = '<div class="label" style="text-align:center">Чьи это глаза?</div><div class="party" role="group" aria-label="Чьи глаза">' + HEROES.map(function (h) {
        return '<button class="ava" data-act="eyes-who" data-id="' + h.id + '" aria-label="' + h.name + '"><img src="' + heroImg(h.id) + '" alt=""></button>';
      }).join('') + '</div>';
    } else if (g.step === 'emo') {
      body = '<div class="label" style="text-align:center">' + BY[g.who].name + '? А какое настроение?</div><div class="eyes-emo">' + EMOTIONS.map(function (e) {
        return '<button class="btn" data-act="eyes-emo" data-id="' + e.id + '">' + e.name + '</button>';
      }).join('') + '</div>';
    } else {
      var okW = g.who === cur[0], okE = g.emo === cur[1];
      body = '<div class="card" style="text-align:center;font-weight:900;background:' + (okW && okE ? '#E3F6E0' : okW || okE ? '#FFF3C4' : '#FFE3E3') + '">' +
        (okW && okE ? 'Точно! +2' : okW || okE ? 'Почти! +1' : 'Мимо!') +
        '<div style="font-weight:700;font-size:14px;margin-top:2px">Это ' + BY[cur[0]].name + ', ' + EMOTIONS.filter(function (e) { return e.id === cur[1]; })[0].name.toLowerCase() + '</div></div>' +
        '<button class="btn btn-big btn-violet" data-act="eyes-next">' + (g.i + 1 >= EYES_ROUNDS ? 'Итог' : 'Дальше') + '</button>';
    }
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' + head +
      '<div><h1 class="hand">Угадай по глазам</h1><p class="sub">Раунд ' + (g.i + 1) + ' из ' + EYES_ROUNDS + '. Видны только глаза — узнай героя и его настроение.</p></div>' +
      '<div class="eyes-peek' + (reveal ? ' open' : '') + '" style="background:' + (reveal ? BY[cur[0]].sky : '#fff') + '">' + emoImg(cur[0], cur[1], '', true) + '</div>' +
      body + '</div>';
  }

  /* ---------- Игра «Больница для героев» ---------- */

  var INK2 = 'stroke="#2B2233" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  var TOOLS = [
    { id: 'ice', name: 'Лёд', svg: '<rect x="7" y="9" width="26" height="24" rx="6" fill="#CFEFFF" ' + INK2 + '/><path d="M12 15 h7 M12 20 h3" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' },
    { id: 'plaster', name: 'Пластырь', svg: '<g transform="rotate(-35 20 20)"><rect x="3" y="13" width="34" height="14" rx="7" fill="#F7D3B0" ' + INK2 + '/><rect x="14" y="13" width="12" height="14" fill="#EDB98E"/><circle cx="17" cy="18" r="1.2" fill="#2B2233"/><circle cx="23" cy="18" r="1.2" fill="#2B2233"/><circle cx="20" cy="23" r="1.2" fill="#2B2233"/></g>' },
    { id: 'blanket', name: 'Плед', svg: '<path d="M5 11 h30 v17 q-15 7 -30 0z" fill="#FF9DB5" ' + INK2 + '/><path d="M5 17 h30 M5 22 h30" stroke="#fff" stroke-width="2.2"/>' },
    { id: 'cat', name: 'Кошка Ланы', svg: '<path d="M9 15 l2 -9 l7 6 h4 l7 -6 l2 9 q4 16 -11 18 q-15 -2 -11 -18z" fill="#D9C8F2" ' + INK2 + '/><circle cx="16" cy="20" r="2" fill="#2B2233"/><circle cx="24" cy="20" r="2" fill="#2B2233"/><path d="M18 25 q2 2 4 0" fill="none" stroke="#2B2233" stroke-width="1.8" stroke-linecap="round"/>' },
    { id: 'tea', name: 'Чай Лизы', svg: '<path d="M7 16 h22 q-1 15 -11 16 q-10 -1 -11 -16z" fill="#fff" ' + INK2 + '/><path d="M29 19 q6 0 5 6 q-1 4 -6 4" fill="none" ' + INK2 + '/><ellipse cx="18" cy="16" rx="11" ry="2.6" fill="#C98A4E" stroke="#2B2233" stroke-width="2"/><path d="M14 10 q-2 -3 0 -6 M20 10 q-2 -3 0 -6" stroke="#B9A3E8" stroke-width="2" fill="none" stroke-linecap="round"/>' }
  ];
  var SYMPTOMS = {
    bump: { name: 'Шишка', tool: 'ice', svg: '<ellipse cx="284" cy="116" rx="24" ry="18" fill="#FF9DB5" stroke="#2B2233" stroke-width="4"/><ellipse cx="277" cy="109" rx="8" ry="5" fill="#fff" opacity=".85"/><path d="M312 88 l12 -12 M318 106 l17 -3 M298 78 l3 -16" stroke="#2B2233" stroke-width="4" stroke-linecap="round"/>' },
    burn: { name: 'Ожог', tool: 'ice', svg: '<ellipse cx="272" cy="508" rx="15" ry="26" fill="#FF7A45" opacity=".8"/><path d="M296 470 q-6 -10 0 -20 q6 -10 0 -20 M310 480 q-6 -10 0 -20" fill="none" stroke="#FF7A45" stroke-width="4" stroke-linecap="round"/>' },
    scratch: { name: 'Царапина', tool: 'plaster', svg: '<path d="M117 418 l22 -15 M115 436 l24 -15 M117 454 l20 -13" stroke="#E5484D" stroke-width="5.5" stroke-linecap="round"/>' },
    fever: { name: 'Температура', tool: 'blanket', svg: '<ellipse cx="124" cy="284" rx="34" ry="20" fill="#FF5A6E" opacity=".35"/><ellipse cx="276" cy="284" rx="34" ry="20" fill="#FF5A6E" opacity=".35"/><g transform="rotate(48 214 300)"><rect x="207" y="228" width="15" height="74" rx="7.5" fill="#fff" stroke="#2B2233" stroke-width="4"/><rect x="211.5" y="262" width="6" height="34" fill="#E5484D"/><circle cx="214.5" cy="306" r="11" fill="#E5484D" stroke="#2B2233" stroke-width="4"/></g><path d="M318 186 q-9 16 0 24 q9 -8 0 -24z" fill="#8FD3FF" stroke="#2B2233" stroke-width="3" stroke-linejoin="round"/>' },
    sad: { name: 'Грустит', tool: 'cat', svg: '<path d="M146 34 a26 26 0 0 1 42 -22 a30 30 0 0 1 56 6 a22 22 0 0 1 8 42 h-98 a20 20 0 0 1 -8 -26z" fill="#C9D3E3" stroke="#2B2233" stroke-width="4" stroke-linejoin="round"/><path d="M172 74 l-6 16 M202 76 l-6 16 M232 74 l-6 16" stroke="#5AB8FF" stroke-width="4.5" stroke-linecap="round"/>' }
  };
  // TODO(автор): что случилось с героями — черновики
  var CAUSES = {
    ulyana: 'Скатилась во сне с радуги', lana: 'Заигралась с кошками', yoshi: 'Споткнулся о своего кота',
    liza: 'Пила чай на бегу', candy: 'Врезалась во что-то в шапке-невидимке'
  };
  var HOSP_SHIFT = 5;
  ui.hosp = null;
  function hospPatient() {
    var h = ui.hosp, ids = HEROES.map(function (x) { return x.id; }).filter(function (x) { return x !== h.id; });
    h.id = ids[Math.floor(Math.random() * ids.length)];
    var keys = ['bump', 'scratch', 'fever', 'sad', 'burn'], n = 1 + Math.min(2, Math.floor(h.n / 2) + (Math.random() < 0.4 ? 1 : 0));
    h.sym = [];
    while (h.sym.length < n) { var k = keys[Math.floor(Math.random() * keys.length)]; if (h.sym.indexOf(k) < 0) h.sym.push(k); }
    h.thanks = false;
  }
  function hospNew() { ui.hosp = { n: 0, id: null, sym: [], mistakes: 0, thanks: false }; hospPatient(); }
  function renderHospital() {
    if (!ui.hosp) hospNew();
    var h = ui.hosp, p = BY[h.id];
    var head = '<div class="topbar">' + backBtn('#/more') + '<div class="pill" style="background:#E3F6E0">Вылечено: ' + get('hospitalCured', 0) + '</div></div>';
    if (h.n >= HOSP_SHIFT) {
      var stars = h.mistakes === 0 ? 3 : h.mistakes <= 2 ? 2 : 1;
      return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h));align-items:center;text-align:center">' + head +
        '<h1 class="hand">Смена окончена!</h1><div style="display:flex;gap:6px">' + [0, 1, 2].map(function (i) { return ICON.star(44, i < stars ? '#FFC94D' : '#FFFFFF'); }).join('') + '</div>' +
        '<p class="card" style="margin:0;font-weight:800">Ты вылечил ' + HOSP_SHIFT + ' героев' + (h.mistakes ? ', ошибок: ' + h.mistakes : ' без единой ошибки!') + '</p>' +
        '<div class="eyes-row">' + HEROES.map(function (x) { return stickerHtml(x.id, 'love'); }).join('') + '</div>' +
        '<button class="btn btn-big btn-violet" data-act="hosp-again">Новая смена</button></div>';
    }
    var ov = '<svg class="sym-ov" aria-hidden="true" viewBox="0 0 400 720">' + h.sym.map(function (s) { return SYMPTOMS[s].svg; }).join('') + '</svg>';
    var fig = heroFigure(h.id, 'hosp-fig', '', h.sym.length ? 'sad' : 'joy');
    fig = fig.slice(0, fig.lastIndexOf('</span>')) + ov + '</span>';
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' + head +
      '<div><h1 class="hand">Больница для героев</h1><p class="sub">Пациент ' + (h.n + 1) + ' из ' + HOSP_SHIFT + '. Выбери, чем лечить. Чай Лизы — как повезёт!</p></div>' +
      '<div class="hosp-room">' + fig + '<div class="hosp-bed" aria-hidden="true"></div></div>' +
      '<div class="card" style="margin:0"><b>' + p.name + ':</b> ' + (h.thanks ? 'Спасибо, доктор! Мне уже хорошо!' : esc(CAUSES[h.id]) + '. ' +
        '<span class="sym-list">' + h.sym.map(function (s) { return '<span class="chip">' + SYMPTOMS[s].name + '</span>'; }).join(' ') + '</span>') + '</div>' +
      (h.thanks ? '<button class="btn btn-big btn-violet" data-act="hosp-next">' + (h.n + 1 >= HOSP_SHIFT ? 'Закончить смену' : 'Следующий пациент') + '</button>' :
        '<div class="tools">' + TOOLS.map(function (t) {
          return '<button class="tool" data-act="hosp-tool" data-id="' + t.id + '"><svg viewBox="0 0 40 40" aria-hidden="true">' + t.svg + '</svg><span>' + t.name + '</span></button>';
        }).join('') + '</div>') +
      '</div>';
  }
  function hospTool(tool) {
    var h = ui.hosp;
    if (h.thanks) return;
    if (tool === 'tea') {
      if (Math.random() < 0.5) { h.sym = []; beep('tea'); finishHosp('Чай лечебный! Всё прошло!'); }
      else {
        if (h.sym.indexOf('burn') < 0) h.sym.push('burn'); else if (h.sym.indexOf('sad') < 0) h.sym.push('sad');
        beep('sorry'); route(); react('angry', 'Ай! Чай коварный!', 1500);
      }
      return;
    }
    var i = -1;
    h.sym.forEach(function (s, k) { if (i < 0 && SYMPTOMS[s].tool === tool) i = k; });
    if (i < 0) { h.mistakes++; beep('sorry'); react('angry', 'Ой! Это не поможет', 1300); return; }
    h.sym.splice(i, 1); beep('item');
    if (!h.sym.length) finishHosp(); else { route(); react('wow', 'Уже лучше!', 1200); }
  }
  function finishHosp(say) {
    var h = ui.hosp;
    h.thanks = true; set('hospitalCured', get('hospitalCured', 0) + 1);
    route(); react('joy', say || 'Спасибо, доктор!', 2200); beep('hint');
  }

  /* ---------- Игра «Кто взял печеньку?» — новое дело каждый день ---------- */

  var SUSPECTS = ['ulyana', 'lana', 'yoshi', 'candy'];
  // Улики построены на том, как герои нарисованы: крылья, ушки, цвет глаз, длина волос, кошки, капюшон
  var CLUES = [
    { set: ['ulyana'], yes: 'Возле тарелки лежит пёрышко — у того, кто взял печеньку, есть крылья.', no: 'Ни одного пёрышка — у того, кто взял, крыльев нет.' },
    { set: ['lana', 'candy'], yes: 'На стене осталась тень с кошачьими ушками.', no: 'Тень на стене была без ушек.' },
    { set: ['yoshi'], yes: 'Кошка-свидетель видела голубые глаза.', no: 'Кошка-свидетель уверена: глаза были не голубые.' },
    { set: ['ulyana', 'lana', 'candy'], yes: 'На блюдце — длинный волос.', no: 'Длинных волос нет — у того, кто взял, короткая стрижка.' },
    { set: ['yoshi', 'lana'], yes: 'Повсюду кошачьи следы — рядом с тем, кто взял, была кошка.', no: 'Кошачьих следов нет — кошки тут ни при чём.' },
    { set: ['candy'], yes: 'За стул зацепилась ниточка от белого капюшона.', no: 'Тот, кто взял, был без капюшона.' }
  ];
  var CLUE_SPOTS = ['left:22%;top:28%', 'left:58%;top:58%', 'left:34%;top:68%', 'left:66%;top:24%', 'left:14%;top:52%'];
  // TODO(автор): что говорит тот, кто взял печеньку, — черновики
  var CONFESS = {
    ulyana: 'Это я… Я спала на радуге, проснулась голодная!', lana: 'Это я… Кошки попросили, а я не смогла отказать :3',
    yoshi: 'Прости, пожалуйста! Это я. Ну очень вкусно пахло…', candy: 'Ну я… Была в шапке и думала, никто не заметит!'
  };
  function caseToday() {
    var d = dayNumber(), r = seeded(d * 13 + 5);
    var culprit = SUSPECTS[Math.floor(r() * SUSPECTS.length)];
    var stmts = [];
    CLUES.forEach(function (c, i) {
      var has1 = c.set.indexOf(culprit) >= 0;
      var keep = SUSPECTS.filter(function (s) { return (c.set.indexOf(s) >= 0) === has1; });
      if (keep.length >= 2) stmts.push({ i: i, yes: has1, keep: keep });
    });
    var pick = null;
    for (var t = 0; t < 300 && !pick; t++) {
      var a = stmts.slice().sort(function () { return r() - 0.5; }).slice(0, 3);
      if (a.length < 3) break;
      var left = SUSPECTS.filter(function (s) { return a.every(function (st) { return st.keep.indexOf(s) >= 0; }); });
      if (left.length === 1) pick = a;
    }
    if (!pick) pick = stmts.slice(0, 3);
    var worlds = HEROES.map(function (h) { return h.id; }).sort(function () { return r() - 0.5; }).slice(0, 3);
    return {
      d: d, culprit: culprit,
      clues: pick.map(function (st, k) { var c = CLUES[st.i]; return { text: st.yes ? c.yes : c.no, world: worlds[k], spot: CLUE_SPOTS[Math.floor(r() * CLUE_SPOTS.length)] }; })
    };
  }
  function caseState() {
    var st = get('case', null);
    if (!st || st.d !== dayNumber()) st = { d: dayNumber(), found: [], tries: [], solved: false };
    return st;
  }
  var CLUE_ICON = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="6" y="5" width="22" height="28" rx="3" fill="#FFF8E1" stroke="#2B2233" stroke-width="2.5" transform="rotate(-8 17 19)"/><path d="M11 13 h12 M11 18 h9" stroke="#B9A3E8" stroke-width="2.5" stroke-linecap="round" transform="rotate(-8 17 19)"/><circle cx="25" cy="25" r="7" fill="#DDEFFF" stroke="#2B2233" stroke-width="2.5"/><path d="M30 30 l6 6" stroke="#2B2233" stroke-width="3.5" stroke-linecap="round"/></svg>';
  function clueFind(worldId) {
    var st = caseState();
    if (st.solved) return '';
    var cs = caseToday();
    return cs.clues.map(function (c, k) {
      if (c.world !== worldId || st.found.indexOf(k) >= 0) return '';
      return '<button class="find clue" data-act="clue" data-id="' + k + '" aria-label="Улика!" style="' + c.spot + ';width:44px;height:44px;padding:4px">' + CLUE_ICON + '</button>';
    }).join('');
  }
  function renderCase() {
    var cs = caseToday(), st = caseState(), liza = BY.liza;
    var streak = get('caseStreak', { last: null, n: 0 });
    var head = '<div class="topbar">' + backBtn('#/more') + '<div class="pill" style="background:#FFE9D4">Дело №' + (cs.d % 1000) + '</div></div>';
    var stars = Math.max(1, 3 - st.tries.filter(function (t) { return t !== cs.culprit; }).length);
    return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' + head +
      '<div><h1 class="hand">Кто взял печеньку?</h1><p class="sub">Каждый день новое дело — одинаковое у всех. Улики спрятаны в мирах героев.</p></div>' +
      '<div class="card card-shadow" style="display:flex;gap:12px;align-items:center;background:' + liza.sky + '">' + stickerHtml('liza', st.solved ? 'joy' : 'sad').replace('class="sticker-face"', 'class="sticker-face" style="width:72px;flex-shrink:0"') +
      '<div style="font-weight:800;line-height:1.35"><b>Лиза:</b> ' + (st.solved ? 'Дело раскрыто! Спасибо, сыщик!' : 'Кто-то взял мою печеньку! Помоги найти, кто это.') + '</div></div>' +
      '<div><h2 class="hand">Улики ' + st.found.length + '/3</h2><div class="clues">' + cs.clues.map(function (c, k) {
        var got = st.found.indexOf(k) >= 0;
        return '<div class="card clue-card' + (got ? '' : ' missing') + '">' + CLUE_ICON + '<div>' + (got ? esc(c.text) : 'Спрятана в мире ' + BY[c.world].of + '. <a href="#/world/' + c.world + '">Посмотреть его глазами</a>') + '</div></div>';
      }).join('') + '</div></div>' +
      (st.solved ?
        '<div class="card card-shadow" style="display:flex;gap:12px;align-items:center;background:' + BY[cs.culprit].sky + '">' + stickerHtml(cs.culprit, 'sad').replace('class="sticker-face"', 'class="sticker-face" style="width:72px;flex-shrink:0"') +
        '<div><div style="font-weight:800;line-height:1.35"><b>' + BY[cs.culprit].name + ':</b> ' + esc(CONFESS[cs.culprit]) + '</div><div style="display:flex;gap:4px;margin-top:6px;align-items:center">' + [0, 1, 2].map(function (i) { return ICON.star(24, i < stars ? '#FFC94D' : '#FFFFFF'); }).join('') +
        '<span style="font-size:13px;font-weight:800;margin-left:6px">Серия: ' + streak.n + ' дн.</span></div></div></div><p class="sub" style="text-align:center">Завтра — новое дело!</p>' :
        '<div><h2 class="hand">Кто это сделал?</h2><p class="sub" style="font-size:13px">Нажми на подозреваемого. Чем меньше ошибок, тем больше звёзд.</p></div>' +
        '<div class="suspects">' + SUSPECTS.map(function (s) {
          var tried = st.tries.indexOf(s) >= 0;
          return '<button class="suspect' + (tried ? ' no' : '') + '" data-act="accuse" data-id="' + s + '"' + (tried ? ' disabled' : '') + '>' + stickerHtml(s, tried ? 'angry' : null) + '<span>' + BY[s].name + '</span></button>';
        }).join('') + '</div>') +
      '</div>';
  }
  function accuse(id) {
    var cs = caseToday(), st = caseState();
    if (st.solved || st.tries.indexOf(id) >= 0) return;
    st.tries.push(id);
    if (id === cs.culprit) {
      st.solved = true;
      var sk = get('caseStreak', { last: null, n: 0 });
      set('caseStreak', { last: cs.d, n: sk.last === cs.d - 1 ? sk.n + 1 : sk.last === cs.d ? sk.n : 1 });
      set('case', st); beep('hint'); route();
      toast('Дело раскрыто!', 'Печеньку взял' + (id === 'yoshi' ? '' : 'а') + ' ' + BY[id].name, [id, 'sad']);
    } else {
      set('case', st); beep('sorry'); route();
      toast(BY[id].name + ': «Это не я!»', 'Поищи ещё улики', [id, 'angry']);
    }
  }

  /* ---------- Башня (как Tower of Hell): этажи в цветах героев ---------- */

  var TW = 360, SEC = 1000, NSEC = 6;
  var TOWER_COL = {
    ulyana: ['#FF5A6E', '#FFB347', '#FFE066', '#7ED957', '#5AB8FF', '#B48CF0'],
    lana: ['#C3A2F2', '#E07BC0', '#9B6FE0', '#F1EAFF'],
    yoshi: ['#FFD84A', '#9C6FE0', '#FFE98A'],
    liza: ['#B07A52', '#C3A2F2', '#E8B98A', '#FF8FA8'],
    candy: ['#5FD3C4', '#F5646C', '#FF9DB5', '#FFFFFF']
  };
  ui.tower = { hero: null };
  function buildTower(seed) {
    var r = seeded(seed), plats = [];
    var order = HEROES.map(function (h) { return h.id; }).sort(function () { return r() - 0.5; });
    for (var s = 0; s < NSEC; s++) {
      var hid = order[s % order.length], base = -s * SEC, cols = TOWER_COL[hid], diff = s / (NSEC - 1), x = 180;
      plats.push({ x: 0, y: base, w: TW, h: 18, type: 'floor', sec: s, hero: hid, col: cols[0] });
      for (var k = 1; k <= 10; k++) {
        var y = base - k * 90 - Math.round((r() - 0.5) * 10);
        var w = Math.round(108 - diff * 40 - r() * 18);
        var dx = (55 + r() * 85) * (r() < 0.5 ? -1 : 1), nx = x + dx;
        if (nx < w / 2 + 8 || nx > TW - w / 2 - 8) nx = x - dx;
        x = Math.max(w / 2 + 8, Math.min(TW - w / 2 - 8, nx));
        var p = { x: x - w / 2, y: y, w: w, h: 14, type: 'plain', col: cols[k % cols.length], sec: s };
        var roll = r();
        if (k === 10) { /* последний ряд перед следующим этажом — спокойный */ }
        else if (s >= 1 && roll < 0.1 + diff * 0.12) { p.type = 'move'; p.ox = p.x; p.amp = 35 + r() * 45; p.sp = 0.02 + r() * 0.015 + diff * 0.012; p.ph = r() * 6; }
        else if (s >= 2 && roll < 0.24 + diff * 0.1) { p.type = 'cloud'; }
        else if (roll < 0.36 + diff * 0.12) { p.type = 'hot'; p.w = Math.max(p.w, 96); p.x = Math.max(8, Math.min(TW - 8 - p.w, x - p.w / 2)); p.hotLeft = r() < 0.5; }
        else if (roll < 0.44) { p.type = 'bounce'; p.w = 56; p.x = Math.max(8, Math.min(TW - 64, x - 28)); }
        plats.push(p);
      }
    }
    plats.push({ x: 0, y: -NSEC * SEC, w: TW, h: 18, type: 'finish', sec: NSEC, col: '#FFC94D' });
    return { plats: plats, order: order };
  }
  function fmtTime(ms) { var s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2) + '.' + Math.floor(ms % 1000 / 100); }
  function renderTower() {
    var best = get('towerBest', null), today = best && best.d === dayNumber() ? best.t : null;
    if (!ui.tower.hero) {
      return '<div class="page paper" style="min-height:calc(100svh - var(--nav-h))">' +
        '<div class="topbar">' + backBtn('#/more') + '</div>' +
        '<div><h1 class="hand">Башня героев</h1><p class="sub">Забирайся на самый верх! Шесть этажей в цветах героев: движущиеся площадки, облачка, которые исчезают, прыгалки и горячий чай Лизы — на него не наступай. Башня меняется каждый день.</p></div>' +
        '<div class="card" style="font-size:14px;font-weight:700;line-height:1.5"><b>На компьютере:</b> ← → (или A и D) — бежать, пробел — прыжок.<br><b>На телефоне:</b> кнопки внизу экрана.</div>' +
        (today ? '<div class="card" style="background:var(--yellow);font-weight:900">Твой рекорд в сегодняшней башне: ' + fmtTime(today) + '</div>' : '') +
        '<h2 class="hand">Кем играть?</h2><div class="tower-pick">' + HEROES.map(function (h) {
          return '<button class="card card-shadow" data-act="tower-hero" data-id="' + h.id + '" style="background:' + h.sky + '">' + stickerHtml(h.id, 'joy') + '<span class="hand" style="font-size:24px">' + h.name + '</span></button>';
        }).join('') + '</div></div>';
    }
    return '<div class="tower-page">' +
      '<div class="tower-hud"><a class="btn" href="#/more" style="height:38px">' + ICON.back + '</a><span class="pill" id="twFloor">Этаж 1/' + NSEC + '</span><span class="pill" id="twTime" style="background:var(--yellow)">0:00.0</span><button class="btn" data-act="tower-change" style="height:38px;font-size:13px">Герой</button></div>' +
      '<div class="tower-wrap"><canvas id="tower" aria-label="Игра «Башня героев»"></canvas>' +
      '<div class="tower-ctrl"><div><button class="tw-btn" data-k="left" aria-label="Влево">' + ICON.left + '</button><button class="tw-btn" data-k="right" aria-label="Вправо">' + ICON.right + '</button></div><button class="tw-btn tw-jump" data-k="jump">Прыжок</button></div>' +
      '<div class="tower-win" id="twWin" hidden></div></div></div>';
  }
  function mountTower() {
    var cv = document.getElementById('tower');
    if (!cv) return;
    var c = cv.getContext('2d'), dpr = window.devicePixelRatio || 1, W, H, sc;
    var heroId = ui.tower.hero, T = buildTower(dayNumber() * 31 + 7), plats = T.plats;
    var faces = {};
    [null, 'joy', 'angry', 'wow'].forEach(function (e) { var im = new Image(); im.src = heroSrc(heroId, e); faces[e || 'base'] = im; });
    var pl, cam, keys = { left: false, right: false, jump: false }, jumpBuf = 0, coyote = 0, ground = null, face = { e: null, t: 0 };
    var t0 = 0, done = false, raf, last = 0, frame = 0, maxSec = 0;
    function reset() { pl = { x: 180, y: 0, vx: 0, vy: 0, sec: 0 }; cam = null; t0 = 0; done = false; maxSec = 0; }
    reset();
    function size() {
      var r = cv.parentNode.getBoundingClientRect();
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; sc = W / TW;
    }
    size();
    function setFace(e, n) { face = { e: e, t: n }; }
    function kill() {
      var fl = plats.filter(function (p) { return p.type === 'floor' && p.sec === pl.sec; })[0];
      pl.x = 180; pl.y = fl ? fl.y : 0; pl.vx = 0; pl.vy = 0; setFace('angry', 50); beep('sorry');
    }
    function step(dt) {
      frame += dt;
      plats.forEach(function (p) {
        if (p.type === 'move') { var nx = p.ox + Math.sin(frame * p.sp + p.ph) * p.amp; p.dx = nx - p.x; p.x = nx; }
        if (p.type === 'cloud' && p.touched != null) {
          var age = frame - p.touched;
          p.gone = age > 40 && age < 160;
          if (age >= 160) p.touched = null;
        }
      });
      if (done) return;
      var ax = (keys.left ? -1 : 0) + (keys.right ? 1 : 0);
      if (ax && !t0) t0 = performance.now();
      pl.vx = ax * 3.4;
      if (ground && ground.type === 'move' && ground.dx) pl.x += ground.dx;
      pl.vy = Math.min(14, pl.vy + 0.55 * dt);
      if (jumpBuf > 0 && coyote > 0) {
        pl.vy = -11.6; pl.jumping = true; coyote = 0; jumpBuf = 0; if (!t0) t0 = performance.now(); beep('pick');
      }
      if (pl.jumping && !keys.jump && pl.vy < -4.5) pl.vy = -4.5;   // короткое нажатие — низкий прыжок
      if (pl.vy >= 0) pl.jumping = false;
      jumpBuf = Math.max(0, jumpBuf - dt); coyote = Math.max(0, coyote - dt);
      var prev = pl.y;
      pl.x = Math.max(16, Math.min(TW - 16, pl.x + pl.vx * dt));
      pl.y += pl.vy * dt;
      ground = null;
      if (pl.vy >= 0) {
        for (var i = 0; i < plats.length; i++) {
          var p = plats[i];
          if (p.gone || prev > p.y + 0.5 || pl.y < p.y || pl.x + 13 < p.x || pl.x - 13 > p.x + p.w) continue;
          pl.y = p.y; pl.vy = 0; ground = p; coyote = 6;
          if (p.type === 'hot') {
            var third = p.w / 3, hx = p.hotLeft ? p.x + third : p.x + p.w - third;
            if (p.hotLeft ? pl.x < hx : pl.x > hx) { kill(); return; }
          }
          if (p.type === 'bounce') { pl.vy = -15.5; pl.jumping = false; ground = null; coyote = 0; setFace('joy', 30); beep('hat'); }
          if (p.type === 'cloud' && p.touched == null) p.touched = frame;
          if (p.type === 'floor' && p.sec > maxSec) { maxSec = p.sec; pl.sec = p.sec; setFace('joy', 60); beep('hint'); }
          if (p.type === 'floor') pl.sec = p.sec;
          if (p.type === 'finish') win();
          break;
        }
      }
      if (pl.y > 0) { pl.y = 0; pl.vy = 0; coyote = 6; pl.sec = 0; }
      if (pl.vy > 10 && face.t <= 0) setFace('wow', 2);
      face.t -= dt;
    }
    function win(teleported) {
      done = true; setFace('joy', 99999);
      var ms = performance.now() - (t0 || performance.now());
      var best = get('towerBest', null), isBest = !teleported && (!best || best.d !== dayNumber() || ms < best.t);
      if (isBest) set('towerBest', { d: dayNumber(), t: ms });
      beep('hint');
      var box = document.getElementById('twWin');
      box.hidden = false;
      box.innerHTML = '<div class="card card-shadow"><div class="hand" style="font-size:40px;line-height:1">Ты на вершине!</div>' +
        '<div style="font-weight:900;font-size:18px;margin-top:6px">' + (teleported ? 'Сладость! Тыква перенесла тебя прямо сюда' : 'Время: ' + fmtTime(ms) + (isBest ? ' — рекорд!' : '')) + '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px"><button class="btn btn-violet" data-act="tower-again">Ещё раз</button><button class="btn" data-act="tower-change">Другой герой</button></div></div>';
    }
    function rr(x, y, w, h, r) { roundRect(c, x, y, w, h, r); }
    function draw() {
      var viewH = H / sc;
      var target = pl.y - viewH * 0.58;
      cam = cam == null ? target : cam + (target - cam) * 0.14;
      cam = Math.min(cam, 150 - viewH);   // пол не уходит под кнопки
      c.setTransform(dpr * sc, 0, 0, dpr * sc, 0, -cam * dpr * sc);
      var secNow = Math.max(0, Math.min(NSEC - 1, Math.floor(-(cam + viewH / 2) / SEC)));
      c.fillStyle = BY[T.order[secNow % T.order.length]].sky; c.fillRect(0, cam, TW, viewH);
      c.strokeStyle = 'rgba(43,34,51,.06)'; c.lineWidth = 1;
      for (var gy = Math.floor(cam / 30) * 30; gy < cam + viewH; gy += 30) { c.beginPath(); c.moveTo(0, gy); c.lineTo(TW, gy); c.stroke(); }
      for (var gx = 0; gx < TW; gx += 30) { c.beginPath(); c.moveTo(gx, cam); c.lineTo(gx, cam + viewH); c.stroke(); }
      plats.forEach(function (p) {
        if (p.y < cam - 40 || p.y > cam + viewH + 40) return;
        c.lineWidth = 2.5; c.strokeStyle = INK;
        if (p.type === 'floor' || p.type === 'finish') {
          c.fillStyle = p.col; rr(p.x - 4, p.y, p.w + 8, p.h, 6); c.fill(); c.stroke();
          c.fillStyle = INK; c.font = '700 44px Caveat, cursive'; c.textAlign = 'center';
          c.globalAlpha = 0.3; c.fillText(p.type === 'finish' ? 'Вершина!' : 'Этаж ' + (p.sec + 1) + ': ' + BY[p.hero].name, TW / 2, p.y - 130); c.globalAlpha = 1;
          if (p.type === 'finish') { c.font = '700 34px Caveat, cursive'; c.fillText('★  ★  ★', TW / 2, p.y - 20); }
          return;
        }
        if (p.gone) { c.globalAlpha = 0.18; }
        else if (p.type === 'cloud' && p.touched != null) { c.globalAlpha = 0.5 + 0.5 * Math.abs(Math.sin(frame / 3)); }
        c.fillStyle = p.type === 'cloud' ? '#FFFFFF' : p.col;
        rr(p.x, p.y, p.w, p.h, 7); c.fill(); c.stroke();
        if (p.type === 'hot') {
          var third = p.w / 3, hx = p.hotLeft ? p.x : p.x + p.w - third;
          c.fillStyle = '#FF5A3C'; rr(hx, p.y, third, p.h, 7); c.fill(); c.stroke();
          c.strokeStyle = 'rgba(255,90,60,.7)'; c.lineWidth = 2;
          for (var s = 0; s < 2; s++) { var sx = hx + third * (0.3 + s * 0.4); c.beginPath(); c.moveTo(sx, p.y - 4); c.quadraticCurveTo(sx - 5, p.y - 11 - Math.sin(frame / 8 + s) * 2, sx, p.y - 18); c.stroke(); }
        }
        if (p.type === 'bounce') {
          c.fillStyle = '#FF9DB5'; rr(p.x + 8, p.y - 7, p.w - 16, 8, 4); c.fill(); c.stroke();
        }
        c.globalAlpha = 1;
      });
      if (cam + viewH > 0) { c.fillStyle = '#9ED67F'; c.fillRect(0, 18, TW, cam + viewH); }
      c.strokeStyle = INK; c.lineWidth = 4;
      c.beginPath(); c.moveTo(1, cam); c.lineTo(1, cam + viewH); c.moveTo(TW - 1, cam); c.lineTo(TW - 1, cam + viewH); c.stroke();
      var im = face.t > 0 && face.e ? faces[face.e] : faces.base;
      if (im && im.complete && im.naturalWidth) {
        var sq = pl.vy < -2 ? 1.05 : 1;
        c.drawImage(im, pl.x - 26 / sq, pl.y - 94 * sq + 3, 52 / sq, 94 * sq);
      }
    }
    var hudT = 0;
    function loop(ts) {
      var dt = last ? Math.min(2.5, (ts - last) / 16.67) : 1; last = ts;
      step(dt); draw();
      if (ts - hudT > 100) {
        hudT = ts;
        var ft = document.getElementById('twFloor'), tt = document.getElementById('twTime');
        if (ft) ft.textContent = 'Этаж ' + Math.min(NSEC, maxSec + 1) + '/' + NSEC;
        if (tt && !done) tt.textContent = fmtTime(t0 ? performance.now() - t0 : 0);
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    var KEYMAP = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', ArrowUp: 'jump', KeyW: 'jump' };
    function onKey(e) {
      var k = KEYMAP[e.code];
      if (!k) return;
      e.preventDefault();
      var down = e.type === 'keydown';
      if (k === 'jump' && down && !e.repeat) jumpBuf = 8;
      keys[k] = down;
    }
    function press(e) {
      var b = e.target.closest('[data-k]');
      if (!b) return;
      e.preventDefault();
      var k = b.getAttribute('data-k');
      keys[k] = true; b.classList.add('down');
      if (k === 'jump') jumpBuf = 8;
      try { b.setPointerCapture(e.pointerId); } catch (er) { /* ничего */ }
      function up() { keys[k] = false; b.classList.remove('down'); b.removeEventListener('pointerup', up); b.removeEventListener('pointercancel', up); b.removeEventListener('lostpointercapture', up); }
      b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
    }
    var ctrl = document.querySelector('.tower-ctrl');
    ctrl.addEventListener('pointerdown', press);
    ctrl.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    document.addEventListener('keydown', onKey);
    document.addEventListener('keyup', onKey);
    window.addEventListener('resize', size);
    ui.tower.restart = function () { reset(); document.getElementById('twWin').hidden = true; };
    if (ui.tower.teleport) {   // сладость из тыквы: сразу на вершине
      ui.tower.teleport = false;
      pl.y = -NSEC * SEC; pl.sec = NSEC - 1; maxSec = NSEC - 1;
      win(true);
    }
    cleanups.push(function () {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey); document.removeEventListener('keyup', onKey);
      window.removeEventListener('resize', size);
      ui.tower.restart = null;
    });
  }

  /* ---------- Хэллоуин: «Сладость или гадость» — тыквы по всему сайту ---------- */

  var PUMPKIN_SVG = '<svg viewBox="0 0 60 58" aria-hidden="true"><path d="M30 12 q2 -8 9 -10" stroke="#3E7D3A" stroke-width="4" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="30" cy="35" rx="27" ry="21" fill="#FF8A2A" stroke="#2B2233" stroke-width="3"/><path d="M21 15 q-7 20 0 40 M39 15 q7 20 0 40" stroke="#D9661A" stroke-width="2.5" fill="none"/>' +
    '<circle cx="20" cy="31" r="7.5" fill="#FFE066" stroke="#2B2233" stroke-width="3"/><circle cx="40" cy="31" r="7.5" fill="#FFE066" stroke="#2B2233" stroke-width="3"/>' +
    '<circle cx="21" cy="32" r="3.5" fill="#2B2233"/><circle cx="41" cy="32" r="3.5" fill="#2B2233"/><circle cx="22.3" cy="30.5" r="1.3" fill="#fff"/><circle cx="42.3" cy="30.5" r="1.3" fill="#fff"/>' +
    '<path d="M19 42 q11 9 22 0 l-3.5 3 l-3.7 -2.5 l-3.8 3 l-3.8 -3 l-3.7 2.5 z" fill="#FFE066" stroke="#2B2233" stroke-width="2.4" stroke-linejoin="round"/></svg>';
  var PUMPKIN_SPOTS = [['left', '22%'], ['right', '30%'], ['left', '48%'], ['right', '58%'], ['left', '70%'], ['right', '16%'], ['right', '76%'], ['left', '36%']];
  function pumpkinsToday() {
    var p = get('pumpkins', null);
    return p && p.d === dayNumber() ? p : { d: dayNumber(), taken: [] };
  }
  function addPumpkin(page, param) {
    var old = document.getElementById('pumpkin');
    if (old) old.remove();
    if (holidayNow() !== 'halloween' || ['tower', 'fly'].indexOf(page) >= 0) return;
    var key = page + '/' + (param || '');
    if (pumpkinsToday().taken.indexOf(key) >= 0) return;
    var h = 0;
    for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 9973;
    var spot = PUMPKIN_SPOTS[(h + dayNumber()) % PUMPKIN_SPOTS.length];
    var b = document.createElement('button');
    b.id = 'pumpkin'; b.className = 'pumpkin ' + spot[0];
    b.style.top = spot[1];
    b.setAttribute('data-act', 'pumpkin'); b.setAttribute('data-id', key);
    b.setAttribute('aria-label', 'Тыква! Сладость или гадость?');
    b.innerHTML = PUMPKIN_SVG;
    document.body.appendChild(b);
  }
  // Гадости — проделки героев. Всё проходит само через несколько секунд.
  function fxLayer(cls, html, ms) {
    var d = document.createElement('div');
    d.className = 'trick ' + cls; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = html || '';
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, ms);
    return d;
  }
  var TRICKS = {
    cookie: function () {
      fxLayer('trick-cookie', '<img class="fly" src="' + itemImg('cookie') + '" alt=""><div class="splat">' +
        [[30, 40], [55, 52], [44, 30], [62, 38], [38, 60], [50, 45], [70, 58], [28, 52]].map(function (p, i) {
          return '<i style="left:' + p[0] + '%;top:' + p[1] + '%;width:' + (10 + (i % 3) * 7) + 'px;height:' + (10 + (i % 3) * 7) + 'px"></i>';
        }).join('') + '<img src="' + itemImg('cookie') + '" alt=""></div>', 3600);
      setTimeout(function () { beep('pop'); }, 550);
      toast('Гадость! Лиза кинула в тебя печенькой', 'Хитрая Лиза…', ['liza', 'joy']);
    },
    flip: function () {
      document.body.classList.add('trick-flip');
      setTimeout(function () { document.body.classList.remove('trick-flip'); }, 3500);
      toast('Гадость! Йоши перевернул весь сайт', 'Сейчас вернёт… наверное', ['yoshi', 'joy']);
    },
    paws: function () {
      var paws = '';
      for (var i = 0; i < 14; i++) {
        var x = 8 + i * 6.2, y = 85 - i * 5.6 + (i % 2 ? 4 : -4);
        paws += '<img src="' + itemImg('paw') + '" alt="" style="left:' + x + '%;top:' + y + '%;animation-delay:' + (i * 0.16) + 's;transform:rotate(' + (40 + (i % 2) * 20) + 'deg)">';
      }
      fxLayer('trick-paws', paws, 4800);
      beep('lana');
      toast('Гадость! Кошки Ланы прошлись по экрану', 'Мяу :3', ['lana', 'love']);
    },
    invisible: function () {
      document.body.classList.add('trick-invisible');
      setTimeout(function () { document.body.classList.remove('trick-invisible'); }, 3200);
      beep('hat');
      toast('Гадость! Кенди надела на сайт шапку-невидимку', 'Подожди, сейчас проявится', ['candy', 'joy']);
    },
    fall: function () {
      fxLayer('trick-fall', '<img src="' + heroSrc('ulyana', 'wow') + '" alt="">', 2600);
      setTimeout(function () { document.body.classList.add('trick-shake'); beep('pop'); }, 650);
      setTimeout(function () { document.body.classList.remove('trick-shake'); }, 1150);
      toast('Гадость! Ульяна упала прямо на экран', 'Летает она пока плохо…', ['ulyana', 'wow']);
    },
    cat: function () {
      runCat();
      toast('Гадость! Кот Йоши украл твою тыкву', 'Попробуй его поймать!', ['yoshi', 'joy']);
    }
  };
  // Новый год: тихий снегопад по всему сайту
  function toggleSnow(on) {
    var el = document.getElementById('snow');
    if (!on) { if (el) el.remove(); return; }
    if (el) return;
    el = document.createElement('div');
    el.id = 'snow'; el.className = 'snow'; el.setAttribute('aria-hidden', 'true');
    var r = seeded(1231), html = '';
    for (var i = 0; i < 36; i++) {
      var sz = 4 + Math.round(r() * 6);
      html += '<i style="left:' + Math.round(r() * 100) + '%;width:' + sz + 'px;height:' + sz + 'px;animation-duration:' + (6 + r() * 6).toFixed(1) + 's;animation-delay:-' + (r() * 10).toFixed(1) + 's"></i>';
    }
    el.innerHTML = html;
    document.body.appendChild(el);
  }
  function candyRain() {
    var html = '';
    for (var i = 0; i < 16; i++) html += '<img src="' + itemImg('candy') + '" alt="" style="left:' + (4 + (i * 37) % 92) + '%;animation-delay:' + (i % 8) * 0.12 + 's">';
    fxLayer('trick-rain', html, 2600);
  }
  function trickOrTreat(key, btn) {
    var p = pumpkinsToday();
    if (p.taken.indexOf(key) < 0) p.taken.push(key);
    set('pumpkins', p);
    if (btn) btn.remove();
    if (Math.random() < 0.5) {
      var names = Object.keys(TRICKS);
      beep('sorry');
      TRICKS[names[Math.floor(Math.random() * names.length)]]();
      return;
    }
    var r = Math.random();
    if (r < 0.15 && !has('special', 'ghost')) {
      addTo('special', 'ghost'); beep('item'); candyRain();
      toast('Сладость! Редкая награда — Призрачок!', 'Такой есть не у всех. Смотри в альбоме', ['candy', 'love']);
    } else if (r < 0.45) {
      beep('hint');
      toast('Сладость! Тыква переносит тебя на вершину башни…', '', ['ulyana', 'wow']);
      ui.tower.hero = ui.tower.hero || HEROES[ui.lobby].id;
      ui.tower.teleport = true;
      setTimeout(function () { location.hash = '#/tower'; }, 900);
    } else {
      var n = 1 + Math.floor(Math.random() * 3), total = get('halloweenCandy', 0) + n;
      set('halloweenCandy', total); beep('item'); candyRain();
      toast('Сладость! +' + n + ' ' + (n === 1 ? 'конфета' : 'конфеты'), 'Конфет за Хэллоуин: ' + total, ['candy', 'joy']);
    }
  }

  // Для взрослых: проверить праздник заранее (5 раз нажать на заголовок «Ещё»)
  var HOLIDAY_CYCLE = [null, 'halloween', 'newyear', 'birthday', 'school', 'none'];
  var HOLIDAY_NAMES = { halloween: 'Хэллоуин', newyear: 'Новый год', birthday: 'День рождения сайта', school: 'Начало учёбы', none: 'Без праздника' };
  ui.moreTaps = 0;

  /* ---------- Герои реагируют на то, что делает игрок ---------- */

  // TODO(автор): реплики-реакции — черновики, автор может заменить своими
  var REACT_SAY = {
    hello: 'Привет!', tickle: 'Хи-хи, щекотно!', enough: 'Ну хватит щекотать!', find: 'Ура, находка!',
    wake: 'Ой! Я не сплю, я думаю…', music: 'Люблю эту музыку!', sound: 'Ой, что это?', shake: 'Ой-ой-ой!',
    hat: 'Где я? Меня не видно!', code: 'Ура, шапки!'
  };
  var POWER_EMO = { ulyana: 'wow', lana: 'love', yoshi: 'joy', liza: 'joy', candy: 'joy' };
  var ITEM_HERO = { feather: 'ulyana', yarn: 'lana', paw: 'yoshi', cookie: 'liza', candy: 'candy', key: 'yoshi', spoon: 'liza', bell: 'yoshi', cake: 'liza', pumpkin: 'lana', snowflake: 'yoshi', pencil: 'ulyana', gift: 'candy' };
  function reactBox() {
    var boxes = document.querySelectorAll('#fig, .hero-fig[data-hero]');
    for (var i = 0; i < boxes.length; i++) if (boxes[i].offsetParent !== null && boxes[i].querySelector('img.hero-main')) return boxes[i];
    return null;
  }
  // Каждая эмоция — отдельный заранее загруженный слой: смена мгновенная, без пустого кадра
  function emoLayer(box, emo) {
    var l = box.querySelector('img.emo-layer[data-e="' + emo + '"]');
    if (!l) {
      var main = box.querySelector('img.hero-main');
      l = document.createElement('img');
      l.className = 'emo-layer'; l.alt = ''; l.setAttribute('data-e', emo);
      l.src = heroSrc(box.getAttribute('data-hero'), emo);
      main.parentNode.insertBefore(l, main.nextSibling);
    }
    return l;
  }
  function showLayer(box, emo) {
    var l = emo ? emoLayer(box, emo) : null;
    function apply() {
      if (box._want !== emo) return;
      box.querySelectorAll('img.emo-layer').forEach(function (x) { x.classList.toggle('on', x === l); });
      box.classList.toggle('layered', !!l);
    }
    box._want = emo;
    if (!l || (l.complete && l.naturalWidth)) apply(); else l.onload = apply;
  }
  function preloadLayers() {
    var box = reactBox();
    if (!box || !heroSvgText[box.getAttribute('data-hero')]) return;
    ['joy', 'angry', 'wow', 'sleep', 'love'].forEach(function (e) { emoLayer(box, e); });
  }
  function restoreBox(box) {
    showLayer(box, null);
    box.classList.toggle('reacting', !!box.querySelector('img.hero-main').getAttribute('data-emo'));
    var b = box.querySelector('.react-say'); if (b) b.remove();
  }
  // ms < 0 — держать, пока не снимут (сон)
  function react(emo, say, ms, box) {
    box = box || reactBox();
    if (!box) return false;
    if (!heroSvgText[box.getAttribute('data-hero')]) return false;
    clearTimeout(box._rt);
    showLayer(box, emo);
    box.classList.add('reacting');
    box.classList.remove('hop'); void box.offsetWidth; box.classList.add('hop');
    var b = box.querySelector('.react-say');
    if (say) {
      if (!b) { b = document.createElement('span'); b.className = 'react-say hand'; box.appendChild(b); }
      b.textContent = say;
    } else if (b) b.remove();
    if (!(ms < 0)) box._rt = setTimeout(function () { restoreBox(box); }, ms || 1800);
    return true;
  }
  var tickle = { n: 0, t: 0 };
  document.addEventListener('pointerdown', function (e) {
    var box = e.target.closest && e.target.closest('#fig, .hero-fig[data-hero]');
    if (!box || e.target.closest('button, a')) return;
    var now = Date.now();
    tickle.n = now - tickle.t < 1500 ? tickle.n + 1 : 1;
    tickle.t = now;
    if (tickle.n >= 5) { react('angry', REACT_SAY.enough, 1800, box); beep('sorry'); }
    else { react('joy', REACT_SAY.tickle, 1500, box); beep(tickle.n === 1 ? 'pick' : box.getAttribute('data-hero')); }
  });

  /* ---------- Роутер ---------- */

  var app = document.getElementById('app');
  function route() {
    cleanup();
    var parts = (location.hash.replace(/^#\/?/, '') || '').split('/');
    var page = parts[0] || '';
    var night = isNight();
    document.body.classList.toggle('night', night);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (page === '' || page === 'lobby') {
      app.innerHTML = renderLobby();
      if (meta) meta.setAttribute('content', night ? '#26305C' : '#CFE8FF');
      renderNav('heroes');
      mountLobby();
      mountFireworks();
    } else {
      if (meta) meta.setAttribute('content', '#FFFBF3');
      if (page === 'hero') { app.innerHTML = renderHero(parts[1]); renderNav('hero'); }
      else if (page === 'world') { app.innerHTML = renderWorld(parts[1]); renderNav('world'); }
      else if (page === 'album') { app.innerHTML = renderAlbum(); renderNav('album'); }
      else if (page === 'friends') { app.innerHTML = renderFriends(); renderNav('friends'); }
      else if (page === 'card') { app.innerHTML = renderCard(); renderNav('card'); }
      else if (page === 'more') { app.innerHTML = renderMore(); renderNav('more'); }
      else if (page === 'fly') { app.innerHTML = renderFly(); renderNav('fly'); mountFly(); }
      else if (page === 'cipher') { app.innerHTML = renderCipher(parts.slice(1).join('/')); renderNav('cipher'); }
      else if (page === 'stickers') { app.innerHTML = renderStickers(); renderNav('stickers'); mountStickers(); }
      else if (page === 's') { app.innerHTML = renderSecret(parts[1]); renderNav('more'); }
      else if (page === 'diary') { app.innerHTML = renderDiary(); renderNav('more'); }
      else if (page === 'quiz') { app.innerHTML = renderQuiz(); renderNav('more'); }
      else if (page === 'invite') { app.innerHTML = renderInvite(); renderNav('more'); }
      else if (page === 'hi') { app.innerHTML = renderHi(parts[1]); renderNav('more'); }
      else if (page === 'wallpapers') { app.innerHTML = renderWallpapers(); renderNav('more'); mountWallpapers(); }
      else if (page === 'draw') { app.innerHTML = renderDraw(); renderNav('more'); }
      else if (page === 'pack') { app.innerHTML = renderPack(); renderNav('more'); }
      else if (page === 'eyes') { app.innerHTML = renderEyes(); renderNav('more'); }
      else if (page === 'hospital') { app.innerHTML = renderHospital(); renderNav('more'); }
      else if (page === 'case') { app.innerHTML = renderCase(); renderNav('more'); }
      else if (page === 'tower') { app.innerHTML = renderTower(); renderNav('more'); mountTower(); }
      else { app.innerHTML = renderLost(); renderNav('lost'); }
    }
    addHideSeek(page || 'lobby', parts[1] || '');
    maybeRunCat(page);
    setTimeout(preloadLayers, 300);
    addPumpkin(page || 'lobby', parts[1] || '');
    toggleSnow(holidayNow() === 'newyear' && page !== 'tower');
  }
  var lastPage = '';
  window.addEventListener('hashchange', function () {
    var page = location.hash.split('/')[1] || '';
    var id = location.hash.split('/')[2] || '';
    if (page === 'hero' && (lastPage !== 'hero:' + id)) ui.tried = false;
    lastPage = page + ':' + id;
    route();
    window.scrollTo(0, 0);
  });

  /* ---------- Действия ---------- */

  document.addEventListener('input', function (e) {
    if (e.target.id === 'friendName') ui.card.name = e.target.value;
  });

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    var id = el.getAttribute('data-id');
    var n = HEROES.length;
    switch (act) {
      case 'lobby-prev': ui.lobby = (ui.lobby + n - 1) % n; beep('pick'); route(); react('joy', REACT_SAY.hello, 1300); break;
      case 'lobby-next': ui.lobby = (ui.lobby + 1) % n; beep('pick'); route(); react('joy', REACT_SAY.hello, 1300); break;
      case 'lobby-pick': {
        ui.lobby = +el.getAttribute('data-i'); beep('pick');
        var coded = checkCode(HEROES[ui.lobby].id); route();
        react('joy', coded ? REACT_SAY.code : REACT_SAY.hello, 1300); break;
      }
      case 'sound': {
        var snd = !get('sound', false);
        set('sound', snd); route(); beep('on');
        if (snd) react('wow', REACT_SAY.sound, 1300);
        break;
      }
      case 'hat': {
        var hat = !get('hat', false);
        set('hat', hat); beep('hat');
        toast(hat ? 'Шапка надета! Теперь видно спрятанное…' : 'Кенди сняла шапку', '', ['candy', hat ? 'joy' : 'wow']);
        route(); break;
      }
      case 'sorry': {
        var apology = APOLOGIES[Math.floor(Math.random() * APOLOGIES.length)];
        logSorry(ui.pranks, apology);
        ui.prankFixed = true; beep('sorry'); route();
        toast('Йоши: «' + apology + '»', 'Записано в дневник пакостей', ['yoshi', 'sad']);
        break;
      }
      case 'welcome-ok': ui.welcome = null; route(); break;
      case 'potion': {
        var heal = Math.random() < 0.5, pots = Object.assign({}, get('potions', {}));
        pots[id] = { d: dayNumber(), heal: heal };
        set('potions', pots); beep('tea'); route();
        toast(heal ? 'Чай лечебный! ' + BY[id].name + ' радуется весь день' : 'Чай коварный! ' + BY[id].name + ' сердится до завтра', 'Загляни в лобби', [id, heal ? 'joy' : 'angry']);
        break;
      }
      case 'seek': {
        var sk = seekState(), today = dayNumber();
        var streak = sk.last === today - 1 ? sk.streak + 1 : 1;
        set('seek', { last: today, streak: streak });
        el.remove(); beep('hint');
        toast('Нашёл Кенди! <3', 'Серия: ' + streak + ' дн. подряд. Завтра она спрячется в другом месте', ['candy', 'joy']);
        break;
      }
      case 'catch-cat': {
        el.remove();
        if (!has('items', 'bell')) {
          var bl = addTo('items', 'bell'); beep('item');
          toast('Поймал кота Йоши! Он отдал колокольчик', 'В альбоме: ' + bl.length + ' из ' + ITEMS.length, ['yoshi', 'wow']);
        } else { beep('pick'); toast('Мяу! Кот Йоши доволен, что его поймали', '', ['yoshi', 'joy']); }
        break;
      }
      case 'motion': enableMotion(true); route(); break;
      case 'hint': {
        var hl = addTo('hints', id); beep('hint');
        toast('Подсказка найдена! ' + hl.length + ' из ' + HINTS_TOTAL, hl.length >= HINTS_TOTAL ? 'Секретный герой открыт!' : 'Собери все — и откроется секретный герой', ['candy', 'love']);
        route(); react('wow', REACT_SAY.find, 1600); break;
      }
      case 'item': {
        var itemId = el.querySelector('img').getAttribute('src').replace(/^.*\/(\w+)\.svg$/, '$1');
        if (SPECIAL_BY[itemId]) {
          addTo('special', itemId); beep('item'); el.remove();
          toast('Особая находка: ' + SPECIAL_BY[itemId].name + '!', 'Смотри в альбоме, раздел «Особые находки»', [ITEM_HERO[itemId] || 'candy', 'love']);
          route(); react('joy', REACT_SAY.find, 1600); break;
        }
        var il = addTo('items', itemId); beep('item'); el.remove();
        var it = ITEMS.filter(function (x) { return x.id === itemId; })[0];
        toast('Находка: ' + (it ? it.name : '') + '!', 'В альбоме: ' + il.length + ' из ' + ITEMS.length, [ITEM_HERO[itemId] || 'candy', 'joy']);
        route(); react('joy', REACT_SAY.find, 1600); break;
      }
      case 'power': {
        var hid = (location.hash.split('/')[2]) || 'ulyana';
        var turnOn = !ui.tried;
        ui.tried = turnOn; ui.heal = Math.random() < 0.5;
        if (hid === 'candy') set('hat', turnOn);
        if (turnOn) beep(hid);
        route(); break;
      }
      case 'time': {
        var pref = get('night', null);
        set('night', pref === null ? 'day' : pref === 'day' ? 'night' : null);
        route(); break;
      }
      case 'friend': ui.friend = id; beep('pick'); route(); break;
      case 'reset':
        if (el.getAttribute('data-armed')) {
          set('items', []); set('hints', []); set('stamps', []); set('special', []); set('hat', false); route();
          toast('Начинаем заново!', 'Находки, подсказки и печати обнулены');
        } else {
          el.setAttribute('data-armed', '1');
          el.textContent = 'Точно? Нажми ещё раз — всё обнулится';
        }
        break;
      case 'pour':
        ui.card.poured = true; ui.card.heal = Math.random() < 0.5; beep('tea'); route(); break;
      case 'save':
        cardBlob(function (b) {
          if (!b) { toast('Не получилось нарисовать картинку'); return; }
          saveFile(b, 'chai-ot-lizy.png', 'Картинка сохранена!');
        });
        break;
      case 'share':
        cardBlob(function (b) {
          if (!b) { toast('Не получилось нарисовать картинку'); return; }
          shareFile(b, 'chai-ot-lizy.png', 'Чай от Лизы', 'Картинка сохранена — отправь её другу');
        });
        break;
      case 'music':
        if (music.on) { stopMusic(); set('music', false); } else { startMusic(); set('music', true); }
        route();
        if (music.on) react('love', REACT_SAY.music, 1800);
        break;
      case 'sticker':
        stickerBlob(id, el.getAttribute('data-emo'), function (b) {
          if (!b) { toast('Не получилось нарисовать стикер'); return; }
          shareFile(b, 'sticker-' + id + '-' + el.getAttribute('data-emo') + '.png', 'Стикер', 'Стикер сохранён!');
        });
        break;
      case 'cipher-encode': {
        var src = (document.getElementById('cipherIn').value || '').trim();
        if (!src) { toast('Сначала напиши фразу'); break; }
        var out = document.getElementById('cipherOut');
        out.textContent = meowEncode(src); out.style.color = 'var(--ink)';
        beep('lana'); break;
      }
      case 'cipher-copy':
      case 'cipher-share': {
        var meow = document.getElementById('cipherOut').textContent;
        if (!meow || meow.indexOf('появится') >= 0) { toast('Сначала переведи фразу'); break; }
        var link = siteBase() + '#/cipher/' + encodeURIComponent(meow);
        var payload = act === 'cipher-copy' || inArtifact() ? meow : link;
        if (act === 'cipher-share' && inArtifact()) act = 'cipher-copy';
        if (act === 'cipher-share' && navigator.share) {
          navigator.share({ title: 'Кошачья записка', text: 'Расшифруй у Ланы:', url: link }).catch(function () {});
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(payload).then(function () { toast(act === 'cipher-copy' ? 'Мяу скопировано!' : 'Ссылка скопирована', act === 'cipher-copy' ? '' : 'Отправь её другу'); }, function () { toast('Не получилось скопировать'); });
        } else { toast('Скопируй вручную'); }
        break;
      }
      case 'cipher-decode': {
        var back = document.getElementById('cipherBack').value || '';
        document.getElementById('cipherPlain').textContent = back.trim() ? meowDecode(back.trim()) : '';
        beep('lana'); break;
      }
      case 'cipher-read': {
        var msg = safeDecode((location.hash.split('/').slice(2).join('/')));
        document.getElementById('cipherRead').textContent = 'Лана: «' + meowDecode(msg) + '»';
        beep('lana'); break;
      }
      case 'print': window.print(); break;
      case 'pumpkin': trickOrTreat(id, el); break;
      case 'more-title': if (++ui.moreTaps === 5) route(); break;
      case 'holiday-cycle': {
        var hc = HOLIDAY_CYCLE[(HOLIDAY_CYCLE.indexOf(get('holiday', null)) + 1) % HOLIDAY_CYCLE.length];
        set('holiday', hc); route();
        toast('Праздник: ' + (HOLIDAY_NAMES[hc] || 'по календарю'), hc ? 'Только для проверки. Нажми ещё, чтобы сменить' : '');
        break;
      }
      case 'eyes-who': ui.eyes.who = id; ui.eyes.step = 'emo'; beep('pick'); route(); break;
      case 'eyes-emo': {
        var eg = ui.eyes, ec = eg.rounds[eg.i];
        eg.emo = id; eg.step = 'reveal';
        var pts = (eg.who === ec[0] ? 1 : 0) + (id === ec[1] ? 1 : 0);
        eg.score += pts; beep(pts === 2 ? 'hint' : pts ? 'item' : 'sorry'); route(); break;
      }
      case 'eyes-next':
        ui.eyes.i++; ui.eyes.step = 'who'; ui.eyes.who = ui.eyes.emo = null;
        if (ui.eyes.i >= EYES_ROUNDS && ui.eyes.score > get('eyesBest', 0)) set('eyesBest', ui.eyes.score);
        route(); window.scrollTo(0, 0); break;
      case 'eyes-again': eyesNew(); route(); break;
      case 'hosp-tool': hospTool(id); break;
      case 'hosp-next': ui.hosp.n++; if (ui.hosp.n < HOSP_SHIFT) hospPatient(); route(); window.scrollTo(0, 0); break;
      case 'hosp-again': hospNew(); route(); break;
      case 'clue': {
        var cst = caseState(), ck = +id;
        if (cst.found.indexOf(ck) < 0) cst.found.push(ck);
        set('case', cst); el.remove(); beep('hint');
        toast('Улика найдена! ' + cst.found.length + ' из 3', caseToday().clues[ck].text, ['liza', 'wow']);
        break;
      }
      case 'accuse': accuse(id); break;
      case 'tower-hero': ui.tower.hero = id; beep('pick'); route(); break;
      case 'tower-change': ui.tower.hero = null; route(); break;
      case 'tower-again': if (ui.tower.restart) ui.tower.restart(); break;
      case 'quiz-ans': quizAnswer(id); route(); window.scrollTo(0, 0); break;
      case 'quiz-again': ui.quiz = { i: 0, score: {}, last: null, done: null }; route(); break;
      case 'quiz-save':
      case 'quiz-share':
        storyBlob(ui.quiz.done, function (b) {
          if (!b) { toast('Не получилось нарисовать картинку'); return; }
          var nm = 'kto-ty-iz-nas-' + ui.quiz.done + '.png';
          if (act === 'quiz-share') shareFile(b, nm, 'Кто ты из нас?', 'Картинка сохранена — отправь её другу'); else saveFile(b, nm, 'Картинка для сторис сохранена!');
        });
        break;
      case 'invite-pick': ui.invite = id; beep('pick'); route(); break;
      case 'invite-copy':
      case 'invite-share': {
        var inv = document.getElementById('inviteLink').value;
        if (act === 'invite-share' && navigator.share && !inArtifact()) {
          navigator.share({ title: 'Мир героев', text: 'Заходи в Мир героев — там тебя ждёт подарок!', url: inv }).then(inviteDone, function () {});
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(inv).then(inviteDone, function () { document.getElementById('inviteLink').select(); toast('Скопируй ссылку вручную'); });
        } else { document.getElementById('inviteLink').select(); toast('Скопируй ссылку вручную'); }
        break;
      }
      case 'wall-pick': ui.wall = id; beep('pick'); route(); break;
      case 'wall-night': ui.wallNight = !ui.wallNight; route(); break;
      case 'wall-save':
        wallBlob(ui.wall, ui.wallNight, function (b) {
          if (b) saveFile(b, 'oboi-' + ui.wall + (ui.wallNight ? '-noch' : '') + '.png', 'Обои сохранены!'); else toast('Не получилось нарисовать обои');
        });
        break;
      case 'template': templateBlob(function (b) { if (b) saveFile(b, 'shablon-moj-geroj.png', 'Шаблон сохранён — распечатай и рисуй!'); }); break;
      case 'pack-zip':
        if (el.disabled) break;
        el.disabled = true; el.textContent = 'Рисуем 30 стикеров…';
        packZip(function (b) {
          el.disabled = false; el.textContent = 'Скачать все стикеры (ZIP)';
          if (b) saveFile(b, 'mir-geroev-stickers.zip', 'Архив со стикерами сохранён!'); else toast('Не получилось собрать архив');
        });
        break;
      case 'sheet': sheetBlob(function (b) { if (b) saveFile(b, 'naklejki.png', 'Лист с наклейками сохранён!'); else toast('Не получилось нарисовать лист'); }); break;
    }
  });

  route();
  if (holidayTry) {
    var TRY_NAMES = { halloween: ['Хэллоуин', 'с 24 октября по 1 ноября'], newyear: ['Новый год', 'с 20 декабря по 10 января'], birthday: ['День рождения сайта', '10 октября'], school: ['Начало учёбы', 'с 30 августа по 2 сентября'] };
    var tryBadge = document.createElement('div');
    tryBadge.className = 'try-badge';
    document.body.appendChild(tryBadge);
    var tryTick = setInterval(function () {
      var left = Math.ceil((holidayTry.until - Date.now()) / 1000), nm = TRY_NAMES[holidayTry.h] || ['Праздник', ''];
      if (left <= 0) {
        var was = nm;
        nextTry(); route();
        if (holidayTry) { toast((TRY_NAMES[holidayTry.h] || ['Праздник'])[0] + ' на пробу — ещё минута!', 'Настоящий праздник «' + was[0] + '» будет ' + was[1]); return; }
        clearInterval(tryTick); tryBadge.remove();
        toast(was[0] + ' на пробу закончился', 'Настоящий будет ' + was[1]);
        return;
      }
      tryBadge.innerHTML = (holidayTry.h === 'halloween' ? PUMPKIN_SVG : '<img src="' + itemImg('snowflake') + '" alt="">') + '<span>0:' + ('0' + left).slice(-2) + '</span>';
      tryBadge.setAttribute('aria-label', nm[0] + ' на пробу: осталось ' + left + ' с');
    }, 250);
  }
  loadHeroSvgs(function () { refreshEmoImgs(); preloadLayers(); });
  // Для скриптов в tools/ (картинка-превью и иконки)
  window.mirGeroev = { buildTower: buildTower, stickerBlob: stickerBlob, heroSrc: heroSrc, emotions: EMOTIONS.map(function (e) { return e.id; }), heroes: HEROES.map(function (h) { return h.id; }), ready: function () { return Object.keys(heroSvgText).length === HEROES.length; } };
})();
