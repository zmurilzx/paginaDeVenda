import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CONSENT_STORAGE_KEY = 'cinestream_analytics_consent';

const ConsentBanner = ({ onDecision }) => {
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' && !window.localStorage.getItem(CONSENT_STORAGE_KEY),
  );

  const decide = (granted) => {
    onDecision(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#16161f]/95 p-4 shadow-2xl backdrop-blur sm:inset-x-4 sm:bottom-4 sm:max-h-none sm:p-5" aria-label="Preferências de privacidade">
      <p className="text-sm font-semibold">Sua privacidade</p>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">
        Com sua autorização, usamos métricas e carregamos o vídeo hospedado por um fornecedor externo. Você pode recusar sem perder o acesso ao restante do site. Veja a <Link to="/privacidade" className="text-purple-300 underline underline-offset-4">Política de Privacidade</Link>.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={() => decide(false)}>Recusar</Button>
        <Button type="button" className="bg-purple-500 text-white hover:bg-purple-400" onClick={() => decide(true)}>Aceitar</Button>
      </div>
    </aside>
  );
};

export default ConsentBanner;
