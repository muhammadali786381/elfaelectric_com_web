"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Muhammad Nawab",
    img: "/assets/images/customer-1-1.jpg",
    rating: 5,
    text: "ELFA EV bike teen maheene se use kar raha hoon, bohot achi performance hai aur petrol ka kharcha bilkul khatam ho gaya hai. Maintenance bhi na ke barabar hai.",
  },
  {
    name: "Zia",
    img: "/assets/images/customer-2-1.jpg",
    rating: 5,
    text: "ELFA EV-125 ka rider hoon aur bohot mutma'in hoon. Charging asaan hai aur range roz ki zaroorat ke liye kaafi hai. Sab ko recommend karta hoon.",
  },
  {
    name: "Ghulam Sabbir",
    img: "/assets/images/customer-3-1.jpg",
    rating: 5,
    text: "ELFA bike teen maheene se chala raha hoon, build quality bohot mazboot hai aur ride bohot smooth hai. Best decision tha electric par switch karna.",
  },
  {
    name: "Muhammad Hussain",
    img: "/assets/images/customer-4-1.jpg",
    rating: 5,
    text: "ELFA bike January 2025 mein khareedi thi ab 10 maheene ho gaye hain. Aaj tak koi complaint nahi aayi, baarish aur paani mein bhi perfect chalti hai. Main is se bohot mutma'in aur khush hoon, aur apne doston ko bhi recommend karta hoon. Meri dua hai ke poora Pakistan EV par shift ho taake hum sab green city ka hissa ban sakein!",
  },
  {
    name: "Adeel Ahmed",
    img: "/assets/images/customer-5-1.jpg",
    rating: 5,
    text: "ELFA chala raha hoon aur ye Karachi ki number one electric bike lagti hai mujhe. Power aur range dono acha hai.",
  },
  {
    name: "Alamgir",
    img: "/assets/images/customer-6.jpg",
    rating: 5,
    text: "EV Technology mere liye faidemand hai — fuel ka masla khatam, aur ride bhi comfortable hai. Family ke liye bhi safe hai.",
  },
  {
    name: "Danial Baig",
    img: "/assets/images/customer-7.jpg",
    rating: 5,
    text: "ELFA teen chaar maheenon se use kar raha hoon, koi dikkat nahi aayi. Digital meter aur design dono pasand aaye.",
  },
  {
    name: "Farzan Raza",
    img: "/assets/images/customer-8.jpg",
    rating: 5,
    text: "ELFA EV-125 6 maheenon se chala raha hoon. Pehle petrol wali 125 par roz ka 500-1000 rupay lagta tha, ab petrol ka kharcha zero hai. Maintenance bhi zero ke barabar hai na oil, na chain ka masla. Ride bohot comfort-able hai, main ELFA sab ko recommend karta hoon!",
  },
  {
    name: "Ghareebo Khan Baloch",
    img: "/assets/images/customer-9.jpg",
    rating: 5,
    text: "ELFA EV-125 use karte hue 9 maheene ho gaye hain. Har mahine paise bachte hain na petrol ka kharcha, bohot aramdeh aur support bhi zabardast raha hai, lekin ELFA ko sabse zyada dosto ko diya hai!",
  },
  {
    name: "Haji Zareen",
    img: "/assets/images/customer-10.jpg",
    rating: 5,
    text: "ELFA Scooty 7-8 maheene se use kar raha hoon. Do dafa ise Quetta bus ke zariye le gaya hoon mashallah bohot kaamyab aur aaraam deh ride hai. Ab tak koi badi dikkat nahi aayi, aur 70-80 km tak chal jaati hai, bohot faidemand hai. Yeh buzurg aur bari umar walon ke liye perfect ride hai hum bohot khush aur mutma'in hain!",
  },
  {
    name: "Muhammad Ilyas",
    img: "/assets/images/customer-11-1.jpg",
    rating: 5,
    text: "ELFA 125 teen maheene se use kar raha hoon. App tracking feature bohot useful hai, ghar se nikalne se pehle battery level check kar leta hoon. Smart innovation hai.",
  },
  {
    name: "Nazir Khatak",
    img: "/assets/images/customer-1aa.jpg",
    rating: 5,
    text: "ELFA 125 ek maheene se use kar raha hoon, ab tak performance se bohot khush hoon. Charging fast hai aur range bhi expectation se zyada mili.",
  },
  {
    name: "Umer Farooq",
    img: "/assets/images/customer-1a.jpg",
    rating: 5,
    text: "ELFA bike teen maheene se chala raha hoon. Excellent fuel savings — hisaab lagaya to PKR 10,000 per month bach rahe hain. Ye bike apna paisa khud wasool kar leti hai!",
  },
];

const COUNT = testimonials.length;
// Triple the list so we can jump between copies for seamless infinite loop
const LOOP = [...testimonials, ...testimonials, ...testimonials];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? "fill-[#ffc107] text-[#ffc107]" : "fill-transparent text-white/30"}`}
        />
      ))}
    </div>
  );
}

function Card({
  t,
  active,
}: {
  t: (typeof testimonials)[0];
  active: boolean;
}) {
  return (
    <article
      className="flex h-full w-full flex-row items-center gap-5 rounded-[20px] px-6 py-6 sm:gap-6 sm:px-10 sm:py-7 lg:gap-10 lg:px-12 lg:py-8"
      style={{
        backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)",
      }}
      aria-hidden={!active}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 sm:gap-4">
        <h3 className="font-montserrat text-[22px] font-bold leading-none text-white sm:text-[28px] lg:text-[30px]">
          {t.name}
        </h3>
        <StarRating rating={t.rating} />
        <p className="font-roboto text-[14px] leading-relaxed text-white sm:text-[16px] lg:text-[17px]">
          &ldquo;{t.text}&rdquo;
        </p>
      </div>

      {/* Smaller portrait — leaves more room for text / wider card feel */}
      <div className="relative hidden aspect-square w-[100px] shrink-0 overflow-hidden rounded-[10px] border-2 border-white sm:block sm:w-[140px] lg:w-[180px] xl:w-[200px]">
        <Image
          src={t.img}
          alt={t.name}
          fill
          className="object-cover object-top"
          sizes="(min-width: 1280px) 200px, (min-width: 1024px) 180px, 140px"
        />
      </div>
    </article>
  );
}

export default function Testimonials() {
  // Start in the middle copy so we can go either direction infinitely
  const [index, setIndex] = useState(COUNT);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;
    // Center the active slide in the viewport → half cards peek left & right
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    setOffset(viewport.clientWidth / 2 - slideCenter);
  }, [index]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Seamless infinite: when we drift into a clone zone, snap back to the middle copy
  useEffect(() => {
    if (index >= COUNT * 2) {
      const t = window.setTimeout(() => {
        setAnimate(false);
        setIndex((i) => i - COUNT);
      }, 700);
      return () => window.clearTimeout(t);
    }
    if (index < COUNT) {
      const t = window.setTimeout(() => {
        setAnimate(false);
        setIndex((i) => i + COUNT);
      }, 700);
      return () => window.clearTimeout(t);
    }
  }, [index]);

  // Re-enable transition after a silent snap
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
      return () => cancelAnimationFrame(id);
    }
  }, [animate, index]);

  const prev = () => {
    setAnimate(true);
    setIndex((i) => i - 1);
  };
  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-full min-w-[100px] max-w-container">
        <h2 className="font-montserrat mb-10 px-4 text-center text-[36px] font-bold text-[#212121] sm:text-[42px] lg:text-[50px]">
          Our Happy Customers
        </h2>

        {/*
          Card width = ~50% of container.
          Centered active slide → left & right neighbors are cut exactly in half.
        */}
        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className={`flex items-stretch gap-3 ${animate ? "transition-transform duration-700 ease-out" : ""}`}
            style={{ transform: `translateX(${offset}px)` }}
          >
            {LOOP.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                /* Wider cards (~70%) — still peeks half-ish neighbors on both sides */
                className="w-[calc(70%-8px)] shrink-0 sm:w-[calc(70%-100px)]"
              >
                <Card t={t} active={i === index} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#61ce70] text-white transition-colors hover:bg-[#4fbf5f]"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
