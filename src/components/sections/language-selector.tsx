import { Globe } from "lucide-react";

const LanguageSelector = () => {
  return (
    <div id="testModesNotice" className="flex w-full items-center justify-center pb-4">
      <button
        className="group flex items-center justify-center gap-1.5 rounded px-3 py-2 text-[13px] font-medium leading-tight text-[#888888] transition-all duration-150 ease-out hover:text-[#d0d0d0] active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ffc800]"
        type="button"
        aria-label="Change language (current: english)"
      >
        <Globe className="h-3.5 w-3.5 stroke-[2.5px]" />
        <span>english</span>
      </button>
    </div>
  );
};

export default LanguageSelector;