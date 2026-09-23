import { useMemo, useState } from "react";
import Card from "./publicUi/Card";
import CompareGrid from "./publicUi/CompareGrid";
import SectionTitle from "./publicUi/SectionTitle";
function isValidCardNaive(rawNumber: string): boolean {
  const digits = rawNumber.replace(/\D/g, "");
  return digits.length === 16;
}
function isValidLuhn(rawNumber: string): boolean {
  const digits = rawNumber.replace(/\D/g, "");
  if (digits.length < 12) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}


function LuhnSection() {
  const [value, setValue] = useState("6274129005473742");
  const valid = useMemo(() => isValidLuhn(value), [value]);
  const naiveValid = useMemo(() => isValidCardNaive(value), [value]);

  return (
    <Card>
      <SectionTitle>اعتبارسنجی شماره کارت بانکی</SectionTitle>
      <h1 className="text-[#425856] font-samim text-l font-bold">
        الگوریتم Luhn یا Modulus 10
      </h1>
      <h4 className="text-s font-samim text-blue-500">* IBAN از Mod97 استفاده می‌کند و اینجا Luhn / Mod10 *</h4>
      <p className="text-[#425856]">
        این الگوریتم دقیقاً برای اعتبارسنجی اعداد دارای Check Digit طراحی شده و
        در شماره‌های کارت بانکی، بعضی شناسه‌ها و شماره‌های مشابه کاربرد دارد.
      </p>
      <h1>شماره کارت بانکی :</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        dir="ltr"
        className="w-full border border-[#D8E2E0] rounded px-3 py-2 text-sm font-mono mb-3"
        placeholder="16 digit card number"
      />
      <div className="mb-[10px]">
        <pre
          dir="ltr"
          className="text-left border p-2 border-gray-300 whitespace-pre-wrap overflow-x-auto"
        >
          <code>{`let sum = 0;
let shouldDouble = false;

for (let i = digits.length - 1; i >= 0; i--) {
  let d = parseInt(digits[i], 10);
  if (shouldDouble) {
    d *= 2;
    if (d > 9) d -= 9;
  }
  sum += d;
  shouldDouble = !shouldDouble;
}
return sum % 10 === 0;`}</code>
        </pre>
      </div>
      <CompareGrid
        naiveLabel=" isValidCardNaive : فقط طول"
        naiveValue={naiveValid ? "قبول شد" : "رد شد"}
        naiveNote="هر عدد ۱۶ رقمی رو قبول می‌کنه، حتی اگه رقم‌هاش کاملاً تصادفی باشن"
        safeLabel=" isValidLuhn : چک‌سام واقعی"
        safeValue={valid ? "معتبر" : "نامعتبر"}
        safeNote="چک‌سام واقعی رقم‌ها رو بررسی می‌کنه"
      />
      <p className="text-xs text-[#425856] leading-6">
        امتحانش کن: عدد{" "}
        <code className="bg-[#F5F7F6] px-1 rounded" dir="ltr">
          1234567812345678
        </code>{" "}
        رو بذار, چک ساده قبولش می‌کنه چون ۱۶ رقمه، ولی Luhn ردش می‌کنه چون
        چک‌سامش نادرسته.
      </p>
    </Card>
  );
}
export default LuhnSection;
