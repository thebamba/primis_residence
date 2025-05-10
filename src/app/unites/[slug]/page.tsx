"use client";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { useRouter } from "next/navigation";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type UnitSlug = "chambre-standard" | "studio-suite" | "mini-studio" | "appartement-f3";

const UNITS: Record<UnitSlug, { label: string; price: number; description: string; images: string[] }> = {
    "chambre-standard": {
        label: "Chambre standard",
        price: 20000,
        description: "Chambre simple, idéale pour une ou deux personnes. Salle de bain privative, wifi, clim.",
        images: ["/standard-room/st-room1.png", "/standard-room/st-room2.png"],
    },
    "studio-suite": {
        label: "Studio suite",
        price: 35000,
        description: "Studio spacieux avec cuisine équipée, coin salon, idéal long séjour.",
        images: ["/img/studio1.jpg", "/img/studio2.jpg", "/img/studio3.jpg"],
    },
    "mini-studio": {
        label: "Mini studio",
        price: 15000,
        description: "Logement fonctionnel parfait pour un court séjour solo.",
        images: ["/mini-studio/mini-stud1.jpeg", "/mini-studio/mini-stud2.jpeg", "/mini-studio/ministud3.jpg", "/img/f3_1.jpg", "/img/f3_2.jpg", "/img/f3_3.jpg", "/img/f3_4.jpg"],
    },
    "appartement-f3": {
        label: "Appartement F3",
        price: 60000,
        description: "Appartement 2 chambres, salon, cuisine : parfait famille/groupe.",
        images: ["/img/f3_1.jpg", "/img/f3_2.jpg", "/img/f3_3.jpg", "/img/f3_4.jpg"],
    },
};

export default function UniteDetail({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const unit = UNITS[params.slug as UnitSlug] || { label: "Unité inconnue", price: 0, description: "", images: [] };
    const [range, setRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    const isDateRangeValid = endDate > startDate;

    const nights = isDateRangeValid
        ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24))
        : 0;

    const total = unit.price * nights;

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + unit.images.length) % unit.images.length);
    const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % unit.images.length);

    return (
        <section className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-rose-700">{unit.label}</h1>
            <div className="mb-2 text-zinc-700">{unit.description}</div>

            {unit.images.length > 0 && (
                <div className="flex overflow-x-auto gap-4 mb-4">
                    {unit.images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Photo ${index + 1}`}
                            onClick={() => openLightbox(index)}
                            className="h-48 w-auto rounded shadow-sm flex-shrink-0 cursor-pointer hover:scale-105 transition"
                        />
                    ))}
                </div>
            )}

            <div className="mb-2">
                Prix : <span className="font-semibold">{unit.price.toLocaleString()} FCFA</span> / nuit
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

                <div className="mt-2">
                    {isDateRangeValid && (
                        <>
                            <span className="text-sm">Nuits sélectionnées : {nights}</span><br />
                            <span className="text-base font-bold">Total : {total.toLocaleString()} FCFA</span>
                        </>
                    )}
                </div>

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

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-3xl"
                        onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                    >
                        &times;
                    </button>

                    <button
                        className="absolute left-4 text-white text-3xl"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        &#8592;
                    </button>

                    <img
                        src={unit.images[lightboxIndex]}
                        alt="Agrandissement"
                        className="max-w-full max-h-full rounded"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="absolute right-4 text-white text-3xl"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        &#8594;
                    </button>
                </div>
            )}
        </section>
    );
}
