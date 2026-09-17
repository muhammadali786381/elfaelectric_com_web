import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "ev125",
    name: "EV-125 BIKE",
    image: "/assets/images/bike-red.png",
    specs: [
      { icon: "/assets/images/battery.webp", label: "BATTERY", value: "72V / 30Ah" },
      { icon: "/assets/images/motor-power.webp", label: "Motor power", value: "2,000 Watt" },
      { icon: "/assets/images/range.webp", label: "Range", value: "100+ km" },
    ],
    topSpeed: "Up to 75 Km/h",
    price: "PKR 345,000",
    priceActual: "PKR 335,000 + tax",
    savings: "Save PKR 10,000",
    href: "#",
  },
  {
    id: "ev1",
    name: "EV-1 Scooty",
    image: "/assets/images/scooty-silver.png",
    specs: [
      { icon: "/assets/images/battery.webp", label: "BATTERY", value: "64V / 30Ah" },
      { icon: "/assets/images/motor-power.webp", label: "Motor power", value: "1,500 Watt" },
      { icon: "/assets/images/range.webp", label: "Range", value: "75 Km" },
    ],
    topSpeed: "Up to 60 Km/h",
    price: "PKR 270,000",
    priceActual: "PKR 260,000 + tax",
    savings: "Save PKR 10,000",
    href: "#",
  },
];

export default function ProductShowcase() {
  return (
    <section id="products" className="bg-white py-20 lg:py-28">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <span className="inline-block text-red-600 text-sm font-bold uppercase tracking-widest mb-3">
          Our Products
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
          Select Your Favorite Ride
        </h2>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Advanced Lithium Iron Phosphate batteries. Powerful motors. Designed for
          Pakistan&apos;s roads.
        </p>
      </div>

      {/* Product cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {products.map((product) => (
          <article
            key={product.id}
            className="group bg-gray-950 rounded-3xl overflow-hidden shadow-2xl hover:shadow-red-900/30 transition-all duration-500 hover:-translate-y-1"
          >
            {/* Product image */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 p-8 flex items-center justify-center min-h-[280px]">
              <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={350}
                className="relative z-10 w-full max-w-sm h-64 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              <h3 className="text-2xl font-black text-white uppercase mb-5">
                {product.name}
              </h3>

              {/* Top speed highlight */}
              <div className="bg-red-600/10 border border-red-600/20 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="text-red-400 font-black text-lg leading-none">{product.topSpeed}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mt-0.5">Top Speed</p>
                </div>
              </div>

              {/* Specs row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-white/5 rounded-xl p-3 text-center border border-white/5"
                  >
                    <div className="flex justify-center mb-2">
                      <Image
                        src={spec.icon}
                        alt={spec.label}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain brightness-0 invert opacity-70"
                      />
                    </div>
                    <p className="text-white font-bold text-sm leading-tight">{spec.value}</p>
                    <p className="text-gray-500 text-xs uppercase tracking-wide mt-0.5">{spec.label}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="border-t border-white/10 pt-5 mb-5">
                <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Starting at</p>
                <p className="text-white font-black text-2xl">{product.price}</p>
                <p className="text-gray-400 text-sm mt-0.5">{product.priceActual}</p>
              </div>

              {/* CTA */}
              <Link
                href={product.href}
                className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-full transition-all hover:shadow-lg hover:shadow-red-600/40 uppercase tracking-wide text-sm"
              >
                {product.savings} — Buy Now
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* LiFePO4 banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Advanced Lithium Iron Phosphate Batteries
            </h2>
            <p className="text-gray-400 max-w-xl">
              Our LiFePO4 batteries offer superior safety, longer cycle life, and
              stable performance — even in extreme Pakistani weather conditions.
            </p>
          </div>
          <div className="shrink-0">
            <Image
              src="/assets/images/battery.webp"
              alt="LiFePO4 Battery"
              width={160}
              height={160}
              className="w-32 h-32 object-contain brightness-0 invert opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
