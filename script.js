function run() {
    let algo = document.getElementById("algo").value;
    let action = document.getElementById("action").value;
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;

    let result = "";

    try {
        if (algo === "DES") {
            if (action === "encrypt") {
                result = CryptoJS.DES.encrypt(text, key).toString();
            } else {
                result = CryptoJS.DES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
            }
        }

        if (algo === "3DES") {
            if (action === "encrypt") {
                result = CryptoJS.TripleDES.encrypt(text, key).toString();
            } else {
                result = CryptoJS.TripleDES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
            }
        }

    } catch (e) {
        result = "Error! Check input or key.";
    }

    document.getElementById("result").value = result;
}