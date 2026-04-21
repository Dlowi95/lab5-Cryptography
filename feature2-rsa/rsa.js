let storedPublicKey = '';
let storedPrivateKey = '';

// ============================================================
// HÀM CHUYỂN DỮ LIỆU NHỊ PHÂN → PEM FORMAT
// ============================================================
function toPem(buffer, label) {
  // Chuyển ArrayBuffer sang chuỗi base64
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  // Cắt thành từng dòng 64 ký tự
  const lines = base64.match(/.{1,64}/g).join('\n');
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
}

// ============================================================
// HÀM CHUYỂN PEM → DỮ LIỆU NHỊ PHÂN (để import lại)
// ============================================================
function pemToDer(pem) {
  const base64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const binary = atob(base64);
  return Uint8Array.from(binary, c => c.charCodeAt(0));
}

// ============================================================
// 1. TẠO CẶP KHÓA RSA
// ============================================================
async function generateKeys() {
  const bits = parseInt(document.getElementById('keysize').value);

 
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',          
      modulusLength: bits,        
      publicExponent: new Uint8Array([1, 0, 1]),  
      hash: 'SHA-256',            
    },
    true,                         
    ['encrypt', 'decrypt']       
  );

  const pubDer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privDer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  storedPublicKey = toPem(pubDer, 'PUBLIC KEY');
  storedPrivateKey = toPem(privDer, 'PRIVATE KEY');

  document.getElementById('pubkey-out').value = storedPublicKey;
  document.getElementById('privkey-out').value = storedPrivateKey;
}

// ============================================================
// 2. MÃ HÓA
// ============================================================
async function doEncrypt() {
  const plaintext = document.getElementById('enc-plain').value.trim();
  const pubPem = document.getElementById('enc-pubkey').value.trim();

  if (!plaintext || !pubPem) {
    alert('Vui lòng nhập Plaintext và Public Key!');
    return;
  }

  const pubDer = pemToDer(pubPem);
  const publicKey = await crypto.subtle.importKey(
    'spki',
    pubDer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );

  const encoded = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, encoded);

  const base64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  document.getElementById('enc-out').value = base64;
}

// ============================================================
// 3. GIẢI MÃ
// ============================================================
async function doDecrypt() {
  const ciphertext = document.getElementById('dec-cipher').value.trim();
  const privPem = document.getElementById('dec-privkey').value.trim();

  if (!ciphertext || !privPem) {
    alert('Vui lòng nhập Ciphertext và Private Key!');
    return;
  }

  const privDer = pemToDer(privPem);
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    privDer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['decrypt']
  );

  const cipherBytes = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
  const decrypted = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, cipherBytes);

  document.getElementById('dec-out').value = new TextDecoder().decode(decrypted);
}

// ============================================================
// TIỆN ÍCH: Dán khóa đã tạo vào ô nhập
// ============================================================
function pasteKey(type, targetId) {
  const key = type === 'pub' ? storedPublicKey : storedPrivateKey;
  if (!key) {
    alert('Chưa có khóa! Hãy tạo khóa ở tab "Tạo khóa" trước.');
    return;
  }
  document.getElementById(targetId).value = key;
}

// ============================================================
// TIỆN ÍCH: Chuyển đổi giữa các tab
// ============================================================
function showTab(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  event.target.classList.add('active');
}