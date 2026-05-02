import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  blurDataURL?: string;
}

export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  blurDataURL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cfilter id="b"%3E%3CfeGaussianBlur stdDeviation="20"/%3E%3C/filter%3E%3Crect width="400" height="300" fill="%23f3f4f6" filter="url(%23b)"/%3E%3C/svg%3E'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={imgRef} className={containerClassName}>
      {isInView && (
        <>
          <motion.img
            src={blurDataURL}
            alt={alt}
            className={`${className} absolute inset-0 w-full h-full transition-opacity duration-300 ${
              isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }}
          />
          <motion.img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            initial={{ scale: 1.1 }}
            animate={{ scale: isLoaded ? 1 : 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </>
      )}
    </div>
  );
};
