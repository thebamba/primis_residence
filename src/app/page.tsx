export default function Home() {
  return (
    <section className="space-y-10">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg p-6 shadow">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Résidence soleil extérieur"
          className="w-full max-w-xs rounded-lg shadow-md md:w-72"
        />
        <div>
          <h1 className="text-4xl font-bold mb-3 text-rose-700">Bienvenue à la Résidence Soleil</h1>
          <p className="mb-4">
            Un havre moderne et accueillant au cœur de Dakar, parfait pour le repos ou les séjours professionnels.
          </p>
          <a href="/reserver" className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold transition">Réserver dès maintenant</a>
        </div>
      </div>

      {/* Services */}
      <section className="bg-zinc-100 rounded-lg py-6 px-4">
        <h2 className="text-2xl font-semibold mb-4 text-rose-600">Nos services</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li className="bg-white shadow p-4 rounded flex flex-col items-center">
            <span className="text-3xl">🛏️</span>
            <span className="font-medium mt-2">Chambres tout confort</span>
          </li>
          <li className="bg-white shadow p-4 rounded flex flex-col items-center">
            <span className="text-3xl">🌐</span>
            <span className="font-medium mt-2">WiFi gratuit & sécurisé</span>
          </li>
          <li className="bg-white shadow p-4 rounded flex flex-col items-center">
            <span className="text-3xl">🛎️</span>
            <span className="font-medium mt-2">Accueil personnalisé 24h/24</span>
          </li>
        </ul>
      </section>

      {/* Localisation */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2 text-rose-600">Où nous trouver ?</h2>
        <p className="mb-2">Quartier Sicap Baobab, Dakar, Sénégal</p>
        <div className="overflow-hidden rounded shadow max-w-md mx-auto">
          <img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
            alt="Localisation Dakar"
            className="w-full h-40 object-cover"
          />
        </div>
      </section>
    </section>
  );
}
