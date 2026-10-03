/* 받아쓰기실 번역: dictation/index.html 의 안내 문구 */
DAL_I18N.add({
  '오늘 방아는 벌써 찧었어. 더 하고 싶으면 한 번 더 해도 돼.': [
    'You\u2019ve already done today\u2019s practice. If you want more, you can go again.',
    'Ya hiciste la práctica de hoy. Si quieres más, puedes repetirla.'],
  '오늘의 방아를 찧어 볼까?': ['Ready for today\u2019s practice?', '¿Hacemos la práctica de hoy?'],
  '다섯 개만 듣고 써 보자.': ['Let\u2019s listen to just five words and write them.', 'Escuchemos solo cinco palabras y escribámoslas.'],
  '전에 헷갈렸던 말도 다시 나올 거야.': ['Words you mixed up before will come back too.', 'También volverán las palabras que confundiste antes.'],
  '번 방아를 찧었어요': ['practice sessions', 'sesiones de práctica'],
  '잘 쓰는 말': ['words you write well', 'palabras que escribes bien'],
  '아직 마친 밤이 없어서 첫째 밤의 말만 나와요. 밤을 하나씩 마칠 때마다 나오는 말이 늘어나요.': [
    'You haven\u2019t finished any nights yet, so only Night 1 words appear. More words appear as you finish each night.',
    'Aún no has terminado ninguna noche, así que solo aparecen palabras de la noche 1. Aparecerán más a medida que termines noches.'],
  '한 번 더 하기': ['Go again', 'Otra vez'],
  '오늘의 방아 시작하기': ['Start today\u2019s practice', 'Empezar la práctica de hoy'],
  '아직 기록된 실수가 없습니다.': ['No mistakes recorded yet.', 'Todavía no hay errores registrados.'],
  '받아쓰기실은 아이가 마친 밤의 낱말로만 문제를 냅니다. 틀린 말은 다음 날, 맞힌 말은 며칠 뒤에 다시 나옵니다.': [
    'The Dictation Room only uses words from nights your child has finished. Missed words come back the next day, and correct ones a few days later.',
    'La Sala de Dictado solo usa palabras de las noches que su hijo terminó. Las palabras falladas vuelven al día siguiente y las acertadas, unos días después.'],
  '오늘의 방아': ['Today\u2019s practice', 'La práctica de hoy'],
  '잘 듣고 써 봐. 뜻을 같이 보면 도움이 돼.': ['Listen carefully and write it. Looking at the meaning helps.', 'Escucha bien y escríbela. Ver el significado te ayuda.'],
  '좋아, 다음 말이야.': ['Good, next word.', 'Bien, siguiente palabra.'],
  '어디가 다른지 보고 한 번 더 써 봐요.': ['See what\u2019s different and try writing it again.', 'Mira qué es diferente y escríbela otra vez.'],
  '끝내기': ['Finish', 'Terminar'],
  '떡이 아주 쫄깃하겠다.': ['These rice cakes will be extra chewy!', '¡Estos pasteles de arroz quedarán riquísimos!'],
  '오늘은 어려웠지?': ['Today was hard, wasn\u2019t it?', 'Hoy fue difícil, ¿verdad?'],
  '그래도 끝까지 방아를 찧었어.': ['But you kept going to the end.', 'Pero seguiste hasta el final.'],
  '내일은 더 쉬울 거야.': ['Tomorrow will be easier.', 'Mañana será más fácil.'],
  '오늘의 방아 끝': ['Today\u2019s practice is done', 'Terminó la práctica de hoy'],
  '헷갈린 말은 내가 모아 뒀다가 내일 다시 가져올게.': ['I\u2019ll save the words you mixed up and bring them back tomorrow.', 'Guardaré las palabras que confundiste y las traeré mañana.'],
  '잘 쓴 말은 며칠 뒤에 다시 가져올게. 잊지 않게.': ['I\u2019ll bring back the words you wrote well in a few days, so you don\u2019t forget them.', 'Traeré las palabras que escribiste bien en unos días, para que no las olvides.']
}, [
  [/^자주 나오는 실수는 (.+)입니다\.$/, 'Common mistakes: {1:x}.', 'Errores frecuentes: {1:x}.'],
  ['^<C> 개를 모두 한 번에 썼어\\.$', 'You wrote all {1:n} right on the first try.', 'Escribiste las {1:n} bien al primer intento.'],
  ['^<C> 개 가운데 <C> 개를 한 번에 썼어\\.$', 'You wrote {2:n} of {1:n} right on the first try.', 'Escribiste {2:n} de {1:n} bien al primer intento.']
]);
