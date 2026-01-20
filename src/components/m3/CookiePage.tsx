import { motion } from "framer-motion";
import { ArrowLeft, Cookie } from "lucide-react";
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
        {/* Back button */}
        <button
          onClick={onBack}
          className="md-text-button flex items-center gap-2"
        >
          <LucideIcon icon={ArrowLeft} size="small" />
          Back to Legal
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-m3-large bg-md-tertiary-container flex items-center justify-center">
            <LucideIcon icon={Cookie} className="text-md-on-tertiary-container" />
          </div>
          <div>
            <h1 className="display-small text-md-on-surface">Cookie Policy</h1>
            <p className="body-medium text-md-on-surface-variant">Last updated: January 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="md-card-filled p-6 md:p-8 space-y-6">
          <section>
            <h2 className="headline-small text-md-on-surface mb-3">What Are Cookies</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              Cookies are small text files that are placed on your device when you visit a website. 
              They are widely used to make websites work more efficiently and to provide information 
              to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">How We Use Cookies</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed mb-3">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 body-large text-md-on-surface-variant">
              <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-m3-medium bg-md-surface-variant/50">
                <h3 className="title-medium text-md-on-surface mb-2">Session Cookies</h3>
                <p className="body-medium text-md-on-surface-variant">
                  Temporary cookies that are deleted when you close your browser.
                </p>
              </div>
              <div className="p-4 rounded-m3-medium bg-md-surface-variant/50">
                <h3 className="title-medium text-md-on-surface mb-2">Persistent Cookies</h3>
                <p className="body-medium text-md-on-surface-variant">
                  Cookies that remain on your device for a set period or until you delete them.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Managing Cookies</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              Most web browsers allow you to control cookies through their settings. You can usually 
              find these settings in the "Options" or "Preferences" menu of your browser. Please note 
              that disabling cookies may affect the functionality of this site.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Updates to This Policy</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              We may update this Cookie Policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
