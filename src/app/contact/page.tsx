"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [statut, setStatut] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [emailConfirm, setEmailConfirm] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const formData = new FormData(form.current);
    const email = formData.get("email")?.toString() || "";

    if (email !== emailConfirm) {
      setStatut({ type: "error", message: "Les deux adresses e-mail ne correspondent pas." });
      return;
    }

    setStatut(null);

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
        .then(() => {
          setStatut({ type: "success", message: "Votre message a été envoyé avec succès !" });
          form.current?.reset();
          setEmailConfirm("");
        })
        .catch(() => {
          setStatut({ type: "error", message: "Erreur lors de l'envoi. Veuillez réessayer." });
        });
  };

  return (
      <section className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-rose-700">Contact</h1>

        <form ref={form} onSubmit={handleSubmit} className="space-y-4 bg-white rounded shadow p-4">
          <div>
            <label htmlFor="nom" className="block font-medium mb-1">Nom</label>
            <input id="nom" name="nom" type="text" required className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <div className="flex items-start bg-yellow-100 border-l-4 border-yellow-600 p-4 rounded-md shadow-sm mb-3">
              <div className="text-xl mr-3">⚠️</div>
              <div>
                <p className="font-semibold text-yellow-800">Adresse e-mail importante</p>
                <p className="text-sm text-yellow-800">
                  Veuillez vous assurer qu’elle est correcte. Nous vous répondrons à cette adresse.
                </p>
              </div>
            </div>
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
