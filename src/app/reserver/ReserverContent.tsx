"use client";
import { useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function ReserverContent() {
    const search = useSearchParams();
    const router = useRouter();
    const slug = search.get("type") || "";
    const from = search.get("from") || "";
    const to = search.get("to") || "";
    const total = search.get("total") || "";

    const form = useRef<HTMLFormElement>(null);
    const [emailConfirm, setEmailConfirm] = useState<string>("");
    const [statut, setStatut] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [highlightError, setHighlightError] = useState(false);

    const validateForm = (): boolean => {
        if (!form.current) return false;
        const formData = new FormData(form.current);
        const userName = formData.get("user_name")?.toString() || "";
        const userEmail = formData.get("user_email")?.toString() || "";

        return userName.trim() !== "" && userEmail === emailConfirm && userEmail.trim() !== "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            setStatut({ type: "error", message: "Veuillez remplir correctement tous les champs obligatoires." });
            setHighlightError(true);
            return;
        }

        setStatut(null);
        setHighlightError(false);

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unit: slug,
                    from: from,
                    to: to
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setStatut({ type: "error", message: result.message || "Une erreur s'est produite lors de la réservation." });
                return;
            }

            // Send confirmation email
            emailjs
                .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current!, EMAILJS_PUBLIC_KEY)
                .then(() => {
                    setStatut({ type: "success", message: "Réservation confirmée ! Vous recevrez un email sous peu." });
                    form.current?.reset();
                    setEmailConfirm("");
                })
                .catch(() => {
                    setStatut({ type: "error", message: "Erreur lors de l'envoi. Veuillez réessayer." });
                });
        } catch (error) {
            setStatut({ type: "error", message: "Une erreur s'est produite lors de la réservation." });
        }
    };

    const handleStripePayment = async () => {
        if (!validateForm()) {
            setStatut({ type: "error", message: "Veuillez remplir correctement tous les champs obligatoires avant de continuer au paiement." });
            setHighlightError(true);
            return;
        }

        const fromDate = from.split("T")[0];
        const toDate = to.split("T")[0];

        const resConflict = await fetch('/api/reservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ unit_type: slug, from: fromDate, to: toDate })
        });

        const resultConflict = await resConflict.json();

        if (!resConflict.ok) {
            setStatut({ type: "error", message: resultConflict.message || "Erreur : les dates sont déjà réservées." });
            return;
        }

        setStatut(null);
        setHighlightError(false);

        const formData = new FormData(form.current!);
        const user_name = formData.get("user_name")?.toString() || "";
        const email = formData.get("user_email")?.toString() || "";

        localStorage.setItem("reservationInfo", JSON.stringify({
            user_name,
            email,
            unit_type: slug,
            dates: `${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`,
            total_price: `${parseInt(total).toLocaleString()} FCFA`,
        }));

        const res = await fetch('/api/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({ unitType: slug, total: total }),
        });
        const { url } = await res.json();
        router.push(url);
    };

    return (
        <section className="max-w-lg mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-rose-700">Confirmez votre réservation</h1>

            <div className="bg-zinc-50 p-3 rounded space-y-2">
                <div>
                    <label className="font-medium">Type d'unité</label>
                    <input value={slug} readOnly className="w-full border rounded px-3 py-2 mt-1" />
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
            </div>

            <form ref={form} onSubmit={handleSubmit} className="space-y-4 bg-white rounded shadow p-4">
                <input type="hidden" name="unit_type" value={slug} />
                <input type="hidden" name="dates" value={`${new Date(from).toLocaleDateString()} - ${new Date(to).toLocaleDateString()}`} />
                <input type="hidden" name="total_price" value={`${parseInt(total).toLocaleString()} FCFA`} />

                <div>
                    <label className="block font-medium mb-1">Nom complet</label>
                    <input
                        name="user_name"
                        type="text"
                        required
                        className={`w-full border px-3 py-2 ${highlightError ? 'border-red-600' : 'border-gray-300'}`}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Adresse e-mail</label>
                    <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded-md shadow-sm mb-3">
                        <div className="text-xl mr-3">⚠️</div>
                        <div>
                            <p className="font-semibold text-yellow-800">Adresse e-mail importante</p>
                            <p className="text-sm text-yellow-800">
                                C'est à cette adresse que vous recevrez la confirmation et, si vous choisissez, le lien de paiement.
                            </p>
                        </div>
                    </div>
                    <input
                        name="user_email"
                        type="email"
                        required
                        className={`w-full border px-3 py-2 ${highlightError ? 'border-red-600' : 'border-gray-300'}`}
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
                        className={`w-full border px-3 py-2 ${highlightError ? 'border-red-600' : 'border-gray-300'}`}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Précisions sur la réservation (optionnel)</label>
                    <textarea name="message" rows={3} placeholder="Ex : Heure d'arrivée prévue, demandes spéciales…" className="w-full border rounded px-3 py-2" />
                </div>

                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={handleStripePayment}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold w-full"
                    >
                        Procéder au paiement sécurisé
                    </button>

                    <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold w-full"
                    >
                        Réserver et payer sur place
                    </button>
                </div>

                {statut && (
                    <p className={`mt-3 ${statut.type === "success" ? "text-green-700" : "text-red-700"}`}>
                        {statut.message}
                    </p>
                )}
            </form>
        </section>
    );
}
