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
const newLockedLetter = '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';
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
  const encrypted = Uint8Array.from(window.atob(newLockedLetter), (char) => char.charCodeAt(0));
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
