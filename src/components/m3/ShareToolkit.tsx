import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Link2, QrCode, Mail, Twitter, Facebook, Linkedin,
  MessageCircle, Copy, Check, Download, Share2, ChevronLeft, ExternalLink
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface ShareToolkitProps {
  isOpen: boolean;
  onClose: () => void;
}

const shareUrl = typeof window !== "undefined" ? window.location.href : "";
const shareTitle = "Changelog — Latest Updates";

export function ShareToolkit({ isOpen, onClose }: ShareToolkitProps) {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"main" | "qr">("main");

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { id: "twitter", label: "X", icon: Twitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}` },
    { id: "facebook", label: "Facebook", icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, url: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}` },
    { id: "email", label: "Email", icon: Mail, url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}` },
  ];

  const downloadQR = () => {
    const svg = document.getElementById("share-qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 512, 512);
      const a = document.createElement("a");
      a.download = "changelog-qr.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareTitle, url: shareUrl }); } catch {}
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Scrim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70]"
        style={{ background: "hsl(var(--md-sys-color-scrim) / 0.32)" }}
        onClick={onClose}
      />

      {/* Bottom sheet on mobile, centered dialog on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.3, ease: [0.05, 0.7, 0.1, 1] }}
        className="fixed z-[70] inset-x-0 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-[400px]"
      >
        <div
          className="overflow-hidden"
          style={{
            background: "hsl(var(--md-sys-color-surface-container-low))",
            borderRadius: "28px 28px 0 0",
            boxShadow: "var(--md-sys-elevation-level3)",
          }}
          // Desktop: fully rounded
          {...(typeof window !== "undefined" && window.innerWidth >= 640 ? { style: { background: "hsl(var(--md-sys-color-surface-container-low))", borderRadius: "28px", boxShadow: "var(--md-sys-elevation-level3)" } } : {})}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-8 h-1 rounded-full" style={{ background: "hsl(var(--md-sys-color-outline-variant))" }} />
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4">
            {activeView === "qr" && (
              <button onClick={() => setActiveView("main")} className="md-icon-button w-10 h-10 -ml-2">
                <ChevronLeft size={20} className="text-md-on-surface" />
              </button>
            )}
            <h2 className="title-large text-md-on-surface flex-1">
              {activeView === "main" ? "Share" : "QR Code"}
            </h2>
            <button onClick={onClose} className="md-icon-button w-10 h-10 -mr-2">
              <X size={20} className="text-md-on-surface-variant" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeView === "main" ? (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 pb-6 space-y-3"
              >
                {/* Copy link row - inspired by reference site's list items */}
                <button
                  onClick={copyLink}
                  className="w-full flex items-center gap-4 p-4 rounded-[16px] transition-colors active:scale-[0.98]"
                  style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--md-sys-color-primary-container))" }}
                  >
                    {copied ? <Check size={18} className="text-md-on-primary-container" /> : <Link2 size={18} className="text-md-on-primary-container" />}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="label-large text-md-on-surface">{copied ? "Copied!" : "Copy link"}</p>
                    <p className="body-small text-md-on-surface-variant truncate">{shareUrl}</p>
                  </div>
                  <Copy size={16} className="text-md-on-surface-variant shrink-0" />
                </button>

                {/* QR Code row */}
                <button
                  onClick={() => setActiveView("qr")}
                  className="w-full flex items-center gap-4 p-4 rounded-[16px] transition-colors active:scale-[0.98]"
                  style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--md-sys-color-tertiary-container))" }}
                  >
                    <QrCode size={18} className="text-md-on-tertiary-container" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="label-large text-md-on-surface">QR Code</p>
                    <p className="body-small text-md-on-surface-variant">Scan to open</p>
                  </div>
                  <ExternalLink size={16} className="text-md-on-surface-variant shrink-0" />
                </button>

                {/* Native share */}
                {"share" in navigator && (
                  <button
                    onClick={nativeShare}
                    className="w-full flex items-center gap-4 p-4 rounded-[16px] transition-colors active:scale-[0.98]"
                    style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}
                    >
                      <Share2 size={18} className="text-md-on-secondary-container" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="label-large text-md-on-surface">More options</p>
                      <p className="body-small text-md-on-surface-variant">System share sheet</p>
                    </div>
                  </button>
                )}

                {/* Social row */}
                <div className="pt-2">
                  <p className="label-medium text-md-on-surface-variant mb-3 px-1">Share via</p>
                  <div className="flex justify-between">
                    {socialLinks.map((s) => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 p-2 rounded-[12px] transition-colors hover:bg-[hsl(var(--md-sys-color-surface-variant)/0.5)] active:scale-95"
                      >
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center"
                          style={{ background: "hsl(var(--md-sys-color-surface-container-high))" }}
                        >
                          <s.icon size={18} className="text-md-on-surface-variant" />
                        </div>
                        <span className="label-small text-md-on-surface-variant">{s.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="qr"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-6 pb-6 flex flex-col items-center gap-5"
              >
                <div
                  className="p-8 rounded-[28px]"
                  style={{ background: "hsl(var(--md-sys-color-surface-container-lowest))" }}
                >
                  <QRCodeSVG
                    id="share-qr-code"
                    value={shareUrl}
                    size={180}
                    bgColor="transparent"
                    fgColor="hsl(var(--md-sys-color-on-surface))"
                    level="M"
                  />
                </div>
                <p className="body-medium text-md-on-surface-variant text-center max-w-[260px]">
                  Scan this code with your camera to open the changelog
                </p>
                <button onClick={downloadQR} className="md-tonal-button">
                  <Download size={16} /> Save as PNG
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
