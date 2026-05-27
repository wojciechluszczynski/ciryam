
# Plan: aktualizacja treści CIRYAM wg decyzji Roberta

Wprowadzam wyłącznie zmiany wynikające z odpowiedzi Roberta i niejednoznaczności z kolumny "Uwagi". Reszta tekstów zatwierdzona = bez ruszania. Wersja EN ujednolicona 1:1 z PL.

## 1. Skład zespołu (4 osoby, bez perkusisty)
Pliki: `src/pages/OZespole.tsx`, `src/pages/PressKit.tsx`, sekcja składu na stronie głównej (jeśli jest w `Index.tsx`).
- Usunąć Damiana Jurka z listy członków.
- Dodać krótką notę: "perkusja — sample / sekwencer (in-ear, laptop)" przy opisie zespołu lub w riderze.
- Zaktualizować EN bio (Press Kit) — 4 osoby.

## 2. Facebook — ujednolicić na `/CIRYAM`
Wyszukać i podmienić wszystkie `facebook.com/ciryamband` i `facebook.com/ciryam_official` (te są tylko na stronie Kontakt wg CSV wiersz 174) → `https://www.facebook.com/CIRYAM/?locale=pl_PL`.
Pliki kandydaci: `src/pages/Kontakt.tsx`, `src/components/Footer.tsx`, `src/pages/Muzyka.tsx`. Skan globalny przed edycją.

## 3. Instagram — ujednolicić na `/ciryam__official` (dwa podkreślniki)
Strona Kontakt ma `/ciryam_official` (jedno) — wg CSV poprawne jest `/ciryam__official`. Podmienić w `Kontakt.tsx`.

## 4. Usunąć CTA "Kup bilety" + linki kupbilecik
- Navbar (`src/components/Navbar.tsx`): usunąć przycisk "Kup bilety / Buy tickets" desktop + mobile (PL+EN).
- Strona Koncerty (`src/pages/Koncerty.tsx`): usunąć sekcję / przyciski linkujące do `kupbilecik.pl/baza/17722/CIryam/`. CTA "kup bilet" zamienić na ogólne "Skontaktuj się / Booking" prowadzące do `/kontakt`, albo usunąć.
- Tekst SEO koncertów: usunąć zdanie "Bilety na koncerty CIRYAM dostepne sa online…" — zostawić zaproszenie do kontaktu.
- EN ekwiwalent również.

## 5. Rider techniczny — zastąpić plik i zaktualizować datę
- Skopiować załączony `CIRYAM-RIDER_2026.pdf` do `public/CIRYAM-RIDER-2026.pdf`.
- W `src/pages/PressKit.tsx` zmienić link `href="/CIRYAM-RIDER-2024.pdf"` → `/CIRYAM-RIDER-2026.pdf` oraz etykietę "Pobierz pełny rider (PDF)" zostaje (PL+EN).
- Dane techniczne w UI (skrócony rider) są zgodne z PDF 2026 — bez zmian merytorycznych.
- Dopisać w sekcji "Multimedia" osobę kontaktową: "Wizualizacje: Kuba Czubik — +48 693 223 230" (z PDF, brakuje na stronie).
- Stary plik `public/CIRYAM-RIDER-2024.pdf` — usunąć, jeśli istnieje.

## 6. Statystyka 400 koncertów — pozostawić + doprecyzować
W miejscach gdzie pojawia się "400 koncertów" dodać podtytuł/tooltip: "łącznie z eventami i występami solowymi". Konkretnie: `Index.tsx` stat 3, `OZespole.tsx` stat 3, `PressKit.tsx` stat 4 (PL+EN przez `LangContext`).

## 7. Dyskografia
Bez zmian — zostaje po 5 utworów na album (potwierdzenie Roberta). Tylko usunąć z `Muzyka.tsx`/uwag wszelkie placeholdery sugerujące "uzupełnić".

## 8. Ujednolicenie EN
W `src/contexts/LangContext.tsx`:
- Wszystkie powyższe zmiany odzwierciedlone w kluczach `en.*`.
- Skład członków (jeżeli tłumaczone) — bez Damiana.
- Usunięcie kluczy CTA "Buy tickets" / "Tickets" tam, gdzie były dla kupbilecik.
- Komunikaty riderowe spójne PL/EN.

## 9. Drobiazgi z CSV (do potwierdzenia/zostawienia bez zmian)
Nie ruszam (brak decyzji Roberta lub kosmetyka):
- Slider hero (band 1–8), 25 lat, 65 utworów, 88 000 km, 101% — Robert nie zgłosił zmian.
- Vimeo — zostaje (brak decyzji o usunięciu).
- TikTok `@ciryam` w stopce — zostaje.
- Polityka prywatności — strona już istnieje (`PolitykaPrywatnosci.tsx`).
- Slogan "około 400 koncertów…" w hero/sekcji — pozostaje wg cytatu Roberta.

## 10. Raport końcowy
Po wdrożeniu wypiszę w odpowiedzi chat zwięzłą listę: plik → zmiana (PL/EN), aby Robert mógł zatwierdzić.

## Pliki do edycji (przewidywane)
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/pages/Index.tsx`
- `src/pages/OZespole.tsx`
- `src/pages/PressKit.tsx`
- `src/pages/Koncerty.tsx`
- `src/pages/Muzyka.tsx`
- `src/pages/Kontakt.tsx`
- `src/contexts/LangContext.tsx`
- `public/CIRYAM-RIDER-2026.pdf` (nowy)
- (usunięcie) `public/CIRYAM-RIDER-2024.pdf` jeśli istnieje

Minimalna liczba edycji, maksymalne wykorzystanie wyszukiwania `rg` aby nie pominąć żadnego wystąpienia. Tokeny oszczędzane przez batchowanie odczytów i punktowe patche zamiast przepisywania plików.
