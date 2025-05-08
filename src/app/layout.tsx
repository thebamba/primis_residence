import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Résidence Soleil - Sénégal",
  description: "Un havre moderne à Dakar. Hébergement de qualité, réservation facile, avis clients et contact en ligne.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen font-sans bg-zinc-50 text-zinc-900">
        {/* Header/nav */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-4xl mx-auto flex items-center justify-between h-16 px-4">
            <Link href="/" className="text-lg font-bold tracking-wide text-rose-600">
              Résidence Soleil
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-rose-600 transition">Accueil</Link>
              <Link href="/a-propos" className="hover:text-rose-600 transition">À propos</Link>
              <Link href="/reserver" className="hover:text-rose-600 transition">Réserver</Link>
              <Link href="/avis" className="hover:text-rose-600 transition">Avis</Link>
              <Link href="/contact" className="hover:text-rose-600 transition">Contact</Link>
            </div>
          </nav>
        </header>
        {/* Main content */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">{children}</main>
        {/* Footer */}
        <footer className="bg-white text-xs text-center shadow-inner py-4 mt-10">
          © {new Date().getFullYear()} Résidence Soleil | Dakar, Sénégal
        </footer>
      </body>
    </html>
  );
}
