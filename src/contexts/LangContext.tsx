import { createContext, useContext, useState, ReactNode } from "react";

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
    "hero.desc": "Autorski rock. Ciężkie riffy, melodyjne refreny i scena, która nie zostawia obojętnym. Gramy w całej Polsce.",
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
    "music.desc": "CIRYAM łączy energię klasycznego hard rocka z nowoczesną produkcją. Nasze utwory to mieszanka ciężkich riffów gitarowych, dynamicznych rytmów i melodii, które zostają w głowie. Od debiutanckiego albumu po najnowszy materiał – każda płyta to krok naprzód w naszej muzycznej podróży.",

    // Concerts section
    "concerts.label": "Na żywo",
    "concerts.title": "Najbliższe koncerty",
    "concerts.desc": "Każdy koncert CIRYAM to pełne emocji przeżycie. Sprawdź, kiedy gramy w Twoim mieście i zdobądź bilet, zanim się wyprzedadzą.",
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
    "about.p1": "CIRYAM to polski zespół rockowy, który od ponad 6 lat podbija scenę muzyczną w Polsce. Łączymy energię klasycznego hard rocka z nowoczesnym brzmieniem – od ciężkich riffów gitarowych po emocjonalne, zapadające w pamięć refreny.",
    "about.p2": "Na naszym koncie ponad 50 koncertów rocznie, trzy wydane albumy i tysiące fanów w całej Polsce. Każdy występ traktujemy jak niezapomniane wydarzenie – na scenie zostawiamy wszystko.",
    "about.p3": "Gramy na festiwalach, w klubach muzycznych i na imprezach prywatnych. Nasze teksty opowiadają o życiu bez filtrów – o emocjach, marzeniach i codziennych zmaganiach.",
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
    "video.desc": "Teledyski, nagrania z koncertów i materiały zza kulis. Przekonaj się, jak brzmi CIRYAM na żywo.",

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
    "music.page.desc2": 'CIRYAM ma na koncie trzy albumy studyjne i dziesi\u0105tki singli. Nasz najnowszy materia\u0142 "Dices" to najbardziej dojrza\u0142y album w naszej dyskografii \u2013 po\u0142\u0105czenie hard rockowej energii z emocjonalnymi tekstami i nowoczesn\u0105 produkcj\u0105.',
    "music.platforms": "Słuchaj na platformach",
    "music.seo.title": "O muzyce CIRYAM",
    "music.seo.p1": "CIRYAM to polski zespół rockowy, który od pierwszych akordów stawia na autentyczność. Nasze brzmienie czerpie z klasycznego hard rocka lat 70. i 80., ale nie boimy się nowoczesnych rozwiązań produkcyjnych. Efekt? Muzyka, która jest jednocześnie surowa i przystępna.",
    "music.seo.p2": 'Album "Dices" \u2013 nasz najnowszy materia\u0142 \u2013 to 10 utwor\u00f3w, kt\u00f3re opowiadaj\u0105 o ryzyku, emocjach i \u017cyciowych wyborach. Od mocnego otwieracza po akustyczn\u0105 ballad\u0119 na zako\u0144czenie \u2013 p\u0142yta zabiera s\u0142uchacza w rockow\u0105 podr\u00f3\u017c.',
    "music.seo.p3": "Wszystkie nasze płyty dostępne są w formatach cyfrowych (Spotify, Apple Music, SoundCloud) oraz fizycznych (CD, winyl) w oficjalnym sklepie CIRYAM.",

    // About page
    "about.page.title": "CIRYAM – polski zespół rockowy",
    "about.who": "Kim jesteśmy",
    "about.page.p1": "CIRYAM to polski zespół rockowy założony przez grupę muzyków połączonych pasją do gitarowego grania i scenicznej energii. Od początku stawiamy na autorski materiał – każdy riff, tekst i melodia to nasze dzieło.",
    "about.page.p2": "Łączymy energię klasycznego hard rocka z nowoczesnym brzmieniem. Nasze inspiracje to zarówno legendy gatunku – Led Zeppelin, AC/DC, Deep Purple – jak i współcześni artyści rockowej sceny. Efektem jest brzmienie, które jest jednocześnie klasyczne i świeże.",
    "about.page.p3": "Na scenie dajemy z siebie absolutnie wszystko. Ponad 50 koncertów rocznie – od kameralnych klubów po wielotysięczne festiwale – to nasza codzienna rzeczywistość. Każdy występ traktujemy jako niepowtarzalne wydarzenie.",
    "about.page.p4": "Mamy na koncie trzy albumy studyjne, dziesiątki singli i setki godzin spędzonych na scenie. CIRYAM to nie tylko zespół – to styl życia oparty na rocku, autentyczności i pasji do muzyki.",
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
    "press.bio.p1": "CIRYAM to polski zespół rockowy założony w 2001 roku. Gramy autorski rock – ciężkie riffy, melodyjne refreny i sceniczną energię, która nie zostawia obojętnym. Na koncie mamy ponad 250 koncertów w całej Polsce – od kameralnych klubów po wielotysięczne festiwale.",
    "press.bio.p2": "W dyskografii zespołu znajduje się pięć albumów studyjnych, w tym najnowszy \"Dices\". CIRYAM to sprawdzony zespół na każdą scenę – gramy na festiwalach, w klubach, na eventach firmowych i prywatnych.",
    "press.bio.founded": "Rok założenia",
    "press.bio.albums": "Albumy",
    "press.bio.concertsYear": "Koncertów/rok",
    "press.bio.totalConcerts": "Koncertów łącznie",
    "press.photos.title": "Zdjęcia promocyjne",
    "press.photos.desc": "Zdjęcia w wysokiej rozdzielczości do wykorzystania w materiałach promocyjnych. Kliknij, aby pobrać.",
    "press.photos.download": "Pobierz",
    "press.rider.title": "Rider techniczny",
    "press.rider.intro": "Minimalne wymagania techniczne dla koncertu CIRYAM. Szczegóły do uzgodnienia indywidualnie z managementem.",
    "press.rider.stage": "Scena",
    "press.rider.stageVal": "Min. 5×4 m, zadaszona w przypadku koncertów plenerowych",
    "press.rider.pa": "Nagłośnienie (PA)",
    "press.rider.paVal": "System liniowy lub punktowy dostosowany do wielkości obiektu. Min. 2×2 kW RMS dla klubów, 2×5 kW dla plenerów.",
    "press.rider.monitors": "Monitory",
    "press.rider.monitorsVal": "Min. 4 monitory sceniczne (wedge) + 1 mikser monitorowy lub system in-ear dla wokalisty",
    "press.rider.lights": "Oświetlenie",
    "press.rider.lightsVal": "Minimum 8 głów ruchomych + 4 pary LED + hazer/wytwornica dymu",
    "press.rider.backline": "Backline",
    "press.rider.backlineVal": "Zespół przyjeżdża z własnym backline (gitary, basy, efekty). Wymagany: zestaw perkusyjny, wzmacniacz basowy 300W+, 2x combo gitarowe 50W+",
    "press.rider.channels": "Kanały mikserskie",
    "press.rider.channelsVal": "Min. 16 kanałów: perkusja (8), bas (1), 2x gitara (2), klawisze (2), wokal lead (1), 2x backing vocal (2)",
    "press.rider.note": "* Rider jest orientacyjny. Szczegółowe wymagania techniczne przesyłamy po potwierdzeniu koncertu. Kontakt: booking@ciryam.pl",
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
    "about.p1": "CIRYAM is a Polish rock band that has been conquering the music scene for over 6 years. We combine the energy of classic hard rock with a modern sound – from heavy guitar riffs to emotional, memorable choruses.",
    "about.p2": "With over 50 concerts per year, three studio albums and thousands of fans across Poland, every performance is treated as an unforgettable event – we leave everything on stage.",
    "about.p3": "We play at festivals, music clubs and private events. Our lyrics tell stories about life without filters – about emotions, dreams and everyday struggles.",
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
    "music.page.desc2": "CIRYAM has three studio albums and dozens of singles. Our latest release 'Dices' is the most mature album in our discography – combining hard rock energy with emotional lyrics and modern production.",
    "music.platforms": "Listen on platforms",
    "music.seo.title": "About CIRYAM's music",
    "music.seo.p1": "CIRYAM is a Polish rock band that prioritizes authenticity from the first chord. Our sound draws from classic hard rock of the 70s and 80s, but we're not afraid of modern production techniques. The result? Music that's both raw and accessible.",
    "music.seo.p2": "'Dices' – our latest album – features 10 tracks about risk, emotions and life choices. From the powerful opener to the acoustic closing ballad – the album takes the listener on a rock journey.",
    "music.seo.p3": "All our albums are available in digital formats (Spotify, Apple Music, SoundCloud) and physical formats (CD, vinyl) at the official CIRYAM shop.",

    // About page
    "about.page.title": "CIRYAM – Polish rock band",
    "about.who": "Who we are",
    "about.page.p1": "CIRYAM is a Polish rock band founded by a group of musicians united by their passion for guitar-driven music and stage energy. From the very beginning, we've focused on original material – every riff, lyric and melody is our own.",
    "about.page.p2": "We combine the energy of classic hard rock with a modern sound. Our inspirations range from genre legends – Led Zeppelin, AC/DC, Deep Purple – to contemporary rock artists. The result is a sound that's both classic and fresh.",
    "about.page.p3": "On stage, we give absolutely everything. Over 50 concerts per year – from intimate clubs to large festivals – is our daily reality. Every performance is treated as a unique event.",
    "about.page.p4": "We have three studio albums, dozens of singles and hundreds of hours spent on stage. CIRYAM is not just a band – it's a lifestyle built on rock, authenticity and passion for music.",
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
    "press.bio.p1": "CIRYAM is a Polish rock band founded in 2001. We play original rock – heavy riffs, melodic choruses and stage energy that leaves no one indifferent. We have over 250 concerts across Poland – from intimate clubs to large festivals.",
    "press.bio.p2": "The band's discography includes five studio albums, including the latest \"Dices\". CIRYAM is a proven band for any stage – we play festivals, clubs, corporate and private events.",
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
