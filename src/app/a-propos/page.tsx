export default function About() {
    return (
        <section className="space-y-4">
            <h1 className="text-3xl font-bold mb-2 text-rose-700">À propos</h1>
            <p>
                Bienvenue à la Résidence Primis, un immeuble moderne et bien réputé situé dans un quartier résidentiel calme de Thiès, à proximité de l’autoroute.
                Un cadre idéal pour les séjours de courte ou longue durée, alliant confort et tranquillité.
            </p>

            {/* Points d’intérêt */}
            <div className="bg-zinc-100 border border-zinc-200 p-4 rounded space-y-2 text-sm text-zinc-700">
                <p><strong>🚖 Situé à proximité de l’autoroute et à seulement 3 minutes à pied d’une gare de taxi</strong></p>
                <p><strong>🛒 À quelques minutes de l’épicerie Carrefour Market</strong></p>
                <p><strong>🏟️ Proche du stade Lat Dior de Thiès</strong></p>
                <p><strong>🔒 Résidence sécurisée avec gardien sur place et caméras de surveillance discrètes</strong></p>
            </div>

            <h2 className="text-xl font-semibold mt-6">Un cadre idéal pour votre séjour</h2>
            <p>
                La résidence se distingue par son environnement paisible et ses installations modernes, offrant à ses visiteurs un espace agréable et sécurisé pour se détendre ou travailler.
            </p>

            <h2 className="text-xl font-semibold mt-6">Un service attentionné</h2>
            <p>
                Vous serez accueilli et accompagné tout au long de votre séjour par une équipe attentionnée et disponible, toujours prête à répondre à vos besoins pour vous garantir une expérience agréable et sans souci.
            </p>
        </section>
    );
}
