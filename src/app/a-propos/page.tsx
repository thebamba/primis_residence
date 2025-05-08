import { Linkedin } from "lucide-react";

export default function About() {
    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-bold mb-2 text-rose-700">À propos</h1>
            <p>
                Bienvenue à la Résidence Primis, un hébergement moderne situé au cœur de Thiès. Nous offrons confort, sécurité et hospitalité chaleureuse pour tous nos invités.
            </p>
            <h2 className="text-xl font-semibold mt-6">À propos de la résidence</h2>
            <p>
                La résidence est exploitée par <strong className="inline-flex items-center gap-1">
                PRIM’IS SARL
                <a
                    href="https://www.linkedin.com/in/prim-is-sarl-80498b214/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn de PRIM'IS"
                >
                    <Linkedin className="w-4 h-4 text-blue-600 hover:text-blue-800 transition" />
                </a>
            </strong>, une entreprise sénégalaise fondée en 2014 et spécialisée dans les services intellectuels, immobiliers et médicaux. Elle veille à offrir un accueil professionnel et chaleureux.
            </p>
            <h2 className="text-xl font-semibold mt-6">Votre hôte</h2>
            <p>
                Vous serez accueillie par <strong>Mme Binta Mbengue</strong> et <strong>M. Issa Mboup</strong>, professionnels de l’accueil dévoués, toujours à l’écoute pour rendre votre séjour agréable et sans souci.
            </p>
        </section>
    );
}
