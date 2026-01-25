import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, CheckCircle, Loader2, Rss, AlertCircle } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { ConnectCard } from "./ConnectCard";
import { toast } from "sonner";

export function SubscribePanel() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");
    
    if (!email.trim()) {
      const errorMsg = "Please enter your email address";
      setError(errorMsg);
      toast.error("Email required", { description: errorMsg });
      return;
    }

    if (!validateEmail(email)) {
      const errorMsg = "Please include an '@' in the email address";
      setError(errorMsg);
      toast.error("Invalid email format", { description: errorMsg });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setError("");
    
    toast.success("Successfully Subscribed!", {
      description: `We'll send updates to ${email}`,
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Subscribe Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="md-card-elevated p-6 md:p-8"
      >
        {/* Header with icon */}
        <div className="flex items-center gap-4 mb-8">
          <div 
            className="w-14 h-14 rounded-m3-large flex items-center justify-center"
            style={{ background: 'hsl(var(--md-sys-color-primary-container))' }}
          >
            <LucideIcon icon={Bell} className="text-md-on-primary-container" />
          </div>
          <div>
            <h2 className="headline-small text-md-on-surface">Stay updated</h2>
            <p className="body-medium text-md-on-surface-variant">
              Get notified about new features and updates
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ ease: [0.2, 0, 0, 1] }}
              className="space-y-6"
            >
              <div 
                className="flex items-center gap-4 p-4 rounded-m3-medium"
                style={{ background: 'hsl(var(--status-complete) / 0.12)' }}
              >
                <LucideIcon icon={CheckCircle} className="text-status-complete" />
                <div>
                  <p className="title-medium text-md-on-surface">You're subscribed!</p>
                  <p className="body-medium text-md-on-surface-variant">
                    We'll send you updates when new features are released.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleReset}
                className="md-text-button w-full"
              >
                Subscribe another email
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="space-y-6"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Email input - M3 Text Field */}
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                    <Mail className="w-5 h-5 text-md-on-surface-variant" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="your.email@example.com"
                    className={`md-text-field-outlined w-full ${error ? 'border-md-error' : ''}`}
                    style={{ paddingLeft: '3rem' }}
                    aria-label="Email address"
                    disabled={isLoading}
                    autoComplete="email"
                    inputMode="email"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                </div>
                
                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2 text-md-error"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="body-small">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !email}
                className="md-filled-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <LucideIcon icon={Bell} size="small" />
                    Subscribe to updates
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RSS Feed option */}
        <div className="mt-8 pt-6 border-t border-md-outline-variant">
          <p className="label-large text-md-on-surface-variant mb-4">
            Other ways to stay updated
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/rss.xml"
              className="md-outlined-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LucideIcon icon={Rss} size="small" />
              RSS Feed
            </a>
          </div>
        </div>
      </motion.div>

      {/* Connect Card */}
      <ConnectCard />
    </div>
  );
}
