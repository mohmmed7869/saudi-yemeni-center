import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Phone, User, MessageSquare, Loader2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";

// Form validation schema
const contactSchema = z.object({
  name: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم طويل جداً"),
  phone: z.string().trim().min(10, "رقم الهاتف غير صحيح").max(15, "رقم الهاتف طويل جداً"),
  message: z.string().trim().min(10, "الرسالة قصيرة جداً").max(1000, "الرسالة طويلة جداً")
});
export const Contact = () => {
  const {
    toast
  } = useToast();
  const {
    t,
    language
  } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Build WhatsApp message
      const phoneNumber = "966551307790";
      const whatsappMessage = `
مرحباً، أنا ${validatedData.name}
رقم الهاتف: ${validatedData.phone}

الرسالة:
${validatedData.message}
      `.trim();

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      // Success feedback
      toast({
        title: t('successTitle'),
        description: t('willContactYou')
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: {
          [key: string]: string;
        } = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: t('errorTitle'),
          description: language === 'ar' ? 'يرجى التحقق من البيانات المدخلة' : 'Please check your input',
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
    <SectionDivider icon={MessageSquare} variant="accent" />

    <section id="contact" className="relative py-32 bg-muted/30 overflow-hidden">
      <ParallaxBackground speed={0.25}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </ParallaxBackground>

      <ParallaxBackground speed={-0.25}>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </ParallaxBackground>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-6 py-2 mb-6 rounded-full bg-primary/5 border border-primary/10">
            <span className="text-primary font-black text-sm uppercase tracking-widest">{t('contactTitle')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-6">
            {t('weServeYou')}
          </h2>
          <div className="h-1.5 w-24 bg-primary/20 mx-auto rounded-full mb-6" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('contactDescription')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-8 bg-primary text-primary-foreground border-0 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">{t('contactInfo')}</h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium mb-1">{t('phoneNumbers')}</p>
                    <a href="tel:0551307790" className="text-lg font-bold hover:text-accent transition-colors block">
                      0551307790
                    </a>
                    <a href="tel:0556928243" className="text-lg font-bold hover:text-accent transition-colors block">
                      0556928243
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium mb-1">{t('manager')}</p>
                    <p className="text-xl font-bold">{t('managerName')}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 bg-white/70 backdrop-blur-2xl border border-primary/10 shadow-xl rounded-[3rem] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h4 className="text-center text-xl font-black mb-2 text-primary tracking-tight">
                {t('availableTime')}
              </h4>
              <p className="text-center text-lg font-bold text-primary/70">
                {t('workHours')}
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-2 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">{t('sendMessage')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-right block">
                  {t('yourName')}
                </label>
                <div className="relative">
                  <Input id="contact-name" type="text" placeholder={t('yourName')} value={formData.name} onChange={e => {
                    setFormData({
                      ...formData,
                      name: e.target.value
                    });
                    setErrors({
                      ...errors,
                      name: ""
                    });
                  }} className={`pr-10 text-right ${errors.name ? 'border-destructive' : ''}`} dir="rtl" disabled={isSubmitting} aria-label={t('yourName')} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                  <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.name && <p id="name-error" className="text-sm text-destructive text-right" role="alert">
                  {errors.name}
                </p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-phone" className="text-sm font-medium text-right block">
                  {t('yourPhone')}
                </label>
                <div className="relative">
                  <Input id="contact-phone" type="tel" placeholder={t('yourPhone')} value={formData.phone} onChange={e => {
                    setFormData({
                      ...formData,
                      phone: e.target.value
                    });
                    setErrors({
                      ...errors,
                      phone: ""
                    });
                  }} className={`pr-10 text-right ${errors.phone ? 'border-destructive' : ''}`} dir="rtl" disabled={isSubmitting} aria-label={t('yourPhone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.phone && <p id="phone-error" className="text-sm text-destructive text-right" role="alert">
                  {errors.phone}
                </p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-right block">
                  {t('yourMessage')}
                </label>
                <div className="relative">
                  <Textarea id="contact-message" placeholder={t('yourMessage')} value={formData.message} onChange={e => {
                    setFormData({
                      ...formData,
                      message: e.target.value
                    });
                    setErrors({
                      ...errors,
                      message: ""
                    });
                  }} className={`min-h-32 pr-10 text-right resize-none ${errors.message ? 'border-destructive' : ''}`} dir="rtl" disabled={isSubmitting} aria-label={t('yourMessage')} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                  <MessageSquare className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
                {errors.message && <p id="message-error" className="text-sm text-destructive text-right" role="alert">
                  {errors.message}
                </p>}
              </div>

              <Button type="submit" size="lg" className="w-full" variant="default" disabled={isSubmitting} aria-label={isSubmitting ? language === 'ar' ? 'جاري الإرسال...' : 'Sending...' : t('send')}>
                {isSubmitting ? <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                </> : t('send')}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  </>;
};