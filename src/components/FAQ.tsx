import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";

export const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t("faq1Question"),
      answer: t("faq1Answer")
    },
    {
      question: t("faq2Question"),
      answer: t("faq2Answer")
    },
    {
      question: t("faq3Question"),
      answer: t("faq3Answer")
    },
    {
      question: t("faq4Question"),
      answer: t("faq4Answer")
    },
    {
      question: t("faq5Question"),
      answer: t("faq5Answer")
    },
    {
      question: t("faq6Question"),
      answer: t("faq6Answer")
    }
  ];

  return (
    <>
      <SectionDivider icon={HelpCircle} variant="primary" />
      
      <section id="faq" className="relative py-32 bg-background overflow-hidden">
        <ParallaxBackground speed={0.3}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </ParallaxBackground>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10">
            <HelpCircle className="inline w-4 h-4 mb-1 text-primary" />
            <span className="text-primary font-black text-sm ms-2 uppercase tracking-widest">{t("faqTitle")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
            {t("commonQuestions")}
          </h2>
          <div className="h-1.5 w-24 bg-primary/20 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("faqDescription")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-border rounded-2xl px-6 bg-card hover:border-accent/50 transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-start text-lg font-bold text-foreground hover:text-accent py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">{t("stillHaveQuestions")}</p>
          <a
            href="https://wa.me/966551307790"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
          >
            {t("contactUsWhatsApp")}
          </a>
        </div>
      </div>
    </section>
    </>
  );
};
