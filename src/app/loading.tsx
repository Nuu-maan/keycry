import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-[#ffc800] animate-spin" />
        <p className="text-[#646669] text-sm">Loading...</p>
      </div>
    </div>
  );
}
