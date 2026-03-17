import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { useLang } from "@/contexts/LangContext";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Aktualnosci = () => {
  const { lang } = useLang();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, catsRes] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("id, title, slug, excerpt, cover_image_url, created_at, category_id")
          .eq("published", true)
          .order("created_at", { ascending: false }),
        supabase.from("blog_categories").select("*").order("name"),
      ]);
      setPosts(postsRes.data || []);
      setCategories(catsRes.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filtered = activeCategory
    ? posts.filter((p) => p.category_id === activeCategory)
    : posts;

  const getCategoryName = (catId: string | null) => {
    if (!catId) return null;
    return categories.find((c) => c.id === catId)?.name || null;
  };

  return (
    <main className="bg-background pt-28 md:pt-32 pb-16">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">
            {lang === "pl" ? "Aktualności" : "News"}
          </p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4">
            {lang === "pl" ? "Aktualności" : "News"}
          </h1>
          <p className="text-muted-foreground font-body text-sm mb-10 max-w-2xl leading-relaxed">
            {lang === "pl"
              ? "Najnowsze wiadomości, relacje z koncertów i zapowiedzi."
              : "Latest news, concert reports and announcements."}
          </p>
        </FadeIn>

        {/* Category filter */}
        {categories.length > 0 && (
          <FadeIn delay={50}>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory("")}
                className={`px-4 py-1.5 rounded-full font-heading text-xs tracking-[0.1em] uppercase transition-colors ${
                  !activeCategory ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang === "pl" ? "Wszystko" : "All"}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full font-heading text-xs tracking-[0.1em] uppercase transition-colors ${
                    activeCategory === cat.id ? "bg-accent text-accent-foreground" : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {loading ? (
          <div className="text-center py-20 text-muted-foreground font-body">
            {lang === "pl" ? "Ładowanie..." : "Loading..."}
          </div>
        ) : filtered.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body">
                {lang === "pl" ? "Brak aktualności." : "No news yet."}
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-6">
            {filtered.map((post, i) => (
              <FadeIn key={post.id} delay={i * 80}>
                <Link
                  to={`/aktualnosci/${post.slug}`}
                  className="group flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-border hover:border-accent/30 bg-card transition-all duration-300"
                >
                  {post.cover_image_url && (
                    <div className="sm:w-48 shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full aspect-video sm:aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-muted-foreground font-body text-xs">
                        <Calendar size={12} />
                        {new Date(post.created_at).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      {getCategoryName(post.category_id) && (
                        <span className="flex items-center gap-1 text-accent font-body text-xs">
                          <Tag size={12} />
                          {getCategoryName(post.category_id)}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-accent font-heading text-xs tracking-[0.1em] uppercase">
                      {lang === "pl" ? "Czytaj więcej" : "Read more"} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Aktualnosci;
