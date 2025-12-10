import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Heart, 
  Code, 
  MessageCircle, 
  Twitter, 
  FileText, 
  Shield, 
  Lock 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full pb-8 pt-12 text-muted">
      <div className="content-grid flex flex-col items-center gap-8">
        
        {/* Key Command Hints */}
        <div className="flex flex-col items-center gap-2 text-xs font-medium opacity-80">
          <div className="flex items-center gap-1.5">
            <KeyButton>tab</KeyButton>
            <span>+</span>
            <KeyButton>enter</KeyButton>
            <span className="ml-1">- restart test</span>
          </div>
          <div className="flex items-center gap-1.5">
            <KeyButton>esc</KeyButton>
            <span>or</span>
            <KeyButton>ctrl</KeyButton>
            <span>+</span>
            <KeyButton>shift</KeyButton>
            <span>+</span>
            <KeyButton>p</KeyButton>
            <span className="ml-1">- command line</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] md:text-xs">
          <FooterLink href="/contact" icon={<Mail size={14} />} label="contact" />
          <FooterLink href="/donate" icon={<Heart size={14} />} label="support" />
          <FooterLink href="#" icon={<Code size={14} />} label="github" />
          <FooterLink href="#" icon={<MessageCircle size={14} />} label="discord" />
          <FooterLink href="#" icon={<Twitter size={14} />} label="twitter" />
          <FooterLink href="/terms" icon={<FileText size={14} />} label="terms" />
          <FooterLink href="/security" icon={<Shield size={14} />} label="security" />
          <FooterLink href="/privacy" icon={<Lock size={14} />} label="privacy" />
        </div>
      </div>
    </footer>
  );
};

// Reusable Key Component
const KeyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-card text-foreground px-2 py-0.5 rounded-[2px] leading-relaxed min-w-[20px] text-center">
      {children}
    </div>
  );
};

// Reusable Footer Link Component
interface FooterLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}

const FooterLink = ({ href, icon, label, external }: FooterLinkProps) => {
  const content = (
    <>
      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
        {icon}
      </span>
      <span>{label}</span>
    </>
  );

  const className = "group flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-150 ease-in-out cursor-pointer";

  if (external) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
};

export default Footer;