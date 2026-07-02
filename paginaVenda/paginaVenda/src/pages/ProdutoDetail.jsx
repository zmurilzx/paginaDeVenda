import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PaymentSecurity from '@/components/PaymentSecurity';
import ProductImage from '@/components/ProductImage';
import Seo from '@/components/Seo';
import { getProductById } from '@/data/products';
import { trackButtonClick } from '@/utils/analytics';

const ProdutoDetail = () => {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Seo title="Produto não encontrado" description="O produto solicitado não foi encontrado." noIndex />
        <Navbar />
        <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold">Produto não encontrado</h1>
          <Link to="/loja"><Button>Voltar para a loja</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo title={product.name} description={`${product.description}. Consulte disponibilidade e condições de compra.`} path={`/produto/${product.id}`} />
      <Navbar />
      <main className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Link to="/loja" className="mb-8 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para a loja
          </Link>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex aspect-square items-center justify-center rounded-2xl bg-purple-900/10 p-8">
              <ProductImage product={product} className="h-full w-full object-contain" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
              <h1 className="mb-3 text-3xl font-bold md:text-5xl">{product.name}</h1>
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-purple-300">Modelo: {product.model}</p>
              <p className="mb-6 text-foreground/70">{product.fullDescription}</p>
              <strong className="mb-8 text-4xl md:text-5xl">{product.price}</strong>
              <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick(product.name, 'produto-consultar')}>
                <Button className="w-full bg-green-600 py-6 text-base text-white hover:bg-green-700">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> Consultar e comprar pelo WhatsApp
                </Button>
              </a>
              <p className="mt-3 text-center text-xs text-foreground/50">Confirme disponibilidade, versão e prazo antes de finalizar a compra.</p>
            </motion.div>
          </div>

          <section className="mx-auto mt-16 max-w-4xl" aria-labelledby="features-title">
            <h2 id="features-title" className="mb-8 text-center text-3xl font-bold">Características</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-xl border border-white/10 bg-card/40 p-4">
                  <Check className="h-5 w-5 shrink-0 text-purple-400" aria-hidden="true" />
                  <span className="text-foreground/70">{feature}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <PaymentSecurity />
      <Footer />
    </div>
  );
};

export default ProdutoDetail;
