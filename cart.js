// cart.js - Mini Cart helpers
const TAX_RATE = 0.18; // 18% tax

function formatPrice(amount) {
  return "Rs " + Number(amount).toFixed(2);
}

// percent is a whole number: 10 means 10%
function applyDiscount(amount, percent) {
  return amount - (amount * percent) / 100;
}

function calculateTotal(items, discountPercent) {
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.qty;
  }
  return Math.round(subtotal * 100) / 100;
}

module.exports = { TAX_RATE, formatPrice, applyDiscount, calculateTotal };
