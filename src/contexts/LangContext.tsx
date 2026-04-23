import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "pl" | "en";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
};

// All translations
const translations: Record<Lang, Record<string, string>> = {
  pl: {
    // Nav
    "nav.start": "Start",
    "nav.music": "Muzyka",
    "nav.concerts": "Koncerty",
    "nav.about": "O zespole",
    "nav.shop": "Sklep",
    "nav.news": "Aktualności",
    "nav.contact": "Kontakt",
    "nav.tickets": "Kup bilety",

    // Hero
    "hero.subtitle": "Polski zespół rockowy",
    "hero.desc": "Autorski rock.\nCiężkie riffy, mocne refreny.\nEnergia, którą czuć od pierwszego dźwięku.\nGramy w całej Polsce.",
    "hero.listen": "Posłuchaj",
    "hero.concerts": "Koncerty",

    // Stats
    "stats.years": "Lat na scenie",
    "stats.albums": "Albumów",
    "stats.concerts": "Koncertów",
    "stats.songs": "Nagranych utworów",
    "stats.km": "Kilometrów w trasie",
    "stats.onstage": "Na scenie",

    // Music section
    "music.label": "Dyskografia",
    "music.title": "Posłuchaj naszej muzyki",
    "music.desc": "CIRYAM łączy energię hard rocka z nowoczesną produkcją.\nGitarowe riffy, mocny rytm, melodie, które zostają w głowie.\nMamy na koncie pięć albumów. Najnowszy to „Zamyślony zapach\".",

    // Concerts section
    "concerts.label": "Na żywo",
    "concerts.title": "Najbliższe koncerty",
    "concerts.desc": "Każdy koncert CIRYAM to porcja mocnych emocji.\nSprawdź, kiedy gramy u Ciebie i zdobądź bilet, zanim wszystko się rozejdzie.",
    "concerts.tickets": "Bilety",
    "concerts.all": "Wszystkie koncerty",
    "concerts.buyTicket": "Kup bilet",
    "concerts.upcoming": "Nadchodzące koncerty",
    "concerts.archive": "Archiwum koncertów",

    // Gallery
    "gallery.label": "Galeria",
    "gallery.title": "Na scenie i poza nią",
    "gallery.desc": "Zdjęcia z koncertów, sesji i backstage'u. Tak wygląda CIRYAM od kulis.",

    // About section
    "about.label": "O zespole",
    "about.title": "Poznaj CIRYAM",
    "about.p1": "CIRYAM gra na polskiej scenie rockowej od 1999 roku.\nW naszym brzmieniu słychać klasyczny hard rock, ale dorzucamy do niego nowoczesną produkcję i melodyjne refreny.",
    "about.p2": "Mamy za sobą ponad 400 koncertów i pięć wydanych albumów.\nNajnowszy to „Zamyślony zapach\". Na scenie zostawiamy wszystko - inaczej nie potrafimy.",
    "about.p3": "Gramy festiwale, kluby, eventy prywatne i firmowe.\nW tekstach piszemy o tym, co naprawdę nas dotyka: emocjach, marzeniach, codzienności.",
    "about.cta": "Poznaj nas bliżej",

    // Why section
    "why.title": "Dlaczego CIRYAM?",
    "why.desc": "Nie gramy podróbek – tworzymy własną muzykę, która porusza i elektryzuje.",
    "why.originals": "Autorskie utwory",
    "why.originals.desc": "100% oryginalnej muzyki. Każdy riff, tekst i melodia to nasze dzieło – autentyczny rock bez kompromisów.",
    "why.energy": "Energia na żywo",
    "why.energy.desc": "Ponad 50 koncertów rocznie w całej Polsce. Nasza scena to miejsce, gdzie rock żyje – głośno, intensywnie, prawdziwie.",
    "why.merch": "Oficjalny merch",
    "why.merch.desc": "Koszulki, bluzy, płyty winylowe i CD. Noś CIRYAM z dumą – każdy zakup wspiera niezależną muzykę.",

    // Shop
    "shop.label": "Merch",
    "shop.title": "Sklep CIRYAM",
    "shop.desc": "Oficjalny merchandising zespołu. Koszulki, płyty, plakaty i więcej – wesprzyj niezależną muzykę!",
    "shop.visit": "Odwiedź sklep",
    "shop.add": "Dodaj",
    "shop.orderInfo": "Pełny sklep z płatnościami online wkrótce. Tymczasem zamówienia przez:",
    "shop.officialMerch": "Oficjalny merch",
    "shop.supportBand": "Koszulki, płyty, plakaty i więcej. Wspieraj zespół!",

    // CTA
    "cta.label": "Booking",
    "cta.title": "Zaproś CIRYAM na swój event",
    "cta.desc": "Gramy na festiwalach rockowych, w klubach muzycznych, na imprezach firmowych i prywatnych. Napisz do nas – przygotujemy ofertę dopasowaną do Twojego wydarzenia.",
    "cta.button": "Kontakt / Booking",

    // Video
    "video.label": "Wideo",
    "video.title": "Zobacz nas w akcji",
    "video.desc": "Teledyski, nagrania z koncertów i materiały zza kulis.\nPrzekonaj się, jak brzmi CIRYAM na żywo.",

    // Concerts page
    "concerts.page.title": "Koncerty CIRYAM",
    "concerts.page.desc1": "Każdy koncert CIRYAM to niepowtarzalne przeżycie – od małych, kameralnych klubów po wielkie festiwalowe sceny. Sprawdź najbliższe daty i kup bilet online, zanim się wyprzedadzą.",
    "concerts.page.desc2": "Gramy rock na żywo w całej Polsce – Kraków, Warszawa, Wrocław, Gdańsk, Rzeszów, Poznań i więcej. Zabierz znajomych i poczuj energię CIRYAM na własnej skórze.",
    "concerts.seo.title": "Koncerty rockowe w Polsce – CIRYAM na żywo",
    "concerts.seo.p1": "CIRYAM to jeden z najaktywniejszych koncertowo polskich zespołów rockowych. Gramy ponad 50 koncertów rocznie w największych miastach Polski – od Krakowa i Warszawy po Gdańsk i Poznań. Nasze koncerty to połączenie surowej energii hard rocka, autorskich utworów i nieszablonowej scenicznej ekspresji.",
    "concerts.seo.p2": "Bilety na koncerty CIRYAM dostępne są online oraz w dniu wydarzenia. Jeśli szukasz polskiego zespołu rockowego na festiwal, event firmowy lub imprezę prywatną – skontaktuj się z nami przez zakładkę Kontakt.",

    // Music page
    "music.page.title": "Muzyka CIRYAM",
    "music.page.desc1": "Autorski rock – od ciężkich riffów po melodyjne refreny. Posłuchaj naszych nagrań na wszystkich platformach streamingowych.",
    "music.page.desc2": 'CIRYAM ma na koncie pi\u0119\u0107 album\u00f3w studyjnych i dziesi\u0105tki singli. Najnowszy to „Zamy\u015blony zapach\" - p\u0142yta, na kt\u00f3rej hard rockowa energia spotyka si\u0119 z emocjonalnymi tekstami i wsp\u00f3\u0142czesnym brzmieniem.',
    "music.platforms": "Słuchaj na platformach",
    "music.seo.title": "O muzyce CIRYAM",
    "music.seo.p1": "CIRYAM to polski zespół rockowy, który od pierwszych akordów stawia na autentyczność. Nasze brzmienie czerpie z klasycznego hard rocka lat 70. i 80., ale nie boimy się nowoczesnych rozwiązań produkcyjnych. Efekt? Muzyka, która jest jednocześnie surowa i przystępna.",
    "music.seo.p2": 'Najnowszy album „Zamy\u015blony zapach\" to nasz najbardziej osobisty materia\u0142. Mocne riffy, ballady, teksty o tym, co siedzi w \u015brodku. P\u0142yta wci\u0105ga od pierwszego utworu i zostaje w g\u0142owie na d\u0142ugo.',
    "music.seo.p3": "Wszystkie nasze płyty dostępne są w formatach cyfrowych (Spotify, Apple Music, SoundCloud) oraz fizycznych (CD, winyl) w oficjalnym sklepie CIRYAM.",

    // About page
    "about.page.title": "CIRYAM – polski zespół rockowy",
    "about.who": "Kim jesteśmy",
    "about.page.p1": "CIRYAM to polski zespół rockowy założony w 1999 roku w Krośnie. Gramy autorski materiał - ciężkie riffy, melodyjne refreny i sceniczna energia, która nie zostawia słuchacza obojętnym, a do tego wszystkiego charyzmatyczna wokalistka.",
    "about.page.p2": "Na koncie mamy ponad 400 koncertów w całej Polsce - od kameralnych klubów po wielotysięczne festiwale.",
    "about.page.p3": "W dyskografii zespołu znajduje się pięć albumów studyjnych, w tym najnowszy „Zamyślony zapach\".",
    "about.page.p4": "CIRYAM to sprawdzony zespół na każdą scenę - gramy na festiwalach, w klubach, na eventach firmowych i prywatnych. Skład: Monika Węgrzyn (wokal), Robert Węgrzyn (gitary, lider), Kuba Czubik (gitara solowa), Jacek Rola (bas).",
    "about.founded": "Rok założenia",
    "about.studioAlbums": "Albumy studyjne",
    "about.concertsYear": "Koncertów rocznie",
    "about.fansOnline": "Fanów online",
    "about.followUs": "Śledź CIRYAM w social media",

    // Contact
    "contact.label": "Booking & Kontakt",
    "contact.title": "Napisz do nas",
    "contact.desc": "Booking koncertów, współpraca, media – odezwiemy się najszybciej jak to możliwe.",
    "contact.management": "CIRYAM Management",
    "contact.form.title": "Formularz kontaktowy",
    "contact.form.subtitle": "Wypełnij poniższe pola.",
    "contact.form.name": "Imię / Firma *",
    "contact.form.email": "E-mail *",
    "contact.form.phone": "Telefon",
    "contact.form.type": "Typ zapytania",
    "contact.form.message": "Twoja wiadomość... *",
    "contact.form.consent": "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie. *",
    "contact.form.send": "Wyślij wiadomość",
    "contact.form.sending": "Wysyłanie...",
    "contact.form.thanks": "Dzięki!",
    "contact.form.thanksDesc": "Twoja wiadomość dotarła. Odezwiemy się wkrótce.",
    "contact.form.urgent": "Jeśli to pilne, napisz na booking@ciryam.pl",
    "contact.form.required": "Proszę wypełnić wymagane pola i zaakceptować zgodę.",
    "contact.form.invalidEmail": "Proszę podać prawidłowy adres email.",
    "contact.form.success": "Wiadomość wysłana! Odezwiemy się wkrótce.",
    "contact.types.booking": "Booking koncertu",
    "contact.types.collab": "Współpraca",
    "contact.types.media": "Wywiad / Media",
    "contact.types.shop": "Sklep / Zamówienie",
    "contact.types.other": "Inne",

    // Footer
    "footer.desc": "Polski zespół rockowy. Gramy na żywo, nagrywamy płyty, robimy hałas.",
    "footer.nav": "Nawigacja",
    "footer.booking": "Booking & Kontakt",
    "footer.rights": "© 2026 CIRYAM. Wszelkie prawa zastrzeżone.",
    "footer.privacy": "Polityka prywatności",

    // Product names
    "product.tshirt": "Koszulka CIRYAM Logo",
    "product.hoodie": "Bluza CIRYAM Hoodie",
    "product.cd": "Płyta CD \"Dices\"",
    "product.vinyl": "Winyl \"Dices\" LP",
    "product.poster": "Plakat koncertowy A2",
    "product.beanie": "Czapka CIRYAM Beanie",
    "product.cat.clothing": "Odzież",
    "product.cat.music": "Muzyka",
    "product.cat.accessories": "Akcesoria",

    // Press Kit
    "press.title": "CIRYAM – Press Kit",
    "press.subtitle": "Materiały dla organizatorów koncertów, mediów i promotorów. Zdjęcia, rider techniczny i informacje o zespole.",
    "press.bio.title": "O zespole",
    "press.bio.p1": "CIRYAM to polski zespół rockowy założony w 1999 roku w Krośnie. Gramy autorski materiał - ciężkie riffy, melodyjne refreny i sceniczna energia, która nie zostawia słuchacza obojętnym, a do tego wszystkiego charyzmatyczna wokalistka. Na koncie mamy ponad 400 koncertów w całej Polsce - od kameralnych klubów po wielotysięczne festiwale.",
    "press.bio.p2": "W dyskografii zespołu znajduje się pięć albumów studyjnych, w tym najnowszy „Zamyślony zapach\". CIRYAM to sprawdzony zespół na każdą scenę - gramy na festiwalach, w klubach, na eventach firmowych i prywatnych. Skład: Monika Węgrzyn (wokal), Robert Węgrzyn (gitary, lider), Kuba Czubik (gitara solowa), Jacek Rola (bas).",
    "press.bio.founded": "Rok założenia",
    "press.bio.albums": "Albumy",
    "press.bio.concertsYear": "Koncertów/rok",
    "press.bio.totalConcerts": "Koncertów łącznie",
    "press.photos.title": "Zdjęcia promocyjne",
    "press.photos.desc": "Zdjęcia w wysokiej rozdzielczości do wykorzystania w materiałach promocyjnych. Kliknij, aby pobrać.",
    "press.photos.download": "Pobierz",
    "press.rider.title": "Rider techniczny",
    "press.rider.intro": "Zespół CIRYAM korzysta z własnego systemu odsłuchowego (in-ear monitoring). Poniżej skrócona wersja wymagań technicznych. Pełny rider do pobrania w PDF.",
    "press.rider.stage": "Scena",
    "press.rider.stageVal": "Min. 5×4 m, zadaszona w przypadku koncertów plenerowych",
    "press.rider.pa": "Nagłośnienie (PA)",
    "press.rider.paVal": "System o równomiernej charakterystyce, 115 dB SPL C na stanowisku realizatora, 40 Hz - 16 kHz, bez zniekształceń. Skalibrowany przed przyjazdem zespołu.",
    "press.rider.monitors": "Odsłuch",
    "press.rider.monitorsVal": "Zespół przyjeżdża z własnym systemem in-ear monitoring",
    "press.rider.lights": "Multimedia",
    "press.rider.lightsVal": "Ekran LED zamontowany centralnie z tyłu sceny (HDMI). Zespół przyjeżdża z własnym komputerem do wizualizacji.",
    "press.rider.backline": "Kanały (7 wejść)",
    "press.rider.backlineVal": "Wokal lead (własny mic), wokal + gitara Robert (SM58/Beta58), gitara Kuba (D.I), gitara Robert (D.I), bas Jacek (D.I), Soundcraft Main L+R (D.I)",
    "press.rider.channels": "Wizualizacje",
    "press.rider.channelsVal": "Podczas koncertu używane są wizualizacje. Przywozimy własny sprzęt (komputer, mikser). Potrzebny technik do ustawienia jasności ekranu.",
    "press.rider.note": "* Pełny rider techniczny do pobrania poniżej. Kontakt: okoartmanagement@gmail.com / +48 605 103 072 (Robert)",
    "press.contact.title": "Kontakt / Booking",
    "press.contact.desc": "Chcesz zaprosić CIRYAM na swój event? Skontaktuj się z naszym managementem.",
    "nav.press": "Press Kit",
  },
  en: {
    // Nav
    "nav.start": "Home",
    "nav.music": "Music",
    "nav.concerts": "Concerts",
    "nav.about": "About",
    "nav.shop": "Shop",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.tickets": "Get tickets",

    // Hero
    "hero.subtitle": "Polish rock band",
    "hero.desc": "Original rock music. Heavy riffs, melodic choruses and a stage presence that leaves no one indifferent. Touring across Poland.",
    "hero.listen": "Listen",
    "hero.concerts": "Concerts",

    // Stats
    "stats.years": "Years on stage",
    "stats.albums": "Albums",
    "stats.concerts": "Concerts",
    "stats.songs": "Recorded songs",
    "stats.km": "Kilometres on tour",
    "stats.onstage": "On stage",

    // Music section
    "music.label": "Discography",
    "music.title": "Listen to our music",
    "music.desc": "CIRYAM combines the energy of classic hard rock with modern production. Our songs are a mix of heavy guitar riffs, dynamic rhythms and melodies that stick in your head. From debut album to the latest release – each record is a step forward in our musical journey.",

    // Concerts section
    "concerts.label": "Live",
    "concerts.title": "Upcoming concerts",
    "concerts.desc": "Every CIRYAM concert is an unforgettable experience. Check when we're playing in your city and grab a ticket before they sell out.",
    "concerts.tickets": "Tickets",
    "concerts.all": "All concerts",
    "concerts.buyTicket": "Buy ticket",
    "concerts.upcoming": "Upcoming concerts",
    "concerts.archive": "Concert archive",

    // Video
    "video.label": "Video",
    "video.title": "Watch us in action",
    "video.desc": "Music videos, live recordings and behind-the-scenes footage. See what CIRYAM sounds like on stage.",

    // Gallery
    "gallery.label": "Gallery",
    "gallery.title": "On stage and beyond",
    "gallery.desc": "Photos from concerts, sessions and backstage. This is CIRYAM behind the scenes.",

    // About section
    "about.label": "About",
    "about.title": "Meet CIRYAM",
    "about.p1": "CIRYAM has been on the Polish rock scene since 1999. We mix the energy of classic hard rock with modern production and melodic choruses.",
    "about.p2": "We have over 400 concerts and five studio albums behind us. The latest one is „Zamyślony zapach\". On stage we leave everything - that's the only way we know.",
    "about.p3": "We play festivals, clubs and private events. Our lyrics talk about what really matters: emotions, dreams, everyday life.",
    "about.cta": "Get to know us",

    // Why section
    "why.title": "Why CIRYAM?",
    "why.desc": "We don't play covers – we create original music that moves and electrifies.",
    "why.originals": "Original songs",
    "why.originals.desc": "100% original music. Every riff, lyric and melody is our creation – authentic rock without compromise.",
    "why.energy": "Live energy",
    "why.energy.desc": "Over 50 concerts per year across Poland. Our stage is where rock lives – loud, intense, real.",
    "why.merch": "Official merch",
    "why.merch.desc": "T-shirts, hoodies, vinyl and CDs. Wear CIRYAM with pride – every purchase supports independent music.",

    // Shop
    "shop.label": "Merch",
    "shop.title": "CIRYAM Shop",
    "shop.desc": "Official band merchandise. T-shirts, records, posters and more – support independent music!",
    "shop.visit": "Visit shop",
    "shop.add": "Add",
    "shop.orderInfo": "Full online shop coming soon. For now, order via:",
    "shop.officialMerch": "Official merch",
    "shop.supportBand": "T-shirts, records, posters and more. Support the band!",

    // CTA
    "cta.label": "Booking",
    "cta.title": "Invite CIRYAM to your event",
    "cta.desc": "We play at rock festivals, music clubs, corporate and private events. Write to us – we'll prepare a custom offer for your event.",
    "cta.button": "Contact / Booking",

    // Concerts page
    "concerts.page.title": "CIRYAM Concerts",
    "concerts.page.desc1": "Every CIRYAM concert is a unique experience – from intimate club shows to big festival stages. Check upcoming dates and buy tickets online before they sell out.",
    "concerts.page.desc2": "We play live rock across Poland – Kraków, Warsaw, Wrocław, Gdańsk, Rzeszów, Poznań and more. Bring your friends and feel the CIRYAM energy.",
    "concerts.seo.title": "Rock concerts in Poland – CIRYAM live",
    "concerts.seo.p1": "CIRYAM is one of the most active touring Polish rock bands. We play over 50 concerts per year in major Polish cities. Our shows combine raw hard rock energy, original songs and unconventional stage expression.",
    "concerts.seo.p2": "Tickets for CIRYAM concerts are available online and at the door. If you're looking for a Polish rock band for a festival, corporate event or private party – contact us through the Contact page.",

    // Music page
    "music.page.title": "CIRYAM Music",
    "music.page.desc1": "Original rock – from heavy riffs to melodic choruses. Listen to our recordings on all streaming platforms.",
    "music.page.desc2": "CIRYAM has five studio albums and dozens of singles. The latest one, „Zamyślony zapach\", is our most personal record - hard rock energy meets emotional lyrics and contemporary sound.",
    "music.platforms": "Listen on platforms",
    "music.seo.title": "About CIRYAM's music",
    "music.seo.p1": "CIRYAM is a Polish rock band that prioritizes authenticity from the first chord. Our sound draws from classic hard rock of the 70s and 80s, but we're not afraid of modern production techniques. The result? Music that's both raw and accessible.",
    "music.seo.p2": "Our latest album „Zamyślony zapach\" is our most personal release. Heavy riffs, ballads, lyrics about what's really inside. The record pulls you in from the first track and stays with you.",
    "music.seo.p3": "All our albums are available in digital formats (Spotify, Apple Music, SoundCloud) and physical formats (CD, vinyl) at the official CIRYAM shop.",

    // About page
    "about.page.title": "CIRYAM – Polish rock band",
    "about.who": "Who we are",
    "about.page.p1": "CIRYAM is a Polish rock band founded in 1999 in Krosno. We play our own material - heavy riffs, melodic choruses and stage energy that grabs the listener, plus a charismatic frontwoman on top of it all.",
    "about.page.p2": "We've played over 400 concerts across Poland - from intimate clubs to festivals with tens of thousands of fans.",
    "about.page.p3": "Our discography includes five studio albums, with the latest being „Zamyślony zapach\".",
    "about.page.p4": "CIRYAM works on every stage - festivals, clubs, corporate and private events. Line-up: Monika Węgrzyn (vocals), Robert Węgrzyn (guitars, leader), Kuba Czubik (lead guitar), Jacek Rola (bass).",
    "about.founded": "Year founded",
    "about.studioAlbums": "Studio albums",
    "about.concertsYear": "Concerts per year",
    "about.fansOnline": "Online fans",
    "about.followUs": "Follow CIRYAM on social media",

    // Contact
    "contact.label": "Booking & Contact",
    "contact.title": "Write to us",
    "contact.desc": "Concert booking, collaboration, media – we'll get back to you as soon as possible.",
    "contact.management": "CIRYAM Management",
    "contact.form.title": "Contact form",
    "contact.form.subtitle": "Fill in the fields below.",
    "contact.form.name": "Name / Company *",
    "contact.form.email": "Email *",
    "contact.form.phone": "Phone",
    "contact.form.type": "Inquiry type",
    "contact.form.message": "Your message... *",
    "contact.form.consent": "I consent to the processing of my personal data in order to respond to my inquiry. *",
    "contact.form.send": "Send message",
    "contact.form.sending": "Sending...",
    "contact.form.thanks": "Thanks!",
    "contact.form.thanksDesc": "Your message has been received. We'll get back to you soon.",
    "contact.form.urgent": "If urgent, write to booking@ciryam.pl",
    "contact.form.required": "Please fill in all required fields and accept the consent.",
    "contact.form.invalidEmail": "Please provide a valid email address.",
    "contact.form.success": "Message sent! We'll get back to you soon.",
    "contact.types.booking": "Concert booking",
    "contact.types.collab": "Collaboration",
    "contact.types.media": "Interview / Media",
    "contact.types.shop": "Shop / Order",
    "contact.types.other": "Other",

    // Footer
    "footer.desc": "Polish rock band. We play live, record albums, make noise.",
    "footer.nav": "Navigation",
    "footer.booking": "Booking & Contact",
    "footer.rights": "© 2026 CIRYAM. All rights reserved.",
    "footer.privacy": "Privacy policy",

    // Product names
    "product.tshirt": "CIRYAM Logo T-Shirt",
    "product.hoodie": "CIRYAM Hoodie",
    "product.cd": "CD \"Dices\"",
    "product.vinyl": "Vinyl \"Dices\" LP",
    "product.poster": "Concert Poster A2",
    "product.beanie": "CIRYAM Beanie",
    "product.cat.clothing": "Clothing",
    "product.cat.music": "Music",
    "product.cat.accessories": "Accessories",

    // Press Kit
    "press.title": "CIRYAM – Press Kit",
    "press.subtitle": "Materials for concert organizers, media and promoters. Photos, technical rider and band information.",
    "press.bio.title": "About the band",
    "press.bio.p1": "CIRYAM is a Polish rock band founded in 1999 in Krosno. We play our own material - heavy riffs, melodic choruses and stage energy that grabs the listener, plus a charismatic frontwoman on top of it all. We've played over 400 concerts across Poland - from intimate clubs to festivals with tens of thousands of fans.",
    "press.bio.p2": "Our discography includes five studio albums, with the latest being „Zamyślony zapach\". CIRYAM works on every stage - festivals, clubs, corporate and private events. Line-up: Monika Węgrzyn (vocals), Robert Węgrzyn (guitars, leader), Kuba Czubik (lead guitar), Jacek Rola (bass).",
    "press.bio.founded": "Founded",
    "press.bio.albums": "Albums",
    "press.bio.concertsYear": "Concerts/year",
    "press.bio.totalConcerts": "Total concerts",
    "press.photos.title": "Press photos",
    "press.photos.desc": "High-resolution photos for use in promotional materials. Click to download.",
    "press.photos.download": "Download",
    "press.rider.title": "Technical rider",
    "press.rider.intro": "Minimum technical requirements for a CIRYAM concert. Details to be agreed individually with management.",
    "press.rider.stage": "Stage",
    "press.rider.stageVal": "Min. 5×4 m, covered for outdoor concerts",
    "press.rider.pa": "PA System",
    "press.rider.paVal": "Line array or point source system suited to venue size. Min. 2×2 kW RMS for clubs, 2×5 kW for outdoor.",
    "press.rider.monitors": "Monitors",
    "press.rider.monitorsVal": "Min. 4 stage wedges + 1 monitor mixer or in-ear system for vocalist",
    "press.rider.lights": "Lighting",
    "press.rider.lightsVal": "Minimum 8 moving heads + 4 LED pars + hazer/fog machine",
    "press.rider.backline": "Backline",
    "press.rider.backlineVal": "Band arrives with own backline (guitars, bass, effects). Required: drum kit, bass amp 300W+, 2x guitar combo 50W+",
    "press.rider.channels": "Mixer channels",
    "press.rider.channelsVal": "Min. 16 channels: drums (8), bass (1), 2x guitar (2), keys (2), lead vocal (1), 2x backing vocal (2)",
    "press.rider.note": "* Rider is approximate. Detailed technical requirements sent after concert confirmation. Contact: booking@ciryam.pl",
    "press.contact.title": "Contact / Booking",
    "press.contact.desc": "Want to invite CIRYAM to your event? Contact our management.",
    "nav.press": "Press Kit",
  },
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("ciryam-lang");
    return (saved === "en" ? "en" : "pl") as Lang;
  });

  const changeLang = (newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("ciryam-lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations["pl"][key] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LangContext.Provider>
  );
};
