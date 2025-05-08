import Link from "next/link";
import "./globals.css";
import { Facebook, Instagram, Twitter, Home } from "lucide-react";
import MobileMenu from "./components/MobileMenu";


export const metadata = {
  title: "Résidence Primis - Sénégal",
  description: "Un havre moderne à Thiès. Hébergement de qualité, réservation facile, avis clients et contact en ligne.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen font-sans bg-zinc-50 text-zinc-900">
        {/* Header/nav */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-4xl mx-auto flex items-center justify-between h-16 px-4 relative">
            <Link href="/" className="text-lg font-bold tracking-wide text-rose-600">
              Résidence Primis
            </Link>
            {/* Desktop nav */}
            <div className="space-x-4 hidden md:flex">
              <Link href="/" className="hover:text-rose-600 transition">Accueil</Link>
              <Link href="/a-propos" className="hover:text-rose-600 transition">À propos</Link>
              <Link href="/reserver" className="hover:text-rose-600 transition">Réservation et Contact</Link>
              <Link href="/unites" className="hover:text-rose-600 transition">Nos studios et appartements</Link>
              <Link href="/avis" className="hover:text-rose-600 transition">Avis</Link>
            </div>
            {/* Mobile burger */}
            <MobileMenu />
          </nav>
        </header>
        {/* Main content */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">{children}</main>
        {/* Footer */}
        <footer className="border-t text-sm text-center text-muted-foreground py-6 mt-10 space-y-4">
          {/* Bloc contact */}
          <div className="text-zinc-700 dark:text-zinc-300 space-y-1">
            📞 <a href="tel:+221778114343" className="hover:underline font-semibold text-zinc-900 dark:text-white">+221 77 811 43 43</a><br />
            ✉️ <a href="mailto:primisimmo@gmail.com" className="hover:underline font-semibold text-zinc-900 dark:text-white">primisimmo@gmail.com</a>
          </div>

          {/* Réseaux & plateformes */}
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com/tonprofil" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-blue-600" />
            </a>
            <a href="https://fr.airbnb.be/rooms/905303833006336547?source_impression_id=p3_1746737354_P3Vsg5_wOJfUPs6C" target="_blank" rel="noopener noreferrer" className="text-rose-600 font-semibold hover:underline">
              Airbnb
            </a>
            <a href="https://www.booking.com/searchresults.fr.html?aid=356980&label=gog235jc-1DCAso0AFCKmNoYW1icmUtY2xpbWF0aXNlZS1hdmVjLXRvaWxldHRlcy1hdXRvbm9tZUgNWANoJ4gBAZgBDbgBB8gBDdgBA-gBAfgBAogCAagCA7gCrbH0wAbAAgHSAiQ5YzJkYzk3MC00NjI0LTRmYTYtOTI5Yy0wYzQ0MTM0YTVlNzHYAgTgAgE&highlighted_hotels=9880370&redirected=1&city=-2275058&hlrd=user_sh&source=hotel&expand_sb=1&keep_landing=1&sid=159eab3474361f22e9f2e61f3ae3fa36" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold hover:underline">
              Booking
            </a>
          </div>

          <p>© 2025 PRIM'IS SARL | Dakar, Sénégal</p>
        </footer>


      </body>
    </html>
  );
}
