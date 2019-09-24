
var CryptoJS = require('crypto-js');
 

var ecr = function(str)
{
    return CryptoJS.AES.encrypt(str, 'swapnil');
};

console.log(ecr('swapnil').toString())

// Encrypt
//var ciphertext = CryptoJS.AES.encrypt('my message', 'swapnil');
 
// Decrypt
/*
var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(),'swapnil');
var plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
console.log(plaintext); */

/*
Login oninit
login.component.ts:27 Enc U2FsdGVkX19TD9PZQ6Vj6ZRQXodj4OtFM3ZkPt2UB9I=
login.component.ts:29 dec swapnil

*/

/* const crypto=require('crypto');
const algorithm = `aes-256-cbc`;
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
     let encrypted = cipher.update(text);
     encrypted = Buffer.concat([encrypted, cipher.final()]);
     return { iv: iv.toString(`hex`), encryptedData: encrypted.toString(`hex`) };
     }
    function decrypt(text) {
    let iv = Buffer.from(text.iv, `hex`);
     let encryptedText = Buffer.from(text.encryptedData, `hex`);
     let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
     let decrypted = decipher.update(encryptedText);
     decrypted = Buffer.concat([decrypted, decipher.final()]);
     return decrypted.toString();
     }
    var hw = encrypt("Some serious stuff")
    console.log(hw)
    console.log(decrypt(hw)) */


