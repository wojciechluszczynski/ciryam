

## Poprawki strony CIRYAM

### 1. Hero — rozmiar zdjęć (slider startowy)
W `src/pages/Index.tsx` slajdy hero używają `object-[center_25%]`. To powoduje obcinanie głów na niektórych zdjęciach (kadry 2.jpeg, 3.jpeg). Zmiana: dla każdego ze zdjęć dobrać indywidualny `object-position` tak, by twarze pozostały widoczne (np. `center_55%` dla pionowego portretowego kadru, `center_30%` dla szerokich). Wprowadzimy mapę `heroSlides` z polami `{ src, position }` zamiast czystej tablicy URL-i — żeby slajd 2 i 3 nie ciął głów.

### 2. Pisownia "CIRYAM" — wszędzie wielkie litery
Audyt tekstów w `src/contexts/LangContext.tsx` (oba języki) plus skan komponentów na `Ciryam`/`ciryam` (poza adresami URL i e-mail). Zamiana wszystkich wystąpień nazwy zespołu na `CIRYAM` (np. „Skład" 4.jpeg → karta autora `Ciryam` na `CIRYAM`; również w opisach koncertów: `"Ciryam – trasa 25-lecia"` → `"CIRYAM — trasa 25-lecia"`). Wykluczamy domeny (`ciryam.pl`, `ciryam.eu`, mejle, slugi).

### 3. Opis klipu „Na niby" (5.jpeg)
Aktualnie: „Oficjalny teledysk do singla 'Na niby'. Klimatyczny klip kręcony w opuszczonej fabryce."
Nowy opis (PL): „Oficjalny teledysk do singla »Na niby«. Klip nakręcony w kulisach RCKP w Krośnie."
EN: „Official music video for the single »Na niby«. Filmed backstage at RCKP in Krosno."

### 4. Sekcja Wideo — wszystkie klipy z YT chronologicznie
Strona pobiera tylko 2 hard-coded klipy. Plan: rozszerzyć tablicę o pełną listę oficjalnych klipów CIRYAM z kanału YouTube, posortowane chronologicznie (najnowsze u góry). YouTube zablokował scrape (403), więc po przejściu w tryb edycji **zapytam Cię o pełną listę ID** lub poproszę o publiczny RSS kanału (`https://www.youtube.com/feeds/videos.xml?channel_id=...`) żeby pobrać listę programatycznie. Lista zostanie wbudowana statycznie (bez API key), z tytułami i datami.

### 5. „Słuchaj online" — usunięcie archaizmu (6.jpeg)
Tekst „CIRYAM ma na koncie trzy albumy studyjne… Najnowszy materiał »Dices«…" jest nieaktualny. Korekta w `LangContext.tsx` (klucze `music.page.desc2`, `music.seo.p1`, `music.seo.p2`, `about.page.p4`, `press.bio.p2` itp.):
- liczba albumów: **5**
- najnowszy album: **„Zamyślony zapach"**
Zaktualnione zdania w PL i EN, bez „Dices" jako najnowszego (może zostać jako pozycja w dyskografii, jeśli historycznie poprawna).

### 6. Sekcja Koncerty (7.jpeg) — chronologia od najstarszych
`src/pages/Koncerty.tsx` ma już pełne archiwum (~252 pozycji), ale sortowane od najnowszych do najstarszych. Zmiana: w sekcji „Archiwum koncertów" odwrócić kolejność (rosnąco wg `num` / daty — od #1 z 1999/2000 do najnowszych). Sekcja „Nadchodzące koncerty" pozostaje bez zmian (chronologicznie w przód).

### 7. Globalna korekta językowa
Audyt całej kopii (PL) — usunięcie znaków „—" (em dash, długa pauza) zastępując je „-" (myślnik) **lub** przeformułowanie zdań tak, by uniknąć typowej składni AI. Przykłady do przepisania:
- „od ciężkich riffów gitarowych po emocjonalne, wpadające w pamięć refreny" → „ciężkie riffy, mocne refreny — z energią, którą czuć od pierwszego dźwięku"
- „Każdy występ to dla nas coś więcej niż koncert — to wydarzenie…" → krótsze, bardziej naturalne zdania
- usunięcie listowych „od X po Y" i „nie tylko… ale też…" w kluczach: `about.p1-p3`, `about.page.p1-p4`, `concerts.page.desc1-2`, `music.page.desc1-2`, `music.seo.*`, `press.bio.*`, `why.*.desc`, `cta.desc`.

### Pliki, które zostaną zmienione
- `src/pages/Index.tsx` — slajdy hero (object-position per slide), opis klipu „Na niby", rozszerzona lista wideo
- `src/contexts/LangContext.tsx` — globalna korekta tekstów PL/EN (CIRYAM caps, 5 albumów, „Zamyślony zapach", przepisane zdania, em-dash → myślnik)
- `src/pages/Koncerty.tsx` — odwrócenie kolejności archiwum, zamiana „Ciryam" → „CIRYAM" w polu `event`
- ewentualnie inne komponenty ze stałą „Ciryam" (po skanie)

### Pytanie przed implementacją
Dla punktu 4 (wszystkie klipy YT chronologicznie) potrzebuję ID filmów z kanału. YT zablokował fetch. Jeśli chcesz, w trybie edycji spróbuję pobrać kanał przez RSS (`/feeds/videos.xml`); jeśli to też nie zadziała — poproszę Cię o wklejenie listy URL-i z YouTube (8-15 klipów). Akceptujesz?

