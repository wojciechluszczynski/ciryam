

## Domknięcie feedbacku Roberta - 13 punktów

Cel: dopiąć dokładnie listę Roberta. Bez nadinterpretacji, bez nowych feature'ów. Punkt po punkcie.

### Co konkretnie robię

**1. Nav / Logo (`Navbar.tsx`)**
Obecnie: sygnet na górze, fade do **pełnego logo** po scrollu. Robert: ZAWSZE sygnet. Usuwam swap - sygnet (`ciryam-sign-white.png`) w obu stanach, lekko większy (h-9 / md:h-11) żeby nie ginął. Mobile menu też tylko sygnet.

**2. Hero / Slider (`Index.tsx`)**
Przejście po 4 slajdach (`ciryam-band-2/3/4/5`), korekta `objectPosition` per slide tam gdzie ucina głowy. Słabe jakościowo - eliminuję z rotacji (lepsze 3 niż 4 średnie).

**3. Em-dash globalny cleanup**
265 wystąpień `—` w 20 plikach - sprzątam tylko CIRYAM (pomijam Ebook/Realizacje z innych projektów):
`OZespole`, `Index`, `Kontakt`, `PressKit`, `Muzyka`, `Koncerty`, `Aktualnosci`, `LangContext` (PL+EN), `Footer`, `StickyPlayer`, `Chatbot`, `InstagramFeed`.
Reguła: `—` → `-` lub przecinek/kropka zależnie od kontekstu (nie mechaniczny sed).

**4. O Zespole - tekst (`OZespole.tsx`)**
Pierwsze zdanie bez "w Krośnie":
*Rok 1999. Robert Węgrzyn zakłada CIRYAM. Od początku grają autorski rock - taki, którego chce się słuchać głośno.*
Drugi akapit przepisuję bez em-dasha i bez AI-fraz ("subtelna elektronika" wylatuje).
Bio członków - krócej i faktycznie. Jeśli nie znam faktów, zostaje tylko instrument + rok dołączenia, bez wymyślania hobby ("pasjonat fotografii i długich wypraw rowerowych" - typowe AI).

**5. Galeria O Zespole**
12 albumów hotlinkowanych zostaje. Sprawdzam czy URL-e dalej zwracają 200 (te z 2022/03 są ryzykowne - WordPress potrafi przemielać paths). Martwe podmieniam na inne z tego samego folderu.

**6. Klipy - kolejność (`Muzyka.tsx` + `Index.tsx`)**
Robert chce featured w kolejności: **1. Wataha, 2. Na niby, 3. Ślad**. Obecnie: Na niby, Ślad, Zabierz mnie. Przebudowuję:
```text
Featured: Wataha, Na niby, Ślad
Reszta chronologicznie: Zabierz mnie, Migotanie, W biegu, Noc, Alone, Venus EN, W Ciszy
```
Opisy klipów - przepisuję krócej, bez zmyślonych lokalizacji (np. "kręcony w opuszczonej fabryce" - bez potwierdzenia od Roberta to wycinam).

**7. Muzyka - 5 albumów (`Muzyka.tsx`)**
Pełna lista (potwierdzona z polskirock.eu + ciryam.pl/media/):
```text
1. Szepty dusz       (2004)
2. W sercu kamienia  (2006, Metal Mind Productions)
3. Człowiek motyl    (2008)
4. Desires           (2015, Lynx Music)
5. Zamyślony zapach  (2023, Lynx Music) - najnowszy
```
Tracklisty dla 2 brakujących pobiorę z `ciryam.pl/media/` w trakcie edycji.
Nagłówek "Trzy albumy, ponad 20 lat na scenie" → "Pięć albumów, 25 lat na scenie."
Globalny grep "3 albumy"/"trzy płyty" - jeśli gdziekolwiek, podmieniam na 5.

**8. Koncerty - grupowanie po latach (`Koncerty.tsx`)**
Sekcje per rok z headerem `<h3>` + badge liczby koncertów. Wewnątrz roku zostaje desc (od najnowszego w danym roku). Lata <2020 zwijalne (collapse), żeby strona nie ciągnęła się w nieskończoność.

**9. Press Kit (`PressKit.tsx`)**
- Usuwam `bandPhoto2` (`ciryam-band-2.jpg`). Zostaje tylko `bandPhoto1` (`ciryam-band-press-2025.jpg`) wycentrowane w `max-w-2xl mx-auto`.
- Piktogramy 24/32 → 32/40 + accent ring w tle (`p-3 rounded-full bg-accent/10`).
- Sekcja rider - lepszy alignment kolumn label/value.

**10. Kontakt / Booking (`Kontakt.tsx` + `PressKit.tsx`)**
Zgodnie z Twoją odpowiedzią:
```text
Management
Robert Węgrzyn
okoartmanagement@gmail.com
+48 605 103 072

Booking Manager
[TWOJE IMIĘ - placeholder]
[TWÓJ EMAIL - placeholder]
[TWÓJ TELEFON - placeholder]
```
Placeholdery z komentarzem `// TODO: uzupełnij dane Booking Manager` - wpiszesz mi je w kolejnej wiadomości i podstawiam. Dodaję klucze tłumaczeń `contact.management` / `contact.booking` w PL i EN.

**11. Typografia - ujednolicenie**
Wszystkie sekcje używają tego samego patternu: `<p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">LABEL</p>` + `<h2 className="font-heading text-3xl md:text-4xl text-foreground">`. Sprawdzam każdą sekcję, dorabiam gdzie brak.

**12. Cache / publish**
Po wdrożeniu informuję Cię, że trzeba kliknąć **Publish → Update** w Lovable (frontend zmiany nie deployują się auto), a Robert musi zrobić hard refresh (Ctrl+Shift+R) na ciryam.eu.

**13. Checklista + screenshoty**
Po wszystkim wracam ze screenshotami kluczowych miejsc: Navbar (top + scrolled), Hero, O Zespole tekst, Press Kit, Kontakt, Muzyka (top klipy + 5 albumów), Koncerty grupowanie. Żebyś jeden-do-jednego skonfrontował z Robertem.

### Pliki do edycji
- `src/components/Navbar.tsx`
- `src/pages/Index.tsx`, `OZespole.tsx`, `Muzyka.tsx`, `Koncerty.tsx`, `Kontakt.tsx`, `PressKit.tsx`
- `src/contexts/LangContext.tsx`
- `src/components/Footer.tsx`, `StickyPlayer.tsx`, `Chatbot.tsx`, `InstagramFeed.tsx`

### Czego NIE robię
- Nie buduję "arkusza kontaktów dla Roberta" (Robert: "nie wdrażać bez decyzji")
- Nie dodaję nowych zdjęć do bundle, nowych sekcji, nowych feature'ów
- Nie ruszam Aktualności / Sklep / Admin / Ebook (Robert ich nie wymienił)

### Szacunek
1 dłuższa iteracja, max 2 jeśli Robert zwróci kolejne korekty po weryfikacji.

