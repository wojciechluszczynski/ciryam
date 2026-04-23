import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.18V12a4.83 4.83 0 01-3.77-1.55V6.69h3.77z" />
  </svg>
);

import ciryamLogo from "@/assets/ciryam-logo.webp";
import { useLang } from "@/contexts/LangContext";

const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.05-.1-.1-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.282c.013.06.045.094.104.094.057 0 .09-.035.104-.094l.193-1.282-.209-1.332c-.014-.057-.047-.094-.104-.094m1.8-1.16c-.063 0-.105.047-.113.11l-.218 2.477.218 2.38c.008.06.05.107.113.107.063 0 .105-.047.115-.107l.248-2.38-.248-2.477c-.01-.063-.052-.11-.115-.11m.899-.062c-.073 0-.12.055-.125.122l-.2 2.539.2 2.449c.005.067.052.122.125.122.073 0 .12-.055.127-.122l.227-2.449-.227-2.539c-.007-.067-.054-.122-.127-.122m.901-.166c-.083 0-.135.062-.14.135l-.18 2.705.18 2.504c.005.072.057.133.14.133.082 0 .133-.061.14-.133l.204-2.504-.204-2.705c-.007-.073-.058-.135-.14-.135m.901-.17c-.091 0-.148.068-.153.148l-.163 2.875.163 2.547c.005.08.062.146.153.146.09 0 .146-.066.154-.146l.183-2.547-.183-2.875c-.008-.08-.064-.148-.154-.148m.953-.038c-.1 0-.163.075-.168.163l-.145 2.913.145 2.567c.005.088.068.16.168.16.099 0 .161-.072.17-.16l.162-2.567-.162-2.913c-.009-.088-.071-.163-.17-.163m1.003.02c-.11 0-.176.082-.182.177l-.127 2.893.127 2.575c.006.095.072.174.182.174.109 0 .175-.079.183-.174l.143-2.575-.143-2.893c-.008-.095-.074-.177-.183-.177m1.055.052c-.12 0-.19.088-.196.19l-.108 2.841.108 2.574c.006.103.076.187.196.187.118 0 .189-.084.197-.187l.122-2.574-.122-2.841c-.008-.102-.079-.19-.197-.19m1.054.066c-.129 0-.201.095-.208.203l-.09 2.775.09 2.566c.007.107.079.199.208.199.128 0 .201-.092.21-.199l.1-2.566-.1-2.775c-.009-.108-.082-.203-.21-.203m1.107.028c-.139 0-.215.102-.222.216l-.072 2.747.072 2.556c.007.113.083.212.222.212.138 0 .214-.099.223-.212l.081-2.556-.081-2.747c-.009-.114-.085-.216-.223-.216m1.161.01c-.149 0-.229.108-.236.228l-.054 2.737.054 2.543c.007.12.087.225.236.225.147 0 .228-.105.237-.225l.06-2.543-.06-2.737c-.009-.12-.09-.228-.237-.228m1.21-.006c-.157 0-.242.115-.249.24l-.036 2.743.036 2.53c.007.126.092.237.249.237.156 0 .242-.111.251-.237l.04-2.53-.04-2.743c-.009-.125-.095-.24-.251-.24m1.161-.172c-.043 0-.082.015-.115.042-.033.028-.054.065-.057.108l-.054 2.915.036 2.505c.004.042.024.08.058.108.032.027.072.042.116.042.041 0 .081-.015.113-.04.035-.03.056-.068.06-.11l.041-2.505-.041-2.915c-.004-.043-.025-.08-.06-.108-.032-.027-.072-.042-.113-.042m2.318.477c-.198 0-.365.048-.505.142-.168-1.896-1.764-3.377-3.724-3.377-.484 0-.948.095-1.384.267-.164.066-.207.13-.21.26v6.611c.003.135.108.246.244.258h5.579c1.095 0 1.983-.888 1.983-1.982 0-1.094-.888-1.979-1.983-1.979"/>
  </svg>
);

const Footer = () => {
  const { t } = useLang();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={ciryamLogo} alt="CIRYAM" className="h-10 w-auto mb-4" style={{ filter: "invert(1)" }} width={247} height={100} />
            <p className="text-muted-foreground font-body text-sm mb-6 leading-relaxed">{t("footer.desc")}</p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/CIRYAM/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/ciryam__official/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://www.youtube.com/user/Ciryam/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube"><Youtube size={20} /></a>
              <a href="https://www.tiktok.com/@ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="TikTok"><TikTokIcon /></a>
              <a href="https://soundcloud.com/ciryam" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="SoundCloud"><SoundCloudIcon /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] uppercase mb-5 text-muted-foreground">{t("footer.nav")}</h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/aktualnosci", labelKey: "nav.news" },
                { href: "/muzyka", labelKey: "nav.music" },
                { href: "/koncerty", labelKey: "nav.concerts" },
                { href: "/o-zespole", labelKey: "nav.about" },
                { href: "/kontakt", labelKey: "nav.contact" },
              ].map((link) => (
                <Link key={link.href} to={link.href} className="text-foreground/60 hover:text-accent transition-colors font-body text-sm">
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] uppercase mb-5 text-muted-foreground">{t("footer.booking")}</h4>
            <div className="flex flex-col gap-3 text-foreground/60 font-body text-sm">
              <div>
                <p className="text-foreground/80 font-semibold mb-0.5">Management</p>
                <p className="text-foreground/60 mb-0.5">Robert Węgrzyn</p>
                <a href="mailto:okoartmanagement@gmail.com" className="hover:text-accent transition-colors">okoartmanagement@gmail.com</a>
                <br />
                <a href="tel:+48605103072" className="hover:text-accent transition-colors">+48 605 103 072</a>
              </div>
              <div>
                <p className="text-foreground/80 font-semibold mb-0.5">Booking Manager</p>
                <p className="text-foreground/60 mb-0.5">Wojciech Łuszczyński</p>
                <a href="mailto:booking@ciryam.pl" className="hover:text-accent transition-colors">booking@ciryam.pl</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground/60 text-xs font-body">{t("footer.rights")}</p>
          <div className="flex gap-5 text-xs font-body">
            <Link to="/polityka-prywatnosci" className="text-muted-foreground/60 hover:text-accent transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
