import { Twitter, Github, Linkedin, Globe, MessageCircle } from "lucide-react";
import type { LucideIcon as LucideIconType } from "lucide-react";

const links: { icon: LucideIconType; label: string; url: string }[] = [
  { icon: Twitter, label: "Twitter", url: "#" },
  { icon: Github, label: "GitHub", url: "#" },
  { icon: Linkedin, label: "LinkedIn", url: "#" },
  { icon: Globe, label: "Website", url: "#" },
  { icon: MessageCircle, label: "Discord", url: "#" },
];

export function ConnectCard() {
  return (
    <div className="md-card-outlined p-4 sm:p-5">
      <h3 className="title-medium text-md-on-surface mb-3">Connect</h3>
      <div className="flex flex-wrap gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="md-icon-button-outlined w-10 h-10"
            aria-label={l.label}
          >
            <l.icon size={18} />
          </a>
        ))}
      </div>
    </div>
  );
}
