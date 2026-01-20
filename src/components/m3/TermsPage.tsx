import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { LucideIcon } from "./LucideIcon";

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
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
          <div className="w-14 h-14 rounded-m3-large bg-md-primary-container flex items-center justify-center">
            <LucideIcon icon={FileText} className="text-md-on-primary-container" />
          </div>
          <div>
            <h1 className="display-small text-md-on-surface">Terms of Service</h1>
            <p className="body-medium text-md-on-surface-variant">Last updated: January 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="md-card-filled p-6 md:p-8 space-y-6">
          <section>
            <h2 className="headline-small text-md-on-surface mb-3">1. Acceptance of Terms</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              By accessing and using this service, you accept and agree to be bound by the terms and 
              provisions of this agreement. If you do not agree to abide by these terms, please do not 
              use this service.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">2. Use License</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              Permission is granted to temporarily access the materials (information or software) on 
              our service for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">3. Disclaimer</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              The materials on our service are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a 
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">4. Limitations</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              In no event shall we or our suppliers be liable for any damages (including, without 
              limitation, damages for loss of data or profit, or due to business interruption) arising 
              out of the use or inability to use the materials on our service.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">5. Revisions</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              We may revise these terms of service at any time without notice. By using this service 
              you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">6. Contact Information</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              If you have any questions about these Terms, please contact us through the channels 
              provided in the Connect section of this application.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
