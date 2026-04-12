import { useState } from "react";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import { useLang } from "@/contexts/LangContext";

const TICKET_URL = "https://www.kupbilecik.pl/baza/17722/CIryam/";

const concerts = [
  { date: "2025-05-23", city: "Kraków", venue: "Garage Pub", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-05-24", city: "Sanok", venue: "Piknik charytatywny", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-05-30", city: "Krosno", venue: "Stadion przy Legionów 1", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-06-07", city: "Toruń", venue: "Festiwal Rocka Progresywnego", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-06-21", city: "Przegaliny Duże", venue: "Zlot motocyklowy", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-07-05", city: "Polańczyk", venue: "Tawerna u Michała", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-07-26", city: "Wólka Podleśna", venue: "Impreza", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-07-27", city: "Polańczyk", venue: "Tawerna u Michała", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-08-14", city: "Chorkówka", venue: "Biesiada Karpacka", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-08-22", city: "Kolbuszowa", venue: "Festiwal Muzyczny Spinacz", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-08-23", city: "Tyniec", venue: "Przystań Pod Lutym Turem", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-08-29", city: "Leżajsk", venue: "Podkarpacki Festiwal Tatuażu", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-08-30", city: "Brzesko", venue: "Rynek - Beczka Rym", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-09-05", city: "Warszawa", venue: "VooDoo Club - SCREAMFEST", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-09-13", city: "Jarosław", venue: "Decybel Music Club", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-09-19", city: "Bytom", venue: "Klub Gotyk", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-10-10", city: "Wrocław", venue: "Klub Liverpool + Totentanz", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
  { date: "2025-12-27", city: "Krosno", venue: "RCKP - Finał 25-lecia", ticketUrl: TICKET_URL, status: "upcoming" as const, event: "Ciryam - trasa 25-lecia" },
];

type ArchivalConcert = { num: number; date: string; city: string; venue: string; note?: string };

const archivalConcerts: ArchivalConcert[] = [
  // 2026
  { num: 252, date: "15 luty 2026", city: "Przemyśl", venue: "Pub Niedźwiadek", note: "Rockowe Love" },
  // 2025
  { num: 251, date: "27 grudzień 2025", city: "Krosno", venue: "RCKP", note: "Koncert finałowy 25 lat na scenie" },
  { num: 250, date: "09 listopad 2025", city: "Bielsko-Biała", venue: "Klub Rude Boy" },
  { num: 249, date: "04 październik 2025", city: "Bytom", venue: "Klub Gotyk" },
  { num: 248, date: "06 wrzesień 2025", city: "Warszawa", venue: "Scream Fest" },
  { num: 247, date: "23 sierpień 2025", city: "Leżajsk", venue: "Podkarpacki Festiwal Tatuażu" },
  { num: 246, date: "22 sierpień 2025", city: "Tyniec", venue: "Przystań pod Lutym Turem" },
  { num: 245, date: "16 sierpień 2025", city: "Biała Niżna", venue: "Urodziny" },
  { num: 244, date: "14 sierpień 2025", city: "Kolbuszowa", venue: "Spinacz Festival" },
  { num: 243, date: "10 sierpień 2025", city: "Chorkówka", venue: "Biesiada Karpacka" },
  { num: 242, date: "02 sierpień 2025", city: "Gdów", venue: "Dni Ziemi Gdowskiej" },
  { num: 241, date: "01 sierpień 2025", city: "Polańczyk", venue: "Tawerna u Michała" },
  { num: 240, date: "27 lipiec 2025", city: "Wólka Podleśna", venue: "Imprezalia" },
  { num: 239, date: "19 lipiec 2025", city: "Polańczyk", venue: "Tawerna u Michała" },
  { num: 238, date: "05 lipiec 2025", city: "Przegaliny Duże", venue: "Zlot Motocyklowy" },
  { num: 237, date: "28 czerwiec 2025", city: "Toruń", venue: "Festiwal Rocka Progresywnego" },
  { num: 236, date: "30 maj 2025", city: "Kraków", venue: "Garage Pub" },
  { num: 235, date: "24 maj 2025", city: "Sanok", venue: "Koncert charytatywny ZSM" },
  { num: 234, date: "30 kwiecień 2025", city: "Krosno", venue: "Stadion przy Legionów 1" },
  // 2024
  { num: 233, date: "21 grudzień 2024", city: "Łódź", venue: "Przechowalnia" },
  { num: 232, date: "02 listopad 2024", city: "Rzeszów", venue: "Pod Palmą" },
  { num: 231, date: "21 wrzesień 2024", city: "Nowy Sącz", venue: "Spóźniony Słowik" },
  { num: 230, date: "23 sierpień 2024", city: "Tyniec", venue: "Przystań pod Lutym Turem" },
  { num: 229, date: "17 sierpień 2024", city: "Łagów", venue: "XX-lecie 5 Rano" },
  { num: 228, date: "10 sierpień 2024", city: "Grybów", venue: "" },
  { num: 227, date: "28 lipiec 2024", city: "Zaklików", venue: "Dni Gminy" },
  { num: 226, date: "27 lipiec 2024", city: "Besko", venue: "Dni Gminy" },
  { num: 225, date: "12 lipiec 2024", city: "Radawa", venue: "Zlot" },
  { num: 224, date: "18 maj 2024", city: "Krynica-Zdrój", venue: "Czarny Potok" },
  { num: 223, date: "12 kwiecień 2024", city: "Kraków", venue: "Zaścianek" },
  { num: 222, date: "16 marzec 2024", city: "Maniowy", venue: "Luzik Pub" },
  { num: 221, date: "03 marzec 2024", city: "Bielsko-Biała", venue: "Rude Boy" },
  { num: 220, date: "02 marzec 2024", city: "Wrocław", venue: "Niebo Cafe" },
  { num: 219, date: "16 luty 2024", city: "Jasło", venue: "Manufaktura Smaku" },
  { num: 218, date: "03 luty 2024", city: "Częstochowa", venue: "Muzyczna Meta" },
  // 2023
  { num: 217, date: "18 listopad 2023", city: "Warszawa", venue: "Potok" },
  { num: 216, date: "14 październik 2023", city: "Wrocław", venue: "Niebo Cafe" },
  { num: 215, date: "26 sierpień 2023", city: "Polańczyk", venue: "Energetyk" },
  { num: 214, date: "04 sierpień 2023", city: "Solina", venue: "Przystań Caryńska" },
  { num: 213, date: "09 lipiec 2023", city: "Jedlicze", venue: "Dni Miasta" },
  { num: 212, date: "08 lipiec 2023", city: "Pełczyce", venue: "Dni Gminy" },
  { num: 211, date: "13 maj 2023", city: "Krosno", venue: "Hala MOSiR (zlot)" },
  { num: 210, date: "29 kwiecień 2023", city: "Krosno", venue: "Rynek (Balony)" },
  { num: 209, date: "22 kwiecień 2023", city: "Tarnów", venue: "Stowarzyszenie Przepraszam" },
  { num: 208, date: "28 marzec 2023", city: "Warszawa", venue: "AntyRadio" },
  { num: 207, date: "26 marzec 2023", city: "Lublin", venue: "Fabryka Kultury Zgrzyt" },
  { num: 206, date: "24 luty 2023", city: "Kielce", venue: "Chicago Club" },
  { num: 205, date: "04 luty 2023", city: "Prešov", venue: "Stromoradie" },
  // 2022
  { num: 204, date: "25 listopad 2022", city: "Jarosław", venue: "Decybel Music Pub" },
  { num: 203, date: "27 sierpień 2022", city: "Brzozów", venue: "Dni Miasta" },
  { num: 202, date: "15 lipiec 2022", city: "Radawa", venue: "Zlot Motocyklowy" },
  // 2021 — COVID
  // 2020
  { num: 201, date: "26 wrzesień 2020", city: "Kraków", venue: "Zaścianek" },
  { num: 200, date: "05 wrzesień 2020", city: "Warszawa", venue: "VooDoo Club" },
  { num: 199, date: "24 lipiec 2020", city: "Krosno", venue: "RCKP – za kurtyną" },
  { num: 198, date: "12 styczeń 2020", city: "Sanok", venue: "Rynek – WOŚP" },
  { num: 197, date: "04 styczeń 2020", city: "Krosno", venue: "Rock Klub Iron – WOŚP" },
  // 2019
  { num: 196, date: "20 grudzień 2019", city: "Krosno", venue: "RCKP" },
  { num: 195, date: "04 październik 2019", city: "Rzeszów", venue: "Klub Vinyl" },
  { num: 194, date: "14 wrzesień 2019", city: "Krosno", venue: "Rock Klub Iron" },
  { num: 193, date: "21 czerwiec 2019", city: "Kraków", venue: "Boss Garage Pub" },
  { num: 192, date: "23 marzec 2019", city: "Sabinov", venue: "Energy Club" },
  { num: 191, date: "16 luty 2019", city: "Kraków", venue: "Boss Garage Pub" },
  // 2018
  { num: 190, date: "06 październik 2018", city: "Grybów", venue: "Stara Baśń" },
  { num: 189, date: "21 wrzesień 2018", city: "Prešov", venue: "Klub Wave" },
  { num: 188, date: "01 wrzesień 2018", city: "Sanok", venue: "Finał Radia Biwak, Błonie" },
  { num: 187, date: "25 sierpień 2018", city: "Ząbkowice Śląskie", venue: "Święto Franka" },
  { num: 186, date: "07 lipiec 2018", city: "Przeworsk", venue: "Stadion Miejski" },
  // 2017
  { num: 185, date: "03 listopad 2017", city: "Chorzów", venue: "Klub Leśniczówka", note: "Desires Tour II" },
  { num: 184, date: "22 październik 2017", city: "Kraków", venue: "Klub Studio", note: "Desires Tour II" },
  { num: 183, date: "15 październik 2017", city: "Lublin", venue: "Klub Graffiti", note: "Desires Tour II" },
  { num: 182, date: "25 czerwiec 2017", city: "Brzesko", venue: "Rynek – Dni Brzeska", note: "Desires Tour II" },
  { num: 181, date: "18 czerwiec 2017", city: "Kańczuga", venue: "Stadion – Dni Kańczugi", note: "Desires Tour II" },
  { num: 180, date: "18 czerwiec 2017", city: "Niżna Łąka", venue: "Staw Rock Festiwal", note: "Desires Tour II" },
  { num: 179, date: "03 czerwiec 2017", city: "Krosno", venue: "Rynek – Dni Krosna", note: "Desires Tour II" },
  { num: 178, date: "30 kwiecień 2017", city: "Sanok", venue: "Rynek – Sanocki Weekend Muzyczny", note: "Desires Tour II" },
  { num: 177, date: "15 marzec 2017", city: "Lubenia", venue: "Hotel SPA Splendor", note: "Desires Tour II" },
  // 2016
  { num: 176, date: "27 sierpień 2016", city: "Busko-Zdrój", venue: "Dni Buska Zdroju" },
  { num: 175, date: "08 maj 2016", city: "Łososina Dolna", venue: "Święto Kwitnących Sadów" },
  { num: 174, date: "01 maj 2016", city: "Krynica-Zdrój", venue: "Gala Sportów Walki – Hala Lodowa" },
  { num: 173, date: "14 luty 2016", city: "Tarnów", venue: "Klub Garage", note: "Desires Tour I" },
  { num: 172, date: "06 luty 2016", city: "Łódź", venue: "Łódzki Dom Kultury", note: "Desires Tour I" },
  { num: 171, date: "05 luty 2016", city: "Kraków", venue: "Pub Grodzka 42", note: "Desires Tour I" },
  { num: 170, date: "30 styczeń 2016", city: "Kielce", venue: "Klub Woor", note: "Desires Tour I" },
  { num: 169, date: "23 styczeń 2016", city: "Sandomierz", venue: "Klub Lapidarium", note: "Desires Tour I" },
  { num: 168, date: "22 styczeń 2016", city: "Kraśnik", venue: "Piaskowa Pub", note: "Desires Tour I" },
  { num: 167, date: "10 styczeń 2016", city: "Pilzno", venue: "DK – WOŚP", note: "Desires Tour I" },
  // 2015
  { num: 166, date: "30 grudzień 2015", city: "Cisna", venue: "Siekierezada", note: "Desires Tour I" },
  { num: 165, date: "29 sierpień 2015", city: "Sanok", venue: "Rynek" },
  { num: 164, date: "28 sierpień 2015", city: "Busko-Zdrój", venue: "Busko Rock" },
  { num: 163, date: "28 sierpień 2015", city: "Bardejov", venue: "Święto Bardejova" },
  { num: 162, date: "14 sierpień 2015", city: "Rudawka Rymanowska", venue: "Zlot Motocyklowy" },
  { num: 161, date: "08 sierpień 2015", city: "Jarosław", venue: "Kulturalne Lato w Mieście, Rynek" },
  { num: 160, date: "25 lipiec 2015", city: "Piwniczna-Zdrój", venue: "Rynek – Dni Piwnicznej" },
  { num: 159, date: "20 czerwiec 2015", city: "Biłgoraj", venue: "XIII Zlot Motocyklowy Roztocze" },
  { num: 158, date: "05 czerwiec 2015", city: "Krynica-Zdrój", venue: "Pijalnia Główna" },
  { num: 157, date: "27 marzec 2015", city: "Krościenko W.", venue: "Sztuka Improwizacji" },
  { num: 156, date: "14 luty 2015", city: "Biała Niżna", venue: "OSP – Gramy dla Gruzji" },
  // 2014
  { num: 155, date: "19 grudzień 2014", city: "Brzozów", venue: "Klub Avatar – Miko-Mania 2014" },
  { num: 154, date: "23 listopad 2014", city: "Rzeszów", venue: "Klub Vinyl – Fabryka Zespołów Tour 2014" },
  { num: 153, date: "12 październik 2014", city: "Tarnów", venue: "Klub Przepraszam – Samba Rock Tours" },
  { num: 152, date: "10 październik 2014", city: "Krosno", venue: "Klub Melanż – Samba Rock Tours" },
  { num: 151, date: "09 październik 2014", city: "Gorlice", venue: "Kino Teatr Wiarus – Samba Rock Tours" },
  { num: 150, date: "13 wrzesień 2014", city: "Kraśnik", venue: "Zlot Motocyklowy" },
  { num: 149, date: "16 sierpień 2014", city: "Żywiec", venue: "Festiwal Kwaśnicy" },
  { num: 148, date: "15 sierpień 2014", city: "Ustrzyki Dolne", venue: "KSU i goście – Stadion" },
  { num: 147, date: "19 lipiec 2014", city: "Grybów", venue: "Hard Rock Fest – Park" },
  { num: 146, date: "13 lipiec 2014", city: "Szczawne", venue: "Dni Szczawnego" },
  { num: 145, date: "30 czerwiec 2014", city: "Kraków", venue: "Teatr Słowackiego" },
  { num: 144, date: "10 maj 2014", city: "Janów Lubelski", venue: "III Zlot Motocyklowy – Plaża" },
  { num: 143, date: "03 maj 2014", city: "Krosno", venue: "Zawody Balonowe – Lotnisko" },
  { num: 142, date: "10 styczeń 2014", city: "Sanok", venue: "Klub Rudera – WOŚP" },
  // 2013
  { num: 141, date: "07 wrzesień 2013", city: "Wałbrzych", venue: "Dni Wałbrzycha – Stadion Biały Kamień" },
  { num: 140, date: "31 sierpień 2013", city: "Rudawka Rymanowska", venue: "Zlot Motocyklowy" },
  { num: 139, date: "27 lipiec 2013", city: "Jeziórko", venue: "Zlot Motocyklowy Poker Run" },
  { num: 138, date: "23 czerwiec 2013", city: "Strzyżów", venue: "Koncert charytatywny dla MAI" },
  { num: 137, date: "15 czerwiec 2013", city: "Jasło", venue: "Dni Jasła, Rynek" },
  { num: 136, date: "01 czerwiec 2013", city: "Pilzno", venue: "Bar Taurus – Święto Golonki" },
  { num: 135, date: "16 maj 2013", city: "Jarosław", venue: "Stadion MOSiR – III Podkarpackie Juwenalia" },
  { num: 134, date: "14 kwiecień 2013", city: "Katowice", venue: "Mega Club – Ursynalia The Tour" },
  // 2012
  { num: 133, date: "01 grudzień 2012", city: "Sanok", venue: "Klub Rudera" },
  { num: 132, date: "29 wrzesień 2012", city: "Biecz", venue: "Kromeriana" },
  { num: 131, date: "29 sierpień 2012", city: "Krosno", venue: "Rock Klub Iron" },
  { num: 130, date: "25 sierpień 2012", city: "Mielec", venue: "Dni Mielca" },
  { num: 129, date: "24 sierpień 2012", city: "Łańcut", venue: "Motofestiwal" },
  { num: 128, date: "11 sierpień 2012", city: "Kurozwęki", venue: "Dziki Zachód" },
  { num: 127, date: "05 sierpień 2012", city: "Strzyżów", venue: "Piknik Historyczny" },
  { num: 126, date: "30 czerwiec 2012", city: "Ustrzyki Dolne", venue: "Dni Ustrzyk – Park Pod Dębami" },
  { num: 125, date: "09 czerwiec 2012", city: "Ząbkowice Śląskie", venue: "Potworny Zlot Motocyklowy" },
  { num: 124, date: "25 maj 2012", city: "Sanok", venue: "Juwenalia Sanok" },
  { num: 123, date: "28 kwiecień 2012", city: "Krosno", venue: "Zawody Balonowe" },
  // 2010
  { num: 122, date: "08 październik 2010", city: "Rzeszów", venue: "Klub Pod Palmą – Abracadabra Gothic Tour" },
  { num: 121, date: "21 sierpień 2010", city: "Cieszanów", venue: "Cieszanów Rock Festiwal" },
  { num: 120, date: "14 sierpień 2010", city: "Warszawa", venue: "Klub Stodoła – Open Mind Festival (ILL NINO, EPICA)" },
  { num: 119, date: "27 czerwiec 2010", city: "Zakliczyn", venue: "Rock nad Dunajcem" },
  { num: 118, date: "19 czerwiec 2010", city: "Białowieża", venue: "Polowanie Króla Jagiełły" },
  { num: 117, date: "07 maj 2010", city: "Krosno", venue: "artKino" },
  { num: 116, date: "12 marzec 2010", city: "Rzeszów", venue: "Klub Pod Palmą" },
  { num: 115, date: "14 luty 2010", city: "Kraków", venue: "Klub Studio – Love It Hard Festival" },
  // 2009
  { num: 114, date: "05 wrzesień 2009", city: "Rzeszów", venue: "Lisia Góra – SABATON" },
  { num: 113, date: "30 sierpień 2009", city: "Jedlicze", venue: "Pożegnanie Wakacji" },
  { num: 112, date: "30 sierpień 2009", city: "Proszówki k. Bochni", venue: "Festiwal Rock Autostrada" },
  { num: 111, date: "22 sierpień 2009", city: "Nowy Targ", venue: "X Jarmark Podhalański – Rynek" },
  { num: 110, date: "15 sierpień 2009", city: "Rzeszów", venue: "RzeszOFF Art Festiwal" },
  { num: 109, date: "21 czerwiec 2009", city: "Gorlice", venue: "GCK" },
  { num: 108, date: "19 czerwiec 2009", city: "Piece k. Rybnika", venue: "Piecowisko 2009" },
  { num: 107, date: "06 czerwiec 2009", city: "Przeworsk", venue: "Dni Miasta Przeworsk" },
  { num: 106, date: "15 maj 2009", city: "Sanok", venue: "Juwenalia – Błonie" },
  { num: 105, date: "30 kwiecień 2009", city: "Krosno", venue: "X Międzynarodowe Zawody Balonowe – Lotnisko" },
  { num: 104, date: "08 marzec 2009", city: "Warszawa", venue: "Casting Hit Generator" },
  { num: 103, date: "27 luty 2009", city: "Stalowa Wola", venue: "Klub JazzRock" },
  { num: 102, date: "13 luty 2009", city: "Tarnobrzeg", venue: "Klub Maxim" },
  { num: 101, date: "11 styczeń 2009", city: "Jasło", venue: "Rynek – XVII Finał WOŚP" },
  // 2007
  { num: 100, date: "29 wrzesień 2007", city: "Strzyżów", venue: "Dni Strzyżowa" },
  { num: 99, date: "20 wrzesień 2007", city: "Kraków", venue: "Targi Music Media" },
  { num: 98, date: "19 sierpień 2007", city: "Żywiec", venue: "Światowy Festiwal Kwaśnicy" },
  { num: 97, date: "12 sierpień 2007", city: "Korczyna", venue: "Jarmark Korczyński – Stadion" },
  { num: 96, date: "30 czerwiec 2007", city: "Frysztak", venue: "Dni Ziemi Frysztackiej" },
  { num: 95, date: "14 czerwiec 2007", city: "Warszawa", venue: "Stodoła – TYPE O NEGATIVE" },
  { num: 94, date: "18 maj 2007", city: "Wałbrzych", venue: "Juwenalia – Skwer Sybiraków" },
  { num: 93, date: "04 maj 2007", city: "Dynów", venue: "La Loco Club", note: "CT 2007" },
  { num: 92, date: "27 kwiecień 2007", city: "Sędziszów Młp.", venue: "Siódemka", note: "CT 2007" },
  { num: 91, date: "21 kwiecień 2007", city: "Kraków", venue: "Zaścianek", note: "CT 2007" },
  { num: 90, date: "15 kwiecień 2007", city: "Kraków", venue: "Imbir", note: "CT 2007" },
  { num: 89, date: "31 marzec 2007", city: "Tarnobrzeg", venue: "Blues Rock Maschine", note: "CT 2007" },
  { num: 88, date: "30 marzec 2007", city: "Sandomierz", venue: "Lapidarium", note: "CT 2007" },
  { num: 87, date: "24 marzec 2007", city: "Katowice", venue: "Spodek – Metalmania", note: "CT 2007" },
  { num: 86, date: "17 marzec 2007", city: "Kraśnik", venue: "Restauracja VIP", note: "CT 2007" },
  { num: 85, date: "18 luty 2007", city: "Sanok", venue: "Hala Arena – Sanok dla Szpitala" },
  { num: 84, date: "14 styczeń 2007", city: "Ropczyce", venue: "Hala Sportowa – XV Finał WOŚP" },
  // 2006
  { num: 83, date: "28 grudzień 2006", city: "Krosno", venue: "Kino KDK – V Urodziny", note: "KTC '06" },
  { num: 82, date: "17 grudzień 2006", city: "Biała Podlaska", venue: "Muzyczna Apteka", note: "KTC '06" },
  { num: 81, date: "16 grudzień 2006", city: "Chełm", venue: "No Mercy Pub", note: "KTC '06" },
  { num: 80, date: "15 grudzień 2006", city: "Lublin", venue: "LCK", note: "KTC '06" },
  { num: 79, date: "10 grudzień 2006", city: "Bełchatów", venue: "Pub Speed Rock", note: "KTC '06" },
  { num: 78, date: "09 grudzień 2006", city: "Warszawa", venue: "No Mercy Club", note: "KTC '06" },
  { num: 77, date: "08 grudzień 2006", city: "Łódź", venue: "Music Garden Club", note: "KTC '06" },
  { num: 76, date: "02 grudzień 2006", city: "Rzeszów", venue: "Klub Reaktor", note: "KTC '06" },
  { num: 75, date: "30 listopad 2006", city: "Tarnobrzeg", venue: "Pub Blues & Rock", note: "KTC '06" },
  { num: 74, date: "17 listopad 2006", city: "Wałbrzych", venue: "WOK (Biały Kamień)", note: "KTC '06" },
  { num: 73, date: "03 wrzesień 2006", city: "Zaolszynie k. Siedlec", venue: "Amfiteatr" },
  { num: 72, date: "02 wrzesień 2006", city: "Czarnorzeki", venue: "4×4 Zlot samochodów terenowych" },
  { num: 71, date: "02 wrzesień 2006", city: "Rzeszów", venue: "Bulwary – Lato z Radiem Biwak" },
  { num: 70, date: "26 sierpień 2006", city: "Lubin", venue: "Art Rock Fest – Wzgórze Zamkowe" },
  { num: 69, date: "19 sierpień 2006", city: "Rzeszów", venue: "Bulwary nad Wisłokiem – Piknik Rodzinny" },
  { num: 68, date: "19 sierpień 2006", city: "Sanok", venue: "Błonie – Lato z Radiem Biwak" },
  { num: 67, date: "13 sierpień 2006", city: "Szczytno", venue: "Hunter Fest" },
  { num: 66, date: "11 sierpień 2006", city: "Sandomierz", venue: "I Ogólnopolski Zlot Motocyklowy – nad Wisłą" },
  { num: 65, date: "06 sierpień 2006", city: "Sędziszów Młp.", venue: "Lato z Radiem Biwak" },
  { num: 64, date: "30 lipiec 2006", city: "Krosno", venue: "Rynek – Spotkanie z KDK" },
  { num: 63, date: "16 lipiec 2006", city: "Dukla", venue: "Park – Lato z Radiem Biwak" },
  { num: 62, date: "14 lipiec 2006", city: "Biłgoraj", venue: "IV Ogólnopolski Zlot Motocyklowy Roztocze" },
  { num: 61, date: "09 lipiec 2006", city: "Strzyżów", venue: "Muszla koncertowa – Rockoteka pod gwiazdami" },
  { num: 60, date: "09 lipiec 2006", city: "Mielec", venue: "MOSiR – Lato z Radiem Biwak" },
  { num: 59, date: "01 lipiec 2006", city: "Dukla", venue: "Rynek – Dni Dukli" },
  { num: 58, date: "01 lipiec 2006", city: "Frysztak", venue: "GOSiR – Dni Ziemi Frysztackiej" },
  { num: 57, date: "04 czerwiec 2006", city: "Rzeszów", venue: "Klub Pod Palmą" },
  { num: 56, date: "03 czerwiec 2006", city: "Strzyżów", venue: "Dom Kultury – Jarmark Strzyżowski" },
  { num: 55, date: "03 czerwiec 2006", city: "Ropczyce", venue: "Stadion – Dni Ziemi Ropczyckiej" },
  { num: 54, date: "30 kwiecień 2006", city: "Krosno", venue: "Lotnisko – VII Górskie Zawody Balonowe" },
  { num: 53, date: "11 marzec 2006", city: "Gorlice", venue: "GCK" },
  { num: 52, date: "04 marzec 2006", city: "Kolbuszowa", venue: "MDK" },
  { num: 51, date: "18 luty 2006", city: "Sandomierz", venue: "Klub Lapidarium" },
  { num: 50, date: "20 styczeń 2006", city: "Strzyżów", venue: "Klub Galicja" },
  { num: 49, date: "08 styczeń 2006", city: "Ropczyce", venue: "CK – WOŚP" },
  { num: 48, date: "08 styczeń 2006", city: "Krosno", venue: "Rynek – WOŚP Finał TVP" },
  { num: 47, date: "05 styczeń 2006", city: "Sanok", venue: "Klub Haos – WOŚP" },
  // 2005
  { num: 46, date: "23 grudzień 2005", city: "Warszawa", venue: "Klub Progresja" },
  { num: 45, date: "15 grudzień 2005", city: "Rzeszów", venue: "Klub Akademia" },
  { num: 44, date: "10 grudzień 2005", city: "Krosno", venue: "KDK" },
  { num: 43, date: "25 listopad 2005", city: "Jarosław", venue: "Pub Ogródek Piwny" },
  { num: 42, date: "15 październik 2005", city: "Kolbuszowa", venue: "MDK" },
  { num: 41, date: "17 wrzesień 2005", city: "Czarnorzeki", venue: "4×4" },
  { num: 40, date: "07 wrzesień 2005", city: "Koszyce", venue: "Dolna Brama (Słowacja)" },
  { num: 39, date: "02 lipiec 2005", city: "Niebylec", venue: "Dni Niebylca" },
  { num: 38, date: "26 czerwiec 2005", city: "Jedlicze", venue: "Stadion Nafty – Dni Jedlicza" },
  { num: 37, date: "18 czerwiec 2005", city: "Sanok", venue: "Skansen – Dni Sanoka" },
  { num: 36, date: "17 czerwiec 2005", city: "Przemyśl", venue: "Pub Fort XXII" },
  { num: 35, date: "04 czerwiec 2005", city: "Ropczyce", venue: "Stadion – Dni Ziemi Ropczyckiej" },
  { num: 34, date: "27 maj 2005", city: "Czudec", venue: "Klub Memento" },
  { num: 33, date: "02 maj 2005", city: "Krosno", venue: "VI Górskie Zawody Balonowe – Lotnisko" },
  { num: 32, date: "19 marzec 2005", city: "Rzeszów", venue: "Klub Reaktor Sztuki" },
  { num: 31, date: "11 marzec 2005", city: "Brzozów", venue: "BDK" },
  { num: 30, date: "05 marzec 2005", city: "Gorlice", venue: "GCK" },
  { num: 29, date: "17 luty 2005", city: "Jasło", venue: "Klub Amigo" },
  { num: 28, date: "13 styczeń 2005", city: "Krosno", venue: "LO Kopernik" },
  { num: 27, date: "09 styczeń 2005", city: "Krosno", venue: "Hala Bursaki – WOŚP" },
  // 2004
  { num: 26, date: "30 październik 2004", city: "Haczów", venue: "Pub Koyot" },
  { num: 25, date: "23 październik 2004", city: "Krosno", venue: "KDK" },
  { num: 24, date: "22 październik 2004", city: "Rzeszów", venue: "Pub Rejs" },
  { num: 23, date: "17 październik 2004", city: "Kraków", venue: "Klub Extreme" },
  { num: 22, date: "16 październik 2004", city: "Sanok", venue: "Klub Rudera" },
  { num: 21, date: "07 październik 2004", city: "Jasło", venue: "Klub Amigo" },
  { num: 20, date: "07 lipiec 2004", city: "Mielec", venue: "Klub Studio" },
  { num: 19, date: "29 czerwiec 2004", city: "Jasło", venue: "Klub Amigo" },
  { num: 18, date: "24 czerwiec 2004", city: "Rymanów", venue: "Pub Gama" },
  { num: 17, date: "19 czerwiec 2004", city: "Rzeszów", venue: "Klub Reaktor Sztuki" },
  { num: 16, date: "18 czerwiec 2004", city: "Krosno", venue: "Klub Ranczo II" },
  { num: 15, date: "17 czerwiec 2004", city: "Dębica", venue: "Klub Meduza" },
  { num: 14, date: "19 marzec 2004", city: "Rzeszów", venue: "Klub Le Grecco" },
  { num: 13, date: "29 luty 2004", city: "Kraków", venue: "Klub Extreme" },
  { num: 12, date: "28 luty 2004", city: "Krosno", venue: "KDK" },
  { num: 11, date: "27 luty 2004", city: "Mielec", venue: "Klub Studio" },
  // 2003
  { num: 10, date: "08 luty 2003", city: "Tarnów", venue: "Klub Przepraszam" },
  { num: 9, date: "01 luty 2003", city: "Katowice", venue: "Mega Club" },
  // 2002
  { num: 8, date: "16 listopad 2002", city: "Ropczyce", venue: "Klub Cegła" },
  { num: 7, date: "sierpień 2002", city: "Ropczyce", venue: "Klub Cegła" },
  { num: 6, date: "maj 2002", city: "Krosno", venue: "Juwenalia" },
  { num: 5, date: "maj 2002", city: "Krosno", venue: "Przegląd zespołów muzycznych, Rynek" },
  { num: 4, date: "maj 2002", city: "Rzeszów", venue: "Juwenalia" },
  { num: 3, date: "08 marzec 2002", city: "Rzeszów", venue: "Klub Le Grecco" },
  // 2001
  { num: 2, date: "sierpień 2001", city: "Chorkówka", venue: "Biesiada Karpacka" },
];

// Group archival concerts by year
const getYear = (dateStr: string): string => {
  const match = dateStr.match(/(\d{4})$/);
  return match ? match[1] : "Inne";
};

const groupedByYear: Record<string, ArchivalConcert[]> = {};
archivalConcerts.forEach((c) => {
  const year = getYear(c.date);
  if (!groupedByYear[year]) groupedByYear[year] = [];
  groupedByYear[year].push(c);
});

const sortedYears = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a));

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("pl-PL", { month: "short" }).toUpperCase(),
    year: d.getFullYear(),
  };
};

const upcoming = concerts;

const Koncerty = () => {
  const { t } = useLang();
  const [openYears, setOpenYears] = useState<Record<string, boolean>>({});

  const toggleYear = (year: string) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <main className="bg-background pt-28 md:pt-32">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-20 pb-16">
        <FadeIn>
          <p className="font-heading text-xs tracking-[0.3em] uppercase text-accent mb-4">{t("concerts.label")}</p>
          <h1 className="font-heading text-5xl md:text-7xl text-foreground mb-4">{t("concerts.page.title")}</h1>
          <p className="text-muted-foreground font-body text-sm mb-4 max-w-2xl leading-relaxed">{t("concerts.page.desc1")}</p>
          <p className="text-muted-foreground font-body text-sm mb-12 max-w-2xl leading-relaxed">{t("concerts.page.desc2")}</p>
        </FadeIn>

        {/* Upcoming concerts */}
        <div className="mb-16">
          <h2 className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground mb-6 flex items-center gap-2">
            <Calendar size={14} className="text-accent" /> {t("concerts.upcoming")}
          </h2>
          <div className="space-y-0">
            {upcoming.map((concert, i) => {
              const { day, month } = formatDate(concert.date);
              return (
                <FadeIn key={i} delay={i * 50}>
                  <div className="group border-t border-border py-5 flex items-center gap-4 md:gap-8 hover:bg-secondary/50 px-4 transition-colors">
                    <div className="text-center shrink-0 w-16">
                      <span className="font-heading text-4xl text-foreground block leading-none">{day}</span>
                      <span className="font-heading text-xs tracking-[0.15em] text-accent">{month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-2xl text-foreground">{concert.city}</h3>
                      <p className="flex items-center gap-1.5 text-muted-foreground font-body text-sm"><MapPin size={12} /> {concert.venue}</p>
                    </div>
                    <a href={concert.ticketUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-heading text-xs tracking-[0.1em] uppercase hover:bg-accent/80 transition-colors">
                      {t("concerts.buyTicket")}
                    </a>
                  </div>
                </FadeIn>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>

        {/* Archival concerts */}
        <div>
          <h2 className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar size={14} className="text-accent" /> {t("concerts.archive")}
          </h2>
          <p className="text-muted-foreground font-body text-sm mb-6 italic">
            Około 250 koncertów za nami — każdy z nich to kawałek naszej historii.
          </p>

          <div className="space-y-0">
            {sortedYears.map((year) => {
              const isOpen = openYears[year] ?? false;
              const yearConcerts = groupedByYear[year];
              return (
                <div key={year} className="border-t border-border">
                  <button
                    onClick={() => toggleYear(year)}
                    className="w-full flex items-center justify-between py-4 px-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-2xl text-foreground">{year}</span>
                      <span className="font-body text-xs text-muted-foreground">
                        ({yearConcerts.length} {yearConcerts.length === 1 ? "koncert" : yearConcerts.length < 5 ? "koncerty" : "koncertów"})
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pb-2">
                      {yearConcerts.map((concert) => (
                        <div
                          key={concert.num}
                          className="flex items-start gap-3 md:gap-6 px-4 py-2.5 hover:bg-secondary/30 transition-colors"
                        >
                          <span className="font-body text-xs text-muted-foreground/50 shrink-0 w-8 text-right tabular-nums pt-0.5">
                            {concert.num}.
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-body text-sm text-foreground/80">
                              <span className="text-muted-foreground">{concert.date}</span>
                              {" — "}
                              <span className="font-semibold">{concert.city}</span>
                              {concert.venue && <span className="text-foreground/60">, {concert.venue}</span>}
                            </p>
                            {concert.note && (
                              <span className="font-body text-[10px] text-accent uppercase tracking-wider">{concert.note}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-t border-border" />
          </div>
        </div>

        <FadeIn delay={200}>
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-heading text-2xl text-foreground mb-4">{t("concerts.seo.title")}</h2>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{t("concerts.seo.p1")}</p>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{t("concerts.seo.p2")}</p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
};

export default Koncerty;
