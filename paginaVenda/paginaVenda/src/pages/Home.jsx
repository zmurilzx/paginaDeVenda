import VSL from '@/components/VSL';
import PricingPlans from '@/components/PricingPlans';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Faq from '@/components/Faq';
import ConversionHighlights from '@/components/ConversionHighlights';

const Home = ({ analyticsEnabled }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo description="Escolha seu plano CineStream para acessar filmes, séries e canais. Compare as opções e assine pelo checkout seguro." />
      <Navbar />
      <VSL analyticsEnabled={analyticsEnabled} />
      <ConversionHighlights />
      <PricingPlans />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
