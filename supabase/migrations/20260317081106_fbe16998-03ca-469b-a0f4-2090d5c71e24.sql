ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS author_name text DEFAULT 'Ciryam',
ADD COLUMN IF NOT EXISTS author_avatar_url text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS meta_keywords text[] DEFAULT '{}';