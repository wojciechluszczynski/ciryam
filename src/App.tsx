import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Kontakt from "./pages/Kontakt";
import Oferta from "./pages/Oferta";
import Realizacje from "./pages/Realizacje";
import OMnie from "./pages/OMnie";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ProjectPage from "./pages/ProjectPage";
import PolitykaPrywatnosci from "./pages/PolitykaPrywatnosci";
import Regulamin from "./pages/Regulamin";
import Ebook from "./pages/Ebook";
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
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/realizacje" element={<Realizacje />} />
          <Route path="/o-mnie" element={<OMnie />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
          <Route path="/regulamin" element={<Regulamin />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Chatbot />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
