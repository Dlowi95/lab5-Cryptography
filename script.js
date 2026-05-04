function generateHash() {
    const input = document.getElementById('inputText').value;
    const algo = document.getElementById('algoSelect').value;
    const resultArea = document.getElementById('resultArea');
    const resultText = document.getElementById('resultText');

    if (input.trim() === '') {
        alert('Vui lòng nhập văn bản cần băm!');
        return;
    }

    let hashValue = '';
    if (algo === 'SHA-256') {
        hashValue = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
    } else if (algo === 'MD5') {
        hashValue = CryptoJS.MD5(input).toString(CryptoJS.enc.Hex);
    }

    resultText.textContent = hashValue;
    resultArea.style.display = 'block';
}

function copyResult() {
    const resultText = document.getElementById('resultText').textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Đã copy giá trị Hash vào bộ nhớ tạm!');
    }).catch(err => {
        alert('Lỗi khi copy: ' + err);
    });
}

function tryAgain() {
    document.getElementById('inputText').value = '';
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('resultText').textContent = '';
}