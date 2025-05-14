"use client";
import { useEffect, useState } from "react";

type ReservationInfo = {
    user_name: string;
    email: string;
    unit_type: string;
    dates: string;
    total_price: string;
};

export default function CheckoutSuccessPage() {
    const [reservationInfo, setReservationInfo] = useState<ReservationInfo | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("reservationInfo");
        if (stored) {
            const data: ReservationInfo = JSON.parse(stored);
            setReservationInfo(data);

            // Envoyer l'email de confirmation
            fetch("/api/payment-confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: stored,
            });

            // Nettoyer le storage après envoi
            localStorage.removeItem("reservationInfo");
        }
    }, []);

    return (
        <div className="max-w-xl mx-auto py-20 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Merci pour votre paiement !</h1>
            {reservationInfo ? (
                <div>
                    <p>Votre réservation est bien confirmée.</p>
                    <p>Un courriel a été envoyé à {reservationInfo.email}.</p>
                </div>
            ) : (
                <p>Votre réservation est confirmée.</p>
            )}
        </div>
    );
}
