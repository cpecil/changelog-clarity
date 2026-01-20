import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Shield, Cookie, Scale, ChevronRight } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { TermsPage } from "./TermsPage";
import { PrivacyPage } from "./PrivacyPage";
import { CookiePage } from "./CookiePage";
import { LicensePage } from "./LicensePage";
import type { LucideIcon as LucideIconType } from "lucide-react";

type LegalPage = "list" | "terms" | "privacy" | "cookies" | "license";

const legalDocs: { id: LegalPage; title: string; description: string; icon: LucideIconType }[] = [
  {
    id: "terms",
    title: "Terms of Service",
    description: "Our terms and conditions for using the service",
    icon: FileText,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    icon: Shield,
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    description: "Information about cookies and tracking",
    icon: Cookie,
  },
  {
    id: "license",
    title: "License Agreement",
    description: "Software licensing terms and usage rights",
    icon: Scale,
  },
];

export function LegalPanel() {
  const [activePage, setActivePage] = useState<LegalPage>("list");

  if (activePage === "terms") {
    return <TermsPage onBack={() => setActivePage("list")} />;
  }
  if (activePage === "privacy") {
    return <PrivacyPage onBack={() => setActivePage("list")} />;
  }
  if (activePage === "cookies") {
    return <CookiePage onBack={() => setActivePage("list")} />;
  }
  if (activePage === "license") {
    return <LicensePage onBack={() => setActivePage("list")} />;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="display-small text-md-on-surface mb-2">Legal</h2>
          <p className="body-large text-md-on-surface-variant">
            Important documents and policies
          </p>
        </div>

        {/* Legal document cards */}
        <div className="grid gap-4">
          {legalDocs.map((doc, index) => (
            <motion.button
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActivePage(doc.id)}
              className="md-card-elevated p-5 flex items-center gap-4 group hover:bg-md-on-surface/[0.08] transition-colors text-left w-full"
            >
              <div className="w-12 h-12 rounded-m3-medium bg-md-secondary-container flex items-center justify-center flex-shrink-0">
                <LucideIcon 
                  icon={doc.icon} 
                  className="text-md-on-secondary-container" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="title-medium text-md-on-surface mb-1">
                  {doc.title}
                </h3>
                <p className="body-medium text-md-on-surface-variant">
                  {doc.description}
                </p>
              </div>
              <LucideIcon 
                icon={ChevronRight} 
                size="small"
                className="text-md-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </motion.button>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-6 border-t border-md-outline-variant"
        >
          <p className="body-small text-md-on-surface-variant text-center">
            Last updated: January 2026
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
