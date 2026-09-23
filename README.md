# Banking Computation Challenges

An interactive React + TypeScript demo covering six real, common computational challenges that banking and fintech websites run into — each with a working, tabbed example showing both a naive (buggy) approach and the correct fix side by side.

**[Live Demo]:https://bankingcomputationchallenges.vercel.app/** 


## Why this project

I got curious about what computational problems a banking website actually has to deal with behind the scenes — not textbook theory, but the kind of thing that quietly breaks in production. I used AI-assisted research to explore this space, found six challenges worth understanding properly, and implemented each one from scratch to make sure I actually understood them rather than just knowing they exist.

## What's inside

| Tab | What it shows |
|---|---|
| **دقت اعشاری (Float precision)** | Why `0.1 + 0.2 !== 0.3` in JavaScript, and an integer-arithmetic + remainder-distribution technique for splitting money without precision loss |
| **گردکردن اقساط (Loan rounding)** | Why a loan's remaining balance doesn't always hit exactly zero after the last payment, and why the last-installment adjustment fix is needed |
| **شماره شبا (IBAN validation)** | The mod-97 checksum algorithm behind Iranian bank account number validation, computed with running modular arithmetic instead of one large division |
| **شماره کارت (Luhn algorithm)** | The Luhn/Mod10 checksum behind every payment form's card-number validation |
| **Banker's Rounding** | Why `Math.round` has a systematic upward bias on `.5` values, and how "round half to even" removes that bias across many transactions |
| **ریال / تومان** | A very common Iranian-specific bug: storing amounts in Rial but displaying in Toman, and what a doubled unit conversion does to the displayed value |

Every tab shows a red (naive/incomplete) implementation next to a green (correct/complete) one, so the difference is something you can actually see, not just read about.

## Tech stack

- React (hooks only: `useState`, `useMemo`)
- TypeScript
- Tailwind CSS
- No external libraries — every algorithm here is implemented from scratch

## Running locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## What I'd improve next

- Add a real routing-number/SWIFT-style validation example for international transfers
- Add a currency-conversion rounding example (splitting a foreign-currency amount across multiple accounts)
- Pull IBAN/card test numbers from a small fixture file instead of hardcoding one example per section
