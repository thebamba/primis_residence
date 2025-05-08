export default function Contact() {
  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-rose-700">Contact</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="nom" className="block font-medium mb-1">Nom</label>
          <input id="nom" name="nom" type="text" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input id="email" name="email" type="email" required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label htmlFor="message" className="block font-medium mb-1">Message</label>
          <textarea id="message" name="message" rows={3} required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold">Envoyer</button>
      </form>
    </section>
  );
}
