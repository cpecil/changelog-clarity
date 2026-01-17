import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Eye, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2">
        <span className="text-xs text-muted-foreground">Markdown</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={cn(
              "rounded p-1.5 transition-colors",
              !isPreview ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Edit"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={cn(
              "rounded p-1.5 transition-colors",
              isPreview ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Preview"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {isPreview ? (
        <div className="prose-changelog min-h-[200px] p-4">
          <ReactMarkdown>{value || "*No content*"}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] w-full resize-none bg-background p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
      )}
    </div>
  );
}
