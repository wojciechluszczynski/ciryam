
-- Categories/tags for blog posts
CREATE TABLE public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- Anyone can read categories
CREATE POLICY "Anyone can read categories" ON public.blog_categories
  FOR SELECT USING (true);

-- Only authenticated users can manage categories
CREATE POLICY "Auth users can insert categories" ON public.blog_categories
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth users can update categories" ON public.blog_categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth users can delete categories" ON public.blog_categories
  FOR DELETE TO authenticated USING (true);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB,
  cover_image_url TEXT,
  excerpt TEXT,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Anyone can read published posts" ON public.blog_posts
  FOR SELECT USING (published = true OR (auth.uid() IS NOT NULL));

-- Auth users can manage posts
CREATE POLICY "Auth users can insert posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth users can update posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth users can delete posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (true);

-- Blog post tags (many-to-many)
CREATE TABLE public.blog_post_tags (
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  PRIMARY KEY (post_id, tag)
);

ALTER TABLE public.blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tags" ON public.blog_post_tags
  FOR SELECT USING (true);

CREATE POLICY "Auth users can manage tags" ON public.blog_post_tags
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth users can delete tags" ON public.blog_post_tags
  FOR DELETE TO authenticated USING (true);

-- Storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies
CREATE POLICY "Anyone can read blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Auth users can upload blog images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Auth users can update blog images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'blog-images');

CREATE POLICY "Auth users can delete blog images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'blog-images');

-- Enable realtime for blog posts
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
