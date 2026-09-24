"use client";

const cities = [
  "Karachi",
  "Hyderabad",
  "Lahore",
  "Rawalpindi",
  "Peshawar",
  "Sahiwal",
  "Rahimyar Khan",
];

export default function CityMarquee() {
  return (
    <section className="overflow-hidden bg-[#050505] py-8 lg:py-12 border-b border-white/5">
      <div 
        className="mx-auto w-full max-w-[1400px]"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee">
          {/* Duplicate 4 times to ensure it covers wide screens smoothly */}
          {[0, 1, 2, 3].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center justify-around w-max px-4">
              {cities.map((city, i) => (
                <span key={`${dup}-${city}`} className="flex items-center px-6 lg:px-12">
                  <span className="font-montserrat text-[20px] font-bold uppercase tracking-[2px] text-text-inverse/40 sm:text-[24px] lg:text-[30px] transition-colors hover:text-text-inverse">
                    {city}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
