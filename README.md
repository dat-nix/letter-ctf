# letter-ctf

A cozy Web 1.0 / GeoCities-style love-letter CTF.

## Run locally

```bash
npm start
```

The site runs on the port provided by the host or `4173` locally. The challenge uses the custom Node route `/letter/open`, so use `node server.js` rather than a plain static file server.

## Challenge path

The intended chain combines web inspection, HTTP response headers, JPEG/ZIP forensics, Base64, and a small Vigenère cipher before the letter can be opened. Organizer notes are kept outside this repository.
