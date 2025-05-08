const avis = [
  {
    nom: "Fatou S.",
    texte: "Superbe séjour, résidence très propre et calme. Merci à l’hôte !",
    note: 5,
  },
  {
    nom: "Jean-Luc M.",
    texte: "Accueil chaleureux. Quartier très sécurisé et bien situé à Thiès.",
    note: 4.5,
  },
  {
    nom: "Awa D.",
    texte: "Le meilleur endroit pour séjourner lors de mes voyages professionnels.",
    note: 5,
  },
];

function renderStars(note: number) {
  const stars = [];
  const full = Math.floor(note);
  const half = note % 1 >= 0.5;

  for (let i = 0; i < full; i++) {
    stars.push(<span key={`full-${i}`} className="text-yellow-500">★</span>);
  }
  if (half) {
    stars.push(<span key="half" className="text-yellow-500">☆</span>);
  }
  while (stars.length < 5) {
    stars.push(<span key={`empty-${stars.length}`} className="text-gray-300">★</span>);
  }

  return stars;
}

export default function Avis() {
  return (
      <section>
        <h1 className="text-3xl font-bold mb-4 text-rose-700">Avis des clients</h1>
        <ul className="space-y-4">
          {avis.map((a, idx) => (
              <li key={idx} className="bg-white shadow rounded p-4 border-l-4 border-rose-500">
                <div className="mb-2">{renderStars(a.note)}</div>
                <p className="italic mb-2">“{a.texte}”</p>
                <span className="font-semibold">– {a.nom}</span>
              </li>
          ))}
        </ul>
      </section>
  );
}
