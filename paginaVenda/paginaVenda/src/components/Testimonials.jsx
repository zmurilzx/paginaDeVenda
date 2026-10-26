import { ImagePlus, MessagesSquare } from 'lucide-react';

const testimonials = [
  { id: 1, label: 'Depoimento 01' },
  { id: 2, label: 'Depoimento 02' },
  { id: 3, label: 'Depoimento 03' },
];

const Testimonials = () => (
  <section id="testimonials" className="defer-render scroll-mt-16 border-t border-white/10 py-16 md:py-24" aria-labelledby="testimonials-title">
    <div className="container mx-auto px-4 md:px-6">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-green-300">
          <MessagesSquare className="h-4 w-4" aria-hidden="true" /> Conversas reais
        </p>
        <h2 id="testimonials-title" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Depoimentos</h2>
        <p className="mt-4 leading-relaxed text-foreground/60">Espaço para compartilhar experiências enviadas por clientes pelo WhatsApp.</p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="flex min-h-72 items-center justify-center rounded-2xl border-2 border-dashed border-green-400/25 bg-green-950/10 p-6 text-center sm:aspect-[9/16] sm:min-h-0">
            <div>
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-300">
                <ImagePlus className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground/85">{testimonial.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/50">Adicione aqui um print autorizado da conversa no WhatsApp.</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-foreground/45">Antes de publicar, oculte telefone, foto, sobrenome e outras informações pessoais do cliente.</p>
    </div>
  </section>
);

export default Testimonials;
