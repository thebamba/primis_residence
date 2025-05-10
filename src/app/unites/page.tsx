"use client";
import Link from "next/link";

const units = [
    {
        slug: "chambre-standard",
        label: "Chambre standard",
        description: "Chambre simple, confortable, idéale pour une ou deux personnes. Salle de bain privative, wifi, climatisation.",
    },
    {
        slug: "studio-suite",
        label: "Studio suite",
        description: "Studios spacieux tout équipés, espace salon et vraie cuisine américaine.",
    },
    {
        slug: "mini-studio",
        label: "Mini studio",
        description: "Petit logement fonctionnel parfait pour un court séjour solo.",
    },
    {
        slug: "appartement-f3",
        label: "Appartement F3",
        description: "Appartement familial 2 chambres, salon, cuisine séparée.",
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

                        {/* Message d'avertissement pour studio-suite et appartement-f3 */}
                        {["studio-suite", "appartement-f3"].includes(unit.slug) && (
                            <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-600 p-3 rounded-md shadow-sm mb-4">
                                <div className="text-xl mr-3">⚠️</div>
                                <div>
                                    <p className="font-semibold text-yellow-800">
                                        Photos à venir
                                    </p>
                                    <p className="text-sm text-yellow-800">
                                        Les photos pour cette unité seront bientôt disponibles.
                                    </p>
                                </div>
                            </div>
                        )}


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
