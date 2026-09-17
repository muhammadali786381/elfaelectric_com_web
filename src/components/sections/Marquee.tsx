// Live site marquee: bg #61ce70, pad 30px 0,
// Roboto 500 34px / 51px, uppercase, white, hyphen separators
const items = [
  "ENVIRONMENTAL BENEFITS",
  "VARIETY OF MODELS",
  "ZERO EMISSIONS",
  "LOWER COSTS",
  "INSTANT TORQUE",
  "QUIET OPERATION",
  "ADVANCED TECHNOLOGY",
  "LONGER RANGE",
  "CHARGING FLEXIBILITY",
];

export default function Marquee() {
  return (
    <section className="overflow-hidden bg-[#61ce70] py-[30px]">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${dup}-${item}`} className="flex items-center">
                <span className="font-roboto whitespace-nowrap px-3 text-[22px] font-medium uppercase leading-[1.5] text-white sm:text-[28px] lg:text-[34px]">
                  {item}
                </span>
                {i < items.length - 1 && (
                  <span className="font-roboto px-2 text-[22px] font-medium text-white sm:text-[28px] lg:text-[34px]" aria-hidden>
                    -
                  </span>
                )}
              </span>
            ))}
            <span className="font-roboto px-2 text-[22px] font-medium text-white sm:text-[28px] lg:text-[34px]" aria-hidden>
              -
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
