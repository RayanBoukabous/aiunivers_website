"""
Commande pour générer 10 départements de démonstration.
Usage: python manage.py generate_departments
Attribue aléatoirement 2 à 7 solutions par département (si des solutions existent).
"""
import random
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from departements.models import Departement
from solutions.models import Solution


DEPARTMENTS_DATA = [
    {
        "nom_fr": "Intelligence Artificielle & Machine Learning",
        "nom_en": "Artificial Intelligence & Machine Learning",
        "nom_ar": "الذكاء الاصطناعي وتعلم الآلة",
        "nom_es": "Inteligencia Artificial y Aprendizaje Automático",
        "nom_de": "Künstliche Intelligenz & Maschinelles Lernen",
        "description_fr": "Expertise en modèles prédictifs, NLP, vision par ordinateur et déploiement de solutions IA à l'échelle.",
        "description_en": "Expertise in predictive models, NLP, computer vision and deployment of AI solutions at scale.",
        "description_ar": "خبرة في النماذج التنبؤية ومعالجة اللغة الطبيعية ورؤية الحاسوب ونشر حلول الذكاء الاصطناعي.",
        "description_es": "Experiencia en modelos predictivos, NLP, visión por ordenador y despliegue de soluciones IA.",
        "description_de": "Expertise in prädiktiven Modellen, NLP, Computer Vision und Skalierung von KI-Lösungen.",
    },
    {
        "nom_fr": "Data Science & Analytics",
        "nom_en": "Data Science & Analytics",
        "nom_ar": "علوم البيانات والتحليلات",
        "nom_es": "Ciencia de Datos y Analítica",
        "nom_de": "Data Science & Analytik",
        "description_fr": "Ingénierie des données, visualisation, reporting et aide à la décision basée sur les données.",
        "description_en": "Data engineering, visualization, reporting and data-driven decision support.",
        "description_ar": "هندسة البيانات والتصور والتقارير ودعم القرار المعتمد على البيانات.",
        "description_es": "Ingeniería de datos, visualización, reporting y apoyo a la decisión basada en datos.",
        "description_de": "Datenengineering, Visualisierung, Reporting und datenbasierte Entscheidungsunterstützung.",
    },
    {
        "nom_fr": "Transformation Digitale",
        "nom_en": "Digital Transformation",
        "nom_ar": "التحول الرقمي",
        "nom_es": "Transformación Digital",
        "nom_de": "Digitale Transformation",
        "description_fr": "Accompagnement des entreprises dans la modernisation de leurs processus et systèmes d'information.",
        "description_en": "Supporting companies in modernizing their processes and information systems.",
        "description_ar": "دعم الشركات في تحديث عملياتها وأنظمتها المعلوماتية.",
        "description_es": "Acompañamiento a empresas en la modernización de procesos y sistemas de información.",
        "description_de": "Unterstützung von Unternehmen bei der Modernisierung von Prozessen und Informationssystemen.",
    },
    {
        "nom_fr": "Cybersécurité & Conformité",
        "nom_en": "Cybersecurity & Compliance",
        "nom_ar": "الأمن السيبراني والامتثال",
        "nom_es": "Ciberseguridad y Cumplimiento",
        "nom_de": "Cybersicherheit & Compliance",
        "description_fr": "Sécurisation des systèmes, audits, conformité RGPD et bonnes pratiques de protection des données.",
        "description_en": "System security, audits, GDPR compliance and data protection best practices.",
        "description_ar": "أمن الأنظمة والتدقيق والامتثال للائحة العامة لحماية البيانات.",
        "description_es": "Seguridad de sistemas, auditorías, cumplimiento RGPD y buenas prácticas de protección de datos.",
        "description_de": "Systemsicherheit, Audits, DSGVO-Compliance und Best Practices zum Datenschutz.",
    },
    {
        "nom_fr": "Cloud & Infrastructure",
        "nom_en": "Cloud & Infrastructure",
        "nom_ar": "السحابة والبنية التحتية",
        "nom_es": "Cloud e Infraestructura",
        "nom_de": "Cloud & Infrastruktur",
        "description_fr": "Conception et exploitation d'infrastructures cloud (AWS, Azure, GCP), DevOps et scalabilité.",
        "description_en": "Design and operation of cloud infrastructures (AWS, Azure, GCP), DevOps and scalability.",
        "description_ar": "تصميم وتشغيل البنى التحتية السحابية (AWS، Azure، GCP) وDevOps وقابلية التوسع.",
        "description_es": "Diseño y operación de infraestructuras cloud (AWS, Azure, GCP), DevOps y escalabilidad.",
        "description_de": "Design und Betrieb von Cloud-Infrastrukturen (AWS, Azure, GCP), DevOps und Skalierbarkeit.",
    },
    {
        "nom_fr": "Expérience Utilisateur & Design",
        "nom_en": "User Experience & Design",
        "nom_ar": "تجربة المستخدم والتصميم",
        "nom_es": "Experiencia de Usuario y Diseño",
        "nom_de": "Nutzererlebnis & Design",
        "description_fr": "Conception d'interfaces, parcours utilisateur et design de produits digitaux centrés sur l'humain.",
        "description_en": "Interface design, user journeys and human-centered digital product design.",
        "description_ar": "تصميم الواجهات ومسارات المستخدم وتصميم المنتجات الرقمية المتمركزة حول الإنسان.",
        "description_es": "Diseño de interfaces, recorridos de usuario y diseño de productos digitales centrados en las personas.",
        "description_de": "Interfacedesign, User Journeys und menschenzentriertes digitales Produktdesign.",
    },
    {
        "nom_fr": "Automatisation & RPA",
        "nom_en": "Automation & RPA",
        "nom_ar": "الأتمتة و RPA",
        "nom_es": "Automatización y RPA",
        "nom_de": "Automatisierung & RPA",
        "description_fr": "Robotisation des processus, workflows automatisés et gains de productivité opérationnelle.",
        "description_en": "Process robotics, automated workflows and operational productivity gains.",
        "description_ar": "أتمتة العمليات وسير العمل الآلي وزيادة الإنتاجية التشغيلية.",
        "description_es": "Robotización de procesos, flujos de trabajo automatizados y ganancias de productividad.",
        "description_de": "Prozessrobotik, automatisierte Workflows und operative Produktivitätssteigerung.",
    },
    {
        "nom_fr": "Stratégie & Conseil",
        "nom_en": "Strategy & Consulting",
        "nom_ar": "الاستراتيجية والاستشارات",
        "nom_es": "Estrategia y Consultoría",
        "nom_de": "Strategie & Beratung",
        "description_fr": "Stratégie produit, roadmap technique et conseil pour aligner la technologie sur les objectifs métier.",
        "description_en": "Product strategy, technical roadmap and consulting to align technology with business goals.",
        "description_ar": "استراتيجية المنتج والخرائط التقنية والاستشارات لمواءمة التكنولوجيا مع أهداف الأعمال.",
        "description_es": "Estrategia de producto, hoja de ruta técnica y consultoría para alinear tecnología y negocio.",
        "description_de": "Produktstrategie, technische Roadmap und Beratung zur Ausrichtung von Technologie auf Geschäftsziele.",
    },
    {
        "nom_fr": "Intégration & APIs",
        "nom_en": "Integration & APIs",
        "nom_ar": "التكامل وواجهات برمجة التطبيقات",
        "nom_es": "Integración y APIs",
        "nom_de": "Integration & APIs",
        "description_fr": "Conception d'APIs, intégration de systèmes et orchestration de services pour un écosystème connecté.",
        "description_en": "API design, system integration and service orchestration for a connected ecosystem.",
        "description_ar": "تصميم واجهات برمجة التطبيقات وتكامل الأنظمة وتنسيق الخدمات لبناء نظام متصل.",
        "description_es": "Diseño de APIs, integración de sistemas y orquestación de servicios para un ecosistema conectado.",
        "description_de": "API-Design, Systemintegration und Service-Orchestrierung für ein vernetztes Ökosystem.",
    },
    {
        "nom_fr": "Support & Maintenance",
        "nom_en": "Support & Maintenance",
        "nom_ar": "الدعم والصيانة",
        "nom_es": "Soporte y Mantenimiento",
        "nom_de": "Support & Wartung",
        "description_fr": "Support technique, maintenance évolutive et corrective, et garantie de disponibilité des solutions.",
        "description_en": "Technical support, evolutionary and corrective maintenance, and solution availability guarantee.",
        "description_ar": "الدعم الفني والصيانة التطورية والتصحيحية وضمان توفر الحلول.",
        "description_es": "Soporte técnico, mantenimiento evolutivo y correctivo y garantía de disponibilidad de soluciones.",
        "description_de": "Technischer Support, evolutionäre und korrektive Wartung sowie Verfügbarkeitsgarantie der Lösungen.",
    },
]


class Command(BaseCommand):
    help = "Génère 10 départements de démonstration (multilingue FR, EN, AR, ES, DE)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Supprimer tous les départements existants avant de créer les nouveaux.",
        )
        parser.add_argument(
            "--reassign-only",
            action="store_true",
            help="Ne faire que réattribuer les solutions aux départements (sans créer de départements).",
        )

    def handle(self, *args, **options):
        if options.get("reassign_only"):
            all_solutions = list(Solution.objects.all())
            all_departments = list(Departement.objects.all())
            if not all_solutions:
                self.stdout.write(self.style.WARNING("Aucune solution en base : lancez d'abord generate_solutions."))
                return
            if not all_departments:
                self.stdout.write(self.style.WARNING("Aucun département en base : lancez generate_departments (sans --reassign-only)."))
                return
            for dept in all_departments:
                n = random.randint(2, min(7, len(all_solutions)))
                chosen = random.sample(all_solutions, n)
                dept.solutions.set(chosen)
                self.stdout.write(self.style.SUCCESS(f"  → {dept.nom_fr}: {n} solution(s) assignée(s)."))
            self.stdout.write(self.style.SUCCESS("\nRéattribution terminée."))
            return

        if options.get("clear"):
            count_before = Departement.objects.count()
            Departement.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Supprimé {count_before} département(s)."))

        created = 0
        for order, data in enumerate(DEPARTMENTS_DATA, start=1):
            slug = slugify(data["nom_fr"])[:100]
            if not slug:
                slug = f"departement-{order}"
            if Departement.objects.filter(slug=slug).exists():
                self.stdout.write(self.style.WARNING(f"Département déjà existant: {slug}"))
                continue
            Departement.objects.create(
                slug=slug,
                order=order,
                nom_fr=data["nom_fr"],
                nom_en=data["nom_en"],
                nom_ar=data["nom_ar"],
                nom_es=data["nom_es"],
                nom_de=data["nom_de"],
                description_fr=data["description_fr"],
                description_en=data["description_en"],
                description_ar=data.get("description_ar", data["description_fr"]),
                description_es=data.get("description_es", data["description_fr"]),
                description_de=data.get("description_de", data["description_fr"]),
                is_active=True,
            )
            created += 1
            self.stdout.write(self.style.SUCCESS(f"Créé: {data['nom_fr']} ({slug})"))

        # Attribution aléatoire des solutions aux départements (3, 5, 6, 3, ...)
        all_solutions = list(Solution.objects.all())
        all_departments = list(Departement.objects.all())
        if not all_solutions:
            self.stdout.write(self.style.WARNING("Aucune solution en base : lancez d'abord generate_solutions."))
        else:
            for dept in all_departments:
                n = random.randint(2, min(7, len(all_solutions)))
                chosen = random.sample(all_solutions, n)
                dept.solutions.set(chosen)
                self.stdout.write(self.style.SUCCESS(f"  → {dept.nom_fr}: {n} solution(s) assignée(s)."))

        self.stdout.write(self.style.SUCCESS(f"\n{created} département(s) créé(s)."))
