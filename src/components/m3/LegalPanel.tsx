import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Shield, Cookie, Scale, ChevronRight } from "lucide-react";
import { TermsPage } from "./TermsPage";
import { PrivacyPage } from "./PrivacyPage";
import { CookiePage } from "./CookiePage";
import { LicensePage } from "./LicensePage";
import type { LucideIcon as LucideIconType } from "lucide-react";

type LegalPage = "list" | "terms" | "privacy" | "cookies" | "license";

const docs: { id: LegalPage; title: string; desc: string; icon: LucideIconType }[] = [
  { id: "terms", title: "Terms of Service", desc: "Usage terms and conditions", icon: FileText },
  { id: "privacy", title: "Privacy Policy", desc: "Data collection and protection", icon: Shield },
  { id: "cookies", title: "Cookie Policy", desc: "Cookies and tracking info", icon: Cookie },
  { id: "license", title: "License", desc: "Software licensing terms", icon: Scale },
];

export function LegalPanel() {
  const [page, setPage] = useState<LegalPage>("list");

  if (page === "terms") return <TermsPage onBack={() => setPage("list")} />;
  if (page === "privacy") return <PrivacyPage onBack={() => setPage("list")} />;
  if (page === "cookies") return <CookiePage onBack={() => setPage("list")} />;
  if (page === "license") return <LicensePage onBack={() => setPage("list")} />;

  return (
    <div className="w-full max-w-lg mx-auto py-6 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h2 className="title-large text-md-on-surface mb-1">Legal</h2>
          <p className="body-medium text-md-on-surface-variant">Documents & policies</p>
        </div>

        <div className="md-card-outlined overflow-hidden divide-y divide-md-outline-variant">
          {docs.map((doc, i) => (
            <button
              key={doc.id}
              onClick={() => setPage(doc.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-md-surface-variant/50 transition-colors group"
            >
              <div className="w-9 h-9 rounded-m3-full flex items-center justify-center shrink-0" style={{ background: 'hsl(var(--md-sys-color-secondary-container))' }}>
                <doc.icon size={16} className="text-md-on-secondary-container" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="title-small text-md-on-surface">{doc.title}</p>
                <p className="body-small text-md-on-surface-variant">{doc.desc}</p>
              </div>
              <ChevronRight size={18} className="text-md-on-surface-variant shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <p className="body-small text-md-on-surface-variant text-center pt-2">Last updated: January 2026</p>
      </motion.div>
    </div>
  );
}
