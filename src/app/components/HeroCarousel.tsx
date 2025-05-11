"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const images = [
    "/accueil4.png",
    "/accueil3.png",
    "/accueil2.png",
    "/salon-pic.png",
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCurrent((current + 1) % images.length);
        }, 4000);

        return () => clearTimeout(timeout);
    }, [current]);

    return (
        <div className="relative rounded-lg overflow-hidden shadow group cursor-pointer h-[400px]">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[4000ms] ease-in-out ${
                        index === current ? "opacity-100 animate-zoom" : "opacity-0 scale-100"
                    }`}
                />
            ))}

            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                    Bienvenue à la Résidence PRIMIS
                </h1>
                <p className="text-lg text-yellow-400 font-semibold mb-2">
                    À 30 minutes de l’aéroport international Blaise Diagne
                </p>

                <p className="text-white mb-6 max-w-xl">
                    Un havre moderne et accueillant au cœur de Thiès, parfait pour le repos ou les séjours professionnels.
                </p>
                <Link href="/unites">
                    <span className="bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-md text-lg font-semibold shadow-lg text-white transition">
                        Voir nos studios et appartements
                    </span>
                </Link>
            </div>
        </div>
    );
}
