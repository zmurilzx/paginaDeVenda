import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SubscriptionBenefits from '@/components/SubscriptionBenefits';
import VSL from '@/components/VSL';
import PricingPlans from '@/components/PricingPlans';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import PaymentSecurity from '@/components/PaymentSecurity';
import FinalSubscriptionCta from '@/components/FinalSubscriptionCta';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo description="Escolha seu plano CineStream para acessar filmes, séries e canais. Compare as opções e assine pelo checkout seguro." />
      <Navbar />
      <Hero />
      <SubscriptionBenefits />
      <VSL />
      <PricingPlans />
      <HowItWorks />
      <Faq />
      <PaymentSecurity />
      <FinalSubscriptionCta />
      <Footer />
    </div>
  );
};

export default Home;
