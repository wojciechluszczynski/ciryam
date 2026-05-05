## Co zmieniam

### 1. Koncerty – auto-filtr przyszłych dat (`src/pages/Koncerty.tsx`)
- Filtruję `concerts` po `new Date(date) >= dzisiaj` (z resetem godziny do 00:00).
- Jeśli lista pusta → komunikat w sekcji "Nadchodzące koncerty":
  - PL: "Nowe daty wkrótce. Śledź nas na Facebooku i Instagramie, lub napisz do nas bezpośrednio przez formularz kontaktowy."
  - EN: analogicznie
  - + 2 CTA: link do Kontakt + link do FB/IG
- Archiwum (`archivalConcerts`) zostaje bez zmian – ono i tak działa per rok.
- Klucze tłumaczeń: `concerts.empty.title`, `concerts.empty.desc`, `concerts.empty.cta` w `LangContext.tsx` (PL+EN).

### 2. Wataha – fallback z miniaturką YouTube
Problem: właściciel kanału YT wyłączył embed dla tego klipu. Iframe pokazuje "Film niedostępny".

Rozwiązanie ogólne (bo dotyczy potencjalnie też przyszłych klipów):
- Dodaję pole `embedDisabled: true` do obiektu klipu `Wataha` w obu listach (`src/pages/Index.tsx` linia 30 oraz `src/pages/Muzyka.tsx` linia 9).
- W komponencie odtwarzacza (`src/pages/Muzyka.tsx` ~linia 50-60 oraz `src/pages/Index.tsx` ~linia 240-250):
  - Jeśli `embedDisabled` → zamiast `<iframe>` renderuję klikalną miniaturkę: `https://img.youtube.com/vi/{id}/maxresdefault.jpg` z dużym przyciskiem play (akcent gold) i napisem "Obejrzyj na YouTube" / "Watch on YouTube".
  - Klik → otwiera `https://www.youtube.com/watch?v={id}` w nowej karcie (`target="_blank" rel="noopener"`).
  - Zachowuję `aspect-video` żeby layout się nie ruszał.
- Klucze tłumaczeń: `video.unavailable.cta` (PL: "Obejrzyj na YouTube" / EN: "Watch on YouTube").

### 3. Hero – bez zmian
W pliku jest już poprawna wersja. Cache po stronie przeglądarki – wymagam Ctrl+Shift+R po deploy.

## Pliki
- `src/pages/Koncerty.tsx` – filtr + fallback empty state
- `src/pages/Muzyka.tsx` – flaga `embedDisabled` + warunkowy render miniaturki
- `src/pages/Index.tsx` – to samo dla sekcji "Zobacz nas w akcji"
- `src/contexts/LangContext.tsx` – 4 nowe klucze tłumaczeń (PL+EN)

## Czego nie robię
- Nie ruszam hero (już jest poprawne).
- Nie tworzę osobnego komponentu `<YouTubePlayer />` – wstawiam fallback inline (mniej zmian, łatwiej przejrzeć). Jeśli okaże się że trzeba będzie więcej takich przypadków, zrefaktoruję w kolejnej iteracji.
- Nie usuwam Watahy z listy – tylko zmieniam sposób renderowania.
