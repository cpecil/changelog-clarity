import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, CheckCircle, Loader2, Rss, AlertCircle } from "lucide-react";
import { ConnectCard } from "./ConnectCard";
import { toast } from "sonner";
import { cookies } from "@/lib/cookies";

export function SubscribePanel() {
  // Check if already subscribed via cookie
  const savedEmail = cookies.getSubscribed();
  const [email, setEmail] = useState(savedEmail || "");
  const [isSubmitted, setIsSubmitted] = useState(!!savedEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email.trim()) { setError("Enter your email"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Invalid email"); return; }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitted(true);
    setIsLoading(false);
    cookies.setSubscribed(email);
    toast.success("Subscribed!", { description: `Updates → ${email}` });
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6 px-4 sm:px-6 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="md-card-elevated p-5 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-11 h-11 rounded-m3-medium flex items-center justify-center"
            style={{ background: 'hsl(var(--md-sys-color-primary-container))' }}
          >
            <Bell size={20} className="text-md-on-primary-container" />
          </div>
          <div>
            <h2 className="title-large text-md-on-surface">Stay updated</h2>
            <p className="body-small text-md-on-surface-variant">Get notified about new releases</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-m3-medium" style={{ background: 'hsl(var(--status-complete) / 0.1)' }}>
                <CheckCircle size={20} className="text-status-complete shrink-0" />
                <p className="body-medium text-md-on-surface">You're subscribed!</p>
              </div>
              <button onClick={() => { setIsSubmitted(false); setEmail(""); }} className="md-text-button w-full">
                Use different email
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" className="space-y-4" exit={{ opacity: 0 }}>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-md-on-surface-variant pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="you@example.com"
                  className={`md-text-field-outlined w-full ${error ? 'border-md-error' : ''}`}
                  style={{ paddingLeft: '2.75rem', height: '48px' }}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {error && (
                <div className="flex items-center gap-1.5 text-md-error">
                  <AlertCircle size={14} />
                  <p className="body-small">{error}</p>
                </div>
              )}
              <button onClick={handleSubmit} disabled={isLoading || !email} className="md-filled-button w-full">
                {isLoading ? <><Loader2 size={18} className="animate-spin" /> Subscribing…</> : "Subscribe"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 pt-4 border-t border-md-outline-variant">
          <a href="/rss.xml" className="md-outlined-button" target="_blank" rel="noopener noreferrer">
            <Rss size={16} /> RSS Feed
          </a>
        </div>
      </motion.div>

      <ConnectCard />
    </div>
  );
}
