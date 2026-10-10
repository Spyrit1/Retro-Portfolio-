import React, { useState } from 'react';
import { X, CheckCircle2, Terminal, Instagram, Mail, Copy, Check } from 'lucide-react';
import { DEVELOPER_BIO } from '../data/portfolioData.ts';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_BIO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About the Developer and Experience"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#f8f8f8] text-black flex flex-col shadow-2xl overflow-hidden border border-black/10">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
          <div>
            <h2
              className="text-xl sm:text-2xl tracking-tight text-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              About Aditya
            </h2>
            <p className="text-xs text-black/50 font-mono mt-0.5">
              CREATIVE WEBSITE DEVELOPER · FRONT-END SPECIALIST
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-black/70 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close About"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Bio statement */}
          <div className="bg-white p-6 border border-black/10">
            <div className="text-[11px] uppercase tracking-wider text-black/40 mb-2 font-mono">
              DEVELOPER PHILOSOPHY
            </div>
            <p className="text-base sm:text-lg text-black font-normal leading-relaxed">
              "{DEVELOPER_BIO.summary}"
            </p>
          </div>

          {/* Direct Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-black/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-black/5 border border-black/10 flex items-center justify-center text-black">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-black/50 uppercase">Direct Email</div>
                  <div className="text-xs sm:text-sm font-medium text-black">{DEVELOPER_BIO.email}</div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 text-xs border border-black/20 hover:border-black hover:bg-black hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy email"
              >
                {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href={DEVELOPER_BIO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white border border-black/10 flex items-center justify-between hover:border-black transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-black/5 border border-black/10 flex items-center justify-center text-black">
                  <Instagram size={16} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-black/50 uppercase">Instagram Portfolio</div>
                  <div className="text-xs sm:text-sm font-medium text-black">@{DEVELOPER_BIO.instagram}</div>
                </div>
              </div>
              <span className="text-xs text-black/50 hover:text-black">Visit →</span>
            </a>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DEVELOPER_BIO.stats.map((stat) => (
              <div key={stat.label} className="p-4 bg-white border border-black/10 text-center">
                <div
                  className="text-2xl sm:text-3xl font-medium text-black tabular-nums tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-black/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Professional Experience */}
          <div>
            <div className="text-xs uppercase tracking-wider text-black/40 mb-4 font-mono">
              TRACK RECORD & EXPERIENCE
            </div>
            <div className="space-y-3">
              {DEVELOPER_BIO.experience.map((exp) => (
                <div key={exp.role} className="p-4 bg-white border border-black/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-sm font-medium text-black">{exp.role}</span>
                    <span className="text-xs text-black/50 font-mono">{exp.period}</span>
                  </div>
                  <div className="text-xs text-black/70 mt-0.5">{exp.context}</div>
                  <p className="text-xs text-black/80 mt-2 leading-relaxed">{exp.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Development Principles */}
          <div className="bg-white p-6 border border-black/10">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-black/40 mb-3 font-mono">
              <Terminal size={14} className="text-black/60" />
              <span>CORE DEVELOPMENT COMMITMENTS</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-black/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-black/60" />
                <span>100% Fluid Responsive Layouts on all breakpoints</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-black/60" />
                <span>Zero Layout Shift (0.00 CLS) & 60fps animations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-black/60" />
                <span>Semantic, accessible, and SEO-optimized markup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-black/60" />
                <span>Clean TypeScript code with zero technical debt</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-xs text-black/50 font-mono">
              STATUS: READY TO COMMENCE NEW PROJECTS
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 bg-black text-white text-xs uppercase tracking-tight hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Hire Me / Send Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
