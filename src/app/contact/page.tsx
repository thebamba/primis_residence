"use client";
import { useState } from "react";

export default function Contact() {
  const [statut, setStatut] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [emailConfirm, setEmailConfirm] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const formData = new FormData(form);
    const nom = formData.get("nom")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, email, message }),
    });

    if (res.ok) {
      setStatut({ type: "success", message: "Votre message a été envoyé avec succès !" });
      form.reset();  // Utilisation explicite du form
      setEmailConfirm("");
    } else {
      setStatut({ type: "error", message: "Erreur lors de l'envoi. Veuillez réessayer." });
    }
  };


  return (
      <section className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-rose-700">Contact</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded shadow p-4">
          <div>
            <label htmlFor="nom" className="block font-medium mb-1">Nom</label>
            <input id="nom" name="nom" type="text" required className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input id="email" name="email" type="email" required className="w-full border rounded px-3 py-2" />
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
            <label htmlFor="message" className="block font-medium mb-1">Message</label>
            <textarea id="message" name="message" rows={3} required className="w-full border rounded px-3 py-2" />
          </div>

          <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold w-full">
            Envoyer
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
