import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Save, Eye, Upload, X, Tag, User } from "lucide-react";
import BlogEditor from "@/components/blog/BlogEditor";
import DocumentImport from "@/components/blog/DocumentImport";
import ciryamLogo from "@/assets/ciryam-logo.png";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const AUTHORS = [
  { name: "Ciryam", avatar: null, uselogo: true },
  { name: "Wojciech Łuszczyński", avatar: null, uselogo: false },
];

const AdminPostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState<any>(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [published, setPublished] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [authorName, setAuthorName] = useState("Ciryam");
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (!isNew && id) fetchPost(id);
  }, [id]);

  const fetchCategories = async () => {
    const { data } = await supabase.from("blog_categories").select("*").order("name");
    setCategories(data || []);
  };

  const fetchPost = async (postId: string) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", postId)
      .single();
    if (error || !data) {
      toast.error("Post nie znaleziony");
      navigate("/admin/posts");
      return;
    }
    setTitle(data.title);
    setSlug(data.slug);
    setExcerpt(data.excerpt || "");
    setContent(data.content);
    setCoverUrl(data.cover_image_url || "");
    setPublished(data.published);
    setCategoryId(data.category_id);
    setAuthorName((data as any).author_name || "Ciryam");
    setKeywords((data as any).meta_keywords || []);

    const { data: tagsData } = await supabase
      .from("blog_post_tags")
      .select("tag")
      .eq("post_id", postId);
    setTags(tagsData?.map((t) => t.tag) || []);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[ąàáâãäå]/g, "a").replace(/[ćčç]/g, "c").replace(/[đ]/g, "d")
      .replace(/[ęèéêë]/g, "e").replace(/[ìíîï]/g, "i").replace(/[łľ]/g, "l")
      .replace(/[ńñ]/g, "n").replace(/[óòôõö]/g, "o").replace(/[řŕ]/g, "r")
      .replace(/[śšş]/g, "s").replace(/[ťţ]/g, "t").replace(/[úùûü]/g, "u")
      .replace(/[ýÿ]/g, "y").replace(/[źżž]/g, "z")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) setSlug(generateSlug(val));
  };

  const uploadCover = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      setUploading(true);
      const ext = file.name.split(".").pop();
      const fileName = `covers/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("blog-images").upload(fileName, file);
      if (error) {
        toast.error("Błąd uploadu");
        setUploading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      setCoverUrl(urlData.publicUrl);
      setUploading(false);
    };
    input.click();
  };

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) setTags([...tags, tag]);
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const addKeyword = () => {
    const kw = keywordInput.trim().toLowerCase();
    if (kw && !keywords.includes(kw)) setKeywords([...keywords, kw]);
    setKeywordInput("");
  };

  const removeKeyword = (kw: string) => setKeywords(keywords.filter((k) => k !== kw));

  const addCategory = async () => {
    const name = prompt("Nazwa nowej kategorii:");
    if (!name) return;
    const catSlug = generateSlug(name);
    const { data, error } = await supabase
      .from("blog_categories")
      .insert({ name, slug: catSlug })
      .select()
      .single();
    if (error) {
      toast.error("Błąd tworzenia kategorii");
    } else if (data) {
      setCategories([...categories, data]);
      setCategoryId(data.id);
    }
  };

  const handleDocumentImport = (html: string) => {
    // Set HTML content to editor via a special wrapper
    setContent(html);
  };

  const handleMetaGenerated = (meta: {
    title?: string;
    excerpt?: string;
    tags?: string[];
    keywords?: string[];
    suggested_category?: string;
  }) => {
    if (meta.title && !title) {
      setTitle(meta.title);
      setSlug(generateSlug(meta.title));
    }
    if (meta.excerpt && !excerpt) setExcerpt(meta.excerpt);
    if (meta.tags?.length) setTags((prev) => [...new Set([...prev, ...meta.tags!])]);
    if (meta.keywords?.length) setKeywords((prev) => [...new Set([...prev, ...meta.keywords!])]);
    if (meta.suggested_category) {
      const match = categories.find((c) => c.slug === meta.suggested_category);
      if (match && !categoryId) setCategoryId(match.id);
    }
  };

  const handleSave = async (shouldPublish?: boolean) => {
    if (!title.trim()) {
      toast.error("Tytuł jest wymagany");
      return;
    }
    if (!slug.trim()) {
      toast.error("Slug jest wymagany");
      return;
    }

    setSaving(true);
    const pub = shouldPublish !== undefined ? shouldPublish : published;
    const { data: { user } } = await supabase.auth.getUser();

    const selectedAuthor = AUTHORS.find((a) => a.name === authorName) || AUTHORS[0];

    const postData: any = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      cover_image_url: coverUrl || null,
      published: pub,
      category_id: categoryId,
      author_id: user?.id || null,
      author_name: selectedAuthor.name,
      meta_keywords: keywords,
      updated_at: new Date().toISOString(),
    };

    let postId = id;

    if (isNew) {
      const { data, error } = await supabase.from("blog_posts").insert(postData).select("id").single();
      if (error) {
        toast.error("Błąd zapisu: " + error.message);
        setSaving(false);
        return;
      }
      postId = data.id;
    } else {
      const { error } = await supabase.from("blog_posts").update(postData).eq("id", id);
      if (error) {
        toast.error("Błąd zapisu: " + error.message);
        setSaving(false);
        return;
      }
    }

    // Update tags
    if (postId && postId !== "new") {
      await supabase.from("blog_post_tags").delete().eq("post_id", postId);
      if (tags.length > 0) {
        await supabase.from("blog_post_tags").insert(tags.map((tag) => ({ post_id: postId!, tag })));
      }
    }

    setSaving(false);
    toast.success(pub ? "Post opublikowany!" : "Zapisano szkic");
    navigate("/admin/posts");
  };

  const currentAuthor = AUTHORS.find((a) => a.name === authorName) || AUTHORS[0];

  return (
    <main className="min-h-screen bg-background pt-8 pb-20">
      <div className="max-w-[900px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/admin/posts")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm">
            <ArrowLeft size={16} /> Powrót
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-foreground font-heading text-xs tracking-[0.1em] uppercase hover:bg-secondary transition-colors disabled:opacity-50"
            >
              <Save size={14} /> Szkic
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.1em] uppercase hover:bg-accent-hover transition-colors disabled:opacity-50"
            >
              <Eye size={14} /> Opublikuj
            </button>
          </div>
        </div>

        {/* Document import */}
        <DocumentImport onImport={handleDocumentImport} onMetaGenerated={handleMetaGenerated} />

        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Tytuł posta..."
          className="w-full bg-transparent text-foreground font-heading text-3xl md:text-4xl border-none outline-none placeholder:text-muted-foreground/30 mb-2"
        />

        {/* Slug */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-muted-foreground font-body text-xs">/aktualnosci/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="bg-transparent text-muted-foreground font-body text-xs border-b border-border outline-none focus:border-accent transition-colors flex-1"
          />
        </div>

        {/* Cover image */}
        <div className="mb-6">
          {coverUrl ? (
            <div className="relative rounded-xl overflow-hidden mb-2">
              <img src={coverUrl} alt="Cover" className="w-full aspect-video object-cover" />
              <button
                onClick={() => setCoverUrl("")}
                className="absolute top-3 right-3 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={uploadCover}
              disabled={uploading}
              className="w-full py-10 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors font-body text-sm flex flex-col items-center gap-2"
            >
              <Upload size={24} />
              {uploading ? "Uploadowanie..." : "Dodaj zdjęcie główne (cover)"}
            </button>
          )}
        </div>

        {/* Excerpt */}
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Krótki opis / zajawka (opcjonalnie)..."
          rows={2}
          className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground font-body text-sm resize-none focus:outline-none focus:border-accent transition-colors mb-6 placeholder:text-muted-foreground/40"
        />

        {/* Author & Category row */}
        <div className="flex items-center gap-4 mb-4 flex-wrap">
          {/* Author selector */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary flex items-center justify-center shrink-0">
              {currentAuthor.uselogo ? (
                <img src={ciryamLogo} alt="Ciryam" className="w-full h-full object-cover" />
              ) : (
                <User size={16} className="text-muted-foreground" />
              )}
            </div>
            <select
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
            >
              {AUTHORS.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <select
              value={categoryId || ""}
              onChange={(e) => setCategoryId(e.target.value || null)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Bez kategorii</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <button onClick={addCategory} className="text-xs text-accent hover:text-accent-hover font-body transition-colors">
              + Nowa
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <Tag size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-body">Tagi:</span>
          {tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary text-foreground font-body text-xs">
              #{tag}
              <button onClick={() => removeTag(tag)} className="text-muted-foreground hover:text-foreground"><X size={12} /></button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Dodaj tag..."
            className="bg-transparent border-none outline-none text-foreground font-body text-xs placeholder:text-muted-foreground/40 w-24"
          />
        </div>

        {/* Keywords (SEO) */}
        <div className="flex items-center flex-wrap gap-2 mb-6">
          <span className="text-xs text-muted-foreground font-body">🔑 SEO:</span>
          {keywords.map((kw) => (
            <span key={kw} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent font-body text-xs">
              {kw}
              <button onClick={() => removeKeyword(kw)} className="text-accent/60 hover:text-accent"><X size={12} /></button>
            </span>
          ))}
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
            placeholder="Dodaj keyword..."
            className="bg-transparent border-none outline-none text-foreground font-body text-xs placeholder:text-muted-foreground/40 w-28"
          />
        </div>

        {/* Rich text editor */}
        <BlogEditor content={content} onChange={setContent} />
      </div>
    </main>
  );
};

export default AdminPostEdit;
