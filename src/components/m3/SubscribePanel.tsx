import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaterialIcon } from "./MaterialIcon";

export function SubscribePanel() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md-card-elevated p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-m3-medium bg-md-primary-container flex items-center justify-center">
            <MaterialIcon name="notifications_active" className="text-md-on-primary-container" />
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
              className="flex items-center gap-3 p-4 rounded-m3-medium bg-status-complete/10"
            >
              <MaterialIcon name="check_circle" className="text-status-complete" />
              <div>
                <p className="title-medium text-md-on-surface">You're subscribed!</p>
                <p className="body-medium text-md-on-surface-variant">
                  We'll send you updates when new features are released.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-4"
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="relative">
                <MaterialIcon 
                  name="mail" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-md-on-surface-variant" 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="md-text-field-outlined w-full pl-14"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="md-filled-button w-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <MaterialIcon name="progress_activity" />
                    </motion.div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <MaterialIcon name="notifications" />
                    Subscribe to updates
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Alternative options */}
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
              <MaterialIcon name="rss_feed" />
              RSS Feed
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
