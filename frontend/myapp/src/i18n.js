import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const supportedLanguages = ['en', 'ar', 'hi']
const storedLanguage =
  typeof window !== 'undefined' ? localStorage.getItem('preferredLanguage') : null
const defaultLanguage = supportedLanguages.includes(storedLanguage)
  ? storedLanguage
  : 'en'

const resources = {
  en: {
    translation: {
      common: {
        languages: {
          en: 'English',
          ar: 'Arabic',
          hi: 'Hindi',
        },
        aria: {
          selectLanguage: 'Select language',
          toggleMenu: 'Toggle menu',
          toggleVideoSound: 'Toggle video sound',
          muted: 'Muted',
          unmuted: 'Sound on',
        },
      },
      nav: {
        home: 'Home',
        services: 'Services',
        reviews: 'Reviews',
        doctors: 'Doctors',
        guide: 'Medical Guide',
        feedback: 'Feedback',
        contact: 'Contact',
        consult: 'Free Consultation',
      },
      hero: {
        badge: 'Global Medical Tourism Platform',
        title: 'Medical Tourism Made Easy',
        sub: 'Trusted medical guidance for Arab patients in India',
        primaryCta: 'Contact Medical Guide',
        secondaryCta: 'Explore Treatments',
        stats: {
          hospitals: 'Accredited Hospitals',
          countries: 'Countries',
          patients: 'International Patients',
        },
        carousel: {
          one: 'Advanced surgical care',
          two: 'Global patient coordination',
          three: 'Recovery and follow-up support',
        },
      },
      video: {
        badge: 'Start Here',
        title: 'How MedGuide Works',
        subtitle:
          'Watch a quick introduction in your selected language to understand our treatment journey, coordination model, and patient support.',
        sourceNote:
          'Videos: /public/videos/intro-en.mp4, intro-ar.mp4, intro-hi.mp4',
        unsupported: 'Your browser does not support video playback.',
        fallbackTitle: 'Video will be available soon',
        fallbackText:
          'We could not load the language-specific video yet. Please continue exploring our services.',
        ctaServices: 'View Services',
        sound: {
          on: 'Turn sound on',
          off: 'Mute',
        },
      },
      subject: {
        title: 'Select Specialty',
        all: 'All',
        general: 'General Medicine',
        cardiology: 'Cardiology',
        dentistry: 'Dentistry',
        oncology: 'Oncology',
        orthopedic: 'Orthopedics',
        neurology: 'Neurology',
      },
      services: {
        badge: 'Our Expertise',
        title: 'Medical Tourism Services',
        subtitle:
          'A complete healthcare facilitation ecosystem designed for international patients, delivering trust, transparency, and world-class medical access.',
        cards: {
          matching: {
            title: 'Hospital & Specialist Matching',
            desc: 'Precision matching with internationally accredited hospitals and globally recognized medical specialists.',
          },
          language: {
            title: 'Language & Translation Support',
            desc: 'Complete Arabic and multilingual support throughout the medical journey.',
          },
          coordination: {
            title: 'Medical Case Coordination',
            desc: 'Seamless coordination between patients, doctors, hospitals, and care teams.',
          },
          planning: {
            title: 'Personalized Treatment Planning',
            desc: 'Custom treatment strategies with transparent timelines, costs, and outcomes.',
          },
          travel: {
            title: 'Travel, Visa & Logistics',
            desc: 'Medical visa processing, travel planning, accommodation, and concierge services.',
          },
          opinion: {
            title: 'Expert Second Opinions',
            desc: 'Independent medical evaluations from world-class doctors and institutions.',
          },
        },
      },
      doctors: {
        badge: 'Doctor Network',
        title: 'Specialist Doctors by Department',
        subtitle:
          'Use filters to explore curated specialist profiles across major treatment areas.',
        hospital: 'Hospital',
        experience: 'Experience',
        languages: 'Languages',
      },
      reviews: {
        badge: 'Verified Feedback',
        title: 'Patient Video Reviews & Testimonials',
        subtitle:
          'Real stories from patients who completed consultation and treatment support.',
        sound: {
          on: 'Play with sound',
          off: 'Mute sound',
        },
        admin: {
          error: 'Invalid admin key. Update it in component constant if needed.',
          required: 'Please fill all fields to add a review.',
          title: 'Admin: Add Review Video Link',
          hint: 'Use admin key to unlock review management (default: medguide-admin).',
          key: 'Admin key',
          unlock: 'Unlock',
          formTitle: 'Add New Patient Review',
          patient: 'Patient name',
          country: 'Country',
          specialty: 'Specialty',
          video: 'Video URL (mp4)',
          text: 'Review text',
          add: 'Add Review',
          clear: 'Clear Admin Added Reviews',
        },
      },
      guide: {
        roleTitle: 'Medical Care Coordinator',
        roleSub: 'International Patient Services',
        title: 'Your Dedicated Medical Guide',
        subtitle:
          'Personal healthcare coordinator for international and cross-border patients',
        info: {
          one: 'Saudi origin specialist',
          two: '10+ years in India',
          three: 'Arabic, Hindi, English',
          four: 'Multi-hospital network access',
        },
        desc: 'Trusted medical tourism coordinator specializing in Arab-region patients. Providing hospital matching, treatment planning, visa support, accommodation coordination, and complete end-to-end patient care services.',
        primaryCta: 'Talk to Medical Guide',
        secondaryCta: 'View Services',
      },
      queryFeedback: {
        required: 'Please complete all fields before submitting feedback.',
        success: 'Thank you. Your feedback has been submitted successfully.',
        badge: 'Support Check',
        title: 'Did We Answer Your Query?',
        subtitle:
          'Send quick feedback so we can improve response quality and patient coordination.',
        name: 'Your name',
        yes: 'Yes, my query was answered',
        no: 'No, I still need support',
        message: 'Write your feedback',
        submit: 'Send Feedback',
      },
      contact: {
        brandTitle: 'Global Medical Tourism',
        brandSub:
          'World-class hospitals | Trusted doctors | Seamless care coordination',
        features: {
          one: 'Free consultation',
          two: 'Dedicated medical coordinator',
          three: 'International patient support',
          four: 'End-to-end treatment planning',
        },
        formTitle: 'Request Free Medical Consultation',
        formSubtitle:
          'Our experts will guide you through the best treatment options worldwide',
        placeholders: {
          name: 'Full Name',
          phone: 'Phone / WhatsApp',
          country: 'Country',
          specialty: 'Preferred Specialty',
          problem: 'Describe your medical concern',
        },
        actions: {
          submitting: 'Submitting...',
          submit: 'Request Consultation',
        },
        privacy: 'Your information is confidential and securely handled.',
        errors: {
          required: 'All fields are required',
          phone: 'Please enter a valid phone number',
          generic: 'Something went wrong. Please try again later.',
        },
        success: 'Thank you! Our medical coordinator will contact you shortly.',
      },
      footer: {
        brandDesc:
          'Global Medical Tourism Platform connecting patients with world-class hospitals, doctors, and treatment centers worldwide.',
        badges: {
          hipaa: 'HIPAA Compliant',
          iso: 'ISO Certified Partners',
          international: 'International Patient Care',
        },
        sections: {
          services: 'Services',
          support: 'Support',
          regions: 'Regions',
        },
        links: {
          medicalTourism: 'Medical Tourism',
          hospitalMatching: 'Hospital Matching',
          visaAssistance: 'Visa Assistance',
          secondOpinion: 'Second Opinion',
          contactUs: 'Contact Us',
          patientCare: 'Patient Care',
          faqs: 'FAQs',
          privacyPolicy: 'Privacy Policy',
          india: 'India',
          turkey: 'Turkey',
          thailand: 'Thailand',
          uae: 'UAE',
        },
        bottom: {
          rights: '© 2026 MedGuide. All rights reserved.',
          tagline: 'Trusted Global Healthcare Network',
        },
      },
      languageModal: {
        title: 'Select Language',
        subtitle: 'Choose your preferred language for the best experience',
        descriptions: {
          en: 'Global language',
          ar: 'Language direction: RTL',
          hi: 'Regional language',
        },
        cancel: 'Cancel',
      },
    },
  },
  ar: {
    translation: {
      common: {
        languages: {
          en: 'الإنجليزية',
          ar: 'العربية',
          hi: 'الهندية',
        },
        aria: {
          selectLanguage: 'اختر اللغة',
          toggleMenu: 'تبديل القائمة',
          toggleVideoSound: 'تبديل صوت الفيديو',
          muted: 'مكتوم',
          unmuted: 'الصوت يعمل',
        },
      },
      nav: {
        home: 'الرئيسية',
        services: 'الخدمات',
        reviews: 'المراجعات',
        doctors: 'الأطباء',
        guide: 'الدليل الطبي',
        feedback: 'التقييم',
        contact: 'تواصل معنا',
        consult: 'استشارة مجانية',
      },
      hero: {
        badge: 'منصة السياحة العلاجية العالمية',
        title: 'السياحة العلاجية بسهولة',
        sub: 'إرشاد طبي موثوق لمرضى الخليج في الهند',
        primaryCta: 'تواصل مع الدليل الطبي',
        secondaryCta: 'استعرض العلاجات',
        stats: {
          hospitals: 'مستشفيات معتمدة',
          countries: 'دول',
          patients: 'مرضى دوليون',
        },
        carousel: {
          one: 'رعاية جراحية متقدمة',
          two: 'تنسيق دولي للمرضى',
          three: 'دعم التعافي والمتابعة',
        },
      },
      video: {
        badge: 'ابدأ من هنا',
        title: 'كيف يعمل MedGuide',
        subtitle:
          'شاهد مقدمة سريعة بلغتك لفهم رحلة العلاج وآلية التنسيق ودعم المرضى.',
        sourceNote:
          'الفيديوهات: /public/videos/intro-en.mp4 و intro-ar.mp4 و intro-hi.mp4',
        unsupported: 'متصفحك لا يدعم تشغيل الفيديو.',
        fallbackTitle: 'سيتوفر الفيديو قريبًا',
        fallbackText: 'تعذر تحميل فيديو اللغة المختارة الآن. تابع استكشاف خدماتنا.',
        ctaServices: 'عرض الخدمات',
        sound: {
          on: 'تشغيل الصوت',
          off: 'كتم الصوت',
        },
      },
      subject: {
        title: 'اختر التخصص',
        all: 'الكل',
        general: 'طب عام',
        cardiology: 'أمراض القلب',
        dentistry: 'طب الأسنان',
        oncology: 'علاج الأورام',
        orthopedic: 'جراحة العظام',
        neurology: 'الأعصاب',
      },
      services: {
        badge: 'خبراتنا',
        title: 'خدمات السياحة العلاجية',
        subtitle:
          'منظومة متكاملة للمرضى الدوليين تجمع بين الثقة والشفافية والوصول إلى رعاية عالمية.',
        cards: {
          matching: {
            title: 'مطابقة المستشفى والطبيب',
            desc: 'مطابقة دقيقة مع مستشفيات معتمدة دوليًا وأطباء متميزين.',
          },
          language: {
            title: 'الدعم اللغوي والترجمة',
            desc: 'دعم عربي ومتعدد اللغات طوال الرحلة العلاجية.',
          },
          coordination: {
            title: 'تنسيق الحالة الطبية',
            desc: 'تنسيق سلس بين المريض والأطباء والمستشفى وفريق الرعاية.',
          },
          planning: {
            title: 'خطة علاج مخصصة',
            desc: 'خطة واضحة تشمل الوقت والتكلفة والنتائج المتوقعة.',
          },
          travel: {
            title: 'السفر والتأشيرة واللوجستيات',
            desc: 'مساعدة شاملة في التأشيرة الطبية والسفر والإقامة.',
          },
          opinion: {
            title: 'رأي طبي ثانٍ',
            desc: 'تقييمات مستقلة من أطباء ومؤسسات طبية رائدة.',
          },
        },
      },
      doctors: {
        badge: 'شبكة الأطباء',
        title: 'أطباء متخصصون حسب القسم',
        subtitle: 'استخدم الفلاتر لاستعراض ملفات الأطباء حسب التخصص.',
        hospital: 'المستشفى',
        experience: 'الخبرة',
        languages: 'اللغات',
      },
      reviews: {
        badge: 'تجارب موثقة',
        title: 'مراجعات المرضى بالفيديو',
        subtitle: 'قصص حقيقية من مرضى أنهوا رحلة الاستشارة والعلاج.',
        sound: {
          on: 'تشغيل الصوت',
          off: 'كتم الصوت',
        },
        admin: {
          error: 'مفتاح الإدارة غير صحيح.',
          required: 'يرجى تعبئة جميع الحقول لإضافة مراجعة.',
          title: 'الإدارة: إضافة رابط فيديو مراجعة',
          hint: 'استخدم مفتاح الإدارة لفتح إدارة المراجعات.',
          key: 'مفتاح الإدارة',
          unlock: 'فتح',
          formTitle: 'إضافة مراجعة مريض جديدة',
          patient: 'اسم المريض',
          country: 'الدولة',
          specialty: 'التخصص',
          video: 'رابط الفيديو (mp4)',
          text: 'نص المراجعة',
          add: 'إضافة مراجعة',
          clear: 'مسح المراجعات المضافة',
        },
      },
      guide: {
        roleTitle: 'منسق الرعاية الطبية',
        roleSub: 'خدمات المرضى الدوليين',
        title: 'دليلك الطبي المخصص',
        subtitle: 'منسق صحي شخصي للمرضى الدوليين',
        info: {
          one: 'خبرة مع مرضى الخليج',
          two: 'أكثر من 10 سنوات في الهند',
          three: 'العربية والهندية والإنجليزية',
          four: 'شبكة مستشفيات متعددة',
        },
        desc: 'منسق موثوق للسياحة العلاجية يشرف على المطابقة وخطة العلاج والتأشيرة والإقامة والمتابعة.',
        primaryCta: 'تحدث مع الدليل الطبي',
        secondaryCta: 'عرض الخدمات',
      },
      queryFeedback: {
        required: 'يرجى إكمال جميع الحقول قبل الإرسال.',
        success: 'شكرًا لك، تم إرسال تقييمك بنجاح.',
        badge: 'تقييم الدعم',
        title: 'هل تمت الإجابة على استفسارك؟',
        subtitle: 'شاركنا تقييمك لتحسين جودة الاستجابة.',
        name: 'اسمك',
        yes: 'نعم، تمت الإجابة على استفساري',
        no: 'لا، ما زلت أحتاج دعمًا',
        message: 'اكتب ملاحظاتك',
        submit: 'إرسال التقييم',
      },
      contact: {
        brandTitle: 'السياحة العلاجية العالمية',
        brandSub: 'مستشفيات عالمية | أطباء موثوقون | تنسيق متكامل',
        features: {
          one: 'استشارة مجانية',
          two: 'منسق طبي مخصص',
          three: 'دعم للمرضى الدوليين',
          four: 'تخطيط علاجي شامل',
        },
        formTitle: 'اطلب استشارة طبية مجانية',
        formSubtitle: 'يرشدك خبراؤنا إلى أفضل الخيارات العلاجية',
        placeholders: {
          name: 'الاسم الكامل',
          phone: 'الهاتف / واتساب',
          country: 'الدولة',
          specialty: 'التخصص المطلوب',
          problem: 'صف الحالة الطبية',
        },
        actions: {
          submitting: 'جارٍ الإرسال...',
          submit: 'طلب استشارة',
        },
        privacy: 'معلوماتك سرية ويتم التعامل معها بأمان.',
        errors: {
          required: 'جميع الحقول مطلوبة',
          phone: 'يرجى إدخال رقم هاتف صحيح',
          generic: 'حدث خطأ. يرجى المحاولة لاحقًا.',
        },
        success: 'شكرًا لك، سيتواصل معك منسقنا الطبي قريبًا.',
      },
      footer: {
        brandDesc:
          'منصة سياحة علاجية عالمية تربط المرضى بأفضل المستشفيات والأطباء ومراكز العلاج.',
        badges: {
          hipaa: 'متوافق مع HIPAA',
          iso: 'شركاء معتمدون ISO',
          international: 'رعاية مرضى دولية',
        },
        sections: {
          services: 'الخدمات',
          support: 'الدعم',
          regions: 'المناطق',
        },
        links: {
          medicalTourism: 'السياحة العلاجية',
          hospitalMatching: 'مطابقة المستشفيات',
          visaAssistance: 'مساعدة التأشيرة',
          secondOpinion: 'رأي طبي ثانٍ',
          contactUs: 'اتصل بنا',
          patientCare: 'رعاية المرضى',
          faqs: 'الأسئلة الشائعة',
          privacyPolicy: 'سياسة الخصوصية',
          india: 'الهند',
          turkey: 'تركيا',
          thailand: 'تايلاند',
          uae: 'الإمارات',
        },
        bottom: {
          rights: '© 2026 MedGuide. جميع الحقوق محفوظة.',
          tagline: 'شبكة صحية عالمية موثوقة',
        },
      },
      languageModal: {
        title: 'اختر اللغة',
        subtitle: 'اختر لغتك المفضلة للحصول على أفضل تجربة',
        descriptions: {
          en: 'لغة عالمية',
          ar: 'اتجاه اللغة من اليمين إلى اليسار',
          hi: 'لغة إقليمية',
        },
        cancel: 'إلغاء',
      },
    },
  },
  hi: {
    translation: {
      common: {
        languages: {
          en: 'अंग्रेज़ी',
          ar: 'अरबी',
          hi: 'हिंदी',
        },
        aria: {
          selectLanguage: 'भाषा चुनें',
          toggleMenu: 'मेनू टॉगल करें',
          toggleVideoSound: 'वीडियो ध्वनि टॉगल करें',
          muted: 'म्यूट',
          unmuted: 'ध्वनि चालू',
        },
      },
      nav: {
        home: 'होम',
        services: 'सेवाएं',
        reviews: 'रिव्यू',
        doctors: 'डॉक्टर्स',
        guide: 'मेडिकल गाइड',
        feedback: 'फीडबैक',
        contact: 'संपर्क करें',
        consult: 'निःशुल्क परामर्श',
      },
      hero: {
        badge: 'वैश्विक मेडिकल टूरिज़्म प्लेटफ़ॉर्म',
        title: 'मेडिकल टूरिज़्म अब आसान',
        sub: 'भारत में खाड़ी क्षेत्र के मरीजों के लिए विश्वसनीय चिकित्सा मार्गदर्शन',
        primaryCta: 'मेडिकल गाइड से संपर्क करें',
        secondaryCta: 'उपचार विकल्प देखें',
        stats: {
          hospitals: 'मान्यता प्राप्त अस्पताल',
          countries: 'देश',
          patients: 'अंतरराष्ट्रीय मरीज',
        },
        carousel: {
          one: 'उन्नत सर्जिकल देखभाल',
          two: 'वैश्विक मरीज समन्वय',
          three: 'रिकवरी और फॉलो-अप सपोर्ट',
        },
      },
      video: {
        badge: 'यहाँ से शुरू करें',
        title: 'MedGuide कैसे काम करता है',
        subtitle: 'अपनी चुनी भाषा में छोटा परिचय देखें और पूरी प्रक्रिया समझें।',
        sourceNote:
          'वीडियो: /public/videos/intro-en.mp4, intro-ar.mp4, intro-hi.mp4',
        unsupported: 'आपका ब्राउज़र वीडियो प्लेबैक सपोर्ट नहीं करता।',
        fallbackTitle: 'वीडियो जल्द उपलब्ध होगा',
        fallbackText: 'चुनी हुई भाषा का वीडियो नहीं मिला। सेवाएं देखें।',
        ctaServices: 'सेवाएं देखें',
        sound: {
          on: 'ध्वनि चालू करें',
          off: 'म्यूट करें',
        },
      },
      subject: {
        title: 'विशेषज्ञता चुनें',
        all: 'सभी',
        general: 'जनरल मेडिसिन',
        cardiology: 'कार्डियोलॉजी',
        dentistry: 'डेंटिस्ट्री',
        oncology: 'ऑन्कोलॉजी',
        orthopedic: 'ऑर्थोपेडिक्स',
        neurology: 'न्यूरोलॉजी',
      },
      services: {
        badge: 'हमारी विशेषज्ञता',
        title: 'मेडिकल टूरिज़्म सेवाएं',
        subtitle:
          'अंतरराष्ट्रीय मरीजों के लिए भरोसेमंद और पारदर्शी हेल्थकेयर समन्वय।',
        cards: {
          matching: {
            title: 'अस्पताल और विशेषज्ञ मिलान',
            desc: 'मान्यता प्राप्त अस्पतालों और विशेषज्ञ डॉक्टरों से सटीक मिलान।',
          },
          language: {
            title: 'भाषा और अनुवाद सहायता',
            desc: 'पूरी यात्रा में अरबी सहित बहुभाषी समर्थन।',
          },
          coordination: {
            title: 'मेडिकल केस समन्वय',
            desc: 'मरीज, डॉक्टर और अस्पताल के बीच सुचारु समन्वय।',
          },
          planning: {
            title: 'व्यक्तिगत उपचार योजना',
            desc: 'समय, लागत और अपेक्षित परिणामों के साथ स्पष्ट योजना।',
          },
          travel: {
            title: 'यात्रा, वीज़ा और लॉजिस्टिक्स',
            desc: 'मेडिकल वीज़ा, यात्रा और आवास सहायता।',
          },
          opinion: {
            title: 'विशेषज्ञ सेकंड ओपिनियन',
            desc: 'शीर्ष संस्थानों से स्वतंत्र चिकित्सा राय।',
          },
        },
      },
      doctors: {
        badge: 'डॉक्टर नेटवर्क',
        title: 'विभाग अनुसार विशेषज्ञ डॉक्टर',
        subtitle: 'फ़िल्टर से प्रमुख उपचार क्षेत्रों के डॉक्टर प्रोफाइल देखें।',
        hospital: 'अस्पताल',
        experience: 'अनुभव',
        languages: 'भाषाएं',
      },
      reviews: {
        badge: 'सत्यापित फीडबैक',
        title: 'मरीज वीडियो रिव्यू और अनुभव',
        subtitle: 'कंसल्टेशन और उपचार के बाद मरीजों की वास्तविक कहानियां।',
        sound: {
          on: 'ध्वनि के साथ चलाएं',
          off: 'ध्वनि बंद करें',
        },
        admin: {
          error: 'एडमिन की अमान्य है।',
          required: 'रिव्यू जोड़ने के लिए सभी फ़ील्ड भरें।',
          title: 'एडमिन: रिव्यू वीडियो लिंक जोड़ें',
          hint: 'रिव्यू मैनेजमेंट खोलने के लिए एडमिन की उपयोग करें।',
          key: 'एडमिन की',
          unlock: 'अनलॉक',
          formTitle: 'नया मरीज रिव्यू जोड़ें',
          patient: 'मरीज का नाम',
          country: 'देश',
          specialty: 'विशेषज्ञता',
          video: 'वीडियो URL (mp4)',
          text: 'रिव्यू टेक्स्ट',
          add: 'रिव्यू जोड़ें',
          clear: 'एडमिन जोड़े रिव्यू हटाएं',
        },
      },
      guide: {
        roleTitle: 'मेडिकल केयर कोऑर्डिनेटर',
        roleSub: 'अंतरराष्ट्रीय मरीज सेवाएं',
        title: 'आपका समर्पित मेडिकल गाइड',
        subtitle: 'अंतरराष्ट्रीय मरीजों के लिए व्यक्तिगत स्वास्थ्य समन्वयक',
        info: {
          one: 'गल्फ मरीज सहायता अनुभव',
          two: 'भारत में 10+ वर्षों का अनुभव',
          three: 'अरबी, हिंदी, अंग्रेज़ी',
          four: 'मल्टी-हॉस्पिटल नेटवर्क एक्सेस',
        },
        desc: 'विश्वसनीय मेडिकल टूरिज़्म समन्वयक जो अस्पताल चयन, उपचार योजना, वीज़ा और फॉलो-अप संभालते हैं।',
        primaryCta: 'मेडिकल गाइड से बात करें',
        secondaryCta: 'सेवाएं देखें',
      },
      queryFeedback: {
        required: 'जमा करने से पहले सभी फ़ील्ड भरें।',
        success: 'धन्यवाद, आपका फीडबैक सफलतापूर्वक जमा हो गया है।',
        badge: 'सपोर्ट चेक',
        title: 'क्या आपके प्रश्न का उत्तर मिला?',
        subtitle: 'त्वरित फीडबैक भेजें ताकि हम सेवा बेहतर कर सकें।',
        name: 'आपका नाम',
        yes: 'हाँ, मेरा प्रश्न हल हुआ',
        no: 'नहीं, अभी भी सहायता चाहिए',
        message: 'अपना फीडबैक लिखें',
        submit: 'फीडबैक भेजें',
      },
      contact: {
        brandTitle: 'वैश्विक मेडिकल टूरिज़्म',
        brandSub: 'विश्वस्तरीय अस्पताल | विश्वसनीय डॉक्टर | सहज समन्वय',
        features: {
          one: 'निःशुल्क परामर्श',
          two: 'समर्पित मेडिकल कोऑर्डिनेटर',
          three: 'अंतरराष्ट्रीय मरीज सहायता',
          four: 'एंड-टू-एंड उपचार योजना',
        },
        formTitle: 'निःशुल्क मेडिकल परामर्श का अनुरोध करें',
        formSubtitle:
          'हमारे विशेषज्ञ आपको सर्वश्रेष्ठ उपचार विकल्प चुनने में मदद करेंगे',
        placeholders: {
          name: 'पूरा नाम',
          phone: 'फ़ोन / व्हाट्सऐप',
          country: 'देश',
          specialty: 'पसंदीदा विशेषज्ञता',
          problem: 'अपनी चिकित्सा समस्या बताएं',
        },
        actions: {
          submitting: 'सबमिट हो रहा है...',
          submit: 'परामर्श अनुरोध भेजें',
        },
        privacy: 'आपकी जानकारी गोपनीय और सुरक्षित रखी जाती है।',
        errors: {
          required: 'सभी फ़ील्ड भरना आवश्यक है',
          phone: 'कृपया सही फ़ोन नंबर दर्ज करें',
          generic: 'कुछ गलत हो गया। कृपया बाद में पुनः प्रयास करें।',
        },
        success: 'धन्यवाद! हमारा मेडिकल कोऑर्डिनेटर जल्द संपर्क करेगा।',
      },
      footer: {
        brandDesc:
          'वैश्विक मेडिकल टूरिज़्म प्लेटफ़ॉर्म जो मरीजों को शीर्ष अस्पतालों और डॉक्टरों से जोड़ता है।',
        badges: {
          hipaa: 'HIPAA अनुरूप',
          iso: 'ISO प्रमाणित पार्टनर्स',
          international: 'अंतरराष्ट्रीय मरीज देखभाल',
        },
        sections: {
          services: 'सेवाएं',
          support: 'सहायता',
          regions: 'क्षेत्र',
        },
        links: {
          medicalTourism: 'मेडिकल टूरिज़्म',
          hospitalMatching: 'अस्पताल मिलान',
          visaAssistance: 'वीज़ा सहायता',
          secondOpinion: 'सेकंड ओपिनियन',
          contactUs: 'संपर्क करें',
          patientCare: 'मरीज देखभाल',
          faqs: 'अक्सर पूछे जाने वाले प्रश्न',
          privacyPolicy: 'प्राइवेसी पॉलिसी',
          india: 'भारत',
          turkey: 'तुर्की',
          thailand: 'थाईलैंड',
          uae: 'यूएई',
        },
        bottom: {
          rights: '© 2026 MedGuide. सभी अधिकार सुरक्षित।',
          tagline: 'विश्वसनीय वैश्विक हेल्थकेयर नेटवर्क',
        },
      },
      languageModal: {
        title: 'भाषा चुनें',
        subtitle: 'बेहतर अनुभव के लिए अपनी पसंदीदा भाषा चुनें',
        descriptions: {
          en: 'वैश्विक भाषा',
          ar: 'भाषा दिशा: दाएं से बाएं',
          hi: 'क्षेत्रीय भाषा',
        },
        cancel: 'रद्द करें',
      },
    },
  },
}

const setDocumentDirection = (lang) => {
  if (typeof document !== 'undefined') {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
})

setDocumentDirection(defaultLanguage)

i18n.on('languageChanged', (lang) => {
  const normalized = (lang || 'en').split('-')[0]
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferredLanguage', normalized)
  }
  setDocumentDirection(normalized)
})

export default i18n
