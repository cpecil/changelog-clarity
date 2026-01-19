import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Eye, Edit3, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorPanelProps {
  onClose: () => void;
}

export function EditorPanel({ onClose }: EditorPanelProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(`## v1.5

**Summary:** New features and improvements

### Changes

- **Added** Custom themes support
- **Improved** Performance for large datasets
- **Fixed** Navigation on mobile devices`);

  const handleSave = () => {
    console.log("Saving:", content);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-3xl mx-auto py-8"
    >
      <div className="md-card-elevated overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-md-outline-variant bg-md-surface-container-high">
          <h2 className="title-large text-md-on-surface">New changelog entry</h2>
          <div className="flex items-center gap-2">
            {/* Toggle buttons */}
            <div className="flex rounded-m3-full bg-md-surface-container p-1">
              <button
                onClick={() => setIsPreview(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-m3-full label-large transition-colors",
                  !isPreview
                    ? "bg-md-secondary-container text-md-on-secondary-container"
                    : "text-md-on-surface-variant hover:bg-md-on-surface/[0.08]"
                )}
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => setIsPreview(true)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-m3-full label-large transition-colors",
                  isPreview
                    ? "bg-md-secondary-container text-md-on-secondary-container"
                    : "text-md-on-surface-variant hover:bg-md-on-surface/[0.08]"
                )}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-m3-full hover:bg-md-on-surface/[0.08]"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-md-on-surface-variant" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="min-h-[400px]">
          {isPreview ? (
            <div className="prose-changelog p-6">
              <ReactMarkdown>{content || "*No content*"}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your changelog entry in Markdown..."
              className="w-full min-h-[400px] p-6 body-large bg-transparent text-md-on-surface placeholder:text-md-on-surface-variant focus:outline-none resize-none"
            />
          )}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-md-outline-variant bg-md-surface-container-high">
          <button onClick={onClose} className="md-text-button">
            Cancel
          </button>
          <button onClick={handleSave} className="md-filled-button">
            <Save className="w-5 h-5" />
            Save entry
          </button>
        </div>
      </div>
    </motion.div>
  );
}
