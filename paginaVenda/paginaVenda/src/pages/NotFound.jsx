import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Seo from '@/components/Seo';

const NotFound = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Seo title="Página não encontrada" description="A página solicitada não existe." noIndex />
    <Navbar />
    <main className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-purple-400">Erro 404</p>
      <h1 className="mb-4 text-3xl font-bold md:text-5xl">Página não encontrada</h1>
      <p className="mb-8 text-foreground/60">O endereço pode ter mudado ou não existir.</p>
      <Link to="/"><Button>Voltar ao início</Button></Link>
    </main>
    <Footer />
  </div>
);

export default NotFound;
