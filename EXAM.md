# Git & Pull Request Practical Exam (GitHub edition)

**Time:** 2 hours  **Total:** 100 marks
**Allowed:** Terminal, the GitHub web UI, your training notes, `git help`.
**Practice rule:** try everything yourself first. Open ANSWER_KEY.md only AFTER you finish.

You are a new developer on the **Mini Cart** team. This GitHub repository is *yours* for the exam.
Several things in it are broken or messy, on purpose. Do the parts **in order**.

> GitLab words -> GitHub words: Merge Request (MR) = **Pull Request (PR)**.
> "Insert suggestion" = **"Add a suggestion"** (the +/- icon in a review comment).
> "Resolve thread" = **"Resolve conversation"**.

> **Rules for every commit you make**
> - Use the **Conventional Commits** format: `type: short description` (e.g. `fix:`, `feat:`, `docs:`, `chore:`, `revert:`).
> - One logical change per commit.
> - Never commit secrets, logs, or `node_modules/`.
> - Never force-push to `main`. When you must rewrite a feature branch, use `--force-with-lease`.
> - Before every commit: `git status`, `git add <files>`, `git diff --staged`.
>
> **Self-check:** `node check.js` shows which code checks pass. At the very end, all of them should pass.

---

## Part 0 - Setup (5 min)

1. You already have this project (the `mini-cart` folder). Open a terminal inside it.
2. Configure your Git identity **for this repo only** (not `--global`) with your real name and email.
3. On GitHub create a new **empty** repository called `mini-cart` (no README, no .gitignore, no license).
4. Connect and upload everything: all branches and all tags.
5. On GitHub open two Pull Requests into `main`, and **do not merge them yet**:
   - from `hotfix/round-total`, titled `fix: round cart total to 2 decimal places` (your teammate's approved fix)
   - from `feature/discount-codes`, titled `Discount codes`

---

## Part 1 - Keep secrets out (10 min)

Someone committed `config/settings.env` (it has a password), `app.log`, and the `node_modules/` folder.

1. Create the branch **`chore/remove-tracked-secrets`** from `main`.
2. Stop tracking those three paths **but keep them on your disk**.
3. Add a `.gitignore` so they (and any future `*.env` / `*.log` files) can't be committed again.
4. Commit, push, and open a PR into `main`. In the PR **description**, answer:
   *"The file is removed now. Is the database password safe? What else must the team do?"*
5. Merge the PR yourself.

---

## Part 2 - Revert a bad commit on `main` (10 min)

The commit **`feat: add 10% holiday surcharge`** is already on `main`, and everyone has pulled it. The business has now cancelled the surcharge.

1. Create the branch **`revert/holiday-surcharge`** from the latest `main`.
2. Undo that commit **without rewriting history**. Give the new commit a conventional message starting with `revert:`.
3. Push, open a PR, and in its description answer: *"Why did we use `git revert` here and not `git reset`?"*
4. Merge the PR yourself.

---

## Part 3 - Tags (5 min)

1. Update your local `main`. Create an **annotated** tag **`v1.0.1`** on it, with the message `Release 1.0.1: remove tracked secrets, revert surcharge`.
2. Push that tag to GitHub.
3. Someone pushed a test tag **`release-test`** by mistake. Delete it **locally and on GitHub**.

---

## Part 4 - Branch hygiene (5 min)

The branch **`temp123`** has one commit with the message `fix`.

1. Rename it to **`docs/fix-readme-typo`**, on GitHub too (`temp123` must no longer exist on the remote).
2. Change that commit's message to a proper conventional message, and update the remote safely. *(Don't merge this branch.)*

---

## Part 5 - Clean up a messy branch: reset + interactive rebase (15 min)

The branch **`feature/receipt`** has 4 commits: `add receipt formatter`, `wip`, `fix typo`, `debug stuff`. It was never merged, so it's safe to rewrite it.

1. Check out the branch. Remove the last commit (`debug stuff`) **completely** (its code and its file) using `git reset`.
2. Using **interactive rebase**, squash the 3 remaining commits into **one** commit with the message `feat: add receipt formatter`.
3. Update the remote branch safely. *(Don't merge this branch.)*

---

## Part 6 - Feature work, interrupted: stash + cherry-pick (25 min)

1. Update `main`, then create **`feat/tax-calculation`** from it.
2. Make these changes in `cart.js` as **two separate commits**:
   - **Bug:** `applyDiscount(amount, percent)` is wrong. `percent` is a whole number (10 means 10%). Fix it.
   - **Feature:** `calculateTotal` must apply the discount **and then add tax** using `TAX_RATE` (18%).
3. Start adding a `## Usage` section to `README.md`. **Don't commit it yet.**
4. **Urgent interruption!** Production prices show without decimals (`Rs 5` instead of `Rs 5.00`). A teammate has already fixed this on the branch **`experiment/payments`**, but that branch also contains unfinished payment code that must **not** go to production.
   1. Save your unfinished README work with **`git stash`**, giving the stash the message `wip: usage docs`.
   2. Run `git stash list` and **copy its output**. You'll need it in step 6.
   3. Create the branch **`fix/price-format`** from `main`.
   4. Bring **only** the price-format fix commit from `experiment/payments` onto it, using **cherry-pick**.
   5. Push, open a PR, and merge it yourself.
5. Go back to `feat/tax-calculation` and get your README work back from the stash. Finish the Usage section and commit it with a `docs:` message.
6. Push and open a Pull Request into `main`:
   - Title in conventional format.
   - Description: **What** changed, **Why**, **How to test**, plus the `git stash list` output you copied.
   - Request a **Reviewer** if you have a second account or a friend to add. **Don't merge it.**

---

## Part 7 - Rebase & merge conflict (15 min)

1. Your teammate's PR **`fix: round cart total to 2 decimal places`** (branch `hotfix/round-total`) has been approved. **Merge it** from the GitHub UI (use a normal "Create a merge commit").
2. Your `feat/tax-calculation` PR is now out of date and has a conflict. Update it using **rebase** (not merge) onto the latest `main`. Resolve the conflict **on your computer**:
   - Keep **both** changes: the rounding **and** your tax + discount fix.
   - No conflict markers may remain.
   - `node check.js` -> `ALL CHECKS PASSED`.
3. Update the remote branch safely, and comment on the PR explaining how you resolved the conflict.

---

## Part 8 - Code review (15 min)

Open the PR **`Discount codes`** (branch `feature/discount-codes`). **Don't merge it.**

1. Review the code **and** the commits like a real reviewer.
2. Leave **inline comments** on the specific lines with problems. Use at least one GitHub **suggestion** ("Add a suggestion" in the review comment box).
3. Be specific and kind: say *what* is wrong, *why* it matters, and *how* to fix it. Mention something good too.
4. Submit your review with the correct overall decision.
   *GitHub does not allow you to "Request changes" on your own PR. So choose **Comment** and write
   "Decision: Request changes" as the first line of your review summary.*
   *(With a second GitHub account you can use the real "Request changes" button.)*

---

## Part 9 - Receive a review (during the exam)

Simulate the examiner: when you reach this part, add the following as a review comment on the
`cart.js` file in your `feat/tax-calculation` PR (Files changed tab):

> "Please add a short comment above `TAX_RATE` explaining that it is a fraction (0.18 = 18%), and rename the variable `discounted` to `discountedSubtotal` so the code reads clearly."

Then reply professionally, make the change as a **new commit**, push it, and resolve the conversation.

---

**When you finish:** open ANSWER_KEY.md and compare. Don't delete any branches.
