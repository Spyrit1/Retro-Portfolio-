import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Mail } from 'lucide-react';
import { DEVELOPER_BIO } from '../data/portfolioData.ts';

interface NavbarProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAbout,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTimeStr(localTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center select-none"
        style={{
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Logo (left) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-[21px] sm:text-[26px] tracking-tight text-black transition-opacity hover:opacity-80 cursor-pointer text-left"
            style={{
              fontFamily: 'var(--font-heading)',
            }}
          >
            Aditya®
          </button>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-normal text-black font-normal">
          <button
            onClick={onOpenAbout}
            className="hover:underline underline-offset-4 transition-all cursor-pointer whitespace-nowrap"
          >
            About Me
          </button>
          <button
            onClick={onOpenContact}
            className="hover:underline underline-offset-4 transition-all cursor-pointer whitespace-nowrap"
          >
            Hire Me
          </button>
          <a
            href={DEVELOPER_BIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            title="Instagram @betterdesigns_"
          >
            <Instagram size={14} />
            <span>@betterdesigns_</span>
          </a>
          <a
            href={`mailto:${DEVELOPER_BIO.email}`}
            className="flex items-center gap-1.5 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            title={`Email ${DEVELOPER_BIO.email}`}
          >
            <Mail size={14} />
            <span>{DEVELOPER_BIO.email}</span>
          </a>
        </nav>

        {/* Right Zone: Status & Primary Action */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden lg:flex items-center gap-2 text-[12px] text-black/75 tracking-tight tabular-nums">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            <span>Available · {timeStr}</span>
          </div>

          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[12px] tracking-tight uppercase text-white bg-black hover:bg-neutral-800 transition-colors cursor-pointer rounded-none"
          >
            Hire Me
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black hover:opacity-70 transition-opacity"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col justify-between px-6 py-8 md:hidden"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <div className="flex justify-between items-center">
            <span
              className="text-[21px] tracking-tight text-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Aditya®
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-black"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-2xl tracking-tight text-black font-medium my-auto">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left py-3 border-b border-black/10 flex justify-between items-center"
            >
              <span>About Developer</span>
              <span className="text-sm text-black/40 font-mono">Bio & Experience</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-3 border-b border-black/10 flex justify-between items-center"
            >
              <span>Hire / Start a Project</span>
              <span className="text-sm text-black/40 font-mono">Inquiry</span>
            </button>
          </nav>

          {/* Mobile contact info */}
          <div className="pt-6 border-t border-black/10 text-xs text-black/70 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <a
                href={DEVELOPER_BIO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-black hover:underline"
              >
                <Instagram size={14} />
                <span>@betterdesigns_</span>
              </a>
              <a
                href={`mailto:${DEVELOPER_BIO.email}`}
                className="flex items-center gap-1.5 text-black hover:underline"
              >
                <Mail size={14} />
                <span>{DEVELOPER_BIO.email}</span>
              </a>
            </div>
            <div className="flex justify-between items-center text-black/40 pt-1">
              <span>Creative Web Developer</span>
              <span className="tabular-nums font-mono">{timeStr}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
