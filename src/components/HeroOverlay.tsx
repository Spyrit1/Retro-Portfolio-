import React, { useState } from 'react';
import { ArrowUpRight, Code, Sparkles, Instagram, Mail, Check, Copy } from 'lucide-react';
import { DEVELOPER_BIO } from '../data/portfolioData.ts';

interface HeroOverlayProps {
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  onOpenAbout,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(DEVELOPER_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative z-[2] min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-32 sm:pb-28 px-5 sm:px-8 pointer-events-none select-none"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Top Section: Role & Availability */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[12px] sm:text-[13px] tracking-tight text-black font-medium">
        <div className="flex items-center gap-2">
          <Code size={14} className="text-black/60" />
          <span>ROLE: CREATIVE WEBSITE DEVELOPER</span>
        </div>

        <div className="flex items-center gap-4 text-black/80 pointer-events-auto">
          <a
            href={DEVELOPER_BIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-black transition-colors"
          >
            <Instagram size={13} />
            <span>@{DEVELOPER_BIO.instagram}</span>
          </a>
          <span className="text-black/30">/</span>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : DEVELOPER_BIO.email}</span>
          </button>
        </div>
      </div>

      {/* Center Section: Hero Statement & Typography */}
      <div className="my-auto max-w-5xl py-10 sm:py-14">
        <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-black/70">
          <Sparkles size={13} className="text-black/60" />
          <span>Portfolio of Aditya · 2026</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-normal tracking-tight text-black leading-[1.03] text-balance">
          I build creative, responsive & high-performance websites.
        </h1>

        <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-black/80 font-normal leading-relaxed">
          Crafting bespoke digital interfaces where inventive visual design meets disciplined
          software engineering. Fast, fluid, and flawlessly responsive on every screen from mobile
          to ultra-wide.
        </p>

        {/* Action Row */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 pointer-events-auto">
          <button
            onClick={onOpenContact}
            className="group px-6 py-3.5 text-[13px] tracking-tight bg-black text-white hover:bg-neutral-800 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Hire Me / Start a Project</span>
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>

          <button
            onClick={onOpenAbout}
            className="px-5 py-3.5 text-[13px] tracking-tight border border-black/25 text-black hover:border-black hover:bg-black/5 transition-all cursor-pointer backdrop-blur-xs"
          >
            About Me & Experience
          </button>

          <a
            href={DEVELOPER_BIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 text-[13px] tracking-tight bg-black/5 hover:bg-black/10 text-black border border-black/15 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Instagram size={14} />
            <span>Instagram @{DEVELOPER_BIO.instagram}</span>
          </a>
        </div>
      </div>

      {/* Bottom Section: Direct Contacts */}
      <div className="pt-6 border-t border-black/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-black/80">
        <div className="flex items-center gap-2 font-medium text-black">
          <span>CREATIVE & RESPONSIVE WEB CRAFT</span>
          <span className="text-black/30">·</span>
          <span className="text-black/70 font-normal">AVAILABLE FOR FREELANCE & CONTRACT COMMISSIONS</span>
        </div>

        <div className="flex items-center gap-4 text-black/70 text-[11px] font-mono tracking-tight pointer-events-auto">
          <a
            href={DEVELOPER_BIO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:underline"
          >
            INSTAGRAM: @{DEVELOPER_BIO.instagram}
          </a>
          <span>·</span>
          <a href={`mailto:${DEVELOPER_BIO.email}`} className="hover:text-black hover:underline">
            EMAIL: {DEVELOPER_BIO.email}
          </a>
        </div>
      </div>
    </div>
  );
};
