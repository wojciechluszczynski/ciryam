import { useState, useCallback } from "react";
import { FileUp, Loader2, Sparkles } from "lucide-react";
import mammoth from "mammoth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DocumentImportProps {
  onImport: (html: string) => void;
  onMetaGenerated: (meta: {
    title?: string;
    excerpt?: string;
    tags?: string[];
    keywords?: string[];
    suggested_category?: string;
  }) => void;
}

const DocumentImport = ({ onImport, onMetaGenerated }: DocumentImportProps) => {
  const [importing, setImporting] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setImporting(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();

      if (ext === "docx" || ext === "doc") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer } as any, {
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='heading 1'] => h1:fresh",
            "p[style-name='heading 2'] => h2:fresh",
            "p[style-name='heading 3'] => h3:fresh",
          ],
        });

        if (result.messages.length > 0) {
          console.log("Mammoth messages:", result.messages);
        }

        onImport(result.value);

        // Extract plain text for AI meta generation
        const plainText = result.value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
        if (plainText.length > 50) {
          setGenerating(true);
          try {
            const { data, error } = await supabase.functions.invoke("generate-post-meta", {
              body: { text: plainText },
            });
            if (!error && data && !data.error) {
              onMetaGenerated(data);
              toast.success("Wygenerowano metadane z AI!");
            }
          } catch (e) {
            console.error("Meta generation failed:", e);
          } finally {
            setGenerating(false);
          }
        }

        toast.success("Dokument zaimportowany!");
      } else if (ext === "html" || ext === "htm") {
        const text = await file.text();
        onImport(text);
        toast.success("HTML zaimportowany!");
      } else {
        toast.error("Obsługiwane formaty: .docx, .doc, .html");
      }
    } catch (err) {
      console.error("Import error:", err);
      toast.error("Błąd importu dokumentu");
    } finally {
      setImporting(false);
    }
  }, [onImport, onMetaGenerated]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".docx,.doc,.html,.htm";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) handleFile(file);
    };
    input.click();
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={handleClick}
      className="w-full py-6 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors font-body text-sm flex flex-col items-center gap-2 cursor-pointer mb-6"
    >
      {importing || generating ? (
        <>
          <Loader2 size={24} className="animate-spin" />
          {generating ? (
            <span className="flex items-center gap-1.5">
              <Sparkles size={14} className="text-accent" />
              Generuję metadane z AI...
            </span>
          ) : (
            "Importuję dokument..."
          )}
        </>
      ) : (
        <>
          <FileUp size={24} />
          <span>Przeciągnij plik .docx / .doc lub kliknij aby wybrać</span>
          <span className="text-xs text-muted-foreground/60">Struktura nagłówków H1/H2/H3 zostanie zachowana</span>
        </>
      )}
    </div>
  );
};

export default DocumentImport;
