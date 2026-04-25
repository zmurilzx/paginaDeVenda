export const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-2 border-white/20 border-t-white ${sizeClasses[size]}`}></div>
    </div>
  );
};

export const SkeletonLoader = ({ className = '', lines = 3 }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-white/10 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
};

export const VideoLoader = () => {
  return (
    <div className="relative w-full aspect-video bg-black/50 rounded-xl overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-white/60 text-sm">Carregando vídeo...</p>
      </div>
    </div>
  );
};
