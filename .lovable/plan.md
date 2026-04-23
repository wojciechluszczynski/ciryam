

## Galeria w O Zespole - hotlink z ciryam.pl

### Strategia
Zero plików w repo. W `src/pages/OZespole.tsx` w tablicy `albums` zamiast importów lokalnych asetów wpisujemy bezpośrednie URL-e do zdjęć na `https://ciryam.pl/photos/...` (lub `/wp-content/uploads/...` - zależy co znajdę). Przeglądarka pobiera je z ich serwera, nasz bundle nie rośnie.

### Plan działania (w trybie edycji)

1. **Pobranie listy galerii i zdjęć z ciryam.pl/photos/**
   - `fetch_website` na stronę indeksu galerii + na każdy podalbum
   - Wyciągnięcie URL-i zdjęć (najczęściej `https://ciryam.pl/wp-content/uploads/YYYY/MM/...jpg`) i nazwiska fotografa
   - Wybór 6 najnowszych albumów × po 6 zdjęć

2. **Aktualizacja `src/pages/OZespole.tsx`**
   - Usunięcie obecnych importów `gallery-*` (te 12 lokalnych assetów zostawiamy w `src/assets/` na razie - nie kasujemy, bo Promo 2024/2022/2017 to dobre studyjne; możemy je też zhotlinkować jeśli wolisz pełnej spójności)
   - Rozszerzenie tablicy `albums` o 6 nowych sekcji historycznych z `cover` i `photos[]` jako stringi URL z ciryam.pl
   - Dla każdego zdjęcia: `loading="lazy"` (już jest) + `referrerPolicy="no-referrer"` na wypadek hotlink-protection
   - Zachowanie `credit` (np. "fot. Tomasz Sowa", "fot. Janusz Rechziegel")

3. **Fallback na błąd ładowania**
   - `onError` na `<img>`: w razie 403/404 ze starego serwera podmiana na placeholder (`/placeholder.svg`), żeby galeria nie pokazywała pustych kafli

### Ryzyka i jak je adresujemy

- **Hotlink protection / referer block** - sprawdzę nagłówkiem `Referer` czy ciryam.pl blokuje hotlinking. Jeśli tak, dam znać i wybierzemy inny wariant (najpewniej Lovable Cloud Storage).
- **Stary serwer padnie / migracja** - galeria zniknie. Akceptujesz świadomie.
- **Wolne ładowanie** - serwer ciryam.pl bez CDN może być wolny; lazy-load + thumbnaile w siatce 3-5 kolumn ograniczają to do ~6 jednoczesnych requestów.

### Pytanie do rozstrzygnięcia W TRAKCIE edycji
Po pobraniu listy z ciryam.pl/photos/ pokażę Ci, które 6 albumów wybrałem (z datami), żebyś potwierdził przed wstawieniem URL-i. Albumy promo (2024/2022/2017) zostawiamy lokalnie jak są, czy też hotlinkujemy?

### Pliki do edycji
- `src/pages/OZespole.tsx` - rozszerzenie tablicy `albums` o sekcje hotlinkowane (URL stringi zamiast importów)

Brak nowych plików w `src/assets/`.

