import { Link } from 'react-router-dom';
import { ArrowRight, Tv } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const StoreCta = () => (
  <section id="loja" className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-950/60 to-card/50 p-8 text-center shadow-xl shadow-purple-950/20 md:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
          <Tv className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">Loja CineStream</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Precisa de um aparelho para sua TV?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-foreground/65">
            Compare as configurações dos modelos Amazon Fire TV Stick, Tomate TV Stick e Xiaomi TV Stick em nossa lojinha.
          </p>
        </div>
        <Link
          to="/loja"
          onClick={() => trackButtonClick('Conhecer a lojinha', 'home-loja')}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-purple-500 px-7 font-bold text-white transition hover:bg-purple-400"
        >
          Conhecer a lojinha <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default StoreCta;
