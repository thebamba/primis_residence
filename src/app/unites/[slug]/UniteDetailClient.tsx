"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DateRange } from "react-date-range";
import Link from "next/link";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export type UnitSlug = "chambre-standard" | "mini-studio" | "studio-suite" | "appartement-f3";

interface Props {
    slug: UnitSlug;
}

const UNITS: Record<UnitSlug, {
label: string;
price: number;
description: string;
images: string[];
}> = {
    "chambre-standard": {
        label: "Chambre standard – Confort et Simplicité",
        price: 17000,
        description: "Une chambre cosy idéale pour une ou deux personnes...",
        images: ["/standard-room/staroom1.JPG", "/standard-room/staroom2.JPG"],
    },
    "mini-studio": {
        label: "Mini studio – Fonctionnalité et Confort",
        price: 19000,
        description: "Studio équipé parfait pour un séjour court ou prolongé...",
        images: ["/mini-studio/ministud1.JPG"],
    },
    "studio-suite": {
        label: "Studio suite – Modernité & Élégance",
        price: 23000,
        description: "Studio spacieux avec salon, cuisine, balcon privé...",
        images: ["/studio-suite/suite1.JPG", "/studio-suite/suite2.JPG"],
    },
    "appartement-f3": {
        label: "Appartement F3 – Confort, Intimité",
        price: 35000,
        description: "Appartement familial avec deux chambres et cuisine équipée...",
        images: ["/f3/f31.jpeg", "/f3/f32.jpeg"],
    },
};

export default function UniteDetailClient({ slug }: Props) {
    const router = useRouter();
    const [blockedDates, setBlockedDates] = useState<Date[]>([]);
    const unit = UNITS[slug] || { label: "Unité inconnue", price: 0, description: "", images: [] };

    const [range, setRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    const isDateRangeValid = endDate > startDate;
    const nights = isDateRangeValid ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) : 0;
    const total = unit.price * nights;

    useEffect(() => {
        fetch(`/api/reservations?unit=${slug}`)
            .then(res => res.json())
            .then(data => {
                const result: Date[] = [];
                data.forEach(({ from, to }: { from: string; to: string }) => {
                    const current = new Date(from);
                    const end = new Date(to);
                    while (current <= end) {
                        result.push(new Date(current));
                        current.setDate(current.getDate() + 1);
                    }
                });
                setBlockedDates(result);
            });
    }, [slug]);

    return (
        <section className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-rose-700">{unit.label}</h1>

            {/* Le reste de ton composant ici */}
            {/* ... */}
        </section>
    );
}
