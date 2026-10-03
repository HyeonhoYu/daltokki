/* ══════════════════════════════════════════════════════════════
   달토끼 언어 바꾸기 (한국어, English, Español)
   모든 페이지의 <body> 바로 아래에서 불러옵니다.

   하는 일
   - 화면 위에 언어 버튼을 붙이고, 고른 언어를 브라우저에 기억합니다.
     주소 끝에 ?lang=en 이나 ?lang=es 를 붙여도 그 언어로 열립니다.
   - 화면의 글자 가운데 아래 사전(D)과 문장 틀(P)에 있는 것만 바꿉니다.
     사전에 없는 말은 그대로 둡니다. 그래서 배우는 한국어(낱말, 문장, 한글)는
     번역되지 않고 한국어로 남습니다.
   - 페이지가 나중에 그리는 화면(밤 진행, 피드백, 안내)도 지켜보다가 바꿉니다.
   - 한국어로 돌아오면 원래 글자를 그대로 되돌립니다.

   새 문구를 번역하려면
   - 글자가 늘 같으면 D 에 한 줄: '한국어': ['English', 'Español']
   - 숫자나 이름이 바뀌어 들어가면 P 에 문장 틀 한 줄.
     <C> 한, 두, 세...  <O> 첫째, 둘째...  <M> 달 이름  을 정규식 안에 쓸 수 있습니다.
     번역 쪽의 {1} 은 첫 묶음 그대로, {1:n} 수, {1:o} 차례 수, {1:m} 달 이름,
     {1:ml} 관사가 붙은 달 이름, {1:mL} 관사가 붙고 첫 글자가 대문자,
     {1:t} 다시 번역, {1:c} 정답 뒤의 이야/이란다 떼기, {1:n|night|nights} 단수와 복수.
   - 번역하면 안 되는 곳에는 data-noi18n 을 붙입니다.
   ══════════════════════════════════════════════════════════════ */
(function(){
'use strict';

const LANGS = [
  {k:'ko', full:'한국어', short:'한'},
  {k:'en', full:'English', short:'EN'},
  {k:'es', full:'Español', short:'ES'}
];
const STORE = 'daltokki:lang';

function readLang(){
  try {
    const q = new URLSearchParams(location.search).get('lang');
    if(q && LANGS.some(l => l.k === q)){ try { localStorage.setItem(STORE, q); } catch(e) {} return q; }
  } catch(e) {}
  try { const v = localStorage.getItem(STORE); if(LANGS.some(l => l.k === v)) return v; } catch(e) {}
  return 'ko';
}
let lang = readLang();
const LI = () => lang === 'es' ? 1 : 0;

/* ---- 수와 달 이름 ---- */
const COUNT = ['한','두','세','네','다섯','여섯','일곱','여덟','아홉','열','열한','열두','열세','열네','열다섯'];
const ORD = ['첫째','둘째','셋째','넷째','다섯째','여섯째','일곱째','여덟째','아홉째','열째','열한째','열두째','열셋째','열넷째','열다섯째'];
const byLen = a => a.slice().sort((x, y) => y.length - x.length).join('|');
/* 달 이름: [영어 이름, 영어 문장 속, 스페인어 이름, 스페인어 문장 속] */
const MN = {
  '한글 첫 달':   ['First Moon: Hangul', 'the First Moon', 'Primera luna: hangul', 'la primera luna'],
  '첫째 달':      ['First Moon', 'the First Moon', 'Primera luna', 'la primera luna'],
  '둘째 달':      ['Second Moon', 'the Second Moon', 'Segunda luna', 'la segunda luna'],
  '셋째 달':      ['Third Moon', 'the Third Moon', 'Tercera luna', 'la tercera luna'],
  '넷째 달':      ['Fourth Moon', 'the Fourth Moon', 'Cuarta luna', 'la cuarta luna'],
  '다섯째 달':    ['Fifth Moon', 'the Fifth Moon', 'Quinta luna', 'la quinta luna'],
  '여섯째 달':    ['Sixth Moon', 'the Sixth Moon', 'Sexta luna', 'la sexta luna'],
  '일곱째 달':    ['Seventh Moon', 'the Seventh Moon', 'Séptima luna', 'la séptima luna'],
  '달토끼 나들이': ['Dal Tokki Outings', 'the Dal Tokki Outings', 'Paseos de Dal Tokki', 'los Paseos de Dal Tokki'],
  '다음 나들이':   ['Next outing', 'the next outing', 'Próximo paseo', 'el próximo paseo'],
  '다음 달':      ['Next moon', 'the next moon', 'Próxima luna', 'la próxima luna']
};
const TOK = {
  '<C>': '(' + byLen(COUNT) + ')',
  '<O>': '(' + byLen(ORD) + ')',
  '<M>': '(' + byLen(Object.keys(MN)) + ')'
};

/* ---- 사전: 글자가 늘 같은 문구 ---- */
const D = {
  /* 공통 머리와 바닥 */
  '달토끼 처음으로': ['Dal Tokki home', 'Inicio de Dal Tokki'],
  '밤 고르기': ['Choose a night', 'Elegir noche'],
  '다음': ['Next', 'Siguiente'],
  '소리 힌트': ['Sound hints', 'Pistas de sonido'],
  '소리 안내': ['Sound notice', 'Aviso de sonido'],
  '이 기기에서는 소리가 안 나와요. 글자와 뜻으로 먼저 해 보고, 소리는 다른 기기에서 들어 보세요.': [
    'This device isn\u2019t playing sound. Try it with the letters and meanings first, and listen on another device later.',
    'Este dispositivo no reproduce sonido. Prueba primero con las letras y los significados, y escucha en otro dispositivo después.'],
  '눌러서 닫기': ['Tap to close', 'Toca para cerrar'],
  '받아쓰기실': ['Dictation Room', 'Sala de Dictado'],
  '나들이': ['Outings', 'Paseos'],
  '선생님 방': ['Teacher\u2019s Room', 'Sala del maestro'],
  '녹음실': ['Recording Room', 'Sala de grabación'],
  '나와 우리 집': ['Me and My Home', 'Yo y mi casa'],
  '나의 하루': ['My Day', 'Mi día'],
  '어제와 내 마음': ['Yesterday and My Feelings', 'Ayer y mis sentimientos'],
  '한국에 가요': ['Going to Korea', 'Vamos a Corea'],
  '한국을 알아요': ['Knowing Korea', 'Conozco Corea'],
  '나의 이야기': ['My Story', 'Mi historia'],
  '사파리': ['Safari', 'Safari'],
  '크롬': ['Chrome', 'Chrome'],

  /* 처음 화면 */
  '달토끼 - 아이들을 위한 한국어': ['Dal Tokki - Korean for Kids', 'Dal Tokki - Coreano para niños'],
  '달토끼 처음 화면': ['Dal Tokki home', 'Inicio de Dal Tokki'],
  '어른을 위한 곳': ['For grown-ups', 'Para adultos'],
  '부모님과 선생님께': ['For Parents and Teachers', 'Para padres y maestros'],
  '아이들을 위한 한국어': ['Korean for kids', 'Coreano para niños'],
  '할머니가 보는 달, 내가 보는 달': ['The moon Grandma sees, the moon I see', 'La luna que ve la abuela, la luna que veo yo'],
  '달은 밤마다 조금씩 차올라요. 토리랑 같이 한 밤에 한 걸음씩, 달을 채우며 한국어를 배워요.': [
    'The moon grows a little fuller every night. Learn Korean with Tori one night at a time, filling up the moon as you go.',
    'La luna crece un poquito cada noche. Aprende coreano con Tori, una noche a la vez, llenando la luna paso a paso.'],
  '시작하기': ['Start', 'Empezar'],
  '이어서 하기': ['Continue', 'Continuar'],
  '첫째 달, 첫째 밤부터 시작해요.': ['Begin with Night 1 of the First Moon.', 'Empieza con la noche 1 de la primera luna.'],
  '한글을 조금 읽을 줄 알아요': ['I can already read some Hangul', 'Ya sé leer un poco de hangul'],
  '빠른 확인으로 시작할 밤을 찾아요.': ['A quick check finds the right night to start.', 'Una prueba rápida encuentra la noche para empezar.'],
  '보름달 앞에서 떡방아를 찧는 토끼 토리': ['Tori the rabbit pounding rice cakes in front of a full moon', 'Tori, el conejito, machacando pasteles de arroz frente a la luna llena'],
  '일곱 달': ['Seven Moons', 'Siete lunas'],
  '달은 한 달에 한 번 보름달이 돼요. 달을 하나 가득 채울 때마다 한 단계씩 올라가요. 지금은 일곱 달이 모두 열려 있어요.': [
    'The moon becomes full once a month. Each time you fill a moon, you move up one level. All seven moons are open now.',
    'La luna se llena una vez al mes. Cada vez que llenas una luna, subes un nivel. Ya están abiertas las siete lunas.'],
  '한글': ['Hangul', 'Hangul'],
  '모음, 자음, 받침, 겹받침': ['Vowels, consonants, batchim, double batchim', 'Vocales, consonantes, batchim, batchim doble'],
  '인사, 가족, 숫자, 몸, 우리 집': ['Greetings, family, numbers, body, home', 'Saludos, familia, números, cuerpo, casa'],
  '하루 일과, 학교, 음식, 날씨': ['Daily routine, school, food, weather', 'Rutina diaria, escuela, comida, clima'],
  '지난 일, 기분, 날짜, 길 찾기, 존댓말': ['Past events, feelings, dates, directions, polite speech', 'Hechos pasados, sentimientos, fechas, direcciones, habla respetuosa'],
  '이야기 잇기, 친구, 돈, 한국 방문': ['Linking stories, friends, money, visiting Korea', 'Unir relatos, amigos, dinero, visita a Corea'],
  '비교하기, 설명하기, 설날과 추석, 한글': ['Comparing, describing, Seollal and Chuseok, Hangul', 'Comparar, describir, Seollal y Chuseok, hangul'],
  '편지와 일기, 토론, 옛날이야기, 나의 이야기': ['Letters and diaries, debate, folktales, my story', 'Cartas y diarios, debate, cuentos tradicionales, mi historia'],
  '여덟 밤. 지금 열려 있어요.': ['8 nights. Open now.', '8 noches. Abierta ahora.'],
  '지금 열려 있어요.': ['Open now.', 'Abierta ahora.'],
  '여덟 밤을 모두 마쳤어요.': ['All 8 nights done.', 'Las 8 noches terminadas.'],
  '여덟 밤을 모두 확인으로 통과했어요.': ['All 8 nights passed in the check.', 'Las 8 noches superadas en la prueba.'],
  '연습실': ['Practice Rooms', 'Salas de práctica'],
  '마친 밤의 말로 매일 조금씩 연습해요. 틀린 말은 다음 날 다시 나와서, 잊기 전에 한 번 더 만나요.': [
    'Practice a little every day with words from the nights you\u2019ve finished. Words you miss come back the next day, so you see them again before you forget.',
    'Practica un poco cada día con las palabras de las noches que terminaste. Las que fallas vuelven al día siguiente, para repasarlas antes de olvidarlas.'],
  '하루 5분': ['5 minutes a day', '5 minutos al día'],
  '오늘의 방아. 다섯 개만 듣고 써 봐요. 틀리면 토리와 담이가 왜 틀렸는지 알려 줘요.': [
    'Today\u2019s practice: listen to just five words and write them. If you miss one, Tori and Dami explain why.',
    'La práctica de hoy: escucha solo cinco palabras y escríbelas. Si fallas, Tori y Dami te explican por qué.'],
  '세 밤씩 골라서': ['Three nights at a time', 'De tres en tres noches'],
  '과정 옆의 작은 여행. 전래 놀이, 한국 여행, 명절, 요리, 속담 꾸러미가 있어요. 마음에 드는 것을 골라요.': [
    'Little side trips next to the main course: traditional games, travel in Korea, holidays, cooking, and proverbs. Pick the one you like.',
    'Pequeños viajes junto al curso: juegos tradicionales, viajes por Corea, fiestas, cocina y refranes. Elige el que te guste.'],
  '오늘 방아를 찧었어요.': ['You practiced today.', 'Ya practicaste hoy.'],
  '오늘도 해 볼까요?': ['Want to practice today too?', '¿Practicamos hoy también?'],
  '아직 시작하기 전이에요.': ['Not started yet.', 'Todavía no has empezado.'],
  '아직 떠나기 전이에요.': ['No outings yet.', 'Todavía no has salido de paseo.'],
  '세 친구': ['Three Friends', 'Tres amigos'],
  '밤마다 세 친구가 번갈아 도와줘요. 토리는 달에 사는 토끼, 모이는 소식을 물어다 주는 까치, 담이는 옛날 이야기를 많이 아는 호랑이예요.': [
    'Three friends take turns helping you every night. Tori is a rabbit who lives on the moon, Moi is a magpie who brings news, and Dami is a tiger who knows lots of old stories.',
    'Tres amigos se turnan para ayudarte cada noche. Tori es un conejo que vive en la luna, Moi es una urraca que trae noticias y Dami es un tigre que sabe muchos cuentos antiguos.'],
  '소리와 쓰기': ['Sounds and writing', 'Sonidos y escritura'],
  '말 모으기': ['Word collecting', 'Colecciona palabras'],
  '옛날 이야기': ['Old stories', 'Cuentos antiguos'],
  '나는 귀가 커서 소리를 제일 잘 들어. 소리 내고 받아쓰는 건 내가 도와줄게.': [
    'My ears are big, so I hear sounds best. I\u2019ll help you say sounds and write what you hear.',
    'Tengo orejas grandes, así que oigo mejor que nadie. Te ayudo a pronunciar y a escribir lo que oyes.'],
  '나는 반짝이는 걸 모으는 까치야. 밤마다 새로 배운 말을 같이 모으자.': [
    'I\u2019m a magpie who collects shiny things. Let\u2019s collect the new words we learn each night.',
    'Soy una urraca que colecciona cosas brillantes. Coleccionemos juntos las palabras nuevas de cada noche.'],
  '나는 옛날 이야기를 많이 아는 호랑이란다. 소리와 글자가 다른 까닭은 내가 이야기해 주마.': [
    'I\u2019m a tiger who knows many old stories. When a sound and its spelling don\u2019t match, I\u2019ll tell you why.',
    'Soy un tigre que sabe muchos cuentos antiguos. Cuando el sonido y la escritura no coinciden, yo te cuento por qué.'],
  '달토끼는 미국에서 자라는 한인 2세와 한국어를 배우고 싶은 모든 아이를 위해 만든 무료 사이트입니다. 첫째 달에 한글을 떼고, 둘째 달부터는 그 글자로 말하고 듣고 씁니다. 지금은 일곱째 달까지 모두 열려 있고, 한 달이 열다섯 밤 안팎입니다.': [
    'Dal Tokki is a free site for second-generation Korean American children and any child who wants to learn Korean. In the First Moon, children learn to read Hangul; from the Second Moon on, they use those letters to speak, listen, and write. All seven moons are open now, and each moon has about fifteen nights.',
    'Dal Tokki es un sitio gratuito para niños coreano-estadounidenses de segunda generación y para cualquier niño que quiera aprender coreano. En la primera luna aprenden a leer hangul; desde la segunda luna usan esas letras para hablar, escuchar y escribir. Ya están abiertas las siete lunas, y cada una tiene unas quince noches.'],
  '달마다 배우는 것': ['What each moon covers', 'Qué se aprende en cada luna'],
  '첫째 달은 한글 떼기, 둘째 달은 인사와 가족, 숫자, 몸, 우리 집, 셋째 달은 하루 일과와 학교(주말 한글학교 포함), 음식, 날씨, 넷째 달은 지난 일과 기분, 날짜, 길 찾기, 존댓말, 다섯째 달은 이야기 잇기와 친구, 앞날 말하기, 돈, 한국 방문, 여섯째 달은 비교하기와 설명하기, 설날, 추석, 세종대왕과 한글, 마지막 일곱째 달은 편지와 일기 쓰기, 토론, 옛날이야기, 나의 이야기입니다. 둘째 달부터는 세 밤이 한 묶음으로, 새 말을 만나고, 문장을 만들고, 이야기를 듣는 순서로 갑니다.': [
    'The First Moon teaches reading Hangul. The Second Moon covers greetings, family, numbers, the body, and home. The Third Moon covers daily routines, school (including weekend Korean school), food, and weather. The Fourth Moon covers past events, feelings, dates, directions, and polite speech. The Fifth Moon covers linking ideas into stories, friends, talking about the future, money, and visiting Korea. The Sixth Moon covers comparing and describing, Seollal, Chuseok, and King Sejong and Hangul. The final Seventh Moon covers writing letters and diaries, debate, folktales, and telling your own story. From the Second Moon on, nights come in units of three: meet new words, build sentences, then listen to a story.',
    'La primera luna enseña a leer hangul. La segunda luna trata saludos, familia, números, el cuerpo y la casa. La tercera, la rutina diaria, la escuela (incluida la escuela coreana de fin de semana), la comida y el clima. La cuarta, hechos pasados, sentimientos, fechas, cómo llegar a un lugar y el habla respetuosa. La quinta, cómo unir ideas en un relato, los amigos, hablar del futuro, el dinero y una visita a Corea. La sexta, comparar y describir, Seollal, Chuseok y el rey Sejong y el hangul. La séptima y última, escribir cartas y diarios, debatir, cuentos tradicionales y contar la propia historia. Desde la segunda luna, las noches van en unidades de tres: palabras nuevas, oraciones y luego un cuento.'],
  '하루 10분, 한 밤씩': ['Ten minutes a day, one night at a time', 'Diez minutos al día, una noche a la vez'],
  '한 밤은 10분 남짓입니다. 하루에 한 밤이면 충분합니다. 별 세 개를 받지 못했다면 같은 밤을 다음 날 다시 해도 좋습니다. 반복은 실패가 아니라 떡방아를 찧는 과정입니다. 연습실의 받아쓰기실은 마친 밤의 낱말을 하루 5분씩 다시 불러 줍니다.': [
    'Each night takes about ten minutes, and one night a day is plenty. If your child didn\u2019t earn three stars, it\u2019s fine to repeat the same night the next day. Repetition isn\u2019t failure; it\u2019s how rice cakes get pounded. The Dictation Room brings back words from finished nights for five minutes a day.',
    'Cada noche dura unos diez minutos, y una noche al día es suficiente. Si su hijo no obtuvo tres estrellas, puede repetir la misma noche al día siguiente. Repetir no es fallar; así es como se machaca el pastel de arroz. La Sala de Dictado repasa cinco minutos al día las palabras de las noches terminadas.'],
  '집에서 한국어를 듣고 자란 아이라면': ['If your child grew up hearing Korean at home', 'Si su hijo creció oyendo coreano en casa'],
  '말은 알아듣지만 받침과 맞춤법에서 막히는 경우가 많습니다. 첫 화면의 “한글을 조금 읽을 줄 알아요”를 누르면 짧은 빠른 확인으로 시작할 밤을 찾아 줍니다. 첫째 달을 다 알면 둘째 달 확인으로 이어지고, 그다음 달로 차례로 안내합니다. 달마다 밤 고르기 화면에도 빠른 확인이 있습니다. 호랑이 담이가 나오는 “소리와 글자가 달라요” 화면을 특히 천천히 해 주세요.': [
    'These children often understand spoken Korean but get stuck on final consonants (batchim) and spelling. Pressing \u201cI can already read some Hangul\u201d on the home screen starts a short quick check that finds the right night to begin. If your child knows all of the First Moon, the check continues into the Second Moon, and then each moon after that. Every moon\u2019s night picker also has a quick check. Please go slowly on the screens where Dami the tiger explains that sound and spelling differ.',
    'Estos niños suelen entender el coreano hablado, pero se traban con las consonantes finales (batchim) y la ortografía. Al pulsar \u201cYa sé leer un poco de hangul\u201d en la pantalla de inicio, una prueba rápida encuentra la noche para empezar. Si su hijo domina la primera luna, la prueba sigue con la segunda luna y luego con las siguientes. La pantalla para elegir noche de cada luna también tiene una prueba rápida. Vaya despacio en las pantallas donde Dami el tigre explica que el sonido y la escritura no coinciden.'],
  '처음 배우는 아이라면': ['If your child is just starting', 'Si su hijo empieza desde cero'],
  '첫째 달 첫째 밤부터 순서대로 가면 됩니다. 로마자 표기 없이 소리와 글자만으로 배우도록 만들었습니다. 첫째 달에서 소리 힌트를 켜면 영어식 발음 힌트가 잠깐 도움을 줍니다. 둘째 달부터는 낱말과 문장마다 “뜻 보기”로 영어 뜻을 볼 수 있습니다.': [
    'Start at Night 1 of the First Moon and go in order. Lessons use sounds and letters only, without romanization. In the First Moon, turning on Sound hints shows a brief English-style pronunciation hint. From the Second Moon on, every word and sentence has a \u201cMeaning\u201d button that shows its English meaning.',
    'Empiece en la noche 1 de la primera luna y siga en orden. Se aprende solo con sonidos y letras, sin romanización. En la primera luna, al activar las pistas de sonido aparece una breve pista de pronunciación al estilo inglés. Desde la segunda luna, cada palabra y oración tiene un botón \u201cSignificado\u201d que muestra su significado en inglés.'],
  '셋째 밤은 가족과 함께': ['The third night is for family', 'La tercera noche es en familia'],
  '묶음의 셋째 밤마다 집에서 해 볼 가족 과제가 있습니다. 할머니 할아버지께 인사하기, 밥상 인사, 날씨 알려 드리기처럼 배운 말을 실제로 써 보는 일입니다. 과제 화면의 부모님 안내에 방법을 적어 두었고, 인쇄해서 냉장고에 붙여 두실 수도 있습니다. 친구에게 하는 말과 어른께 하는 말을 구별하는 연습이 달마다 이어지니, 집에서도 어른께는 높임말로 답하도록 이끌어 주세요.': [
    'The third night of every unit has a family task to try at home, such as greeting grandparents, saying the mealtime phrases, or telling an adult about the weather. The parent note on the task screen explains how, and you can print it and put it on the fridge. Every moon keeps practicing the difference between talking to friends and talking to adults, so please encourage your child to answer adults with polite speech at home too.',
    'La tercera noche de cada unidad trae una tarea para hacer en casa, como saludar a los abuelos, decir las frases antes y después de comer o contarle a un adulto cómo está el clima. La nota para padres en la pantalla de la tarea explica cómo hacerlo, y puede imprimirla y pegarla en el refrigerador. Cada luna sigue practicando la diferencia entre hablar con amigos y hablar con adultos, así que anime a su hijo a responder a los adultos con lenguaje respetuoso también en casa.'],
  '가입도 광고도 없습니다': ['No sign-ups, no ads', 'Sin registro y sin anuncios'],
  '계정을 만들지 않습니다. 진도는 아이가 쓰는 기기의 브라우저에만 저장되고, 이름이나 개인정보는 모으지 않습니다. 그래서 기기나 브라우저를 바꾸면 진도가 따라가지 않으니, 아이가 늘 같은 기기에서 하도록 해 주세요. 광고와 결제도 없습니다.': [
    'There are no accounts. Progress is saved only in the browser on your child\u2019s device, and no names or personal information are collected. Because of this, progress doesn\u2019t follow your child to a different device or browser, so please have them use the same device each time. There are no ads or payments.',
    'No hay cuentas. El progreso se guarda solo en el navegador del dispositivo de su hijo y no se recopilan nombres ni datos personales. Por eso, el progreso no pasa a otro dispositivo o navegador; procure que su hijo use siempre el mismo. Tampoco hay anuncios ni pagos.'],
  '소리가 안 나면': ['If there\u2019s no sound', 'Si no hay sonido'],
  '녹음된 목소리가 있는 말은 그 목소리로, 아직 녹음하지 않은 말은 기기에 들어 있는 한국어 음성으로 소리를 냅니다. 녹음은 차례로 늘려 가고 있습니다. 윈도우 컴퓨터에서 소리가 나지 않으면 시스템 설정의 음성 항목에서 한국어 음성을 추가하거나, 휴대전화나 태블릿으로 열어 보세요.': [
    'Words that have been recorded play in that recorded voice; words not yet recorded use the Korean voice built into your device. More recordings are being added over time. If a Windows computer makes no sound, add a Korean voice under Speech in system settings, or try a phone or tablet.',
    'Las palabras ya grabadas suenan con esa voz; las que aún no se han grabado usan la voz coreana incluida en su dispositivo. Poco a poco se agregan más grabaciones. Si una computadora con Windows no suena, agregue una voz coreana en la sección de voz de la configuración del sistema, o pruebe con un teléfono o una tableta.'],
  '한글학교 선생님께': ['For Korean school teachers', 'Para maestros de escuelas coreanas'],
  '밤마다 주소가 따로 있어서 숙제 링크로 바로 보내실 수 있습니다. 달의 주소 끝에 밤 번호를 붙이면 됩니다. 예를 들어 셋째 달 여섯째 밤(주말 한글학교 이야기)은': [
    'Every night has its own address, so you can send it directly as a homework link. Just add the night number to the end of the moon\u2019s address. For example, Night 6 of the Third Moon (the weekend Korean school story) is',
    'Cada noche tiene su propia dirección, así que puede enviarla directamente como enlace de tarea. Basta con añadir el número de noche al final de la dirección de la luna. Por ejemplo, la noche 6 de la tercera luna (el cuento de la escuela coreana de fin de semana) es'],
  ' 입니다. 주소 끝을 ': ['. Change the end of the address to ', '. Si cambia el final de la dirección a '],
  '로 바꾸면 그 달의 빠른 확인으로 바로 들어갑니다. ': [' to go straight to that moon\u2019s quick check. In the ', ', irá directamente a la prueba rápida de esa luna. En la '],
  '에서는 밤마다 활동지와 답안을 인쇄하거나 PDF로 저장하실 수 있습니다.': [
    ', you can print each night\u2019s worksheet and answer key or save them as PDFs.',
    ', puede imprimir la hoja de actividades y las respuestas de cada noche o guardarlas en PDF.'],
  '커피 한 잔으로 달토끼를 응원해 주세요': ['Support Dal Tokki with a cup of coffee', 'Apoya a Dal Tokki con un café'],
  '달토끼는 가입도 광고도 결제도 없이 모든 아이에게 무료입니다. 아이에게 도움이 되었다면 운영자에게 커피 한 잔으로 마음을 전해 주세요. 전해진 마음은 온전히 웹사이트 유지와 발전을 위해서만 쓰입니다.': [
    'Dal Tokki is free for every child, with no accounts, ads, or payments. If it has helped your child, you can thank the maker with a coffee. Every gift goes only toward keeping the site running and growing.',
    'Dal Tokki es gratis para todos los niños, sin cuentas, anuncios ni pagos. Si le ha servido a su hijo, puede agradecer al creador con un café. Cada aporte se usa solo para mantener y mejorar el sitio.'],
  '만든 사람': ['Made by', 'Creado por'],
  '앞의 달을 가득 채웠어요.': ['You filled the moon before this one.', 'Llenaste la luna anterior.'],
  '첫째 달 시작하기': ['Start the First Moon', 'Empezar la primera luna'],
  '달토끼의 일곱 달을 모두 마쳤어요!': ['You finished all seven moons of Dal Tokki!', '¡Terminaste las siete lunas de Dal Tokki!'],
  '받아쓰기실에서 날마다 복습해요.': ['Review every day in the Dictation Room.', 'Repasa cada día en la Sala de Dictado.'],
  '그동안 받아쓰기실에서 연습해요.': ['Meanwhile, practice in the Dictation Room.', 'Mientras tanto, practica en la Sala de Dictado.'],
  '다음 밤들은 곧 열려요.': ['The next nights open soon.', 'Las próximas noches se abren pronto.'],
  '곧 열려요': ['Opening soon', 'Muy pronto'],

  /* 소리 환경 안내 (dal.js) */
  '복사했어요': ['Copied', 'Copiado'],
  '다른 브라우저로 열기': ['Open in another browser', 'Abrir en otro navegador'],
  '주소 복사': ['Copy link', 'Copiar enlace'],
  '닫기': ['Close', 'Cerrar'],
  '카카오톡 안에서 열려 있어요': ['This page is open inside KakaoTalk', 'Esta página está abierta dentro de KakaoTalk'],
  '카카오톡 안의 브라우저에서는 소리가 나지 않을 수 있어요. 아래 버튼을 누르거나, 오른쪽 위 더보기 메뉴에서 \u2018다른 브라우저로 열기\u2019를 눌러 주세요.': [
    'Sound may not work in KakaoTalk\u2019s built-in browser. Press the button below, or choose \u2018Open in another browser\u2019 from the menu at the top right.',
    'Es posible que el sonido no funcione en el navegador de KakaoTalk. Pulse el botón de abajo o elija \u2018Abrir en otro navegador\u2019 en el menú de arriba a la derecha.'],
  '앱 안의 브라우저에서 열려 있어요': ['This page is open in an in-app browser', 'Esta página está abierta en el navegador de una app'],
  '파이어폭스에서는 한국어 음성을 찾지 못했어요': ['No Korean voice found in Firefox', 'No se encontró una voz coreana en Firefox'],
  '파이어폭스는 기기에 깔린 음성만 쓸 수 있어요. 크롬이나 엣지, 사파리로 열면 소리가 나요.': [
    'Firefox can only use voices installed on the device. Open this page in Chrome, Edge, or Safari to hear sound.',
    'Firefox solo puede usar las voces instaladas en el dispositivo. Abra la página en Chrome, Edge o Safari para escuchar el sonido.'],
  '이 기기에서 한국어 음성을 찾지 못했어요': ['No Korean voice found on this device', 'No se encontró una voz coreana en este dispositivo'],
  '설정에서 \u2018음성\u2019을 검색해 한국어 음성을 내려받으면 소리가 나요. 내려받은 뒤에는 이 페이지를 새로 고쳐 주세요.': [
    'Search for \u2018Voice\u2019 in Settings and download a Korean voice. After downloading, reload this page.',
    'Busque \u2018Voz\u2019 en Configuración y descargue una voz coreana. Después, vuelva a cargar esta página.'],
  '이 휴대전화에서 한국어 음성을 찾지 못했어요': ['No Korean voice found on this phone', 'No se encontró una voz coreana en este teléfono'],
  '휴대전화 설정에서 \u2018텍스트 음성 변환\u2019을 찾아 한국어 음성 데이터를 내려받으면 소리가 나요. 크롬 브라우저로 열어 보는 것도 방법이에요.': [
    'In your phone\u2019s settings, find \u2018Text-to-speech\u2019 and download Korean voice data. Opening this page in Chrome can also help.',
    'En la configuración del teléfono, busque \u2018Texto a voz\u2019 y descargue los datos de voz en coreano. También puede abrir esta página en Chrome.'],
  '이 컴퓨터에서 한국어 음성을 찾지 못했어요': ['No Korean voice found on this computer', 'No se encontró una voz coreana en esta computadora'],
  '크롬이나 엣지로 열어 보세요. 그래도 소리가 안 나면 윈도우 설정에서 \u2018음성\u2019을 찾아 한국어 음성을 추가해 주세요.': [
    'Try opening this page in Chrome or Edge. If there\u2019s still no sound, find \u2018Speech\u2019 in Windows Settings and add a Korean voice.',
    'Pruebe a abrir la página en Chrome o Edge. Si sigue sin sonido, busque \u2018Voz\u2019 en la Configuración de Windows y agregue una voz coreana.'],
  '시스템 설정에서 \u2018음성\u2019을 검색해 한국어 음성을 추가하거나, 크롬이나 사파리로 열어 보세요.': [
    'Search for \u2018Voice\u2019 in System Settings and add a Korean voice, or open this page in Chrome or Safari.',
    'Busque \u2018Voz\u2019 en Configuración del Sistema y agregue una voz coreana, o abra la página en Chrome o Safari.'],
  '이 브라우저에서 한국어 음성을 찾지 못했어요': ['No Korean voice found in this browser', 'No se encontró una voz coreana en este navegador'],
  '크롬이나 사파리로 열어 보세요.': ['Try opening this page in Chrome or Safari.', 'Pruebe a abrir la página en Chrome o Safari.'],

  /* 받아쓰기 도움말 (dal.js) */
  '받침이 두 개인 말이란다.': ['This word has two final consonants.', 'Esta palabra tiene dos consonantes finales.'],
  '숨어 있던 받침을 찾아보거라.': ['Look for the hidden batchim.', 'Busca el batchim escondido.'],
  '소리는 잘 들었구나.': ['You heard the sound well.', 'Oíste bien el sonido.'],
  '그런데 글자는 소리와 조금 다르단다.': ['But the spelling is a little different from the sound.', 'Pero la escritura es un poco distinta del sonido.'],
  '끝에 받침이 있어.': ['There\u2019s a batchim at the end.', 'Hay un batchim al final.'],
  '끝소리를 다시 잘 들어 봐.': ['Listen carefully to the last sound again.', 'Escucha otra vez con atención el último sonido.'],
  '받침 소리가 달라.': ['The batchim sound is different.', 'El sonido del batchim es distinto.'],
  '입을 다무는지, 혀가 올라가는지, 코로 울리는지 잘 들어 봐.': [
    'Listen for whether your lips close, your tongue goes up, or the sound hums in your nose.',
    'Fíjate si se cierran los labios, si sube la lengua o si suena por la nariz.'],
  '받침이 없는 글자가 있어.': ['One of the syllables has no batchim.', 'Una de las sílabas no lleva batchim.'],
  '다시 들어 봐.': ['Listen again.', 'Escucha otra vez.'],
  '목에 힘을 꽉 준 소리야.': ['It\u2019s a tight sound, with force in the throat.', 'Es un sonido tenso, con fuerza en la garganta.'],
  '쌍둥이 자음을 떠올려 봐.': ['Think of the twin consonants.', 'Piensa en las consonantes dobles.'],
  '숨이 세게 터져 나오는 소리야.': ['It\u2019s a sound with a strong puff of air.', 'Es un sonido con un fuerte soplo de aire.'],
  '손바닥을 입 앞에 대고 들어 봐.': ['Hold your palm in front of your mouth and listen.', 'Pon la palma frente a la boca y escucha.'],
  '힘을 빼고 부드럽게 내는 소리야.': ['It\u2019s a soft, relaxed sound.', 'Es un sonido suave y relajado.'],
  '모음에 획이 하나 더 있어.': ['The vowel has one more stroke.', 'La vocal tiene un trazo más.'],
  '획이 하나 적은 모음이야.': ['The vowel has one stroke fewer.', 'Es una vocal con un trazo menos.'],
  '이 모음은 요즘 소리가 똑같아서 귀로는 구별이 안 돼.': ['These vowels sound the same today, so you can\u2019t tell them apart by ear.', 'Hoy estas vocales suenan igual, así que no se distinguen de oído.'],
  '뜻을 생각하면서 골라 봐.': ['Think about the meaning and choose.', 'Piensa en el significado y elige.'],
  '모음을 다시 잘 들어 봐.': ['Listen to the vowel again carefully.', 'Escucha otra vez la vocal con atención.'],
  '입을 크게 벌리는지, 동그랗게 모으는지.': ['Does your mouth open wide, or make a round shape?', '¿Abres mucho la boca o la redondeas?'],
  '첫소리를 다시 잘 들어 봐.': ['Listen to the first sound again carefully.', 'Escucha otra vez con atención el primer sonido.'],
  '글자 수가 달라.': ['The number of syllables is different.', 'El número de sílabas es distinto.'],
  '몇 글자로 들리는지 세어 봐.': ['Count how many syllables you hear.', 'Cuenta cuántas sílabas oyes.'],
  '괜찮아.': ['It\u2019s okay.', 'Está bien.'],
  '한 번 더 들어 보고 아는 데까지만 써 봐.': ['Listen once more and write as much as you know.', 'Escucha una vez más y escribe lo que sepas.'],
  '내일 다시 나올 거야.': ['It\u2019ll come up again tomorrow.', 'Volverá a salir mañana.'],
  '겹받침 (닭을 닥으로 쓰는 식)': ['Double batchim (writing 닭 as 닥)', 'Batchim doble (escribir 닭 como 닥)'],
  '소리 나는 대로 받침 쓰기 (옷을 옫으로 쓰는 식)': ['Writing batchim as it sounds (writing 옷 as 옫)', 'Escribir el batchim como suena (escribir 옷 como 옫)'],
  '받침 빠뜨리기 (산을 사로 쓰는 식)': ['Leaving out a batchim (writing 산 as 사)', 'Omitir el batchim (escribir 산 como 사)'],
  '받침 소리 구별 (산과 상)': ['Telling batchim sounds apart (산 vs. 상)', 'Distinguir sonidos de batchim (산 y 상)'],
  '없는 받침 쓰기': ['Adding a batchim that isn\u2019t there', 'Añadir un batchim que no existe'],
  '예사소리, 된소리, 거센소리 구별 (토끼를 토기로 쓰는 식)': ['Plain, tense, and aspirated consonants (writing 토끼 as 토기)', 'Consonantes simples, tensas y aspiradas (escribir 토끼 como 토기)'],
  '이중모음 (여우를 어우로 쓰는 식)': ['Compound vowels (writing 여우 as 어우)', 'Vocales compuestas (escribir 여우 como 어우)'],
  '소리가 같은 모음 (가게를 가개로 쓰는 식)': ['Vowels that sound alike (writing 가게 as 가개)', 'Vocales que suenan igual (escribir 가게 como 가개)'],
  '모음 구별 (오와 우)': ['Telling vowels apart (오 vs. 우)', 'Distinguir vocales (오 y 우)'],
  '첫소리 자음': ['First consonant', 'Primera consonante'],
  '글자 수': ['Number of syllables', 'Número de sílabas'],
  '모르겠어요를 누른 경우': ['Pressed \u201cI don\u2019t know\u201d', 'Pulsó \u201cNo sé\u201d'],

  /* 달 페이지 (moon.js) */
  '그동안 받아쓰기실에서 방아를 찧어 보자.': ['Meanwhile, let\u2019s practice in the Dictation Room.', 'Mientras tanto, practiquemos en la Sala de Dictado.'],
  '달토끼의 모든 달을 다 채웠어.': ['You\u2019ve filled every moon of Dal Tokki.', 'Llenaste todas las lunas de Dal Tokki.'],
  '앞으로도 받아쓰기실에서 방아를 찧자.': ['Keep practicing in the Dictation Room.', 'Sigue practicando en la Sala de Dictado.'],
  '대단해!': ['Amazing!', '¡Increíble!'],
  '다시 보고 싶은 밤이 있으면 골라 봐.': ['If you want to review a night, pick one.', 'Si quieres repasar una noche, elígela.'],
  '앞의 밤도 언제든 골라서 해 볼 수 있어.': ['You can still pick earlier nights any time.', 'Puedes elegir las noches anteriores cuando quieras.'],
  '어서 와.': ['Welcome back.', '¡Hola de nuevo!'],
  '빠른 확인 다시 하기': ['Retake the quick check', 'Repetir la prueba rápida'],
  '한국어를 조금 할 줄 알아요': ['I already know some Korean', 'Ya sé algo de coreano'],
  '몇 문제만 풀면 시작할 밤을 찾아 줘요.': ['Answer a few questions to find where to start.', 'Responde unas preguntas y encontraremos dónde empezar.'],
  '새 말': ['New words', 'Palabras nuevas'],
  '문장': ['Sentences', 'Oraciones'],
  '이야기와 가족 과제': ['Story and family task', 'Cuento y tarea en familia'],
  '여기부터': ['Start here', 'Empieza aquí'],
  '아직 안 했어요': ['Not done yet', 'Sin hacer'],
  '오늘의 방아. 다섯 개만 듣고 써 봐요.': ['Today\u2019s practice: listen to just five words and write them.', 'La práctica de hoy: escucha solo cinco palabras y escríbelas.'],
  '빠른 확인으로 건너뛰었어요': ['Skipped by the quick check', 'Saltada por la prueba rápida'],
  '한 번 더 누르면 지웁니다': ['Press again to erase.', 'Pulsa otra vez para borrar.'],
  '부모님께.': ['For parents.', 'Para los padres.'],
  '첫 밤에 새 말을 만나고, 둘째 밤에 그 말로 문장을 만들고, 셋째 밤에 이야기를 듣고 집에서 해 볼 과제를 합니다.': [
    'On the first night children meet new words, on the second they build sentences with them, and on the third they listen to a story and get a task to try at home.',
    'En la primera noche conocen palabras nuevas, en la segunda forman oraciones con ellas y en la tercera escuchan un cuento y reciben una tarea para hacer en casa.'],
  '아직 시작하기 전입니다.': ['Your child hasn\u2019t started yet.', 'Su hijo todavía no ha empezado.'],
  '진도는 이 기기의 브라우저에만 저장됩니다.': ['Progress is saved only in this device\u2019s browser.', 'El progreso se guarda solo en el navegador de este dispositivo.'],
  '이 브라우저에서는 진도가 저장되지 않습니다.': ['This browser can\u2019t save progress.', 'Este navegador no puede guardar el progreso.'],
  '한국어를 조금 할 줄 알아?': ['Know some Korean already?', '¿Ya sabes algo de coreano?'],
  '몇 문제만 풀어 보면 어느 밤부터 하면 좋을지 알려 줄게.': ['Answer a few questions and I\u2019ll tell you which night to start from.', 'Responde unas preguntas y te diré en qué noche empezar.'],
  '모르면 모르겠어요를 눌러도 돼.': ['If you don\u2019t know, you can press I don\u2019t know.', 'Si no sabes, puedes pulsar No sé.'],
  '틀려도 괜찮아.': ['It\u2019s okay to get it wrong.', 'Está bien equivocarse.'],
  '5분쯤 걸려요.': ['It takes about 5 minutes.', 'Toma unos 5 minutos.'],
  '잘 보고 맞는 걸 골라 봐.': ['Look carefully and pick the right one.', 'Mira bien y elige la correcta.'],
  '좋아, 다음 묶음이야.': ['Good, on to the next unit.', 'Bien, vamos a la siguiente unidad.'],
  '다음 문제야.': ['Next question.', 'Siguiente pregunta.'],
  '다시 듣기': ['Listen again', 'Escuchar otra vez'],
  '모르겠어요': ['I don\u2019t know', 'No sé'],
  '첫째 밤부터 같이 하자.': ['Let\u2019s start together from Night 1.', 'Empecemos juntos desde la noche 1.'],
  '차근차근 하면 금방 늘 거야.': ['Step by step, you\u2019ll get better fast.', 'Paso a paso, mejorarás muy pronto.'],
  '달토끼를 모두 마쳤구나.': ['You\u2019ve finished all of Dal Tokki.', 'Terminaste todo Dal Tokki.'],
  '받아쓰기실에서 계속 연습해 보자.': ['Let\u2019s keep practicing in the Dictation Room.', 'Sigamos practicando en la Sala de Dictado.'],
  '그동안 받아쓰기실에서 글자로 쓰는 연습을 해 보자.': ['Meanwhile, let\u2019s practice writing in the Dictation Room.', 'Mientras tanto, practiquemos la escritura en la Sala de Dictado.'],
  '첫째 밤부터 할래요': ['I\u2019ll start from Night 1', 'Quiero empezar desde la noche 1'],
  '빠른 확인은 참고용입니다.': ['The quick check is only a guide.', 'La prueba rápida es solo una guía.'],
  '묶음마다 세 문제 가운데 두 문제를 맞히면 그 묶음을 건너뜁니다.': ['If your child gets two of the three questions in a unit right, that unit is skipped.', 'Si su hijo acierta dos de las tres preguntas de una unidad, esa unidad se salta.'],
  '아이가 어려워하면 앞의 밤으로 돌아가도 괜찮고, 건너뛴 밤의 낱말도 받아쓰기실에 나옵니다.': [
    'If it feels hard, it\u2019s fine to go back to earlier nights, and words from skipped nights still appear in the Dictation Room.',
    'Si le resulta difícil, puede volver a las noches anteriores, y las palabras de las noches saltadas también aparecen en la Sala de Dictado.'],
  '이 화면은 아직 준비 중이에요.': ['This screen isn\u2019t ready yet.', 'Esta pantalla todavía no está lista.'],
  '친구에게': ['To a friend', 'A un amigo'],
  '어른에게': ['To an adult', 'A un adulto'],
  '뜻 보기': ['Meaning', 'Significado'],
  '듣기': ['Listen', 'Escuchar'],
  '맞았어요.': ['Correct!', '¡Correcto!'],
  '이 그림이에요.': ['It\u2019s this picture.', 'Es esta imagen.'],
  '다음 문제': ['Next question', 'Siguiente pregunta'],
  '다 풀었어요': ['All done', 'Terminé'],
  '다 풀었어요.': ['All done.', '¡Terminaste!'],
  '아래 다음을 눌러요.': ['Press Next below.', 'Pulsa Siguiente abajo.'],
  '받침 없음': ['No batchim', 'Sin batchim'],
  '받침이 있으면': ['With a batchim:', 'Con batchim:'],
  '받침이 없으면': ['Without a batchim:', 'Sin batchim:'],
  '토리, 모이, 담이는 모두 끝 글자에 받침이 없지. 그래서 토리예요, 모이예요, 담이예요라고 한단다.': [
    'Tori, Moi, and Dami all end without a batchim. That\u2019s why we say 토리예요, 모이예요, 담이예요.',
    'Tori, Moi y Dami terminan sin batchim. Por eso decimos 토리예요, 모이예요, 담이예요.'],
  '이름 뒤에 무엇을 붙일까요?': ['What goes after the name?', '¿Qué va después del nombre?'],
  '남자아이': ['Boy', 'Niño'],
  '여자아이': ['Girl', 'Niña'],
  '남자아이는 이렇게 불러.': ['This is what a boy says.', 'Así lo dice un niño.'],
  '여자아이는 이렇게 불러.': ['This is what a girl says.', 'Así lo dice una niña.'],
  '나보다 어리면 누구든 동생이야.': ['Anyone younger than you is 동생.', 'Cualquiera menor que tú es 동생.'],
  '나이 많은 남자': ['Older boy', 'Chico mayor'],
  '나이 많은 여자': ['Older girl', 'Chica mayor'],
  '나보다 어린 아이': ['Younger child', 'Niño menor'],
  '남자아이가 부를 때': ['When a boy says it', 'Cuando lo dice un niño'],
  '여자아이가 부를 때': ['When a girl says it', 'Cuando lo dice una niña'],
  '두 쪽을 함께 보면 이래요.': ['Here are both sides together.', 'Aquí están los dos lados juntos.'],
  '색칠한 줄이 내가 부르는 말이에요.': ['The colored row is what you say.', 'La fila coloreada es lo que dices tú.'],
  '남자아이는 다르게 불러요.': ['Boys say them differently.', 'Los niños los dicen de otra forma.'],
  '여자아이는 다르게 불러요.': ['Girls say them differently.', 'Las niñas los dicen de otra forma.'],
  '나는 남자아이예요': ['I\u2019m a boy', 'Soy niño'],
  '나는 여자아이예요': ['I\u2019m a girl', 'Soy niña'],
  '예: 서준': ['e.g. 서준', 'p. ej. 서준'],
  '내 이름을 한글로 쓰기': ['Write my name in Hangul', 'Escribe tu nombre en hangul'],
  '이름을 먼저 써요.': ['Write your name first.', 'Primero escribe tu nombre.'],
  '한글로 써 주세요. 예를 들어 Emma는 엠마, Ryan은 라이언이라고 써요.': [
    'Please write it in Hangul. For example, Emma is 엠마 and Ryan is 라이언.',
    'Escríbelo en hangul. Por ejemplo, Emma es 엠마 y Ryan es 라이언.'],
  '좋아.': ['Good.', 'Bien.'],
  '말해 보기': ['Say it', 'Dilo'],
  '한국어 자판이 없으면 부모님께 도와 달라고 해도 돼요. 이 화면은 건너뛰어도 괜찮아요.': [
    'If you don\u2019t have a Korean keyboard, you can ask a parent for help. It\u2019s also fine to skip this screen.',
    'Si no tienes teclado coreano, puedes pedir ayuda a tus padres. También puedes saltar esta pantalla.'],
  '확인': ['Check', 'Comprobar'],
  '여기에 낱말이 차례대로 와요': ['Words go here in order', 'Aquí van las palabras en orden'],
  '고쳐서 맞았어요.': ['You fixed it!', '¡Lo corregiste!'],
  '낱말 순서를 다시 봐요. 누가 하는 말인지부터 와요.': ['Check the word order again. Who is talking comes first.', 'Revisa el orden de las palabras. Primero va quién habla.'],
  '다음 문장': ['Next sentence', 'Siguiente oración'],
  '다 만들었어요': ['All built', 'Terminé'],
  '다 만들었어요.': ['All built.', '¡Terminaste!'],
  '셀 때': ['When counting', 'Al contar'],
  '한 시간 전': ['One hour earlier', 'Una hora antes'],
  '한 시간 뒤': ['One hour later', 'Una hora después'],
  '지금': ['Now', 'Ahora'],
  '지난 일': ['Past', 'Pasado'],
  '앞 글자의 모음': ['Vowel in the syllable before', 'Vocal de la sílaba anterior'],
  '이제 날을 골라요.': ['Now pick the day.', 'Ahora elige el día.'],
  '먼저 태어난 달을 골라요.': ['First pick the month you were born.', 'Primero elige el mes en que naciste.'],
  '태어난 달': ['Birth month', 'Mes de nacimiento'],
  '태어난 날': ['Birth day', 'Día de nacimiento'],
  '여기가 아니에요. 빛나는 곳을 봐요.': ['Not there. Look at the glowing spot.', 'Ahí no. Mira el lugar que brilla.'],
  '그 일은 조금 뒤에 일어났어요. 다른 카드를 눌러 봐요.': ['That happened a little later. Try another card.', 'Eso pasó un poco después. Prueba otra tarjeta.'],
  '차례를 다 맞혔어요.': ['You got the whole order right!', '¡Acertaste todo el orden!'],
  '다 놓았어요. 이야기를 처음부터 들어 봐요.': ['All placed. Listen to the story from the start.', 'Todo en su lugar. Escucha el cuento desde el principio.'],
  '이야기 전체 듣기': ['Listen to the whole story', 'Escuchar el cuento completo'],
  '다음 이야기': ['Next story', 'Siguiente cuento'],
  '다 했어요': ['All done', 'Terminé'],
  '다 했어요.': ['All done.', '¡Terminaste!'],
  '내 이름': ['My name', 'Mi nombre'],
  '보내는 사람 이름': ['Sender\u2019s name', 'Nombre del remitente'],
  '편지 읽어 주기': ['Read the letter aloud', 'Leer la carta en voz alta'],
  '인쇄하기': ['Print', 'Imprimir'],
  '이름은 이 화면에만 보이고 어디에도 저장되지 않아요.': ['Your name shows only on this screen and isn\u2019t saved anywhere.', 'Tu nombre solo aparece en esta pantalla y no se guarda en ningún lugar.'],
  '이름을 써요': ['Write your name', 'Escribe tu nombre'],
  '수료증에 넣을 이름': ['Name for the certificate', 'Nombre para el certificado'],
  '수료증 인쇄하기': ['Print the certificate', 'Imprimir el certificado'],
  '이렇게 써요': ['Written', 'Se escribe'],
  '이렇게 들려요': ['Sounds like', 'Suena'],
  '왜': ['Why', 'Por qué'],
  '자음': ['Consonants', 'Consonantes'],
  '모음': ['Vowels', 'Vocales'],
  '받침': ['Batchim', 'Batchim'],
  '자판으로 쓰기': ['Type with the keyboard', 'Escribir con el teclado'],
  '지우기': ['Delete', 'Borrar'],
  '자판으로 쓸래요': ['Use the keyboard', 'Usar el teclado'],
  '자음을 먼저 눌러요.': ['Press a consonant first.', 'Primero pulsa una consonante.'],
  '먼저 글자를 만들어요.': ['Make a syllable first.', 'Primero forma una sílaba.'],
  '한 번에 맞았어요.': ['Right on the first try!', '¡Correcto al primer intento!'],
  '다른 글자를 표시했어요. 한 번 더 써 봐요.': ['The different letter is marked. Try writing it once more.', 'Marcamos la letra distinta. Escríbela una vez más.'],
  '(빈칸)': ['(blank)', '(en blanco)'],
  '받아쓰기실에서 또 만날 거야.': ['You\u2019ll see it again in the Dictation Room.', 'La volverás a ver en la Sala de Dictado.'],
  '정답을 보여 줬어요.': ['Here\u2019s the answer.', 'Aquí está la respuesta.'],
  '다음 말': ['Next word', 'Siguiente palabra'],
  '다 썼어요': ['All written', 'Terminé'],
  '받아쓰기 끝.': ['Dictation done.', 'Dictado terminado.'],
  '대화': ['Conversation', 'Conversación'],
  '처음부터 듣기': ['Play from the start', 'Escuchar desde el principio'],
  '멈추기': ['Stop', 'Detener'],
  '다 들었어요. 이제 글자 보기를 눌러 봐요.': ['Done listening. Now press Show text.', 'Ya escuchaste. Ahora pulsa Ver texto.'],
  '글자 보기': ['Show text', 'Ver texto'],
  '글자 숨기기': ['Hide text', 'Ocultar texto'],
  '영어 뜻 보기': ['Show English', 'Ver en inglés'],
  '영어 뜻 숨기기': ['Hide English', 'Ocultar inglés'],
  '했어요': ['I did it', '¡Lo hice!'],
  '달토끼 가족 과제': ['Dal Tokki family task', 'Tarea en familia de Dal Tokki'],
  '잘했어요': ['Great job!', '¡Muy bien!'],
  '과제를 했어요. 모이가 오늘 인사를 모았어요.': ['Task done. Moi collected today\u2019s greeting.', 'Tarea hecha. Moi guardó el saludo de hoy.'],
  '지금 못 해도 괜찮아요. 다음을 눌러 넘어가고, 나중에 해도 돼요.': ['It\u2019s okay if you can\u2019t do it now. Press Next to move on and try it later.', 'No pasa nada si no puedes hacerlo ahora. Pulsa Siguiente y hazlo más tarde.'],
  '오늘 밤 달이 조금 차올랐어요': ['Tonight the moon grew a little fuller', 'Esta noche la luna creció un poquito'],
  '떡은 방아를 여러 번 찧어야 만들어져.': ['Rice cakes take lots of pounding.', 'Los pasteles de arroz necesitan mucho machacar.'],
  '한 번 더 해 볼까?': ['Want to try once more?', '¿Lo intentamos otra vez?'],
  '잘했어.': ['Well done.', 'Muy bien.'],
  '다시 하기': ['Try again', 'Repetir'],
  '다음 밤': ['Next night', 'Siguiente noche']
};
/* 달 이름 자체도 번역합니다. 다음 달, 다음 나들이는 배우는 말일 수 있어 문장 틀 안에서만 바꿉니다. */
for(const k in MN) if(!k.startsWith('다음')) D[k] = [MN[k][0], MN[k][2]];

/* ---- 문장 틀: 수나 이름이 바뀌어 들어가는 문구 ---- */
const P = [
  [/^(.+) - 달토끼$/, '{1:t} - Dal Tokki', '{1:t} - Dal Tokki'],
  [/^(\d)단계(\.?)$/, 'Level {1}{2}', 'Nivel {1}{2}'],
  ['^<M>, (.+)$', '{1:m}: {2:t}', '{1:m}: {2:t}'],
  ['^<M> 시작하기$', 'Start {1:ml}', 'Empezar {1:ml}'],
  ['^<M> 빠른 확인$', '{1:m} quick check', 'Prueba rápida: {1:m}'],
  ['^<M> 기록 지우기$', 'Clear {1:m} progress', 'Borrar el progreso de {1:ml}'],
  ['^<M> 별이 모두 지워져요\\.$', 'All {1:m} stars will be erased.', 'Se borrarán todas las estrellas de {1:ml}.'],
  ['^<M>(?:으로|로) 가기$', 'Go to {1:ml}', 'Ir a {1:ml}'],
  ['^<M>(?:으로|로) 가 보자\\.$', 'Let\u2019s go to {1:ml}.', 'Vamos a {1:ml}.'],
  ['^이제 <M>(?:으로|로) 가자\\.$', 'Now let\u2019s go to {1:ml}.', 'Ahora vamos a {1:ml}.'],
  ['^<M> 보름달이 떴어!$', '{1:mL} is full!', '¡{1:mL} está llena!'],
  ['^<M>(?:이|가) 열릴 때까지 받아쓰기실에서 방아를 찧어 보자\\.$', 'Until {1:ml} opens, let\u2019s practice in the Dictation Room.', 'Hasta que se abra {1:ml}, practiquemos en la Sala de Dictado.'],
  ['^빠른 확인에서 <M> 말을 다 알고 있었어요?\\.$', 'In the quick check, you already knew all the words in {1:ml}.', 'En la prueba rápida ya sabías todas las palabras de {1:ml}.'],
  ['^<M>에서 마친 밤의 말도 여기서 연습해요\\.$', 'Practice words from the nights you finished in {1:ml} here too.', 'Practica aquí también las palabras de las noches que terminaste en {1:ml}.'],
  ['^<M> 말은 벌써 다 알고 있구나!$', 'You already know all the words in {1:ml}!', '¡Ya sabes todas las palabras de {1:ml}!'],
  ['^<M>(?:이|가) 열리면 거기서 만나\\.$', 'See you in {1:ml} when it opens.', 'Nos vemos en {1:ml} cuando se abra.'],
  ['^<M>(?:을|를) 다 알고 있어요$', 'You already know {1:ml}', 'Ya dominas {1:ml}'],
  ['^<M>(?:을|를) 다 채웠어요(\\.?)$', 'You filled {1:ml}!', '¡Llenaste {1:ml}!'],
  ['^<M> <O> 밤 차례예요\\.$', 'Next up: Night {2:o} of {1:ml}.', 'Ahora toca la noche {2:o} de {1:ml}.'],
  ['^<M>에서 <C> 밤을 마쳤어요\\.$', 'You\u2019ve finished {2:n|night|nights} in {1:ml}.', 'Terminaste {2:n|noche|noches} en {1:ml}.'],
  ['^빠른 확인에서 <M> <O> 밤부터 하기로 했어요\\.$', 'The quick check placed you at Night {2:o} of {1:ml}.', 'La prueba rápida te ubicó en la noche {2:o} de {1:ml}.'],
  ['^빠른 확인에서 <O> 밤부터 하기로 했어요?\\.$', 'The quick check placed you at Night {1:o}.', 'La prueba rápida te ubicó en la noche {1:o}.'],
  ['^이제 <M>(?:이에요|예요)\\.$', 'Now it\u2019s {1:ml}.', 'Ahora toca {1:ml}.'],
  ['^<M>(?:은|는) 곧 열려요\\.$', '{1:mL} opens soon.', '{1:mL} se abre pronto.'],
  ['^<M>에서 지금 열린 밤을 다 마쳤어요\\.$', 'You\u2019ve finished every open night in {1:ml}.', 'Terminaste todas las noches abiertas de {1:ml}.'],
  ['^이번엔 <O> 밤 차례예요\\.$', 'It\u2019s time for Night {1:o}.', 'Ahora toca la noche {1:o}.'],
  ['^지금까지 <C> 밤을 마쳤어요\\.$', 'You\u2019ve finished {1:n|night|nights} so far.', 'Hasta ahora terminaste {1:n|noche|noches}.'],
  ['^지금까지 <C> 밤을 마쳤습니다\\.$', '{1:n|night has|nights have} been completed so far.', 'Hasta ahora se han terminado {1:n|noche|noches}.'],
  ['^<C> 밤을 모두 마쳤어요\\.$', 'All {1:n} nights done.', 'Las {1:n} noches terminadas.'],
  ['^<C> 밤을 모두 마쳤거나 확인으로 통과했어요\\.$', 'All {1:n} nights done or passed in the check.', 'Las {1:n} noches terminadas o superadas en la prueba.'],
  ['^<C> 밤을 모두 확인으로 통과했어요\\.$', 'All {1:n} nights passed in the check.', 'Las {1:n} noches superadas en la prueba.'],
  ['^<C> 밤 가운데 <C> 밤을 마쳤어요?\\.$', '{2:n} of {1:n} nights done.', '{2:n} de {1:n} noches terminadas.'],
  ['^<C> 밤 가운데 <C> 밤은 확인으로 통과했어요\\.$', '{2:n} of {1:n} nights passed in the check.', '{2:n} de {1:n} noches superadas en la prueba.'],
  ['^<C> 밤은 확인으로 통과했어요\\.$', '{1:n|night|nights} passed in the check.', '{1:n|noche superada|noches superadas} en la prueba.'],
  ['^<C> 밤을 마쳤어요\\.$', '{1:n|night|nights} done.', '{1:n|noche terminada|noches terminadas}.'],
  ['^<C> 밤이 모두 열려 있어요\\.$', 'All {1:n} nights are open.', 'Las {1:n} noches están abiertas.'],
  ['^<C> 밤\\.$', '{1:n} nights.', '{1:n} noches.'],
  ['^지금은 <C> 밤이 열려 있어요\\.$', '{1:n|night is|nights are} open now.', 'Ahora hay {1:n|noche abierta|noches abiertas}.'],
  [/^지금까지 (\d+)번\.$/, 'Practiced {1} times so far.', 'Has practicado {1} veces hasta ahora.'],
  [/^지금까지 (\d+)번 방아를 찧었어요\.$/, 'You\u2019ve practiced {1} times so far.', 'Has practicado {1} veces hasta ahora.'],
  [/^지금까지 (\d+)밤 다녀왔어요\.$/, '{1} outing nights so far.', '{1} noches de paseo hasta ahora.'],

  ['^<O> 밤 차례야\\.$', 'It\u2019s time for Night {1:o}.', 'Te toca la noche {1:o}.'],
  ['^<O> 묶음, (.+)$', 'Unit {1:o}, {2}', 'Unidad {1:o}, {2}'],
  ['^<O> 묶음$', 'Unit {1:o}', 'Unidad {1:o}'],
  ['^<O> 묶음을 다 채웠어요$', 'You filled Unit {1:o}!', '¡Llenaste la unidad {1:o}!'],
  ['^<O> 밤, (.+), 별 (\\d)개$', 'Night {1:o}, {2:t}, {3} stars', 'Noche {1:o}, {2:t}, {3} estrellas'],
  ['^<O> 밤, (.+), 아직 안 했어요$', 'Night {1:o}, {2:t}, not done yet', 'Noche {1:o}, {2:t}, sin hacer'],
  ['^<O> 밤 시작하기$', 'Start Night {1:o}', 'Empezar la noche {1:o}'],
  ['^<O> 밤부터 해요$', 'Start at Night {1:o}', 'Empieza en la noche {1:o}'],
  ['^이제 <O> 밤으로 가자\\.$', 'Now let\u2019s go to Night {1:o}.', 'Ahora vamos a la noche {1:o}.'],
  ['^<O> 밤(\\.?)$', 'Night {1:o}{2}', 'Noche {1:o}{2}'],
  ['^지금은 <O> 묶음까지 열려 있고 나머지는 차례로 열립니다\\.$', 'Units 1 through {1:o} are open now, and the rest will open in turn.', 'Ahora están abiertas las unidades 1 a {1:o}; las demás se abrirán poco a poco.'],
  ['^<C> 밤 가운데 <C> 밤을 마쳤어\\.$', 'You\u2019ve finished {2:n} of {1:n} nights.', 'Terminaste {2:n} de {1:n} noches.'],
  ['^벌써 <C> 묶음을 알고 있어\\.$', 'You already know {1:n|unit|units}.', 'Ya sabes {1:n|unidad|unidades}.'],
  ['^(.+?)(?:은|는) 알아 가는 중이니 <O> 밤부터 하면 좋겠어\\.$', 'You\u2019re still learning {1}, so let\u2019s start at Night {2:o}.', 'Todavía estás aprendiendo {1}, así que empecemos en la noche {2:o}.'],
  [/^(.+) 묶음까지 다 마쳤어\.$/, 'You\u2019ve finished everything through the {1} unit.', 'Terminaste todo hasta la unidad {1}.'],
  [/^다음 묶음 (.+?)(?:은|는) 곧 열려\.$/, 'The next unit, {1}, opens soon.', 'La siguiente unidad, {1}, se abre pronto.'],
  [/^(.+) 묶음을 (?:다 )?마쳤어\.$/, 'You finished the {1} unit.', 'Terminaste la unidad {1}.'],
  [/^(.+) 차례로 세 문제씩 나와요\.$/, 'There are three questions each on these, in order: {1}.', 'Hay tres preguntas de cada tema, en orden: {1}.'],
  [/^확인은 (.+) 묶음에서 멈췄습니다\.$/, 'The check stopped at the {1} unit.', 'La prueba se detuvo en la unidad {1}.'],
  [/^아이가 놓친 답 가운데 하나는 ‘(.+)’입니다\.$/, 'One answer your child missed was \u2018{1}\u2019.', 'Una respuesta que su hijo falló fue \u2018{1}\u2019.'],
  [/^(.+)까지 모두 해냈어\.$/, 'You did it all: {1}.', 'Lo lograste todo: {1}.'],
  [/^맞힌 문제 (\d+) \/ (\d+)$/, 'Correct: {1} / {2}', 'Aciertos: {1} / {2}'],
  [/^정답은 (.+)\.$/, 'The answer is {1:c}.', 'La respuesta es {1:c}.'],
  [/^받침 (\S+)$/, 'Batchim {1}', 'Batchim {1}'],
  [/^‘(.+)’에 받침 (\S+?)(?:이|가) 있어서 ‘(.+)’(?:을|를) 붙여요\.$/, '\u2018{1}\u2019 ends in the batchim {2}, so we add \u2018{3}\u2019.', '\u2018{1}\u2019 termina en el batchim {2}, así que añadimos \u2018{3}\u2019.'],
  [/^‘(.+)’에 받침이 없어서 ‘(.+)’(?:을|를) 붙여요\.$/, '\u2018{1}\u2019 has no batchim, so we add \u2018{2}\u2019.', '\u2018{1}\u2019 no tiene batchim, así que añadimos \u2018{2}\u2019.'],
  [/^나보다 나이 많은 남자는 (\S+), 나이 많은 여자는 (\S+)\.$/, 'An older boy is {1}, and an older girl is {2}.', 'A un chico mayor le dices {1} y a una chica mayor, {2}.'],
  [/^이렇게 만들어요: (.+)$/, 'Build it like this: {1}', 'Se forma así: {1}'],
  [/^(.+) 앞에서$/, 'Before {1}', 'Antes de {1}'],
  [/^(.+?)(?:을|를) 눌러 봐요\.$/, 'Tap {1}.', 'Toca {1}.'],
  [/^(.+) 칸을 골라요$/, 'Choose a line: {1}', 'Elige una línea: {1}'],
  [/^(\d+)\. 보내는 사람$/, '{1}. Sender', '{1}. Remitente'],
  [/^뜻: (.+)$/, 'Meaning: {1}', 'Significado: {1}'],
  [/^(.+)의 말 듣기$/, 'Listen to {1}', 'Escuchar a {1}'],
  [/^(.+) 듣기$/, 'Listen: {1}', 'Escuchar: {1}'],
  [/^뒤에 ‘(.+)’를 붙이면 \[(.+)\](?:으로|로) 소리 나지\.$/, 'Add \u2018{1}\u2019 after it and it sounds like [{2}].', 'Si le añades \u2018{1}\u2019, suena como [{2}].'],
  [/^이 화면에서는 소리가 나지 않을 수 있어요\. 메뉴에서 ‘브라우저로 열기’를 누르거나, 주소를 복사해서 (사파리|크롬)에 붙여 넣어 주세요\.$/,
    'Sound may not work on this screen. Choose \u2018Open in browser\u2019 from the menu, or copy the address and paste it into {1:t}.',
    'Es posible que el sonido no funcione en esta pantalla. Elija \u2018Abrir en el navegador\u2019 en el menú, o copie la dirección y péguela en {1:t}.']
].map(compile);
function compile([re, en, es]){ return [typeof re === 'string' ? new RegExp(re.replace(/<[COM]>/g, t => TOK[t])) : re, en, es]; }

/* ---- 번역 ---- */
const HANGUL = /[\u3131-\u318E\uAC00-\uD7A3]/;
function hasJong(ch){ const c = ch.charCodeAt(0); return c >= 0xAC00 && c <= 0xD7A3 && (c - 0xAC00) % 28 > 0; }
function isSyl(ch){ const c = ch.charCodeAt(0); return c >= 0xAC00 && c <= 0xD7A3; }
/* "산이야", "아이야", "닭이란다" 에서 정답 낱말만 떼어 냅니다. */
function stripCopula(x){
  for(const [suf, jong] of [['이란다', true], ['란다', false], ['이야', true], ['야', false]]){
    if(x.length > suf.length && x.endsWith(suf)){
      const w = x.slice(0, -suf.length), last = w[w.length - 1];
      if(isSyl(last) && hasJong(last) === jong) return w;
    }
  }
  return x;
}
function fill(tpl, m){
  const li = LI();
  return tpl.replace(/\{(\d)(?::(\w+))?(?:\|([^|}]*)\|([^}]*))?\}/g, (_, i, mod, sg, pl) => {
    const v = m[Number(i)];
    if(v == null) return '';
    if(mod === 'n'){ const n = COUNT.indexOf(v) + 1 || Number(v) || 0; return sg != null ? n + ' ' + (n === 1 ? sg : pl) : String(n); }
    if(mod === 'o') return String(ORD.indexOf(v) + 1);
    if(mod === 'm' || mod === 'ml' || mod === 'mL'){
      const r = MN[v]; if(!r) return v;
      if(mod === 'm') return r[li * 2];
      const s = r[li * 2 + 1];
      return mod === 'mL' ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    }
    if(mod === 't'){ const t = core(v); return t == null ? v : t; }
    if(mod === 'c') return stripCopula(v);
    /* "라벨 3번, 라벨 2번" 목록: 라벨마다 번역하고 수는 괄호에 */
    if(mod === 'x') return v.replace(/(.+?) (\d+)번(, |$)/g, (_, a, n, sep) => { const t = core(a); return (t == null ? a : t) + ' (' + n + ')' + (sep ? '; ' : ''); });
    return v;
  });
}
function core(k, whole){
  const d = D[k] || (/[.]$/.test(k) && D[k.slice(0, -1)] ? D[k.slice(0, -1)].map(x => x + '.') : null);
  if(d) return d[LI()];
  for(const [re, en, es] of P){
    const m = k.match(re);
    /* 한 묶음이 여러 문장을 삼키면 이 틀이 아닙니다. 문장마다 나눠서 다시 봅니다. */
    if(m && !m.slice(1).some(g => g && /[.!?]\s/.test(g))) return fill(lang === 'es' ? es : en, m);
  }
  if(whole) return null;
  /* 여러 문장이 붙어 있으면 앞에서부터 가장 긴 덩어리를 찾아 번역합니다.
     두 문단이 이어 붙은 글도 문단마다 번역되고, 사전에 없는 문장은 그대로 둡니다. */
  const parts = k.replace(/([.!?])\s+/g, '$1\u0001').split('\u0001');
  if(parts.length < 2) return null;
  const out = [];
  let i = 0, any = false;
  while(i < parts.length){
    let j = parts.length, t = null;
    for(; j > i; j--){ t = core(parts.slice(i, j).join(' '), true); if(t != null) break; }
    if(t != null){ out.push(t); any = true; i = j; } else { out.push(parts[i]); i++; }
  }
  return any ? out.join(' ') : null;
}
const cache = {en: new Map(), es: new Map()};
function tr(s){
  if(lang === 'ko' || !s || !HANGUL.test(s)) return s;
  const C = cache[lang];
  if(C.has(s)) return C.get(s);
  let out;
  const raw = D[s];
  if(raw) out = raw[LI()];
  else {
    const lead = s.match(/^\s*/)[0], trail = s.slice(lead.length).match(/\s*$/)[0];
    const t = core(s.slice(lead.length, s.length - trail.length));
    out = t == null ? s : lead + t + trail;
  }
  C.set(s, out);
  return out;
}

/* ---- 화면에 적용 ---- */
/* 배우는 한국어가 그려지는 곳은 건너뜁니다. */
const SKIP = 'script,style,textarea,noscript,svg,[data-noi18n],.langsw,.answer,.diff,.fix,.cert,.lp:not(.empty)';
const ATTRS = ['aria-label', 'placeholder', 'title', 'alt'];
const textRec = new WeakMap(), attrRec = new WeakMap();

function doText(n){
  const cur = n.nodeValue;
  let r = textRec.get(n);
  if(!r || cur !== r.out){
    if(!HANGUL.test(cur) && !r) return;
    r = {ko: cur};
    textRec.set(n, r);
  }
  const out = tr(r.ko);
  r.out = out;
  if(cur !== out) n.nodeValue = out;
}
function doAttrs(el){
  let rec = attrRec.get(el);
  for(const a of ATTRS){
    if(!el.hasAttribute(a)) continue;
    const cur = el.getAttribute(a);
    let r = rec && rec[a];
    if(!r || cur !== r.out){
      if(!HANGUL.test(cur) && !r) continue;
      if(!rec){ rec = {}; attrRec.set(el, rec); }
      r = rec[a] = {ko: cur};
    }
    const out = tr(r.ko);
    r.out = out;
    if(cur !== out) el.setAttribute(a, out);
  }
}
function skipped(el){ return !!(el && el.closest && el.closest(SKIP)); }
function walk(root){
  if(!root) return;
  if(root.nodeType === 3){ if(!skipped(root.parentElement)) doText(root); return; }
  if(root.nodeType !== 1 || skipped(root)) return;
  doAttrs(root);
  const tw = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode: n => n.nodeType === 1 && n.matches(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  let n;
  while((n = tw.nextNode())) n.nodeType === 3 ? doText(n) : doAttrs(n);
}

let titleKo = null, titleOut = null;
function doTitle(){
  if(titleKo == null || document.title !== titleOut) titleKo = document.title;
  titleOut = tr(titleKo);
  if(document.title !== titleOut) document.title = titleOut;
}

const obs = new MutationObserver(list => {
  for(const m of list){
    if(m.type === 'characterData'){ if(!skipped(m.target.parentElement)) doText(m.target); }
    else if(m.type === 'attributes'){ if(!skipped(m.target)) doAttrs(m.target); }
    else m.addedNodes.forEach(walk);
  }
});
let watching = false;
function watch(on){
  if(on && !watching){
    obs.observe(document.documentElement, {subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS});
    watching = true;
  } else if(!on && watching){ obs.disconnect(); watching = false; }
}

function apply(){
  const root = document.documentElement;
  root.setAttribute('data-lang', lang);
  root.lang = lang;
  if(document.body) walk(document.body);
  doTitle();
  document.querySelectorAll('.langsw button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.l === lang)));
  watch(lang !== 'ko');
}
function setLang(l){
  if(l === lang) return;
  lang = l;
  try { localStorage.setItem(STORE, l); } catch(e) {}
  try {
    const u = new URL(location.href);
    if(u.searchParams.has('lang')){ u.searchParams.delete('lang'); history.replaceState(history.state, '', u.href); }
  } catch(e) {}
  apply();
}

/* ---- 언어 버튼 ---- */
const CSS = `
.langsw{display:inline-flex;align-items:center;gap:2px;padding:2px;border:1.5px solid #9DB4C6;border-radius:999px;flex:none}
.langsw button{background:none;border:0;margin:0;color:#9DB4C6;font:500 13px/1 'Noto Sans KR',sans-serif;
  padding:6px 10px;border-radius:999px;cursor:pointer;white-space:nowrap}
.langsw button:hover{color:#F5E6BD}
.langsw button[aria-pressed="true"]{background:#F5E6BD;color:#17324A}
.langsw button:focus-visible{outline:3px solid #E3A93C;outline-offset:2px}
.langsw .ls{display:none}
.top{flex-wrap:wrap;row-gap:10px}
.toplinks{flex-wrap:wrap;justify-content:flex-end;row-gap:8px}
header .langsw{margin-left:4px}
@media (max-width:560px){
  .langsw .lf{display:none}.langsw .ls{display:inline}
  .langsw button{padding:6px 9px}
  header .langsw{order:2;margin-left:0}
}
@media print{.langsw{display:none !important}}
html:not([data-lang="ko"]) #parents .en,
html:not([data-lang="ko"]) .scard .sen{display:none}
`;
function mount(){
  if(document.querySelector('.langsw')) return;
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.append(style);
  const box = document.createElement('div');
  box.className = 'langsw';
  box.setAttribute('role', 'group');
  box.setAttribute('aria-label', '언어 / Language / Idioma');
  LANGS.forEach(L => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.l = L.k;
    b.lang = L.k;
    b.title = L.full;
    b.setAttribute('aria-label', L.full);
    b.setAttribute('aria-pressed', String(L.k === lang));
    b.innerHTML = `<span class="lf">${L.full}</span><span class="ls" aria-hidden="true">${L.short}</span>`;
    b.addEventListener('click', () => setLang(L.k));
    box.append(b);
  });
  const home = document.querySelector('.toplinks');
  const hdr = document.querySelector('body > header');
  if(home) home.append(box);
  else if(hdr) hdr.append(box);
  else {
    box.style.cssText = 'position:fixed;top:10px;right:10px;z-index:20;background:#17324A';
    document.body.append(box);
  }
}

/* body 바로 아래에서 불러오므로, 뒤이어 그려지는 화면도 처음부터 지켜봅니다. */
document.documentElement.setAttribute('data-lang', lang);
if(lang !== 'ko'){ document.documentElement.lang = lang; watch(true); if(document.body) walk(document.body); }
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { mount(); apply(); });
else { mount(); apply(); }

/* 달마다 따로 둔 사전(assets/lang/*.js)이 여기에 더합니다. 문장 틀은 앞에 끼워서 먼저 봅니다. */
function add(dict, pats){
  Object.assign(D, dict || {});
  if(pats && pats.length) P.unshift(...pats.map(compile));
  cache.en.clear(); cache.es.clear();
  if(lang !== 'ko' && document.body) walk(document.body);
}
window.DAL_I18N = {get lang(){ return lang; }, set: setLang, t: tr, add};
})();
