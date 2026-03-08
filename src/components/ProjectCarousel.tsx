import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";

const projects = [
  {
    title: "Zlota Harmonia",
    desc: "Ciepie, przytulne mieszkanie z przemyslanym ukladem i eleganckimi detalami.",
    image: vizLivingBeige,
    href: "/zlota-harmonia",
    meta: "Mieszkanie 85 m\u00B2 \u00B7 Rzeszow",
  },
  {
    title: "Czarna Perla",
    desc: "Nowoczesny dom z odwaznymi materialami i duza iloscia naturalnego swiatla.",
    image: vizKitchenRattan,
    href: "/czarna-perla",
    meta: "Dom 180 m\u00B2 \u00B7 Podkarpacie",
  },
  {
    title: "Bambusowa Oaza",
    desc: "Przestrzen inspirowana natura, rattan, drewno i spokojne kolory.",
    image: vizDiningFireplace,
    href: "/bambusowa-oaza",
    meta: "Salon 65 m\u00B2 \u00B7 Malopolska",
  },
];

const ProjectCarousel = () => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const navigate = useCallback((dir: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive((a) => (a + dir + projects.length) % projects.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  useEffect(() => {
    autoRef.current = setInterval(() => navigate(1), 5000);
    return () => clearInterval(autoRef.current);
  }, [navigate]);

  const getIndex = (offset: number) => (active + offset + projects.length) % projects.length;

  return (
    <FadeIn>
      <div className="relative">
        {/* Carousel container */}
        <div className="overflow-hidden">
          <div className="flex items-center">
            {/* Previous (partially visible) */}
            <div className="hidden md:block w-[15%] shrink-0 opacity-40 blur-[2px] transition-all duration-600 -mr-2">
              <img
                src={projects[getIndex(-1)].image}
                alt={projects[getIndex(-1)].title}
                className="w-full aspect-[16/9] object-cover rounded-lg"
              />
            </div>

            {/* Active item */}
            <div className="w-full md:w-[70%] shrink-0 transition-all duration-600 ease-out px-2 md:px-4">
              <Link to={projects[active].href} className="group block">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={projects[active].image}
                    alt={`${projects[active].title} projekt wnetrz AN Projekt`}
                    className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 text-center">
                  <h3 className="font-heading text-2xl text-foreground mb-1">{projects[active].title}</h3>
                  <p className="text-muted-foreground font-body text-sm mb-2">{projects[active].meta}</p>
                  <p className="text-muted-foreground font-body text-sm mb-3 max-w-md mx-auto">{projects[active].desc}</p>
                  <span className="text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                    Zobacz projekt
                  </span>
                </div>
              </Link>
            </div>

            {/* Next (partially visible) */}
            <div className="hidden md:block w-[15%] shrink-0 opacity-40 blur-[2px] transition-all duration-600 -ml-2">
              <img
                src={projects[getIndex(1)].image}
                alt={projects[getIndex(1)].title}
                className="w-full aspect-[16/9] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-2 md:left-4 top-[22%] -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md"
          aria-label="Poprzedni projekt"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => navigate(1)}
          className="absolute right-2 md:right-4 top-[22%] -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md"
          aria-label="Nastepny projekt"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active ? "bg-accent w-6" : "bg-foreground/20"
            }`}
            aria-label={`Projekt ${i + 1}`}
          />
        ))}
      </div>
    </FadeIn>
  );
};

export default ProjectCarousel;
