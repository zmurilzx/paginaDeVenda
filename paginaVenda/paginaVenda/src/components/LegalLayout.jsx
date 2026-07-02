import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Seo from '@/components/Seo';

const LegalLayout = ({ title, description, path, children }) => (
  <div className="min-h-screen bg-background text-foreground">
    <Seo title={title} description={description} path={path} />
    <Navbar />
    <main className="container mx-auto max-w-4xl px-4 pb-20 pt-28 md:px-6">
      <h1 className="mb-3 text-3xl font-bold md:text-5xl">{title}</h1>
      <p className="mb-10 text-sm text-foreground/50">Última atualização: 2 de julho de 2026.</p>
      <div className="legal-content space-y-8 text-foreground/75">{children}</div>
    </main>
    <Footer />
  </div>
);

export default LegalLayout;
