import Image from "next/image";

const testimonials = [
  { name: "Muhammad Nawab", img: "/assets/images/customer-1-1.jpg", rating: 5, text: "Best electric bike in Pakistan. Battery life is excellent and the bike is very smooth to ride. Highly recommended!" },
  { name: "Zia", img: "/assets/images/customer-2-1.jpg", rating: 5, text: "I've been using ELFA for 6 months now. Saving a lot on fuel costs. The service team is very responsive." },
  { name: "Ghulam Sabbir", img: "/assets/images/customer-3-1.jpg", rating: 5, text: "Amazing quality and build. The range is as advertised — I easily cover 90+ km on a single charge daily." },
  { name: "Muhammad Hussain", img: "/assets/images/customer-4-1.jpg", rating: 5, text: "Very impressed with the top speed and power. The disc brakes provide excellent stopping power. Worth every rupee." },
  { name: "Adeel Ahmed", img: "/assets/images/customer-5-1.jpg", rating: 5, text: "Switched from petrol 8 months ago. Saving over PKR 8,000/month. ELFA has changed my commute completely." },
  { name: "Alamgir", img: "/assets/images/customer-6.jpg", rating: 5, text: "Great customer support and after-sales service. The team helped me with setup and any questions I had." },
  { name: "Danial Baig", img: "/assets/images/customer-7.jpg", rating: 5, text: "The digital LED meter is impressive — shows everything clearly. Stylish design that turns heads on the road." },
  { name: "Farzan Raza", img: "/assets/images/customer-8.jpg", rating: 5, text: "Water-resistant battery is a big plus for monsoon season. Rode through heavy rain with zero issues." },
  { name: "Ghareebo Khan Baloch", img: "/assets/images/customer-9.jpg", rating: 4, text: "Really good electric bike for the price. Performance is strong and the LiFePO4 battery is very safe." },
  { name: "Haji Zareen", img: "/assets/images/customer-10.jpg", rating: 5, text: "My second ELFA purchase. Bought one for my son too. Family-approved! Great company with great products." },
  { name: "Muhammad Ilyas", img: "/assets/images/customer-11-1.jpg", rating: 5, text: "The app tracking feature is very useful. I can monitor battery level before leaving home. Smart innovation." },
  { name: "Umer Farooq", img: "/assets/images/customer-1a.jpg", rating: 5, text: "Excellent fuel savings. I calculated and I save about PKR 10,000 per month. This bike paid for itself!" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  // Split into 3 columns for a masonry-style layout
  const cols = [
    testimonials.filter((_, i) => i % 3 === 0),
    testimonials.filter((_, i) => i % 3 === 1),
    testimonials.filter((_, i) => i % 3 === 2),
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-red-600 text-sm font-bold uppercase tracking-widest mb-3">
            Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Our Happy Customers
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Join thousands of satisfied ELFA riders across Pakistan.
          </p>
          {/* Average rating */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <StarRating rating={5} />
            <span className="font-bold text-gray-700">4.9 / 5</span>
            <span className="text-gray-400 text-sm">({testimonials.length}+ reviews)</span>
          </div>
        </div>

        {/* Masonry columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cols.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Customer photos strip */}
        <div className="mt-14 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-6">
            Customer Photo Gallery
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "/assets/images/customer-1aa.jpg",
              "/assets/images/customer-2a.jpg",
              "/assets/images/customer-1a.jpg",
              "/assets/images/customer-5-1.jpg",
              "/assets/images/customer-3-1.jpg",
              "/assets/images/customer-7.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-gray-100 hover:ring-red-400 transition-all"
              >
                <Image
                  src={src}
                  alt={`Customer ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            ))}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              +More
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
