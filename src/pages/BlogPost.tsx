import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

import vizLivingBeige from "@/assets/viz-living-beige.png";
import vizKitchenRattan from "@/assets/viz-kitchen-rattan.png";
import vizDiningFireplace from "@/assets/viz-dining-fireplace.png";
import vizBathroomMarble from "@/assets/viz-bathroom-marble.png";
import vizBedroomDark from "@/assets/viz-bedroom-dark.png";
import vizBedroomMural from "@/assets/viz-bedroom-mural.png";
import vizClosetMarble from "@/assets/viz-closet-marble.png";
import vizDetailCeramics from "@/assets/viz-detail-ceramics.png";
import heroKitchen from "@/assets/hero-kitchen.png";

const posts: Record<string, { title: string; image: string; category: string; date: string; readTime: string; content: string }> = {
  "bledy-planowanie-kuchni": {
    title: "5 błędów przy planowaniu kuchni, których łatwo uniknąć",
    image: vizKitchenRattan,
    category: "Porady",
    date: "28 lutego 2026",
    readTime: "5 min",
    content: `Kuchnia to jedno z najważniejszych pomieszczeń w domu. To tu spędzamy czas z rodziną, gotujemy i odpoczywamy. Niestety, wiele osób popełnia błędy przy jej planowaniu, które potem trudno naprawić.\n\n**1. Zbyt mało blatu roboczego**\nJeden z najczęstszych błędów. Upewnij się, że masz wystarczająco dużo miejsca do przygotowywania posiłków.\n\n**2. Niewłaściwy trójkąt roboczy**\nOdległość między lodówką, zlewem i kuchenką powinna być optymalna. Zbyt duża lub zbyt mała utrudnia pracę.\n\n**3. Złe oświetlenie**\nSamo górne oświetlenie to za mało. Zaplanuj oświetlenie pod szafkami i nad wyspą.\n\n**4. Zbyt mało schowków**\nKuchnia potrzebuje miejsca na naczynia, garnki, jedzenie i sprzęty. Planuj szafki z wyprzedzeniem.\n\n**5. Brak wentylacji**\nDobry okap to podstawa. Nie oszczędzaj na wentylacji, szczególnie w kuchni otwartej na salon.`,
  },
  "trendy-wnetrzarskie-2026": {
    title: "Trendy wnętrzarskie 2026: co zostaje, a co odchodzi?",
    image: vizLivingBeige,
    category: "Trendy",
    date: "20 lutego 2026",
    readTime: "7 min",
    content: `Rok 2026 przynosi kontynuację kilku ważnych trendów i odchodzenie od niektórych rozwiązań.\n\n**Zostaje: ciepły minimalizm**\nNaturalne materiały, stonowane kolory i prostota formy. To kierunek, który nie przemija.\n\n**Zostaje: ceramika i kamień**\nNaturalne materiały zyskują na popularności. Kamień, ceramika i drewno dominują w łazienkach i kuchniach.\n\n**Odchodzi: szary beton wszędzie**\nSzare, zimne wnętrza ustępują miejsca ciepłym, przytulnym przestrzeniom z drewnem i rattanem.\n\n**Nowość: odwaga w kolorze**\nCoraz więcej osób decyduje się na wyraziste akcenty kolorystyczne. Głęboka zieleń, terakota i granat to kolory roku.`,
  },
  "jak-wybrac-plytki-lazienka": {
    title: "Jak wybrać idealne płytki do łazienki?",
    image: vizBathroomMarble,
    category: "Materiały",
    date: "15 lutego 2026",
    readTime: "6 min",
    content: `Wybór płytek to jedna z najważniejszych decyzji przy urządzaniu łazienki. Odpowiednie płytki potrafią całkowicie odmienić charakter wnętrza.\n\n**Format**\nDuże formaty (np. 60x120 cm) optycznie powiększają przestrzeń. Małe formaty (np. jodełka, cegiełki) dodają charakteru.\n\n**Kolor**\nJasne płytki rozświetlają, ciemne dodają elegancji. Warto łączyć różne odcienie w jednej palecie.\n\n**Materiał**\nGres porcelanowy to najpopularniejszy wybór. Jest trwały, łatwy w czyszczeniu i dostępny w wielu wzorach.\n\n**Układ**\nSposób ułożenia płytek ma ogromne znaczenie. Jodełka, cegiełka, prosta fuga czy przesunięcie o 1/3 dają zupełnie różne efekty.`,
  },
  "maly-metraz-kawalerka": {
    title: "Mały metraż, duże możliwości: jak urządzić kawalerkę?",
    image: vizBedroomMural,
    category: "Porady",
    date: "8 lutego 2026",
    readTime: "5 min",
    content: `Kawalerka to wyzwanie projektowe, ale też szansa na kreatywne rozwiązania.\n\n**Wielofunkcyjne meble**\nŁóżko ze schowkiem, rozkładany stół, ławka z pojemnikiem. Każdy mebel powinien pełnić więcej niż jedną funkcję.\n\n**Optyczne powiększanie**\nJasne kolory, lustra i minimalizm w dekoracjach pomagają optycznie powiększyć małą przestrzeń.\n\n**Strefy**\nNawet w kawalerce warto wyznaczyć strefy: do spania, pracy i odpoczynku. Półki, regały lub zasłony pomogą je oddzielić.`,
  },
  "realizacja-zlota-harmonia": {
    title: "Realizacja: Złota Harmonia w Rzeszowie",
    image: vizDiningFireplace,
    category: "Realizacje",
    date: "1 lutego 2026",
    readTime: "4 min",
    content: `Projekt Złota Harmonia to mieszkanie o powierzchni 85 m² w Rzeszowie. Klienci szukali ciepłego, przytulnego wnętrza z przemyślanym układem.\n\n**Wyzwanie**\nOtwarta przestrzeń salonu z jadalnią wymagała przemyślanego podziału stref bez utraty przestronności.\n\n**Rozwiązanie**\nZastosowałam delikatne podziały za pomocą oświetlenia i zmiany materiałów podłogowych. Ciepła paleta kolorów (beże, złoto, drewno) nadała wnętrzu elegancki, ale przytulny charakter.`,
  },
  "wspolpraca-z-projektantem": {
    title: "Jak przebiega współpraca z projektantem wnętrz?",
    image: heroKitchen,
    category: "Proces",
    date: "25 stycznia 2026",
    readTime: "6 min",
    content: `Wiele osób zastanawia się, jak wygląda współpraca z projektantem wnętrz. Oto krótki przewodnik.\n\n**Krok 1: Pierwsza rozmowa**\nBezpłatna rozmowa, podczas której poznaję Twoje potrzeby, styl życia i budżet.\n\n**Krok 2: Wizja lokalna**\nOdwiedzam Twoją przestrzeń, robię pomiary i notuję szczegóły.\n\n**Krok 3: Koncepcja**\nPrzygotowuję wstępny układ, moodboard i propozycję stylistyczną.\n\n**Krok 4: Wizualizacje 3D**\nTworzę realistyczne wizualizacje, dzięki którym zobaczysz swoje wnętrze przed remontem.\n\n**Krok 5: Dokumentacja**\nPrzekazuję komplet dokumentów technicznych dla wykonawcy.`,
  },
  "ciemne-wnetrza": {
    title: "Ciemne wnętrza: odwaga czy ryzyko?",
    image: vizBedroomDark,
    category: "Trendy",
    date: "18 stycznia 2026",
    readTime: "5 min",
    content: `Ciemne wnętrza mogą być niezwykle eleganckie i przytulne, jeśli zastosuje się je z wyczuciem.\n\n**Kiedy stosować ciemne kolory?**\nW sypialniach, gabinetach i przestrzeniach, które mają sprzyjać wyciszeniu.\n\n**Jak uniknąć przytłoczenia?**\nKluczem jest odpowiednie oświetlenie, kontrasty i naturalne materiały, które ocieplają ciemną paletę.`,
  },
  "garderoba-marzen": {
    title: "Garderoba marzeń: od projektu do realizacji",
    image: vizClosetMarble,
    category: "Porady",
    date: "10 stycznia 2026",
    readTime: "4 min",
    content: `Garderoba to nie luksus, a praktyczne rozwiązanie, które ułatwia codzienne życie.\n\n**Planowanie**\nZastanów się, jakie ubrania masz i jak je przechowujesz. To pomoże zaplanować odpowiednie półki, drążki i szuflady.\n\n**Oświetlenie**\nDobre oświetlenie w garderobie to podstawa. Zaplanuj ledowe listwy i punktowe oświetlenie przy lustrze.`,
  },
  "ceramika-we-wnetrzach": {
    title: "Ceramika we wnętrzach: nie tylko płytki",
    image: vizDetailCeramics,
    category: "Materiały",
    date: "3 stycznia 2026",
    readTime: "5 min",
    content: `Ceramika to materiał o ogromnym potencjale dekoracyjnym. Wykracza daleko poza tradycyjne płytki.\n\n**Ceramiczne lampy i wazony**\nRęcznie robiona ceramika dodaje wnętrzu ciepła i indywidualnego charakteru.\n\n**Ścianki z cegły**\nCeramiczna cegła na ścianie to klasyk, który nigdy nie wychodzi z mody. Idealny do loftów i przestrzeni w stylu industrialnym.`,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <main className="bg-background pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-foreground mb-4">Artykuł nie znaleziony</h1>
          <Link to="/blog" className="text-accent font-body text-sm hover:underline">Wróć do bloga</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background">
      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      <article className="max-w-[720px] mx-auto px-6 py-12 md:py-16">
        <FadeIn>
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground font-body text-sm mb-8 hover:text-accent transition-colors">
            <ArrowLeft size={14} /> Wróć do bloga
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-body text-xs">{post.category}</span>
            <span className="text-muted-foreground font-body text-xs">{post.date}</span>
            <span className="text-muted-foreground font-body text-xs">· {post.readTime} czytania</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-8">{post.title}</h1>

          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                return <h2 key={i} className="font-heading text-xl text-foreground mt-8 mb-4">{paragraph.replace(/\*\*/g, "")}</h2>;
              }
              if (paragraph.includes("**")) {
                const parts = paragraph.split(/\*\*/g);
                return (
                  <p key={i} className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                    {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground font-medium">{part}</strong> : part)}
                  </p>
                );
              }
              return <p key={i} className="text-muted-foreground font-body text-base leading-relaxed mb-4">{paragraph}</p>;
            })}
          </div>
        </FadeIn>

        {/* CTA */}
        <div className="mt-16 p-8 bg-secondary rounded-xl text-center">
          <h3 className="font-heading text-xl text-foreground mb-3">Potrzebujesz pomocy z projektem?</h3>
          <p className="text-muted-foreground font-body text-sm mb-5">Chętnie porozmawiam o Twoim wnętrzu. Pierwsza rozmowa jest bezpłatna.</p>
          <Link to="/kontakt" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors">
            Zapytaj o projekt <ArrowRight size={14} />
          </Link>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
