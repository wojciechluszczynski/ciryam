import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { LangProvider } from "@/contexts/LangContext";
import { useCartSync } from "@/hooks/useCartSync";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CookieBanner from "@/components/CookieBanner";
import StickyPlayer from "@/components/StickyPlayer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Chatbot = lazy(() => import("@/components/Chatbot"));
const Kontakt = lazy(() => import("./pages/Kontakt"));
const Koncerty = lazy(() => import("./pages/Koncerty"));
const Muzyka = lazy(() => import("./pages/Muzyka"));
const OZespole = lazy(() => import("./pages/OZespole"));
const Sklep = lazy(() => import("./pages/Sklep"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const PolitykaPrywatnosci = lazy(() => import("./pages/PolitykaPrywatnosci"));
const Aktualnosci = lazy(() => import("./pages/Aktualnosci"));
const AktualnosciPost = lazy(() => import("./pages/AktualnosciPost"));
const PressKit = lazy(() => import("./pages/PressKit"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminPosts = lazy(() => import("./pages/AdminPosts"));
const AdminPostEdit = lazy(() => import("./pages/AdminPostEdit"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const queryClient = new QueryClient();

const ScrollRestoration = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => {
  useCartSync();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <AnnouncementBanner />}
      <ScrollRestoration />
      {!isAdmin && <Navbar />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/koncerty" element={<Koncerty />} />
          <Route path="/muzyka" element={<Muzyka />} />
          <Route path="/o-zespole" element={<OZespole />} />
          <Route path="/sklep" element={<Sklep />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
          <Route path="/aktualnosci" element={<Aktualnosci />} />
          <Route path="/aktualnosci/:slug" element={<AktualnosciPost />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/posts" element={<Suspense fallback={null}><ProtectedRoute><AdminPosts /></ProtectedRoute></Suspense>} />
          <Route path="/admin/posts/:id" element={<Suspense fallback={null}><ProtectedRoute><AdminPostEdit /></ProtectedRoute></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && <Footer />}
      {!isAdmin && <StickyPlayer />}
      {!isAdmin && <Suspense fallback={null}><Chatbot /></Suspense>}
      {!isAdmin && <CookieBanner />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LangProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </LangProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
