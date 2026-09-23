import { useState } from "react";
import LoanSection from "./components/LoanSection";
import FloatSection from "./components/FloatSection";
import BankerSection from "./components/BankerSection";
import TomanSection from "./components/TomanSection";
import LuhnSection from "./components/LuhnSection";
import IbanSection from "./components/IbanSection";

const TABS = [
  { id: "loan", label: "گردکردن اقساط" },
  { id: "iban", label: "شماره شبا" },
  { id: "luhn", label: "شماره کارت" },
  { id: "float", label: "دقت اعشاری" },
  { id: "banker", label: "Banker's Rounding" },
  { id: "toman", label: "ریال / تومان" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>("float");

  return (
    <div
      dir="rtl"
      className="min-h-screen font-yekan bg-red-100/50 text-[#0F1E1C] p-6"
    >
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <p className="text-2xl text-center tracking-wide mb-[15px] mt-[30px] p-5 bg-rose-500/30 border border-dotted  text-[#0F766E] font-semibold ">
            چالش‌های محاسباتی در سیستم‌های بانکی
          </p>
          <p className="text-sm font-samim text-[#425856] leading-6">
            دلم می‌خواست بدونم یک سایت بانکی، پشت صحنه با چه چالش‌های
            محاسباتی‌ای روبه رو میشه. این‌ها همون چیزهاییه که پیدا و
            پیاده‌سازی کردم . هرکدوم با نسخه‌ی ساده و ناقص و هم با نسخه‌ی درست
            و کامل.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-[10px] text-md font-samim border transition-colors ${
                activeTab === tab.id
                  ? "bg-[#760f60] text-white border-[#0F766E]"
                  : "bg-white text-[#0F1E1C] border-[#D8E2E0] hover:border-[#0F766E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "loan" && <LoanSection />}
        {activeTab === "iban" && <IbanSection />}
        {activeTab === "luhn" && <LuhnSection />}
        {activeTab === "float" && <FloatSection />}
        {activeTab === "banker" && <BankerSection />}
        {activeTab === "toman" && <TomanSection />}
      </div>
    </div>
  );
};

export default App;
