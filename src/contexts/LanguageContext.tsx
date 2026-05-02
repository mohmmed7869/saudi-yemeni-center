import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    aboutUs: "من نحن",
    services: "الخدمات",
    gallery: "معرض الأعمال",
    testimonials: "آراء العملاء",
    branches: "الفروع",
    contactUs: "اتصل بنا",
    callNow: "اتصل الآن",

    // Hero
    premiumService: "خدمة متميزة منذ سنوات",
    companyName: "المركز السعودي اليمني",
    heroTitle: "إصلاح هواء جميع أنواع الشاحنات",
    heroSubtitle: "بجودة عالية وبإشراف متخصصين محترفين",
    bookNow: "احجز موعدك الآن",
    callUsNow: "اتصل بنا الآن",
    wideExperience: "خبرة واسعة",
    professionalTeam: "فريق محترف متخصص",
    fastService: "خدمة سريعة",
    efficientExecution: "تنفيذ فعّال واحترافي",
    highQuality: "جودة عالية",
    bestMaterials: "أفضل المواد والقطع",

    // Services
    ourServices: "خدماتنا المتخصصة",
    professionalServices: "خدمات احترافية شاملة",
    servicesDescription: "نقدم مجموعة متكاملة من خدمات إصلاح الهواء للشاحنات بأعلى معايير الجودة العالمية",
    airBlowerRepair: "إصلاح بلوف الهواء",
    airBlowerDesc: "إصلاح وصيانة شاملة لجميع أنواع بلوف الهواء بأحدث التقنيات",
    valves: "البواكم",
    valvesDesc: "تركيب وإصلاح البواكم بأعلى معايير الجودة والدقة",
    pistonOverhaul: "عمرة بساتم",
    pistonDesc: "عمرة كاملة للبساتم مع ضمان الأداء المثالي",
    oilSystem: "عفريت الزيت",
    oilSystemDesc: "فحص وإصلاح شامل لمنظومة الزيت بالكامل",
    airLineCleaning: "تنظيف ليّات الهواء",
    airLineDesc: "تنظيف احترافي متقدم لليات الهواء لأداء متميز",
    latheService: "مخرطة متكاملة",
    latheDesc: "خرط هوبات وتعديل قطع الشاحنات بأعلى دقة واحترافية",

    // Gallery
    galleryTitle: "معرض الأعمال",
    ourWorkSpeaks: "أعمالنا تتحدث عن نفسها",
    galleryDescription: "نفخر بإنجازاتنا ونعرض لكم نماذج من أعمالنا المتميزة التي تعكس خبرتنا واحترافيتنا",
    advancedRepair: "عملية إصلاح متقدمة",
    precisionMaintenance: "أعمال صيانة دقيقة",
    professionalOverhaul: "عمرة شاملة احترافية",
    comprehensiveInspection: "فحص شامل ودقيق",
    advancedCleaning: "تنظيف متقدم",
    integratedServices: "خدمات متكاملة",
    updateImages: "يمكنك تحديث الصور من خلال استبدال روابط الصور في ملف Gallery.tsx",
    gallery1Title: "إصلاح بلوف الهواء",
    gallery1Desc: "إصلاح نظام التكييف للشاحنات",
    gallery2Title: "صيانة البواكم",
    gallery2Desc: "بواكم محركات الشاحنات الثقيلة",
    gallery3Title: "عمرة البساتم",
    gallery3Desc: "بساتم محركات الشاحنات",
    gallery4Title: "فحص منظومة الزيت",
    gallery4Desc: "نظام الزيت للشاحنات الثقيلة",
    gallery5Title: "تنظيف ليات الهواء",
    gallery5Desc: "فلاتر هواء الشاحنات",
    gallery6Title: "ورشة الشاحنات",
    gallery6Desc: "مرافق متخصصة للشاحنات الثقيلة",

    // Testimonials
    clientTestimonials: "آراء العملاء",
    clientsSay: "ماذا يقول عملاؤنا",
    testimonialsDescription: "نعتز بثقة عملائنا ونفخر بتقييماتهم الإيجابية التي تعكس مستوى خدماتنا المتميزة",
    testimonial1: "خدمة ممتازة وسريعة جداً. فريق محترف وأسعار مناسبة. أنصح بشدة!",
    testimonial2: "إصلاح احترافي وجودة عالية. تعاملت معهم أكثر من مرة ودائماً راضي عن الخدمة.",
    testimonial3: "أفضل مركز لإصلاح هواء الشاحنات في جدة. خبرة ومصداقية.",
    testimonial4: "سرعة في التنفيذ وجودة في العمل. شكراً للفريق المحترف.",
    testimonial5: "أسعار منافسة وخدمة متميزة. سأتعامل معهم دائماً.",
    testimonial6: "فريق رائع ومتعاون. إصلاحات دقيقة وضمان على العمل.",
    truckOwner: "مالك شاحنة",

    // Branches
    ourBranches: "فروعنا",
    premiumLocations: "مواقعنا المتميزة",
    branchesDescription: "نخدمك في موقعين استراتيجيين مع أفضل المعدات الحديثة والكوادر المتخصصة",
    visitUs: "قم بزيارتنا في أقرب فرع لك وستحصل على خدمة متميزة واحترافية",
    jeddah: "جدة",
    jeddahAddress: "طريق عسفان خلف محطة عمر خميس",
    alkhumra: "الخمرة",
    alkhumraAddress: "جنوب دوار القوزين بجوار ميشلان",
    viewOnMap: "عرض على الخريطة",

    // Contact
    contactTitle: "تواصل معنا",
    weServeYou: "نحن بخدمتكم",
    contactDescription: "نحن هنا للإجابة على جميع استفساراتك وحجز موعدك بكل سهولة",
    contactInfo: "معلومات الاتصال",
    phoneNumbers: "أرقام الهاتف",
    manager: "المدير",
    managerName: "علي أبو ضيف الله",
    availableTime: "نحن متاحون من السبت إلى الخميس",
    workHours: "من الساعة 8 صباحاً حتى 8 مساءً",
    sendMessage: "أرسل رسالة",
    yourName: "اسمك",
    yourPhone: "رقم هاتفك",
    yourMessage: "رسالتك",
    send: "إرسال",
    errorTitle: "خطأ",
    fillAllFields: "يرجى ملء جميع الحقول",
    successTitle: "تم الإرسال بنجاح",
    willContactYou: "سنتواصل معك في أقرب وقت ممكن",

    // About Us Page
    aboutUsTitle: "من نحن",
    aboutUsHeading: "المركز السعودي اليمني",
    aboutUsSubtitle: "رحلة من الخبرة والإتقان في خدمة عملائنا الكرام",
    ourStory: "قصتنا",
    ourStoryHeading: "كيف بدأنا",
    ourStoryDesc: "بدأ المركز السعودي اليمني مسيرته منذ أكثر من 15 عاماً كمركز متخصص في إصلاح وصيانة أنظمة الهواء للشاحنات. نفخر بأننا بنينا سمعة قوية في السوق السعودي من خلال التزامنا بأعلى معايير الجودة والمصداقية في التعامل مع عملائنا. فريقنا من الفنيين المتخصصين يتمتع بخبرة عميقة وشغف حقيقي لتقديم أفضل الخدمات.",
    ourVision: "رؤيتنا",
    ourVisionDesc: "أن نكون المركز الرائد والأكثر ثقة في مجال إصلاح وصيانة أنظمة الهواء للشاحنات في المملكة، مع التوسع لخدمة المزيد من المدن وتقديم خدمات متميزة تفوق توقعات عملائنا.",
    ourMission: "رسالتنا",
    ourMissionDesc: "تقديم خدمات إصلاح وصيانة احترافية للشاحنات بأعلى معايير الجودة، باستخدام أحدث التقنيات والمعدات، وبأسعار تنافسية، مع الحرص على بناء علاقات طويلة الأمد مع عملائنا.",
    ourValues: "قيمنا",
    ourValuesHeading: "ما يميزنا",
    quality: "الجودة",
    qualityDesc: "نلتزم بأعلى معايير الجودة في كل خدمة نقدمها",
    professionalism: "الاحترافية",
    professionalismDesc: "فريق عمل مدرب ومؤهل لتقديم أفضل الخدمات",
    accuracy: "الدقة",
    accuracyDesc: "نهتم بأدق التفاصيل في كل عملية إصلاح",
    speed: "السرعة",
    speedDesc: "نحرص على إنجاز العمل في أسرع وقت ممكن",
    happyClients: "عميل راضٍ",

    // Footer
    footerAbout: "نقدم خدمات إصلاح الهواء للشاحنات بأعلى معايير الجودة العالمية وبإشراف متخصصين محترفين ذوي خبرة واسعة",
    copyright: "جميع الحقوق محفوظة",
    quickLinks: "روابط سريعة",
    truckAirRepair: "إصلاح هواء الشاحنات",

    // Statistics
    ourAchievements: "إنجازاتنا",
    numbersSpeak: "الأرقام تتحدث عن نفسها",
    happyCustomers: "عميل سعيد",
    yearsExperience: "سنة خبرة",
    satisfactionRate: "نسبة الرضا",
    completedProjects: "مشروع مكتمل",

    // FAQ
    faqTitle: "الأسئلة الشائعة",
    commonQuestions: "الأسئلة الأكثر شيوعاً",
    faqDescription: "إجابات واضحة وسريعة لأكثر الأسئلة شيوعاً حول خدماتنا",
    stillHaveQuestions: "هل لديك أسئلة أخرى؟",
    contactUsWhatsApp: "تواصل معنا عبر واتساب",
    faq1Question: "ما هي المدة اللازمة لإصلاح بلوف الهواء؟",
    faq1Answer: "عادةً ما يستغرق إصلاح بلوف الهواء من يوم إلى ثلاثة أيام عمل حسب حالة القطعة ومدى الضرر. نحن نحرص على إنهاء العمل في أسرع وقت ممكن مع الحفاظ على أعلى معايير الجودة.",
    faq2Question: "هل تقدمون ضمان على الإصلاحات؟",
    faq2Answer: "نعم، نقدم ضمان شامل على جميع أعمال الإصلاح والصيانة. مدة الضمان تختلف حسب نوع الخدمة، ولكنها تبدأ من 3 أشهر وقد تصل إلى سنة كاملة.",
    faq3Question: "هل تتوفر لديكم خدمة الاستلام والتوصيل؟",
    faq3Answer: "نعم، نوفر خدمة استلام وتوصيل الشاحنات من وإلى موقعك ضمن نطاق جدة والمناطق المجاورة. يرجى التواصل معنا لمعرفة التفاصيل والتكلفة.",
    faq4Question: "ما هي طرق الدفع المتاحة؟",
    faq4Answer: "نقبل جميع طرق الدفع: نقداً، بطاقات الائتمان والخصم المباشر، والتحويل البنكي. كما نوفر إمكانية الدفع بالتقسيط لبعض الخدمات الكبيرة.",
    faq5Question: "هل يمكنني الحصول على عرض سعر قبل البدء بالإصلاح؟",
    faq5Answer: "بالتأكيد! نقوم بفحص شامل أولاً ثم نقدم لك عرض سعر تفصيلي قبل البدء بأي عمل. لن نبدأ الإصلاح إلا بعد موافقتك على التكلفة.",
    faq6Question: "هل تعملون في عطلة نهاية الأسبوع؟",
    faq6Answer: "نعمل من السبت إلى الخميس من الساعة 8 صباحاً حتى 6 مساءً. نحن مغلقون يوم الجمعة، ولكن يمكنك حجز موعدك مسبقاً عبر واتساب أو الاتصال المباشر.",

    // PWA
    installApp: "تثبيت التطبيق",
    installAppDescription: "أضف تطبيقنا إلى شاشتك الرئيسية للوصول السريع والعمل بدون إنترنت",
    install: "تثبيت",
    later: "لاحقاً",
  },
  en: {
    // Navigation
    home: "Home",
    aboutUs: "About Us",
    services: "Services",
    gallery: "Gallery",
    testimonials: "Testimonials",
    branches: "Branches",
    contactUs: "Contact Us",
    callNow: "Call Now",

    // Hero
    premiumService: "Premium Service Since Years",
    companyName: "Saudi Yemeni Center",
    heroTitle: "Truck Air System Repair - All Types",
    heroSubtitle: "High Quality with Professional Supervision",
    bookNow: "Book Now",
    callUsNow: "Call Us Now",
    wideExperience: "Wide Experience",
    professionalTeam: "Professional Specialized Team",
    fastService: "Fast Service",
    efficientExecution: "Efficient Professional Execution",
    highQuality: "High Quality",
    bestMaterials: "Best Materials & Parts",

    // Services
    ourServices: "Our Specialized Services",
    professionalServices: "Comprehensive Professional Services",
    servicesDescription: "We provide an integrated range of truck air repair services with the highest international quality standards",
    airBlowerRepair: "Air Blower Repair",
    airBlowerDesc: "Comprehensive repair and maintenance for all types of air blowers with the latest technologies",
    valves: "Valves",
    valvesDesc: "Installation and repair of valves with the highest quality and precision standards",
    pistonOverhaul: "Piston Overhaul",
    pistonDesc: "Complete piston overhaul with guaranteed optimal performance",
    oilSystem: "Oil System",
    oilSystemDesc: "Comprehensive inspection and repair of the entire oil system",
    airLineCleaning: "Air Line Cleaning",
    airLineDesc: "Advanced professional cleaning of air lines for superior performance",
    latheService: "Integrated Lathe",
    latheDesc: "Precision drum machining and truck part modification with high expertise",

    // Gallery
    galleryTitle: "Work Gallery",
    ourWorkSpeaks: "Our Work Speaks for Itself",
    galleryDescription: "We take pride in our achievements and showcase examples of our outstanding work reflecting our expertise and professionalism",
    advancedRepair: "Advanced Repair Operation",
    precisionMaintenance: "Precision Maintenance Work",
    professionalOverhaul: "Professional Comprehensive Overhaul",
    comprehensiveInspection: "Comprehensive Accurate Inspection",
    advancedCleaning: "Advanced Cleaning",
    integratedServices: "Integrated Services",
    updateImages: "You can update images by replacing image URLs in the Gallery.tsx file",
    gallery1Title: "Air Blower Repair",
    gallery1Desc: "Truck Air Conditioning System Repair",
    gallery2Title: "Valve Maintenance",
    gallery2Desc: "Heavy Truck Engine Valves",
    gallery3Title: "Piston Overhaul",
    gallery3Desc: "Truck Engine Pistons",
    gallery4Title: "Oil System Inspection",
    gallery4Desc: "Heavy Truck Oil System",
    gallery5Title: "Air Line Cleaning",
    gallery5Desc: "Truck Air Filters",
    gallery6Title: "Truck Workshop",
    gallery6Desc: "Specialized Heavy Truck Facilities",

    // Testimonials
    clientTestimonials: "Client Testimonials",
    clientsSay: "What Our Clients Say",
    testimonialsDescription: "We value our clients' trust and take pride in their positive reviews reflecting our outstanding service quality",
    testimonial1: "Excellent and very fast service. Professional team and reasonable prices. Highly recommend!",
    testimonial2: "Professional repair and high quality. Dealt with them multiple times and always satisfied with the service.",
    testimonial3: "Best truck air repair center in Jeddah. Experience and credibility.",
    testimonial4: "Fast execution and quality work. Thanks to the professional team.",
    testimonial5: "Competitive prices and outstanding service. I will always deal with them.",
    testimonial6: "Amazing and cooperative team. Accurate repairs and work guarantee.",
    truckOwner: "Truck Owner",

    // Branches
    ourBranches: "Our Branches",
    premiumLocations: "Our Premium Locations",
    branchesDescription: "We serve you at two strategic locations with the best modern equipment and specialized staff",
    visitUs: "Visit us at the nearest branch and you will receive outstanding and professional service",
    jeddah: "Jeddah",
    jeddahAddress: "Asfan Road, Behind Omar Khamis Station",
    alkhumra: "Al-Khumra",
    alkhumraAddress: "South of Al-Qawzain Roundabout, Next to Michelin",
    viewOnMap: "View on Map",

    // Contact
    contactTitle: "Contact Us",
    weServeYou: "We Are at Your Service",
    contactDescription: "We are here to answer all your inquiries and book your appointment easily",
    contactInfo: "Contact Information",
    phoneNumbers: "Phone Numbers",
    manager: "Manager",
    managerName: "Ali Abu Daif Allah",
    availableTime: "We are available from Saturday to Thursday",
    workHours: "From 8 AM to 8 PM",
    sendMessage: "Send Message",
    yourName: "Your Name",
    yourPhone: "Your Phone",
    yourMessage: "Your Message",
    send: "Send",
    errorTitle: "Error",
    fillAllFields: "Please fill all fields",
    successTitle: "Sent Successfully",
    willContactYou: "We will contact you as soon as possible",

    // About Us Page
    aboutUsTitle: "About Us",
    aboutUsHeading: "Saudi Yemeni Center",
    aboutUsSubtitle: "A journey of expertise and perfection in serving our valued clients",
    ourStory: "Our Story",
    ourStoryHeading: "How We Started",
    ourStoryDesc: "Saudi Yemeni Center began its journey over 15 years ago as a specialized center for repairing and maintaining truck air systems. We are proud to have built a strong reputation in the Saudi market through our commitment to the highest standards of quality and credibility in dealing with our customers. Our team of specialized technicians has deep experience and genuine passion for providing the best services.",
    ourVision: "Our Vision",
    ourVisionDesc: "To be the leading and most trusted center in truck air system repair and maintenance in the Kingdom, expanding to serve more cities and providing outstanding services that exceed our customers' expectations.",
    ourMission: "Our Mission",
    ourMissionDesc: "To provide professional truck repair and maintenance services with the highest quality standards, using the latest technologies and equipment, at competitive prices, while ensuring long-term relationships with our customers.",
    ourValues: "Our Values",
    ourValuesHeading: "What Sets Us Apart",
    quality: "Quality",
    qualityDesc: "We commit to the highest quality standards in every service we provide",
    professionalism: "Professionalism",
    professionalismDesc: "A trained and qualified team to provide the best services",
    accuracy: "Accuracy",
    accuracyDesc: "We pay attention to the finest details in every repair",
    speed: "Speed",
    speedDesc: "We ensure work completion in the fastest time possible",
    happyClients: "Happy Clients",

    // Footer
    footerAbout: "We provide truck air repair services with the highest international quality standards and under the supervision of experienced professional specialists",
    copyright: "All Rights Reserved",
    quickLinks: "Quick Links",
    truckAirRepair: "Truck Air Repair",

    // Statistics
    ourAchievements: "Our Achievements",
    numbersSpeak: "Numbers Speak for Themselves",
    happyCustomers: "Happy Customers",
    yearsExperience: "Years Experience",
    satisfactionRate: "Satisfaction Rate",
    completedProjects: "Completed Projects",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    commonQuestions: "Most Common Questions",
    faqDescription: "Clear and quick answers to the most frequently asked questions about our services",
    stillHaveQuestions: "Still have questions?",
    contactUsWhatsApp: "Contact us via WhatsApp",
    faq1Question: "How long does air blower repair take?",
    faq1Answer: "Air blower repair typically takes one to three business days depending on the part's condition and extent of damage. We ensure the work is completed as quickly as possible while maintaining the highest quality standards.",
    faq2Question: "Do you offer warranty on repairs?",
    faq2Answer: "Yes, we provide comprehensive warranty on all repair and maintenance work. Warranty period varies by service type, starting from 3 months and up to a full year.",
    faq3Question: "Do you offer pickup and delivery service?",
    faq3Answer: "Yes, we provide truck pickup and delivery service to and from your location within Jeddah and surrounding areas. Please contact us for details and costs.",
    faq4Question: "What payment methods do you accept?",
    faq4Answer: "We accept all payment methods: cash, credit and debit cards, and bank transfers. We also offer installment plans for some major services.",
    faq5Question: "Can I get a quote before repair starts?",
    faq5Answer: "Absolutely! We perform a comprehensive inspection first, then provide you with a detailed quote before any work begins. We won't start repairs until you approve the cost.",
    faq6Question: "Do you work on weekends?",
    faq6Answer: "We work Saturday through Thursday from 8 AM to 6 PM. We are closed on Fridays, but you can book your appointment in advance via WhatsApp or direct call.",

    // PWA
    installApp: "Install App",
    installAppDescription: "Add our app to your home screen for quick access and offline functionality",
    install: "Install",
    later: "Later",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ar";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
