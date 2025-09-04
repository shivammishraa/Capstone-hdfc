import CryptoJS from "crypto-js";

const AES_SECRET_KEY = "your-32-char-secret-key"; // Use a secure key in production!

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, AES_SECRET_KEY).toString();
};