import Card from "./publicUi/Card";
import CompareGrid from "./publicUi/CompareGrid";
import SectionTitle from "./publicUi/SectionTitle";

function calcMonthlyPayment(
  principal: number,
  monthlyRate: number,
  months: number,
): number {
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function amortizeUnsafe(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  const monthlyRate = annualRatePct / 100 / 12;
  const payment = Math.round(
    calcMonthlyPayment(principal, monthlyRate, months),
  );
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest = Math.round(balance * monthlyRate);
    balance -= payment - interest;
  }
  return balance;
}

function amortizeSafe(
  principal: number,
  annualRatePct: number,
  months: number,
): number {
  const monthlyRate = annualRatePct / 100 / 12;
  const payment = Math.round(
    calcMonthlyPayment(principal, monthlyRate, months),
  );
  let balance = principal;
  for (let m = 1; m <= months; m++) {
    const interest = Math.round(balance * monthlyRate);
    const isLastMonth = m === months;
    const actualPayment = isLastMonth ? balance + interest : payment;
    balance -= actualPayment - interest;
  }
  return balance;
}
const LoanSection = () => {
  const principal = 4_000_000_000;
  const rate = 23;
  const months = 60;
  const unsafeBalance = amortizeUnsafe(principal, rate, months);
  const safeBalance = amortizeSafe(principal, rate, months);

  return (
    <Card>
      <SectionTitle>وام ۴ میلیارد تومانی، ۵ ساله، ۲۳٪</SectionTitle>
      <p className="text-md text-[#425856] leading-6 mb-3">
        قسط ماهانه گرد می‌شه به نزدیک‌ترین تومان. این گردکردن‌های کوچیک
        ماه‌به‌ماه جمع می‌شن و جهتشون (به نفع بانک یا مشتری) ثابت نیست.
      </p>
      <h3 className="text-[#425856]">بنابراین میشه گفت:</h3>
      <p className="mb-[5px] text-[#425856]">
        بررسی اثر تجمعی گردکردن در محاسبات اقساط وام
      </p>
      <div>
        <h1 className="text-[#425856]">حالت بدون تعدیل قسط آخر:</h1>
        <pre
          dir="ltr"
          className="text-left border p-2 border-gray-300 whitespace-pre-wrap overflow-x-auto"
        >
          <code>{`for (let m = 1; m <= months; m++) {
  const interest = Math.round(balance * monthlyRate);
  balance -= payment - interest;
  //balance مانده بدهی/ interest سود ماه جاری
}`}</code>
        </pre>
        <h1 className="text-[#425856]">درحالت safe:</h1>
        <pre
          dir="ltr"
          className="text-left border p-2 mb-[10px] border-gray-300 whitespace-pre-wrap overflow-x-auto"
        >
          <code>{`const isLastMonth = m === months;//آیا ماهی که الان داخلش هستیم، ماه آخر است؟
const actualPayment = isLastMonth
  ? balance + interest
  : payment;`}</code>
        </pre>
      </div>
      <div className="text-[#425856]">
        گردکردن فقط یک خطای مستقل در یک مرحله نیست؛ وقتی نتیجه‌ی گردکردن وارد
        محاسبه‌ی مرحله‌ی بعد شود، اثر آن می‌تواند در طول چندین مرحله منتقل شود.
      </div>
      <CompareGrid
        naiveLabel=" amortizeUnsafe : بدون تعدیل قسط آخر"
        naiveValue={`${unsafeBalance.toLocaleString("fa-IR")} تومان باقی می‌مونه`}
        naiveNote=" مانده‌ی نهایی دقیقاً صفر نمی‌شه"
        safeLabel=" amortizeSafe : با تعدیل قسط آخر"
        safeValue={`${safeBalance.toLocaleString("fa-IR")} تومان باقی می‌مونه`}
        safeNote="با تعدیل قسط آخر، مانده در پایان دوره تسویه می‌شود"
      />
    </Card>
  );
};

export default LoanSection;
