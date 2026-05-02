import { useEffect } from 'react';

export const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      return;
    }

    // First Contentful Paint
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      }
    });
    
    paintObserver.observe({ type: 'paint', buffered: true });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // First Input Delay (via click/keydown/etc)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const fidEntry = entry as any;
        const fid = fidEntry.processingStart - fidEntry.startTime;
        console.log('FID:', fid);
      }
    });

    fidObserver.observe({ type: 'first-input', buffered: true });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          console.log('CLS:', clsValue);
        }
      }
    });

    clsObserver.observe({ type: 'layout-shift', buffered: true });

    return () => {
      paintObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return null;
};
