import FadeIn from "@/components/FadeIn";

const Regulamin = () => (
  <main className="pt-40 pb-24">
    <div className="max-w-[800px] mx-auto px-6 md:px-12">
      <FadeIn>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Regulamin</h1>
        <p className="text-muted-foreground font-body text-sm mb-12">Ostatnia aktualizacja: 8 marca 2026 r.</p>

        <div className="prose prose-lg font-body text-muted-foreground [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">

          <h2>1. Postanowienia ogólne</h2>
          <p>
            Niniejszy Regulamin (dalej: „Regulamin") określa zasady korzystania ze strony internetowej dostępnej pod adresem
            an-projekt.lovable.app (dalej: „Strona") oraz zasady świadczenia usług drogą elektroniczną przez Annę Nowak,
            prowadzącą jednoosobową działalność gospodarczą pod firmą <strong>AN Projekt Anna Nowak</strong>,
            z siedzibą w Odrzykoniu, woj. podkarpackie (dalej: „Usługodawca").
          </p>
          <p>Kontakt z Usługodawcą:</p>
          <ul>
            <li>E-mail: anprojekt.com@gmail.com</li>
            <li>Telefon: +48 730 359 642</li>
          </ul>

          <h2>2. Definicje</h2>
          <ul>
            <li><strong>Użytkownik</strong> — osoba fizyczna korzystająca ze Strony.</li>
            <li><strong>Usługa elektroniczna</strong> — udostępnianie treści Strony, formularz kontaktowy, pobieranie materiałów (e-book).</li>
            <li><strong>Usługa projektowa</strong> — usługa projektowania wnętrz realizowana na podstawie odrębnej umowy.</li>
            <li><strong>Formularz kontaktowy</strong> — formularz dostępny na Stronie umożliwiający przesłanie zapytania do Usługodawcy.</li>
          </ul>

          <h2>3. Rodzaje i zakres usług elektronicznych</h2>
          <p>Za pośrednictwem Strony Usługodawca świadczy następujące usługi elektroniczne:</p>
          <ul>
            <li>Udostępnianie informacji o ofercie projektowania wnętrz w trzech pakietach: Koncepcyjna, Komfortowa i Kompleksowa.</li>
            <li>Formularz kontaktowy umożliwiający przesłanie zapytania ofertowego.</li>
            <li>Udostępnianie materiałów do pobrania (e-book).</li>
            <li>Prezentacja portfolio realizacji.</li>
            <li>Blog z treściami dotyczącymi projektowania wnętrz.</li>
          </ul>

          <h2>4. Warunki korzystania ze Strony</h2>
          <p>Korzystanie ze Strony wymaga:</p>
          <ul>
            <li>Urządzenia z dostępem do Internetu</li>
            <li>Aktualnej przeglądarki internetowej z obsługą JavaScript i cookies</li>
            <li>Aktywnego adresu e-mail (w przypadku korzystania z formularza kontaktowego)</li>
          </ul>
          <p>
            Korzystanie ze Strony jest bezpłatne. Użytkownik zobowiązany jest do korzystania ze Strony
            w sposób zgodny z prawem, niniejszym Regulaminem oraz dobrymi obyczajami.
          </p>

          <h2>5. Formularz kontaktowy</h2>
          <p>
            Przesłanie formularza kontaktowego nie stanowi zawarcia umowy na usługę projektową.
            Jest to zapytanie ofertowe, na które Usługodawca udziela odpowiedzi w terminie do 3 dni roboczych.
          </p>
          <p>
            Warunki realizacji usługi projektowej (zakres, termin, wynagrodzenie) ustalane są indywidualnie
            i wymagają zawarcia odrębnej umowy w formie pisemnej lub dokumentowej.
          </p>

          <h2>6. Usługi projektowe</h2>

          <h3>a) Zawarcie umowy</h3>
          <p>
            Umowa na usługę projektową zostaje zawarta po indywidualnych ustaleniach między Usługodawcą a Klientem,
            w formie pisemnej lub dokumentowej (e-mail z potwierdzeniem warunków). Umowa określa w szczególności:
            zakres prac, harmonogram, wynagrodzenie, warunki płatności i zasady współpracy.
          </p>

          <h3>b) Wynagrodzenie i płatności</h3>
          <p>
            Wynagrodzenie za usługi projektowe ustalane jest indywidualnie na podstawie zakresu zlecenia.
            Szczegółowe warunki płatności (w tym ewentualne zaliczki i etapy rozliczeń) określa umowa.
          </p>

          <h3>c) Współpraca Klienta</h3>
          <p>
            Klient zobowiązany jest do terminowego dostarczania informacji i materiałów niezbędnych do realizacji
            projektu. Opóźnienia po stronie Klienta mogą wpłynąć na termin realizacji usługi.
          </p>

          <h2>7. Prawa autorskie i własność intelektualna</h2>
          <p>
            Wszystkie treści zamieszczone na Stronie, w tym teksty, fotografie, wizualizacje 3D, projekty,
            logo oraz układ graficzny, stanowią własność intelektualną Usługodawcy i podlegają ochronie
            na podstawie ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych.
          </p>
          <p>Bez pisemnej zgody Usługodawcy zabronione jest:</p>
          <ul>
            <li>Kopiowanie, reprodukowanie i rozpowszechnianie treści ze Strony</li>
            <li>Wykorzystywanie wizualizacji i projektów w celach komercyjnych</li>
            <li>Modyfikowanie lub tworzenie dzieł pochodnych na podstawie materiałów ze Strony</li>
          </ul>
          <p>
            Przeniesienie majątkowych praw autorskich do projektu na Klienta następuje wyłącznie na warunkach
            określonych w umowie na usługę projektową, po uiszczeniu pełnego wynagrodzenia.
          </p>

          <h2>8. Odpowiedzialność</h2>
          <p>
            Usługodawca dokłada wszelkich starań, aby treści zamieszczone na Stronie były aktualne i rzetelne,
            jednak nie ponosi odpowiedzialności za:
          </p>
          <ul>
            <li>Przerwy w dostępie do Strony wynikające z przyczyn technicznych, konserwacji lub siły wyższej</li>
            <li>Skutki korzystania ze Strony w sposób niezgodny z Regulaminem</li>
            <li>Treści zamieszczone na stronach zewnętrznych, do których prowadzą linki ze Strony</li>
          </ul>

          <h2>9. Reklamacje</h2>
          <p>
            Reklamacje dotyczące funkcjonowania Strony lub usług elektronicznych można zgłaszać na adres:
            anprojekt.com@gmail.com.
          </p>
          <p>Reklamacja powinna zawierać:</p>
          <ul>
            <li>Imię i nazwisko lub adres e-mail Użytkownika</li>
            <li>Opis problemu i okoliczności jego wystąpienia</li>
            <li>Oczekiwany sposób rozwiązania</li>
          </ul>
          <p>
            Usługodawca rozpatruje reklamacje w terminie 14 dni od dnia ich otrzymania i informuje
            Użytkownika o sposobie rozpatrzenia drogą elektroniczną.
          </p>

          <h2>10. Ochrona danych osobowych</h2>
          <p>
            Zasady przetwarzania danych osobowych Użytkowników określa{" "}
            <a href="/polityka-prywatnosci" className="text-accent hover:underline">
              Polityka Prywatności
            </a>
            , stanowiąca integralną część niniejszego Regulaminu.
          </p>

          <h2>11. Pozasądowe rozwiązywanie sporów</h2>
          <p>
            Użytkownik będący konsumentem ma prawo skorzystać z pozasądowych sposobów rozpatrywania
            reklamacji i dochodzenia roszczeń, w tym:
          </p>
          <ul>
            <li>
              Złożenie wniosku do właściwego Wojewódzkiego Inspektora Inspekcji Handlowej o wszczęcie
              postępowania mediacyjnego
            </li>
            <li>
              Skorzystanie z platformy ODR (Online Dispute Resolution) dostępnej pod adresem:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                ec.europa.eu/consumers/odr
              </a>
            </li>
          </ul>

          <h2>12. Zmiana Regulaminu</h2>
          <p>
            Usługodawca zastrzega sobie prawo do zmiany Regulaminu z ważnych przyczyn, w szczególności
            w przypadku zmian przepisów prawa lub zakresu świadczonych usług. Aktualna wersja Regulaminu
            jest zawsze dostępna na tej stronie wraz z datą ostatniej aktualizacji.
          </p>
          <p>
            Zmiana Regulaminu nie wpływa na prawa nabyte przez Użytkowników przed datą wejścia w życie zmian.
          </p>

          <h2>13. Postanowienia końcowe</h2>
          <p>
            W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego,
            w szczególności Kodeksu cywilnego, ustawy o świadczeniu usług drogą elektroniczną z dnia 18 lipca
            2002 r. oraz ustawy o prawach konsumenta z dnia 30 maja 2014 r.
          </p>
          <p>
            Regulamin wchodzi w życie z dniem 8 marca 2026 r.
          </p>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default Regulamin;
