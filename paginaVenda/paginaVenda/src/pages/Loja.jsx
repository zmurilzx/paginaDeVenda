import Navbar from '@/components/Navbar';
import LojaCinestream from '@/components/LojaCinestream';
import PaymentSecurity from '@/components/PaymentSecurity';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

const Loja = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title="Loja" description="Conheça dispositivos para transformar sua TV e consulte disponibilidade com a CineStream." path="/loja" />
      <Navbar />
      <LojaCinestream />
      <PaymentSecurity />
      <Footer />
    </div>
  );
};

export default Loja;
