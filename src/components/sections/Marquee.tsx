const items = [
  "ZERO EMISSIONS",
  "LOWER COSTS",
  "INSTANT TORQUE",
  "QUIET OPERATION",
  "ADVANCED TECHNOLOGY",
  "LONGER RANGE",
  "CHARGING FLEXIBILITY",
  "ENVIRONMENTAL BENEFITS",
  "VARIETY OF MODELS",
];

export default function Marquee() {
  return (
    <section className="overflow-hidden bg-[#212121] py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${dup}-${item}`} className="flex items-center">
                <span className="font-montserrat whitespace-nowrap px-6 text-[15px] font-bold uppercase tracking-[2px] text-white sm:text-[18px]">
                  {item}
                </span>
                {i < items.length - 1 && <span className="h-2 w-2 shrink-0 rounded-full bg-[#61ce70]" />}
              </span>
            ))}
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#61ce70]" />
          </div>
        ))}
      </div>
    </section>
  );
}
