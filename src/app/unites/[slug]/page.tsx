"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Link from "next/link";

type UnitSlug = "chambre-standard" | "mini-studio" | "studio-suite" | "appartement-f3";

const UNITS: Record<UnitSlug, { label: string; price: number; description: string; images: string[] }> = {
    "chambre-standard": {
        label: "Chambre standard – Confort et Simplicité",
        price: 17000,
        description: "Découvrez une chambre cosy et fonctionnelle, idéale pour une ou deux personnes. " +
            "Profitez d’une salle de bain privée, d’un bureau avec Wi-Fi haut débit, et d’un mini-réfrigérateur personnel. " +
            "Accédez à une cuisine partagée, parfaite pour vos repas, et bénéficiez de la climatisation, d’une télévision avec chaînes internationales, du linge fourni et d’un service de ménage régulier. " +
            "Située dans un quartier paisible à 3 min du stade Lat Dior et du Carrefour Market, la chambre standard vous garantit un séjour pratique et agréable.",
        images: ["/standard-room/staroom1.JPG", "/standard-room/staroom2.JPG", "/standard-room/staroom3.JPG", "/standard-room/staroom4.JPG"],
    },
    "mini-studio": {
        label: "Mini studio – Fonctionnalité et Confort en toute Simplicité",
        price: 19000,
        description: "Découvrez notre studio entièrement équipé, parfait pour une personne ou un couple en séjour court ou prolongé. " +
            "Profitez d’un lit double confortable, d’un coin salon avec TV, d’une cuisine ouverte équipée (réfrigérateur, plaques, micro-ondes, ustensiles) et d’une salle de bain privative. " +
            "Vous bénéficiez également de la climatisation, du Wi-Fi haut débit et de rangements astucieux, dans un espace indépendant et facile d’accès. " +
            "Situé à 3 min du Stade Lat Dior et du Carrefour Market, dans un quartier sécurisé, le mini studio est idéal pour les voyageurs, professionnels ou étudiants à la recherche d’un séjour pratique et agréable.",
        images: ["/mini-studio/ministud1.JPG"],
    },
    "studio-suite": {
        label: "Studio suite – Confort & Modernité au Rendez-vous",
        price: 23000,
        description: "Découvrez notre Studio Suite Élégante, une solution idéale pour les séjours confortables et modernes à Thiès. " +
            "Profitez d’un vaste espace climatisé, d’un salon lumineux et d’une cuisine américaine entièrement équipée (réfrigérateur, micro-ondes, plaque, cafetière, ustensiles). " +
            "Reposez-vous dans une chambre spacieuse avec balcon privé, parfaite pour vos moments de détente. " +
            "Vous bénéficiez d’une salle de bain privative, de la connexion Wi-Fi haut débit, d’une télévision avec chaînes internationales, du linge fourni et d’un service de ménage régulier. " +
            "Située dans un quartier calme à 3 min du Stade Lat Dior et du Carrefour Market, notre suite studio vous garantit un séjour agréable, moderne et sans souci.",
        images: ["/studio-suite/suite1.JPG", "/studio-suite/suite2.JPG", "/studio-suite/suite3.JPG"],
    },
    "appartement-f3": {
        label: "Appartement F3 – Confort, Intimité et Élégance",
        price: 35000,
        description: "Découvrez notre Appartement F3 Spacieux et Confortable, idéal pour les séjours en famille, entre amis ou professionnels. " +
            "Profitez de deux chambres climatisées avec salles de bain privatives, d’un salon lumineux pour vos moments de détente, et d’une toilette visiteurs pratique. " +
            "Préparez vos repas dans une cuisine entièrement équipée, et savourez vos pauses dans un coin café aménagé. " +
            "Vous bénéficiez de la connexion Wi-Fi haut débit, d’une télévision avec chaînes internationales, du linge fourni et d’un service de ménage régulier. " +
            "Situé à 3 min du Stade Lat Dior et du Carrefour Market, dans un quartier calme et sécurisé, cet appartement vous offre espace, confort et autonomie pour un séjour sans compromis.",
        images: ["/f3/f31.jpeg", "/f3/f32.jpeg", "/f3/f33.JPG"],
    },
};

const UNIT_SLUGS: UnitSlug[] = ["chambre-standard", "mini-studio", "studio-suite", "appartement-f3"];

export default function UniteDetail({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);
    const unit = UNITS[slug as UnitSlug] || { label: "Unité inconnue", price: 0, description: "", images: [] };
    const [range, setRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    const isDateRangeValid = endDate > startDate;
    const nights = isDateRangeValid ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 0;
    const total = unit.price * nights;

    const currentIndex = UNIT_SLUGS.indexOf(slug as UnitSlug);
    const prevSlug = UNIT_SLUGS[(currentIndex - 1 + UNIT_SLUGS.length) % UNIT_SLUGS.length];
    const nextSlug = UNIT_SLUGS[(currentIndex + 1) % UNIT_SLUGS.length];

    return (
        <section className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-rose-700">{unit.label}</h1>

            <div className="mb-2 text-zinc-700">
                {isExpanded ? unit.description : unit.description.slice(0, 180) + "..."}
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-rose-600 ml-2 underline">
                    {isExpanded ? "Voir moins" : "Lire plus"}
                </button>
            </div>

            {unit.images.length > 0 && (
                <div className="flex overflow-x-auto gap-4 mb-4">
                    {unit.images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Photo ${index + 1}`}
                            onClick={() => setLightboxIndex(index)}
                            className="h-48 w-auto rounded shadow-sm flex-shrink-0 cursor-pointer hover:scale-105 transition"
                        />
                    ))}
                </div>
            )}

            <div className="mb-2">
                Prix : <span className="font-semibold">{unit.price.toLocaleString()} FCFA</span> / nuitée
            </div>

            <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Sélectionnez vos dates</h2>
                <div className="overflow-auto min-w-[320px]">
                    <DateRange
                        editableDateInputs
                        onChange={(item) => {
                            const newStart = item.selection.startDate || new Date();
                            const newEnd = item.selection.endDate || new Date();
                            setRange([{ startDate: newStart, endDate: newEnd, key: "selection" }]);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        rangeColors={["#f43f5e"]}
                        minDate={new Date()}
                    />
                </div>

                {isDateRangeValid && (
                    <div className="mt-2">
                        <span className="text-sm">Nuitées sélectionnées : {nights}</span><br />
                        <span className="text-base font-bold">Total : {total.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                )}

                <button
                    className={`mt-4 px-4 py-2 rounded font-semibold w-full ${
                        isDateRangeValid ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    onClick={() => {
                        if (!isDateRangeValid) return;
                        router.push(
                            `/reserver?type=${encodeURIComponent(unit.label)}&from=${startDate.toISOString()}` +
                            `&to=${endDate.toISOString()}&total=${total}&price=${unit.price}`
                        );
                    }}
                    disabled={!isDateRangeValid}
                >
                    Réserver ce logement
                </button>

                {!isDateRangeValid && (
                    <p className="mt-2 text-sm text-red-600">Veuillez sélectionner une date de fin ultérieure à la date de début.</p>
                )}
            </div>

            <div className="flex justify-between mt-6">
                <Link href={`/unites/${prevSlug}`} className="text-sm text-rose-600 hover:underline">
                    ← Voir {UNITS[prevSlug].label}
                </Link>
                <Link href={`/unites/${nextSlug}`} className="text-sm text-rose-600 hover:underline">
                    Voir {UNITS[nextSlug].label} →
                </Link>
            </div>

            {lightboxIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setLightboxIndex(null)}>
                    <button className="absolute top-4 right-4 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}>
                        &times;
                    </button>
                    <button className="absolute left-4 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + unit.images.length) % unit.images.length); }}>
                        &#8592;
                    </button>
                    <img
                        src={unit.images[lightboxIndex]}
                        alt="Agrandissement"
                        className="max-w-full max-h-full rounded"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button className="absolute right-4 text-white text-3xl" onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % unit.images.length); }}>
                        &#8594;
                    </button>
                </div>
            )}
        </section>
    );
}
