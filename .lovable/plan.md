## Cel
Zsynchronizować tablicę `concerts` w `src/pages/Koncerty.tsx` (sekcja "upcoming") z oficjalnym archiwum z ciryam.pl. Po fixie wszystkie daty będą zgodne z prawdą historyczną — i tak są przeszłe (dziś 8.05.2026), więc UI pokaże empty state "Nowe daty wkrótce", ale kod nie będzie kłamał.

## Zmiany

### `src/pages/Koncerty.tsx` — tablica `concerts` (linie 9-28)
Zastępuję 18 błędnych wpisów dokładnymi danymi z ciryam.pl/archiwalne (pozycje 234–252):

```ts
const concerts = [
  { date: "2025-04-30", city: "Krosno", venue: "Stadion przy Legionów 1", ... },
  { date: "2025-05-24", city: "Sanok", venue: "Koncert charytatywny ZSM", ... },
  { date: "2025-05-30", city: "Kraków", venue: "Garage Pub", ... },
  { date: "2025-06-28", city: "Toruń", venue: "Festiwal Rocka Progresywnego", ... },
  { date: "2025-07-05", city: "Przegaliny Duże", venue: "Zlot Motocyklowy", ... },
  { date: "2025-07-19", city: "Polańczyk", venue: "Tawerna u Michała", ... },
  { date: "2025-07-27", city: "Wólka Podleśna", venue: "Imprezalia", ... },
  { date: "2025-08-01", city: "Polańczyk", venue: "Tawerna u Michała", ... },
  { date: "2025-08-02", city: "Gdów", venue: "Dni Ziemi Gdowskiej", ... },
  { date: "2025-08-10", city: "Chorkówka", venue: "Biesiada Karpacka", ... },
  { date: "2025-08-14", city: "Kolbuszowa", venue: "Spinacz Festival", ... },
  { date: "2025-08-16", city: "Biała Niżna", venue: "Urodziny", ... },
  { date: "2025-08-22", city: "Tyniec", venue: "Przystań pod Lutym Turem", ... },
  { date: "2025-08-23", city: "Leżajsk", venue: "Podkarpacki Festiwal Tatuażu", ... },
  { date: "2025-09-06", city: "Warszawa", venue: "Scream Fest", ... },
  { date: "2025-10-04", city: "Bytom", venue: "Klub Gotyk", ... },
  { date: "2025-11-09", city: "Bielsko-Biała", venue: "Klub Rude Boy", ... },
  { date: "2025-12-27", city: "Krosno", venue: "RCKP — Finał 25-lecia", ... },
  { date: "2026-02-15", city: "Przemyśl", venue: "Pub Niedźwiadek — Rockowe Love", ... },
];
```

Wpisy które wykasuję (nie istnieją w oficjalnym archiwum): Brzesko 30.08, Jarosław 13.09, Wrocław Liverpool 10.10.

### Co zostaje bez zmian
- `archivalConcerts` (linie 32+) — porównane z ciryam.pl/archiwalne, zgadza się.
- Logika filtra po dacie — nadal odsiewa przeszłe → strona pokaże empty state.
- `Index.tsx`, `LangContext.tsx` — bez zmian.

## Pliki
- `src/pages/Koncerty.tsx` (jeden patch na tablicę `concerts`)

## Czego nie robię
- Nie wymyślam nadchodzących koncertów na 2026 — ciryam.pl też nie ma żadnych ogłoszonych ("Nothing Found" na /events/upcoming-events).
- Nie ruszam archiwum — jest poprawne.
