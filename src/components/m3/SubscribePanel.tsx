import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, CheckCircle, Loader2, Rss } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { ConnectCard } from "./ConnectCard";
import { toast } from "sonner";

export function SubscribePanel() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast.error("Invalid Email", {
        description: "Please enter a valid email address",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    toast.success("Successfully Subscribed!", {
      description: `We'll send updates to ${email}`,
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {/* Subscribe Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md-card-elevated p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-m3-medium bg-md-primary-container flex items-center justify-center">
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
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-4 rounded-m3-medium bg-status-complete/10">
                <LucideIcon icon={CheckCircle} className="text-status-complete" />
                <div>
                  <p className="title-medium text-md-on-surface">You're subscribed!</p>
                  <p className="body-medium text-md-on-surface-variant">
                    We'll send you updates when new features are released.
                  </p>
                </div>
              </div>
              
              {/* Reset button */}
              <button
                onClick={handleReset}
                className="md-text-button w-full"
              >
                Subscribe another email
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
                  <Mail className="w-5 h-5 text-md-on-surface-variant" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="md-text-field-outlined w-full pl-12"
                  aria-label="Email address"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
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
                    <LucideIcon icon={Bell} />
                    Subscribe to updates
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* RSS Feed option */}
        <div className="mt-6 pt-6 border-t border-md-outline-variant">
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
              <LucideIcon icon={Rss} />
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