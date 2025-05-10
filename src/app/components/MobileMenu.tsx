"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/unites", label: "Nos studios et appartements" },
    { href: "/a-propos", label: "À propos" },
    { href: "/contact", label: "Nous contacter" },
    { href: "/avis", label: "Avis" },
];

export default function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                className="p-2 text-rose-600"
                aria-label="Ouvrir le menu"
                onClick={() => setOpen(!open)}
            >
                {open ? <X size={28} /> : <Menu size={28} />}
            </button>
            {open && (
                <nav className="absolute top-16 left-0 w-full z-50 bg-white border-b shadow">
                    <ul className="flex flex-col gap-4 py-6 px-4">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block py-2 px-1 rounded hover:bg-rose-50 text-lg font-medium"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}
