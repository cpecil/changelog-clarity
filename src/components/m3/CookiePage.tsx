import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Settings } from "lucide-react";
import { LucideIcon } from "./LucideIcon";

interface CookiePageProps {
  onBack: () => void;
}

export function CookiePage({ onBack }: CookiePageProps) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <button onClick={onBack} className="md-text-button flex items-center gap-2">
          <LucideIcon icon={ArrowLeft} size="small" />
          Back to Legal
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-m3-large bg-md-tertiary-container flex items-center justify-center">
            <LucideIcon icon={Cookie} className="text-md-on-tertiary-container" />
          </div>
          <div>
            <h1 className="display-small text-md-on-surface">Cookie Policy</h1>
            <p className="body-medium text-md-on-surface-variant">Last updated: January 2026</p>
          </div>
        </div>

        <div className="md-card-filled p-6 md:p-8 space-y-6">
          <section>
            <h2 className="headline-small text-md-on-surface mb-3">What Are Cookies</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              Cookies are small text files placed on your device when you visit a website. They help sites work 
              efficiently and provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">How We Use Cookies</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed mb-3">
              We use <strong className="text-md-on-surface">20 cookies</strong> across 4 categories:
            </p>
            <ul className="list-disc list-inside space-y-2 body-large text-md-on-surface-variant">
              <li><strong>Essential (2):</strong> Cookie consent, session ID</li>
              <li><strong>Preferences (8):</strong> Theme, language, font size, view mode, sort order, sidebar state, active tab, preferences hash</li>
              <li><strong>Functional (7):</strong> Filters, expanded entries, last read, subscriptions, notifications, search history</li>
              <li><strong>Analytics (2):</strong> Visit count, last visit timestamp</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Types of Cookies</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-m3-medium bg-md-surface-variant/50">
                <h3 className="title-medium text-md-on-surface mb-2">Session Cookies</h3>
                <p className="body-medium text-md-on-surface-variant">
                  Temporary cookies deleted when you close your browser (e.g., session ID ~30min expiry).
                </p>
              </div>
              <div className="p-4 rounded-m3-medium bg-md-surface-variant/50">
                <h3 className="title-medium text-md-on-surface mb-2">Persistent Cookies</h3>
                <p className="body-medium text-md-on-surface-variant">
                  Cookies that remain for a set period — from 1 day (scroll position) to 1 year (theme preference).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Managing Cookies</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed mb-4">
              You can manage your cookie preferences at any time using our Cookie Management tool, 
              or through your browser's settings. Disabling certain cookies may affect site functionality.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Updates to This Policy</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              We may update this Cookie Policy from time to time. Changes will be posted on this page 
              with an updated "Last updated" date.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
