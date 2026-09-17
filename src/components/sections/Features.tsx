import Image from "next/image";

const features = [
  {
    icon: "/assets/images/battery.webp",
    title: "Lithium Iron Phosphate Battery",
    desc: "LiFePO4 technology offers superior safety, 2000+ charge cycles, and stable performance in Pakistan's extreme heat.",
    highlight: "2000+ Cycles",
  },
  {
    icon: "/assets/images/motor-power.webp",
    title: "Efficient Motor Power",
    desc: "High-torque BLDC motors deliver smooth, powerful acceleration with zero maintenance and minimal energy loss.",
    highlight: "Up to 2,000W",
  },
  {
    icon: "/assets/images/range.webp",
    title: "App Tracking",
    desc: "Monitor your ride in real-time — battery level, speed, location, and trip history right from your smartphone.",
    highlight: "Smart Connect",
  },
  {
    icon: "/assets/images/solutions.webp",
    title: "Advance Features",
    desc: "Digital LED meter, disc brakes, superior performance tyres, and water-resistant battery — built to last.",
    highlight: "Premium Build",
  },
];

const rideFeatures = [
  {
    title: "Digital LED Meter",
    desc: "Full-color digital dashboard showing speed, battery, odometer, and trip data in real-time.",
    image: "/assets/images/ne-a.webp",
  },
  {
    title: "Disc Brake",
    desc: "Front and rear hydraulic disc brakes for precise, powerful stopping in all conditions.",
    image: "/assets/images/sut.webp",
  },
  {
    title: "Superior Performance Tyres",
    desc: "Wide-profile tubeless tyres designed for Pakistan's roads — smooth highways and rough terrains.",
    image: "/assets/images/ne-a.webp",
  },
  {
    title: "Water Resistant Battery",
    desc: "IP-rated battery casing protects against rain and splashes — ride confidently through monsoon.",
    image: "/assets/images/battery.webp",
  },
];

export default function Features() {
  return (
    <>
      {/* Solutions Section */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-red-600/5 rounded-3xl blur-2xl" />
                <Image
                  src="/assets/images/solutions.webp"
                  alt="Solutions that we offer"
                  width={500}
                  height={680}
                  className="relative z-10 rounded-2xl shadow-2xl w-full max-w-sm object-cover"
                />
              </div>
            </div>

            {/* Features list */}
            <div>
              <span className="inline-block text-red-600 text-sm font-bold uppercase tracking-widest mb-3">
                Why ELFA
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 leading-tight">
                Solutions that we offer
              </h2>
              <p className="text-gray-500 mb-10">
                Everything you need for a smarter, more efficient commute.
              </p>

              <div className="space-y-6">
                {features.map((f) => (
                  <div key={f.title} className="flex gap-4 group">
                    <div className="shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <Image
                        src={f.icon}
                        alt={f.title}
                        width={28}
                        height={28}
                        className="w-7 h-7 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{f.title}</h3>
                        <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">
                          {f.highlight}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ride Features Section */}
      <section className="py-20 lg:py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-red-500 text-sm font-bold uppercase tracking-widest mb-3">
              Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Features to Make Your Ride
              <br />
              Smoother and Comfortable
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rideFeatures.map((f) => (
              <div
                key={f.title}
                className="group bg-white/5 hover:bg-red-600/10 border border-white/5 hover:border-red-600/30 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 bg-white/10 group-hover:bg-red-600/20 rounded-2xl flex items-center justify-center transition-colors">
                    <Image
                      src={f.image}
                      alt={f.title}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain brightness-0 invert opacity-80"
                    />
                  </div>
                </div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Constructing Sustainable Future */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-red-600 text-sm font-bold uppercase tracking-widest mb-3">
                Our Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
                Constructing The Sustainable Future,
                <span className="text-red-600"> Electrifying Innovation!</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                ELFA Electric is on a mission to accelerate Pakistan&apos;s transition to clean,
                electric mobility. Our bikes and scooties combine cutting-edge battery technology
                with Pakistani engineering to deliver reliable, affordable, and eco-friendly transportation.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every ELFA vehicle is backed by a dedicated service network, genuine spare parts,
                and a team that cares about your riding experience.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10,000+", label: "Happy Customers" },
                  { value: "100+ km", label: "Range per Charge" },
                  { value: "2,000+", label: "Battery Cycles" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-red-50 rounded-xl">
                    <p className="text-2xl font-black text-red-600">{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-red-600/5 rounded-3xl blur-2xl" />
                <Image
                  src="/assets/images/feedback.webp"
                  alt="About ELFA Electric"
                  width={600}
                  height={530}
                  className="relative z-10 w-full rounded-2xl shadow-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
