"use client";

const avis = [
    {
        nom: "Mattia",
        paysCode: "it",

        titre: "Excellent stay",
        texte: "The place was exactly where state in the reservation, clean and comfortable, staff was available and kind. Will definitely go back.",
        note: 5,
    },
    {
        nom: "Fallou",
        paysCode: "fr",
        titre: "Séjour au calme",
        texte: "Je trouve l’établissement propre et surtout très calme si on veut se reposer. Niveau accueil madame Mbengue a été irréprochable.",
        note: 5,
    },
    {
        nom: "Yemi",
        paysCode: "gb",
        titre: "Home Feeling",
        texte: "It's spacious and clean. It has a separate kitchen and lounge for me to use. Ideal for staying indoors and doing your cooking.",
        note: 4.5,
    },

    {
        nom: "Modou",
        paysCode: "sn",
        titre: "Expérience agréable",
        texte: "La résidence est calme propre et personnel est à l'écoute. Je vous le conseille à toute personne qui compte séjourner à Thies.",
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
            <h1 className="text-3xl font-bold mb-4 text-rose-700">Quelques-uns de nos avis clients</h1>
            <ul className="space-y-4">
                {avis.map((a, idx) => (
                    <li key={idx} className="bg-white shadow rounded p-4 border-l-4 border-rose-500">
                        <div className="flex items-center mb-2">
                            <img
                                src={`https://flagcdn.com/w40/${a.paysCode}.png`}
                                alt={a.paysCode}
                                className="w-6 h-4 mr-2"
                            />
                        </div>
                        <h2 className="font-semibold mb-1">{a.titre}</h2>
                        <div className="mb-2">{renderStars(a.note)}</div>
                        <p className="italic mb-2">“{a.texte}”</p>
                        <span className="font-semibold">– {a.nom}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
