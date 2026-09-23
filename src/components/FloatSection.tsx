import Card from "./publicUi/Card";
import CompareGrid from "./publicUi/CompareGrid";
import SectionTitle from "./publicUi/SectionTitle";

function splitNaive(totalToman: number, people: number): number[] {
  const share = totalToman / people;
  return Array.from({ length: people }, () => share);
}
function splitSafe(totalToman: number, people: number): number[] {
  const totalRial = Math.round(totalToman * 10);
  const baseShare = Math.floor(totalRial / people);
  const remainder = totalRial - baseShare * people;
  return Array.from(
    { length: people },
    (_, i) => (i < remainder ? baseShare + 1 : baseShare) / 10,
  );
}
const FloatSection = () => {
  const total = 1000;
  const people = 7;
  const naive = splitNaive(total, people);
  const safe = splitSafe(total, people);
  const naiveSum = naive.reduce((a, b) => a + b, 0);
  console.log(naiveSum === 1000); // false! (با اینکه باید true باشه)
  const safeSum = safe.reduce((a, b) => a + b, 0);
  console.log(safeSum === 1000); // true

  return (
    <>
      <Card>
        <SectionTitle>مشکل از اینجا شروع می‌شه :</SectionTitle>

        <div
          className=" text-[#0F1E1C] rounded p-3 font-mono text-xs "
          dir="ltr"
        >
          <div>{"> 0.1 + 0.2"}</div>
          <div className="text-[#F59E0B]">{String(0.1 + 0.2)}</div>
          <div className="mt-1">{"> 0.1 + 0.2 === 0.3"}</div>
          <div className="text-[#F59E0B]">{String(0.1 + 0.2 === 0.3)}</div>
        </div>
        <p className="text-s font-samim text-[#425856] leading-6 mt-3">
          جاوااسکریپت اعداد اعشاری رو با استاندارد IEEE 754 ذخیره می‌کنه که
          نمی‌تونه خیلی از کسرهای ساده‌ی مبنای ده (مثل ۰.۱) رو دقیق توی باینری
          نشون بده , دقیقاً مثل اینکه بخوای ۱/۳ رو توی مبنای ده کامل بنویسی. این
          خطای گردکردن کوچیک، وقتی چندتاش جمع بشه، خودش رو نشون می‌ده.
        </p>
        <h4 className="mt-[10px] text-[#425856]">
          بنابراین این روش کمک کننده هست :
        </h4>
        <h1 className=" text-[#425856]">
          روش Integer Arithmetic + Remainder Distribution
        </h1>
        <p className=" text-[#425856]">
          به جای اینکه مبلغ رو به صورت اعشاری تقسیم کنیم، آن را به کوچک‌ترین
          واحد صحیح تبدیل می‌کنیم و بعد باقی‌مانده را بین افراد توزیع می‌کنیم.
        </p>
        <pre
          dir="ltr"
          className="text-left border p-2 mb-[10px] border-gray-300 whitespace-pre-wrap overflow-x-auto"
        >
          <code>{`function splitSafe(totalToman: number, people: number): number[] {
  const totalRial = Math.round(totalToman * 10);
  const baseShare = Math.floor(totalRial / people);
  const remainder = totalRial - baseShare * people;
  return Array.from(
    { length: people },
    (_, i) => (i < remainder ? baseShare + 1 : baseShare) / 10,
  );
}`}</code>
        </pre>
      </Card>
      <Card>
        <SectionTitle>مثال واقعی: تقسیم ۱۰۰۰ تومان بین ۷ نفر</SectionTitle>
        <CompareGrid
          naiveLabel=" SplitNaive (تقسیم مستقیم float)"
          naiveValue={`مجموع: ${String(naiveSum)}`}
          naiveNote={
            naiveSum === total
              ? "برابره"
              : " دقیقاً برابر ۱۰۰۰ نیست، چک === اینجا fail می‌شه"
          }
          safeLabel=" SplitSafe (محاسبه روی عدد صحیح (ریال))"
          safeValue={`مجموع: ${safeSum.toLocaleString("fa-IR")}`}
          safeNote=" دقیقاً برابر ۱۰۰۰، چون همه‌ی محاسبات روی عدد صحیح انجام شده"
        />
      </Card>
    </>
  );
};

export default FloatSection;
