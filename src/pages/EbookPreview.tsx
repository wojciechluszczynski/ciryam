import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

import EbookCover from "@/components/ebook/EbookCover";
import EbookIntro from "@/components/ebook/EbookIntro";
import EbookToc from "@/components/ebook/EbookToc";
import EbookNeedDesigner from "@/components/ebook/EbookNeedDesigner";
import EbookSteps from "@/components/ebook/EbookSteps";
import EbookStyles from "@/components/ebook/EbookStyles";
import EbookColors from "@/components/ebook/EbookColors";
import EbookChecklist from "@/components/ebook/EbookChecklist";
import EbookMistakes from "@/components/ebook/EbookMistakes";
import EbookCaseStudy from "@/components/ebook/EbookCaseStudy";
import EbookChooseDesigner from "@/components/ebook/EbookChooseDesigner";
import EbookInspirations from "@/components/ebook/EbookInspirations";
import EbookFaq from "@/components/ebook/EbookFaq";
import EbookOffer from "@/components/ebook/EbookOffer";
import EbookCta from "@/components/ebook/EbookCta";

const tocItems = [
  { id: "intro", label: "O mnie" },
  { id: "toc", label: "Spis treści" },
  { id: "need", label: "Projektant?" },
  { id: "steps", label: "5 kroków" },
  { id: "style", label: "Styl i budżet" },
  { id: "colors", label: "Kolory" },
  { id: "checklist", label: "Checklista" },
  { id: "mistakes", label: "10 błędów" },
  { id: "case", label: "Realizacja" },
  { id: "choose", label: "Jak wybrać?" },
  { id: "inspirations", label: "Inspiracje" },
  { id: "faq", label: "FAQ" },
  { id: "offer", label: "Oferta" },
  { id: "cta", label: "Kontakt" },
];

const EbookPreview = () => {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(scrollTop / docHeight, 1));
      setShowBackToTop(scrollTop > 600);

      for (const item of [...tocItems].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(item.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-background print:bg-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/30 print:hidden">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floating side nav - desktop only */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1.5 print:hidden">
        {tocItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            title={item.label}
            className={`group flex items-center gap-2 transition-all duration-300 ${
              activeSection === item.id ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "w-6 h-1.5 bg-accent"
                  : "w-2 h-1.5 bg-foreground/30 group-hover:w-4 group-hover:bg-foreground/50"
              }`}
            />
            <span
              className={`font-body text-[10px] tracking-wide transition-all duration-300 ${
                activeSection === item.id
                  ? "opacity-100 translate-x-0 text-accent"
                  : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg transition-all duration-300 print:hidden ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Wróć na górę"
      >
        <ChevronUp size={18} />
      </button>

      <EbookCover />
      <EbookIntro />
      <EbookToc />
      <EbookNeedDesigner />
      <EbookSteps />
      <EbookStyles />
      <EbookColors />
      <EbookChecklist />
      <EbookMistakes />
      <EbookCaseStudy />
      <EbookChooseDesigner />
      <EbookInspirations />
      <EbookFaq />
      <EbookOffer />
      <EbookCta onPrint={() => window.print()} />
    </main>
  );
};

export default EbookPreview;
