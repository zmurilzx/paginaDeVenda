import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BadgeCheck, MessagesSquare, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductImage from '@/components/ProductImage';
import { products } from '@/data/products';
import { trackButtonClick } from '@/utils/analytics';

const LojaCinestream = () => (
  <main className="relative overflow-hidden py-24 md:py-32" id="loja">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-purple-900/15 to-background" />

    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Loja CineStream</h1>
        <p className="mx-auto max-w-2xl text-foreground/60">Compare as configurações dos dispositivos e escolha o modelo ideal para sua TV.</p>
        <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-foreground/70">
          <Truck className="h-4 w-4 text-purple-300" strokeWidth={1.7} aria-hidden="true" />
          Entregamos para todo o Brasil — consulte prazo e frete
        </p>
      </motion.header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {products.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm"
          >
            <Link
              to={`/produto/${product.id}`}
              className="flex aspect-square items-center justify-center bg-gradient-to-br from-purple-900/20 to-black/20 p-6 transition-colors hover:bg-purple-900/30"
              onClick={() => trackButtonClick(product.name, 'loja-detalhes')}
              aria-label={`Ver detalhes de ${product.name}`}
            >
              <ProductImage product={product} className="h-full w-full object-contain" />
            </Link>

            <div className="p-5">
              <div className="mb-4 text-center">
                <h2 className="mb-1 text-xl font-bold md:text-2xl">{product.name}</h2>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-purple-300">{product.model}</p>
                <p className="text-sm text-foreground/50">{product.description}</p>
              </div>
              <div className="mb-5 text-center text-2xl font-bold">{product.price}</div>
              <ul className="mb-5 space-y-2">
                {product.features.slice(0, 6).map((feature) => (
                  <li key={feature} className="flex items-start text-xs text-foreground/70">
                    <BadgeCheck className="mr-2 mt-0.5 h-3 w-3 shrink-0 text-purple-400" strokeWidth={1.7} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={product.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick(product.name, 'loja-consultar')}
              >
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  <MessagesSquare className="mr-2 h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                  Consultar e comprar
                </Button>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </main>
);

export default LojaCinestream;
