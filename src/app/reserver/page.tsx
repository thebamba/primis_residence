export default function Reserver() {
  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-rose-700">Réserver</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="nom" className="block font-medium mb-1">Nom complet</label>
          <input id="nom" name="nom" type="text" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input id="email" name="email" type="email" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="dates" className="block font-medium mb-1">Dates du séjour</label>
          <input id="dates" name="dates" type="text" placeholder="ex: 10-15 août" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1">Message</label>
          <textarea id="message" name="message" rows={3} className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold">Envoyer la réservation</button>
      </form>
    </section>
  );
}
