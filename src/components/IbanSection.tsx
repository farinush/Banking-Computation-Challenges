import { useMemo, useState } from "react";
import Card from "./publicUi/Card";
import CompareGrid from "./publicUi/CompareGrid";
import SectionTitle from "./publicUi/SectionTitle";

function ibanMod97Remainder(numericString: string): number {
  let remainder = 0;
  for (const digit of numericString) {
    remainder = (remainder * 10 + Number(digit)) % 97;
  }
  return remainder;
}

function isValidIbanNaive(rawIban: string): boolean {
  const iban = rawIban.replace(/\s+/g, "").toUpperCase();
  return /^IR\d{24}$/.test(iban);
}

function isValidIban(rawIban: string): { valid: boolean; reason: string } {
  const iban = rawIban.replace(/\s+/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) {
    return {
      valid: false,
      reason: "فرمت پایه‌ی شبا رعایت نشده (باید با دو حرف کشور شروع بشه)",
    };
  }
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged
    .split("")
    .map((ch) => (/[A-Z]/.test(ch) ? String(ch.charCodeAt(0) - 55) : ch))
    .join("");
  const remainder = ibanMod97Remainder(numeric);
  return remainder === 1
    ? { valid: true, reason: "چک‌سام mod97 درست است" }
    : {
        valid: false,
        reason: `چک‌سام نامعتبر (باقیمانده ${remainder}، باید ۱ باشه)`,
      };
}

function IbanSection() {
  const [value, setValue] = useState("IR820540102680020817909002");
  const result = useMemo(() => isValidIban(value), [value]);
  const naiveResult = useMemo(() => isValidIbanNaive(value), [value]);

  return (
    <Card>
      <SectionTitle>اعتبارسنجی شماره شبا:</SectionTitle>
      <p className="text-[#425856]">
        شماره شبا یک چک سام (رقم کنترلی) داره که ریاضی خاصی پشتشه: حروف رو به
        عدد تبدیل میکنیم, 4 کاراکتر اول رو میبریم آخر رشته, و باقی مانده ی تقسیم
        این عدد بزرگ بر 97 رو حساب میکنیم.اگه باقیمانده دقیقا 1 بشه,شماره
        معتبره. چالش فنی ای که این روش داره:این عدد نهایی می تونه +30 رقم داشته
        باشه; خیلی بزرگتر از چیزی که Number جاوااسکریپت بتونه دقیق نگه داره.(مثل
        موردی که در مورد اعداد اعشاری صدق میکرد)
      </p>
      <p className="text-[#425856]">
        * CheckSum یعنی یک مقدار محاسباتی که از روی داده‌ی اصلی تولید می‌شود تا
        بتوانیم درستی یا خراب‌شدن داده را بررسی کنیم.
      </p>
      <pre dir="ltr" className="text-left whitespace-pre-wrap overflow-x-auto">
        <code>{`function isValidIBAN(rawIban) {
  const iban = rawIban.replace(/\\s/g, "").toUpperCase();
  if (!/^[A-Z]{2}\\d{2}[A-Z0-9]+$/.test(iban)) {
    return false;
  }
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  let remainder = 0;
  for (const char of rearranged) {
    if (char >= "0" && char <= "9") {
      remainder = (remainder * 10 + Number(char)) % 97;
    } else {
      const value = char.charCodeAt(0) - 55;
      remainder = (remainder * 100 + value) % 97;
    }
  }
  return remainder === 1;
}`}</code>
      </pre>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        dir="ltr"
        className="w-full border border-[#D8E2E0] rounded px-3 py-2 text-sm font-mono mb-3"
        placeholder="IRxx xxxx xxxx xxxx xxxx xxxx xx"
      />
      <CompareGrid
        naiveLabel=" isValidIbanNaive (فقط فرمت ظاهری)"
        naiveValue={naiveResult ? "قبول شد" : "رد شد"}
        naiveNote="هر رشته‌ی ۲۶ رقمی که با IR شروع بشه رو قبول می‌کنه، حتی اگه جعلی باشه"
        safeLabel=" isValidIban (چک‌سام واقعی (mod97))"
        safeValue={result.valid ? "معتبر" : "نامعتبر"}
        safeNote={result.reason}
      />
      <p className="text-s text-[#425856] leading-6">
        مثلا یک رشته‌ی ۲۶ کاراکتری
        <code className="bg-[#F5F7F6] px-1 rounded" dir="ltr">
          IR000000000000000000000000
        </code>{" "}
        <p className="font-samim">
          {" "}
          رو بذاریم . چک ساده قبولش می‌کنه چون فقط فرمت رو می‌بینه، ولی چک واقعی
          ردش می‌کنه چون checksum mod97 درست نیست (باقیمانده‌ش ۴۹ هست، نه ۱).
        </p>
      </p>
    </Card>
  );
}
export default IbanSection;
