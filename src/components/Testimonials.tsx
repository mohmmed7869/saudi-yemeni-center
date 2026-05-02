import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { SectionDivider } from "./SectionDivider";
import { ParallaxBackground } from "./ParallaxBackground";

const testimonials = [
  {
    id: 1,
    name: "أحمد محمد",
    role: "صاحب شركة نقل",
    rating: 5,
    comment: "خدمة ممتازة واحترافية عالية، تم إصلاح شاحنتي بسرعة وجودة فائقة. أنصح بهم بشدة",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
  },
  {
    id: 2,
    name: "خالد السعيد",
    role: "مالك أسطول شاحنات",
    rating: 5,
    comment: "تعاملت معهم عدة مرات وفي كل مرة أجد الاحترافية والجودة. فريق متميز ومتخصص",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
  },
  {
    id: 3,
    name: "عبدالله الغامدي",
    role: "سائق شاحنة",
    rating: 5,
    comment: "أفضل مركز لإصلاح الشاحنات في المنطقة. الأسعار مناسبة والخدمة سريعة ومتقنة",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
  },
  {
    id: 4,
    name: "سعد القحطاني",
    role: "مدير لوجستيات",
    rating: 5,
    comment: "تجربة رائعة من البداية للنهاية. الفريق محترف والمعدات حديثة والنتائج ممتازة",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saad",
  },
  {
    id: 5,
    name: "محمد العتيبي",
    role: "صاحب مؤسسة نقل",
    rating: 5,
    comment: "منذ سنوات وأنا أتعامل معهم، الثقة والأمانة والجودة هي عنوانهم. خدمة لا تضاهى",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
  },
  {
    id: 6,
    name: "فهد الدوسري",
    role: "مقاول نقل",
    rating: 5,
    comment: "الخدمة ممتازة والأسعار تنافسية. دائماً ما أجد حلول لجميع مشاكل شاحناتي هنا",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahad",
  },
];

export const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      nameEn: "Ahmed Mohammed",
      role: t('truckOwner'),
      rating: 5,
      comment: t('testimonial1'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    },
    {
      id: 2,
      name: "خالد السعيد",
      nameEn: "Khaled Al-Saeed",
      role: t('truckOwner'),
      rating: 5,
      comment: t('testimonial2'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled",
    },
    {
      id: 3,
      name: "عبدالله الغامدي",
      nameEn: "Abdullah Al-Ghamdi",
      role: t('truckOwner'),
      rating: 5,
      comment: t('testimonial3'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abdullah",
    },
    {
      id: 4,
      name: "سعد القحطاني",
      nameEn: "Saad Al-Qahtani",
      role: t('truckOwner'),
      rating: 5,
      comment: t('testimonial4'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saad",
    },
    {
      id: 5,
      name: "محمد العتيبي",
      nameEn: "Mohammed Al-Otaibi",
      role: t('truckOwner'),
      rating: 5,
      comment: t('testimonial5'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    },
    {
      id: 6,
      name: "فهد الدوسري",
      nameEn: "Fahad Al-Dosari",
      role: t('truckOwner'),
      rating: 5,
      comment: t('testimonial6'),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fahad",
    },
  ];

  return (
    <>
      <SectionDivider icon={Quote} variant="primary" />

      <section id="testimonials" className="relative py-32 bg-background overflow-hidden">
        <ParallaxBackground speed={-0.2}>
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </ParallaxBackground>

        <ParallaxBackground speed={0.2}>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </ParallaxBackground>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <div className="inline-block px-6 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-bold text-sm">{t('clientTestimonials')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              {t('clientsSay')}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('testimonialsDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card
                  className="group relative p-8 bg-gradient-to-br from-card to-card/50 border-2 border-border hover:border-primary/50 transition-all duration-500 overflow-hidden h-full"
                >
                  {/* Quote Icon Background */}
                  <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Quote className="w-24 h-24 text-primary" />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-all duration-500" />

                  <div className="relative text-right space-y-5">
                    {/* Rating Stars */}
                    <div className="flex gap-1 justify-end mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                      "{testimonial.comment}"
                    </p>

                    <div className="h-0.5 w-16 bg-gradient-to-l from-primary to-transparent mr-auto" />

                    {/* Customer Info */}
                    <div className="flex items-center gap-4 pt-4">
                      <div className="flex-1 text-right">
                        <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/40 transition-all duration-500" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          loading="lazy"
                          className="relative w-16 h-16 rounded-full border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary/5 border border-primary/20">
              <Star className="w-6 h-6 text-primary fill-primary" />
              <p className="text-xl text-foreground font-bold">
                تقييم 5 نجوم من أكثر من 500+ عميل راضٍ
              </p>
              <Star className="w-6 h-6 text-primary fill-primary" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
