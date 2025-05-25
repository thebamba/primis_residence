// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import MobileMenu from "./components//MobileMenu";

export const metadata: Metadata = {
    title: "Résidences PRIMIS",
    description: "Studios et appartements modernes à Thiès – Réservation en ligne",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className="flex flex-col min-h-screen font-sans bg-zinc-50 text-zinc-900">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-4xl mx-auto flex items-center justify-between h-16 px-4 relative">
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/residences-primis-logo.jpg"
                        alt="Résidences PRIMIS Logo"
                        width={50}
                        height={50}
                        className="rounded"
                    />
                    <span className="text-lg font-bold tracking-wide text-rose-600">
                Résidences PRIMIS
              </span>
                </Link>

                {/* Desktop nav */}
                <div className="space-x-4 hidden md:flex">
                    <Link href="/" className="hover:text-rose-600 transition">Accueil</Link>
                    <Link href="/unites" className="hover:text-rose-600 transition">Nos studios et appartements</Link>
                    <Link href="/a-propos" className="hover:text-rose-600 transition">À propos</Link>
                    <Link href="/contact" className="hover:text-rose-600 transition">Nous contacter</Link>
                    <Link href="/avis" className="hover:text-rose-600 transition">Avis</Link>
                </div>

                <MobileMenu />
            </nav>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
            {children}
        </main>

        {/* Footer */}
        <footer className="border-t text-sm text-center text-muted-foreground py-6 mt-10 space-y-4">
            <div className="text-zinc-700 dark:text-zinc-300 space-y-1">
                📞 <a href="tel:+221778114343" className="hover:underline font-semibold text-zinc-900 dark:text-white">+221 77 811 43 43</a><br />
                ✉️ <a href="mailto:primisimmo@gmail.com" className="hover:underline font-semibold text-zinc-900 dark:text-white">primisimmo@gmail.com</a>
            </div>

            <div className="flex justify-center gap-4">
                <a href="https://www.facebook.com/share/19rdJiC7vB/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="w-5 h-5 hover:text-blue-600" />
                </a>
                <a href="https://fr.airbnb.be/rooms/905303833006336547" target="_blank" rel="noopener noreferrer" className="text-rose-600 font-semibold hover:underline">
                    Airbnb
                </a>
                <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
                    Booking
                </a>
                <a href="https://wa.me/+221778114343" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <FaWhatsapp className="w-5 h-5 hover:text-green-600" />
                </a>
            </div>

            <p>© 2025 Résidences PRIMIS | Thiès, Sénégal</p>
        </footer>
        </body>
        </html>
    );
}
