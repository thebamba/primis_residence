"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function ReserverContent() {
    const search = useSearchParams();
    const unitType = search.get("type") || "";
    const from = search.get("from") || "";
    const to = search.get("to") || "";
    const total = search.get("total") || "";

    const form = useRef<HTMLFormElement>(null);
    const [statut, setStatut] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [emailConfirm, setEmailConfirm] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        const formData = new FormData(form.current);
        const email = formData.get("user_email")?.toString() || "";

        if (email !== emailConfirm) {
            setStatut({ type: "error", message: "Les deux adresses e-mail ne correspondent pas." });
            return;
        }

        setStatut(null);

        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
            .then(() => {
                setStatut({ type: "success", message: "Demande envoyée avec succès ! Vous recevrez un email sous peu." });
                form.current?.reset();
                setEmailConfirm("");
            })
            .catch(() => {
                setStatut({ type: "error", message: "Erreur lors de l'envoi. Veuillez réessayer." });
            });
    };

    return (
        <section className="max-w-lg mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-rose-700">Confirmez votre réservation</h1>

            <div className="bg-zinc-50 p-3 rounded space-y-2">
                {/*<input type="hidden" name="unit_type" value={unitType} />*/}
                {/*<input type="hidden" name="dates" value={`${from} - ${to}`} />*/}
                {/*<input type="hidden" name="total_price" value={total} />*/}

                <div>
                    <label className="font-medium">Type d'unité</label>
                    <input value={unitType} readOnly className="w-full border rounded px-3 py-2 mt-1" />
                </div>
                <div>
                    <label className="font-medium">Dates</label>
                    <input
                        value={from && to ? `${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}` : ""}
                        readOnly
                        className="w-full border rounded px-3 py-2 mt-1"
                    />
                </div>
                <div>
                    <label className="font-medium">Total à payer</label>
                    <input value={total ? `${parseInt(total).toLocaleString()} FCFA` : ""} readOnly className="w-full border rounded px-3 py-2 mt-1" />
                </div>
            </div><input
            type="hidden"
            name="dates"
            value={`${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`}
        />


            <form ref={form} onSubmit={handleSubmit} className="space-y-4 bg-white rounded shadow p-4">
                {/* ✅ Hidden fields moved inside the form */}
                <input type="hidden" name="unit_type" value={unitType} />
                <input
                    type="hidden"
                    name="dates"
                    value={`${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`}
                />
                <input type="hidden" name="total_price" value={`${parseInt(total).toLocaleString()} FCFA`} />
                <div>
                    <label className="block font-medium mb-1">Nom complet</label>
                    <input name="user_name" type="text" required className="w-full border rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block font-medium mb-1">Adresse e-mail</label>
                    <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded-md shadow-sm mb-3">
                        <div className="text-xl mr-3">⚠️</div>
                        <div>
                            <p className="font-semibold text-yellow-800">
                                Adresse e-mail importante
                            </p>
                            <p className="text-sm text-yellow-800">
                                C’est à cette adresse que vous recevrez le lien de paiement et la confirmation de réservation.
                                <br />Veuillez vous assurer qu’elle est correcte avant de continuer.
                            </p>
                        </div>
                    </div>
                    <input
                        name="user_email"
                        type="email"
                        required
                        className="w-full border rounded px-3 py-2"
                        placeholder="ex: vous@email.com"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Confirmez votre adresse e-mail</label>
                    <input
                        type="email"
                        required
                        value={emailConfirm}
                        onChange={(e) => setEmailConfirm(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Précisions sur la réservation (optionnel)</label>
                    <textarea name="message" rows={3} placeholder="Ex : Heure d'arrivée prévue, demandes spéciales…" className="w-full border rounded px-3 py-2" />
                </div>
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold w-full">
                    Soumettre la réservation
                </button>

                {statut && (
                    <p className={`mt-3 ${statut.type === "success" ? "text-green-700" : "text-red-700"}`}>
                        {statut.message}
                    </p>
                )}
            </form>
        </section>
    );
}
