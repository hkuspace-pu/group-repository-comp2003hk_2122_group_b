const { createHash } = require('crypto');
import CryptoJS from "crypto-js";

export default {
    encrypt(word: string, keyStr: string, ivStr: string): string {
        let key = CryptoJS.enc.Utf8.parse(keyStr),
            iv = CryptoJS.enc.Utf8.parse(ivStr),
            src = CryptoJS.enc.Utf8.parse(word);

        let encrypted = CryptoJS.AES.encrypt(src, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });

        return encrypted.toString();
    },

    decrypt(word: string, keyStr: string, ivStr: string): string {
        let key = CryptoJS.enc.Utf8.parse(keyStr),
            iv = CryptoJS.enc.Utf8.parse(ivStr);

        let decrypt = CryptoJS.AES.decrypt(word, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return decrypt.toString(CryptoJS.enc.Utf8);
    },

    generateIV(length: number): string {
        let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            iv = "";
        for (var i = 0; i <= length; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            iv += chars.substring(randomNumber, randomNumber + 1);
        }
        return iv;
    },

    hash(word: string): string {
        return createHash('sha256').update(word).digest('hex');
    }
}