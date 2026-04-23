

## Rozszerzenie galerii — wszystkie albumy z ciryam.pl (hotlink)

### Cel
Dorzucić pozostałe albumy z `ciryam.pl/photos/` do galerii w `src/pages/OZespole.tsx` na tej samej zasadzie co teraz: zero plików w repo, URL-e bezpośrednio z `https://ciryam.pl/wp-content/uploads/...`. Bundle nie rośnie.

### Co zrobię (w trybie edycji)

1. **Inwentaryzacja albumów** — `fetch_website` na `https://ciryam.pl/photos/` (index) i wejście w każdy podalbum, którego jeszcze nie mamy. Obecnie w kodzie jest 6 albumów (Pełczyce 2023, Krosno 2023, Brzozów 2022, Sesja 2022, Sanok 2018, Przeworsk 2018). Dorzucę wszystkie pozostałe które znajdę w `/photos/`.

2. **Wybór zdjęć per album**
   - Domyślnie **6 zdjęć / album** (spójnie z resztą), z preferencją dla najlepszych ujęć (większe rozdzielczości, ostre, reprezentatywne).
   - Jeśli album ma <6 zdjęć — biorę wszystkie.
   - Jeśli album ma dużo materiału (>20) — mogę zwiększyć do 8-10 dla najmocniejszych eventów (np. duże koncerty). Powiem Ci które przed wstawieniem.

3. **Aktualizacja `src/pages/OZespole.tsx`**
   - Rozszerzenie tablicy `albums` o nowe wpisy (cover + photos[] z URL stringami z `CDN`).
   - Kolejność: chronologicznie od najnowszych do najstarszych.
   - Każdy wpis: `id`, `title`, `subtitle` (data + fotograf jeśli znany), `cover`, `photos[]`.

4. **Sortowanie + UI**
   - Zachowanie obecnej siatki 2-4 kolumn okładek + lightbox.
   - Bez zmian w komponencie — tylko dane.

5. **Fallback na 403/404** — dodam `onError` na `<img>` w tile'ach galerii: jeśli serwer zwróci błąd, podmiana na `/placeholder.svg`. Galeria nie pokaże pustych kafli.

### Koszt
Najdroższe są `fetch_website` na każdy podalbum (1 call/album). Spodziewam się ~8-15 albumów do dociągnięcia ⇒ ~10-15 calli + 1 edycja pliku. Mieści się w rozsądnym budżecie (znacznie poniżej tego co wcześniej).

### Ryzyka
- **Hotlink protection** — już zweryfikowane (200 OK), działa.
- **Stary serwer padnie** — galeria znika. Migracja do Lovable Cloud Storage to potem 1 skrypt (upload bucketem `gallery`, podmiana `CDN` const).
- **Wolny serwer ciryam.pl** — lazy-load + thumbnaile w siatce ograniczają jednoczesne requesty.

### Pytanie do rozstrzygnięcia W TRAKCIE edycji
Po pobraniu listy z `/photos/` pokażę Ci ile albumów znalazłem i czy któryś chcesz pominąć (np. bardzo stare, słaba jakość fotek). Domyślnie biorę wszystko co znajdę.

### Pliki do edycji
- `src/pages/OZespole.tsx` — rozszerzenie tablicy `albums` + dodanie `onError` fallback na `<img>` w siatkach.

Brak nowych plików w `src/assets/`.

