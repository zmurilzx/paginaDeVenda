const ProductImage = ({ product, className = '' }) => {
  if (!product.image) {
    return (
      <div className={`flex h-full w-full items-center justify-center ${className}`} role="img" aria-label={`Representação de ${product.name}`}>
        <div className="relative w-[72%] max-w-64">
          <div className="flex aspect-[2.4/1] items-center justify-center rounded-[1.15rem] border border-white/10 bg-[#17171d] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <span className="text-sm font-semibold tracking-wide text-white/80">{product.brand}</span>
          </div>
          <div className="absolute left-full top-1/2 h-7 w-8 -translate-y-1/2 rounded-r border border-l-0 border-white/10 bg-[#22222a]" />
          <div className="absolute -bottom-9 left-1/2 h-7 w-px bg-white/15" />
        </div>
      </div>
    );
  }

  return <img src={product.image} alt={product.name} className={className} loading="lazy" decoding="async" />;
};

export default ProductImage;
