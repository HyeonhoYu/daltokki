/* ══════════════════════════════════════════════════════════════
   달토끼 공용 엔진
   모든 달의 페이지와 받아쓰기실이 함께 씁니다.
   한글 조합과 조사, 소리(녹음과 음성 합성), 캐릭터, 달 그림, 저장, 소리 환경 안내,
   받아쓰기 오류 분석이 들어 있습니다. 달마다 다른 것은 content/ 와 각 달의 페이지에 둡니다.
   읽는 순서: dal.js → content/<달>.js → 페이지 스크립트
   ══════════════════════════════════════════════════════════════ */
/* 이 파일 위치에서 사이트 맨 위 주소를 구합니다. 녹음 파일은 그 아래 audio/ 에 있습니다. */
const DAL_ROOT = (() => {
  try { return new URL('../', document.currentScript.src).href; } catch(e) { return '../'; }
})();

/* ══════════════════════════════════════════════════════════════
   엔진 층
   ══════════════════════════════════════════════════════════════ */

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function compose(cho, jung, jong){
  const ci = CHO.indexOf(cho), ji = JUNG.indexOf(jung), ki = jong ? JONG.indexOf(jong) : 0;
  if(ci < 0 || ji < 0 || ki < 0) return '';
  return String.fromCharCode(0xAC00 + ci*588 + ji*28 + ki);
}
/* ---- 자모의 소리 --------------------------------------------
   음성 엔진에 ㄱ 한 글자를 주면 소리 [그]가 아니라 이름 "기역"을 읽습니다.
   발음 중심으로 가르치려면 소리를 들려줘야 하므로, 자모는 소리 음절로 바꿔서 냅니다.
   첫소리 자음은 ㅡ를 붙여 [그], 모음은 ㅇ을 붙여 [아], 받침은 대표음으로 [윽].
   첫소리 ㅇ은 소리가 없으므로 [으]가 됩니다.                                   */
const JONG_REP = {'ㄱ':'ㄱ','ㄲ':'ㄱ','ㅋ':'ㄱ','ㄳ':'ㄱ','ㄺ':'ㄱ',
  'ㄴ':'ㄴ','ㄵ':'ㄴ','ㄶ':'ㄴ',
  'ㄷ':'ㄷ','ㅅ':'ㄷ','ㅆ':'ㄷ','ㅈ':'ㄷ','ㅊ':'ㄷ','ㅌ':'ㄷ','ㅎ':'ㄷ',
  'ㄹ':'ㄹ','ㄼ':'ㄹ','ㄽ':'ㄹ','ㄾ':'ㄹ','ㅀ':'ㄹ',
  'ㅁ':'ㅁ','ㄻ':'ㅁ','ㅂ':'ㅂ','ㅍ':'ㅂ','ㅄ':'ㅂ','ㄿ':'ㅂ','ㅇ':'ㅇ'};
const JONG_HINT = {'ㄱ':'k','ㄴ':'n','ㄷ':'t','ㄹ':'l','ㅁ':'m','ㅂ':'p','ㅇ':'ng'};
function jamoSound(j, role){
  if(role === 'jung') return compose('ㅇ', j);
  if(role === 'jong') return compose('ㅇ', 'ㅡ', JONG_REP[j] || j);
  return compose(j, 'ㅡ');
}
function jamoHint(j, role){
  if(role === 'jong') return JONG_HINT[JONG_REP[j]] || '';
  if(role === 'cho' && j === 'ㅇ') return 'silent';
  return (JAMO[j] || {}).h || '';
}
function roleOf(j){
  if(typeof mod === 'undefined' || !mod) return 'cho';
  if(mod.add.jong.includes(j)) return 'jong';
  if(mod.add.jung.includes(j)) return 'jung';
  return 'cho';
}

/* 이미 만든 음절에 받침만 얹습니다. */
function addJong(syl, jong){
  const c = syl.charCodeAt(0);
  if(c < 0xAC00 || c > 0xD7A3) return syl;
  const ki = JONG.indexOf(jong);
  if(ki < 1) return syl;
  return String.fromCharCode(c - ((c - 0xAC00) % 28) + ki);
}

/* ---- 조사 선택 ----------------------------------------------
   자모는 글자 모양이 아니라 이름의 받침을 따릅니다.
   ㄱ은 기역이라 받침이 있고(ㄱ과), ㅓ는 어라 받침이 없습니다(ㅓ와). */
const JAMO_NAME = {
  'ㄱ':'기역','ㄲ':'쌍기역','ㄴ':'니은','ㄷ':'디귿','ㄸ':'쌍디귿','ㄹ':'리을',
  'ㅁ':'미음','ㅂ':'비읍','ㅃ':'쌍비읍','ㅅ':'시옷','ㅆ':'쌍시옷','ㅇ':'이응',
  'ㅈ':'지읒','ㅉ':'쌍지읒','ㅊ':'치읓','ㅋ':'키읔','ㅌ':'티읕','ㅍ':'피읖','ㅎ':'히읗',
  'ㄳ':'기역시옷','ㄵ':'니은지읒','ㄶ':'니은히읗','ㄺ':'리을기역','ㄻ':'리을미음',
  'ㄼ':'리을비읍','ㅀ':'리을히읗','ㅄ':'비읍시옷',
  'ㅏ':'아','ㅐ':'애','ㅑ':'야','ㅒ':'얘','ㅓ':'어','ㅔ':'에','ㅕ':'여','ㅖ':'예',
  'ㅗ':'오','ㅘ':'와','ㅙ':'왜','ㅚ':'외','ㅛ':'요','ㅜ':'우','ㅝ':'워','ㅞ':'웨',
  'ㅟ':'위','ㅠ':'유','ㅡ':'으','ㅢ':'의','ㅣ':'이'
};
function jongseong(word){
  if(!word) return -1;
  /* 끝의 문장부호와 닫는 따옴표는 건너뜁니다: ‘기분이 어때요?’는 */
  word = word.replace(/[\s.,!?’”'")]+$/, '');
  if(!word) return -1;
  let last = word[word.length - 1];
  if(JAMO_NAME[last]){ const nm = JAMO_NAME[last]; last = nm[nm.length - 1]; }
  const c = last.charCodeAt(0);
  if(c < 0xAC00 || c > 0xD7A3) return -1;
  return (c - 0xAC00) % 28;
}
const JOSA_PAIR = {
  '은':['는','은'],'는':['는','은'],'이':['가','이'],'가':['가','이'],
  '을':['를','을'],'를':['를','을'],'와':['와','과'],'과':['와','과'],
  '이에요':['예요','이에요'],'예요':['예요','이에요'],'이라':['라','이라']
};
function josa(word, type){
  const j = jongseong(word);
  if(type === '으로' || type === '로') return word + ((j === 0 || j === 8) ? '로' : '으로');
  const p = JOSA_PAIR[type];
  if(!p || j < 0) return word + type;
  return word + (j > 0 ? p[1] : p[0]);
}


/* ---- 소리 --------------------------------------------------
   음성 합성은 기기와 브라우저에 따라 예외를 던집니다.
   특히 iOS 는 샌드박스 안에서 접근 자체가 막히기도 하고,
   사용자가 화면을 한 번 누르기 전에는 소리를 내 주지 않습니다.
   그래서 모든 접근을 safe() 로 감싸고, 실패하면 조용히 끕니다.   */
let voiceKo = null, ttsOK = false, ttsUnlocked = false, ttsWarned = false, unlockBusy = false;
function safe(fn){
  try { return fn(); }
  catch(e) { ttsOK = false; return null; }
}
try { ttsOK = typeof speechSynthesis !== 'undefined' && !!speechSynthesis; }
catch(e) { ttsOK = false; }

function loadVoice(){
  safe(() => {
    const vs = speechSynthesis.getVoices() || [];
    voiceKo = vs.find(v => v.lang && v.lang.toLowerCase().startsWith('ko')) || null;
  });
}
if(ttsOK){
  loadVoice();
  safe(() => speechSynthesis.addEventListener('voiceschanged', loadVoice));
}
/* 첫 손가락 터치에서 소리 잠금을 풀어 둡니다. */
function unlockAudio(){
  if(ttsUnlocked || !ttsOK) return;
  ttsUnlocked = true;
  safe(() => {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    unlockBusy = true;
    u.onend = u.onerror = () => { unlockBusy = false; };
    setTimeout(() => { unlockBusy = false; }, 1500);
    speechSynthesis.speak(u);
  });
}
document.addEventListener('pointerdown', unlockAudio);
document.addEventListener('keydown', unlockAudio);

function audioWarn(){
  if(ttsWarned || envShown) return;
  ttsWarned = true;
  const n = document.getElementById('audioNote');
  if(n){
    n.style.display = 'block';
    n.onclick = () => { n.style.display = 'none'; };
    setTimeout(() => { n.style.display = 'none'; }, 8000);
  }
}
/* ---- 녹음 파일 -----------------------------------------------
   ../audio/manifest.json 이 있으면 녹음된 소리를 먼저 쓰고, 녹음이 없는 말만 음성 합성으로 냅니다.
   녹음 파일은 카카오톡 같은 앱 속 브라우저에서도 재생됩니다.
   파일 이름은 글자의 유니코드 번호입니다. 가는 ac00.wav, 나무는 b098-bb34.wav   */
const AUDIO_BASE = DAL_ROOT + 'audio/';
let CLIPS = null, CLIPS_COMPLETE = false, clipsReady = false;
const clipId = text => [...text].map(c => c.codePointAt(0).toString(16)).join('-');
function onClipsReady(){ clipsReady = true; document.dispatchEvent(new Event('clipsready')); }
try {
  fetch(AUDIO_BASE + 'manifest.json', {cache: 'no-cache'})
    .then(r => r.ok ? r.json() : null)
    .then(j => { if(j && j.clips && typeof j.clips === 'object'){ CLIPS = j.clips; CLIPS_COMPLETE = !!j.complete; } })
    .catch(() => {})
    .finally(onClipsReady);
} catch(e) { onClipsReady(); }
const clipCache = {};
let playingClip = null;
function clipAudio(text){
  if(!CLIPS || !text) return null;
  const id = clipId(text);
  if(!CLIPS[id]) return null;
  if(!clipCache[id]){ const a = new Audio(AUDIO_BASE + id + '.wav'); a.preload = 'auto'; clipCache[id] = a; }
  return clipCache[id];
}
function playClip(text){
  const a = clipAudio(text);
  if(!a) return false;
  try {
    if(playingClip && playingClip !== a) playingClip.pause();
    if(ttsOK) safe(() => speechSynthesis.cancel());
    a.currentTime = 0;
    const pr = a.play();
    playingClip = a;
    if(pr && pr.catch) pr.catch(() => ttsSpeak(text));
    return true;
  } catch(e) { return false; }
}
function preloadClips(texts){ texts.forEach(t => clipAudio(t)); }

/* 말이 끝나면 done 을 부릅니다. 대화를 한 줄씩 이어서 들려줄 때 씁니다.
   녹음은 ended, 음성 합성은 onend 를 기다리고, 둘 다 오지 않는 기기를 위해 시간 제한도 둡니다. */
function speakThen(text, done){
  let fired = false, timer = null;
  const fin = () => { if(fired) return; fired = true; clearTimeout(timer); if(done) done(); };
  timer = setTimeout(fin, 1200 + [...text].length * 280);
  const a = clipAudio(text);
  if(a){
    try {
      if(playingClip && playingClip !== a) playingClip.pause();
      if(ttsOK) safe(() => speechSynthesis.cancel());
      a.currentTime = 0;
      a.onended = fin;
      const pr = a.play();
      playingClip = a;
      if(pr && pr.catch) pr.catch(() => fin());
      return;
    } catch(e) {}
  }
  if(!ttsOK){ audioWarn(); return; }
  if(!ttsSay(text, fin)) audioWarn();
}

function speak(text){
  if(!text) return;
  if(playClip(text)) return;
  ttsSpeak(text);
}
function ttsSpeak(text){
  if(!ttsOK || !text) return;
  if(!ttsSay(text)) audioWarn();
}
/* 음성 합성으로 한 번 말합니다. 끝나면 onend 를 부릅니다.
   페이지에서 처음 누르는 순간에는 잠금 풀기용 빈 말이 먼저 줄에 들어가 있는데,
   그 바로 뒤에 cancel() 과 speak() 를 잇달아 부르면 iOS 사파리와 크롬이 새 말을 소리 없이 버리곤 합니다.
   그래서 말하는 중일 때만 cancel() 하고, 조금 기다려도 말이 시작되지 않으면 한 번 더 말합니다. */
function ttsSay(text, onend){
  if(playingClip){ try { playingClip.pause(); } catch(e) {} }
  let started = false, retried = false;
  const utter = () => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR'; u.rate = .8;
    if(voiceKo) u.voice = voiceKo;
    u.onstart = () => { started = true; };
    u.onend = () => { started = true; if(onend) onend(); };
    u.onerror = ev => {
      if(ev && ev.error !== 'interrupted' && ev.error !== 'canceled'){ audioWarn(); if(onend) onend(); }
    };
    return u;
  };
  return !!safe(() => {
    /* 잠금 풀기용 빈 말만 있을 때는 끊지 않고 그 뒤에 이어 말합니다. */
    if(!unlockBusy && (speechSynthesis.speaking || speechSynthesis.pending)) speechSynthesis.cancel();
    if(speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(utter());
    setTimeout(() => {
      if(started || retried) return;
      retried = true;
      safe(() => {
        if(speechSynthesis.speaking && !speechSynthesis.pending) return;
        speechSynthesis.cancel();
        speechSynthesis.speak(utter());
      });
    }, 650);
    return true;
  });
}

/* ---- 기초 도구 ---- */
function h(tag, attrs, ...kids){
  const el = document.createElement(tag);
  for(const k in (attrs||{})){
    if(k === 'class') el.className = attrs[k];
    else if(k === 'html') el.innerHTML = attrs[k];
    else if(k.startsWith('on')) el.addEventListener(k.slice(2), attrs[k]);
    else el.setAttribute(k, attrs[k]);
  }
  kids.flat().forEach(x => el.append(x));
  return el;
}
const card = document.getElementById('card');
const fb = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const hintToggle = document.getElementById('hintToggle');
const hdrTitle = document.getElementById('hdrTitle');
function setFeedback(msg, kind){
  fb.textContent = msg || '';
  fb.className = 'feedback' + (kind ? ' ' + kind : '');
}
const hintsOn = () => hintToggle.checked;
hintToggle.addEventListener('change', () => {
  document.querySelectorAll('[data-hint]').forEach(el => {
    el.textContent = hintsOn() ? el.dataset.hint : '';
  });
});

/* ---- 캐릭터 -------------------------------------------------
   토리(토끼)  소리와 쓰기: 소리 듣기, 획순, 따라 쓰기, 듣고 고르기, 받아쓰기
   모이(까치)  말 모으기: 글자 조립, 단어 읽기, 모은 말 세기
   담이(호랑이) 이야기와 뿌리: 소리와 글자가 다른 이유
   캐릭터는 반말(담이는 옛날 어른 말투), 화면 안내는 해요체로 씁니다.   */
const NAME = {tori:'토리', moi:'모이', dami:'담이'};
/* 캐릭터 그림은 assets/chars/ 의 3D 그림을 씁니다.
   기분(m)은 ''(보통), 'happy'(정답), 'oops'(오답) 세 가지입니다.
   기분 그림이 없으면 보통 그림을 쓰고, 움직임(hop, tilt)으로 기분을 나타냅니다. */
const CHAR_DIR = DAL_ROOT + 'assets/chars/';
const CHAR_FILES = {
  tori: {'':'tori', happy:'tori-happy', oops:'tori-oops'},
  moi:  {'':'moi',  happy:'moi-happy'},
  dami: {'':'dami', happy:'dami-happy'}
};
function charImg(who, m){
  const f = CHAR_FILES[who][m] || CHAR_FILES[who][''];
  return `<img class="chr" src="${CHAR_DIR}${f}.webp?v=2" alt="" aria-hidden="true" draggable="false" decoding="async">`;
}
const CHAR = {
  tori: m => charImg('tori', m),
  moi:  m => charImg('moi', m),
  dami: m => charImg('dami', m)
};
/* 기분 그림을 미리 불러 두어 바꿀 때 깜빡이지 않게 합니다. */
Object.values(CHAR_FILES).forEach(set => Object.values(set).forEach(f => { const i = new Image(); i.src = CHAR_DIR + f + '.webp?v=2'; }));

/* 화면마다 주 안내 캐릭터가 하나 있고, 정답과 오답에 반응합니다. */
let curGuide = null;
function guide(who, text, side){
  const wrap = h('div', {class:'guide' + (side ? ' side' : ''), 'data-who':who});
  wrap.append(h('div', {class:'guide-fig', html: CHAR[who]('')}),
              h('div', {class:'bubble'}, h('b', {}, NAME[who]), h('span', {}, text)));
  if(!side) curGuide = wrap;
  return wrap;
}
function say(who, text){
  return h('div', {class:'bubble solo'}, h('b', {}, NAME[who]), h('span', {}, text));
}
function react(mood){
  if(!curGuide) return;
  const g = curGuide, who = g.dataset.who;
  g.querySelector('.guide-fig').innerHTML = CHAR[who](mood);
  g.classList.remove('happy', 'oops');
  void g.offsetWidth;
  g.classList.add(mood);
  clearTimeout(react.t);
  react.t = setTimeout(() => {
    g.classList.remove('happy', 'oops');
    g.querySelector('.guide-fig').innerHTML = CHAR[who]('');
  }, 1200);
}
function trio(){
  const t = h('div', {class:'trio'});
  [['tori','소리와 쓰기'], ['moi','말 모으기'], ['dami','옛날 이야기']].forEach(([w, role]) => {
    t.append(h('div', {class:'trio-one'},
      h('div', {html: CHAR[w]('')}), h('b', {}, NAME[w]), h('span', {}, role)));
  });
  return t;
}

/* ---- 진도 (모듈별 별 개수) ---- */

/* ---- 저장소 사용 가능 여부 ---- */
let canStore = false;
try {
  localStorage.setItem('daltokki:probe', '1');
  localStorage.removeItem('daltokki:probe');
  canStore = true;
} catch(e) { canStore = false; }

/* 밤 이름 */
const ORD = ['첫째','둘째','셋째','넷째','다섯째','여섯째','일곱째','여덟째',
  '아홉째','열째','열한째','열두째','열셋째','열넷째','열다섯째'];
const nightName = n => ORD[n - 1] + ' 밤';
/* 밤을 셀 때는 고유어 수사를 씁니다. 2밤이 아니라 두 밤. */
const COUNT = ['한','두','세','네','다섯','여섯','일곱','여덟','아홉','열','열한','열두','열세','열네','열다섯'];

/* 밤 고르기 화면에서는 사이트 처음으로, 밤 안에서는 밤 고르기로 돌아갑니다. */
function setNav(inNight){
  document.getElementById('homeBtn').style.display = inNight ? '' : 'none';
  document.getElementById('siteHome').style.display = inNight ? 'none' : '';
}

/* 달 모양 ----------------------------------------------------
   n번째 모듈은 전체의 n/8 만큼 찬 달입니다. 모듈 1은 초승달, 모듈 8은 보름달.
   한국과 미국(북반구)에서 차오르는 달은 오른쪽부터 밝아지므로
   밝은 부분 = 오른쪽 반원 + 명암 경계선(타원 호)으로 직접 그립니다.
   가리개 원을 덮는 방식은 바탕색이 바뀌면 테두리 밖으로 삐져나와서 쓰지 않습니다.
   다 한 모듈은 밝은 부분이 금색이 됩니다.                                   */
/* total 을 주지 않으면 그 페이지의 밤 수(MODULES.length)를 씁니다. */
function moonSVG(n, size, done, total){
  total = total || (typeof MODULES !== 'undefined' ? MODULES.length : 8);
  const f = Math.max(0, Math.min(1, n / total));
  const cx = 30, cy = 30, r = 24;
  const litColor = done ? '#E3A93C' : '#F5E6BD';
  let lit;
  if(f >= 1){
    const crater = done ? '#C98E26' : '#DCC894';
    lit = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${litColor}"/>
      <g fill="${crater}"><circle cx="23" cy="23" r="4.5"/><circle cx="37" cy="33" r="3.4"/>
      <circle cx="26" cy="39" r="2.6"/><circle cx="38" cy="20" r="2"/></g>`;
  } else {
    const rx = (r * Math.abs(1 - 2 * f)).toFixed(2);
    const sweep = f > 0.5 ? 1 : 0;   /* 반달 전에는 경계선이 오른쪽으로, 이후에는 왼쪽으로 부풉니다 */
    lit = `<path d="M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} A${rx} ${r} 0 0 ${sweep} ${cx} ${cy - r} Z" fill="${litColor}"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 60 60" aria-hidden="true">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#17324A"/>
    ${lit}
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#221F1C" stroke-width="2.5"/>
  </svg>`;
}


function shuffled(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}


/* ══════════════════════════════════════════════════════════════
   소리 환경 안내
   카카오톡 같은 앱 속 브라우저는 음성 합성을 지원하지 않습니다.
   한국어 음성이 없는 기기에서는 브라우저가 오류 없이 조용히 넘어가 버리기도 합니다.
   녹음 파일이 있으면 두 경우 모두 대부분 해결되므로 안내하지 않습니다.
   ══════════════════════════════════════════════════════════════ */
const UA = navigator.userAgent || '';
const ENV = {
  kakao: /KAKAOTALK/i.test(UA),
  ios: /iPhone|iPad|iPod/.test(UA) || (/Macintosh/.test(UA) && navigator.maxTouchPoints > 1),
  android: /Android/i.test(UA),
  windows: /Windows/.test(UA),
  mac: /Macintosh/.test(UA) && !(navigator.maxTouchPoints > 1),
  firefox: /Firefox\//.test(UA)
};
ENV.inapp = ENV.kakao || /Instagram|FBAN|FBAV|FB_IAB|Line\/|NAVER\(inapp|DaumApps|; wv\)/i.test(UA)
  || (ENV.ios && !/Safari\//.test(UA));
let envShown = false;

function koVoiceAvailable(){
  try { return (speechSynthesis.getVoices() || []).some(v => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith('ko')); }
  catch(e) { return false; }
}
function copyAddress(btn){
  const url = location.href;
  const ok = () => { btn.textContent = '복사했어요'; };
  try {
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(ok, fallback); return; }
  } catch(e) {}
  fallback();
  function fallback(){
    const t = document.createElement('textarea');
    t.value = url; document.body.append(t); t.select();
    try { document.execCommand('copy'); ok(); } catch(e) { btn.textContent = url; }
    t.remove();
  }
}
function clipsComplete(){
  /* 녹음 목록(listClips)은 달 페이지에만 있습니다. 없는 페이지에서는 녹음실이 manifest 에 적어 둔 complete 를 믿습니다. */
  try { return !!CLIPS && (typeof listClips === 'function' ? listClips().every(c => CLIPS[c.id]) : CLIPS_COMPLETE); } catch(e) { return false; }
}
function envMessage(){
  if(clipsComplete()) return null;
  if(ENV.kakao) return {title:'카카오톡 안에서 열려 있어요',
    body:'카카오톡 안의 브라우저에서는 소리가 나지 않을 수 있어요. 아래 버튼을 누르거나, 오른쪽 위 더보기 메뉴에서 \u2018다른 브라우저로 열기\u2019를 눌러 주세요.',
    open:'kakaotalk://web/openExternal?url=' + encodeURIComponent(location.href)};
  if(ENV.inapp) return {title:'앱 안의 브라우저에서 열려 있어요',
    body:'이 화면에서는 소리가 나지 않을 수 있어요. 메뉴에서 \u2018브라우저로 열기\u2019를 누르거나, 주소를 복사해서 ' + (ENV.ios ? '사파리' : '크롬') + '에 붙여 넣어 주세요.'};
  if(ttsOK && koVoiceAvailable()) return null;
  if(ENV.firefox) return {title:'파이어폭스에서는 한국어 음성을 찾지 못했어요',
    body:'파이어폭스는 기기에 깔린 음성만 쓸 수 있어요. 크롬이나 엣지, 사파리로 열면 소리가 나요.'};
  if(ENV.ios) return {title:'이 기기에서 한국어 음성을 찾지 못했어요',
    body:'설정에서 \u2018음성\u2019을 검색해 한국어 음성을 내려받으면 소리가 나요. 내려받은 뒤에는 이 페이지를 새로 고쳐 주세요.'};
  if(ENV.android) return {title:'이 휴대전화에서 한국어 음성을 찾지 못했어요',
    body:'휴대전화 설정에서 \u2018텍스트 음성 변환\u2019을 찾아 한국어 음성 데이터를 내려받으면 소리가 나요. 크롬 브라우저로 열어 보는 것도 방법이에요.'};
  if(ENV.windows) return {title:'이 컴퓨터에서 한국어 음성을 찾지 못했어요',
    body:'크롬이나 엣지로 열어 보세요. 그래도 소리가 안 나면 윈도우 설정에서 \u2018음성\u2019을 찾아 한국어 음성을 추가해 주세요.'};
  if(ENV.mac) return {title:'이 컴퓨터에서 한국어 음성을 찾지 못했어요',
    body:'시스템 설정에서 \u2018음성\u2019을 검색해 한국어 음성을 추가하거나, 크롬이나 사파리로 열어 보세요.'};
  return {title:'이 브라우저에서 한국어 음성을 찾지 못했어요', body:'크롬이나 사파리로 열어 보세요.'};
}
function showEnvNote(){
  if(envShown) return;
  const m = envMessage();
  if(!m) return;
  envShown = true;
  const box = document.getElementById('envNote');
  box.innerHTML = '';
  const row = h('div', {class:'row'});
  if(m.open) row.append(h('a', {class:'primary', href:m.open}, '다른 브라우저로 열기'));
  if(ENV.inapp){ const c = h('button', {}, '주소 복사'); c.addEventListener('click', () => copyAddress(c)); row.append(c); }
  row.append(h('button', {onclick: () => { box.hidden = true; }}, '닫기'));
  box.append(h('b', {}, m.title), h('p', {}, m.body), row);
  box.hidden = false;
}
/* 녹음 목록과 음성 목록이 둘 다 준비된 뒤에 한 번만 판단합니다. */
(function(){
  let voicesSettled = !ttsOK, fired = false;
  const tryShow = () => { if(!fired && clipsReady && voicesSettled){ fired = true; showEnvNote(); } };
  if(ttsOK){
    const settle = () => { voicesSettled = true; tryShow(); };
    if(koVoiceAvailable()) settle();
    safe(() => speechSynthesis.addEventListener('voiceschanged', () => { if(koVoiceAvailable()) settle(); }));
    setTimeout(settle, 1500);
  }
  document.addEventListener('clipsready', tryShow);
  tryShow();
})();


/* ══════════════════════════════════════════════════════════════
   받아쓰기실
   오늘의 방아: 하루 다섯 낱말. 아이가 마친 밤의 낱말만 나옵니다.
   틀린 말은 다음 날, 맞힌 말은 며칠 뒤에 다시 나옵니다(간격 반복).
   틀리면 정답을 바로 보여 주지 않고, 무엇이 다른지 알려 준 뒤 한 번 더 쓰게 합니다.
   오류는 자모 단위로 비교해 유형을 나눕니다. 유형과 설명은 DERR 한곳에 모여 있어서
   실제 아이들의 실수를 보고 쉽게 고칠 수 있습니다.
   ══════════════════════════════════════════════════════════════ */
const DKEY = 'daltokki:v1:dictation';

const BOX_DAYS = [0, 1, 3, 7, 16, 35];

function todayStr(add){
  const d = window.__today ? new Date(window.__today + 'T12:00:00') : new Date();
  if(add) d.setDate(d.getDate() + add);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function loadDict(){
  const empty = {words:{}, days:0, last:'', errs:{}};
  if(!canStore) return empty;
  try {
    const d = JSON.parse(localStorage.getItem(DKEY) || 'null');
    if(d && typeof d === 'object') return {
      words: d.words && typeof d.words === 'object' ? d.words : {},
      days: Number(d.days) || 0, last: typeof d.last === 'string' ? d.last : '',
      errs: d.errs && typeof d.errs === 'object' ? d.errs : {}};
  } catch(e) {}
  return empty;
}
let dstate = loadDict();
function saveDict(){ if(!canStore) return; try { localStorage.setItem(DKEY, JSON.stringify(dstate)); } catch(e) {} }

/* ---- 자모 비교 ---- */
function decomp(syl){
  const c = syl.charCodeAt(0) - 0xAC00;
  if(c < 0 || c > 11171) return null;
  return [CHO[Math.floor(c / 588)], JUNG[Math.floor(c % 588 / 28)], JONG[c % 28]];
}
const SPLIT = {'ㄳ':['ㄱ','ㅅ'],'ㄵ':['ㄴ','ㅈ'],'ㄶ':['ㄴ','ㅎ'],'ㄺ':['ㄹ','ㄱ'],'ㄻ':['ㄹ','ㅁ'],'ㄼ':['ㄹ','ㅂ'],
               'ㄽ':['ㄹ','ㅅ'],'ㄾ':['ㄹ','ㅌ'],'ㄿ':['ㄹ','ㅍ'],'ㅀ':['ㄹ','ㅎ'],'ㅄ':['ㅂ','ㅅ']};
const FAM = {'ㄱ':'g','ㄲ':'g','ㅋ':'g','ㄷ':'d','ㄸ':'d','ㅌ':'d','ㅂ':'b','ㅃ':'b','ㅍ':'b','ㅅ':'s','ㅆ':'s','ㅈ':'j','ㅉ':'j','ㅊ':'j'};
const TENSE = 'ㄲㄸㅃㅆㅉ', ASP = 'ㅋㅌㅍㅊ';
const MERGED = [['ㅐ','ㅔ'], ['ㅒ','ㅖ'], ['ㅙ','ㅚ','ㅞ']];
const GLIDE = {'ㅏ':'ㅑ','ㅓ':'ㅕ','ㅗ':'ㅛ','ㅜ':'ㅠ','ㅐ':'ㅒ','ㅔ':'ㅖ'};
const PRIORITY = ['double','same','miss_jong','jong_sound','extra_jong','tense','glide','merged','vowel','cho','length','blank'];

/* 쓴 답과 정답을 자모 단위로 비교해 오류 목록을 돌려줍니다. 가장 중요한 오류가 맨 앞입니다. */
function diagnose(typed, target){
  if(!typed) return [{type:'blank', pos:-1}];
  const T = [...target], Y = [...typed];
  if(T.length !== Y.length) return [{type:'length', pos:-1}];
  const out = [];
  for(let i = 0; i < T.length; i++){
    if(T[i] === Y[i]) continue;
    const t = decomp(T[i]), y = decomp(Y[i]);
    if(!t || !y){ out.push({type:'cho', pos:i}); continue; }
    const [tc, tv, tj] = t, [yc, yv, yj] = y;
    if(tc !== yc) out.push({type: FAM[tc] && FAM[tc] === FAM[yc] ? 'tense' : 'cho', pos:i, t:tc, y:yc});
    if(tv !== yv){
      const merged = MERGED.some(g => g.includes(tv) && g.includes(yv));
      const glide = GLIDE[tv] === yv || GLIDE[yv] === tv;
      out.push({type: merged ? 'merged' : glide ? 'glide' : 'vowel', pos:i, t:tv, y:yv});
    }
    if(tj !== yj){
      let type;
      if(tj && !yj) type = 'miss_jong';
      else if(!tj && yj) type = 'extra_jong';
      else if(SPLIT[tj]) type = (SPLIT[tj].includes(yj) || JONG_REP[yj] === JONG_REP[tj]) ? 'double' : 'jong_sound';
      else type = (JONG_REP[yj] && JONG_REP[yj] === JONG_REP[tj]) ? 'same' : 'jong_sound';
      out.push({type, pos:i, t:tj, y:yj});
    }
  }
  if(!out.length) out.push({type:'cho', pos:-1});
  return out.sort((a, b) => PRIORITY.indexOf(a.type) - PRIORITY.indexOf(b.type));
}

/* 받침 뒤에 모음이 오면 숨어 있던 받침이 드러납니다. 옷 + 에 → [오세], 닭 + 에 → [달게], 앉 + 아요 → [안자요]
   ㄷ, ㅌ 받침 뒤에 이가 오면 [지], [치]로 바뀌므로(구개음화) 명사에는 이 대신 에를 붙입니다. */
function linkVowel(syl, vowel){
  const [c, v, j] = decomp(syl);
  if(!j || j === 'ㅇ') return [syl, compose('ㅇ', vowel)];
  if(j === 'ㅎ') return [compose(c, v), compose('ㅇ', vowel)];
  if(SPLIT[j]){
    let [j1, j2] = SPLIT[j];
    if(j2 === 'ㅎ') return [compose(c, v), compose(j1, vowel)];
    if(j2 === 'ㅅ' && (j1 === 'ㄱ' || j1 === 'ㅂ')) j2 = 'ㅆ';
    return [compose(c, v, j1), compose(j2, vowel)];
  }
  return [compose(c, v), compose(j, vowel)];
}
function rootExample(word){
  const S = [...word];
  if(S.length >= 2 && S[S.length - 1] === '다'){
    const stem = S.slice(0, -1), last = stem[stem.length - 1], v = decomp(last)[1];
    const vowel = (v === 'ㅏ' || v === 'ㅗ') ? 'ㅏ' : 'ㅓ';
    const [a, b] = linkVowel(last, vowel);
    return {tail: vowel === 'ㅏ' ? '아요' : '어요', pron: stem.slice(0, -1).join('') + a + b + '요'};
  }
  const [a, b] = linkVowel(S[S.length - 1], 'ㅔ');
  return {tail: '에', pron: S.slice(0, -1).join('') + a + b};
}
const iya = w => w + (jongseong(w) > 0 ? '이야' : '야');
const iranda = w => w + (jongseong(w) > 0 ? '이란다' : '란다');
function rootLine(w){
  const ex = rootExample(w);
  return '뒤에 \u2018' + ex.tail + '\u2019를 붙이면 [' + ex.pron + ']' + (jongseong(ex.pron) > 0 && jongseong(ex.pron) !== 8 ? '으로' : '로') + ' 소리 나지.';
}

/* 오류 유형: 누가 설명하는지, 부모님께 어떻게 보여 줄지, 첫 번째 힌트, 정답을 보여 줄 때의 말 */
const DERR = {
  double:     {who:'dami', parent:'겹받침 (닭을 닥으로 쓰는 식)',
               hint: (e, w) => '받침이 두 개인 말이란다. ' + rootLine(w) + ' 숨어 있던 받침을 찾아보거라.'},
  same:       {who:'dami', parent:'소리 나는 대로 받침 쓰기 (옷을 옫으로 쓰는 식)',
               hint: (e, w) => '소리는 잘 들었구나. 그런데 글자는 소리와 조금 다르단다. ' + rootLine(w) + ' 숨어 있던 받침을 찾아보거라.'},
  miss_jong:  {who:'tori', parent:'받침 빠뜨리기 (산을 사로 쓰는 식)', hint: () => '끝에 받침이 있어. 끝소리를 다시 잘 들어 봐.'},
  jong_sound: {who:'tori', parent:'받침 소리 구별 (산과 상)', hint: () => '받침 소리가 달라. 입을 다무는지, 혀가 올라가는지, 코로 울리는지 잘 들어 봐.'},
  extra_jong: {who:'tori', parent:'없는 받침 쓰기', hint: () => '받침이 없는 글자가 있어. 다시 들어 봐.'},
  tense:      {who:'tori', parent:'예사소리, 된소리, 거센소리 구별 (토끼를 토기로 쓰는 식)',
               hint: e => TENSE.includes(e.t) ? '목에 힘을 꽉 준 소리야. 쌍둥이 자음을 떠올려 봐.'
                        : ASP.includes(e.t) ? '숨이 세게 터져 나오는 소리야. 손바닥을 입 앞에 대고 들어 봐.'
                        : '힘을 빼고 부드럽게 내는 소리야.'},
  glide:      {who:'tori', parent:'이중모음 (여우를 어우로 쓰는 식)',
               hint: e => GLIDE[e.y] === e.t ? '모음에 획이 하나 더 있어. 다시 들어 봐.' : '획이 하나 적은 모음이야. 다시 들어 봐.'},
  merged:     {who:'tori', parent:'소리가 같은 모음 (가게를 가개로 쓰는 식)',
               hint: () => '이 모음은 요즘 소리가 똑같아서 귀로는 구별이 안 돼. 뜻을 생각하면서 골라 봐.'},
  vowel:      {who:'tori', parent:'모음 구별 (오와 우)', hint: () => '모음을 다시 잘 들어 봐. 입을 크게 벌리는지, 동그랗게 모으는지.'},
  cho:        {who:'tori', parent:'첫소리 자음', hint: () => '첫소리를 다시 잘 들어 봐.'},
  length:     {who:'tori', parent:'글자 수', hint: () => '글자 수가 달라. 몇 글자로 들리는지 세어 봐.'},
  blank:      {who:'tori', parent:'모르겠어요를 누른 경우', hint: () => '괜찮아. 한 번 더 들어 보고 아는 데까지만 써 봐.'}
};
function revealLine(type, w){
  if(type === 'double' || type === 'same') return '정답은 ' + iranda(w) + '. ' + rootLine(w);
  if(type === 'blank') return '괜찮아. 정답은 ' + iya(w) + '. 내일 다시 나올 거야.';
  return '정답은 ' + iya(w) + '. 내일 다시 나올 거야.';
}

