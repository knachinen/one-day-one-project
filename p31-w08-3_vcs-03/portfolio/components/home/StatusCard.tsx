import React from "react";

export const StatusCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 max-w-xs">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <div>
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          Current Status
        </div>
        <div className="text-base font-medium text-slate-900">
          Open to work
        </div>
      </div>
    </div>
  );
};
