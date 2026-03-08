import FadeIn from "@/components/FadeIn";

const PolitykaPrywatnosci = () => (
  <main className="pt-40 pb-24">
    <div className="max-w-[800px] mx-auto px-6 md:px-12">
      <FadeIn>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Polityka prywatności</h1>
        <p className="text-muted-foreground font-body text-sm mb-12">Ostatnia aktualizacja: 8 marca 2026 r.</p>

        <div className="prose prose-lg font-body text-muted-foreground [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">

          <h2>1. Administrator danych osobowych</h2>
          <p>
            Administratorem Twoich danych osobowych jest Anna Nowak, prowadząca jednoosobową działalność gospodarczą pod firmą
            <strong> AN Projekt Anna Nowak</strong>, z siedzibą w Odrzykoniu, woj. podkarpackie (dalej: „Administrator").
          </p>
          <p>Kontakt z Administratorem:</p>
          <ul>
            <li>E-mail: anprojekt.com@gmail.com</li>
            <li>Telefon: +48 730 359 642</li>
            <li>Adres korespondencyjny: Odrzykoń, woj. podkarpackie</li>
          </ul>
          <p>
            Administrator nie wyznaczył Inspektora Ochrony Danych. We wszystkich sprawach dotyczących ochrony danych osobowych
            możesz kontaktować się bezpośrednio z Administratorem pod wskazanym adresem e-mail.
          </p>

          <h2>2. Podstawy prawne i cele przetwarzania</h2>
          <p>Twoje dane osobowe przetwarzane są na następujących podstawach prawnych (art. 6 RODO):</p>

          <h3>a) Formularz kontaktowy</h3>
          <ul>
            <li><strong>Cel:</strong> odpowiedź na zapytanie, przygotowanie wstępnej wyceny, nawiązanie współpracy projektowej.</li>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b) RODO (działania zmierzające do zawarcia umowy) oraz art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes Administratora polegający na obsłudze zapytań).</li>
            <li><strong>Zakres danych:</strong> imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), miejscowość, typ projektu, metraż, etap inwestycji, treść wiadomości.</li>
          </ul>

          <h3>b) Realizacja umowy</h3>
          <ul>
            <li><strong>Cel:</strong> wykonanie usługi projektowania wnętrz, fakturowanie, komunikacja w trakcie projektu.</li>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b) RODO (wykonanie umowy).</li>
          </ul>

          <h3>c) Obowiązki prawne</h3>
          <ul>
            <li><strong>Cel:</strong> prowadzenie dokumentacji księgowej i podatkowej.</li>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. c) RODO (obowiązek prawny ciążący na Administratorze).</li>
          </ul>

          <h3>d) Prawnie uzasadniony interes</h3>
          <ul>
            <li><strong>Cel:</strong> dochodzenie lub obrona przed roszczeniami, analityka ruchu na stronie, doskonalenie usług.</li>
            <li><strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. f) RODO.</li>
          </ul>

          <h2>3. Odbiorcy danych</h2>
          <p>Twoje dane mogą być przekazywane wyłącznie podmiotom, które wspierają Administratora w prowadzeniu działalności:</p>
          <ul>
            <li>Dostawca hostingu i infrastruktury serwerowej</li>
            <li>Dostawca usług e-mail</li>
            <li>Biuro rachunkowe obsługujące dokumentację księgową</li>
            <li>Dostawcy narzędzi analitycznych (np. Google Analytics) w zakresie zanonimizowanych danych</li>
          </ul>
          <p>
            Administrator nie sprzedaje, nie udostępnia i nie przekazuje danych osobowych do państw trzecich (poza EOG),
            chyba że odbiorca zapewnia odpowiedni poziom ochrony danych (np. decyzja Komisji Europejskiej o adekwatności,
            standardowe klauzule umowne).
          </p>

          <h2>4. Okres przechowywania danych</h2>
          <ul>
            <li><strong>Zapytania z formularza kontaktowego:</strong> do 12 miesięcy od ostatniego kontaktu, chyba że dojdzie do zawarcia umowy.</li>
            <li><strong>Dane umowne:</strong> przez czas trwania umowy oraz 6 lat po jej zakończeniu (okres przedawnienia roszczeń cywilnych).</li>
            <li><strong>Dokumentacja księgowa:</strong> 5 lat od końca roku podatkowego, w którym powstał obowiązek podatkowy.</li>
            <li><strong>Dane analityczne (cookies):</strong> zgodnie z okresem ważności poszczególnych plików cookie (szczegóły w sekcji 7).</li>
          </ul>

          <h2>5. Twoje prawa</h2>
          <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
          <ul>
            <li><strong>Prawo dostępu</strong> do swoich danych (art. 15 RODO)</li>
            <li><strong>Prawo do sprostowania</strong> nieprawidłowych lub niekompletnych danych (art. 16 RODO)</li>
            <li><strong>Prawo do usunięcia</strong> danych, tzw. „prawo do bycia zapomnianym" (art. 17 RODO)</li>
            <li><strong>Prawo do ograniczenia</strong> przetwarzania (art. 18 RODO)</li>
            <li><strong>Prawo do przenoszenia</strong> danych (art. 20 RODO)</li>
            <li><strong>Prawo do sprzeciwu</strong> wobec przetwarzania opartego na prawnie uzasadnionym interesie (art. 21 RODO)</li>
            <li><strong>Prawo do cofnięcia zgody</strong> w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania dokonanego przed cofnięciem (art. 7 ust. 3 RODO)</li>
            <li><strong>Prawo do wniesienia skargi</strong> do organu nadzorczego: Prezes Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa, <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">uodo.gov.pl</a></li>
          </ul>
          <p>
            Aby skorzystać z powyższych praw, wyślij wiadomość na adres: anprojekt.com@gmail.com.
            Administrator odpowie na Twoje żądanie bez zbędnej zwłoki, nie później niż w ciągu 30 dni.
          </p>

          <h2>6. Dobrowolność podania danych</h2>
          <p>
            Podanie danych osobowych w formularzu kontaktowym jest dobrowolne, lecz niezbędne do udzielenia odpowiedzi
            na zapytanie. Brak podania danych oznaczonych jako wymagane uniemożliwi obsługę Twojego zapytania.
          </p>

          <h2>7. Pliki cookies i technologie śledzące</h2>
          <p>Strona internetowa wykorzystuje pliki cookies (ciasteczka) w następujących celach:</p>

          <h3>a) Cookies niezbędne (techniczne)</h3>
          <p>
            Zapewniają prawidłowe funkcjonowanie strony. Nie wymagają zgody użytkownika.
            Przykłady: zapamiętanie preferencji cookies, utrzymanie sesji.
          </p>

          <h3>b) Cookies analityczne</h3>
          <p>
            Pozwalają analizować ruch na stronie i sposób korzystania z niej. Instalowane wyłącznie po wyrażeniu zgody.
            Dostawca: Google Analytics (z anonimizacją adresu IP).
          </p>

          <h3>c) Zarządzanie cookies</h3>
          <p>
            Przy pierwszej wizycie na stronie wyświetlany jest baner informujący o plikach cookies.
            Możesz zaakceptować wszystkie cookies, odrzucić opcjonalne lub zmienić ustawienia w dowolnym momencie
            w ustawieniach przeglądarki. Instrukcje dla popularnych przeglądarek:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/pl/kb/ciasteczka" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/pl-pl/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/pl-pl/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Microsoft Edge</a></li>
          </ul>

          <h2>8. Zautomatyzowane podejmowanie decyzji i profilowanie</h2>
          <p>
            Administrator nie podejmuje zautomatyzowanych decyzji ani nie stosuje profilowania w rozumieniu art. 22 RODO,
            które wywoływałoby skutki prawne lub w podobny sposób istotnie wpływało na osobę, której dane dotyczą.
          </p>

          <h2>9. Bezpieczeństwo danych</h2>
          <p>
            Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych
            przed nieuprawnionym dostępem, utratą, zniszczeniem lub ujawnieniem, w tym:
          </p>
          <ul>
            <li>Szyfrowanie połączenia (certyfikat SSL/TLS)</li>
            <li>Ograniczony dostęp do danych wyłącznie dla osób upoważnionych</li>
            <li>Regularne przeglądy procedur bezpieczeństwa</li>
          </ul>

          <h2>10. Zmiany polityki prywatności</h2>
          <p>
            Administrator zastrzega sobie prawo do aktualizacji niniejszej Polityki Prywatności w celu dostosowania
            jej do zmian w przepisach prawa lub praktyk przetwarzania danych. Aktualna wersja jest zawsze dostępna
            na tej stronie wraz z datą ostatniej aktualizacji.
          </p>
        </div>
      </FadeIn>
    </div>
  </main>
);

export default PolitykaPrywatnosci;
