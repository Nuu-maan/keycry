import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="flex items-center justify-between px-6 py-4 text-sm text-muted-foreground border-t border-border/50 mt-auto">
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">contact</a>
        <a href="#" className="hover:text-foreground transition-colors">support</a>
        <a href="#" className="hover:text-foreground transition-colors">terms</a>
        <a href="#" className="hover:text-foreground transition-colors">privacy</a>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">
          <Github className="w-4 h-4" />
        </a>
        <a href="#" className="hover:text-foreground transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
        <span className="flex items-center gap-1">
          made with <Heart className="w-3 h-3 text-primary fill-primary" />
        </span>
      </div>
    </footer>
  );
}
