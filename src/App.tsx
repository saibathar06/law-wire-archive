import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import NewsList from "./pages/admin/NewsList";
import NewsForm from "./pages/admin/NewsForm";
import FairlawLayout from "./pages/FairlawLayout";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import LegalUpdatesPage from "./pages/LegalUpdatesPage";
import BlogsPage from "./pages/BlogsPage";
import CaseCommentsPage from "./pages/CaseCommentsPage";
import FairReviewPage from "./pages/FairReviewPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* FAIRLAW Public Routes */}
          <Route path="/" element={<FairlawLayout />}>
            <Route index element={<HomePage />} />
            <Route path="legal-updates" element={<LegalUpdatesPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="case-comments" element={<CaseCommentsPage />} />
            <Route path="fair-review" element={<FairReviewPage />} />
            <Route path="category/:category" element={<CategoryPage />} />
            <Route path="category/:category/:subcategory" element={<CategoryPage />} />
            <Route path="article/:id" element={<ArticlePage />} />
            <Route path="article/:table/:id" element={<ArticlePage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
          
          {/* Legacy route - redirect to new layout */}
          <Route path="/legacy" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<NewsList />} />
            <Route path="news" element={<NewsList />} />
            <Route path="news/new" element={<NewsForm />} />
            <Route path="news/:id" element={<NewsForm />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
