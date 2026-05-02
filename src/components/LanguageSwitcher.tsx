import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
export const LanguageSwitcher = () => {
  const {
    language,
    toggleLanguage
  } = useLanguage();
  return <Button onClick={toggleLanguage} variant="ghost" size="sm" className="hover:bg-primary-foreground/10 font-bold gap-2 text-zinc-950">
      <Languages className="h-4 w-4" />
      {language === "ar" ? "EN" : "AR"}
    </Button>;
};