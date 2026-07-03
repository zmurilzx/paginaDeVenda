import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
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

          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:gap-16">
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="flex aspect-[4/3] items-center justify-center rounded-xl border border-white/[0.08] bg-[#101015] p-8">
              <ProductImage product={product} className="h-full w-full object-contain" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">{product.brand} · {product.model}</p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{product.name}</h1>
              <p className="mt-5 leading-7 text-foreground/60">{product.fullDescription}</p>
              <div className="my-7 border-y border-white/[0.08] py-5"><span className="text-xs text-foreground/40">Preço</span><strong className="mt-1 block text-4xl font-semibold">{product.price}</strong></div>
              <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick(product.name, 'produto-consultar')}>
                <Button className="w-full rounded-lg bg-green-600 py-6 text-sm font-semibold text-white hover:bg-green-500">
                  <MessageCircle className="mr-2 h-4 w-4" strokeWidth={1.7} aria-hidden="true" /> Consultar pelo WhatsApp
                </Button>
              </a>
              <p className="mt-3 text-center text-xs text-foreground/50">Confirme disponibilidade, versão e prazo antes de finalizar a compra.</p>
            </motion.div>
          </div>

          <section className="mx-auto mt-16 max-w-5xl border-t border-white/[0.08] pt-10" aria-labelledby="features-title">
            <div className="grid gap-8 md:grid-cols-[0.45fr_1fr]">
              <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-purple-300">Ficha técnica</p><h2 id="features-title" className="text-3xl font-semibold tracking-[-0.03em]">Especificações</h2></div>
              <dl>
                {product.features.map((feature) => {
                  const [label, ...value] = feature.split(':');
                  return <div key={feature} className="grid gap-1 border-b border-white/[0.07] py-4 sm:grid-cols-[0.45fr_1fr]"><dt className="text-sm text-foreground/40">{label}</dt><dd className="text-sm text-foreground/75">{value.join(':').trim() || 'Incluído'}</dd></div>;
                })}
              </dl>
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
