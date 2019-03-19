 // 利用Crypto-js的aes加密，CBC模式，ZeroPadding对齐方式，秘钥以及偏移量均为xxzhxxzhxxzhxxzh
const CryptoJS = require('crypto-js')

const key = CryptoJS.enc.Utf8.parse("xxzhxxzhxxzhxxzh")
const iv = CryptoJS.enc.Utf8.parse("xxzhxxzhxxzhxxzh")

// 解密方法
export function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
export function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  });
  let hexStr =  encrypted.ciphertext.toString().toUpperCase();
  var oldHexStr = CryptoJS.enc.Hex.parse(hexStr); //需要这一步转化
  // 将密文转为Base64的字符串
  var base64Str = CryptoJS.enc.Base64.stringify(oldHexStr);

  return base64Str;
}

export default {
  Decrypt,
  Encrypt
}
