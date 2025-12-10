"use client";

import { Keyboard, Crown, Info, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border/50">
      <div className="flex items-center gap-3">
        <Keyboard className="w-8 h-8 text-primary" />
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-primary">key</span>
          <span className="text-foreground">cry</span>
        </span>
      </div>
      
      <nav className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Crown className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Info className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </nav>
    </header>
  );
}
