import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="text-8xl font-bold text-[#ffc800] mb-4">404</div>

        <h1 className="text-2xl font-semibold text-[#d0d0d0] mb-3">Page not found</h1>

        <p className="text-[#888888] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#ffc800] text-[#1e1e1e] font-semibold rounded-lg hover:bg-[#e6b400] transition-colors"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link
            href="/leaderboards"
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2d2d2d] text-[#d0d0d0] font-semibold rounded-lg hover:bg-[#3d3d3d] transition-colors"
          >
            <Search size={16} />
            Leaderboards
          </Link>
        </div>
      </div>
    </div>
  );
}
