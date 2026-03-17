import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExt from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import { Calendar, Tag, ArrowLeft, User } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";
import ciryamLogo from "@/assets/ciryam-logo.png";

const AktualnosciPost = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const [post, setPost] = useState<any>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      setPost(data);

      // Fetch category
      if (data.category_id) {
        const { data: catData } = await supabase
          .from("blog_categories")
          .select("name")
          .eq("id", data.category_id)
          .single();
        setCategory(catData?.name || null);
      }

      // Fetch tags
      const { data: tagsData } = await supabase
        .from("blog_post_tags")
        .select("tag")
        .eq("post_id", data.id);
      setTags(tagsData?.map((t) => t.tag) || []);

      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-background pt-28 pb-16 min-h-screen">
        <div className="max-w-[700px] mx-auto px-6 text-center text-muted-foreground font-body py-20">
          {lang === "pl" ? "Ładowanie..." : "Loading..."}
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="bg-background pt-28 pb-16 min-h-screen">
        <div className="max-w-[700px] mx-auto px-6 text-center py-20">
          <h1 className="font-heading text-3xl text-foreground mb-4">
            {lang === "pl" ? "Post nie znaleziony" : "Post not found"}
          </h1>
          <Link to="/aktualnosci" className="text-accent font-body text-sm hover:underline">
            ← {lang === "pl" ? "Wróć do aktualności" : "Back to news"}
          </Link>
        </div>
      </main>
    );
  }

  let htmlContent = "";
  try {
    if (post.content) {
      htmlContent = generateHTML(post.content, [
        StarterKit,
        Image,
        LinkExt.configure({ openOnClick: true }),
        Youtube,
      ]);
    }
  } catch {
    htmlContent = "<p>Błąd wyświetlania treści</p>";
  }

  return (
    <main className="bg-background pt-28 md:pt-32 pb-16">
      <article className="max-w-[700px] mx-auto px-6 md:px-12">
        <FadeIn>
          <Link to="/aktualnosci" className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent font-body text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> {lang === "pl" ? "Aktualności" : "News"}
          </Link>

          {/* Meta */}
          <div className="flex items-center flex-wrap gap-3 mb-4">
            <span className="flex items-center gap-1 text-muted-foreground font-body text-xs">
              <Calendar size={12} />
              {new Date(post.created_at).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {category && (
              <span className="flex items-center gap-1 text-accent font-body text-xs">
                <Tag size={12} /> {category}
              </span>
            )}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6 leading-tight">{post.title}</h1>

          {post.cover_image_url && (
            <div className="rounded-xl overflow-hidden mb-8">
              <img src={post.cover_image_url} alt={post.title} className="w-full aspect-video object-cover" />
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
        </FadeIn>
      </article>
    </main>
  );
};

export default AktualnosciPost;
