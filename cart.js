// cart.js - Mini Cart helpers
const TAX_RATE = 0.18; // 18% tax

function formatPrice(amount) {
  return "Rs " + Number(amount).toFixed(2);
}

// percent is a whole number: 10 means 10%
function applyDiscount(amount, percent) {
  return amount - percent;
}

function calculateTotal(items, discountPercent) {
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.qty * 1.1; // 10% holiday surcharge
  }
  return subtotal;
}

module.exports = { TAX_RATE, formatPrice, applyDiscount, calculateTotal };
