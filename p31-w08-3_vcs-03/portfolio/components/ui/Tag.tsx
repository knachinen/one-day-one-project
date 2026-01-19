import React from "react";

export const Tag = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-sm font-medium text-slate-500">
      {children}
    </span>
  );
};
