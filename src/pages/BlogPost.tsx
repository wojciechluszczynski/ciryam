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

// CTA Banner component for inserting in articles
const CtaBanner = ({ variant }: { variant: "kontakt" | "realizacje" | "oferta" }) => {
  const banners = {
    kontakt: {
      bg: "bg-accent/10",
      title: "Planujesz projekt wnętrza?",
      text: "Napisz do mnie – pierwsza rozmowa jest bezpłatna i bez zobowiązań.",
      link: "/kontakt",
      label: "Zapytaj o projekt",
    },
    realizacje: {
      bg: "bg-secondary",
      title: "Zobacz, jak projektuję wnętrza",
      text: "Sprawdź moje realizacje – każdy projekt to inna historia.",
      link: "/realizacje",
      label: "Zobacz realizacje",
    },
    oferta: {
      bg: "bg-secondary",
      title: "Sprawdź moje pakiety i cennik",
      text: "Oferuję 4 formy współpracy dopasowane do Twoich potrzeb i budżetu.",
      link: "/oferta",
      label: "Poznaj ofertę",
    },
  };
  const b = banners[variant];
  return (
    <div className={`${b.bg} rounded-xl p-6 md:p-8 my-10 flex flex-col md:flex-row items-center gap-5`}>
      <div className="flex-1">
        <h3 className="font-heading text-lg text-foreground mb-1">{b.title}</h3>
        <p className="text-muted-foreground font-body text-sm">{b.text}</p>
      </div>
      <Link to={b.link} className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-body hover:bg-accent/90 transition-colors">
        {b.label} <ArrowRight size={14} />
      </Link>
    </div>
  );
};

interface Section {
  type: "h2" | "h3" | "p" | "ul" | "table" | "cta";
  content?: string;
  items?: string[];
  rows?: string[][];
  headers?: string[];
  ctaVariant?: "kontakt" | "realizacje" | "oferta";
}

function parseMarkdownToSections(content: string): Section[] {
  const lines = content.split("\n");
  const sections: Section[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line || line === "---") {
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      sections.push({ type: "h2", content: line.replace("## ", "") });
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      sections.push({ type: "h3", content: line.replace("### ", "") });
      i++;
      continue;
    }

    // Table
    if (line.startsWith("|") && i + 1 < lines.length && lines[i + 1]?.trim().startsWith("|")) {
      const tableLines = [];
      while (i < lines.length && lines[i]?.trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      // Parse table
      const headers = tableLines[0].split("|").filter(c => c.trim()).map(c => c.trim());
      const rows = tableLines.slice(2).map(row => row.split("|").filter(c => c.trim()).map(c => c.trim()));
      sections.push({ type: "table", headers, rows });
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i]?.trim().startsWith("- ")) {
        items.push(lines[i].trim().replace(/^- /, ""));
        i++;
      }
      sections.push({ type: "ul", items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i]?.trim() || "")) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      sections.push({ type: "ul", items });
      continue;
    }

    // Paragraph
    sections.push({ type: "p", content: line });
    i++;
  }

  return sections;
}

function renderInlineMarkdown(text: string) {
  // Handle bold **text** and links [text](url)
  const parts: (string | JSX.Element)[] = [];
  const regex = /(\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\))/g;
  let lastIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    if (match[2]) {
      parts.push(<strong key={match.index} className="text-foreground font-medium">{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      parts.push(<Link key={match.index} to={match[4]} className="text-accent hover:underline">{match[3]}</Link>);
    }
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts.length > 0 ? parts : text;
}

const posts: Record<string, {
  title: string;
  metaTitle: string;
  metaDesc: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}> = {
  "jak-wyglada-wspolpraca-z-projektantem-wnetrz": {
    title: "Jak wygląda współpraca z projektantką wnętrz? Proces od pierwszej rozmowy do realizacji",
    metaTitle: "Jak wygląda współpraca z projektantką wnętrz? Proces krok po kroku | AN Projekt",
    metaDesc: "Zastanawiasz się, jak przebiega projektowanie wnętrz od pierwszej rozmowy do realizacji? Tłumaczę cały proces krok po kroku.",
    image: heroKitchen,
    category: "Współpraca",
    date: "5 marca 2026",
    readTime: "8 min",
    content: `## Dlaczego warto wiedzieć, jak wygląda proces, zanim zadzwonisz do projektantki

Wiele osób odkłada kontakt z projektantką wnętrz, bo nie wie, czego się spodziewać. Czy to będzie drogie? Skomplikowane? Czy będę musiał wiedzieć, czego chcę od samego początku?

Odpowiedź brzmi: nie. Dobra projektantka wnętrz przeprowadzi Cię przez cały proces – od momentu, gdy masz tylko puste ściany i marzenie o ładnym domu, aż do chwili, gdy możesz się do niego wprowadzić.

---

## Krok 1 – Pierwsza rozmowa (bezpłatna i bez zobowiązań)

Wszystko zaczyna się od rozmowy. Możemy porozmawiać telefonicznie, online lub na żywo – jak Ci wygodniej.

Podczas tej rozmowy chcę się dowiedzieć:
- Jaki masz projekt? (nowe mieszkanie, dom, remont?)
- Jaki metraż i ile pomieszczeń?
- Jakie masz oczekiwania co do stylu?
- Jaki jest orientacyjny budżet na wykończenie?
- Kiedy planujesz start?

Ta rozmowa jest bezpłatna i trwa zazwyczaj 20–30 minut. Po rozmowie otrzymujesz ode mnie propozycję pakietu i wycenę projektu.

---

## Krok 2 – Wizja lokalna i pomiar

Jeśli zdecydujesz się na współpracę, umawiamy się na wizję lokalną. Przyjeżdżam do Ciebie, oglądam przestrzeń na żywo, wykonuję dokładny pomiar.

Pracuję na terenie całego Podkarpacia (Krosno, Rzeszów i okolice) oraz Małopolski (Nowy Sącz i okolice).

---

## Krok 3 – Projekt koncepcyjny i moodboard

Na podstawie rozmowy i wizyty lokalnej przygotowuję projekt koncepcyjny, który zawiera:
- Układ funkcjonalny pomieszczeń (rzut z góry)
- Moodboard – zestawienie stylu, kolorów, materiałów i mebli
- Wstępne propozycje materiałów i wykończeń

---

## Krok 4 – Wizualizacje 3D i poprawki

Renderuję wnętrze w 3D tak, żebyś mógł zobaczyć efekt końcowy jeszcze przed remontem. W zależności od pakietu przygotowuję od 3 do 4 wizualizacji oraz opcjonalnie wizualizację 3D 360°.

Po każdym zestawie wizualizacji mamy rundę poprawek – możesz zmieniać kolory ścian, meble, dodatki.

---

## Krok 5 – Dokumentacja techniczna

Gdy projekt i wizualizacje są zaakceptowane, przygotowuję pełną dokumentację techniczną dla wykonawców:
- Rysunki techniczne (rzuty, przekroje, widoki)
- Zestawienie materiałów i produktów
- Rozmieszczenie gniazdek elektrycznych, oświetlenia, przyłączy wodnych
- Specyfikację mebli i wykończeń z odnośnikami do producentów

---

## Krok 6 – Realizacja i nadzór (Pakiet Kompleksowa)

Jeśli wybierasz Pakiet Kompleksowa, jestem z Tobą również podczas realizacji:
- Wspólne zakupy materiałów i mebli (1 spotkanie)
- Wizytę na budowie podczas realizacji (1 spotkanie)
- Wizytę kontrolną po zakończeniu prac (1 spotkanie)

---

## Ile trwa cały projekt wnętrza?

| Pakiet | Co zawiera | Orientacyjny czas |
|--------|-----------|------------------|
| Koncepcyjna | Układ + 3 wizualizacje | 3–4 tygodnie |
| Komfortowa | Pełny projekt + 3D 360° + dokumentacja | 5–7 tygodni |
| Kompleksowa | Pełny projekt + nadzór realizacji | 8–12 tygodni |

---

## Ile kosztuje projekt wnętrza na Podkarpaciu?

| Pakiet | Cena | Przykład: mieszkanie 70m² |
|--------|------|--------------------------|
| Koncepcyjna | 120 zł/m² | ok. 8 400 zł |
| Komfortowa | 150 zł/m² | ok. 10 500 zł |
| Kompleksowa | 170 zł/m² | ok. 11 900 zł |

---

## Najczęstsze pytania o współpracę z projektantką wnętrz

**Czy pierwsza rozmowa jest naprawdę bezpłatna?**
Tak, pierwsza rozmowa jest zawsze bezpłatna i bez żadnych zobowiązań.

**Czy dojeżdżasz do Krosna i Rzeszowa?**
Tak, pracuję na terenie całego Podkarpacia – w tym Krosna, Rzeszowa, Sanoka, Jasła i okolic.

**Czy muszę wiedzieć, czego chcę, zanim do Ciebie napiszę?**
Absolutnie nie. Część klientów przychodzi z konkretną wizją, część – tylko z poczuciem, że „coś jest nie tak". Zaczniemy od rozmowy i razem to poukładamy.`,
  },
  "projekt-wnetrza-od-czego-zaczac": {
    title: "Projekt wnętrza mieszkania lub domu – od czego zacząć i co przygotować",
    metaTitle: "Projekt wnętrza mieszkania lub domu – od czego zacząć? | AN Projekt",
    metaDesc: "Planujesz projekt wnętrza i nie wiesz od czego zacząć? Dowiedz się, co przygotować przed pierwszym spotkaniem z projektantką.",
    image: vizLivingBeige,
    category: "Współpraca",
    date: "1 marca 2026",
    readTime: "7 min",
    content: `## Dlaczego warto się przygotować przed pierwszym spotkaniem

Pierwsze spotkanie z projektantką wnętrz to nie egzamin – nie musisz wiedzieć wszystkiego. Ale im lepiej przygotowana rozmowa, tym szybciej możemy przejść do konkretów.

---

## Krok 1 – Zastanów się, dla kogo jest to wnętrze

Zanim pomyślisz o stylu – odpowiedz sobie na kilka pytań:
- Ile osób będzie mieszkać w tym domu / mieszkaniu?
- Czy są dzieci lub zwierzęta?
- Jak dużo czasu spędzasz w domu?
- Czy pracujesz zdalnie i potrzebujesz miejsca do pracy?
- Co jest dla Ciebie ważniejsze: duże otwarte przestrzenie czy wydzielone, przytulne pomieszczenia?

Te odpowiedzi decydują o układzie funkcjonalnym bardziej niż jakikolwiek trend.

---

## Krok 2 – Określ budżet na wykończenie

Budżet na wykończenie obejmuje:
- Materiały wykończeniowe (podłogi, płytki, farby)
- Instalacje elektryczne i hydrauliczne
- Meble (gotowe lub na wymiar)
- Oświetlenie
- Sprzęt AGD
- Ekipa remontowa

Na etapie pierwszej rozmowy nie musisz znać dokładnej kwoty – wystarczy orientacyjny przedział.

---

## Krok 3 – Zbierz inspiracje

Najlepiej zadziała Pinterest lub Instagram. Stwórz tablicę z wnętrzami, które Ci się podobają – nawet jeśli nie wiesz dlaczego.

Warto też zebrać kilka zdjęć wnętrz, których zdecydowanie nie lubisz – to równie ważna informacja.

---

## Krok 4 – Przygotuj rzut i podstawowe wymiary

Jeśli masz plan mieszkania od dewelopera lub architekta – pobierz go i zachowaj. Jeśli nie masz, możemy wykonać pomiar podczas wizji lokalnej.

---

## Krok 5 – Zrób listę pomieszczeń do zaprojektowania

Nie każdy klient chce projektować całe mieszkanie od razu. Zrób listę pomieszczeń i zaznacz priorytety.

---

## Co przygotować na pierwsze spotkanie – lista w pigułce

- ✅ Odpowiedzi na pytania: dla kogo, jak żyjecie, co jest ważne
- ✅ Orientacyjny budżet na wykończenie
- ✅ Zdjęcia inspiracji (Pinterest, Instagram, foldery z telefonu)
- ✅ Rzut mieszkania lub podstawowe wymiary
- ✅ Lista pomieszczeń do zaprojektowania
- ✅ Termin, kiedy chcesz się wprowadzić

---

## Ile kosztuje projekt wnętrza?

| Pakiet | Cena | Co zawiera |
|--------|------|-----------|
| Koncepcyjna | 120 zł/m² | Układ + 3 wizualizacje |
| Komfortowa | 150 zł/m² | Pełny projekt + 3D 360° + dokumentacja |
| Kompleksowa | 170 zł/m² | Pełny projekt + nadzór realizacji |`,
  },
  "projektant-wnetrz-krosno-rzeszow": {
    title: "Projektant wnętrz Krosno i Rzeszów – kiedy warto skorzystać z pomocy i ile kosztuje projekt",
    metaTitle: "Projektant wnętrz Krosno i Rzeszów – kiedy warto i ile kosztuje? | AN Projekt",
    metaDesc: "Szukasz projektanta wnętrz w Krośnie lub Rzeszowie? Dowiedz się, kiedy warto skorzystać z pomocy projektantki.",
    image: vizDiningFireplace,
    category: "Współpraca",
    date: "25 lutego 2026",
    readTime: "7 min",
    content: `## Kiedy warto skorzystać z pomocy projektantki wnętrz?

Warto skorzystać z pomocy projektantki wnętrz gdy:
- Wykańczasz nowe mieszkanie lub dom i chcesz zrobić to dobrze od początku
- Planujesz remont i masz wrażenie, że nie wiesz, od czego zacząć
- Kupiłeś mieszkanie na rynku wtórnym i chcesz je odświeżyć lub zmienić układ
- Masz wizję, ale nie wiesz, jak ją przełożyć na konkretne materiały i meble
- Chcesz mieć pewność, że wszystko jest dobrze zaplanowane zanim zaczniesz remont

---

## Projektant wnętrz Krosno – jak wygląda współpraca lokalnie

Jeśli szukasz projektanta wnętrz w Krośnie lub okolicach (Jedlicze, Rymanów, Dukla, Korczyna, Miejsce Piastowe), mogę do Ciebie przyjechać na wizję lokalną i przeprowadzić cały projekt na miejscu.

Czas dojazdu do klientów z okolic Krosna: do 30 minut.

---

## Projektant wnętrz Rzeszów – projekt wnętrza w stolicy Podkarpacia

Obsługuję klientów z Rzeszowa i okolic (Boguchwała, Głogów Małopolski, Świlcza, Tyczyn). Dojazd do klientów z Rzeszowa zajmuje mi około 45–60 minut.

---

## Ile kosztuje projekt wnętrza w Krosnie i Rzeszowie?

| Pakiet | Cena | Przykład: dom 120m² |
|--------|------|---------------------|
| Koncepcyjna | 120 zł/m² | ok. 14 400 zł |
| Komfortowa | 150 zł/m² | ok. 18 000 zł |
| Kompleksowa | 170 zł/m² | ok. 20 400 zł |

Warto pamiętać, że dobry projekt zazwyczaj **oszczędza pieniądze** podczas realizacji – eliminuje błędy, optymalizuje zakupy materiałów i pozwala uniknąć kosztownych zmian w trakcie remontu.

---

## Jak wybrać dobrego projektanta wnętrz na Podkarpaciu?

**1. Portfolio realizacji** – Poproś o przykłady wykonanych projektów.

**2. Jasna wycena i zakres** – Upewnij się, że wiesz dokładnie, co dostajesz.

**3. Komunikacja** – Sprawdź, czy projektantka jest dostępna i odpowiada na wiadomości.

**4. Lokalna znajomość rynku** – Projektantka z Podkarpacia zna lokalnych wykonawców i realia cenowe.`,
  },
  "bledy-przy-urzadzaniu-mieszkania": {
    title: "10 najczęstszych błędów przy urządzaniu mieszkania – i jak ich uniknąć",
    metaTitle: "10 najczęstszych błędów przy urządzaniu mieszkania – i jak ich uniknąć | AN Projekt",
    metaDesc: "Urządzasz mieszkanie i chcesz uniknąć kosztownych błędów? Oto 10 najczęstszych błędów przy urządzaniu wnętrz.",
    image: vizBedroomMural,
    category: "Błędy",
    date: "20 lutego 2026",
    readTime: "8 min",
    content: `## Dlaczego błędy przy urządzaniu są tak kosztowne

Meble można zmienić. Kafelki – znacznie trudniej. Układ gniazdek elektrycznych – praktycznie niemożliwy bez kucia ścian. I właśnie dlatego błędy popełnione na etapie planowania bolą najbardziej – bo zostają z Tobą na lata.

---

## Błąd 1 – Kupowanie mebli bez planu

Najczęstszy błąd ze wszystkich. Zanim cokolwiek kupisz, narysuj (choćby ręcznie na kartce) układ mebli w każdym pomieszczeniu.

---

## Błąd 2 – Za mały dywan

Dywan powinien być pod wszystkimi nogami mebli tworzących strefę wypoczynkową. Wybierz tańszy model w odpowiednim rozmiarze zamiast drogiego, ale za małego.

---

## Błąd 3 – Brak planowania oświetlenia

Dobre oświetlenie składa się z trzech warstw:
- Oświetlenie ogólne (sufitowe, do orientacji w przestrzeni)
- Oświetlenie funkcjonalne (do czytania, nad blatem kuchennym)
- Oświetlenie dekoracyjne (lampki, led-strip, kinkiety)

---

## Błąd 4 – Gniazdka elektryczne w złych miejscach

Lista pytań przed ustaleniem rozkładu gniazdek:
- Gdzie będzie stać telewizor?
- Gdzie sofa – czy będzie lampka na stoliku?
- Gdzie biurko i czy potrzebuję gniazdka w podłodze?
- Gdzie łóżko i czy będą ładowarki po obu stronach?

---

## Błąd 5 – Zły dobór kolorów

Jak uniknąć tego błędu:
- Zawsze maluj próbki – minimum formatu A4
- Sprawdź kolor o różnych porach dnia
- Zestawić próbkę z materiałami, które już masz

---

## Błąd 6 – Za dużo dekoracji

Zasada: mniej, lepiej, drożej. Kilka dobrze dobranych dekoracji robi więcej niż tona przypadkowych bibelotów.

---

## Błąd 7 – Brak strefy przechowywania

Zanim zaczniesz projektować wnętrze, policz, ile masz rzeczy i gdzie chcesz je trzymać.

---

## Błąd 8 – Ignorowanie proporcji

Zanim kupisz mebel, sprawdź jego wymiary w stosunku do reszty pomieszczenia. Wysokość stolika kawowego powinna być zbliżona do wysokości siedziska sofy.

---

## Błąd 9 – Mieszanie stylów bez spójnej koncepcji

Jeśli nie masz doświadczenia w projektowaniu, zacznij od jednego stylu i konsekwentnie go rozwijaj.

---

## Błąd 10 – Pomijanie okien i zasłon

Zasłony wieszaj blisko sufitu i pozwól im opadać do podłogi. Krótkie zasłony wiszące na poziomie okna optycznie obniżają pomieszczenie.

---

## Podsumowanie

Większości z tych błędów można uniknąć, jeśli przed zakupami i remontem powstaje plan funkcjonalny wnętrza. Jeśli chcesz mieć pewność, że Twoje wnętrze wyjdzie tak jak zaplanowałeś – warto skorzystać z pomocy projektantki wnętrz.`,
  },
  "remont-mieszkania-bledy-planowanie": {
    title: "Dlaczego remont mieszkania wymyka się spod kontroli – błędy w planowaniu, które kosztują najwięcej",
    metaTitle: "Dlaczego remont mieszkania wymyka się spod kontroli – błędy w planowaniu | AN Projekt",
    metaDesc: "Remont, który miał kosztować 80 tys., kończy się na 130 tys. Tłumaczę, jakie błędy w planowaniu remontu kosztują najwięcej.",
    image: vizBathroomMarble,
    category: "Błędy",
    date: "15 lutego 2026",
    readTime: "7 min",
    content: `## Skąd się bierze chaos przy remoncie

Remont to nie jest skomplikowany proces – ale wymaga odpowiedniego przygotowania. Większość problemów pojawia się nie dlatego, że coś się „posypało", ale dlatego, że ktoś nie zaplanował z wyprzedzeniem.

---

## Błąd 1 – Brak projektu przed startem remontu

To jest błąd numer jeden. Efekt? W trakcie remontu okazuje się, że:
- Gniazdka elektryczne są nie tam, gdzie powinny
- Płytki zostały zamówione w złym rozmiarze
- Okap kuchenny ma być tam, gdzie już poprowadzono instalację
- Meble nie wchodzą przez drzwi lub są za duże do pomieszczenia

Koszt zmian w trakcie remontu jest od 3 do 10 razy wyższy niż koszt zaplanowania tego z góry.

---

## Błąd 2 – Zbyt optymistyczny budżet bez rezerwy

Zasada: do każdego budżetu remontowego dodaj 15–20% rezerwy. Jeśli jej nie wykorzystasz – świetnie.

---

## Błąd 3 – Zmiany decyzji w trakcie remontu

Każda zmiana podjęta w trakcie remontu kosztuje. Do tego służy projekt wnętrza – żebyś mógł zobaczyć efekt końcowy na wizualizacjach zanim cokolwiek zostanie zrobione.

---

## Błąd 4 – Zła kolejność prac remontowych

Prawidłowa kolejność prac remontowych:
1. Wyburzenia i zmiany układu ścian
2. Instalacje: elektryczna, hydrauliczna, wentylacja
3. Tynki i wylewki
4. Okna i drzwi
5. Izolacje (jeśli potrzebne)
6. Podłogi (warstwa bazowa)
7. Zabudowy g-k, wnęki, zabudowa mebli na wymiar
8. Wykończenie ścian (płytki, malowanie)
9. Podłogi (wykończenie)
10. Montaż mebli i wyposażenia
11. Oświetlenie i osprzęt elektryczny
12. Dekoracje i stylizacja

---

## Błąd 5 – Brak koordynacji między wykonawcami

Brak koordynacji to jeden z głównych powodów, dla których remonty trwają 3 razy dłużej niż planowano. W moim Pakiecie Kompleksowa oferuję 3 spotkania nadzorujące, które pomagają utrzymać porządek na budowie.

---

## Błąd 6 – Kupowanie materiałów bez sprawdzenia dostępności

Zawsze zamawiaj materiały z 10–15% nadwyżką i sprawdzaj termin dostępności przed podjęciem decyzji.

---

## Błąd 7 – Oszczędzanie na wykonawcy

Najtańsza oferta rzadko okazuje się najtańsza po zakończeniu remontu. Poprawki po niedoświadczonej ekipie kosztują – i to drogo.`,
  },
  "bledy-projektowanie-kuchni-salonu": {
    title: "Najczęstsze błędy przy projektowaniu kuchni i salonu – czego właściciele żałują po remoncie",
    metaTitle: "Najczęstsze błędy przy projektowaniu kuchni i salonu | AN Projekt",
    metaDesc: "Źle zaplanowana kuchnia to jeden z największych problemów po remoncie. Oto najczęstsze błędy, których warto uniknąć.",
    image: vizKitchenRattan,
    category: "Błędy",
    date: "10 lutego 2026",
    readTime: "7 min",
    content: `## Dlaczego kuchnia i salon to dwa najtrudniejsze pomieszczenia do zaprojektowania

Kuchnia i salon to pomieszczenia, w których spędzasz najwięcej czasu. To też pomieszczenia, w których błędy projektowe są najbardziej odczuwalne – każdego dnia.

---

## KUCHNIA – najczęstsze błędy

### Błąd 1 – Zły trójkąt roboczy

Trójkąt roboczy to rozmieszczenie trzech kluczowych elementów kuchni: zlewu, lodówki i kuchenki. Najczęstszy błąd: wszystkie trzy elementy ustawione w jednej linii, zbyt daleko od siebie.

### Błąd 2 – Za mało miejsca na blacie

Minimalna długość blatu roboczego to 60 cm po obu stronach płyty i minimum 45 cm po jednej stronie zlewu.

### Błąd 3 – Brak oświetlenia roboczego

Oświetlenie robocze pod górnymi szafkami (led-strip lub listwa świetlna) to absolutne minimum w każdej kuchni.

### Błąd 4 – Złe fronty do intensywnego użytkowania

Matowe fronty wyglądają elegancko, ale każdy dotyk zostawia na nich ślad. Warto zapytać projektantkę o fronty odporne na zabrudzenia i wilgoć.

### Błąd 5 – Zła lokalizacja zmywarki

Zmywarka powinna stać przy zlewie – najlepiej bezpośrednio obok.

### Błąd 6 – Za mało gniazdek elektrycznych

Standard to minimum 4–5 gniazdek nad blatem roboczym.

---

## SALON – najczęstsze błędy

### Błąd 1 – Zła orientacja sofy

Optymalna pozycja sofy: równolegle do okna lub pod kątem 45°.

### Błąd 2 – Telewizor za wysoko

Optymalnie: środek ekranu na wysokości 100–110 cm od podłogi.

### Błąd 3 – Za mały dywan

Dywan w salonie powinien być pod wszystkimi nogami mebli strefy wypoczynkowej.

### Błąd 4 – Brak stref oświetleniowych

Salon potrzebuje:
- Oświetlenia ogólnego (sufitowe, plafon)
- Oświetlenia strefy czytania (lampa podłogowa lub kinkiet)
- Oświetlenia dekoracyjnego (świeczniki, led-strip za telewizorem)

### Błąd 5 – Brak miejsca do przechowywania

Zaplanuj przechowywanie jako część projektu salonu, a nie dodatek na końcu.

### Błąd 6 – Stolik kawowy nieodpowiedni do sofy

Stolik kawowy powinien mieć wysokość zbliżoną do wysokości siedziska sofy (zazwyczaj 40–45 cm).`,
  },
  "co-robi-dobry-projektant-wnetrz": {
    title: "7 rzeczy, które robi dobry projektant wnętrz – i których nie zrobi sam IKEA ani YouTube",
    metaTitle: "7 rzeczy, które robi dobry projektant wnętrz – i których nie zrobi sam IKEA ani YouTube | AN Projekt",
    metaDesc: "Zastanawiasz się, czy warto zatrudnić projektanta wnętrz? Oto 7 konkretnych rzeczy, które robi dobra projektantka – a których nie zastąpią sklepy meblowe ani tutoriale.",
    image: vizBedroomDark,
    category: "Porady",
    date: "5 lutego 2026",
    readTime: "9 min",
    content: `## Dlaczego coraz więcej osób szuka projektanta zamiast urządzać samodzielnie?

Rosnące koszty błędów, brak czasu, przytłaczająca liczba wyborów – to główne powody. Projektant wnętrz to nie luksus. To oszczędność czasu i pieniędzy, bo pomaga uniknąć kosztownych pomyłek, które przy samodzielnym urządzaniu zdarzają się bardzo często.

---

## 1. Projektuje układ, nie tylko wygląd

- Funkcjonalność przed estetyką – dobry projekt zaczyna się od pytania „jak żyjesz?", a nie „jaki kolor ścian?"
- Ruch w mieszkaniu: jak poruszają się domownicy, gdzie się mijają, co blokuje
- Strefy: praca / odpoczynek / jedzenie / sen – każda wymaga innej przestrzeni
- Tego nie zrobi IKEA: sklep sprzedaje meble, nie rozwiązuje problemów przestrzennych

---

## 2. Widzi całość zanim cokolwiek powstanie

- Wizualizacje 3D pokazują efekt końcowy przed remontem
- Brak przykrych niespodzianek na etapie realizacji
- Klient decyduje świadomie, nie „na wiarę"

---

## 3. Dobiera materiały, kolory i faktury w spójną całość

- Moodboard materialny: podłoga + ściany + meble + tekstylia + oświetlenie
- Proporcje kolorów (zasada 60-30-10)
- Czego unika dobry projektant: przypadkowe zestawienia, które „osobno są ładne, razem nie działają"

---

## 4. Przewiduje błędy zanim wydasz pieniądze

- Elektryka, hydraulika, wentylacja – to trzeba zaplanować PRZED tynkami
- Błąd za 3 000 zł na etapie projektu = błąd za 30 000 zł po remoncie
- Konkretny przykład: gniazdka za kanapą, okap bez wentylacji, za mała łazienka

---

## 5. Zna lokalnych wykonawców i dostawców

- Sprawdzeni fachowcy = mniej ryzyka
- Zniżki u dostawców materiałów (często projekt zwraca się na zakupach)
- Koordynacja ekip: kto kiedy, w jakiej kolejności

---

## 6. Oszczędza Twój czas i energię psychiczną

- Tysiące decyzji przy remoncie: projektantka je strukturyzuje
- Zamiast 40 godzin researchu – 2 spotkania i masz odpowiedzi
- Efekt: mniej stresu, szybszy remont, lepszy wynik

---

## 7. Odpowiada za efekt końcowy

- Projektantka nie znika po oddaniu pliku PDF
- Pakiet Kompleksowa: 3 spotkania nadzorujące na budowie
- Pilnuje, żeby efekt był zgodny z projektem

---

## A co z YouTube i IKEA?

- YouTube: świetne do inspiracji, złe do planowania konkretnej przestrzeni
- IKEA: dobry sklep, zły projektant (sprzedaje własne produkty, nie Twoje potrzeby)
- Połączenie obu bez projektanta = ryzyko chaotycznego efektu

---

## Dla kogo projektant wnętrz się opłaca najbardziej?

- Nowe mieszkanie z deweloperki (wszystko od zera)
- Generalny remont (duże pieniądze, jedna szansa)
- Trudna przestrzeń (mała, ciemna, nieregularna)
- Ktoś kto ceni swój czas i nie lubi podejmować setek decyzji

---

## Najczęstsze pytania

**Czy projektant wnętrz jest tylko dla bogatych?**
Nie – projekt wnętrza to koszt 120–170 zł/m², który zazwyczaj zwraca się w lepszych decyzjach zakupowych i unikniętych błędach.

**Czy mogę samodzielnie urządzić mieszkanie bez projektanta?**
Tak, jeśli masz czas, cierpliwość i doświadczenie. Warto rozważyć przynajmniej konsultację (1h), która kosztuje znacznie mniej niż pełny projekt.

**Czym różni się projektant wnętrz od architekta?**
Architekt projektuje budynki i konstrukcję. Projektant wnętrz zajmuje się przestrzenią wewnątrz – układem, materiałami, kolorami, oświetleniem i wyposażeniem.

**Czy projektantka z Podkarpacia dojedzie do mnie?**
Tak – AN Projekt obsługuje Podkarpacie (Krosno, Rzeszów) i Małopolskę (Nowy Sącz).`,
  },
  "jak-dobrac-kolory-materialy-do-wnetrza": {
    title: "Jak dobrać kolory, materiały i dodatki do wnętrza – zasady, które działają zawsze",
    metaTitle: "Jak dobrać kolory, materiały i dodatki do wnętrza – zasady, które działają zawsze | AN Projekt",
    metaDesc: "Nie wiesz jak dobrać kolory i materiały do swojego wnętrza? Tłumaczę zasady doboru kolorystyki, faktur i dodatków – po ludzku, bez żargonu.",
    image: vizClosetMarble,
    category: "Porady",
    date: "1 lutego 2026",
    readTime: "8 min",
    content: `## Dlaczego dobór kolorów sprawia tyle trudności?

Brak kontekstu: kolor na próbniku wygląda inaczej niż na ścianie, światło zmienia wszystko, trendy z Instagrama działają tylko w studiu fotograficznym. Dlatego warto poznać kilka zasad, które sprawdzają się niezależnie od stylu.

---

## Zasada 60-30-10 – fundament każdej kolorystyki

- 60%: kolor dominujący (ściany, podłogi, duże meble)
- 30%: kolor uzupełniający (sofa, zasłony, zabudowa)
- 10%: kolor akcentowy (poduszki, rośliny, obrazy, lampy)
- Przykład: biel (60%) + szarość (30%) + złoto (10%)
- Przykład: beż (60%) + brąz naturalny (30%) + zielony (10%)

---

## Ciepłe vs. zimne kolory – jak światło zmienia wszystko

- Kierunek świata a dobór kolorów (pokój na północ vs. południe)
- Jak sprawdzić kolor w swoim świetle przed zakupem
- Które kolory optycznie powiększają, a które zmniejszają przestrzeń

---

## Jak dobierać materiały i faktury?

- Zasada 3 faktur: nie więcej niż 3 różne materiały w jednym pomieszczeniu
- Popularne zestawienia które działają:
- Drewno + tkanina + metal (styl modern classic, Japandi)
- Beton + skóra + drewno (industrial)
- Marmur + biel + rattan (boho premium)
- Len + biel + drewno jasne (skandynawski minimalizm)
- Czego unikać: łączenie zbyt wielu wzorów i faktur naraz

---

## Jak dobrać podłogę do reszty wnętrza?

- Podłoga to baza – dobierasz ją pierwsza
- Jasna podłoga: optycznie powiększa, ale zbiera kurz
- Ciemna podłoga: elegancka, przytłaczająca w małych pokojach
- Układ desek: poziomy (poszerza) vs. ukośny (dynamizuje)

---

## Jak dobrać dodatki żeby nie wyglądało chaotycznie?

- Zasada grupowania: dekoracje w grupach po 3 (różne wysokości)
- Rośliny: zawsze działają – dodają życia i miękkości
- Jak nie przesadzić z dekoracjami (mniej = więcej)
- Złota zasada: każdy detal powinien mieć powód żeby tam być

---

## Trendy 2025/2026 w kolorach i materiałach wnętrz

- Kolory: zieleń butelkowa, terakota, ciepły brąz, kremowa biel
- Materiały: rattan, len, trawertyn, mosiądz szczotkowany
- Odejście od: szarego betonu, zimnej stali, sterylnej bieli
- Trend trwały: naturalne materiały, zrównoważone wybory

---

## Najczęstsze pytania

**Ile kolorów może być w jednym pokoju?**
Maksymalnie 3–4 kolory, w proporcjach 60-30-10. Więcej kolorów = chaos wizualny.

**Czy mogę mieć kolorowe ściany w małym pokoju?**
Tak, ale ostrożnie. Jeden kolorowy akcent (jedna ściana) często działa lepiej niż malowanie całego pokoju.

**Jak sprawdzić czy kolor ściany będzie pasował do moich mebli?**
Zamów próbnik koloru (20×20 cm) i obserwuj go przez 2 dni w różnym świetle – rano, w południe i wieczorem przy sztucznym oświetleniu.

**Czy projektantka pomaga przy doborze kolorów i materiałów?**
Tak – dobór kolorystyki i moodboard materialny jest częścią każdego pakietu AN Projekt.`,
  },
  "checklista-przed-remontem-mieszkania": {
    title: "Checklista przed remontem mieszkania lub domu – 27 pytań, które musisz zadać sobie przed startem",
    metaTitle: "Checklista przed remontem mieszkania lub domu – 27 pytań przed startem | AN Projekt",
    metaDesc: "Planujesz remont? Sprawdź checklistę 27 pytań, które musisz zadać sobie zanim zaczniesz. Oszczędź czas, nerwy i pieniądze.",
    image: vizDetailCeramics,
    category: "Porady",
    date: "25 stycznia 2026",
    readTime: "10 min",
    content: `## Dlaczego większość remontów wymyka się spod kontroli?

Brak planu, zbyt wczesne decyzje zakupowe, zmiany „w trakcie" = koszty × 3. Jeśli nie wiesz od czego zacząć, ta checklista pomoże Ci ogarnąć wszystko zanim wejdą ekipy.

---

## BLOK 1 – Planowanie i zakres (pytania 1–7)

1. Czy masz określony zakres prac? (co dokładnie remontujesz)
2. Czy masz projekt wnętrza lub przynajmniej rzut z wymiarami?
3. Czy wiesz, które ściany są nośne i których nie możesz ruszyć?
4. Czy znasz stan instalacji elektrycznej i hydraulicznej?
5. Czy planujesz zmianę układu pomieszczeń?
6. Czy masz pozwolenia, jeśli są wymagane?
7. Czy ustaliłeś priorytety: co musisz, co chcesz, co byłoby fajne?

---

## BLOK 2 – Budżet i finanse (pytania 8–13)

1. Jaki jest Twój całkowity budżet na remont?
2. Czy masz bufor awaryjny (minimum 15–20% ponad budżet)?
3. Czy wiesz, ile kosztują materiały które chcesz użyć?
4. Czy porównałeś minimum 3 wyceny wykonawców?
5. Czy masz umowę z wykonawcą z harmonogramem płatności?
6. Czy wiesz, co jest w cenie wykonawcy a co musisz kupić sam?

---

## BLOK 3 – Materiały i zakupy (pytania 14–19)

1. Czy masz wybrany styl i kolorystykę całego wnętrza?
2. Czy masz moodboard materialny (podłoga, ściany, meble, oświetlenie)?
3. Czy zamówiłeś próbniki kolorów i materiałów?
4. Czy sprawdziłeś czasy dostaw (płytki, okna, drzwi, meble na wymiar)?
5. Czy kupiłeś materiały z nadmiarem (podłogi, płytki min. +10%)?
6. Czy masz zaplanowane oświetlenie (punkty świetlne, gniazdka)?

---

## BLOK 4 – Wykonawcy i harmonogram (pytania 20–24)

1. Czy masz potwierdzonego generalnego wykonawcę lub koordynatora?
2. Czy znasz kolejność prac (hydraulika → elektryka → tynki → podłogi)?
3. Czy masz harmonogram z datami dla każdej ekipy?
4. Czy wiesz, gdzie będziesz mieszkać w trakcie remontu?
5. Czy masz plan na przechowanie mebli i dobytku?

---

## BLOK 5 – Ostatnie pytania przed startem (pytania 25–27)

1. Czy wszystkie decyzje projektowe są podjęte zanim zaczną ekipy?
2. Czy masz kontakt do koordynatora/projektantki na czas remontu?
3. Czy zrobiłeś zdjęcia dokumentacyjne przed startem?

---

## Ile punktów odhaczyłeś?

- **25–27:** Jesteś gotowy. Remont powinien przebiec sprawnie.
- **18–24:** Kilka luk. Uzupełnij zanim zaczniesz.
- **Poniżej 18:** Warto się zatrzymać i zaplanować dokładniej. Możesz potrzebować pomocy projektantki.

---

## Najczęstsze pytania

**Czy projektantka może pomóc przy planowaniu remontu?**
Tak – to jedno z głównych zadań projektantki wnętrz. Pakiet Kompleksowa obejmuje m.in. spotkania z wykonawcą i nadzór na budowie.

**Ile powinien wynosić budżet awaryjny przy remoncie?**
Minimum 15%, optymalnie 20% całkowitego budżetu remontowego.

**Od czego zacząć remont mieszkania?**
Od projektu wnętrza i ustalenia zakresu prac. Potem elektryka i hydraulika, tynki, podłogi, zabudowy, malowanie, meble, dekoracje.

**Czy można remontować bez projektu wnętrza?**
Można, ale to ryzykowne – większość kosztownych błędów (złe gniazdka, nieodpowiednie płytki, za mała kuchnia) wynika właśnie z braku projektu.`,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : null;
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop;
      const progress = Math.max(0, Math.min(1, scrolled / (articleHeight - window.innerHeight)));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

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

  const sections = parseMarkdownToSections(post.content);

  // Insert CTA banners at strategic positions
  const ctaPositions: { after: number; variant: "kontakt" | "realizacje" | "oferta" }[] = [];
  const h2Count = sections.filter(s => s.type === "h2").length;
  if (h2Count >= 4) {
    let h2Seen = 0;
    sections.forEach((s, i) => {
      if (s.type === "h2") h2Seen++;
      if (h2Seen === 3 && s.type === "h2") ctaPositions.push({ after: i - 1, variant: "realizacje" });
      if (h2Seen === Math.max(5, h2Count - 1) && s.type === "h2") ctaPositions.push({ after: i - 1, variant: "kontakt" });
    });
  }

  return (
    <main className="bg-background">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border/20">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

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

          <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-10">{post.title}</h1>

          {sections.map((section, i) => {
            // Check if CTA should be inserted before this section
            const ctaHere = ctaPositions.find(c => c.after === i - 1);

            return (
              <div key={i}>
                {ctaHere && <CtaBanner variant={ctaHere.variant} />}

                {section.type === "h2" && (
                  <h2 className="font-heading text-xl md:text-2xl text-foreground mt-10 mb-4">{section.content}</h2>
                )}
                {section.type === "h3" && (
                  <h3 className="font-heading text-lg text-foreground mt-6 mb-3">{section.content}</h3>
                )}
                {section.type === "p" && (
                  <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                    {renderInlineMarkdown(section.content || "")}
                  </p>
                )}
                {section.type === "ul" && (
                  <ul className="space-y-2 mb-6 ml-1">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-muted-foreground font-body text-base leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                        <span>{renderInlineMarkdown(item)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.type === "table" && (
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse font-body text-sm">
                      <thead>
                        <tr>
                          {section.headers?.map((h, j) => (
                            <th key={j} className="text-left py-3 px-4 bg-secondary text-foreground font-medium border-b border-border">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows?.map((row, j) => (
                          <tr key={j} className="border-b border-border/50">
                            {row.map((cell, k) => (
                              <td key={k} className="py-3 px-4 text-muted-foreground">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </FadeIn>

        {/* Bottom CTA */}
        <CtaBanner variant="kontakt" />

        {/* Related links */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/oferta" className="px-4 py-2 rounded-full bg-secondary text-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border/50">
            Sprawdź ofertę
          </Link>
          <Link to="/realizacje" className="px-4 py-2 rounded-full bg-secondary text-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border/50">
            Zobacz realizacje
          </Link>
          <Link to="/blog" className="px-4 py-2 rounded-full bg-secondary text-foreground font-body text-xs hover:bg-accent/10 transition-colors border border-border/50">
            Więcej artykułów
          </Link>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
