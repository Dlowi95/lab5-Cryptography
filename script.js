let n, phi, d, eVal;

// convert hex → BigInt
function hexToBigInt(hex) {
  return BigInt("0x" + hex);
}

// convert string → BigInt
function textToBigInt(text) {
  let hex = "";
  for (let i = 0; i < text.length; i++) {
    hex += text.charCodeAt(i).toString(16);
  }
  return BigInt("0x" + hex);
}

// BigInt → text
function bigIntToText(bi) {
  let hex = bi.toString(16);
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

// modular exponentiation
function modExp(base, exp, mod) {
  let result = 1n;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

// extended Euclid → tìm d
function modInverse(e, phi) {
  let [a, m] = [e, phi];
  let [m0, x0, x1] = [m, 0n, 1n];

  if (m === 1n) return 0n;

  while (a > 1n) {
    let q = a / m;
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }

  if (x1 < 0n) x1 += m0;
  return x1;
}

// ===== KEY GENERATION =====
function generateKey() {
  let p = hexToBigInt(document.getElementById("p").value);
  let q = hexToBigInt(document.getElementById("q").value);
  eVal = hexToBigInt(document.getElementById("e").value);

  n = p * q;
  phi = (p - 1n) * (q - 1n);
  d = modInverse(eVal, phi);

  document.getElementById("n").innerText = n.toString(16);
  document.getElementById("phi").innerText = phi.toString(16);
  document.getElementById("d").innerText = d.toString(16);
}

// ===== ENCRYPT =====
function encrypt() {
  let text = document.getElementById("plain").value;
  let m = textToBigInt(text);

  let c = modExp(m, eVal, n);

  document.getElementById("cipher").innerText = c.toString(16);
}

// ===== DECRYPT =====
function decrypt() {
  let c = hexToBigInt(document.getElementById("cipherInput").value);

  let m = modExp(c, d, n);

  document.getElementById("message").innerText = bigIntToText(m);
}