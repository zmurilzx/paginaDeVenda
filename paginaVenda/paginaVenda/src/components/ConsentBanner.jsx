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
    <aside className="fixed inset-x-2 bottom-2 z-[60] mx-auto max-w-3xl rounded-xl border border-white/15 bg-[#16161f]/95 p-3 shadow-2xl backdrop-blur sm:inset-x-4 sm:bottom-4 sm:p-4" aria-label="Preferências de privacidade">
      <div className="sm:flex sm:items-center sm:gap-5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Sua privacidade</p>
          <p className="mt-1 text-xs leading-relaxed text-foreground/65 sm:text-sm">
            Com sua autorização, usamos métricas. Você pode recusar sem perder acesso ao site. Veja a <Link to="/privacidade" className="text-purple-300 underline underline-offset-4">Política de Privacidade</Link>.
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-0 sm:flex sm:shrink-0">
          <Button type="button" size="sm" variant="outline" onClick={() => decide(false)}>Recusar</Button>
          <Button type="button" size="sm" className="bg-purple-500 text-white hover:bg-purple-400" onClick={() => decide(true)}>Aceitar</Button>
        </div>
      </div>
    </aside>
  );
};

export default ConsentBanner;
