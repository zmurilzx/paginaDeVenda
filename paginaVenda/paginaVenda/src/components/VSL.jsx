import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessagesSquare, Play } from 'lucide-react';
import { trackButtonClick, trackVideoPlay } from '@/utils/analytics';

const VSL = ({ analyticsEnabled }) => {
  const [videoEnabled, setVideoEnabled] = useState(analyticsEnabled);
  const videoTracked = useRef(false);
  const canShowVideo = analyticsEnabled || videoEnabled;

  useEffect(() => {
    if (!canShowVideo) return undefined;

    const addScript = (id, src, type) => {
      if (document.getElementById(id)) return;
      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      if (type) script.type = type;
      document.head.appendChild(script);
    };

    addScript('wistia-player-script', 'https://fast.wistia.com/player.js');
    addScript('wistia-video-script', 'https://fast.wistia.com/embed/908t1d4xsg.js', 'module');
    return undefined;
  }, [canShowVideo]);

  const handleVideoInteraction = () => {
    if (!videoTracked.current) {
      videoTracked.current = true;
      trackVideoPlay();
    }
  };

  return (
    <section className="relative scroll-mt-16 overflow-hidden pb-14 pt-24 sm:pt-28 md:pb-20 md:pt-32" id="demonstracao">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-purple-900/10 to-background" />
      <div className="absolute right-1/2 top-20 -z-10 h-72 w-72 translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl sm:right-10 sm:h-96 sm:w-96 sm:translate-x-0" />

      <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_0.75fr] lg:gap-14 lg:px-8">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-300">Planos Wapp</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Entretenimento na sua TV a partir de R$ 28,40 por mês
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg lg:mx-0">
            Compare os períodos disponíveis, escolha seu plano e receba as orientações após a confirmação do pagamento.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#pricing"
              onClick={() => trackButtonClick('Ver planos', 'hero')}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-purple-600 px-7 text-base font-semibold text-white transition-colors hover:bg-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Ver planos e assinar
              <ArrowUpRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/5543999748808?text=Olá!%20Quero%20entender%20qual%20plano%20CineStream%20é%20ideal%20para%20mim."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('Falar no WhatsApp', 'hero')}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-green-400/30 bg-green-600/15 px-7 text-base font-semibold text-green-300 transition-colors hover:bg-green-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MessagesSquare className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              Tirar uma dúvida
            </a>
          </div>

          <p className="mt-4 text-sm text-foreground/50">Pagamento concluído no ambiente seguro do parceiro.</p>
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-purple-950/25">
            <div className="aspect-[9/16]" onPointerDown={handleVideoInteraction}>
              {canShowVideo ? (
                <wistia-player media-id="908t1d4xsg" aspect="0.5625" aria-label="Apresentação em vídeo da CineStream" style={{ display: 'block', width: '100%', height: '100%' }} />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-purple-950/50 to-black px-8 text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg shadow-purple-500/20">
                    <Play className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-xl font-bold">Conheça a experiência CineStream</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">O vídeo é hospedado pela Wistia e será carregado somente quando você solicitar.</p>
                  <button
                    type="button"
                    onClick={() => setVideoEnabled(true)}
                    className="mt-6 min-h-12 rounded-lg border border-white/15 bg-white/10 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    Carregar apresentação
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VSL;
