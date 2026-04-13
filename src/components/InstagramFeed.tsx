import { useState, useEffect } from "react";
import { Instagram, Play, Images } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { Skeleton } from "@/components/ui/skeleton";

interface BeholdPost {
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  isReel: boolean;
  sizes: { medium: { mediaUrl: string } };
  thumbnailUrl: string;
  prunedCaption: string;
  timestamp: string;
}

const InstagramFeed = () => {
  const [posts, setPosts] = useState<BeholdPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://feeds.behold.so/cZBIaAkQUsE5iEQY8L1e")
      .then((r) => r.json())
      .then((data) => {
        setPosts((data.posts || data).slice(0, 9));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-background section-padding" id="instagram">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <div className="text-center mb-10">
            <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4 flex items-center justify-center gap-2">
              <Instagram size={14} /> Instagram
            </p>
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-4">
              Obserwuj nas na Instagramie
            </h2>
            <a
              href="https://www.instagram.com/ciryam__official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover font-body text-sm transition-colors"
            >
              @ciryam__official
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-center text-muted-foreground font-body text-sm">
              Nie udało się załadować postów
            </p>
          )}

          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {posts.map((post, i) => {
                  const isVideo = post.mediaType === "VIDEO" || post.isReel;
                  const isCarousel = post.mediaType === "CAROUSEL_ALBUM";
                  const imgSrc = isVideo
                    ? post.thumbnailUrl
                    : post.sizes?.medium?.mediaUrl || post.thumbnailUrl;

                  return (
                    <a
                      key={post.permalink + i}
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden rounded-xl bg-card block"
                    >
                      <div className="aspect-square">
                        <img
                          src={imgSrc}
                          alt={post.prunedCaption?.slice(0, 80) || `CIRYAM post ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Type icon overlay */}
                      {isVideo && (
                        <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5">
                          <Play size={14} className="text-foreground fill-foreground" />
                        </div>
                      )}
                      {isCarousel && !isVideo && (
                        <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1.5">
                          <Images size={14} className="text-foreground" />
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <Instagram
                          size={28}
                          className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>

                      {/* Caption */}
                      {post.prunedCaption && (
                        <div className="px-3 py-2">
                          <p className="text-muted-foreground text-xs font-body line-clamp-2">
                            {post.prunedCaption}
                          </p>
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>

              <div className="text-center mt-8">
                <a
                  href="https://www.instagram.com/ciryam__official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-accent text-accent font-heading text-sm tracking-[0.1em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Instagram size={16} /> @ciryam__official
                </a>
              </div>
            </>
          )}
        </FadeIn>
      </div>
    </section>
  );
};

export default InstagramFeed;
