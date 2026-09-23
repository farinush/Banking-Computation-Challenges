import { useState } from "react";
import Card from "./publicUi/Card";
import CompareGrid from "./publicUi/CompareGrid";
import SectionTitle from "./publicUi/SectionTitle";

function tomanToRial(toman: number): number {
  return toman * 10;
}
function rialToToman(rial: number): number {
  return rial / 10;
}

function getBalanceForDisplayNaive(balanceRial: number): number {
  return balanceRial * 10; // ! باگ: باید تقسیم بر ۱۰ باشه
}

function TomanSection() {
  const [tomanInput, setTomanInput] = useState("500000");
  const toman = parseFloat(tomanInput) || 0;
  const rial = tomanToRial(toman);
  const naiveDisplay = getBalanceForDisplayNaive(rial);
  const correctDisplay = rialToToman(rial);

  return (
    <Card>
      <SectionTitle>
        سردرگمی ریال / تومان (خطای رایج در تبدیل ریال و تومان )
      </SectionTitle>
      <p className="text-md text-[#425856] leading-6 mb-3">
        خیلی از سیستم‌های بانکی ایرانی مقدار رو به <strong>ریال</strong> (واحد
        پایه) ذخیره می‌کنن ولی به کاربر <strong>تومان</strong> نشون می‌دن. یک
        اشتباه رایج: یک‌جای کد ضرب جای تقسیم استفاده بشه.
      </p>
      <input
        value={tomanInput}
        onChange={(e) => setTomanInput(e.target.value)}
        dir="ltr"
        className="w-full border border-[#D8E2E0] rounded px-3 py-2 text-sm font-mono mb-3"
      />
      <p className="text-md font-mono mb-3">
        مبلغ به تومان: {toman.toLocaleString("fa-IR")} → ذخیره‌شده به ریال:{" "}
        {rial.toLocaleString("fa-IR")}
      </p>
      <div className="my-[15px]">
        <h1>هسته ی اصلی :</h1>
        <pre
          dir="ltr"
          className="text-left border p-2 border-gray-300 whitespace-pre-wrap overflow-x-auto"
        >
          <code>{`function tomanToRial(toman: number): number {
  return toman * 10;
}
function rialToToman(rial: number): number {
  return rial / 10;
}`}</code>
        </pre>
      </div>
      <CompareGrid
        naiveLabel=" getBalanceForDisplayNaive : ضرب به‌جای تقسیم"
        naiveValue={`${naiveDisplay.toLocaleString("fa-IR")} تومان`}
        naiveNote=" ۱۰۰ برابر مقدار واقعی نمایش داده می‌شه"
        safeLabel=" rialToToman : تابع نام‌دار و درست"
        safeValue={`${correctDisplay.toLocaleString("fa-IR")} تومان`}
        safeNote=" دقیقاً برابر مقدار اصلی"
      />
    </Card>
  );
}
export default TomanSection;
