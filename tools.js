/* Luxfox Tools — gemeinsamer Sprachumschalter (DE/EN) */
function setLang(l){
  document.body.classList.toggle('lang-en', l === 'en');
  var en = document.getElementById('l-en'), de = document.getElementById('l-de');
  if (en) en.classList.toggle('on', l === 'en');
  if (de) de.classList.toggle('on', l === 'de');
  try { localStorage.setItem('fx-lang', l); } catch (e) {}
}
try { if (localStorage.getItem('fx-lang') === 'en') setLang('en'); } catch (e) {}
