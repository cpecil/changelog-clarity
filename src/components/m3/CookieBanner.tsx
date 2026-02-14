import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings } from "lucide-react";
import { cookies } from "@/lib/cookies";

interface CookieBannerProps {
  onManage: () => void;
}

export function CookieBanner({ onManage }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner if no consent cookie exists (new session or cleared)
    const consent = cookies.getConsent();
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    cookies.setConsent(true);
    setVisible(false);
  };

  const decline = () => {
    cookies.setConsent(false);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[60]"
        >
          <div
            className="p-5 relative"
            style={{
              background: 'hsl(var(--md-sys-color-surface-container-high))',
              borderRadius: 'var(--md-sys-shape-corner-extra-large)',
              boxShadow: 'var(--md-sys-elevation-level3)',
              border: '1px solid hsl(var(--md-sys-color-outline-variant) / 0.5)',
            }}
          >
            {/* Close button */}
            <button
              onClick={decline}
              className="absolute top-3 right-3 md-icon-button w-8 h-8"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Content */}
            <div className="flex gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-m3-medium flex items-center justify-center shrink-0"
                style={{ background: 'hsl(var(--md-sys-color-tertiary-container))' }}
              >
                <Cookie size={18} className="text-md-on-tertiary-container" />
              </div>
              <div className="min-w-0">
                <h3 className="title-small text-md-on-surface mb-1">We use cookies</h3>
                <p className="body-small text-md-on-surface-variant">
                  We use cookies to remember your preferences, improve your experience, and analyze site usage.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={accept} className="md-filled-button flex-1">
                Accept All
              </button>
              <button onClick={decline} className="md-outlined-button flex-1">
                Decline
              </button>
              <button
                onClick={() => { setVisible(false); onManage(); }}
                className="md-icon-button-outlined w-10 h-10 shrink-0"
                aria-label="Manage cookies"
              >
                <Settings size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
