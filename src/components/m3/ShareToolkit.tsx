import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Link2, QrCode, Mail, Twitter, Facebook, Linkedin,
  MessageCircle, Copy, Check, Download, Share2
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
    {
      id: "twitter",
      label: "X / Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
    },
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
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } catch {}
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-md-scrim/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed z-50 inset-x-4 bottom-4 sm:inset-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm md-card-filled rounded-m3-extra-large overflow-hidden"
            style={{ background: "hsl(var(--md-sys-color-surface-container-low))" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-2">
              <h2 className="title-large text-md-on-surface">Share</h2>
              <button onClick={onClose} className="md-icon-button">
                <X size={20} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeView === "main" ? (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="px-4 pb-4 space-y-4"
                >
                  {/* Copy link */}
                  <button
                    onClick={copyLink}
                    className="w-full flex items-center gap-3 p-3 rounded-m3-large transition-colors"
                    style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                  >
                    <div
                      className="w-10 h-10 rounded-m3-full flex items-center justify-center shrink-0"
                      style={{ background: "hsl(var(--md-sys-color-primary-container))" }}
                    >
                      {copied ? (
                        <Check size={18} className="text-md-on-primary-container" />
                      ) : (
                        <Link2 size={18} className="text-md-on-primary-container" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="label-large text-md-on-surface">
                        {copied ? "Copied!" : "Copy link"}
                      </p>
                      <p className="body-small text-md-on-surface-variant truncate max-w-[200px]">
                        {shareUrl}
                      </p>
                    </div>
                    <Copy size={16} className="text-md-on-surface-variant shrink-0" />
                  </button>

                  {/* QR Code button */}
                  <button
                    onClick={() => setActiveView("qr")}
                    className="w-full flex items-center gap-3 p-3 rounded-m3-large transition-colors"
                    style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                  >
                    <div
                      className="w-10 h-10 rounded-m3-full flex items-center justify-center shrink-0"
                      style={{ background: "hsl(var(--md-sys-color-tertiary-container))" }}
                    >
                      <QrCode size={18} className="text-md-on-tertiary-container" />
                    </div>
                    <p className="label-large text-md-on-surface flex-1 text-left">QR Code</p>
                  </button>

                  {/* Native share (mobile) */}
                  {"share" in navigator && (
                    <button
                      onClick={nativeShare}
                      className="w-full flex items-center gap-3 p-3 rounded-m3-large transition-colors"
                      style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                    >
                      <div
                        className="w-10 h-10 rounded-m3-full flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}
                      >
                        <Share2 size={18} className="text-md-on-secondary-container" />
                      </div>
                      <p className="label-large text-md-on-surface flex-1 text-left">More options…</p>
                    </button>
                  )}

                  {/* Social grid */}
                  <div>
                    <p className="label-medium text-md-on-surface-variant mb-2">Social</p>
                    <div className="flex gap-2 flex-wrap">
                      {socialLinks.map((s) => (
                        <a
                          key={s.id}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1 p-2 rounded-m3-large min-w-[56px] transition-colors hover:bg-md-surface-variant"
                        >
                          <div
                            className="w-10 h-10 rounded-m3-full flex items-center justify-center"
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
                  exit={{ opacity: 0, x: 20 }}
                  className="px-4 pb-4 space-y-4"
                >
                  <button
                    onClick={() => setActiveView("main")}
                    className="md-text-button"
                  >
                    ← Back
                  </button>

                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="p-6 rounded-m3-extra-large"
                      style={{ background: "hsl(var(--md-sys-color-surface-container-lowest))" }}
                    >
                      <QRCodeSVG
                        id="share-qr-code"
                        value={shareUrl}
                        size={200}
                        bgColor="transparent"
                        fgColor="hsl(var(--md-sys-color-on-surface))"
                        level="M"
                      />
                    </div>
                    <p className="body-small text-md-on-surface-variant text-center max-w-[240px]">
                      Scan this QR code to open the changelog
                    </p>
                    <button onClick={downloadQR} className="md-tonal-button">
                      <Download size={16} /> Download PNG
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
