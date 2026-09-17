"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${star <= rating ? "fill-[#ffc107] text-[#ffc107]" : "fill-transparent text-white/30"}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <h2 className="font-montserrat mb-10 text-center text-[36px] font-bold text-[#212121] sm:text-[42px] lg:text-[50px]">
        Our Happy Customers
      </h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1.15}
        centeredSlides
        spaceBetween={20}
        loop
        speed={800}
        autoplay={{ delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: true }}
        breakpoints={{
          1024: { slidesPerView: 1.6, centeredSlides: false, spaceBetween: 20 },
        }}
        className="!px-4 sm:!px-6"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.name}>
            <div
              className="relative grid h-full grid-cols-[224px_1fr] overflow-hidden rounded-[16px]"
              style={{ backgroundImage: "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)" }}
            >
              <div className="relative hidden h-full min-h-[346px] w-[224px] shrink-0 sm:block">
                <Image src={t.img} alt={t.name} fill className="object-cover" sizes="224px" />
              </div>
              <div className="relative flex flex-col justify-center gap-3 p-6 sm:p-8 sm:pr-[180px]">
                <h3 className="font-montserrat text-[24px] font-bold text-white sm:text-[30px]">{t.name}</h3>
                <StarRating rating={t.rating} />
                <p className="font-roboto text-[15px] leading-relaxed text-white sm:text-[17px]">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="absolute right-8 top-1/2 hidden h-[150px] w-[150px] -translate-y-1/2 overflow-hidden rounded-[8px] border-2 border-white sm:block">
                <Image src={t.img} alt="" fill className="object-cover" sizes="140px" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
