import HeroCarousel from "./components/HeroCarousel";

export default function Home() {
  return (
      <section className="space-y-10">
        {/* Hero Carousel */}
        <HeroCarousel />

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
            <li className="bg-white shadow p-4 rounded flex flex-col items-center">
              <span className="text-3xl">🚗</span>
              <span className="font-medium mt-2">Location de voiture ($)</span>
            </li>
            <li className="bg-white shadow p-4 rounded flex flex-col items-center">
              <span className="text-3xl">🚌</span>
              <span className="font-medium mt-2">Navette aéroport ($)</span>
            </li>
          </ul>

          {/* Bouton vers la page des unités */}
          <div className="flex justify-center mt-6">
            <a
                href="/contact"
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded font-semibold shadow transition"
            >
              Nous contacter pour en savoir plus sur ces services
            </a>
          </div>
        </section>

        {/* Localisation */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-rose-600">Où nous trouver ?</h2>
          <p className="mb-4">Guest House PRIMIS, Q2CW+P3F, Thiès, Sénégal</p>
          <div className="aspect-video max-w-2xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61294.99327515769!2d-16.9574102!3d14.7718145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec1bf8f495fe2ad%3A0x9a4f2361bb87478c!2sGuest%20house%20PRIMIS!5e0!3m2!1sfr!2sca!4v1715196978797!5m2!1sfr!2sca"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-lg shadow"
            />
          </div>
          <div className="text-center mt-2">
            <a
                href="https://www.google.com/maps/place/Guest+house+PRIMIS/@14.7718145,-16.9574102,17z/data=!3m1!4b1!4m6!3m5!1s0xec1bf8f495fe2ad:0x9a4f2361bb87478c!8m2!3d14.7718093!4d-16.9548353!16s%2Fg%2F11sx4thnyp?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-rose-600 hover:underline"
            >
              Voir sur Google Maps →
            </a>
          </div>
        </section>
      </section>
  );
}
