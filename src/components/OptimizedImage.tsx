import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  lowQualitySrc?: string;
}

export const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  lowQualitySrc,
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <img
        src={isInView ? src : lowQualitySrc || src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        style={{ contentVisibility: 'auto' }}
        {...props}
      />
    </div>
  );
};
