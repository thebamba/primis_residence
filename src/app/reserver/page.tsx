
"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight } from "lucide-react";


const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;


// Liens partenaires: booking et airbnb
const airbnbUrl = "https://airbnb.com";
const bookingUrl = "https://booking.com";

export default function Reserver() {
    const form = useRef<HTMLFormElement>(null);
    const [statut, setStatut] = useState<string | null>(null);

    const envoyerReservation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;
        setStatut(null);
        emailjs
            .sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                form.current,
                EMAILJS_PUBLIC_KEY
            )
            .then(() => {
                setStatut("Message envoyé ! Nous vous contacterons rapidement.");
                form.current?.reset();
            })
            .catch(() => {
                setStatut("Erreur lors de l'envoi. Veuillez réessayer.");
            });
    };

    return (
        <section className="max-w-md mx-auto bg-rose-50 dark:bg-zinc-900 dark:text-zinc-50 rounded-xl shadow p-6 text-center flex flex-col items-center gap-6 mt-6">
            <h1 className="text-3xl font-bold text-rose-700 mb-2">Nous contacter</h1>
            <p className="text-zinc-700 dark:text-zinc-200 mb-4">
                <span className="text-rose-600 font-semibold">Vous avez une question&nbsp;?</span><br />
                Remplissez le formulaire ci-dessous ou réservez via nos partenaires&nbsp;:
            </p>

            {/* Boutons vers plateformes */}
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <a
                    href={airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#FF5A5F] text-white font-semibold px-5 py-3 rounded-lg shadow hover:bg-[#ff868a] transition-all text-lg w-full sm:w-auto"
                >
                    <svg viewBox="0 0 32 32" fill="none" width={22} height={22} className="inline">
                        <path d="M16 2.5c-3.2 0-5.7 2.2-7.2 6.4-0.7 1.7-1.4 3.6-2 5.5-4.2 12.5 6.7 15.6 9.1 15.6s13.3-3.1 9.1-15.6c-0.6-1.9-1.3-3.8-2-5.5-1.5-4.2-4-6.4-7.2-6.4zM16 25.9c-1.7 0-3.6-0.7-5.1-2-1.5-1.3-2.8-3.3-3.6-5.5-0.7-1.8-1.1-3.5-0.9-4.8 0.7-3.7 5-10.8 9.6-10.8s8.9 7.1 9.6 10.8c0.2 1.3-0.2 3-0.9 4.8-0.8 2.2-2.2 4.2-3.7 5.5-1.4 1.3-3.3 2-5 2z" fill="#FFF"/>
                        <circle cx="16" cy="20" r="2.1" fill="#FFF" />
                    </svg>
                    Airbnb <ArrowRight size={18} />
                </a>
                <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#003580] text-white font-semibold px-5 py-3 rounded-lg shadow hover:bg-[#3867b4] transition-all text-lg w-full sm:w-auto"
                >
                    <svg width={22} height={22} viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="6" fill="#FFF" fillOpacity={0.1}/>
                        <rect width="28" height="28" rx="6" fill="#003580"/>
                        <text x="6" y="20" fill="#FFFFFF" fontFamily="Arial Black, Arial, sans-serif" fontSize="15" fontWeight="bold">B</text>
                        <circle cx="21.5" cy="21.5" r="2.5" fill="#FCC419" />
                    </svg>
                    Booking.com <ArrowRight size={18} />
                </a>
            </div>

            {/* Formulaire de contact */}
            <form ref={form} onSubmit={envoyerReservation} className="space-y-4 w-full text-left mt-6">
                <div>
                    <label htmlFor="nom" className="block font-medium mb-1">Nom complet</label>
                    <input id="nom" name="user_name" type="text" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="email" className="block font-medium mb-1">Email</label>
                    <input id="email" name="user_email" type="email" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="objet" className="block font-medium mb-1">Objet du message</label>
                    <input id="objet" name="objet" type="text" required className="w-full border rounded px-3 py-2" />
                </div>

                <div>
                    <label htmlFor="message" className="block font-medium mb-1">Message</label>
                    <textarea id="message" name="message" rows={3} className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold w-full">
                    Envoyer le message
                </button>
                {statut && (
                    <p className="text-green-700 mt-3">{statut}</p>
                )}
            </form>

            <div className="text-xs mt-4 text-zinc-500 dark:text-zinc-300 italic">
                (La réservation en ligne complète arrive très bientôt !)
            </div>
        </section>
    );
}


