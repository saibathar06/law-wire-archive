import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedNews from "@/components/FeaturedNews";
import Categories from "@/components/Categories";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturedNews />
      <Categories />
      <NewsGrid />
      <Footer />
    </div>
  );
};

export default Index;
