import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CookieBanner from "@/components/CookieBanner";
import StickyPlayer from "@/components/StickyPlayer";
import Chatbot from "@/components/Chatbot";
import Index from "./pages/Index";
import Kontakt from "./pages/Kontakt";
import Koncerty from "./pages/Koncerty";
import Muzyka from "./pages/Muzyka";
import OZespole from "./pages/OZespole";
import Sklep from "./pages/Sklep";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnnouncementBanner />
        <ScrollRestoration />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/koncerty" element={<Koncerty />} />
          <Route path="/muzyka" element={<Muzyka />} />
          <Route path="/o-zespole" element={<OZespole />} />
          <Route path="/sklep" element={<Sklep />} />
          <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <StickyPlayer />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
