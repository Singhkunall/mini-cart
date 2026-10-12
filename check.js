// check.js - self-check for the Git exam.  Run:  node check.js
const fs = require("fs");
const { execSync } = require("child_process");

let failed = 0;
function check(name, fn) {
  let ok = false, err = "";
  try { ok = !!fn(); } catch (e) { err = " (" + e.message.split("\n")[0] + ")"; }
  console.log((ok ? "PASS  " : "FAIL  ") + name + err);
  if (!ok) failed++;
}
const near = (a, b) => Math.abs(a - b) < 0.005;

const src = fs.readFileSync("cart.js", "utf8");
check("cart.js has no conflict markers", () => !/^(<<<<<<<|=======|>>>>>>>)/m.test(src));

let cart = {};
try { cart = require("./cart.js"); } catch (e) { console.log("FAIL  cart.js could not be loaded: " + e.message); failed++; }

check("formatPrice(5) returns 'Rs 5.00'", () => cart.formatPrice(5) === "Rs 5.00");
check("applyDiscount(200, 10) returns 180", () => near(cart.applyDiscount(200, 10), 180));
check("no holiday surcharge: 100 with 0% discount + 18% tax = 118",
  () => near(cart.calculateTotal([{ price: 100, qty: 1 }], 0), 118));
check("discount then tax: 2 x 100, 10% off, +18% tax = 212.40",
  () => near(cart.calculateTotal([{ price: 100, qty: 2 }], 10), 212.4));
check("total is rounded to 2 decimal places", () => {
  const t = cart.calculateTotal([{ price: 33.33, qty: 3 }], 7);
  return Math.abs(t * 100 - Math.round(t * 100)) < 1e-6;
});

let tracked = "";
try { tracked = execSync("git ls-files", { encoding: "utf8" }); } catch (e) {}
check("config/settings.env is not tracked", () => !/^config\/settings\.env$/m.test(tracked));
check("app.log is not tracked", () => !/^app\.log$/m.test(tracked));
check("node_modules/ is not tracked", () => !/^node_modules\//m.test(tracked));
check(".gitignore covers *.env, *.log and node_modules", () => {
  const g = fs.readFileSync(".gitignore", "utf8");
  return /\*\.env/.test(g) && /\*\.log/.test(g) && /node_modules/.test(g);
});
check("README.md has a '## Usage' section", () => /^## Usage/m.test(fs.readFileSync("README.md", "utf8")));

console.log(failed === 0 ? "\nALL CHECKS PASSED" : "\n" + failed + " check(s) failed");
process.exit(failed === 0 ? 0 : 1);
