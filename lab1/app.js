
function generateKey() {
  document.getElementById("key").value = Math.random().toString(36).substring(2, 14);
}

function encrypt() {
  let text = document.getElementById("input").value;
  let key = document.getElementById("key").value;
  let output = document.getElementById("output");

  if (!text || !key) {
    output.innerText = "Error: Please enter both text and key!";
    return;
  }

  try {
    let result = CryptoJS.AES.encrypt(text, key).toString();
    output.innerText = "Cipher: " + result;
  } catch (e) {
    output.innerText = "Error! Something went wrong during encryption.";
  }
}

function decrypt() {
  let cipher = document.getElementById("input").value;
  let key = document.getElementById("key").value;
  let output = document.getElementById("output");

  if (!cipher || !key) {
    output.innerText = "Error: Please enter both ciphertext and key!";
    return;
  }

  try {
    let bytes = CryptoJS.AES.decrypt(cipher, key);
    let result = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!result) throw new Error("Invalid Key");
    
    output.innerText = "Plain: " + result;
  } catch (e) {
    output.innerText = "Error! Invalid key or corrupted ciphertext.";
  }
}