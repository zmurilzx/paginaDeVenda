import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const StoreCta = () => (
  <section id="loja" className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-y border-white/[0.08] py-10 md:grid-cols-[1fr_0.8fr] md:items-center md:py-14">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">Loja CineStream</p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">O aparelho certo para transformar sua TV</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-foreground/55">Compare Amazon Fire TV Stick, Tomate TV Stick e Xiaomi TV Stick em uma página dedicada.</p>
        </div>
        <div className="md:text-right">
          <Link to="/loja" onClick={() => trackButtonClick('Conhecer a lojinha', 'home-loja')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 px-6 text-sm font-semibold transition hover:border-purple-400 hover:text-purple-200">
            Acessar a loja <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default StoreCta;
