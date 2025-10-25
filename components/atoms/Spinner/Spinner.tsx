import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div role="status" aria-live="polite" className="flex items-end gap-2">
        <span className="sr-only">در حال بارگذاری…</span>

        <span className="block w-2 h-5 md:h-9 rounded-full bg-gradient-to-t from-indigo-500 to-indigo-500 animate-bounce [animation-delay:0s] [animation-duration:700ms]"></span>

        <span className="block w-2 h-7 md:h-9 rounded-full bg-gradient-to-t from-cyan-400 to-indigo-500 animate-bounce [animation-delay:120ms] [animation-duration:700ms]"></span>

        <span className="block w-2 h-6 md:h-10 rounded-full bg-gradient-to-t from-pink-400 to-indigo-500 animate-bounce [animation-delay:240ms] [animation-duration:700ms]"></span>
      </div>
    </div>
  );
};

export default Spinner;
