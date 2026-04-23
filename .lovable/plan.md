

## Poprawki tekstów + Press Kit + Galeria

### 1. Tekst „Gdzie wszystko się zaczęło" (OZespole / About) — nowa wersja PL/EN
W `src/contexts/LangContext.tsx` zaktualizujemy klucze `about.page.p1`-`p4` (PL i EN). Pierwsze zdanie BEZ „w Krośnie" — Krosno wspominamy dopiero w kontekście założenia.

PL — dwa akapity zamiast czterech, naturalny ton:
- **p1**: „CIRYAM to polski zespół rockowy założony w 1999 roku w Krośnie. Gramy autorski materiał - ciężkie riffy, melodyjne refreny i sceniczna energia, która nie zostawia słuchacza obojętnym, a do tego wszystkiego charyzmatyczna wokalistka."
- **p2**: „Na koncie mamy ponad 400 koncertów w całej Polsce - od kameralnych klubów po wielotysięczne festiwale."
- **p3**: „W dyskografii zespołu znajduje się pięć albumów studyjnych, w tym najnowszy »Zamyślony zapach«."
- **p4**: „CIRYAM to sprawdzony zespół na każdą scenę - gramy na festiwalach, w klubach, na eventach firmowych i prywatnych. Skład: Monika Węgrzyn (wokal), Robert Węgrzyn (gitary, lider), Kuba Czubik (gitara solowa), Jacek Rola (bas)."

EN — odpowiedniki 1:1, też naturalne.

Te same teksty zasilą również **Press Kit** (`press.bio.p1`/`p2`) — przepisujemy w spójnej wersji.

### 2. Press Kit — wymiana zdjęcia (10.jpeg → 11.jpeg)
- Zapisujemy `user-uploads://11.jpeg` jako `src/assets/ciryam-band-press-2025.jpg`.
- W `src/pages/PressKit.tsx` (linie 74-76) podmieniamy `bandPhoto1` na nowy import. `bandPhoto2` zostaje (drugie zdjęcie, którego część widać na 10.jpeg po prawej stronie).

### 3. Press Kit — symetria nagłówków (9.jpeg)
Aktualnie `press.title` i `press.subtitle` są wycentrowane (`text-center`). Pozostałe nagłówki sekcji (`Zdjęcia promocyjne`, `Rider techniczny`, `O zespole`) są wyrównane do lewej z ikoną obok tekstu. Plan: przebudować nagłówki **„Zdjęcia promocyjne"** i **„Rider techniczny"** tak, by były:
- wyśrodkowane (`text-center`, `justify-center`)
- ikona w nowej linii **nad** tekstem (`flex-col items-center gap-3`)
- opis pod nagłówkiem również wyśrodkowany

Dla spójności zrobimy to samo z „O zespole" i „Kontakt" — wszystkie nagłówki sekcji w Press Kit będą miały tę samą strukturę: ikona u góry, tytuł pod nią, opis wycentrowany.

### 4. Galeria w O Zespole (12.jpeg) — pobranie zdjęć z ciryam.pl/photos/
W trybie edycji pobierzemy publiczne galerie ze starej strony (https://ciryam.pl/photos/). Plan:
- pobrać listę albumów + zdjęcia z każdego (Pełczyce 2023, Krosno Rynek 2023, Brzozów 2022, Sesja 2022, Sanok Biwak 2018, Dni Przeworska 2018 itd.)
- zapisać do `src/assets/gallery-archive-*.jpg`
- rozszerzyć tablicę `albums` w `src/pages/OZespole.tsx` o nowe sekcje historyczne

Uwaga: zdjęcia z ciryam.pl mogą być chronione prawami autorskimi (np. „fot. Tomasz Sowa", „fot. Janusz Rechziegel") — zachowamy podpisy `credit` w danych.

**Pytanie**: czy mam pobrać **wszystkie** dostępne galerie ze starej strony (~12 albumów, kilkaset zdjęć), czy ograniczyć do np. 5-6 najciekawszych? Większa ilość = większy bundle. Domyślnie zaproponuję **6 albumów** (po ~6 zdjęć), z opcją rozszerzenia.

### 5. Globalna spójność
- Sprawdzimy `Muzyka.tsx` (opisy „Klimatyczny klip kręcony w opuszczonej fabryce" itp. — typowy AI-styl) i przepiszemy na bardziej naturalne, krótkie zdania.
- Skrót `desc` przy każdym wideo: 1 zdanie, bez „od X po Y".

### Pliki do edycji
- `src/contexts/LangContext.tsx` — `about.page.p1-p4`, `press.bio.p1-p2` (PL+EN)
- `src/pages/PressKit.tsx` — nowy import zdjęcia + przebudowa nagłówków sekcji (centrowanie + ikona w osobnej linii)
- `src/assets/ciryam-band-press-2025.jpg` — nowe zdjęcie z `user-uploads://11.jpeg`
- `src/pages/OZespole.tsx` — rozszerzenie tablicy `albums` o galerie z ciryam.pl
- `src/assets/gallery-archive-*.jpg` — nowe zdjęcia z archiwum
- `src/pages/Muzyka.tsx` — przepisanie pól `desc` na naturalny ton

