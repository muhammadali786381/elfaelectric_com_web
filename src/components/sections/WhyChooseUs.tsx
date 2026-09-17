import Image from "next/image";
import Link from "next/link";

const whyChooseUs = [
  {
    icon: "🔋",
    title: "LiFePO4 Battery",
    desc: "Safest battery chemistry — no thermal runaway, 2000+ cycles, stable in extreme heat.",
  },
  {
    icon: "⚡",
    title: "High Performance",
    desc: "Powerful BLDC motors with 2,000W output for effortless acceleration on any terrain.",
  },
  {
    icon: "🌿",
    title: "Zero Emissions",
    desc: "100% electric — no fuel, no exhaust. Ride clean and contribute to a greener Pakistan.",
  },
  {
    icon: "💰",
    title: "Massive Savings",
    desc: "Save up to PKR 10,000+ per month on fuel. ELFA pays for itself within months.",
  },
  {
    icon: "🔧",
    title: "Service Network",
    desc: "Dedicated service centers and technicians across Pakistan, with genuine spare parts.",
  },
  {
    icon: "📱",
    title: "Smart App",
    desc: "Track your ride, monitor battery, and stay connected with the ELFA companion app.",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-red-500 text-sm font-bold uppercase tracking-widest mb-3">
              The ELFA Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              What sets us apart from every other electric vehicle brand in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="group bg-white/5 hover:bg-red-600/10 border border-white/5 hover:border-red-600/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Test Ride / Meet Us / CTA */}
      <section id="test-ride" className="py-20 lg:py-28 bg-red-600 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-500/50 translate-x-32 -translate-y-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-red-700/50 -translate-x-24 translate-y-24 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: CTA */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Boost-up Your Adventure with Electric Motorcycle
              </h2>
              <p className="text-red-100 mb-8 leading-relaxed">
                Experience the future of mobility. Book a test ride today and feel the
                difference of ELFA&apos;s premium electric performance firsthand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#contact"
                  className="bg-white text-red-600 font-black px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-xl uppercase tracking-wide text-sm"
                >
                  Book A Test Ride
                </Link>
                <Link
                  href="#products"
                  className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all uppercase tracking-wide text-sm"
                >
                  Discover Your Ride
                </Link>
              </div>
            </div>

            {/* Right: Image + Meet Us card */}
            <div className="flex flex-col gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/removed-ppr.webp"
                  alt="Explore ELFA Electric"
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div>
                    <p className="text-white font-black text-xl">Explore, Experience,</p>
                    <p className="text-red-300 font-bold">And Connect With Us</p>
                  </div>
                </div>
              </div>

              {/* Meet Us card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <span>📍</span> Meet Us
                </h3>
                <p className="text-red-100 text-sm mb-4">
                  Visit our showrooms across Pakistan to see and ride ELFA Electric vehicles in person.
                </p>
                <a
                  href="https://wa.me/923111000333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-full transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
