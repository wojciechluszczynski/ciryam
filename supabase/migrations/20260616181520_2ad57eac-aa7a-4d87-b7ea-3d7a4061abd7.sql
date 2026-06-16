
-- 1. Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Seed existing user as admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('fe9374bb-a5ce-4172-a088-d6df10d44832', 'admin')
ON CONFLICT DO NOTHING;

-- 3. Tighten blog_posts policies
DROP POLICY IF EXISTS "Anyone can read published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Auth users can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Auth users can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Auth users can delete posts" ON public.blog_posts;

CREATE POLICY "Public can read published posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage posts insert"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage posts update"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage posts delete"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Tighten blog_categories
DROP POLICY IF EXISTS "Auth users can insert categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Auth users can update categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Auth users can delete categories" ON public.blog_categories;

CREATE POLICY "Admins insert categories"
  ON public.blog_categories FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update categories"
  ON public.blog_categories FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete categories"
  ON public.blog_categories FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 5. Tighten blog_post_tags
DROP POLICY IF EXISTS "Auth users can manage tags" ON public.blog_post_tags;
DROP POLICY IF EXISTS "Auth users can delete tags" ON public.blog_post_tags;

CREATE POLICY "Admins insert tags"
  ON public.blog_post_tags FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update tags"
  ON public.blog_post_tags FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete tags"
  ON public.blog_post_tags FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 6. Tighten storage policies for blog-images
DROP POLICY IF EXISTS "Auth users can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can delete blog images" ON storage.objects;

CREATE POLICY "Admins upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
