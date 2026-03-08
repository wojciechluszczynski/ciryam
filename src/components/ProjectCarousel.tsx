import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";

const projects = [
  {
    title: "Złota Harmonia",
    desc: "Ciepłe, przytulne mieszkanie z przemyślanym układem i eleganckimi detalami.",
    image: vizLivingBeige,
    href: "/zlota-harmonia",
    meta: "Mieszkanie 85 m² · Rzeszów",
  },
  {
    title: "Czarna Perła",
    desc: "Nowoczesny dom z odważnymi materiałami i dużą ilością naturalnego światła.",
    image: vizKitchenRattan,
    href: "/czarna-perla",
    meta: "Dom 180 m² · Podkarpacie",
  },
  {
    title: "Bambusowa Oaza",
    desc: "Przestrzeń inspirowana naturą – rattan, drewno i spokojne kolory.",
    image: vizDiningFireplace,
    href: "/bambusowa-oaza",
    meta: "Salon 65 m² · Małopolska",
  },
];

const ProjectCarousel = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? projects.length - 1 : a - 1));
  const next = () => setActive((a) => (a === projects.length - 1 ? 0 : a + 1));

  const getIndex = (offset: number) => (active + offset + projects.length) % projects.length;

  return (
    <FadeIn>
      <div className="relative">
        {/* Carousel */}
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {/* Prev item (blurred) */}
          <div className="hidden md:block w-1/4 shrink-0 opacity-40 blur-[2px] transition-all duration-500">
            <Link to={projects[getIndex(-1)].href} className="block">
              <img
                src={projects[getIndex(-1)].image}
                alt={projects[getIndex(-1)].title}
                className="w-full aspect-[4/5] object-cover rounded-lg"
              />
            </Link>
          </div>

          {/* Active item */}
          <div className="w-full md:w-1/2 shrink-0 transition-all duration-500">
            <Link to={projects[active].href} className="group block">
              <div className="overflow-hidden rounded-lg mb-5">
                <img
                  src={projects[active].image}
                  alt={`${projects[active].title} – projekt wnętrz AN Projekt`}
                  className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="text-center">
                <h3 className="font-heading text-2xl text-foreground mb-1">{projects[active].title}</h3>
                <p className="text-muted-foreground font-body text-sm mb-2">{projects[active].meta}</p>
                <p className="text-muted-foreground font-body text-sm mb-3 max-w-md mx-auto">{projects[active].desc}</p>
                <span className="text-sm font-body tracking-[0.05em] uppercase text-foreground border-b border-foreground/30 pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors">
                  Zobacz projekt
                </span>
              </div>
            </Link>
          </div>

          {/* Next item (blurred) */}
          <div className="hidden md:block w-1/4 shrink-0 opacity-40 blur-[2px] transition-all duration-500">
            <Link to={projects[getIndex(1)].href} className="block">
              <img
                src={projects[getIndex(1)].image}
                alt={projects[getIndex(1)].title}
                className="w-full aspect-[4/5] object-cover rounded-lg"
              />
            </Link>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-0 md:-left-4 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 shadow-md flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 z-10"
          aria-label="Poprzedni projekt"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          className="absolute right-0 md:-right-4 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 shadow-md flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 z-10"
          aria-label="Następny projekt"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
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
      </div>
    </FadeIn>
  );
};

export default ProjectCarousel;
