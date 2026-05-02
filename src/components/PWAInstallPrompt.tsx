import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 30 seconds if user hasn't dismissed it before
      const hasSeenPrompt = localStorage.getItem('pwa-prompt-dismissed');
      if (!hasSeenPrompt) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 30000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 animate-fade-in-up">
      <Card className="p-6 bg-card border-2 border-accent/50 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-glow flex items-center justify-center">
            <Download className="w-6 h-6 text-accent-foreground" />
          </div>
          
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              {t("installApp")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("installAppDescription")}
            </p>
            
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleInstallClick}
                size="sm"
                className="flex-1 bg-accent hover:bg-accent-glow text-accent-foreground"
              >
                {t("install")}
              </Button>
              <Button
                onClick={handleDismiss}
                size="sm"
                variant="outline"
                className="flex-shrink-0"
              >
                {t("later")}
              </Button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </Card>
    </div>
  );
};
