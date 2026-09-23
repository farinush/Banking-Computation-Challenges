import React from "react";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[#E1E8E6] p-5 mb-4">
      {children}
    </div>
  );
}
export default Card;
