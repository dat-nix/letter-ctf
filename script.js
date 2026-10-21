const openLetter = document.querySelector('#openLetter');
const siteWrap = document.querySelector('.site-wrap');
const letterCover = document.querySelector('#letter');
const letterPaper = document.querySelector('#letterPaper');
const letterContent = document.querySelector('#letterContent');
const unlockForm = document.querySelector('#unlockForm');
const unlockKey = document.querySelector('#unlockKey');
const unlockStatus = document.querySelector('#unlockStatus');
const waxSeal = document.querySelector('.wax-seal');

const expectedKeyHash = 'd327b63eb4025129a89ad56cae1ee4be4b05bb4949329e954a51884ad6128127';
const lockedLetter = 'HU0cBAdITlNJVxxcRF5DW1daQlxPDxcaWRgMBUVaGgEGTAhHDgEKA1gNFkweHUVHAVESHAkMEwEaAU1CRzdIDRtLCFRTEw8aBhUBAANPCAABXgMHR0cBUQUPHggAGhUWBwtHSXZOIEsSTB0BCwhJEwdUCw4TAFNUAxxLBA0fHBoYBQJIBAoOGwBTWQQIH0VLFhACH0kLAR8DTxlFAlgFDB9FXxwaA0wIE0gADgpYAB1JTAYNRUxTGQECDkcMFR9PmuXnDRsIGQgNHxwJBB0URFQVAx0AA1RMDQQCXl9VDRkbDgcBFU8eCgtIH0VLBEMXVQsCBhIPHEYcCAQQSEwPBBcNEhkCTB0PDVQSBxELFF5MIEsBQlMbARhJBgQDBxYLRRhDAx5LDUIEVRoDSRQJDUYADRFTQQMcD0sPX1c6BAgJA1QfAA1FFUIeSQkARB0STgsMCRwYA08PDAdFTAQSRV4HBw8CDgJIGA8bDAkWDQ4bCgxDX1UIAxtHBRUNBhYCU0IeDQILTAEMTggIHhtUAAodCVNeHAwIDEwfWU4NBwNIEgkdWAcWRAIOSxFFFlUeCRsUBxpGJlgSEkMYSR8KDQcQAgBJAh4RFBZYERpDFUkYEUIBDE4YBklIPUYHFxUWDRUGHkVGHRoZTAEIH1QCCh0VH1RMBQQTSBdVFwMcRwkGA0FaSVFkCkkfDUQAVRkJCxQBAANPDwABSEwISw1CBgYLQEkuSAMJGhQBU0EJCB0ADQcdC0wZCBoXDk8UDBRFGEkECw0VGhxMEAgdVAAACgAFSB5HSyQNHxoXDQVHDBsBTw8KBkEISQwQTAERThgBAkgQCQAKSVNMAg1LBA0fHBoYBQJIEgkXWBIcWAANSwlIEhFOFQYSSAAOHRcQFEVMHQMADRQUHAgMCUZWO0NaFhpKAggfEF8WV1ROEAgdBhVDWAQfWg0QGElxLxuM9chHMw0JGgpFHUwBDDZHUA==';
let sealOpen = false;

if (window.location.hash) {
  window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
}

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256(value) {
  return bytesToHex(await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
}

function decodeLetter(key) {
  const encrypted = Uint8Array.from(window.atob(lockedLetter), (char) => char.charCodeAt(0));
  const keyBytes = new TextEncoder().encode(key);
  const plain = encrypted.map((byte, index) => byte ^ keyBytes[index % keyBytes.length]);
  return JSON.parse(new TextDecoder().decode(plain));
}

function renderLetter(letter) {
  letterContent.innerHTML = [
    `<p class="date-line">${letter.date}</p>`,
    `<h3>${letter.greeting}</h3>`,
    ...letter.paragraphs.map((paragraph) => `<p>${paragraph}</p>`),
    `<p class="signature">${letter.signature.replace(/\\n/g, '<br />').replace(/\n/g, '<br />')}</p>`
  ].join('');
}

unlockForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const candidate = unlockKey.value.trim().toLowerCase();
  if (!candidate) return;
  unlockStatus.textContent = 'checking the old paper seal...';
  if (await sha256(candidate) !== expectedKeyHash) {
    unlockStatus.textContent = 'nope — the wax is still holding.';
    unlockKey.select();
    return;
  }
  unlockKey.disabled = true;
  unlockForm.querySelector('button').disabled = true;
  sealOpen = true;
  unlockStatus.innerHTML = '<strong>✓ the seal is open!</strong><br />click the glowing wax to open your letter.';
  unlockStatus.classList.add('success');
  letterCover.classList.add('unlocked');
  openLetter.classList.add('ready-to-open');
  waxSeal.textContent = 'OPEN';
  openLetter.disabled = false;
  openLetter.setAttribute('aria-label', 'Open the unlocked love letter');
});

openLetter.addEventListener('click', () => {
  if (!letterCover.classList.contains('entered')) {
    letterCover.classList.add('entered');
    siteWrap.classList.add('challenge-active');
    unlockForm.hidden = false;
    openLetter.disabled = true;
    openLetter.setAttribute('aria-label', 'Find the key to open the envelope');
    window.setTimeout(() => unlockKey.focus(), 250);
    return;
  }
  if (!sealOpen) return;
  if (letterCover.classList.contains('opening')) return;
  siteWrap.classList.remove('challenge-active');
  openLetter.setAttribute('aria-expanded', 'true');
  letterCover.classList.add('opening');
  window.setTimeout(async () => {
    letterCover.hidden = true;
    letterPaper.hidden = false;
    try {
      renderLetter(decodeLetter(unlockKey.value.trim().toLowerCase()));
    } catch {
      letterContent.innerHTML = '<p class="date-line">the paper is crinkled. try opening it again.</p>';
    }
    letterPaper.classList.add('revealed');
    letterPaper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1350);
});
