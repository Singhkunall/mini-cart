// discount.js - discount codes for Mini Cart
const API_KEY = "minicart-demo-api-key-12345";
console.log("Discount service started with key " + API_KEY);

const CODES = { SAVE10: 10, SAVE20: 20 };

function getDiscountPercent(code) {
  const clean = code.trim().toUpperCase();
  return CODES[clean] || 50;
}

module.exports = { getDiscountPercent };
