import { MonitorSmartphone } from 'lucide-react';

const ProductImage = ({ product, className = '' }) => {
  if (!product.image) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center text-center ${className}`} role="img" aria-label={`Imagem de ${product.name} indisponível`}>
        <MonitorSmartphone className="mb-3 h-16 w-16 text-purple-300/70" strokeWidth={1.5} aria-hidden="true" />
        <p className="max-w-48 text-sm text-foreground/60">Imagem em atualização</p>
      </div>
    );
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};

export default ProductImage;
