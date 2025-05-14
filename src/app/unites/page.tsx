"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const UNITS = {
    "chambre-standard": {
        images: ["/standard-room/staroom1.JPG", "/standard-room/staroom2.JPG"],
    },
    "mini-studio": {
        images: ["/mini-studio/ministud1.JPG"],
    },
    "studio-suite": {
        images: ["/studio-suite/suite1.JPG", "/studio-suite/suite2.JPG"],
    },
    "appartement-f3": {
        images: ["/f3/f31.jpeg", "/f3/f32.jpeg"],
    },
};

const units = [
    {
        slug: "chambre-standard",
        label: "Chambre standard – Confort et Simplicité",
        description:
            "Découvrez une chambre cosy idéale pour une ou deux personnes, avec salle de bain privée, Wi-Fi haut débit, mini-réfrigérateur et accès à une cuisine partagée. Parfaite pour un séjour pratique à 3 min du Stade Lat Dior et du Carrefour Market.",
    },
    {
        slug: "mini-studio",
        label: "Mini studio – Fonctionnalité et Confort en toute Simplicité",
        description:
            "Studio indépendant parfait pour une personne ou un couple, avec lit double, coin salon, cuisine équipée et salle de bain privée. Idéalement situé dans un quartier calme à 3 min du Stade Lat Dior et du Carrefour Market.",
    },
    {
        slug: "studio-suite",
        label: "Studio suite – Confort & Modernité au Rendez-vous",
        description:
            "Suite spacieuse avec salon lumineux, cuisine américaine équipée et chambre avec balcon privé. Salle de bain moderne, Wi-Fi, TV internationale, linge et ménage inclus. À 3 min du Stade Lat Dior et du Carrefour Market.",
    },
    {
        slug: "appartement-f3",
        label: "Appartement F3 – Confort, Intimité et Élégance",
        description:
            "Appartement familial avec 2 chambres climatisées, salon, cuisine équipée et toilettes visiteurs. Idéal pour famille ou groupe à la recherche d’espace et de confort à 3 min du Stade Lat Dior et du Carrefour Market.",
    },
];

export default function Unites() {
    return (
        <section className="max-w-3xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-rose-700 mb-8">Nos studios & appartements</h1>
            <div className="grid md:grid-cols-2 gap-8">
                {units.map((unit) => (
                    <div key={unit.slug} className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
                        <h2 className="text-xl font-semibold text-rose-600 mb-2">{unit.label}</h2>
                        <p className="mb-2 text-zinc-700">{unit.description}</p>

                        {/* Miniatures cliquables avec flèche */}
                        <div className="flex gap-2 items-center mb-4">
                            {UNITS[unit.slug as keyof typeof UNITS].images.slice(0, 2).map((src, index) => (
                                <Link href={`/unites/${unit.slug}`} key={index}>
                                    <img
                                        src={src}
                                        alt={`Aperçu ${index + 1}`}
                                        className="h-24 w-auto rounded shadow-sm cursor-pointer hover:scale-105 transition"
                                    />
                                </Link>
                            ))}
                            <Link href={`/unites/${unit.slug}`} className="flex items-center text-rose-600 hover:underline text-sm ml-2">
                                <span>Voir plus</span>
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>

                        <Link
                            href={`/unites/${unit.slug}`}
                            className="bg-rose-600 text-white rounded px-4 py-2 font-semibold mt-auto hover:bg-rose-700 transition text-center"
                        >
                            Voir détails et réserver
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
