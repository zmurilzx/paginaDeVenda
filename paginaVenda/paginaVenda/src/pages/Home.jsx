import VSL from '@/components/VSL';
import PricingPlans from '@/components/PricingPlans';
import Seo from '@/components/Seo';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo description="Escolha seu plano CineStream para acessar filmes, séries e canais. Compare as opções e assine pelo checkout seguro." />
      <VSL />
      <PricingPlans />
    </div>
  );
};

export default Home;
