import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit2, Trash2, Eye, EyeOff, LogOut } from "lucide-react";
import { toast } from "sonner";
import FadeIn from "@/components/FadeIn";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  cover_image_url: string | null;
  category_id: string | null;
}

const AdminPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, created_at, updated_at, cover_image_url, category_id")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Błąd ładowania postów");
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ published: !post.published, updated_at: new Date().toISOString() })
      .eq("id", post.id);
    if (error) {
      toast.error("Błąd zmiany statusu");
    } else {
      toast.success(post.published ? "Post ukryty" : "Post opublikowany");
      fetchPosts();
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Czy na pewno usunąć "${post.title}"?`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) {
      toast.error("Błąd usuwania");
    } else {
      toast.success("Post usunięty");
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <main className="min-h-screen bg-background pt-8 pb-20">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl text-foreground">Aktualności</h1>
            <p className="font-body text-sm text-muted-foreground mt-1">Zarządzaj postami na stronie</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/posts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors"
            >
              <Plus size={16} /> Nowy post
            </Link>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              title="Wyloguj"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground font-body">Ładowanie...</div>
        ) : posts.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 border border-dashed border-border rounded-xl">
              <p className="text-muted-foreground font-body mb-4">Brak postów. Dodaj pierwszy!</p>
              <Link
                to="/admin/posts/new"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.15em] uppercase"
              >
                <Plus size={14} /> Dodaj post
              </Link>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <FadeIn key={post.id}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/20 transition-colors group">
                  {post.cover_image_url && (
                    <img src={post.cover_image_url} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm text-foreground truncate">{post.title}</h3>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {new Date(post.created_at).toLocaleDateString("pl-PL")}
                      {" · "}
                      <span className={post.published ? "text-green-500" : "text-yellow-500"}>
                        {post.published ? "Opublikowany" : "Szkic"}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => togglePublish(post)}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      title={post.published ? "Ukryj" : "Opublikuj"}
                    >
                      {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <Link
                      to={`/admin/posts/${post.id}`}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      title="Edytuj"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => deletePost(post)}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                      title="Usuń"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPosts;
