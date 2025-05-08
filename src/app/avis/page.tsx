const avis = [
  {
    nom: "Fatou S.",
    texte: "Superbe séjour, résidence très propre et calme. Merci à l’hôte !",
  },
  {
    nom: "Jean-Luc M.",
    texte: "Accueil chaleureux. Quartier très sécurisé et bien situé à Dakar.",
  },
  {
    nom: "Awa D.",
    texte: "Le meilleur endroit pour séjourner lors de mes voyages professionnels.",
  },
];

export default function Avis() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-rose-700">Avis des clients</h1>
      <ul className="space-y-4">
        {avis.map((a, idx) => (
          <li key={idx} className="bg-white shadow rounded p-4 border-l-4 border-rose-500">
            <p className="italic mb-2">“{a.texte}”</p>
            <span className="font-semibold">– {a.nom}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
