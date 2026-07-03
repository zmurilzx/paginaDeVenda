import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import ProductImage from '@/components/ProductImage';
import { products } from '@/data/products';
import { trackButtonClick } from '@/utils/analytics';

const LojaCinestream = () => (
  <main className="pb-20 pt-28 md:pb-28 md:pt-36" id="loja">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <motion.header initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-12 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Dispositivos</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">Loja CineStream</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/55">Compare especificações e escolha o aparelho adequado para sua televisão.</p>
      </motion.header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-3">
        {products.map((product, index) => (
          <motion.article key={product.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.015]">
            <Link to={`/produto/${product.id}`} className="group flex aspect-[4/3] items-center justify-center border-b border-white/[0.08] bg-[#101015] p-7" onClick={() => trackButtonClick(product.name, 'loja-detalhes')} aria-label={`Ver detalhes de ${product.name}`}>
              <ProductImage product={product} className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.02]" />
            </Link>

            <div className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300">{product.brand} · {product.model}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-tight">{product.name}</h2>
              <p className="mt-2 min-h-10 text-sm leading-5 text-foreground/45">{product.description}</p>
              <div className="my-5 border-y border-white/[0.08] py-4 text-2xl font-semibold">{product.price}</div>

              <dl className="space-y-0 text-xs text-foreground/55">
                {product.features.slice(0, 4).map((feature) => {
                  const [label, ...value] = feature.split(':');
                  return <div key={feature} className="flex justify-between gap-3 border-b border-white/[0.06] py-2.5 last:border-b-0"><dt>{label}</dt><dd className="text-right text-white/70">{value.join(':').trim() || 'Incluído'}</dd></div>;
                })}
              </dl>

              <div className="mt-6 grid gap-2">
                <Link to={`/produto/${product.id}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 text-sm font-semibold transition hover:border-white/30">
                  Ver especificações <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
                </Link>
                <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer" onClick={() => trackButtonClick(product.name, 'loja-consultar')} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-500">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.7} /> Consultar disponibilidade
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </main>
);

export default LojaCinestream;
