import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { LucideIcon } from "./LucideIcon";

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
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
          <div className="w-14 h-14 rounded-m3-large bg-md-secondary-container flex items-center justify-center">
            <LucideIcon icon={Shield} className="text-md-on-secondary-container" />
          </div>
          <div>
            <h1 className="display-small text-md-on-surface">Privacy Policy</h1>
            <p className="body-medium text-md-on-surface-variant">Last updated: January 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="md-card-filled p-6 md:p-8 space-y-6">
          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Information We Collect</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              We collect information you provide directly to us, such as when you subscribe to our 
              changelog updates. This may include your email address and any other information you 
              choose to provide.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">How We Use Your Information</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 body-large text-md-on-surface-variant">
              <li>Send you changelog updates and notifications</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our services and develop new features</li>
              <li>Monitor and analyze usage trends</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Information Sharing</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              We do not share, sell, or transfer your personal information to third parties except as 
              necessary to provide our services or as required by law. We may share aggregated, 
              non-personally identifiable information publicly.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Data Security</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Your Rights</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              You have the right to access, correct, or delete your personal information. You may also 
              opt out of receiving communications from us at any time by clicking the unsubscribe link 
              in our emails.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Contact Us</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              If you have questions about this Privacy Policy or our practices, please contact us 
              through the Connect section of this application.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
