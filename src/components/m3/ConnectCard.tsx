import { motion } from "framer-motion";
import { Twitter, Github, Linkedin, Globe, MessageCircle } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import type { LucideIcon as LucideIconType } from "lucide-react";

const socialLinks: { id: string; label: string; icon: LucideIconType; url: string; color: string }[] = [
  {
    id: "twitter",
    label: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2]",
  },
  {
    id: "github",
    label: "GitHub",
    icon: Github,
    url: "https://github.com",
    color: "bg-md-on-surface/10 hover:bg-md-on-surface/20 text-md-on-surface",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com",
    color: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]",
  },
  {
    id: "website",
    label: "Website",
    icon: Globe,
    url: "https://example.com",
    color: "bg-md-primary/10 hover:bg-md-primary/20 text-md-primary",
  },
  {
    id: "discord",
    label: "Discord",
    icon: MessageCircle,
    url: "https://discord.com",
    color: "bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2]",
  },
];

export function ConnectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="md-card-outlined p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-m3-medium bg-md-tertiary-container flex items-center justify-center">
          <LucideIcon icon={Globe} className="text-md-on-tertiary-container" />
        </div>
        <div>
          <h2 className="headline-small text-md-on-surface">Connect with us</h2>
          <p className="body-medium text-md-on-surface-variant">
            Follow us on social media
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {socialLinks.map((social) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center justify-center p-4 rounded-m3-large transition-colors ${social.color}`}
            aria-label={social.label}
          >
            <LucideIcon icon={social.icon} />
            <span className="label-small mt-2 text-inherit">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
