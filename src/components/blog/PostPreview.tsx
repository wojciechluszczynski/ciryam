import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import DOMPurify from "dompurify";
import { Calendar, Tag, X, User } from "lucide-react";
import ciryamLogo from "@/assets/ciryam-logo.png";

interface PostPreviewProps {
  title: string;
  excerpt: string;
  content: any;
  coverUrl: string;
  categoryName: string | null;
  tags: string[];
  authorName: string;
  onClose: () => void;
}

const PostPreview = ({
  title, excerpt, content, coverUrl, categoryName, tags, authorName, onClose,
}: PostPreviewProps) => {
  let htmlContent = "";
  try {
    if (content) {
      if (typeof content === "string" && content.startsWith("<")) {
        htmlContent = content;
      } else if (typeof content === "object") {
        htmlContent = generateHTML(content, [
          StarterKit,
          Image,
          LinkExt.configure({ openOnClick: false }),
          Youtube,
        ]);
      } else if (typeof content === "string") {
        htmlContent = `<p>${content}</p>`;
      }
      htmlContent = DOMPurify.sanitize(htmlContent, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling", "target", "rel"],
        FORCE_BODY: true,
      });
    }
  } catch (e) {
    console.error("PostPreview generateHTML error:", e);
    htmlContent = "<p>Błąd wyświetlania treści</p>";
  }

  const isDefaultAuthor = authorName === "Ciryam";

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm overflow-y-auto">
      {/* Close bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-[700px] mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-heading text-xs tracking-[0.15em] uppercase text-muted-foreground">
            Podgląd posta
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Preview content — matches AktualnosciPost layout */}
      <article className="max-w-[700px] mx-auto px-6 md:px-12 pt-10 pb-20">
        {/* Meta */}
        <div className="flex items-center flex-wrap gap-3 mb-4">
          <span className="flex items-center gap-1 text-muted-foreground font-body text-xs">
            <Calendar size={12} />
            {new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          {categoryName && (
            <span className="flex items-center gap-1 text-accent font-body text-xs">
              <Tag size={12} /> {categoryName}
            </span>
          )}
        </div>

        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">
          {title || "Bez tytułu"}
        </h1>

        {excerpt && (
          <p className="font-body text-muted-foreground text-sm mb-6 italic">{excerpt}</p>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary flex items-center justify-center shrink-0">
            {isDefaultAuthor ? (
              <img src={ciryamLogo} alt="Ciryam" className="w-full h-full object-cover" />
            ) : (
              <User size={18} className="text-muted-foreground" />
            )}
          </div>
          <span className="font-body text-sm text-foreground">{authorName}</span>
        </div>

        {coverUrl && (
          <div className="rounded-xl overflow-hidden mb-8">
            <img src={coverUrl} alt={title} className="w-full aspect-video object-cover" />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-sm max-w-none font-body text-foreground/90 leading-relaxed
            prose-headings:font-heading prose-headings:text-foreground prose-headings:uppercase prose-headings:tracking-wide
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:my-6
            prose-blockquote:border-accent/30 prose-blockquote:text-muted-foreground
            prose-hr:border-border
            [&_iframe]:w-full [&_iframe]:rounded-xl [&_iframe]:my-6"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-muted-foreground font-body text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
};

export default PostPreview;
