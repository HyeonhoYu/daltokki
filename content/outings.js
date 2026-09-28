/* ══════════════════════════════════════════════════════════════
   달토끼 나들이
   일곱 달 과정 옆에 두는 세 밤짜리 주제 꾸러미입니다. 과정 순서와 상관없이 골라서 합니다.
   꾸러미마다 몇째 달을 마친 아이에게 알맞은지 묶음 설명에 적어 둡니다.
   꾸러미: 전래 놀이, 한국 여행 지도, 명절 더 알기, 우리 집 요리, 속담.

   이 파일은 content/second-moon.js 부터 seventh-moon.js 까지 다음에 불러옵니다.
   앞 달의 그림(M7_PIC 안에 앞 달 그림 모두 포함)을 그대로 빌려 쓰고, 나들이 그림만 OUT_ONLY 에 더합니다.
   밤 번호는 꾸러미를 이어서 셉니다(전래 놀이 1~3, 한국 여행 4~6, 명절 7~9, 요리 10~12, 속담 13~15).
   ══════════════════════════════════════════════════════════════ */

const OUT_TOTAL = 15;

/* ---- 전래 놀이 그림 ---- */
function outPlay(kind){
  const S = '#221F1C';
  const stone = (x, y, c) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="7" fill="${c}" stroke="${S}" stroke-width="2"/><ellipse cx="${x - 3}" cy="${y - 2}" rx="3" ry="2" fill="#fff" opacity=".4"/>`;
  const ddakji = (x, y, k, c1, c2) => `<g transform="translate(${x} ${y}) scale(${k || 1})"><rect x="-26" y="-26" width="52" height="52" fill="${c1}" stroke="${S}" stroke-width="2.4"/>
    <path d="M-26 -26 L0 0 L26 -26 M-26 26 L0 0 L26 26" stroke="${S}" stroke-width="1.8" fill="none"/><path d="M-26 -26 L0 0 L-26 26 Z" fill="${c2}" stroke="${S}" stroke-width="1.8"/><path d="M26 -26 L0 0 L26 26 Z" fill="${c2}" stroke="${S}" stroke-width="1.8"/></g>`;
  const jegi = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="12" ry="5" fill="#8A6A4A" stroke="${S}" stroke-width="2"/>
    ${[-10, -5, 0, 5, 10].map((dx, i) => `<path d="M${dx / 2} -2 Q${dx} -22 ${dx * 1.8} -40" stroke="${['#C1403A', '#F2C14E', '#2D6E8E', '#6E8F58', '#D98B7E'][i]}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  const top = (x, y) => `<g transform="translate(${x} ${y})"><path d="M-22 -30 L22 -30 L0 10 Z" fill="#C1403A" stroke="${S}" stroke-width="2.4" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-30" rx="22" ry="7" fill="#F2C14E" stroke="${S}" stroke-width="2.2"/><path d="M-14 -18 L14 -18 M-8 -6 L8 -6" stroke="#FBF7EC" stroke-width="2.4"/>
    <path d="M-34 -6 q-6 -6 0 -12 M34 -6 q6 -6 0 -12" stroke="#8C7F63" stroke-width="2" fill="none"/></g>`;
  const floor = '<path d="M8 120 L192 120" stroke="#221F1C" stroke-width="2.6"/>';
  const g = {
    gonggi: `${floor}${stone(60, 108, '#C1403A')}${stone(86, 112, '#F2C14E')}${stone(112, 108, '#2D6E8E')}${stone(138, 112, '#6E8F58')}${stone(100, 50, '#D98B7E')}
      <path d="M100 62 L100 96" stroke="#8C7F63" stroke-width="2" stroke-dasharray="4 4"/><path d="M92 70 L100 60 L108 70" stroke="#8C7F63" stroke-width="2" fill="none"/>`,
    ddakji: `${floor}${ddakji(80, 90, 1, '#2D6E8E', '#9DC3DC')}${ddakji(136, 96, .8, '#C1403A', '#E8A0A0')}`,
    jegi: `${floor}${jegi(100, 70)}${m2Person('kid', 60, 'stand', 1)}<path d="M72 112 Q88 100 92 84" stroke="#8C7F63" stroke-width="2" fill="none" stroke-dasharray="4 3"/>`,
    top: `${floor}${top(100, 108)}`,
    yut: M6_PIC.seol_yut ? M6_PIC.seol_yut.replace(/<\/?svg[^>]*>/g, '') : '',
    throw: `${floor}${m2Person('kid', 70, 'wave', 1)}${stone(108, 30, '#D98B7E')}<path d="M84 50 Q96 36 104 36" stroke="#8C7F63" stroke-width="2" fill="none" stroke-dasharray="4 3"/>`,
    kick: `${floor}${m2Person('kid', 80, 'walk', 1)}${jegi(120, 70)}<path d="M96 116 Q110 100 118 82" stroke="#8C7F63" stroke-width="2" fill="none" stroke-dasharray="4 3"/>`,
    hit: `${floor}${ddakji(130, 108, .6, '#2D6E8E', '#9DC3DC')}${m2Person('kid', 70, 'give', 1)}
      <g transform="translate(112 80) rotate(-30)"><rect x="-20" y="-20" width="40" height="40" fill="#C1403A" stroke="${S}" stroke-width="2.2"/></g><path d="M140 88 l8 -8 M146 96 l10 -4" stroke="#E3A93C" stroke-width="3" stroke-linecap="round"/>`,
    spin: `${floor}${top(120, 110)}${m2Person('kid', 60, 'give', 1)}<path d="M76 90 Q100 84 118 90" stroke="#8A6A4A" stroke-width="2.4" fill="none"/>`,
    win: `${floor}${m2Person('kid', 70, 'wave', 1)}${m2Person('friend', 136, 'stand', -1)}<g fill="#E3A93C" stroke="${S}" stroke-width="1.2"><path d="M60 16 l3 6 l6 1 l-5 4 l2 6 l-6 -3 l-6 3 l2 -6 l-5 -4 l6 -1 Z"/></g>`,
    lose: `${floor}${m2Person('kid', 70, 'stand', 1)}${m2Person('friend', 136, 'wave', -1)}<path d="M62 26 q-3 7 0 9 q3 -2 0 -9" fill="#9DB4C6" stroke="${S}" stroke-width="1.4"/>`,
    turn: `${floor}${m2Person('kid', 60, 'stand', 1)}${m2Person('friend', 140, 'give', -1)}<path d="M84 60 Q100 44 116 60" stroke="#C1403A" stroke-width="3" fill="none"/><path d="M110 54 L118 62 L108 64" stroke="#C1403A" stroke-width="3" fill="none"/>`,
    f1: `${floor}<rect x="30" y="50" width="140" height="20" fill="#2D6E8E" stroke="${S}" stroke-width="2.2"/><rect x="30" y="80" width="140" height="20" fill="#C1403A" stroke="${S}" stroke-width="2.2"/>`,
    f2: `${floor}<rect x="30" y="56" width="140" height="18" fill="#2D6E8E" stroke="${S}" stroke-width="2.2"/><rect x="91" y="4" width="18" height="120" fill="#C1403A" stroke="${S}" stroke-width="2.2"/>`,
    f3: `${floor}<rect x="70" y="40" width="60" height="50" fill="#2D6E8E" stroke="${S}" stroke-width="2.2"/><path d="M70 40 L100 65 L70 90 Z" fill="#C1403A" stroke="${S}" stroke-width="2"/>
      <path d="M130 40 L100 65 L130 90" fill="none" stroke="${S}" stroke-width="2"/><path d="M150 50 Q160 64 146 76" stroke="#8C7F63" stroke-width="2" fill="none"/><path d="M142 70 L146 78 L154 74" stroke="#8C7F63" stroke-width="2" fill="none"/>`,
    f4: `${floor}${ddakji(100, 70, 1.3, '#2D6E8E', '#C1403A')}<g fill="#E3A93C" stroke="${S}" stroke-width="1.2"><path d="M160 30 l3 6 l6 1 l-5 4 l2 6 l-6 -3 l-6 3 l2 -6 l-5 -4 l6 -1 Z"/></g>`
  }[kind];
  const label = {gonggi:'공기놀이', ddakji:'딱지', jegi:'제기', top:'팽이', yut:'윷놀이', throw:'던져요', kick:'차요', hit:'쳐요', spin:'돌려요', win:'이겼어요', lose:'졌어요', turn:'차례',
    f1:'종이 두 장을 길게 접어요', f2:'십자 모양으로 겹쳐 놓아요', f3:'끝을 접어 넣어요', f4:'딱지가 완성됐어요'}[kind];
  return `<svg viewBox="0 0 200 130" width="150" height="98" role="img" aria-label="${label}">${g}</svg>`;
}
const OUT_ONLY = {};
['gonggi', 'ddakji', 'jegi', 'top', 'yut', 'throw', 'kick', 'hit', 'spin', 'win', 'lose', 'turn', 'f1', 'f2', 'f3', 'f4'].forEach(k => { OUT_ONLY['play_' + k] = outPlay(k); });
/* ---- 한국 여행 지도 그림 ----
   지도는 남한을 단순한 모양으로 그리고 도시 이름은 쓰지 않습니다(지도에서 찾기의 답이 보이지 않게).
   위쪽이 북쪽입니다. 누를 수 있는 영역은 넷째 달 동네 지도와 같은 방식(data-spot)입니다. */
const outSpot = (id, label, x, y, w, hh) => `<g data-spot="${id}" data-label="${label}"><rect class="hot" x="${x}" y="${y}" width="${w}" height="${hh}" rx="12"/></g>`;
const OUT_KOREA = `<rect width="400" height="260" fill="#CFE0EA"/>
  <path d="M150 14 L270 8 Q286 40 282 80 Q288 120 276 160 Q272 190 262 204 Q236 214 210 206 Q186 214 160 206 Q140 196 136 176 Q124 160 134 140 Q122 120 136 104 Q126 88 140 74 Q130 56 146 44 Q138 30 150 14 Z"
    fill="#DCEBD6" stroke="#221F1C" stroke-width="3" stroke-linejoin="round"/>
  <path d="M190 60 Q220 90 214 130 Q230 160 250 176" stroke="#9DBA7E" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
  <ellipse cx="176" cy="240" rx="30" ry="12" fill="#DCEBD6" stroke="#221F1C" stroke-width="3"/><path d="M170 236 L176 230 L182 236 Z" fill="#6E8F58"/>
  ${[[166, 58], [262, 150], [254, 190], [176, 240]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#C1403A" stroke="#221F1C" stroke-width="2"/>`).join('')}
  <g font-family="sans-serif" font-weight="700" font-size="14" fill="#17324A"><text x="372" y="30" text-anchor="middle">N</text></g>
  <path d="M372 36 L372 60 M366 44 L372 36 L378 44" stroke="#17324A" stroke-width="2.4" fill="none"/>`;
function outTrip(kind){
  const S = '#221F1C', floor = '<path d="M8 120 L192 120" stroke="#221F1C" stroke-width="2.6"/>';
  const g = {
    map: OUT_KOREA.replace('<rect width="400" height="260" fill="#CFE0EA"/>', '<rect width="400" height="260" fill="#CFE0EA"/>'),
    palace: `<rect width="200" height="130" rx="6" fill="#DCEBD6"/>${floor}
      <path d="M36 60 Q100 30 164 60 Q158 66 150 64 L50 64 Q42 66 36 60 Z" fill="#3E5B4A" stroke="${S}" stroke-width="2.6"/>
      <rect x="52" y="64" width="96" height="24" fill="#C1403A" stroke="${S}" stroke-width="2.4"/>
      <path d="M44 88 Q100 72 156 88 Q150 94 142 92 L58 92 Q50 94 44 88 Z" fill="#3E5B4A" stroke="${S}" stroke-width="2.4"/>
      <rect x="48" y="92" width="104" height="28" fill="#E0C49A" stroke="${S}" stroke-width="2.4"/>
      ${[64, 90, 116].map(x => `<rect x="${x}" y="98" width="20" height="22" rx="10" fill="#5A5248" stroke="${S}" stroke-width="2"/>`).join('')}`,
    river: `<rect width="200" height="130" rx="6" fill="#DCEBD6"/><path d="M0 70 Q60 60 100 76 Q150 92 200 80 L200 110 Q150 120 100 106 Q60 92 0 100 Z" fill="#6FA8D0" stroke="${S}" stroke-width="2"/>
      <path d="M20 66 L180 66" stroke="#5A5248" stroke-width="6"/>${[40, 80, 120, 160].map(x => `<path d="M${x} 66 L${x} 96" stroke="#5A5248" stroke-width="4"/>`).join('')}
      ${[30, 60, 150, 172].map((x, i) => `<rect x="${x}" y="${20 + (i % 2) * 10}" width="16" height="${30 - (i % 2) * 10}" fill="#9DB4C6" stroke="${S}" stroke-width="1.6"/>`).join('')}`,
    beach: `<rect width="200" height="130" rx="6" fill="#CFE0EA"/><path d="M0 70 Q50 64 100 70 T200 70 L200 96 L0 96 Z" fill="#2D6E8E" stroke="${S}" stroke-width="1.6"/>
      <path d="M0 96 L200 96 L200 130 L0 130 Z" fill="#E7D2A8"/><circle cx="160" cy="26" r="14" fill="#F2C14E" stroke="${S}" stroke-width="2"/>
      <path d="M64 126 L66 96" stroke="${S}" stroke-width="2.4"/><path d="M40 98 Q66 72 92 98 Z" stroke="${S}" stroke-width="2.4" fill="#C1403A"/>`,
    tower: `<rect width="200" height="130" rx="6" fill="#DCEBD6"/>${floor}
      <path d="M78 120 Q70 90 84 70 Q88 56 88 40 L112 40 Q112 56 116 70 Q130 90 122 120 Z" fill="#E0C49A" stroke="${S}" stroke-width="2.6"/>
      ${[52, 64, 76, 88, 100, 112].map(y => `<path d="M${80 + (y < 80 ? 6 : 0)} ${y} L${120 - (y < 80 ? 6 : 0)} ${y}" stroke="#B08452" stroke-width="1.6"/>`).join('')}
      <rect x="93" y="76" width="14" height="12" fill="#5A5248"/><rect x="84" y="30" width="32" height="10" fill="#E0C49A" stroke="${S}" stroke-width="2.2"/>`,
    hallasan: `<rect width="200" height="130" rx="6" fill="#CFE0EA"/><path d="M0 120 Q60 36 90 30 L110 30 Q140 36 200 120 Z" fill="#9DBA7E" stroke="${S}" stroke-width="2.6"/>
      <ellipse cx="100" cy="32" rx="12" ry="4" fill="#6FA8D0" stroke="${S}" stroke-width="1.6"/>`,
    tangerine: `<ellipse cx="100" cy="108" rx="70" ry="12" fill="#E0C49A"/>${[[74, 88], [106, 92], [138, 88], [90, 64], [122, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="17" fill="#E3A93C" stroke="${S}" stroke-width="2.4"/><path d="M${x} ${y - 17} q6 -8 12 -4" stroke="#6E8F58" stroke-width="3" fill="none"/>`).join('')}`,
    ship: `<rect width="200" height="130" rx="6" fill="#CFE0EA"/><path d="M0 90 Q50 84 100 90 T200 90 L200 130 L0 130 Z" fill="#2D6E8E"/>
      <path d="M40 80 L160 80 L144 102 L56 102 Z" fill="#FBF7EC" stroke="${S}" stroke-width="2.6"/><rect x="74" y="56" width="52" height="24" fill="#FBF7EC" stroke="${S}" stroke-width="2.4"/>
      ${[82, 96, 110].map(x => `<circle cx="${x + 4}" cy="68" r="4" fill="#9DB4C6" stroke="${S}" stroke-width="1.4"/>`).join('')}<rect x="92" y="40" width="10" height="16" fill="#C1403A" stroke="${S}" stroke-width="2"/>`
  }[kind];
  const label = {map:'한국 지도', palace:'경복궁', river:'한강', beach:'해운대', tower:'첨성대', hallasan:'한라산', tangerine:'귤', ship:'배'}[kind];
  const vb = kind === 'map' ? '0 0 400 260' : '0 0 200 130';
  return `<svg viewBox="${vb}" width="150" height="98" role="img" aria-label="${label}">${g}</svg>`;
}
['map', 'palace', 'river', 'beach', 'tower', 'hallasan', 'tangerine', 'ship'].forEach(k => { OUT_ONLY['trip_' + k] = outTrip(k); });
/* 지도에서 찾기용: 도시 자리에 누를 영역을 붙인 큰 지도 */
OUT_ONLY.trip_mapfind = `<svg viewBox="0 0 400 260" role="img" aria-label="한국 지도">${OUT_KOREA}
  ${outSpot('seoul', '서울', 140, 34, 52, 46)}${outSpot('gyeongju', '경주', 238, 124, 50, 44)}${outSpot('busan', '부산', 226, 172, 52, 38)}${outSpot('jeju', '제주도', 136, 222, 80, 36)}</svg>`;
/* ---- 명절 더 알기, 우리 집 요리, 속담 그림 ---- */
function outMore(kind){
  const S = '#221F1C', floor = '<path d="M8 120 L192 120" stroke="#221F1C" stroke-width="2.6"/>';
  const bowl = (fill, top, inner) => `<path d="M40 56 L160 56 Q156 106 100 108 Q44 106 40 56 Z" fill="${fill}" stroke="${S}" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="100" cy="56" rx="60" ry="12" fill="${top}" stroke="${S}" stroke-width="2.6"/>${inner || ''}`;
  const g = {
    /* 명절 */
    nuts: `<ellipse cx="100" cy="100" rx="70" ry="14" fill="#E0C49A" stroke="${S}" stroke-width="2"/>
      ${[[70, 84], [98, 88], [126, 84]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="#B08452" stroke="${S}" stroke-width="2.2"/><path d="M${x} ${y - 15} L${x} ${y + 15} M${x - 8} ${y - 6} q8 6 0 12 M${x + 8} ${y - 6} q-8 6 0 12" stroke="#8A6A4A" stroke-width="1.6" fill="none"/>`).join('')}
      ${[[84, 64], [112, 66]].map(([x, y]) => `<path d="M${x - 12} ${y} q0 -10 12 -8 q12 -2 12 8 q0 10 -12 8 q-12 2 -12 -8 Z" fill="#E3C28A" stroke="${S}" stroke-width="2"/>`).join('')}`,
    ogokbap: bowl('#FBF7EC', '#E7DCC4', `<g>${[[70, 50], [84, 54], [98, 48], [112, 54], [126, 50], [92, 58], [108, 60]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${['#8A1F1A', '#E3A93C', '#5A5248', '#FBF7EC', '#C1403A', '#E3A93C', '#8A1F1A'][i]}"/>`).join('')}</g>`),
    kite: `<rect width="200" height="130" rx="6" fill="#CFE0EA"/><g transform="rotate(-10 110 50)"><rect x="84" y="20" width="52" height="64" fill="#FBF7EC" stroke="${S}" stroke-width="2.6"/>
      <circle cx="110" cy="52" r="10" fill="#CFE0EA" stroke="${S}" stroke-width="2"/><path d="M84 20 L136 84 M136 20 L84 84" stroke="${S}" stroke-width="1.6"/><rect x="84" y="20" width="52" height="10" fill="#C1403A"/></g>
      <path d="M104 82 Q80 100 60 124" stroke="#8C7F63" stroke-width="2" fill="none"/>${m2Person('kid', 50, 'wave', 1).replace('translate(50 122)', 'translate(50 128)')}`,
    moonview: `<rect width="200" height="130" rx="6" fill="#17324A"/><circle cx="140" cy="40" r="24" fill="#F6E3A1" stroke="${S}" stroke-width="2.4"/>
      <path d="M0 116 L200 116 L200 130 L0 130 Z" fill="#3E5B4A"/>${m2Person('kid', 60, 'wave', 1).replace('translate(60 122)', 'translate(60 118)')}`,
    swing: `<rect width="200" height="130" rx="6" fill="#DCEBD6"/><path d="M40 10 L160 10" stroke="#8A6A4A" stroke-width="8"/>
      <g transform="rotate(18 100 10)"><path d="M86 10 L86 96 M114 10 L114 96" stroke="#8C7F63" stroke-width="2.4"/><rect x="80" y="94" width="40" height="6" fill="#8A6A4A" stroke="${S}" stroke-width="1.6"/>
      ${m6Hanbok(100, .7).replace('translate(100 122)', 'translate(100 96)')}</g>`,
    ssireum: `${floor}<ellipse cx="100" cy="118" rx="80" ry="8" fill="#E7D2A8"/>
      ${m2Person('kid', 82, 'give', 1)}${m2Person('friend', 118, 'give', -1).replace('#C1403A', '#2D6E8E')}<path d="M88 92 L112 92" stroke="#C1403A" stroke-width="5"/>`,
    patjuk: bowl('#FBF7EC', '#8A1F1A', `${[[80, 52], [100, 58], [120, 52], [92, 48], [110, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#FBF7EC" stroke="#C9C0AE" stroke-width="1.2"/>`).join('')}
      <path d="M86 40 Q82 30 88 22 M112 40 Q108 30 114 22" stroke="#8C7F63" stroke-width="2.4" fill="none" stroke-linecap="round"/>`),
    longnight: `<rect width="200" height="130" rx="6" fill="#17324A"/><circle cx="60" cy="40" r="18" fill="#F6E3A1" stroke="${S}" stroke-width="2"/>
      <g fill="#F5E6BD">${[[120, 30], [150, 50], [170, 20], [100, 60], [30, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`).join('')}</g>
      <rect x="120" y="70" width="60" height="44" rx="4" fill="#FBF7EC" stroke="${S}" stroke-width="2"/><path d="M150 76 L150 92 L162 100" stroke="${S}" stroke-width="3" fill="none"/>`,
    /* 요리 */
    knife: `<path d="M40 70 L130 60 Q150 60 160 70 L130 80 Z" fill="#D8D4C8" stroke="${S}" stroke-width="2.4"/><rect x="20" y="64" width="26" height="14" rx="4" fill="#8A6A4A" stroke="${S}" stroke-width="2"/>
      <rect x="40" y="90" width="120" height="20" rx="4" fill="#E0C49A" stroke="${S}" stroke-width="2.4"/>`,
    pot: `<path d="M50 50 L150 50 L146 104 Q144 112 136 112 L64 112 Q56 112 54 104 Z" fill="#8C8577" stroke="${S}" stroke-width="3"/>
      <rect x="44" y="44" width="112" height="10" rx="4" fill="#A9B6BF" stroke="${S}" stroke-width="2.4"/><path d="M40 60 L30 60 M160 60 L170 60" stroke="${S}" stroke-width="6" stroke-linecap="round"/>
      <path d="M80 34 Q76 24 82 16 M100 34 Q96 24 102 16 M120 34 Q116 24 122 16" stroke="#C9C0AE" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    spoons: `<ellipse cx="80" cy="40" rx="12" ry="16" fill="#D8D4C8" stroke="${S}" stroke-width="2.4"/><path d="M80 56 L80 118" stroke="#D8D4C8" stroke-width="6" stroke-linecap="round"/><path d="M80 56 L80 118" stroke="${S}" stroke-width="1.4" fill="none"/>
      <path d="M112 20 L116 118 M128 20 L124 118" stroke="#B08452" stroke-width="5" stroke-linecap="round"/>`,
    mix: `${bowl('#FBF7EC', '#F5E6BD', '<path d="M100 50 L140 16" stroke="#8A6A4A" stroke-width="5" stroke-linecap="round"/><path d="M76 54 q10 -8 20 0 t20 0" stroke="#C1403A" stroke-width="3" fill="none"/>')}`,
    boil: `<rect x="60" y="100" width="80" height="14" fill="#5A5248" stroke="${S}" stroke-width="2"/><path d="M76 100 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0" fill="#E0703C"/>
      <path d="M56 46 L144 46 L140 94 L60 94 Z" fill="#8C8577" stroke="${S}" stroke-width="3"/><ellipse cx="100" cy="46" rx="44" ry="8" fill="#C1403A" stroke="${S}" stroke-width="2.4"/>
      ${[80, 100, 120].map(x => `<circle cx="${x}" cy="42" r="3" fill="#FBF7EC"/>`).join('')}<path d="M80 30 Q76 20 82 12 M118 30 Q114 20 120 12" stroke="#C9C0AE" stroke-width="3" fill="none"/>`,
    gim: `<rect x="44" y="30" width="112" height="80" fill="#2B3A2E" stroke="${S}" stroke-width="2.6"/><rect x="54" y="44" width="92" height="56" fill="#FBF7EC" stroke="#C9C0AE" stroke-width="1.6"/>
      ${[['#E3A93C', 60], ['#6E8F58', 70], ['#E0703C', 80], ['#C1403A', 90]].map(([c, y]) => `<rect x="60" y="${y - 6}" width="80" height="6" fill="${c}"/>`).join('')}`,
    roll: `<ellipse cx="100" cy="104" rx="70" ry="12" fill="#E0C49A"/><rect x="40" y="70" width="120" height="34" rx="17" fill="#2B3A2E" stroke="${S}" stroke-width="2.6"/>
      <ellipse cx="160" cy="87" rx="10" ry="17" fill="#FBF7EC" stroke="${S}" stroke-width="2.4"/><circle cx="158" cy="84" r="3" fill="#E3A93C"/><circle cx="162" cy="90" r="3" fill="#6E8F58"/>`,
    cut: `${M4_PIC.f_gimbap ? M4_PIC.f_gimbap.replace(/<\/?svg[^>]*>/g, '') : ''}${m2Person('dad', 40, 'give', 1)}`,
    cook: `${floor}${m2Person('grandpa', 60, 'give', 1)}${m2Person('kid', 150, 'give', -1)}<rect x="84" y="70" width="36" height="30" fill="#8C8577" stroke="${S}" stroke-width="2.4"/><ellipse cx="102" cy="70" rx="18" ry="5" fill="#C1403A" stroke="${S}" stroke-width="2"/>`,
    /* 속담 */
    lie_eat: `${floor}<rect x="30" y="92" width="140" height="18" rx="4" fill="#9DC3DC" stroke="${S}" stroke-width="2.2"/>
      <circle cx="54" cy="82" r="12" fill="#F0D9BE" stroke="${S}" stroke-width="2.2"/><path d="M42 78 C40 64 66 64 66 78 C58 72 50 72 42 78 Z" fill="#221F1C"/>
      <rect x="66" y="78" width="80" height="16" rx="8" fill="#2D6E8E" stroke="${S}" stroke-width="2"/>
      <ellipse cx="72" cy="62" rx="10" ry="6" fill="#FBF7EC" stroke="${S}" stroke-width="2"/><path d="M62 76 L68 66" stroke="#F0D9BE" stroke-width="4" stroke-linecap="round"/>`,
    tiger_come: `${floor}${m2Person('kid', 50, 'stand', 1)}${m2Person('friend', 90, 'stand', -1)}
      <path d="M40 20 Q60 6 80 20 Q84 34 68 36 L60 44 L60 36 Q38 34 40 20 Z" fill="#FBF7EC" stroke="${S}" stroke-width="2"/>${m6Txt(60, 24, '호랑이...', 9, '#17324A')}
      ${typeof CHAR_DIR !== 'undefined' ? `<image href="${CHAR_DIR}dami-happy.webp" x="114" y="36" width="64" height="84" preserveAspectRatio="xMidYMax meet"/>` : ''}`,
    monkey: `<rect width="200" height="130" rx="6" fill="#DCEBD6"/><rect x="40" y="30" width="12" height="100" fill="#8A6A4A" stroke="${S}" stroke-width="2"/><path d="M52 44 L130 40" stroke="#8A6A4A" stroke-width="8" stroke-linecap="round"/>
      <circle cx="46" cy="24" r="24" fill="#6E8F58" stroke="${S}" stroke-width="2"/>
      <g transform="translate(130 86) rotate(30)"><ellipse cx="0" cy="8" rx="12" ry="16" fill="#9C7650" stroke="${S}" stroke-width="2"/><circle cx="0" cy="-14" r="11" fill="#9C7650" stroke="${S}" stroke-width="2"/>
      <ellipse cx="0" cy="-12" rx="7" ry="6" fill="#E8C9A0"/><circle cx="-3" cy="-14" r="1.4" fill="${S}"/><circle cx="3" cy="-14" r="1.4" fill="${S}"/></g>
      <path d="M126 50 l-4 10 M138 52 l4 10" stroke="#8C7F63" stroke-width="2" stroke-dasharray="3 3"/>`,
    kindwords: `${floor}${m2Person('kid', 60, 'stand', 1)}${m2Person('friend', 140, 'stand', -1)}
      <path d="M78 50 Q100 40 120 50" stroke="#C1403A" stroke-width="2.4" fill="none"/><path d="M120 60 Q100 70 80 60" stroke="#2D6E8E" stroke-width="2.4" fill="none"/>
      <path d="M92 36 C92 30 98 30 98 36 C98 30 104 30 104 36 C104 42 98 46 98 48 C98 46 92 42 92 36 Z" fill="#C1403A"/><path d="M96 66 C96 60 102 60 102 66 C102 60 108 60 108 66 C108 72 102 76 102 78 C102 76 96 72 96 66 Z" fill="#2D6E8E"/>`,
    dust: `<rect width="200" height="130" rx="6" fill="#F3E3C0"/><g fill="#B08452">${[[30, 110], [42, 104], [36, 116], [50, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4"/>`).join('')}</g>
      <path d="M60 100 L80 100" stroke="#C1403A" stroke-width="3"/><path d="M74 94 L82 100 L74 106" stroke="#C1403A" stroke-width="3" fill="none"/>
      <path d="M90 120 L140 24 L190 120 Z" fill="#9C7650" stroke="${S}" stroke-width="2.6" stroke-linejoin="round"/>`,
    habit: `${floor}${m2Person('baby', 50, 'stand', 1)}<path d="M72 80 L100 80" stroke="#C1403A" stroke-width="3"/><path d="M94 74 L102 80 L94 86" stroke="#C1403A" stroke-width="3" fill="none"/>${m2Person('grandpa', 140, 'stand', -1)}`
  }[kind];
  const label = {nuts:'부럼', ogokbap:'오곡밥', kite:'연날리기', moonview:'달맞이', swing:'그네뛰기', ssireum:'씨름', patjuk:'팥죽', longnight:'밤이 가장 긴 날',
    knife:'칼과 도마', pot:'냄비', spoons:'숟가락과 젓가락', mix:'섞어요', boil:'끓여요', gim:'김 위에 재료를 올려요', roll:'돌돌 말아요', cut:'어른이 썰어요', cook:'함께 요리해요',
    lie_eat:'누워서 떡 먹기', tiger_come:'호랑이도 제 말 하면 온다', monkey:'원숭이도 나무에서 떨어진다', kindwords:'가는 말이 고와야 오는 말이 곱다', dust:'티끌 모아 태산', habit:'세 살 버릇 여든까지 간다'}[kind];
  return `<svg viewBox="0 0 200 130" width="150" height="98" role="img" aria-label="${label}">${g}</svg>`;
}
['nuts', 'ogokbap', 'kite', 'moonview', 'swing', 'ssireum', 'patjuk', 'longnight', 'knife', 'pot', 'spoons', 'mix', 'boil', 'gim', 'roll', 'cut', 'cook',
 'lie_eat', 'tiger_come', 'monkey', 'kindwords', 'dust', 'habit'].forEach(k => { OUT_ONLY['mo_' + k] = outMore(k); });
const OUT_PIC = Object.assign({}, M7_PIC, OUT_ONLY);

/* ---- 꾸러미 ---- */
const OUT_BUNDLES = [
  {k:1, title:'전래 놀이', topic:'공기, 딱지, 제기, 팽이. 다섯째 달을 마쳤다면 딱 좋아요', nights:[1, 2, 3], after:'그동안 가족과 딱지를 접어서 딱지치기를 해 봐.'},
  {k:2, title:'한국 여행 지도', topic:'서울, 부산, 경주, 제주. 다섯째 달을 마쳤다면 딱 좋아요', nights:[4, 5, 6], after:'그동안 가족과 지도를 펴 놓고 가 보고 싶은 곳을 이야기해 봐.'},
  {k:3, title:'명절 더 알기', topic:'정월대보름, 단오, 동지. 여섯째 달을 마쳤다면 딱 좋아요', nights:[7, 8, 9], after:'다음 명절이 오면 달력에 적어 두고 가족과 함께 지내 봐.'},
  {k:4, title:'우리 집 요리', topic:'부엌 말과 김밥, 떡볶이. 넷째 달을 마쳤다면 딱 좋아요', nights:[10, 11, 12], after:'그동안 가족과 한국 음식을 하나 만들어 봐.'},
  {k:5, title:'속담', topic:'재미있는 옛말과 쓰임. 일곱째 달을 마쳤다면 딱 좋아요', nights:[13, 14, 15], after:'이번 주에 속담 하나를 골라 가족 앞에서 딱 맞는 때에 써 봐.'}
];

/* ---- 밤 ---- */
const OUT_NIGHTS = [

/* ---- 전래 놀이 -----------------------------------------------------
   한국 아이들이 오래전부터 해 온 놀이(공기, 딱지치기, 제기차기, 팽이치기, 윷놀이)와 놀이 동작 말(던져요, 받아요, 쳐요, 차요, 돌려요).
   딱지 접는 순서를 이야기 순서 화면으로 익히고, 놀 때 쓰는 말(내 차례야, 이겼어요, 졌어요, 잘했어)을 배웁니다.
   셋째 밤은 호랑이 할머니가 공기놀이를 가르쳐 주는 이야기로, 이기고 지는 것보다 함께 노는 즐거움을 다룹니다. */
{ n:1, bundle:1, title:'공기와 딱지',
  steps:[
    {type:'intro', who:'moi',
     t:'달토끼 나들이에 온 걸 환영해! 첫 나들이는 전래 놀이야. 할머니 할아버지가 어릴 때 하던 놀이를 배워 보자.',
     big:'전래 놀이'},
    {type:'pairs', title:'전래 놀이', who:'moi',
     t:'한국 아이들이 오래전부터 하던 놀이야. 그림을 누르면 소리가 나.',
     singles:[
       {w:'공기놀이', pic:'play_gonggi', en:'gonggi (jacks with stones)'}, {w:'딱지치기', pic:'play_ddakji', en:'ddakji (paper tile flipping)'},
       {w:'제기차기', pic:'play_jegi', en:'jegi (shuttlecock kicking)'}, {w:'팽이치기', pic:'play_top', en:'spinning tops'},
       {w:'윷놀이', pic:'play_yut', en:'yut (stick game)'}],
     tip:{who:'dami', t:'전래 놀이는 옛날부터 전해 내려오는 놀이란다. 장난감을 사지 않아도 돌, 종이, 나무만 있으면 할 수 있지. 여섯째 달 설날에 한 윷놀이도 전래 놀이란다.'}},
    {type:'pairs', title:'놀 때 하는 동작', who:'moi',
     t:'놀이마다 몸을 쓰는 말이 달라. 눌러서 들어 봐.',
     singles:[
       {w:'던져요', pic:'play_throw', en:'throw'}, {w:'받아요', pic:'play_gonggi', en:'catch'}, {w:'쳐요', pic:'play_hit', en:'hit, strike'},
       {w:'차요', pic:'play_kick', en:'kick'}, {w:'돌려요', pic:'play_spin', en:'spin'}],
     tip:{who:'tori', t:'공기는 던지고 받아요. 딱지는 쳐요. 제기는 발로 차요. 팽이는 돌려요. 놀이 이름에 쳐요, 차요가 숨어 있는 것도 있지? 딱지치기, 제기차기!'}},
    {type:'choose', title:'어떻게 놀아요?', who:'tori',
     t:'놀이에 맞는 동작을 골라 봐.',
     qs:[
       {pic:'play_jegi', t:'제기는 발로 ______.', o:['차요','던져요','돌려요'], a:'차요', why:'제기차기, 발로 차는 놀이예요.'},
       {pic:'play_ddakji', t:'딱지는 딱지로 ______.', o:['쳐요','차요','받아요'], a:'쳐요', why:'딱지치기, 딱지로 쳐서 뒤집어요.'},
       {pic:'play_top', t:'팽이는 ______.', o:['돌려요','던져요','차요'], a:'돌려요'},
       {pic:'play_gonggi', t:'공기는 위로 던지고 ______.', o:['받아요','차요','쳐요'], a:'받아요'}]},
    {type:'choose', mode:'pic', title:'듣고 그림을 골라요', who:'moi',
     t:'내가 말하는 그림을 찾아 봐.',
     qs:[
       {say:'팽이치기', o:['play_top','play_jegi','play_gonggi'], a:'play_top'},
       {say:'차요', o:['play_throw','play_kick','play_spin'], a:'play_kick'},
       {say:'딱지치기', o:['play_yut','play_ddakji','play_gonggi'], a:'play_ddakji'},
       {say:'던져요', o:['play_hit','play_spin','play_throw'], a:'play_throw'}]},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'놀이 이름을 써 봐.',
     items:[{w:'공기', en:'gonggi stones'}, {w:'딱지', en:'ddakji', hint:{who:'dami', t:'소리는 [딱찌]지만 글자는 ‘지’란다. ㄱ 받침 뒤라서 세게 들리지.'}}, {w:'제기', en:'jegi'}]}
  ],
  dictWords:[{w:'공기', en:'gonggi'}, {w:'딱지', en:'ddakji'}, {w:'제기', en:'jegi'}, {w:'팽이', en:'top'},
             {w:'던져요', en:'throw'}, {w:'차요', en:'kick'}, {w:'돌려요', en:'spin'}] },

{ n:2, bundle:1, title:'딱지를 접어요',
  steps:[
    {type:'intro', who:'tori',
     t:'오늘은 종이로 딱지를 접고, 딱지치기 하는 법을 배워. 놀 때 쓰는 말도 알려 줄게.',
     big:'딱지를 접어요'},
    {type:'sequence', title:'딱지 접는 순서', who:'moi',
     t:'딱지 접는 순서가 섞였어. 차례대로 눌러 줘.',
     qs:[
       {cards:[{pic:'play_f1', t:'종이 두 장을 길게 접어요.'}, {pic:'play_f2', t:'두 장을 십자 모양으로 겹쳐 놓아요.'}, {pic:'play_f3', t:'끝을 하나씩 접어 넣어요.'}, {pic:'play_f4', t:'네모난 딱지가 완성됐어요.'}]}]},
    {type:'pairs', title:'놀 때 하는 말', who:'dami',
     t:'함께 놀 때 쓰는 말이란다. 친구와 어른께 하는 말이 조금 다르지.',
     pairs:[
       {when:'내 차례일 때', pic:'play_turn', friend:'내 차례야.', elder:'제 차례예요.', en:"It's my turn."},
       {when:'상대 차례일 때', pic:'play_turn', friend:'네 차례야.', elder:'할머니 차례예요.', en:"It's your turn."},
       {when:'상대가 잘했을 때', pic:'play_win', friend:'잘했어!', elder:'잘하셨어요!', en:'Well done!'}]},
    {type:'tense', title:'이기고 지고', who:'tori',
     t:'놀이가 끝나면 이긴 사람과 진 사람이 있지. 넷째 달에 배운 지난 일 말로 말해.',
     cols:['지금', '끝난 뒤'],
     groups:[{rule:'놀이가 끝나면', rows:[['이겨요','이겼어요'], ['져요','졌어요'], ['뒤집어요','뒤집었어요']]}],
     note:'딱지치기는 내 딱지로 상대 딱지를 쳐서 뒤집으면 이긴단다. 여섯째 달에 배운 ~으면을 쓰면 규칙을 설명할 수 있지. 상대 딱지를 뒤집으면 이겨요.'},
    {type:'choose', title:'딱지치기 규칙', who:'tori',
     t:'딱지치기에 맞는 말을 골라 봐.',
     qs:[
       {pic:'play_hit', o:['상대 딱지를 뒤집으면 이겨요.','상대 딱지를 뒤집으면 져요.'], a:'상대 딱지를 뒤집으면 이겨요.'},
       {pic:'play_win', t:'내가 이겼어요. 친구에게 뭐라고 해요?', o:['재미있었어! 또 하자.','너는 졌어!'], a:'재미있었어! 또 하자.', why:'이겨도 친구를 배려해요.'},
       {pic:'play_lose', t:'내가 졌어요. 친구에게 뭐라고 해요?', o:['잘했어! 다시 하자.','재미없어!'], a:'잘했어! 다시 하자.', why:'져도 상대를 칭찬해요.'},
       {pic:'play_turn', t:'할머니 차례예요. 뭐라고 해요?', o:['네 차례야.','할머니 차례예요.'], a:'할머니 차례예요.'}]},
    {type:'build', title:'문장을 만들어요', who:'moi',
     t:'낱말 카드를 차례대로 눌러서 문장을 만들어 봐.',
     qs:[
       {s:'종이로 딱지를 접어요.', tiles:['종이로','딱지를','접어요.'], en:'I fold ddakji out of paper.'},
       {s:'상대 딱지를 뒤집으면 이겨요.', tiles:['상대','딱지를','뒤집으면','이겨요.'], extra:['뒤집면'], en:"If you flip the other player's ddakji, you win."},
       {s:'이번에는 제 차례예요.', tiles:['이번에는','제','차례예요.'], en:"This time it's my turn."},
       {s:'딱지를 쳐서 뒤집었어요.', tiles:['딱지를','쳐서','뒤집었어요.'], en:'I hit the ddakji and flipped it.'}]},
    {type:'sound', title:'소리와 글자가 달라요', who:'dami',
     t:'놀이 말에도 소리 비밀이 있단다.',
     cmp:[
       {s:'딱지', d:'딱찌', n:'ㄱ 받침 뒤의 ㅈ은 ㅉ처럼 나요'},
       {s:'접어요', d:'저버요', n:'ㅂ 받침이 뒤로 건너가요'},
       {s:'뒤집어요', d:'뒤지버요', n:'ㅂ 받침이 뒤로 건너가요'},
       {s:'이겼어요', d:'이겨써요', n:'ㅆ 받침이 뒤로 건너가요'}],
     note:'일곱 달 동안 만난 소리 비밀이 놀이 말에도 그대로 나오지? 이제 새 말을 만나도 스스로 풀 수 있을 게야.'},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'들리는 말을 써 봐.',
     items:[
       {w:'차례', en:'turn'},
       {w:'접어요', en:'fold', hint:{who:'dami', t:'소리는 [저버요]지만 ‘접’에 받침 ㅂ이 있단다.'}},
       {w:'이겼어요', en:'won'}]}
  ],
  dictWords:[{w:'차례', en:'turn'}, {w:'접어요', en:'fold'}, {w:'이겼어요', en:'won'}, {w:'졌어요', en:'lost'}, {w:'종이', en:'paper'}] },

{ n:3, bundle:1, title:'할머니의 공기놀이',
  steps:[
    {type:'intro', who:'tori',
     t:'한국 할머니 댁에서 할머니가 어릴 때 하던 공기놀이를 가르쳐 주신대! 먼저 글자 없이 귀로만 들어 봐.',
     big:'할머니, 공기 가르쳐 주세요'},
    {type:'dialogue', title:'이야기를 들어요', who:'tori',
     t:'처음부터 듣기를 눌러 봐. 누가 이기는지, 그리고 이기고 진 뒤에 뭐라고 하는지 들어 봐. 다 듣고 나면 글자 보기를 눌러.',
     lines:[
       {who:'tori', t:'할머니, 공기놀이 가르쳐 주세요!', en:'Grandma, please teach me gonggi!'},
       {who:'halmi', t:'오냐. 돌 하나를 위로 던지고, 떨어지기 전에 바닥의 돌을 집어서 같이 받는 거란다.', en:'All right. Throw one stone up, pick up a stone from the floor before it falls, and catch them together.'},
       {who:'moi', t:'제가 먼저 할래요! 앗, 떨어뜨렸어요.', en:"I'll go first! Oops, I dropped it."},
       {who:'tori', t:'이제 제 차례예요. 던지고, 집고, 받았어요!', en:"Now it's my turn. Throw, pick up, catch!"},
       {who:'halmi', t:'아이고, 잘하는구나! 이번에는 할머니 차례다.', en:"Oh my, you're good at it! Now it's Grandma's turn."},
       {who:'moi', t:'와, 할머니는 다섯 개를 한 번에 받으셨어요!', en:'Wow, Grandma caught all five at once!'},
       {who:'tori', t:'할머니가 이기셨어요. 할머니, 정말 잘하셨어요!', en:'Grandma won. Grandma, you did really well!'},
       {who:'halmi', t:'허허, 할머니도 어릴 때 날마다 했거든. 이기고 지는 것보다 같이 노는 게 더 재미있지?', en:'Ho ho, I played it every day when I was little. Playing together is more fun than winning or losing, right?'}],
     note:{who:'dami', t:'할머니가 어릴 때 하던 놀이를 손주가 배우는구나. 전래 놀이는 이렇게 할머니에게서 손주에게 전해진단다. 토리가 진 뒤에도 할머니께 잘하셨어요, 하고 칭찬해 드린 것이 참 보기 좋구나.'}},
    {type:'choose', title:'이야기를 떠올려요', who:'tori',
     t:'방금 들은 이야기를 떠올려 봐. 헷갈리면 앞으로 돌아가서 다시 들어도 돼.',
     qs:[
       {t:'무슨 놀이를 했어요?', o:['공기놀이','딱지치기','제기차기'], a:'공기놀이'},
       {t:'공기놀이는 돌을 위로 어떻게 해요?', o:['던져요','차요','돌려요'], a:'던져요'},
       {t:'누가 이겼어요?', o:['할머니','토리','모이'], a:'할머니'},
       {t:'할머니는 무엇이 더 재미있다고 하셨어요?', o:['같이 노는 것','이기는 것'], a:'같이 노는 것'}]},
    {type:'choose', title:'토리가 되어 말해요', who:'tori',
     t:'이번엔 네가 토리야. 누가 말하는지 잘 보고 대답해 봐.',
     qs:[
       {pic:'play_turn', line:{who:'moi', t:'토리야, 이제 누구 차례야?'}, en:"Tori, whose turn is it now?", o:['내 차례야!','제 차례예요!'], a:'내 차례야!', why:'모이는 친구라서 편한 말로 대답해요.'},
       {pic:'play_lose', line:{who:'halmi', t:'토리야, 할머니가 이겼구나.'}, en:'Tori, Grandma won.', o:['할머니, 정말 잘하셨어요!','할머니, 재미없어요.'], a:'할머니, 정말 잘하셨어요!', why:'져도 상대를 칭찬해요. 어른께는 잘하셨어요.'},
       {pic:'play_jegi', t:'친구와 제기차기를 하고 싶어요.', en:'You want to play jegi with a friend.', o:['같이 제기차기하자!','같이 제기차기하실래요?'], a:'같이 제기차기하자!', why:'친구에게는 편한 말로 제안해요.'}]},
    {type:'task', title:'우리 집 전래 놀이', who:'moi',
     t:'가족과 전래 놀이를 하나 해 봐. 딱지를 접어도 좋고, 공기놀이를 해도 좋아. 다 하면 했어요를 눌러.',
     lines:[
       {when:'놀이를 시작할 때', say:'같이 딱지치기해요!', sub:'어른께는 같이 하실래요?'},
       {when:'차례를 바꿀 때', say:'이제 제 차례예요.', sub:'형제에게는 내 차례야, 네 차례야.'},
       {when:'놀이가 끝나면', say:'잘하셨어요! 또 해요.', sub:'이겨도 져도 상대를 칭찬해요.'}],
     parent:'딱지는 A4 종이나 색종이 두 장이면 접을 수 있습니다. 접는 법은 인터넷에 "딱지 접기"로 찾으시면 그림 설명이 많습니다. 공기놀이용 공기돌은 한인 마트에서 구할 수 있고, 작은 조약돌로 해도 됩니다. 다만 작은 공기돌은 어린 동생이 입에 넣지 않도록 주의해 주세요. 조부모님께 어릴 때 하시던 놀이를 여쭤보고 함께 해 보시면 이 꾸러미의 뜻이 가장 잘 살아납니다.'}
  ],
  dictWords:[] },

/* ---- 한국 여행 지도 ----------------------------------------------
   한국의 네 곳(서울, 경주, 부산, 제주도)을 지도에서 찾고, 곳마다 이름난 것(경복궁, 한강, 첨성대, 해운대, 한라산, 귤)을 배웁니다.
   "~에 가면 ~을 볼 수 있어요", "~이 유명해요"로 설명하고, 다섯째 달의 ~ㄹ 거예요로 여행 계획을 세웁니다.
   사실은 교과서 수준에서 확인할 수 있는 것만 씁니다(서울은 가장 큰 도시, 한라산은 남한에서 가장 높은 산,
   경주는 옛 신라의 수도, 제주도는 섬). */
{ n:4, bundle:2, title:'한국 지도',
  steps:[
    {type:'intro', who:'moi',
     t:'두 번째 나들이는 한국 여행이야! 다섯째 달에 토리가 할머니 댁에 갔지? 이번에는 지도를 펴 놓고 한국 곳곳을 둘러보자.',
     big:'한국 지도'},
    {type:'pairs', title:'여행할 곳', who:'moi',
     t:'한국의 네 곳이야. 눌러서 들어 봐.',
     singles:[
       {w:'서울', pic:'trip_river', en:'Seoul'}, {w:'부산', pic:'trip_beach', en:'Busan'}, {w:'경주', pic:'trip_tower', en:'Gyeongju'},
       {w:'제주도', pic:'trip_hallasan', en:'Jeju Island'}, {w:'지도', pic:'trip_map', en:'map'}, {w:'섬', pic:'trip_ship', en:'island'}],
     tip:{who:'dami', t:'지도는 보통 위쪽이 북쪽이란다. 서울은 위쪽, 부산은 오른쪽 아래, 제주도는 남쪽 바다 한가운데 있는 섬이지.'}},
    {type:'findit', title:'지도에서 찾아요', who:'tori',
     t:'내가 말하는 곳을 지도에서 눌러 봐. 빨간 점이 도시야.',
     scene:'trip_mapfind',
     qs:[
       {say:'서울', spot:'seoul'},
       {say:'제주도', spot:'jeju'},
       {say:'부산', spot:'busan'},
       {say:'한국에서 가장 큰 도시예요', t:'한국에서 가장 큰 도시예요. 어디일까요?', spot:'seoul', why:'서울은 한국에서 사람이 가장 많이 사는 도시예요.'},
       {say:'남쪽 바다에 있는 섬이에요', t:'남쪽 바다에 있는 섬이에요. 어디일까요?', spot:'jeju', why:'제주도는 남쪽 바다에 있는 섬이에요.'},
       {say:'부산 바로 위에 있는 옛 도시예요', t:'부산 바로 위에 있는 옛 도시예요. 어디일까요?', spot:'gyeongju', why:'경주는 부산 가까이, 위쪽에 있어요.'}]},
    {type:'choose', title:'어느 곳일까요?', who:'tori',
     t:'알맞은 곳을 골라 봐.',
     qs:[
       {pic:'trip_ship', t:'제주도에 가려면 무엇을 타요?', o:['비행기나 배','지하철','자전거'], a:'비행기나 배', why:'제주도는 섬이라서 비행기나 배를 타요.'},
       {pic:'trip_map', t:'지도의 위쪽은 보통 어느 쪽이에요?', o:['북쪽','남쪽'], a:'북쪽'},
       {pic:'trip_beach', t:'바다가 아름다운 큰 항구 도시는?', o:['부산','서울','경주'], a:'부산'}]},
    {type:'choose', mode:'pic', title:'듣고 그림을 골라요', who:'moi',
     t:'내가 말하는 그림을 찾아 봐.',
     qs:[
       {say:'섬', o:['trip_ship','trip_river','trip_tower'], a:'trip_ship'},
       {say:'지도', o:['trip_map','hd_book','ml_letter'], a:'trip_map'},
       {say:'제주도', o:['trip_palace','trip_hallasan','trip_river'], a:'trip_hallasan'}]},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'여행할 곳을 써 봐.',
     items:[{w:'서울', en:'Seoul'}, {w:'부산', en:'Busan'}, {w:'지도', en:'map'}]}
  ],
  dictWords:[{w:'서울', en:'Seoul'}, {w:'부산', en:'Busan'}, {w:'경주', en:'Gyeongju'}, {w:'제주도', en:'Jeju Island'}, {w:'지도', en:'map'}, {w:'섬', en:'island'}] },

{ n:5, bundle:2, title:'무엇이 유명해요?',
  steps:[
    {type:'intro', who:'tori',
     t:'곳마다 유명한 것이 있어. 오늘은 무엇이 유명한지 배우고, 나의 여행 계획도 세워 볼 거야.',
     big:'제주도는 귤이 유명해요'},
    {type:'pairs', title:'곳마다 유명한 것', who:'moi',
     t:'그림을 누르면 소리가 나. 어느 곳에 있는지도 함께 기억해 봐.',
     singles:[
       {w:'경복궁', pic:'trip_palace', en:'Gyeongbokgung Palace (Seoul)'}, {w:'한강', pic:'trip_river', en:'Han River (Seoul)'},
       {w:'첨성대', pic:'trip_tower', en:'Cheomseongdae observatory (Gyeongju)'}, {w:'해운대', pic:'trip_beach', en:'Haeundae Beach (Busan)'},
       {w:'한라산', pic:'trip_hallasan', en:'Hallasan Mountain (Jeju)'}, {w:'귤', pic:'trip_tangerine', en:'tangerine (Jeju)'}],
     tip:{who:'dami', t:'경복궁은 조선의 임금님이 사시던 궁궐이란다. 여섯째 달의 세종대왕께서도 경복궁에 계셨지. 첨성대는 신라 사람들이 하늘의 별을 보던 곳이고, 한라산은 남한에서 가장 높은 산이란다.'}},
    {type:'choose', title:'어디에 있어요?', who:'tori',
     t:'유명한 것과 그곳을 이어 봐.',
     qs:[
       {pic:'trip_palace', t:'경복궁은 어디에 있어요?', o:['서울','부산','제주도'], a:'서울'},
       {pic:'trip_tower', t:'첨성대는 어디에 있어요?', o:['경주','서울','부산'], a:'경주'},
       {pic:'trip_hallasan', o:['제주도에 가면 한라산을 볼 수 있어요.','부산에 가면 한라산을 볼 수 있어요.'], a:'제주도에 가면 한라산을 볼 수 있어요.'},
       {pic:'trip_tangerine', o:['제주도는 귤이 유명해요.','제주도는 귤가 유명해요.'], a:'제주도는 귤이 유명해요.', why:'‘귤’에 받침이 있어서 이예요.'}]},
    {type:'letter', title:'나의 한국 여행 계획', who:'tori',
     t:'칸마다 골라서 여행 계획을 세워 봐. 오른쪽에 여행 계획이 만들어져.',
     parts:[
       {label:'언제', opts:['이번 여름 방학에 한국에 갈 거예요.', '겨울 방학에 한국에 갈 거예요.', '언젠가 꼭 한국에 갈 거예요.']},
       {label:'먼저', opts:['먼저 서울에서 경복궁을 볼 거예요.', '먼저 서울에서 한강을 볼 거예요.']},
       {label:'그다음에', opts:['그다음에 경주에서 첨성대를 볼 거예요.', '그다음에 부산 해운대에서 수영할 거예요.']},
       {label:'마지막에', opts:['마지막에 제주도에서 한라산에 올라갈 거예요.', '마지막에 제주도에서 귤을 먹을 거예요.']},
       {label:'누구와', opts:['가족과 함께 갈 거예요.', '할머니 할아버지와 함께 갈 거예요.']}],
     noName:true, readLabel:'여행 계획 읽어 주기',
     tip:{who:'moi', t:'다섯째 달의 먼저, 그다음에, 마지막에와 갈 거예요가 다 들어 있지? 인쇄해서 지도 옆에 붙여 봐!'}},
    {type:'build', title:'문장을 만들어요', who:'moi',
     t:'낱말 카드를 차례대로 눌러서 문장을 만들어 봐.',
     qs:[
       {s:'제주도에 가면 한라산을 볼 수 있어요.', tiles:['제주도에','가면','한라산을','볼','수','있어요.'], en:'If you go to Jeju, you can see Hallasan.'},
       {s:'부산은 바다가 유명해요.', tiles:['부산은','바다가','유명해요.'], extra:['바다이'], en:'Busan is famous for its sea.'},
       {s:'경주에는 첨성대가 있어요.', tiles:['경주에는','첨성대가','있어요.'], en:'Cheomseongdae is in Gyeongju.'},
       {s:'서울에서 경복궁에 갈 거예요.', tiles:['서울에서','경복궁에','갈','거예요.'], en:"I'll go to Gyeongbokgung in Seoul."}]},
    {type:'sound', title:'소리와 글자가 달라요', who:'dami',
     t:'여행지 이름에도 소리 비밀이 숨어 있단다. 한라산은 설날과 반대 모양의 비밀이지.',
     cmp:[
       {s:'한라산', d:'할라산', n:'ㄴ 받침이 뒤의 ㄹ을 만나 ㄹ처럼 나요'},
       {s:'경복궁', d:'경복꿍', n:'ㄱ 받침 뒤의 ㄱ은 ㄲ처럼 나요'},
       {s:'볼 수 있어요', d:'볼 쑤 이써요', n:'ㄹ 뒤의 수는 쑤처럼 나요'},
       {s:'부산에', d:'부사네', n:'ㄴ 받침이 뒤로 건너가요'}],
     note:'설날은 ㄹ 뒤의 ㄴ이 ㄹ이 되어 [설랄], 한라산은 ㄴ 뒤에 ㄹ이 와서 ㄴ이 ㄹ이 되어 [할라산]. ㄴ과 ㄹ이 만나면 둘 다 ㄹ로 소리 나는 게지.'},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'들리는 말을 써 봐.',
     items:[
       {w:'한라산', en:'Hallasan', hint:{who:'dami', t:'소리는 [할라산]이지만 ‘한’에 받침 ㄴ이 있단다.'}},
       {w:'제주도', en:'Jeju Island'},
       {w:'유명해요', en:'is famous'}]}
  ],
  dictWords:[{w:'한라산', en:'Hallasan'}, {w:'한강', en:'Han River'}, {w:'귤', en:'tangerine'}, {w:'유명해요', en:'is famous'}] },

{ n:6, bundle:2, title:'할머니와 세운 여행 계획',
  steps:[
    {type:'intro', who:'tori',
     t:'할머니 댁에서 한국 지도를 펴 놓고 여행 계획을 세워! 먼저 글자 없이 귀로만 들어 봐.',
     big:'어디에 가고 싶니?'},
    {type:'dialogue', title:'이야기를 들어요', who:'tori',
     t:'처음부터 듣기를 눌러 봐. 어디를 어떤 차례로 가는지 잘 들어 봐. 다 듣고 나면 글자 보기를 눌러.',
     lines:[
       {who:'halmi', t:'토리야, 방학에 한국 여행을 하고 싶다고? 어디에 가고 싶니?', en:'Tori, you want to travel around Korea during vacation? Where would you like to go?'},
       {who:'tori', t:'먼저 서울에 가서 경복궁을 보고 싶어요.', en:'First I want to go to Seoul and see Gyeongbokgung.'},
       {who:'moi', t:'그다음에 경주에 가요! 첨성대를 보고 싶어요.', en:"Then let's go to Gyeongju! I want to see Cheomseongdae."},
       {who:'halmi', t:'경주는 옛날 신라라는 나라의 수도였단다. 볼 것이 아주 많지.', en:'Gyeongju was the capital of an old kingdom called Silla. There is a lot to see.'},
       {who:'tori', t:'부산에서는 해운대에서 수영할 거예요!', en:"In Busan I'll swim at Haeundae!"},
       {who:'moi', t:'마지막에 제주도에 가요. 한라산에 올라가고 귤도 먹을 거예요.', en:"Last, let's go to Jeju. We'll climb Hallasan and eat tangerines."},
       {who:'halmi', t:'제주도는 섬이라서 비행기나 배를 타야 한단다.', en:'Jeju is an island, so you have to take a plane or a boat.'},
       {who:'tori', t:'와, 정말 신나요! 할머니도 같이 가요!', en:'Wow, so exciting! Grandma, come with us!'}],
     note:{who:'halmi', t:'토리와 모이가 먼저, 그다음에, 마지막에로 여행 차례를 잘 세웠구나. 서울의 궁궐, 경주의 옛 신라, 부산의 바다, 제주의 섬과 산. 한국은 작아 보여도 곳마다 모습이 이렇게 다르단다.'}},
    {type:'sequence', title:'여행 차례', who:'moi',
     t:'토리와 모이의 여행 차례를 눌러 줘.',
     qs:[
       {cards:[{pic:'trip_palace', t:'서울에서 경복궁을 봐요.'}, {pic:'trip_tower', t:'경주에서 첨성대를 봐요.'}, {pic:'trip_beach', t:'부산 해운대에서 수영해요.'}, {pic:'trip_hallasan', t:'제주도에서 한라산에 올라가요.'}]}]},
    {type:'choose', title:'이야기를 떠올려요', who:'tori',
     t:'방금 들은 이야기를 떠올려 봐. 헷갈리면 앞으로 돌아가서 다시 들어도 돼.',
     qs:[
       {t:'토리가 제일 먼저 가고 싶은 곳은?', o:['서울','부산','제주도'], a:'서울'},
       {t:'경주는 옛날에 어느 나라의 수도였어요?', o:['신라','조선','미국'], a:'신라'},
       {t:'부산에서 토리는 무엇을 할 거예요?', o:['수영','등산','공기놀이'], a:'수영'},
       {t:'제주도에는 왜 비행기나 배를 타고 가요?', o:['섬이라서','너무 멀어서'], a:'섬이라서'}]},
    {type:'choose', title:'토리가 되어 말해요', who:'tori',
     t:'이번엔 네가 토리야. 누가 묻는지 잘 보고 대답해 봐.',
     qs:[
       {pic:'trip_palace', line:{who:'halmi', t:'토리야, 서울에서 무엇을 보고 싶니?'}, en:'Tori, what do you want to see in Seoul?', o:['경복궁을 보고 싶어요.','경복궁을 보고 싶어.'], a:'경복궁을 보고 싶어요.', why:'할머니께는 높이는 말로 대답해요.'},
       {pic:'trip_tangerine', line:{who:'moi', t:'토리야, 제주도에서 뭐 먹을 거야?'}, en:'Tori, what will you eat in Jeju?', o:['귤 먹을 거야!','귤 먹었어!'], a:'귤 먹을 거야!', why:'앞으로 할 일이라서 거야예요.'},
       {pic:'trip_map', t:'지도에서 부산은 서울의 어느 쪽이에요?', o:['아래쪽 오른쪽','위쪽 왼쪽'], a:'아래쪽 오른쪽', why:'부산은 한국의 남동쪽 끝에 있어요.'}]},
    {type:'task', title:'우리 가족 여행 지도', who:'moi',
     t:'가족과 지도를 펴 놓고 여행 계획을 세워 봐. 한국도 좋고, 사는 곳 가까운 곳도 좋아. 다 하면 했어요를 눌러.',
     lines:[
       {when:'지도에서 찾아요', say:'서울은 여기에 있어요.', sub:'종이 지도나 인터넷 지도를 펴 놓고.'},
       {when:'차례를 정해요', say:'먼저 ______에 갈 거예요. 그다음에 ______.', sub:'마지막에 어디로 갈지도 정해요.'},
       {when:'무엇이 유명한지 말해요', say:'______는 ______이 유명해요.', sub:'제주도는 귤이 유명해요처럼.'}],
     parent:'인쇄한 한국 지도나 인터넷 지도를 함께 보며 여행 계획을 세워 보세요. 서울에서 부산까지는 KTX 기차로 두세 시간쯤 걸리고, 제주도는 비행기로 한 시간쯤 걸린다는 이야기도 곁들이면 좋습니다. 조부모님이 사시는 곳이나 부모님이 자라신 곳을 지도에서 찾아보는 것도 아이에게 뜻깊은 시간이 됩니다. 한국에 갈 계획이 없다면 사는 곳 가까운 곳으로 같은 활동을 하셔도 됩니다.'}
  ],
  dictWords:[] },

/* ---- 명절 더 알기 ------------------------------------------------
   여섯째 달의 설날, 추석에 이어 정월대보름(음력 1월 15일), 단오(음력 5월 5일), 동지(밤이 가장 긴 날)를 다룹니다.
   부럼, 오곡밥, 연날리기, 그네뛰기, 씨름, 팥죽처럼 모든 가정이 함께할 수 있는 풍속만 씁니다.
   한 해의 명절 차례(설날, 대보름, 단오, 추석, 동지)를 이야기 순서로 정리합니다. */
{ n:7, bundle:3, title:'정월대보름',
  steps:[
    {type:'intro', who:'moi',
     t:'여섯째 달에 설날과 추석을 배웠지? 한국에는 명절이 더 있어. 오늘은 새해 첫 보름달이 뜨는 정월대보름이야!',
     big:'정월대보름'},
    {type:'pairs', title:'정월대보름에 하는 일', who:'moi',
     t:'정월대보름에 보고 하는 것이야. 그림을 누르면 소리가 나.',
     singles:[
       {w:'정월대보름', pic:'mo_moonview', en:'first full moon of the lunar year'}, {w:'부럼', pic:'mo_nuts', en:'nuts cracked for good health'},
       {w:'호두', pic:'mo_nuts', en:'walnut'}, {w:'땅콩', pic:'mo_nuts', en:'peanut'},
       {w:'오곡밥', pic:'mo_ogokbap', en:'five-grain rice'}, {w:'연날리기', pic:'mo_kite', en:'kite flying'}, {w:'달맞이', pic:'mo_moonview', en:'moon viewing'}],
     tip:{who:'dami', t:'정월대보름은 음력 정월 보름, 새해 첫 보름달이 뜨는 날이란다. 아침에 호두나 땅콩을 깨물어 부럼을 깨고, 한 해 동안 튼튼하기를 빌지. 저녁에는 둥근 달을 맞으며 소원을 빈단다.'}},
    {type:'choose', title:'대보름에는 무엇을 해요?', who:'tori',
     t:'정월대보름에 맞는 것을 골라 봐.',
     qs:[
       {pic:'mo_nuts', t:'대보름 아침에 깨무는 것은?', o:['부럼','떡국','송편'], a:'부럼'},
       {pic:'mo_ogokbap', t:'다섯 가지 곡식으로 지은 밥은?', o:['오곡밥','김밥','볶음밥'], a:'오곡밥'},
       {pic:'mo_kite', o:['연을 날려요.','연을 차요.'], a:'연을 날려요.'},
       {pic:'mo_moonview', t:'대보름 저녁에는?', o:['달맞이를 해요.','세배를 해요.'], a:'달맞이를 해요.', why:'세배는 설날에 해요.'}]},
    {type:'choose', mode:'pic', title:'듣고 그림을 골라요', who:'moi',
     t:'내가 말하는 그림을 찾아 봐.',
     qs:[
       {say:'연날리기', o:['mo_kite','mo_swing','mo_moonview'], a:'mo_kite'},
       {say:'부럼', o:['mo_ogokbap','mo_nuts','mo_patjuk'], a:'mo_nuts'},
       {say:'오곡밥', o:['mo_ogokbap','seol_tteokguk','f_rice'], a:'mo_ogokbap'}]},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'대보름 말을 써 봐.',
     items:[{w:'호두', en:'walnut'}, {w:'땅콩', en:'peanut'}, {w:'연', en:'kite'}]}
  ],
  dictWords:[{w:'부럼', en:'nuts for good health'}, {w:'호두', en:'walnut'}, {w:'땅콩', en:'peanut'}, {w:'오곡밥', en:'five-grain rice'}, {w:'연', en:'kite'}] },

{ n:8, bundle:3, title:'단오와 동지',
  steps:[
    {type:'intro', who:'tori',
     t:'오늘은 여름 명절 단오와 겨울 명절 동지를 배워. 그리고 한 해의 명절을 차례대로 모아 볼 거야.',
     big:'단오와 동지'},
    {type:'pairs', title:'단오', who:'moi',
     t:'단오는 여름이 시작될 무렵의 명절이야.',
     singles:[{w:'단오', pic:'mo_swing', en:'Dano (early summer festival)'}, {w:'그네뛰기', pic:'mo_swing', en:'swinging'}, {w:'씨름', pic:'mo_ssireum', en:'Korean wrestling'}],
     tip:{who:'dami', t:'단오는 음력 오월 닷새란다. 옛날에는 창포를 삶은 물에 머리를 감고, 그네를 뛰고, 씨름을 했지. 요즘은 누구나 그네도 뛰고 씨름도 한단다.'}},
    {type:'pairs', title:'동지', who:'moi',
     t:'동지는 한 해 가운데 밤이 가장 긴 날이야.',
     singles:[{w:'동지', pic:'mo_longnight', en:'winter solstice'}, {w:'팥죽', pic:'mo_patjuk', en:'red bean porridge'}, {w:'새알심', pic:'mo_patjuk', en:'rice balls in porridge'}],
     tip:{who:'dami', t:'동지는 양력으로 십이월 스무하루나 스무이틀쯤 온단다. 붉은 팥죽을 쑤어 먹는데, 옛사람들은 붉은색이 나쁜 기운을 쫓는다고 믿었지. 팥죽 속 동그란 새알심은 나이만큼 먹는다는 말도 있단다.'}},
    {type:'sequence', title:'한 해의 명절', who:'tori',
     t:'한 해의 명절을 차례대로 눌러 봐. 설날부터 시작해.',
     qs:[
       {cards:[{pic:'seol_family', t:'설날에 세배를 해요.'}, {pic:'mo_nuts', t:'정월대보름에 부럼을 깨요.'}, {pic:'mo_swing', t:'단오에 그네를 뛰어요.'}, {pic:'chu_songpyeon', t:'추석에 송편을 빚어요.'}, {pic:'mo_patjuk', t:'동지에 팥죽을 먹어요.'}]}]},
    {type:'choose', title:'어느 명절이에요?', who:'tori',
     t:'알맞은 명절을 골라 봐.',
     qs:[
       {pic:'mo_patjuk', o:['동지','단오','설날'], a:'동지'},
       {pic:'mo_swing', o:['추석','단오','동지'], a:'단오'},
       {pic:'mo_longnight', t:'밤이 가장 긴 날은?', o:['동지','단오','추석'], a:'동지'},
       {pic:'mo_ssireum', o:['씨름을 해요.','씨름을 먹어요.'], a:'씨름을 해요.'}]},
    {type:'build', title:'문장을 만들어요', who:'moi',
     t:'낱말 카드를 차례대로 눌러서 문장을 만들어 봐.',
     qs:[
       {s:'정월대보름에는 부럼을 깨요.', tiles:['정월대보름에는','부럼을','깨요.'], en:'On Jeongwol Daeboreum, we crack nuts.'},
       {s:'단오에는 그네를 뛰어요.', tiles:['단오에는','그네를','뛰어요.'], en:'On Dano, we ride swings.'},
       {s:'동지에는 팥죽을 먹어요.', tiles:['동지에는','팥죽을','먹어요.'], extra:['팥죽를'], en:'On the winter solstice, we eat red bean porridge.'},
       {s:'동지는 밤이 가장 길어요.', tiles:['동지는','밤이','가장','길어요.'], en:'The winter solstice has the longest night.'}]},
    {type:'sound', title:'소리와 글자가 달라요', who:'dami',
     t:'명절 말에도 소리 비밀이 가득하단다.',
     cmp:[
       {s:'팥죽', d:'팓쭉', n:'ㅌ 받침은 ㄷ처럼, 뒤의 ㅈ은 ㅉ처럼 나요'},
       {s:'오곡밥', d:'오곡빱', n:'ㄱ 받침 뒤의 ㅂ은 ㅃ처럼 나요'},
       {s:'연날리기', d:'열랄리기', n:'ㄴ과 ㄹ이 만나 둘 다 ㄹ처럼 나요'},
       {s:'달맞이', d:'달마지', n:'ㅈ 받침이 뒤로 건너가요'}],
     note:'연날리기의 [열랄리기]는 한라산의 [할라산]과 같은 비밀이란다. ㄴ과 ㄹ이 만나면 ㄹ끼리 어울리지.'},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'들리는 말을 써 봐.',
     items:[
       {w:'팥죽', en:'red bean porridge', hint:{who:'dami', t:'소리는 [팓쭉]이지만 ‘팥’의 받침은 ㅌ이란다.'}},
       {w:'그네', en:'swing'},
       {w:'씨름', en:'Korean wrestling'}]}
  ],
  dictWords:[{w:'단오', en:'Dano'}, {w:'그네', en:'swing'}, {w:'씨름', en:'wrestling'}, {w:'동지', en:'winter solstice'}, {w:'팥죽', en:'red bean porridge'}] },

{ n:9, bundle:3, title:'동짓날 팥죽',
  steps:[
    {type:'intro', who:'tori',
     t:'오늘은 동지, 한 해 가운데 밤이 가장 긴 날이야. 할머니가 팥죽을 쑤고 계셔! 먼저 글자 없이 귀로만 들어 봐.',
     big:'동짓날 팥죽'},
    {type:'dialogue', title:'이야기를 들어요', who:'tori',
     t:'처음부터 듣기를 눌러 봐. 다 듣고 나면 글자 보기를 눌러.',
     lines:[
       {who:'halmi', t:'얘들아, 오늘은 동지란다. 한 해 가운데 밤이 가장 긴 날이지.', en:'Kids, today is the winter solstice. It is the longest night of the year.'},
       {who:'tori', t:'할머니, 그래서 팥죽을 쑤세요?', en:"Grandma, is that why you're making red bean porridge?"},
       {who:'halmi', t:'그렇단다. 옛날 사람들은 붉은 팥이 나쁜 기운을 쫓는다고 믿었지.', en:'Yes. People long ago believed red beans chase away bad luck.'},
       {who:'moi', t:'팥죽 속에 동그란 게 있어요!', en:'There are round things in the porridge!'},
       {who:'halmi', t:'새알심이란다. 나이만큼 먹는다는 말도 있지.', en:'Those are rice balls. Some say you eat as many as your age.'},
       {who:'tori', t:'저는 아홉 살이니까 아홉 개 먹을래요!', en:"I'm nine, so I'll eat nine!"},
       {who:'moi', t:'밤이 제일 길면, 달토끼는 오늘 제일 오래 방아를 찧겠네요!', en:'If the night is the longest, the moon rabbit will pound rice cakes the longest tonight!'},
       {who:'halmi', t:'허허, 그렇겠구나. 그럼 우리도 팥죽 먹고 한 밤 더 공부해 볼까?', en:'Ho ho, I suppose so. Then shall we eat our porridge and study one more night too?'}],
     note:{who:'halmi', t:'설날에는 떡국, 대보름에는 부럼, 단오에는 그네, 추석에는 송편, 동지에는 팥죽. 한국의 명절은 계절마다 먹는 것과 노는 것이 다르단다. 명절이 오면 식구가 모여 한 해를 무사히 보내기를 빌지.'}},
    {type:'choose', title:'이야기를 떠올려요', who:'tori',
     t:'방금 들은 이야기를 떠올려 봐.',
     qs:[
       {t:'동지는 어떤 날이에요?', o:['밤이 가장 긴 날','낮이 가장 긴 날'], a:'밤이 가장 긴 날'},
       {t:'동지에 먹는 음식은?', o:['팥죽','떡국','송편'], a:'팥죽'},
       {t:'토리는 새알심을 몇 개 먹는대요?', o:['아홉 개','여덟 개','열 개'], a:'아홉 개', why:'토리는 아홉 살이라서 아홉 개를 먹겠다고 했어요.'},
       {t:'옛날 사람들은 붉은 팥이 무엇을 한다고 믿었어요?', o:['나쁜 기운을 쫓아요','비를 오게 해요'], a:'나쁜 기운을 쫓아요'}]},
    {type:'choose', title:'토리가 되어 말해요', who:'tori',
     t:'이번엔 네가 토리야. 누가 묻는지 잘 보고 대답해 봐.',
     qs:[
       {pic:'mo_patjuk', line:{who:'halmi', t:'토리야, 팥죽 맛이 어떠니?'}, en:'Tori, how does the porridge taste?', o:['정말 맛있어요!','정말 맛있어!'], a:'정말 맛있어요!', why:'할머니께는 높이는 말로 대답해요.'},
       {pic:'mo_swing', line:{who:'moi', t:'토리야, 단오에 뭐 할 거야?'}, en:'Tori, what will you do on Dano?', o:['그네 뛸 거야!','팥죽 먹을 거야!'], a:'그네 뛸 거야!', why:'단오에는 그네를 뛰어요.'},
       {pic:'mo_nuts', t:'정월대보름 아침, 가족에게 뭐라고 할까요?', o:['부럼 깨요! 올해도 튼튼하게!','새해 복 많이 받으세요!'], a:'부럼 깨요! 올해도 튼튼하게!', why:'새해 복 많이 받으세요는 설날 인사예요.'}]},
    {type:'task', title:'우리 집 명절 달력', who:'moi',
     t:'가족과 명절 달력을 만들어 봐. 다 하면 했어요를 눌러.',
     lines:[
       {when:'달력에 적어요', say:'정월대보름, 단오, 동지는 언제예요?', sub:'음력이라 해마다 날짜가 달라요. 어른께 여쭤봐요.'},
       {when:'명절마다 하는 일을 적어요', say:'동지에는 팥죽을 먹어요.', sub:'대보름에는 부럼, 단오에는 그네.'},
       {when:'다음 명절이 오면', say:'오늘은 ______이에요!', sub:'가족과 그날의 음식이나 놀이를 하나 해 봐요.'}],
     parent:'정월대보름과 단오는 음력이라 해마다 양력 날짜가 바뀌고, 동지는 양력 12월 21일이나 22일 무렵입니다. 달력에 올해 날짜를 함께 찾아 적어 보세요. 부럼은 호두나 땅콩으로 간단히 할 수 있고, 팥죽은 한인 마트에서 파는 것을 데워 먹어도 충분합니다. 견과류 알레르기가 있는 아이는 부럼 대신 다른 방법으로 한 해의 건강을 빌어 주세요.'}
  ],
  dictWords:[] },

/* ---- 우리 집 요리 --------------------------------------------------
   부엌 도구(칼, 도마, 냄비, 숟가락, 젓가락)와 요리 동작(씻어요, 썰어요, 넣어요, 섞어요, 끓여요, 볶아요, 말아요).
   아이는 칼과 불을 쓰지 않고 어른께 부탁하도록 "~아/어 주세요"를 가르칩니다(썰어 주세요, 도와주세요). */
{ n:10, bundle:4, title:'부엌 말',
  steps:[
    {type:'intro', who:'moi',
     t:'오늘은 부엌에 들어가 봐! 요리할 때 쓰는 도구와 동작을 모아 왔어. 칼과 불은 어른과 함께야.',
     big:'부엌 말'},
    {type:'pairs', title:'부엌 도구', who:'moi',
     t:'부엌에 있는 도구야. 그림을 누르면 소리가 나.',
     singles:[
       {w:'칼', pic:'mo_knife', en:'knife'}, {w:'도마', pic:'mo_knife', en:'cutting board'}, {w:'냄비', pic:'mo_pot', en:'pot'},
       {w:'숟가락', pic:'mo_spoons', en:'spoon'}, {w:'젓가락', pic:'mo_spoons', en:'chopsticks'}, {w:'그릇', pic:'mo_mix', en:'bowl'}],
     tip:{who:'dami', t:'한국에서는 숟가락과 젓가락을 함께 쓴단다. 둘을 합쳐 수저라고 하지. 밥과 국은 숟가락으로, 반찬은 젓가락으로 먹는단다.'}},
    {type:'pairs', title:'요리하는 동작', who:'moi',
     t:'요리할 때 쓰는 움직이는 말이야.',
     singles:[
       {w:'씻어요', pic:'act_wash', en:'wash'}, {w:'썰어요', pic:'mo_knife', en:'slice, cut'}, {w:'넣어요', pic:'mo_pot', en:'put in'},
       {w:'섞어요', pic:'mo_mix', en:'mix'}, {w:'끓여요', pic:'mo_boil', en:'boil'}, {w:'볶아요', pic:'mo_boil', en:'stir-fry'}],
     tip:{who:'tori', t:'썰어요와 끓여요는 칼과 불을 쓰니까 꼭 어른과 함께해야 해. 씻어요, 넣어요, 섞어요는 우리도 할 수 있어!'}},
    {type:'choose', title:'어떻게 해요?', who:'tori',
     t:'그림에 맞는 말을 골라 봐.',
     qs:[
       {pic:'mo_mix', o:['섞어요','끓여요','썰어요'], a:'섞어요'},
       {pic:'mo_boil', o:['끓여요','씻어요','넣어요'], a:'끓여요'},
       {pic:'mo_spoons', t:'숟가락과 젓가락을 합쳐서?', o:['수저','그릇','도마'], a:'수저'},
       {pic:'mo_knife', t:'칼을 쓸 때는?', o:['어른과 함께해요.','혼자 해요.'], a:'어른과 함께해요.'}]},
    {type:'choose', mode:'pic', title:'듣고 그림을 골라요', who:'moi',
     t:'내가 말하는 그림을 찾아 봐.',
     qs:[
       {say:'냄비', o:['mo_pot','mo_mix','mo_knife'], a:'mo_pot'},
       {say:'젓가락', o:['mo_knife','mo_spoons','mo_pot'], a:'mo_spoons'},
       {say:'끓여요', o:['mo_mix','mo_boil','act_wash'], a:'mo_boil'}]},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'부엌 말을 써 봐.',
     items:[{w:'냄비', en:'pot'}, {w:'칼', en:'knife'}, {w:'숟가락', en:'spoon', hint:{who:'dami', t:'소리는 [숟까락]이지만 받침은 ㄷ이고 ‘가’를 쓴단다.'}}]}
  ],
  dictWords:[{w:'칼', en:'knife'}, {w:'도마', en:'cutting board'}, {w:'냄비', en:'pot'}, {w:'숟가락', en:'spoon'}, {w:'젓가락', en:'chopsticks'}, {w:'그릇', en:'bowl'}] },

{ n:11, bundle:4, title:'김밥을 말아요',
  steps:[
    {type:'intro', who:'tori',
     t:'오늘은 김밥 마는 순서를 배워. 그리고 어른께 도와 달라고 부탁하는 말도 배울 거야.',
     big:'김밥을 말아요'},
    {type:'sequence', title:'김밥 마는 순서', who:'moi',
     t:'김밥 만드는 순서가 섞였어. 차례대로 눌러 줘.',
     qs:[
       {cards:[{pic:'mo_mix', t:'밥에 참기름과 소금을 넣고 섞어요.'}, {pic:'mo_gim', t:'김 위에 밥을 펴고 재료를 올려요.'}, {pic:'mo_roll', t:'돌돌 말아요.'}, {pic:'mo_cut', t:'어른이 칼로 썰어요.'}]}]},
    {type:'tense', title:'부탁하는 말', who:'dami',
     t:'어른께 무엇을 해 달라고 할 때는 움직이는 말에 주세요를 붙인단다. 썰어요는 썰어 주세요, 도와요는 도와주세요.',
     cols:['움직이는 말', '부탁할 때'],
     groups:[{rule:'~아/어 주세요', rows:[['썰어요','썰어 주세요'], ['넣어요','넣어 주세요'], ['도와요','도와주세요'], ['보여요','보여 주세요'], ['끓여요','끓여 주세요']]}],
     note:'셋째 달의 물 주세요는 물건을 달라는 말이었지. 이번 주세요는 일을 해 달라는 부탁이란다. 칼과 불이 필요한 일은 이렇게 어른께 부탁하거라.'},
    {type:'choose', title:'어떻게 부탁할까요?', who:'tori',
     t:'어른께 알맞게 부탁한 쪽을 골라 봐.',
     qs:[
       {pic:'mo_knife', t:'김밥을 썰어야 해요.', o:['엄마, 김밥 좀 썰어 주세요.','제가 칼로 썰게요.'], a:'엄마, 김밥 좀 썰어 주세요.', why:'칼은 어른께 부탁해요.'},
       {pic:'mo_boil', t:'국을 끓여야 해요.', o:['아빠, 끓여 주세요.','아빠, 끓여 줘요 주세요.'], a:'아빠, 끓여 주세요.'},
       {pic:'mo_roll', t:'김밥이 잘 안 말려요.', o:['할머니, 도와주세요.','할머니, 도와요.'], a:'할머니, 도와주세요.'},
       {pic:'mo_mix', t:'밥에 소금을 넣어요. 조금? 많이?', o:['조금 넣어요.','아주 많이 넣어요.'], a:'조금 넣어요.', why:'소금은 조금만!'}]},
    {type:'build', title:'문장을 만들어요', who:'moi',
     t:'낱말 카드를 차례대로 눌러서 문장을 만들어 봐.',
     qs:[
       {s:'김 위에 밥을 펴요.', tiles:['김','위에','밥을','펴요.'], en:'Spread the rice on the seaweed.'},
       {s:'재료를 올리고 돌돌 말아요.', tiles:['재료를','올리고','돌돌','말아요.'], en:'Put the fillings on and roll it up.'},
       {s:'엄마, 김밥 좀 썰어 주세요.', tiles:['엄마,','김밥','좀','썰어','주세요.'], en:'Mom, please slice the gimbap.'},
       {s:'할아버지, 도와주세요.', tiles:['할아버지,','도와주세요.'], extra:['도와요.'], en:'Grandpa, please help me.'}]},
    {type:'sound', title:'소리와 글자가 달라요', who:'dami',
     t:'요리 말에는 조용한 받침과 겹받침이 많단다.',
     cmp:[
       {s:'넣어요', d:'너어요', n:'ㅎ 받침은 소리가 나지 않아요'},
       {s:'끓여요', d:'끄려요', n:'ㅀ 가운데 ㅎ은 조용하고 ㄹ이 건너가요'},
       {s:'볶아요', d:'보까요', n:'ㄲ 받침이 뒤로 건너가요'},
       {s:'섞어요', d:'서꺼요', n:'ㄲ 받침이 뒤로 건너가요'}],
     note:'넣어요의 ㅎ은 좋아해요, 괜찮아요의 ㅎ처럼 조용하단다. 끓여요의 ‘끓’에는 ㄹ과 ㅎ이 함께 있고, 여기서도 ㅎ은 조용히 숨지.'},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'들리는 말을 써 봐.',
     items:[
       {w:'넣어요', en:'put in', hint:{who:'dami', t:'소리는 [너어요]지만 ‘넣’에는 조용한 ㅎ 받침이 있단다.'}},
       {w:'섞어요', en:'mix', hint:{who:'dami', t:'‘섞’의 받침은 ㄲ, 쌍기역이란다.'}},
       {w:'볶아요', en:'stir-fry'}]}
  ],
  dictWords:[{w:'넣어요', en:'put in'}, {w:'섞어요', en:'mix'}, {w:'볶아요', en:'stir-fry'}, {w:'썰어요', en:'slice'}, {w:'도와주세요', en:'please help'}] },

{ n:12, bundle:4, title:'할아버지와 떡볶이 만들기',
  steps:[
    {type:'intro', who:'tori',
     t:'담이 할아버지 댁에서 떡볶이를 만들어! 셋째 달에 할아버지가 만들어 주셨던 그 떡볶이야. 먼저 귀로만 들어 봐.',
     big:'같이 떡볶이를 만들어요'},
    {type:'dialogue', title:'이야기를 들어요', who:'tori',
     t:'처음부터 듣기를 눌러 봐. 누가 무엇을 하는지 잘 들어 봐. 다 듣고 나면 글자 보기를 눌러.',
     lines:[
       {who:'dami', t:'오늘은 다 같이 떡볶이를 만들어 볼까?', en:'Shall we all make tteokbokki today?'},
       {who:'tori', t:'네! 제가 떡을 씻을게요.', en:"Yes! I'll wash the rice cakes."},
       {who:'moi', t:'나는 어묵을 넣을래!', en:"I'll put in the fish cakes!"},
       {who:'dami', t:'칼은 이 할아버지가 쓸 테니, 토리는 양념을 섞거라.', en:"I'll use the knife, so you mix the sauce, Tori."},
       {who:'tori', t:'할아버지, 파를 썰어 주세요.', en:'Grandpa, please slice the green onions.'},
       {who:'dami', t:'오냐. 이제 냄비에 다 넣고 보글보글 끓이자.', en:"All right. Now let's put it all in the pot and let it bubble."},
       {who:'moi', t:'음, 조금 매워요. 그래도 맛있어요!', en:"Mmm, it's a little spicy. But it's delicious!"},
       {who:'tori', t:'우리가 같이 만들어서 더 맛있어요. 잘 먹겠습니다!', en:"It's tastier because we made it together. Thank you for the food!"}],
     note:{who:'dami', t:'토리는 씻고 섞고, 모이는 넣고, 칼과 불은 이 할아버지가 맡았지. 요리는 이렇게 할 수 있는 일을 나누어 하는 거란다. 그리고 셋째 달에 배운 잘 먹겠습니다로 끝냈구나.'}},
    {type:'letter', title:'나의 요리 카드', who:'tori',
     t:'칸마다 골라서 요리 카드를 만들어 봐. 인쇄해서 부엌에 붙여도 좋아.',
     parts:[
       {label:'요리 이름', opts:['오늘의 요리: 떡볶이', '오늘의 요리: 김밥', '오늘의 요리: 주먹밥']},
       {label:'먼저', opts:['먼저 손을 깨끗이 씻어요.', '먼저 재료를 씻어요.']},
       {label:'그다음에', opts:['그다음에 재료를 그릇에 넣고 섞어요.', '그다음에 김 위에 밥을 펴요.']},
       {label:'어른께 부탁', opts:['칼과 불은 어른께 부탁해요.', '엄마, 썰어 주세요.', '아빠, 끓여 주세요.']},
       {label:'마지막에', opts:['마지막에 잘 먹겠습니다!', '마지막에 가족과 함께 먹어요.']}],
     noName:true, readLabel:'요리 카드 읽어 주기'},
    {type:'choose', title:'이야기를 떠올려요', who:'tori',
     t:'방금 들은 이야기를 떠올려 봐.',
     qs:[
       {t:'토리는 무엇을 했어요?', o:['떡을 씻고 양념을 섞었어요','칼로 파를 썰었어요'], a:'떡을 씻고 양념을 섞었어요'},
       {t:'칼은 누가 썼어요?', o:['담이 할아버지','토리','모이'], a:'담이 할아버지'},
       {t:'모이는 무엇을 넣었어요?', o:['어묵','파','떡'], a:'어묵'},
       {t:'떡볶이 맛은 어땠어요?', o:['조금 맵지만 맛있어요','너무 짜요'], a:'조금 맵지만 맛있어요'}]},
    {type:'task', title:'우리 집 요리', who:'moi',
     t:'가족과 한국 음식을 하나 만들어 봐. 다 하면 했어요를 눌러.',
     lines:[
       {when:'시작할 때', say:'같이 요리해요!', sub:'손부터 깨끗이 씻어요.'},
       {when:'내가 하는 일', say:'제가 섞을게요. 제가 넣을게요.', sub:'씻어요, 넣어요, 섞어요, 말아요는 우리가 해요.'},
       {when:'어른께 부탁할 때', say:'썰어 주세요. 끓여 주세요.', sub:'칼과 불은 꼭 어른께.'}],
     parent:'김밥, 주먹밥, 떡볶이처럼 간단한 한국 음식을 아이와 함께 만들어 보세요. 아이에게는 씻기, 넣기, 섞기, 말기처럼 칼과 불을 쓰지 않는 일을 맡기고, 썰기와 끓이기는 어른이 하시되 아이가 "썰어 주세요"처럼 한국어로 부탁하게 해 주세요. 요리 중에 "조금", "많이", "한 숟가락" 같은 말을 자연스럽게 써 주시면 좋습니다. 음식 알레르기가 있는 가족은 재료를 바꿔 주세요.'}
  ],
  dictWords:[] },

/* ---- 속담 -------------------------------------------------------
   아이가 쓰기 쉬운 속담 여섯(누워서 떡 먹기, 호랑이도 제 말 하면 온다, 원숭이도 나무에서 떨어진다,
   가는 말이 고와야 오는 말이 곱다, 티끌 모아 태산, 세 살 버릇 여든까지 간다)과 쓰는 때를 배웁니다.
   셋째 밤은 호랑이 담이가 등장하며 "호랑이도 제 말 하면 온다"를 몸소 보여 주는 이야기입니다. */
{ n:13, bundle:5, title:'재미있는 옛말',
  steps:[
    {type:'intro', who:'moi',
     t:'속담은 옛날부터 전해 오는 짧은 지혜의 말이야. 그림처럼 재미있는 말이 많아. 오늘은 속담 여섯 개를 만나 보자.',
     big:'누워서 떡 먹기'},
    {type:'pairs', title:'속담 여섯', who:'dami',
     t:'그림을 누르면 속담을 들을 수 있단다. 뜻 보기로 뜻도 꼭 보거라.',
     singles:[
       {w:'누워서 떡 먹기', pic:'mo_lie_eat', en:'as easy as eating rice cake lying down (very easy)'},
       {w:'호랑이도 제 말 하면 온다', pic:'mo_tiger_come', en:'speak of the tiger and he appears (speak of the devil)'},
       {w:'원숭이도 나무에서 떨어진다', pic:'mo_monkey', en:'even monkeys fall from trees (anyone can make mistakes)'},
       {w:'가는 말이 고와야 오는 말이 곱다', pic:'mo_kindwords', en:'kind words out bring kind words back'},
       {w:'티끌 모아 태산', pic:'mo_dust', en:'specks of dust make a mountain (little by little)'},
       {w:'세 살 버릇 여든까지 간다', pic:'mo_habit', en:'habits at three last until eighty'}],
     tip:{who:'dami', t:'호랑이도 제 말 하면 온다는 이 할아버지 이야기가 아니란다. 허허. 누군가 이야기를 하고 있는데 바로 그 사람이 나타날 때 쓰는 말이지.'}},
    {type:'choose', title:'무슨 뜻일까요?', who:'tori',
     t:'속담의 뜻을 골라 봐.',
     qs:[
       {pic:'mo_lie_eat', t:'누워서 떡 먹기', o:['아주 쉬워요','아주 어려워요'], a:'아주 쉬워요'},
       {pic:'mo_monkey', t:'원숭이도 나무에서 떨어진다', o:['잘하는 사람도 실수할 수 있어요','원숭이는 나무를 싫어해요'], a:'잘하는 사람도 실수할 수 있어요'},
       {pic:'mo_kindwords', t:'가는 말이 고와야 오는 말이 곱다', o:['내가 좋게 말해야 남도 좋게 말해요','말을 빨리 해야 해요'], a:'내가 좋게 말해야 남도 좋게 말해요'},
       {pic:'mo_dust', t:'티끌 모아 태산', o:['작은 것도 모으면 커져요','산은 먼지가 많아요'], a:'작은 것도 모으면 커져요'}]},
    {type:'choose', mode:'pic', title:'듣고 그림을 골라요', who:'moi',
     t:'내가 말하는 속담의 그림을 찾아 봐.',
     qs:[
       {say:'세 살 버릇 여든까지 간다', o:['mo_habit','mo_dust','mo_lie_eat'], a:'mo_habit'},
       {say:'호랑이도 제 말 하면 온다', o:['mo_monkey','mo_tiger_come','mo_kindwords'], a:'mo_tiger_come'},
       {say:'티끌 모아 태산', o:['mo_dust','mo_habit','high'], a:'mo_dust'}]},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'속담에 나오는 말을 써 봐.',
     items:[{w:'속담', en:'proverb'}, {w:'버릇', en:'habit', hint:{who:'dami', t:'받침은 ㅅ이란다. 버릇이 [버르시]로 소리 나는 걸 떠올리거라.'}}, {w:'원숭이', en:'monkey'}]}
  ],
  dictWords:[{w:'속담', en:'proverb'}, {w:'버릇', en:'habit'}, {w:'원숭이', en:'monkey'}, {w:'티끌', en:'speck of dust'}, {w:'태산', en:'great mountain'}] },

{ n:14, bundle:5, title:'언제 쓸까요?',
  steps:[
    {type:'intro', who:'tori',
     t:'속담은 딱 맞는 때에 쓰면 정말 멋있어. 오늘은 어떤 때에 어떤 속담을 쓰는지 알아볼 거야.',
     big:'이럴 때 이 속담!'},
    {type:'choose', title:'이럴 때 어떤 속담?', who:'tori',
     t:'이야기에 딱 맞는 속담을 골라 봐.',
     qs:[
       {pic:'s_homework', t:'수학 문제가 너무 쉬워서 금방 다 풀었어요.', o:['누워서 떡 먹기','티끌 모아 태산'], a:'누워서 떡 먹기'},
       {pic:'mo_tiger_come', t:'할아버지 이야기를 하는데 할아버지가 문을 열고 들어오셨어요.', o:['호랑이도 제 말 하면 온다','세 살 버릇 여든까지 간다'], a:'호랑이도 제 말 하면 온다'},
       {pic:'fall', t:'달리기를 제일 잘하는 친구가 넘어졌어요.', o:['원숭이도 나무에서 떨어진다','누워서 떡 먹기'], a:'원숭이도 나무에서 떨어진다'},
       {pic:'mo_dust', t:'날마다 백 원씩 모았더니 만 원이 되었어요.', o:['티끌 모아 태산','가는 말이 고와야 오는 말이 곱다'], a:'티끌 모아 태산'},
       {pic:'mo_kindwords', t:'친구에게 고운 말을 했더니 친구도 고운 말로 대답했어요.', o:['가는 말이 고와야 오는 말이 곱다','원숭이도 나무에서 떨어진다'], a:'가는 말이 고와야 오는 말이 곱다'}]},
    {type:'build', title:'문장을 만들어요', who:'moi',
     t:'낱말 카드를 차례대로 눌러서 속담을 넣은 문장을 만들어 봐.',
     qs:[
       {s:'이 문제는 누워서 떡 먹기예요.', tiles:['이','문제는','누워서','떡','먹기예요.'], extra:['먹기이에요.'], en:'This problem is super easy.'},
       {s:'괜찮아. 원숭이도 나무에서 떨어져.', tiles:['괜찮아.','원숭이도','나무에서','떨어져.'], en:"It's okay. Even monkeys fall from trees."},
       {s:'티끌 모아 태산이에요.', tiles:['티끌','모아','태산이에요.'], en:'Little by little, it becomes a mountain.'},
       {s:'가는 말이 고와야 오는 말이 곱다.', tiles:['가는','말이','고와야','오는','말이','곱다.'], en:'Kind words out bring kind words back.'}]},
    {type:'sound', title:'소리와 글자가 달라요', who:'dami',
     t:'속담에는 새로운 소리 비밀이 하나 숨어 있단다.',
     cmp:[
       {s:'떡 먹기', d:'떵먹끼', n:'ㄱ 받침이 ㅁ 앞에서 ㅇ처럼 나요'},
       {s:'곱다', d:'곱따', n:'ㅂ 받침 뒤의 ㄷ은 ㄸ처럼 나요'},
       {s:'떨어진다', d:'떠러진다', n:'ㄹ 받침이 뒤로 건너가요'},
       {s:'말이', d:'마리', n:'ㄹ 받침이 뒤로 건너가요'}],
     note:'떡 먹기의 [떵먹끼]는 옛날의 [옌날]과 같은 비밀이란다. 받침이 뒤의 ㅁ, ㄴ을 닮아서 코로 나는 소리로 바뀌는 게지. 국물이 [궁물], 먹는다가 [멍는다]인 것도 같은 이치란다.'},
    {type:'dict', title:'듣고 써 봐요', who:'tori',
     t:'들리는 말을 써 봐.',
     items:[
       {w:'먹기', en:'eating', hint:{who:'dami', t:'떡 먹기에서는 [먹끼]로 들리지만 ‘기’란다.'}},
       {w:'곱다', en:'is kind, is fine', hint:{who:'dami', t:'소리는 [곱따]지만 ‘다’란다.'}},
       {w:'나무', en:'tree'}]}
  ],
  dictWords:[{w:'먹기', en:'eating'}, {w:'곱다', en:'is kind'}, {w:'나무', en:'tree'}] },

{ n:15, bundle:5, title:'호랑이도 제 말 하면 온다',
  steps:[
    {type:'intro', who:'moi',
     t:'토리랑 담이 할아버지 이야기를 하고 있었는데... 무슨 일이 생겼을까? 먼저 글자 없이 귀로만 들어 봐.',
     big:'호랑이도 제 말 하면 온다'},
    {type:'dialogue', title:'이야기를 들어요', who:'tori',
     t:'처음부터 듣기를 눌러 봐. 속담이 몇 개 나오는지 세어 봐. 다 듣고 나면 글자 보기를 눌러.',
     lines:[
       {who:'moi', t:'토리야, 담이 할아버지는 요즘 뭐 하셔?', en:'Tori, what has Grandpa Dami been up to lately?'},
       {who:'tori', t:'글쎄, 할아버지는 요즘 속담 책을 읽으신대.', en:'Well, I heard he has been reading a book of proverbs.'},
       {who:'dami', t:'허허, 누가 이 할아버지 이야기를 하느냐?', en:"Ho ho, who's talking about me?"},
       {who:'moi', t:'앗! 호랑이도 제 말 하면 온다더니, 진짜 호랑이 할아버지가 오셨어요!', en:'Oh! Speak of the tiger and he appears, and here comes our tiger grandpa!'},
       {who:'dami', t:'허허허, 속담을 딱 맞게 썼구나. 그럼 이 할아버지도 하나 알려 주마. 티끌 모아 태산이란다.', en:'Ho ho ho, you used that proverb just right. Then let me tell you one too. Specks of dust make a mountain.'},
       {who:'tori', t:'아! 달토끼에서 한 밤씩 공부한 게 모여서 보름달이 된 것처럼요?', en:'Oh! Like how studying one night at a time on Dal Tokki added up to a full moon?'},
       {who:'dami', t:'그렇지. 처음에는 기역, 니은 한 글자였는데, 이제는 속담까지 쓰는구나.', en:'Exactly. At first it was one letter like giyeok and nieun, and now you even use proverbs.'},
       {who:'moi', t:'이제 속담도 누워서 떡 먹기예요!', en:'Now proverbs are a piece of cake too!'}],
     note:{who:'dami', t:'이 이야기에 속담이 세 개 나왔지? 호랑이도 제 말 하면 온다, 티끌 모아 태산, 누워서 떡 먹기. 속담은 알맞은 때에 한마디 툭 던지면 말이 훨씬 맛있어진단다. 어른들이 들으시면 깜짝 놀라실 게야.'}},
    {type:'choose', title:'이야기를 떠올려요', who:'tori',
     t:'방금 들은 이야기를 떠올려 봐.',
     qs:[
       {t:'토리와 모이는 누구 이야기를 하고 있었어요?', o:['담이 할아버지','호랑이 할머니','선생님'], a:'담이 할아버지'},
       {t:'할아버지가 나타나자 모이가 쓴 속담은?', o:['호랑이도 제 말 하면 온다','세 살 버릇 여든까지 간다'], a:'호랑이도 제 말 하면 온다'},
       {t:'티끌 모아 태산처럼 토리가 떠올린 것은?', o:['한 밤씩 공부해 보름달이 된 것','떡을 많이 먹은 것'], a:'한 밤씩 공부해 보름달이 된 것'},
       {t:'이야기에 나온 속담은 모두 몇 개예요?', o:['세 개','한 개','다섯 개'], a:'세 개'}]},
    {type:'choose', title:'토리가 되어 말해요', who:'tori',
     t:'이번엔 네가 토리야. 딱 맞는 속담으로 대답해 봐.',
     qs:[
       {line:{who:'moi', t:'토리야, 나 받아쓰기에서 하나 틀렸어. 나는 받아쓰기 잘하는데...'}, en:'Tori, I got one wrong on dictation. And I am good at dictation...', o:['괜찮아. 원숭이도 나무에서 떨어져.','누워서 떡 먹기야.'], a:'괜찮아. 원숭이도 나무에서 떨어져.'},
       {line:{who:'dami', t:'토리야, 날마다 조금씩 저금하면 어떻게 되느냐?'}, en:'Tori, what happens if you save a little every day?', o:['티끌 모아 태산이에요.','호랑이도 제 말 하면 와요.'], a:'티끌 모아 태산이에요.'},
       {pic:'mo_kindwords', t:'동생에게 고운 말을 쓰라고 알려 줘요.', en:'Teach your younger sibling to use kind words.', o:['가는 말이 고와야 오는 말이 곱대.','세 살 버릇 여든까지 간대.'], a:'가는 말이 고와야 오는 말이 곱대.'}]},
    {type:'task', title:'이번 주의 속담', who:'moi',
     t:'속담 하나를 골라 이번 주에 딱 맞는 때에 써 봐. 다 하면 했어요를 눌러.',
     lines:[
       {when:'속담을 하나 골라요', say:'이번 주의 속담은 ______예요.', sub:'종이에 크게 써서 냉장고에 붙여요.'},
       {when:'딱 맞는 때가 오면', say:'누워서 떡 먹기예요!', sub:'가족이 알아듣는지 봐요.'},
       {when:'할머니 할아버지께', say:'할머니, 이 속담 아세요?', sub:'어른들이 아시는 다른 속담도 여쭤봐요.'}],
     parent:'이번 주에 속담 하나를 정해 냉장고에 붙여 두고, 알맞은 상황이 오면 아이가 그 속담을 쓰게 해 주세요. 부모님이 먼저 한 번 써 보이시면 아이가 쓰임을 금방 익힙니다. 조부모님께 어릴 때 들으신 속담을 여쭤보면 오늘 배운 것 말고도 재미있는 속담을 많이 들을 수 있습니다. 속담은 뜻을 설명하기보다 딱 맞는 순간에 들려주는 것이 가장 잘 기억됩니다.'}
  ],
  dictWords:[] }
];

/* ---- 나들이에는 빠른 확인이 없습니다 ---- */
const OUT_CHECK = [];
const OUT_POOL = M7_POOL;

/* 등록 정보 */
const OUTINGS = {
  key: 'outings', title: '나들이', path: 'outings/',
  store: 'daltokki:v1:outings',
  units: OUT_NIGHTS.map(x => ({n: x.n, words: x.dictWords || []})),
  extra: [], pool: () => OUT_POOL,
  num: 8, name: '달토끼 나들이', title2: '달토끼 나들이', nextName: '다음 나들이',
  topics: '전래 놀이, 한국 여행 지도, 명절 더 알기, 우리 집 요리, 속담',
  nights: OUT_NIGHTS, bundles: OUT_BUNDLES, pic: OUT_PIC, keys: OUT_POOL, total: OUT_TOTAL, check: OUT_CHECK,
  prev: null,
  text: {
    welcomePrev: '',
    welcomeFresh: '달토끼 나들이에 온 걸 환영해! 달마다 가는 길 옆에 있는 작은 여행이야. 순서 없이 마음에 드는 꾸러미를 골라서 해 봐.',
    parents: '달토끼 나들이는 일곱 달 과정 옆에 두는 세 밤짜리 주제 꾸러미입니다. 과정 순서와 상관없이 고를 수 있고, 꾸러미마다 알맞은 단계를 적어 두었습니다.',
    allDone: '지금 열린 나들이를 모두 다녀왔어! 새 꾸러미가 열리면 또 떠나자.'
  }
};
