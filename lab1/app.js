// ===== SYMMETRIC =====
function generateKey() {
  document.getElementById("key").value =
    Math.random().toString(36).substring(2, 10);
}

function encrypt() {
  let text = input.value;
  let key = document.getElementById("key").value;
  let algo = document.getElementById("algo").value;

  let result;

  if (algo === "aes")
    result = CryptoJS.AES.encrypt(text, key).toString();

  else if (algo === "des")
    result = CryptoJS.DES.encrypt(text, key).toString();

  else if (algo === "tripledes")
    result = CryptoJS.TripleDES.encrypt(text, key).toString();

  output.innerText = "Cipher: " + result;
}

function decrypt() {
  let cipher = input.value;
  let key = document.getElementById("key").value;
  let algo = document.getElementById("algo").value;

  let bytes;

  if (algo === "aes")
    bytes = CryptoJS.AES.decrypt(cipher, key);

  else if (algo === "des")
    bytes = CryptoJS.DES.decrypt(cipher, key);

  else if (algo === "tripledes")
    bytes = CryptoJS.TripleDES.decrypt(cipher, key);

  let result = bytes.toString(CryptoJS.enc.Utf8);

  output.innerText = "Plain: " + result;
}

// ===== HASH =====
function hash() {
  let text = input.value;
  let algo = document.getElementById("algo").value;

  let result;

  if (algo === "md5")
    result = CryptoJS.MD5(text).toString();

  else if (algo === "sha256")
    result = CryptoJS.SHA256(text).toString();

  output.innerText = "Hash: " + result;
}

// ===== RSA =====
let publicKey, privateKey;

function genRSA() {
  const keypair = forge.pki.rsa.generateKeyPair(1024);

  publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
  privateKey = forge.pki.privateKeyToPem(keypair.privateKey);

  output.innerText =
    "Public Key:\n" + publicKey +
    "\nPrivate Key:\n" + privateKey;
}

function rsaEncrypt() {
  let text = input.value;
  let pub = forge.pki.publicKeyFromPem(publicKey);

  let encrypted = pub.encrypt(text, "RSA-OAEP");
  output.innerText = "Cipher: " + btoa(encrypted);
}

function rsaDecrypt() {
  let cipher = atob(input.value);
  let pri = forge.pki.privateKeyFromPem(privateKey);

  let decrypted = pri.decrypt(cipher, "RSA-OAEP");
  output.innerText = "Plain: " + decrypted;
}