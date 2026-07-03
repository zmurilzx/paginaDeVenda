import { Instagram, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Footer = () => (
  <footer className="border-t border-border/30 pb-8 pt-14">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mb-10 grid gap-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/60">Entretenimento e dispositivos para aproveitar sua TV com praticidade.</p>
        </div>
        <nav aria-label="Links institucionais">
          <h2 className="mb-4 font-semibold">Informações</h2>
          <ul className="space-y-3 text-sm text-foreground/65">
            <li><Link className="hover:text-white" to="/loja">Loja de aparelhos</Link></li>
            <li><Link className="hover:text-white" to="/termos">Termos de uso</Link></li>
            <li><Link className="hover:text-white" to="/privacidade">Política de privacidade</Link></li>
            <li><Link className="hover:text-white" to="/reembolso">Política de reembolso</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 font-semibold">Atendimento</h2>
          <div className="flex gap-3">
            <a href="https://wa.me/5543999748808" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-600/15 text-green-400 hover:bg-green-600/25" aria-label="Atendimento pelo WhatsApp"><MessagesSquare strokeWidth={1.7} aria-hidden="true" /></a>
            <a href="https://www.instagram.com/cine.stream2k" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-purple-500/15 text-purple-300 hover:bg-purple-500/25" aria-label="CineStream no Instagram"><Instagram aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/30 pt-6 text-center text-sm text-foreground/50 md:text-left">
        © {new Date().getFullYear()} CineStream. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;
