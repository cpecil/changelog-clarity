import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";
import { LucideIcon } from "./LucideIcon";

interface LicensePageProps {
  onBack: () => void;
}

export function LicensePage({ onBack }: LicensePageProps) {
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
          <div className="w-14 h-14 rounded-m3-large bg-md-error-container flex items-center justify-center">
            <LucideIcon icon={Scale} className="text-md-on-error-container" />
          </div>
          <div>
            <h1 className="display-small text-md-on-surface">License Agreement</h1>
            <p className="body-medium text-md-on-surface-variant">Last updated: January 2026</p>
          </div>
        </div>

        {/* Content */}
        <div className="md-card-filled p-6 md:p-8 space-y-6">
          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Grant of License</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              Subject to the terms of this Agreement, we grant you a limited, non-exclusive, 
              non-transferable, revocable license to access and use our service for your personal 
              or internal business purposes.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Restrictions</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed mb-3">
              You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 body-large text-md-on-surface-variant">
              <li>Copy, modify, or distribute our software or content</li>
              <li>Reverse engineer or attempt to extract the source code</li>
              <li>Use the service for any unlawful purpose</li>
              <li>Sublicense, sell, or transfer your rights</li>
              <li>Remove any proprietary notices or labels</li>
            </ul>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Intellectual Property</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              All intellectual property rights in and to the service, including but not limited to 
              software, text, images, and trademarks, are owned by us or our licensors. This Agreement 
              does not grant you any rights to our intellectual property except as expressly stated.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Open Source Components</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              Our service may include open source software components that are subject to their own 
              license terms. These components are listed in our documentation, and their respective 
              licenses apply to your use of those components.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Termination</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              This license is effective until terminated. We may terminate this license at any time 
              if you fail to comply with any term of this Agreement. Upon termination, you must 
              cease all use of the service and destroy any copies of materials obtained from it.
            </p>
          </section>

          <section>
            <h2 className="headline-small text-md-on-surface mb-3">Governing Law</h2>
            <p className="body-large text-md-on-surface-variant leading-relaxed">
              This Agreement shall be governed by and construed in accordance with applicable laws, 
              without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
