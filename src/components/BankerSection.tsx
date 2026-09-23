import Card from "./publicUi/Card";
import SectionTitle from "./publicUi/SectionTitle";

function bankersRound(value: number): number {
  const rounded = Math.round(value);
  const isHalf = Math.abs(value % 1) === 0.5;
  if (!isHalf) return rounded;
  return 2 * Math.round(value / 2);
}
function BankerSection() {
  const samples = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];
  return (
    <Card>
      <SectionTitle>Banker's Rounding در مقابل Math.round</SectionTitle>
      <p className="font-samim ">
        نکته‌ی مهم Banker's Rounding، کاهش bias در تعداد زیاد عملیات گرد کردن
        است. اگر همیشه به بالا گرد کنیم می‌تواند به مرور یک bias به سمت بالا
        ایجاد کند.بنابراین در حالت‌های دقیقاً نصف، انتخاب بین بالا و پایین را بر
        اساس زوج بودن انجام می‌دهد.
      </p>
      <table className="w-full text-xs font-mono my-5 border border-gray-300 p-3">
        <thead>
          <tr className="text-[#6B7C7A] border border-gray-400">
            <th className="text-center font-normal border border-gray-200">
              عدد
            </th>
            <th className="text-center font-normal border border-gray-200">
              {" "}
              Math.round
            </th>
            <th className="text-center font-normal border border-gray-200">
              {" "}
              bankersRound
            </th>
          </tr>
        </thead>
        <tbody>
          {samples.map((s) => (
            <tr key={s}>
              <td className="text-center font-normal border border-gray-200">
                {s}
              </td>
              <td className="text-center font-normal border border-gray-200">
                {Math.round(s)}
              </td>
              <td className="text-center font-normal border border-gray-200">
                {bankersRound(s)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className=" text-[#425856] text-md leading-6">
        <code className="bg-[#F5F7F6] px-1 rounded">Math.round</code> روی هر شش
        نمونه به سمت بالا گرد کرد . یک تورش سیستماتیک همیشگی.{" "}
        <code className="bg-[#F5F7F6] px-1 rounded">bankersRound</code> به
        نزدیک‌ترین عدد زوج گرد می‌کنه، پس روی این نمونه‌ها نتیجه‌اش یکی در میون
        بالا و پایینه (۰، ۲، ۲، ۴، ۴، ۶) , نه همیشه یک‌طرفه.
      </p>
      <div>
        <pre
          dir="ltr"
          className="text-left border p-2 mb-[10px] border-gray-300 whitespace-pre-wrap overflow-x-auto"
        >
          <code>{`const isHalf = Math.abs(value % 1) === 0.5;
if (!isHalf) return rounded;
return 2 * Math.round(value / 2);`}</code>
        </pre>
      </div>
      <p className="font-samim text-s text-[#425856]">
        گرد کردن فقط یک Math.round() ساده نیست و نوع استراتژی rounding می‌تواند
        روی محاسبات مالی بزرگ اثر بگذارد.
      </p>
    </Card>
  );
}
export default BankerSection;
