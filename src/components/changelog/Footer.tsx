import { Rss } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container-changelog flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">Updates, clearly.</p>
        
        <div className="flex items-center gap-4">
          <a
            href="/rss.xml"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Rss className="h-3.5 w-3.5" />
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
