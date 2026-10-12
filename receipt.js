// receipt.js - prints a simple receipt
function formatReceipt(items) {
  // TODO: add totals
  return items.map(i => i.name + " x" + i.qty).join("\n");
}
// fixed type: spelling of "Receipt" in header
module.exports = { formatReceipt };
