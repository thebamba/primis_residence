"use client";
import { useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import emailjs from "@emailjs/browser";
import { ArrowRight } from "lucide-react";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

const airbnbUrl = "https://airbnb.com";
const bookingUrl = "https://booking.com";

export default function Reserver() {
    const form = useRef<HTMLFormElement>(null);
    const [range, setRange] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    const [statut, setStatut] = useState<string | null>(null);

    const envoyerReservation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;
        setStatut(null);
        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setStatut("Message envoyé ! Nous vous contacterons rapidement.");
                form.current?.reset();
            })
            .catch(() => {
                setStatut("Erreur lors de l'envoi. Veuillez réessayer.");
            });
    };

    return (
        <section className="max-w-lg mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-rose-700">Réserver votre séjour</h1>

            {/* Calendrier */}
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold mb-2">Sélectionnez vos dates</h2>
                <DateRange
                    editableDateInputs
                    onChange={item => {
                        const startDate = item.selection.startDate || new Date();
                        const endDate = item.selection.endDate || new Date();
                        setRange([{ startDate, endDate, key: "selection" }]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    rangeColors={["#f43f5e"]}
                    minDate={new Date()}
                />
            </div>

            {/* Formulaire */}
            <form ref={form} onSubmit={envoyerReservation} className="space-y-4 bg-white rounded shadow p-4">
                <input type="hidden" name="dates" value={`${range[0].startDate?.toLocaleDateString()} - ${range[0].endDate?.toLocaleDateString()}`} />

                <div>
                    <label className="block font-medium mb-1" htmlFor="nom">Nom complet</label>
                    <input id="nom" name="user_name" type="text" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block font-medium mb-1" htmlFor="email">Email</label>
                    <input id="email" name="user_email" type="email" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block font-medium mb-1" htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={3} className="w-full border rounded px-3 py-2" />
                </div>

                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold w-full">
                    Demander la réservation
                </button>
                {statut && <p className="text-green-700 mt-3">{statut}</p>}
            </form>
            {/* Paiement à venir */}
            <div className="bg-yellow-50 border border-yellow-200 rounded shadow p-4 text-center text-yellow-900">
                <p className="font-semibold mb-2">Le paiement en ligne arrive bientôt&nbsp;!</p>
                <p className="text-sm">Nous travaillons fort pour vous offrir très prochainement toutes les méthodes de paiement&nbsp;: carte bancaire, Orange Money, Wave, PayPal, et plus encore.</p>
                <button disabled className="w-full bg-gray-300 text-gray-500 cursor-not-allowed rounded py-2 mt-3 font-semibold">
                    Paiement en ligne (bientôt disponible)
                </button>
            </div>
            {/* Partenaires */}
            <div className="bg-zinc-50 rounded shadow p-4 text-center space-y-2">
                <p className="font-medium text-zinc-700">Ou réservez directement via nos partenaires&nbsp;:</p>
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                    <a href={airbnbUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#FF5A5F] text-white font-semibold px-5 py-3 rounded-lg shadow hover:bg-[#ff868a] transition-all text-lg w-full sm:w-auto">
                        Airbnb <ArrowRight size={18} />
                    </a>
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#003580] text-white font-semibold px-5 py-3 rounded-lg shadow hover:bg-[#3867b4] transition-all text-lg w-full sm:w-auto">
                        Booking.com <ArrowRight size={18} />
                    </a>
                </div>
            </div>


        </section>
    );
}
