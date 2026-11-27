/* Kitty Party Circle — South Indian (Karnataka, amanta) panchanga for Bengaluru.
   Uses astronomy-engine (MIT) for the Sun and Moon; Lahiri ayanamsa; Indian Standard Time.
   Works in the browser (window.Astronomy) and in Node for testing. */
(function (root) {
const A = root.Astronomy || (typeof require !== 'undefined' ? require('astronomy-engine') : null);
const LAT = 12.9716, LON = 77.5946, ELEV = 920; // Bengaluru
const IST = 5.5 * 3600e3, DAY = 864e5;
const obs = new A.Observer(LAT, LON, ELEV);
const mod = (x, m) => ((x % m) + m) % m;

const N = {
  kn: {
    tithi: ['ಪಾಡ್ಯ', 'ಬಿದಿಗೆ', 'ತದಿಗೆ', 'ಚೌತಿ', 'ಪಂಚಮಿ', 'ಷಷ್ಠಿ', 'ಸಪ್ತಮಿ', 'ಅಷ್ಟಮಿ', 'ನವಮಿ', 'ದಶಮಿ', 'ಏಕಾದಶಿ', 'ದ್ವಾದಶಿ', 'ತ್ರಯೋದಶಿ', 'ಚತುರ್ದಶಿ', 'ಹುಣ್ಣಿಮೆ', 'ಅಮಾವಾಸ್ಯೆ'],
    paksha: ['ಶುಕ್ಲ ಪಕ್ಷ', 'ಕೃಷ್ಣ ಪಕ್ಷ'],
    nak: ['ಅಶ್ವಿನಿ', 'ಭರಣಿ', 'ಕೃತ್ತಿಕಾ', 'ರೋಹಿಣಿ', 'ಮೃಗಶಿರ', 'ಆರ್ದ್ರಾ', 'ಪುನರ್ವಸು', 'ಪುಷ್ಯ', 'ಆಶ್ಲೇಷ', 'ಮಘ', 'ಪುಬ್ಬ', 'ಉತ್ತರ', 'ಹಸ್ತ', 'ಚಿತ್ತ', 'ಸ್ವಾತಿ', 'ವಿಶಾಖ', 'ಅನುರಾಧ', 'ಜ್ಯೇಷ್ಠ', 'ಮೂಲ', 'ಪೂರ್ವಾಷಾಢ', 'ಉತ್ತರಾಷಾಢ', 'ಶ್ರವಣ', 'ಧನಿಷ್ಠ', 'ಶತಭಿಷ', 'ಪೂರ್ವಾಭಾದ್ರ', 'ಉತ್ತರಾಭಾದ್ರ', 'ರೇವತಿ'],
    yoga: ['ವಿಷ್ಕಂಭ', 'ಪ್ರೀತಿ', 'ಆಯುಷ್ಮಾನ್', 'ಸೌಭಾಗ್ಯ', 'ಶೋಭನ', 'ಅತಿಗಂಡ', 'ಸುಕರ್ಮ', 'ಧೃತಿ', 'ಶೂಲ', 'ಗಂಡ', 'ವೃದ್ಧಿ', 'ಧ್ರುವ', 'ವ್ಯಾಘಾತ', 'ಹರ್ಷಣ', 'ವಜ್ರ', 'ಸಿದ್ಧಿ', 'ವ್ಯತೀಪಾತ', 'ವರೀಯಾನ್', 'ಪರಿಘ', 'ಶಿವ', 'ಸಿದ್ಧ', 'ಸಾಧ್ಯ', 'ಶುಭ', 'ಶುಕ್ಲ', 'ಬ್ರಹ್ಮ', 'ಐಂದ್ರ', 'ವೈಧೃತಿ'],
    karana: ['ಕಿಂಸ್ತುಘ್ನ', 'ಬವ', 'ಬಾಲವ', 'ಕೌಲವ', 'ತೈತಿಲ', 'ಗರಜ', 'ವಣಿಜ', 'ವಿಷ್ಟಿ', 'ಶಕುನಿ', 'ಚತುಷ್ಪಾದ', 'ನಾಗ'],
    masa: ['ಚೈತ್ರ', 'ವೈಶಾಖ', 'ಜ್ಯೇಷ್ಠ', 'ಆಷಾಢ', 'ಶ್ರಾವಣ', 'ಭಾದ್ರಪದ', 'ಆಶ್ವಯುಜ', 'ಕಾರ್ತಿಕ', 'ಮಾರ್ಗಶಿರ', 'ಪುಷ್ಯ', 'ಮಾಘ', 'ಫಾಲ್ಗುಣ'],
    adhika: 'ಅಧಿಕ', masaWord: 'ಮಾಸ',
    ritu: ['ವಸಂತ', 'ಗ್ರೀಷ್ಮ', 'ವರ್ಷ', 'ಶರದ್', 'ಹೇಮಂತ', 'ಶಿಶಿರ'], rituWord: 'ಋತು',
    ayana: ['ಉತ್ತರಾಯಣ', 'ದಕ್ಷಿಣಾಯನ'],
    rashi: ['ಮೇಷ', 'ವೃಷಭ', 'ಮಿಥುನ', 'ಕಟಕ', 'ಸಿಂಹ', 'ಕನ್ಯಾ', 'ತುಲಾ', 'ವೃಶ್ಚಿಕ', 'ಧನು', 'ಮಕರ', 'ಕುಂಭ', 'ಮೀನ'],
    vara: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ'],
    sam: ['ಪ್ರಭವ', 'ವಿಭವ', 'ಶುಕ್ಲ', 'ಪ್ರಮೋದೂತ', 'ಪ್ರಜೋತ್ಪತ್ತಿ', 'ಆಂಗೀರಸ', 'ಶ್ರೀಮುಖ', 'ಭಾವ', 'ಯುವ', 'ಧಾತು', 'ಈಶ್ವರ', 'ಬಹುಧಾನ್ಯ', 'ಪ್ರಮಾಥಿ', 'ವಿಕ್ರಮ', 'ವೃಷ', 'ಚಿತ್ರಭಾನು', 'ಸ್ವಭಾನು', 'ತಾರಣ', 'ಪಾರ್ಥಿವ', 'ವ್ಯಯ', 'ಸರ್ವಜಿತ್', 'ಸರ್ವಧಾರಿ', 'ವಿರೋಧಿ', 'ವಿಕೃತಿ', 'ಖರ', 'ನಂದನ', 'ವಿಜಯ', 'ಜಯ', 'ಮನ್ಮಥ', 'ದುರ್ಮುಖಿ', 'ಹೇವಿಳಂಬಿ', 'ವಿಳಂಬಿ', 'ವಿಕಾರಿ', 'ಶಾರ್ವರಿ', 'ಪ್ಲವ', 'ಶುಭಕೃತ್', 'ಶೋಭಕೃತ್', 'ಕ್ರೋಧಿ', 'ವಿಶ್ವಾವಸು', 'ಪರಾಭವ', 'ಪ್ಲವಂಗ', 'ಕೀಲಕ', 'ಸೌಮ್ಯ', 'ಸಾಧಾರಣ', 'ವಿರೋಧಿಕೃತ್', 'ಪರಿಧಾವಿ', 'ಪ್ರಮಾದೀಚ', 'ಆನಂದ', 'ರಾಕ್ಷಸ', 'ನಳ', 'ಪಿಂಗಳ', 'ಕಾಳಯುಕ್ತಿ', 'ಸಿದ್ಧಾರ್ಥಿ', 'ರೌದ್ರಿ', 'ದುರ್ಮತಿ', 'ದುಂದುಭಿ', 'ರುಧಿರೋದ್ಗಾರಿ', 'ರಕ್ತಾಕ್ಷಿ', 'ಕ್ರೋಧನ', 'ಅಕ್ಷಯ'],
    samWord: 'ಸಂವತ್ಸರ', shaka: 'ಶಾಲಿವಾಹನ ಶಕ'
  },
  en: {
    tithi: ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima (full moon)', 'Amavasya (new moon)'],
    paksha: ['Shukla Paksha (waxing)', 'Krishna Paksha (waning)'],
    nak: ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'],
    yoga: ['Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'],
    karana: ['Kimstughna', 'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga'],
    masa: ['Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwija', 'Kartika', 'Margashira', 'Pushya', 'Magha', 'Phalguna'],
    adhika: 'Adhika', masaWord: 'Masa',
    ritu: ['Vasanta', 'Grishma', 'Varsha', 'Sharad', 'Hemanta', 'Shishira'], rituWord: 'Ritu',
    ayana: ['Uttarayana', 'Dakshinayana'],
    rashi: ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'],
    vara: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    sam: ['Prabhava', 'Vibhava', 'Shukla', 'Pramoduta', 'Prajotpatti', 'Angirasa', 'Shrimukha', 'Bhava', 'Yuva', 'Dhatu', 'Ishvara', 'Bahudhanya', 'Pramathi', 'Vikrama', 'Vrisha', 'Chitrabhanu', 'Svabhanu', 'Tarana', 'Parthiva', 'Vyaya', 'Sarvajit', 'Sarvadhari', 'Virodhi', 'Vikriti', 'Khara', 'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukhi', 'Hevilambi', 'Vilambi', 'Vikari', 'Sharvari', 'Plava', 'Shubhakrit', 'Shobhakrit', 'Krodhi', 'Vishvavasu', 'Parabhava', 'Plavanga', 'Kilaka', 'Saumya', 'Sadharana', 'Virodhikrit', 'Paridhavi', 'Pramadicha', 'Ananda', 'Rakshasa', 'Nala', 'Pingala', 'Kalayukti', 'Siddharthi', 'Raudri', 'Durmati', 'Dundubhi', 'Rudhirodgari', 'Raktakshi', 'Krodhana', 'Akshaya'],
    samWord: 'Samvatsara', shaka: 'Shalivahana Shaka'
  }
};

/* festivals: masa (0 = Chaitra), tithi number 1–30 (16–30 = Krishna), when the tithi must hold */
const FEST = [
  { id: 'ugadi', m: 0, t: 1, at: 'rise', kn: 'ಯುಗಾದಿ', en: 'Ugadi' },
  { id: 'ramanavami', m: 0, t: 9, at: 'rise', kn: 'ಶ್ರೀ ರಾಮ ನವಮಿ', en: 'Sri Rama Navami' },
  { id: 'akshaya', m: 1, t: 3, at: 'rise', kn: 'ಅಕ್ಷಯ ತೃತೀಯ', en: 'Akshaya Tritiya' },
  { id: 'shankara', m: 1, t: 5, at: 'rise', kn: 'ಶಂಕರ ಜಯಂತಿ', en: 'Shankara Jayanti' },
  { id: 'narasimha', m: 1, t: 14, at: 'set', kn: 'ನರಸಿಂಹ ಜಯಂತಿ', en: 'Narasimha Jayanti' },
  { id: 'ashadhi', m: 3, t: 11, at: 'rise', kn: 'ಆಷಾಢ ಏಕಾದಶಿ', en: 'Ashadhi Ekadashi' },
  { id: 'gurupurnima', m: 3, t: 15, at: 'rise', kn: 'ಗುರು ಪೂರ್ಣಿಮೆ', en: 'Guru Purnima' },
  { id: 'nagapanchami', m: 4, t: 5, at: 'rise', kn: 'ನಾಗರ ಪಂಚಮಿ', en: 'Nagara Panchami' },
  { id: 'upakarma', m: 4, t: 15, at: 'rise', kn: 'ರಕ್ಷಾ ಬಂಧನ, ಉಪಾಕರ್ಮ', en: 'Raksha Bandhan, Upakarma' },
  { id: 'janmashtami', m: 4, t: 23, at: 'midnight', kn: 'ಶ್ರೀ ಕೃಷ್ಣ ಜನ್ಮಾಷ್ಟಮಿ', en: 'Sri Krishna Janmashtami' },
  { id: 'gowri', m: 5, t: 3, at: 'rise', kn: 'ಸ್ವರ್ಣ ಗೌರಿ ವ್ರತ', en: 'Swarna Gowri Vrata' },
  { id: 'ganesha', m: 5, t: 4, at: 'noon', kn: 'ಗಣೇಶ ಚತುರ್ಥಿ', en: 'Ganesha Chaturthi' },
  { id: 'rishipanchami', m: 5, t: 5, at: 'noon', kn: 'ಋಷಿ ಪಂಚಮಿ', en: 'Rishi Panchami' },
  { id: 'ananta', m: 5, t: 14, at: 'rise', kn: 'ಅನಂತ ಚತುರ್ದಶಿ', en: 'Ananta Chaturdashi' },
  { id: 'mahalaya', m: 5, t: 30, at: 'rise', kn: 'ಮಹಾಲಯ ಅಮಾವಾಸ್ಯೆ', en: 'Mahalaya Amavasya' },
  { id: 'navaratri', m: 6, t: 1, at: 'rise', kn: 'ನವರಾತ್ರಿ ಆರಂಭ', en: 'Navaratri begins' },
  { id: 'saraswati', m: 6, t: 7, at: 'rise', kn: 'ಸರಸ್ವತಿ ಪೂಜೆ', en: 'Saraswati Puja' },
  { id: 'ayudha', m: 6, t: 9, at: 'rise', kn: 'ಆಯುಧ ಪೂಜೆ, ಮಹಾನವಮಿ', en: 'Ayudha Puja, Mahanavami' },
  { id: 'vijayadashami', m: 6, t: 10, at: 'rise', kn: 'ವಿಜಯದಶಮಿ (ದಸರಾ)', en: 'Vijayadashami (Dasara)' },
  { id: 'naraka', m: 6, t: 29, at: 'rise', kn: 'ನರಕ ಚತುರ್ದಶಿ', en: 'Naraka Chaturdashi' },
  { id: 'deepavali', m: 6, t: 30, at: 'set', kn: 'ದೀಪಾವಳಿ ಲಕ್ಷ್ಮೀ ಪೂಜೆ', en: 'Deepavali Lakshmi Puja' },
  { id: 'balipadyami', m: 7, t: 1, at: 'rise', kn: 'ಬಲಿಪಾಡ್ಯಮಿ', en: 'Bali Padyami' },
  { id: 'tulasi', m: 7, t: 12, at: 'rise', kn: 'ತುಳಸಿ ಹಬ್ಬ', en: 'Tulasi Habba' },
  { id: 'kartikapurnima', m: 7, t: 15, at: 'rise', kn: 'ಕಾರ್ತಿಕ ಹುಣ್ಣಿಮೆ', en: 'Kartika Purnima' },
  { id: 'shashti', m: 8, t: 6, at: 'rise', kn: 'ಸುಬ್ರಹ್ಮಣ್ಯ ಷಷ್ಠಿ', en: 'Subrahmanya Shashti' },
  { id: 'hanuman', m: 8, t: 13, at: 'rise', kn: 'ಹನುಮಾನ್ ಜಯಂತಿ', en: 'Hanuman Jayanti' },
  { id: 'datta', m: 8, t: 15, at: 'rise', kn: 'ದತ್ತ ಜಯಂತಿ', en: 'Datta Jayanti' },
  { id: 'vasantapanchami', m: 10, t: 5, at: 'rise', kn: 'ವಸಂತ ಪಂಚಮಿ', en: 'Vasanta Panchami' },
  { id: 'rathasaptami', m: 10, t: 7, at: 'rise', kn: 'ರಥಸಪ್ತಮಿ', en: 'Ratha Saptami' },
  { id: 'shivaratri', m: 10, t: 29, at: 'midnight', kn: 'ಮಹಾ ಶಿವರಾತ್ರಿ', en: 'Maha Shivaratri' },
  { id: 'holi', m: 11, t: 15, at: 'rise', kn: 'ಹೋಳಿ ಹುಣ್ಣಿಮೆ', en: 'Holi' }
];

/* ---------- astronomy ---------- */
const ayanamsa = d => { const T = (A.MakeTime(d).ut) / 36525; return 23.85709 + 1.396971 * T + 0.0003086 * T * T }; // Lahiri, degrees
const sunTrop = d => A.SunPosition(d).elon;
const moonTrop = d => A.EclipticGeoMoon(d).lon;
const sunSid = d => mod(sunTrop(d) - ayanamsa(d), 360);
const moonSid = d => mod(moonTrop(d) - ayanamsa(d), 360);
const elong = d => mod(moonTrop(d) - sunTrop(d), 360);       // 0..360, tithi measure
const yogaArc = d => mod(sunSid(d) + moonSid(d), 360);

/* when does f (an increasing angle, wrapping at 360) next reach target? search forward from d */
function reach(f, d, target, maxHours) {
  const gap = x => mod(target - f(x), 360);
  let a = d, ga = gap(a), stepH = 2;
  if (ga < 1e-7) return d;
  let b = null;
  for (let h = stepH; h <= maxHours; h += stepH) {
    const x = new Date(d.getTime() + h * 3600e3), g = gap(x);
    if (g > ga + 180 || g < 1e-9) { b = x; break }      // wrapped past the target
    a = x; ga = g;
  }
  if (!b) return null;
  for (let i = 0; i < 30; i++) { const m = new Date((a.getTime() + b.getTime()) / 2); const g = gap(m); if (g > ga + 180 || g < 1e-9) b = m; else { a = m; ga = g } }
  return b;
}

/* civil day in IST: y, m (0-based), d → its local midnight as a UTC Date */
const istMidnight = (y, m, d) => new Date(Date.UTC(y, m, d) - IST);
function riseSet(body, dir, from) { const r = A.SearchRiseSet(body, obs, dir, from, 1.2); return r ? r.date : null }

/* new moons, found once and kept (astronomy-engine's own fast search) */
const NM = [];
function newMoonBefore(d) {
  if (!NM.length) NM.push(A.SearchMoonPhase(0, new Date(d.getTime() - 32 * DAY), 32).date);
  while (NM[0] > d) NM.unshift(A.SearchMoonPhase(0, new Date(NM[0].getTime() - 32 * DAY), 31).date); // keep the list unbroken
  while (NM[NM.length - 1] <= d) NM.push(A.SearchMoonPhase(0, new Date(NM[NM.length - 1].getTime() + DAY), 35).date);
  let i = NM.length - 2; while (NM[i] > d) i--;
  return [NM[i], NM[i + 1]];
}
/* the lunar month (amanta) a moment belongs to; Chaitra = 0 */
function lunarMonth(d) {
  const [start, end] = newMoonBefore(d);
  const s1 = Math.floor(sunSid(start) / 30), s2 = Math.floor(sunSid(end) / 30);
  return { idx: (s1 + 1) % 12, adhika: s1 === s2, start, end };
}
/* next time the moon-sun angle reaches a multiple of 12 or 6 degrees */
const phaseReach = (d, target) => { const r = A.SearchMoonPhase(mod(target, 360), d, 3); return r ? r.date : null };

const cache = {};
function day(y, m, d) {
  const key = y + '-' + m + '-' + d; if (cache[key]) return cache[key];
  const mid = istMidnight(y, m, d), nextMid = new Date(mid.getTime() + DAY);
  const rise = riseSet(A.Body.Sun, +1, mid), set = riseSet(A.Body.Sun, -1, rise);
  const nextRise = riseSet(A.Body.Sun, +1, new Date(rise.getTime() + 3600e3));
  const moonrise = riseSet(A.Body.Moon, +1, mid), moonset = riseSet(A.Body.Moon, -1, mid);
  const tithiAt = x => Math.floor(elong(x) / 12);          // 0..29
  // list each limb that holds at sunrise and any that start before the next sunrise
  const seq = (f, size, count, fast) => {
    const out = []; let t = rise, guard = 0;
    while (t < nextRise && guard++ < 4) {
      const i = Math.floor(f(t) / size) % count;
      const end = fast ? phaseReach(t, (i + 1) * size) : reach(f, t, ((i + 1) * size) % 360, 36);
      out.push({ i, end: end && end < nextRise ? end : end, ends: end });
      if (!end || end >= nextRise) break;
      t = new Date(end.getTime() + 60e3);
    }
    return out;
  };
  const tithis = seq(elong, 12, 30, true);
  const naks = seq(moonSid, 360 / 27, 27);
  const yogas = seq(yogaArc, 360 / 27, 27);
  const kar = seq(elong, 6, 60, true);
  const lm = lunarMonth(rise);
  const t0 = tithis[0].i;
  const dayLen = set - rise, part = dayLen / 8;
  const wd = new Date(mid.getTime() + IST + 12 * 3600e3).getUTCDay();
  const seg = n => ({ from: new Date(rise.getTime() + (n - 1) * part), to: new Date(rise.getTime() + n * part) });
  const rahu = seg([8, 2, 7, 5, 6, 4, 3][wd]), yama = seg([5, 4, 3, 2, 1, 7, 6][wd]), gulika = seg([7, 6, 5, 4, 3, 2, 1][wd]);
  const muhurta = dayLen / 15;
  const abhijit = { from: new Date(rise.getTime() + 7 * muhurta), to: new Date(rise.getTime() + 8 * muhurta) };
  const ss = sunSid(rise), ssNext = sunSid(nextRise);
  const sign = Math.floor(ss / 30), signNext = Math.floor(ssNext / 30);
  const sankranti = signNext !== sign ? { sign: signNext, at: reach(sunSid, rise, signNext * 30, 30) } : null;
  const gy = y, shakaYear = gy - 78 - ((m < 5 && lm.idx >= 9) ? 1 : 0);
  const sam = mod(shakaYear + 11, 60);
  const ritu = Math.floor(lm.idx / 2);
  const uttarayana = ss >= 270 || ss < 90;
  const r = { y, m, d, wd, rise, set, nextRise, moonrise, moonset, tithis, naks, yogas, kar, masa: lm.idx, adhika: lm.adhika, paksha: t0 < 15 ? 0 : 1,
    ritu, ayana: uttarayana ? 0 : 1, sam, shaka: shakaYear, sunSign: sign, moonSign: Math.floor(moonSid(rise) / 30), sankranti, rahu, yama, gulika, abhijit,
    tithiAt: x => tithiAt(x), monthAt: x => lunarMonth(x), noon: new Date(rise.getTime() + dayLen / 2), midnight: new Date(nextMid.getTime() - 60e3),
    phase: elong(new Date(mid.getTime() + DAY / 2)) };
  cache[key] = r; return r;
}

/* festivals on one civil day (Karnataka custom): a tithi that touches no sunrise is kept on the day it runs */
const fCache = {};
function rulesHold(p) {
  const out = [];
  FEST.forEach(f => {
    if (f.at === 'rise') {
      // the tithi at sunrise, or a short tithi that starts and ends between this sunrise and the next
      const hits = p.tithis.filter((x, k) => x.i + 1 === f.t && (k === 0 || (x.ends && x.ends < p.nextRise)));
      for (const x of hits) { const at = x === p.tithis[0] ? p.rise : new Date(x.ends.getTime() - 60e3); const lm = p.monthAt(at); if (lm.idx === f.m && !lm.adhika) { out.push(f); break } }
      return;
    }
    const at = f.at === 'noon' ? p.noon : f.at === 'set' ? new Date(p.set.getTime() + 45 * 60e3) : p.midnight;
    if (p.tithiAt(at) + 1 !== f.t) return;
    const lm = p.monthAt(at); if (lm.idx === f.m && !lm.adhika) out.push(f);
  });
  return out;
}
function festivalsOn(y, m, d) {
  const key = y + '-' + m + '-' + d; if (fCache[key]) return fCache[key];
  const p = day(y, m, d);
  const prevD = new Date(Date.UTC(y, m, d - 1)), prev = day(prevD.getUTCFullYear(), prevD.getUTCMonth(), prevD.getUTCDate());
  const nextD = new Date(Date.UTC(y, m, d + 7));
  const prevHold = rulesHold(prev).map(f => f.id);
  const out = rulesHold(p).filter(f => !prevHold.includes(f.id));
  // Varamahalakshmi: the Friday just before Shravana full moon
  if (p.wd === 5 && p.masa === 4 && !p.adhika && p.tithis[0].i >= 6 && p.tithis[0].i <= 13) {
    const nf = day(nextD.getUTCFullYear(), nextD.getUTCMonth(), nextD.getUTCDate());
    if (!(nf.masa === 4 && !nf.adhika && nf.tithis[0].i <= 13)) out.push({ id: 'varamahalakshmi', kn: 'ವರಮಹಾಲಕ್ಷ್ಮೀ ವ್ರತ', en: 'Varamahalakshmi Vrata' });
  }
  // Makara Sankranti: kept the next day when the sun enters Makara after noon
  const sk = s => s && s.sign === 9;
  if (sk(p.sankranti) && p.sankranti.at < p.noon) out.push({ id: 'sankranti', kn: 'ಮಕರ ಸಂಕ್ರಾಂತಿ', en: 'Makara Sankranti' });
  if (sk(prev.sankranti) && prev.sankranti.at >= prev.noon) out.push({ id: 'sankranti', kn: 'ಮಕರ ಸಂಕ್ರಾಂತಿ', en: 'Makara Sankranti' });
  // Vaikuntha Ekadashi: Shukla Ekadashi while the sun is in Dhanu
  if (p.tithis[0].i === 10 && p.sunSign === 8) out.push({ id: 'vaikuntha', kn: 'ವೈಕುಂಠ ಏಕಾದಶಿ', en: 'Vaikuntha Ekadashi' });
  fCache[key] = out; return out;
}
function festivals(y) { const out = {}; for (let i = 0; i < 366; i++) { const dt = new Date(Date.UTC(y, 0, 1 + i)); if (dt.getUTCFullYear() !== y) break; const f = festivalsOn(y, dt.getUTCMonth(), dt.getUTCDate()); if (f.length) out[dt.toISOString().slice(0, 10)] = f } return out }

/* small monthly markers */
function marks(p) {
  const t = p.tithis[0].i, out = [];
  if (t === 14) out.push('purnima'); if (t === 29) out.push('amavasya');
  if (t === 10 || t === 25) out.push('ekadashi');
  if (p.tithiAt(new Date(p.set.getTime() + 90 * 60e3)) === 18) out.push('sankashti');
  return out;
}

const api = { N, FEST, day, festivals, festivalsOn, marks, place: { kn: 'ಬೆಂಗಳೂರು', en: 'Bengaluru' } };
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Panchanga = api;
})(typeof window !== 'undefined' ? window : globalThis);
