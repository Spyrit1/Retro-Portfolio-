import React, { useState } from 'react';
import { X, Check, Send, Mail, Instagram, Copy } from 'lucide-react';
import { DEVELOPER_BIO } from '../data/portfolioData.ts';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'Custom Creative Website');
  const [timeline, setTimeline] = useState('2 – 4 Weeks');
  const [budget, setBudget] = useState('$5,000 – $15,000');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const projectTypes = [
    'Custom Creative Website',
    'Responsive Portfolio / Landing Page',
    'Interactive 3D / WebGL Experience',
    'Full-Stack Web Application',
    'Performance & Responsive Audit',
  ];

  const budgetTiers = [
    '< $5,000',
    '$5,000 – $15,000',
    '$15,000 – $30,000',
    '$30,000+',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_BIO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!message.trim()) newErrors.message = 'Please provide a brief outline of what you want to build';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const randomId = 'AD-' + Math.floor(100000 + Math.random() * 900000);
    setSubmissionId(randomId);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hire Aditya / Project Inquiry Form"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#f8f8f8] text-black flex flex-col shadow-2xl overflow-hidden border border-black/10">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between">
          <div>
            <h2
              className="text-xl sm:text-2xl tracking-tight text-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Hire Me / Start a Project
            </h2>
            <p className="text-xs text-black/50 font-mono mt-0.5">
              ADITYA · CREATIVE WEBSITE DEVELOPER
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-black/70 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close Contact Form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Direct Reachout Highlight Box */}
          <div className="mb-6 p-4 bg-white border border-black/10">
            <div className="text-[11px] font-mono text-black/40 uppercase mb-2">
              Direct Contact Channels
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Email */}
              <div className="flex items-center justify-between p-2.5 bg-neutral-50 border border-black/5">
                <a
                  href={`mailto:${DEVELOPER_BIO.email}`}
                  className="flex items-center gap-2 text-xs font-medium text-black hover:underline truncate"
                  title="Send email"
                >
                  <Mail size={14} className="text-black/60 shrink-0" />
                  <span className="truncate">{DEVELOPER_BIO.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1 text-black/60 hover:text-black transition-colors cursor-pointer shrink-0 ml-1"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                </button>
              </div>

              {/* Instagram */}
              <a
                href={DEVELOPER_BIO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-neutral-50 border border-black/5 hover:border-black/20 transition-colors"
                title="Open Instagram @betterdesigns_"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-black truncate">
                  <Instagram size={14} className="text-black/60 shrink-0" />
                  <span className="truncate">@{DEVELOPER_BIO.instagram}</span>
                </div>
                <span className="text-[11px] text-black/40 font-mono">DM →</span>
              </a>
            </div>
          </div>

          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-12 h-12 bg-black text-white rounded-none flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <h3
                className="text-2xl font-medium tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Inquiry Sent Successfully
              </h3>
              <p className="text-sm text-black/70 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-black">{name}</span>! I've received
                your project inquiry. I typically reply via{' '}
                <span className="font-medium text-black">{email}</span> within a few hours.
              </p>
              <div className="text-xs font-mono text-black/50 pt-2">
                INQUIRY CODE: {submissionId}
              </div>
              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-black text-white text-xs uppercase tracking-tight hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Type Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-black/60 mb-2 font-mono">
                  Project Classification
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => {
                    const isSelected = projectType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setProjectType(type)}
                        className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white font-medium'
                            : 'border border-black/20 text-black/70 hover:border-black hover:text-black bg-white'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-black/70 mb-1">
                    Your Name <span className="text-black">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Thorne"
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 focus:outline-none focus:border-black"
                  />
                  {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs text-black/70 mb-1">
                    Email Address <span className="text-black">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya@company.com"
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 focus:outline-none focus:border-black"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-black/70 mb-1">Target Timeline</label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="Urgent (< 2 Weeks)">Urgent (&lt; 2 Weeks)</option>
                    <option value="2 – 4 Weeks">2 – 4 Weeks</option>
                    <option value="1 – 2 Months">1 – 2 Months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-black/70 mb-1">Estimated Budget</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-black/20 focus:outline-none focus:border-black cursor-pointer"
                  >
                    {budgetTiers.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-black/70 mb-1">
                  Project Details & Goals <span className="text-black">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about what you're looking to create, any specific interactive features, design inspirations, or technical requirements..."
                  className="w-full px-3 py-2 text-sm bg-white border border-black/20 focus:outline-none focus:border-black resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-black/50 font-mono">
                  DIRECT RESPONSE WITHIN 24 HOURS
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 bg-black text-white text-xs uppercase tracking-tight hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Send Project Inquiry</span>
                  <Send size={13} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
