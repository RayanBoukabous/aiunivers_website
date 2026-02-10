'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar' | 'es' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['en', 'fr', 'ar', 'es', 'de'].includes(savedLanguage)) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  // Toujours rendre le provider, même avant le montage
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.departments': 'Departments',
    'nav.solutions': 'Solutions',
    'nav.contact': 'Contact',
    // Homepage
    'home.subtitle': 'The future of artificial intelligence starts here',
    'home.discover': 'Discover',
    'home.scroll': 'Scroll',
    'home.expertise': 'Our Expertise',
    'home.solutions.badge': 'Our Solutions',
    'home.sectors': 'Sectors of Activity',
    'home.sectors.description': 'Cutting-edge technological solutions to transform your business and accelerate your growth',
    'home.departments': 'Our Departments',
    'home.departments.badge': 'Our Expertise',
    'home.departments.description': 'Our expertise areas to support your projects and structure your offering.',
    'home.partners': 'Our Partners',
    'home.partners.description': 'We collaborate with global technology leaders to deliver excellence solutions',
    'home.learn_more': 'Learn more',
    // Footer
    'footer.description': 'The future of artificial intelligence starts here. Transform your business with our innovative solutions.',
    'footer.navigation': 'Navigation',
    'footer.solutions': 'Solutions',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    // Contact
    'contact.badge': 'Contact Us',
    'contact.title': 'Ready to transform your business?',
    'contact.description': 'Let\'s discuss your projects and discover how AI can accelerate your growth.',
    'contact.connected': 'Stay Connected',
    'contact.social': 'Follow us on our social networks for the latest news.',
    'contact.linkedin': 'Follow us on LinkedIn',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.location.value': 'Algiers, Algeria',
    'contact.form.title': 'Send us a message',
    'contact.form.description': 'Fill out the form below and we will respond as soon as possible.',
    'contact.form.name': 'Full Name *',
    'contact.form.name.placeholder': 'John Doe',
    'contact.form.email': 'Email *',
    'contact.form.email.placeholder': 'john.doe@example.com',
    'contact.form.company': 'Company',
    'contact.form.company.placeholder': 'Your company name (optional)',
    'contact.form.subject': 'Subject *',
    'contact.form.subject.placeholder': 'Subject of your message',
    'contact.form.message': 'Message *',
    'contact.form.message.placeholder': 'Describe your project, your needs or ask your questions...',
    'contact.form.message.description': 'Describe your project, your needs or ask your questions. We will respond quickly.',
    'contact.form.reset': 'Reset',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent successfully!',
    'contact.form.success.description': 'We will respond as soon as possible.',
    // Sectors
    'sectors.back': '← Back to sectors',
    'sectors.solutions': 'Our Solutions',
    // Solutions
    'solutions.advantages': 'Key Advantages',
    'solutions.advantages.description': 'The main benefits of this solution',
    'solutions.clients': 'Target Clients',
    'solutions.clients.description': 'The sectors and companies targeted by this solution',
    'solutions.features': 'Main Features',
    'solutions.features.description': 'The key capabilities of this solution',
    'solutions.usecases': 'Use Cases',
    'solutions.usecases.description': 'Concrete examples of application of this solution',
    'solutions.preview': 'Quick Preview',
    'solutions.demos': 'Demo',
    'solutions.cta.title': 'Interested in this solution?',
    'solutions.cta.description': 'Contact us to discuss your specific needs',
    'solutions.cta.button': 'Request a Quote',
    'solutions.back': '← Back to solutions',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.services': 'Services',
    'nav.departments': 'Départements',
    'nav.solutions': 'Solutions',
    'nav.contact': 'Contact',
    // Homepage
    'home.subtitle': 'L\'avenir de l\'intelligence artificielle commence ici',
    'home.discover': 'Découvrir',
    'home.scroll': 'Scroll',
    'home.expertise': 'Nos Expertises',
    'home.solutions.badge': 'Nos Solutions',
    'home.sectors': 'Secteurs d\'Activités',
    'home.sectors.description': 'Des solutions technologiques de pointe pour transformer votre entreprise et accélérer votre croissance',
    'home.departments': 'Nos Départements',
    'home.departments.badge': 'Nos Expertises',
    'home.departments.description': 'Nos domaines d\'expertise pour accompagner vos projets et structurer votre offre.',
    'home.partners': 'Nos Partenaires',
    'home.partners.description': 'Nous collaborons avec les leaders mondiaux de la technologie pour offrir des solutions d\'excellence',
    'home.learn_more': 'En savoir plus',
    // Footer
    'footer.description': 'L\'avenir de l\'intelligence artificielle commence ici. Transformez votre entreprise avec nos solutions innovantes.',
    'footer.navigation': 'Navigation',
    'footer.solutions': 'Solutions',
    'footer.contact': 'Contact',
    'footer.rights': 'Tous droits réservés.',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Politique de confidentialité',
    // Contact
    'contact.badge': 'Contactez-nous',
    'contact.title': 'Prêt à transformer votre entreprise ?',
    'contact.description': 'Discutons de vos projets et découvrons comment l\'IA peut accélérer votre croissance.',
    'contact.connected': 'Restons connectés',
    'contact.social': 'Suivez-nous sur nos réseaux sociaux pour les dernières actualités.',
    'contact.linkedin': 'Suivez-nous sur LinkedIn',
    'contact.email': 'Email',
    'contact.location': 'Localisation',
    'contact.location.value': 'Alger, Algérie',
    'contact.form.title': 'Envoyez-nous un message',
    'contact.form.description': 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.',
    'contact.form.name': 'Nom complet *',
    'contact.form.name.placeholder': 'Jean Dupont',
    'contact.form.email': 'Email *',
    'contact.form.email.placeholder': 'jean.dupont@example.com',
    'contact.form.company': 'Entreprise',
    'contact.form.company.placeholder': 'Nom de votre entreprise (optionnel)',
    'contact.form.subject': 'Sujet *',
    'contact.form.subject.placeholder': 'Sujet de votre message',
    'contact.form.message': 'Message *',
    'contact.form.message.placeholder': 'Décrivez votre projet ou votre demande...',
    'contact.form.message.description': 'Décrivez votre projet, vos besoins ou posez vos questions. Nous vous répondrons rapidement.',
    'contact.form.reset': 'Réinitialiser',
    'contact.form.submit': 'Envoyer le message',
    'contact.form.success': 'Message envoyé avec succès !',
    'contact.form.success.description': 'Nous vous répondrons dans les plus brefs délais.',
    // Sectors
    'sectors.back': '← Retour aux secteurs',
    'sectors.solutions': 'Nos Solutions',
    // Solutions
    'solutions.advantages': 'Avantages Clés',
    'solutions.advantages.description': 'Les bénéfices principaux de cette solution',
    'solutions.clients': 'Clients Visés',
    'solutions.clients.description': 'Les secteurs et entreprises ciblés par cette solution',
    'solutions.features': 'Fonctionnalités Principales',
    'solutions.features.description': 'Les capacités clés de cette solution',
    'solutions.usecases': 'Cas d\'Usage',
    'solutions.usecases.description': 'Exemples concrets d\'application de cette solution',
    'solutions.demos': 'Démonstrations',
    'solutions.cta.title': 'Intéressé par cette solution ?',
    'solutions.cta.description': 'Contactez-nous pour discuter de vos besoins spécifiques',
    'solutions.cta.button': 'Demander un devis',
    'solutions.back': '← Retour aux solutions',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'الخدمات',
    'nav.departments': 'أقسامنا',
    'nav.solutions': 'الحلول',
    'nav.contact': 'اتصل بنا',
    // Homepage
    'home.subtitle': 'مستقبل الذكاء الاصطناعي يبدأ هنا',
    'home.discover': 'اكتشف',
    'home.scroll': 'انتقل',
    'home.expertise': 'خبراتنا',
    'home.solutions.badge': 'حلولنا',
    'home.sectors': 'مجالات النشاط',
    'home.sectors.description': 'حلول تكنولوجية متطورة لتحويل عملك وتسريع نموك',
    'home.departments': 'أقسامنا',
    'home.departments.badge': 'خبراتنا',
    'home.departments.description': 'مجالات خبرتنا لدعم مشاريعك وهيكلة عروضك.',
    'home.partners': 'شركاؤنا',
    'home.partners.description': 'نتعاون مع قادة التكنولوجيا العالميين لتقديم حلول متميزة',
    'home.learn_more': 'اعرف المزيد',
    // Footer
    'footer.description': 'مستقبل الذكاء الاصطناعي يبدأ هنا. حول عملك مع حلولنا المبتكرة.',
    'footer.navigation': 'التنقل',
    'footer.solutions': 'الحلول',
    'footer.contact': 'اتصل بنا',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.legal': 'إشعار قانوني',
    'footer.privacy': 'سياسة الخصوصية',
    // Contact
    'contact.badge': 'اتصل بنا',
    'contact.title': 'هل أنت مستعد لتحويل عملك؟',
    'contact.description': 'دعنا نناقش مشاريعك ونكتشف كيف يمكن للذكاء الاصطناعي تسريع نموك.',
    'contact.connected': 'ابق على اتصال',
    'contact.social': 'تابعنا على شبكاتنا الاجتماعية للحصول على آخر الأخبار.',
    'contact.linkedin': 'تابعنا على LinkedIn',
    'contact.email': 'البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.location.value': 'الجزائر، الجزائر',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.description': 'املأ النموذج أدناه وسنرد في أقرب وقت ممكن.',
    'contact.form.name': 'الاسم الكامل *',
    'contact.form.name.placeholder': 'محمد أحمد',
    'contact.form.email': 'البريد الإلكتروني *',
    'contact.form.email.placeholder': 'mohamed.ahmed@example.com',
    'contact.form.company': 'الشركة',
    'contact.form.company.placeholder': 'اسم شركتك (اختياري)',
    'contact.form.subject': 'الموضوع *',
    'contact.form.subject.placeholder': 'موضوع رسالتك',
    'contact.form.message': 'الرسالة *',
    'contact.form.message.placeholder': 'اوصف مشروعك أو احتياجاتك أو اطرح أسئلتك...',
    'contact.form.message.description': 'اوصف مشروعك أو احتياجاتك أو اطرح أسئلتك. سنرد بسرعة.',
    'contact.form.reset': 'إعادة تعيين',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.success': 'تم إرسال الرسالة بنجاح!',
    'contact.form.success.description': 'سنرد في أقرب وقت ممكن.',
    // Sectors
    'sectors.back': '← العودة إلى القطاعات',
    'sectors.solutions': 'حلولنا',
    // Solutions
    'solutions.advantages': 'المزايا الرئيسية',
    'solutions.advantages.description': 'الفوائد الرئيسية لهذا الحل',
    'solutions.clients': 'العملاء المستهدفون',
    'solutions.clients.description': 'القطاعات والشركات المستهدفة بهذا الحل',
    'solutions.features': 'الميزات الرئيسية',
    'solutions.features.description': 'القدرات الرئيسية لهذا الحل',
    'solutions.usecases': 'حالات الاستخدام',
    'solutions.usecases.description': 'أمثلة عملية لتطبيق هذا الحل',
    'solutions.preview': 'معاينة سريعة',
    'solutions.demos': 'عرض توضيحي',
    'solutions.cta.title': 'مهتم بهذا الحل؟',
    'solutions.cta.description': 'اتصل بنا لمناقشة احتياجاتك الخاصة',
    'solutions.cta.button': 'طلب عرض أسعار',
    'solutions.back': '← العودة إلى الحلول',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.about': 'Acerca de',
    'nav.services': 'Servicios',
    'nav.solutions': 'Soluciones',
    'nav.contact': 'Contacto',
    // Homepage
    'home.subtitle': 'El futuro de la inteligencia artificial comienza aquí',
    'home.discover': 'Descubrir',
    'home.scroll': 'Desplazar',
    'home.expertise': 'Nuestras Experiencias',
    'home.solutions.badge': 'Nuestras Soluciones',
    'home.sectors': 'Sectores de Actividad',
    'home.sectors.description': 'Soluciones tecnológicas de vanguardia para transformar su empresa y acelerar su crecimiento',
    'home.departments': 'Nuestros Departamentos',
    'home.departments.badge': 'Nuestras Experiencias',
    'home.departments.description': 'Nuestras áreas de experiencia para acompañar sus proyectos y estructurar su oferta.',
    'home.partners': 'Nuestros Socios',
    'home.partners.description': 'Colaboramos con líderes tecnológicos globales para ofrecer soluciones de excelencia',
    'home.learn_more': 'Saber más',
    // Footer
    'footer.description': 'El futuro de la inteligencia artificial comienza aquí. Transforme su empresa con nuestras soluciones innovadoras.',
    'footer.navigation': 'Navegación',
    'footer.solutions': 'Soluciones',
    'footer.contact': 'Contacto',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.legal': 'Aviso Legal',
    'footer.privacy': 'Política de Privacidad',
    // Contact
    'contact.badge': 'Contáctenos',
    'contact.title': '¿Listo para transformar su empresa?',
    'contact.description': 'Hablemos de sus proyectos y descubramos cómo la IA puede acelerar su crecimiento.',
    'contact.connected': 'Mantengámonos Conectados',
    'contact.social': 'Síganos en nuestras redes sociales para las últimas noticias.',
    'contact.linkedin': 'Síganos en LinkedIn',
    'contact.email': 'Correo Electrónico',
    'contact.location': 'Ubicación',
    'contact.location.value': 'Argel, Argelia',
    'contact.form.title': 'Envíenos un mensaje',
    'contact.form.description': 'Complete el formulario a continuación y le responderemos lo antes posible.',
    'contact.form.name': 'Nombre Completo *',
    'contact.form.name.placeholder': 'Juan Pérez',
    'contact.form.email': 'Correo Electrónico *',
    'contact.form.email.placeholder': 'juan.perez@example.com',
    'contact.form.company': 'Empresa',
    'contact.form.company.placeholder': 'Nombre de su empresa (opcional)',
    'contact.form.subject': 'Asunto *',
    'contact.form.subject.placeholder': 'Asunto de su mensaje',
    'contact.form.message': 'Mensaje *',
    'contact.form.message.placeholder': 'Describa su proyecto o su solicitud...',
    'contact.form.message.description': 'Describa su proyecto, sus necesidades o haga sus preguntas. Responderemos rápidamente.',
    'contact.form.reset': 'Restablecer',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.success': '¡Mensaje enviado con éxito!',
    'contact.form.success.description': 'Le responderemos lo antes posible.',
    // Sectors
    'sectors.back': '← Volver a sectores',
    'sectors.solutions': 'Nuestras Soluciones',
    // Solutions
    'solutions.advantages': 'Ventajas Clave',
    'solutions.advantages.description': 'Los principales beneficios de esta solución',
    'solutions.clients': 'Clientes Objetivo',
    'solutions.clients.description': 'Los sectores y empresas objetivo de esta solución',
    'solutions.features': 'Características Principales',
    'solutions.features.description': 'Las capacidades clave de esta solución',
    'solutions.usecases': 'Casos de Uso',
    'solutions.usecases.description': 'Ejemplos concretos de aplicación de esta solución',
    'solutions.demos': 'Demostraciones',
    'solutions.cta.title': '¿Interesado en esta solución?',
    'solutions.cta.description': 'Contáctenos para discutir sus necesidades específicas',
    'solutions.cta.button': 'Solicitar Cotización',
    'solutions.back': '← Volver a soluciones',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.services': 'Dienstleistungen',
    'nav.departments': 'Abteilungen',
    'nav.solutions': 'Lösungen',
    'nav.contact': 'Kontakt',
    // Homepage
    'home.subtitle': 'Die Zukunft der künstlichen Intelligenz beginnt hier',
    'home.discover': 'Entdecken',
    'home.scroll': 'Scrollen',
    'home.expertise': 'Unsere Expertise',
    'home.solutions.badge': 'Unsere Lösungen',
    'home.sectors': 'Tätigkeitsbereiche',
    'home.sectors.description': 'Hochmoderne technologische Lösungen zur Transformation Ihres Unternehmens und Beschleunigung Ihres Wachstums',
    'home.departments': 'Unsere Abteilungen',
    'home.departments.badge': 'Unsere Expertise',
    'home.departments.description': 'Unsere Kompetenzbereiche zur Begleitung Ihrer Projekte und Strukturierung Ihres Angebots.',
    'home.partners': 'Unsere Partner',
    'home.partners.description': 'Wir arbeiten mit globalen Technologieführern zusammen, um exzellente Lösungen anzubieten',
    'home.learn_more': 'Mehr erfahren',
    // Footer
    'footer.description': 'Die Zukunft der künstlichen Intelligenz beginnt hier. Transformieren Sie Ihr Unternehmen mit unseren innovativen Lösungen.',
    'footer.navigation': 'Navigation',
    'footer.solutions': 'Lösungen',
    'footer.contact': 'Kontakt',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.legal': 'Rechtliche Hinweise',
    'footer.privacy': 'Datenschutzrichtlinie',
    // Contact
    'contact.badge': 'Kontaktieren Sie uns',
    'contact.title': 'Bereit, Ihr Unternehmen zu transformieren?',
    'contact.description': 'Lassen Sie uns über Ihre Projekte sprechen und entdecken, wie KI Ihr Wachstum beschleunigen kann.',
    'contact.connected': 'Bleiben wir in Verbindung',
    'contact.social': 'Folgen Sie uns in unseren sozialen Netzwerken für die neuesten Nachrichten.',
    'contact.linkedin': 'Folgen Sie uns auf LinkedIn',
    'contact.email': 'E-Mail',
    'contact.location': 'Standort',
    'contact.location.value': 'Algier, Algerien',
    'contact.form.title': 'Senden Sie uns eine Nachricht',
    'contact.form.description': 'Füllen Sie das untenstehende Formular aus und wir werden Ihnen so schnell wie möglich antworten.',
    'contact.form.name': 'Vollständiger Name *',
    'contact.form.name.placeholder': 'Max Mustermann',
    'contact.form.email': 'E-Mail *',
    'contact.form.email.placeholder': 'max.mustermann@example.com',
    'contact.form.company': 'Unternehmen',
    'contact.form.company.placeholder': 'Name Ihres Unternehmens (optional)',
    'contact.form.subject': 'Betreff *',
    'contact.form.subject.placeholder': 'Betreff Ihrer Nachricht',
    'contact.form.message': 'Nachricht *',
    'contact.form.message.placeholder': 'Beschreiben Sie Ihr Projekt oder Ihre Anfrage...',
    'contact.form.message.description': 'Beschreiben Sie Ihr Projekt, Ihre Bedürfnisse oder stellen Sie Ihre Fragen. Wir werden schnell antworten.',
    'contact.form.reset': 'Zurücksetzen',
    'contact.form.submit': 'Nachricht Senden',
    'contact.form.success': 'Nachricht erfolgreich gesendet!',
    'contact.form.success.description': 'Wir werden Ihnen so schnell wie möglich antworten.',
    // Sectors
    'sectors.back': '← Zurück zu Sektoren',
    'sectors.solutions': 'Unsere Lösungen',
    // Solutions
    'solutions.advantages': 'Hauptvorteile',
    'solutions.advantages.description': 'Die Hauptvorteile dieser Lösung',
    'solutions.clients': 'Zielkunden',
    'solutions.clients.description': 'Die von dieser Lösung angesprochenen Sektoren und Unternehmen',
    'solutions.features': 'Hauptfunktionen',
    'solutions.features.description': 'Die wichtigsten Fähigkeiten dieser Lösung',
    'solutions.usecases': 'Anwendungsfälle',
    'solutions.usecases.description': 'Konkrete Anwendungsbeispiele dieser Lösung',
    'solutions.preview': 'Schnellvorschau',
    'solutions.demos': 'Demo',
    'solutions.cta.title': 'Interessiert an dieser Lösung?',
    'solutions.cta.description': 'Kontaktieren Sie uns, um Ihre spezifischen Bedürfnisse zu besprechen',
    'solutions.cta.button': 'Angebot Anfordern',
    'solutions.back': '← Zurück zu Lösungen',
  },
};
