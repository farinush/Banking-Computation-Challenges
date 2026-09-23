function CompareGrid({
  naiveLabel,
  naiveValue,
  naiveNote,
  safeLabel,
  safeValue,
  safeNote,
}: {
  naiveLabel: string;
  naiveValue: React.ReactNode;
  naiveNote: string;
  safeLabel: string;
  safeValue: React.ReactNode;
  safeNote: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
      <div className="rounded border border-[#F3D9A8] bg-[#db6767] p-3">
        <p className="text-md font-semibold text-[#d8dbc0] mb-1">
          {naiveLabel}
        </p>
        <p className="text-md font-mono">{naiveValue}</p>
        <p className="text-[11px] text-[#bfdab5] mt-1">{naiveNote}</p>
      </div>
      <div className="rounded border border-[#0F766E]/30 bg-[#98f386] p-3">
        <p className="text-md font-semibold text-[#0F766E] mb-1">{safeLabel}</p>
        <p className="text-md font-mono">{safeValue}</p>
        <p className="text-[11px] text-[#0F766E] mt-1">{safeNote}</p>
      </div>
    </div>
  );
}

export default CompareGrid;
