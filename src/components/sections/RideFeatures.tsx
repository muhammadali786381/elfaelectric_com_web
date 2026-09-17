const features = [
  {
    title: "Digital LED Meter",
    desc: "Engaging LED display showing speed modes, battery alerts, and kilometers covered.",
  },
  {
    title: "Disc Brake",
    desc: "Reliable brakes that ensure smooth stopping, with enhanced stability for a safe ride every time.",
  },
  {
    title: "Superior Performance Tyres",
    desc: "Tyres that guarantee stability, smooth handling, and optimal ground clearance.",
  },
  {
    title: "Water Resistant Battery",
    desc: "Protects the battery from water and allowing you to ride confidently in the rain.",
  },
];

export default function RideFeatures() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <h2 className="font-montserrat mb-10 text-center text-[32px] font-bold leading-tight text-[#212121] sm:text-[40px] lg:text-[50px]">
        Features to Make Your Ride
        <br />
        Smoother and Comfortable
      </h2>

      <div className="mx-auto grid w-full max-w-[1150px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex h-[330px] flex-col justify-end rounded-[19px] border-[3px] border-[#61ce70] bg-black p-6"
          >
            <h3 className="font-montserrat mb-2 text-center text-[18px] font-bold text-white">{f.title}</h3>
            <p className="font-roboto text-center text-[14px] leading-relaxed text-white/75">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
