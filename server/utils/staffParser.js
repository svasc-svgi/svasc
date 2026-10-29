/**
 * Parses faculty and staff names to extract initial(s), core name,
 * and generate a unique canonical normalized key for cross-department sync.
 */
function parseStaffName(rawName) {
  if (!rawName) return { rawName: '', coreName: '', initial: '', normalizedKey: '' };

  let str = rawName.trim();
  // Strip common honorifics & prefixes (English & Tamil)
  str = str.replace(/^(dr|mr|mrs|ms|prof|முனைவர்|திரு|திருமதி|செல்வி)\.?\s+/i, '').trim();
  str = str.replace(/^(dr|mr|mrs|ms|prof)\./i, '').trim();

  let initial = '';
  let coreName = str;

  // Dotted sequence at start: e.g. "K. G. Umayambigai", "K.R. Kavitha", "M.S.Gomathi", "Chi. Nanjappa", "P. S. Kavitha", "B. Kanchanadevi"
  const dottedStart = /^((?:[a-zA-Z\u0B80-\u0BFF]{1,4}\.[\s]*)+)\s*(.+)$/;
  // Single letter/word initial at start: e.g. "K Manikandan", "இர செந்தில்ராணி"
  const singleStart = /^([a-zA-Z\u0B80-\u0BFF]{1,3})\s+(.+)$/;
  // Ending initial: e.g. "Karthi P", "Kanjana Devi M"
  const endInitial = /^(.+?)\s+([a-zA-Z\u0B80-\u0BFF]{1,3}(?:\.[a-zA-Z\u0B80-\u0BFF]{1,3})*\.?)$/;

  let m;
  if ((m = str.match(dottedStart))) {
    initial = m[1].replace(/[\.\s]/g, '').toUpperCase();
    coreName = m[2].trim();
  } else if ((m = str.match(singleStart)) && m[2].length > 1) {
    initial = m[1].toUpperCase();
    coreName = m[2].trim();
  } else if ((m = str.match(endInitial))) {
    initial = m[2].replace(/[\.\s]/g, '').toUpperCase();
    coreName = m[1].trim();
  }

  // Canonicalize coreName: lowercase, replace 'j' with 'ch' for transliterated variations like Kanjana/Kanchana
  let cleanCore = coreName.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
  cleanCore = cleanCore.replace(/j/g, 'ch');

  const cleanInit = initial.toLowerCase().replace(/[^a-z0-9\u0B80-\u0BFF]/g, '');
  const normalizedKey = cleanInit ? `${cleanCore}_${cleanInit}` : cleanCore;

  return {
    rawName,
    coreName,
    initial,
    normalizedKey
  };
}

module.exports = {
  parseStaffName
};
