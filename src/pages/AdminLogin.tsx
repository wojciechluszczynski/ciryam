import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/admin/posts");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-accent" />
          </div>
          <h1 className="font-heading text-3xl text-foreground mb-2">Panel CMS</h1>
          <p className="font-body text-sm text-muted-foreground">Zaloguj się, aby zarządzać treścią</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło"
              required
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-card border border-border text-foreground font-body text-sm focus:outline-none focus:border-accent transition-colors"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-accent text-accent-foreground font-heading text-sm tracking-[0.15em] uppercase hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
