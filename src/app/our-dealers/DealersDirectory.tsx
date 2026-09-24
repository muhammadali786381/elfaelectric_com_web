"use client";

import { useMemo, useState } from "react";
import { Building2, Phone, Mail } from "lucide-react";

export type Dealer = {
  name: string;
  address: string;
  phones: string[];
  email?: string;
  mapQuery?: string;
};

export const CITIES = [
  "Karachi",
  "Hyderabad",
  "Lahore",
  "Rahim Yar Khan",
  "Rawalpindi",
] as const;

export type City = (typeof CITIES)[number];

export const dealersByCity: Record<City, Dealer[]> = {
  Karachi: [
    {
      name: "Smart Electric Wheels",
      address:
        "Shop No. U3, Al Fizza Glass Tower, Gulshan-e-Iqbal, Block 10A, Rashid Minhas Road, Karachi",
      phones: ["0315 8847869"],
      mapQuery: '24°54\'22.6"N 67°06\'41.6"E',
    },
    {
      name: "Hilal Motors",
      address:
        "Showroom No. 3, Hamza Homes, Main Khalid Bin Walid Road, Maniya Society, Maniya CHS (MCHS)",
      phones: ["0321-8959370"],
    },
    {
      name: "Laox Electronics",
      address:
        "Yousaf Plaza, Pakistan Ave, Block 16, Federal B Area, Block 16 Gulberg Town",
      phones: ["0312-3440196", "021-36811407"],
    },
    {
      name: "Mubashira Motors",
      address: "Shop No. 1, O-34, Korangi No. 3, Karachi",
      phones: ["0339-2399000"],
      mapQuery: '24°49\'31.6"N 67°08\'57.1"E',
    },
    {
      name: "Auto Power",
      address:
        "Shop No. 05 & 06, Ruby Arcade, A.M.20 Shahrah-e-Liaquat, Off Akbar Road, Saddar",
      phones: ["021-32717777", "0322-2578859"],
      email: "sales@autopower.com.pk",
    },
    {
      name: "Green Wheels",
      address:
        "Shop #A40, National Complex, B-2 Rashid Minhas Rd, Block 10-A Block 10 A Gulshan-e-Iqbal, Karachi",
      phones: ["0333-8224263"],
    },
    {
      name: "TK Dealership",
      address:
        "24 commercial street st, DHA Phase 2 Commercial Area Defence Housing Authority",
      phones: ["0331-3617793"],
    },
    {
      name: "Solarize",
      address: "Shop No. 1, C 43/6, Malir Tanki, Kalaboard, Malir",
      phones: ["0333-2236876"],
      email: "ssolarize@gmail.com",
    },
    {
      name: "Al Noor Traders",
      address:
        "Shop No.27, Al-Burhan Arcade, Block-E, North Nazimabad, Karachi, Pakistan",
      phones: ["0345-2234827", "0345-2234857"],
    },
    {
      name: "Bangash Green Energy",
      address:
        "B-30, Sunlay Arcade, Near Safoora Chowrangi, Kiran Hospital Road, Scheme 33, Sector 34, Karachi, Pakistan",
      phones: ["0330-2323264"],
    },
    {
      name: "Visdom EV",
      address:
        "Shop No. 6, Haroon Royal City Phase 1, Gulistan-e-Johar, Block 17, Karachi",
      phones: ["0331-0009579", "0301-2129910"],
    },
    {
      name: "GreenWood Power 3S Service Center",
      address:
        "Shop no.G-16 Rufi shopping mall, Gulistan e johar block 18 near johar chowrangi.",
      phones: ["0348-2037861"],
    },
    {
      name: "AGW Auto Solutions",
      address:
        "R-407, Incholi Cooperative Housing Society, Sector 24/A Scheme 33, Gulzar-e-Hijri, Karachi",
      phones: ["0318-2509267"],
    },
    {
      name: "BlueChip Technologies",
      address:
        "Showroom #. 29, Crown Garden, Block 4, Gulistan e Jauhar, Mosamiat, Main University Road, Karachi.",
      phones: ["0370-1335134"],
    },
    {
      name: "Flagship Store Karachi",
      address:
        "Plot 1-A, Shahra-e-Faisal, PECHS Extension Block 6 P.E.C.H.S., Karachi, 74400",
      phones: ["02137173532"],
    },
  ],
  Hyderabad: [
    {
      name: "ELFA Flagship Store",
      address:
        "G-14, Signature Tower and Mall opposite Diplai Memon Society beside Hyderabad Bakery Jamshoro Road Hyderabad.",
      phones: ["0311-4863532"],
    },
    {
      name: "Future Bike EV",
      address:
        "Shop No. 27, New Saddar, Phase 2, Bond Street, Qasimabad, Hyderabad, Sindh, Pakistan",
      phones: ["0300-3010432"],
    },
    {
      name: "Hyderabad EV's",
      address: "101, Doctors Lane, Bohra Bazar, Saddar, Hyderabad, Sindh, Pakistan",
      phones: ["0333-2601652", "0333-0323669"],
    },
  ],
  Lahore: [
    {
      name: "ROZ Shopping Center",
      address: "3/15 B Opp. Al Fatah Electronics, Shalamar Link Road , Lahore",
      phones: ["03250769769"],
    },
  ],
  "Rahim Yar Khan": [
    {
      name: "New Madina Auto Centre",
      address:
        "New Madina Auto Centre, Near Ali Motor, Shahbazpur Road, Shalimar Town, Rahim Yar Khan",
      phones: ["0300-6743738"],
    },
  ],
  Rawalpindi: [
    {
      name: "The EV Store",
      address:
        "N-119, North Circular Road, Near Islamiya School No. 2, Waris Khan, Rawalpindi.",
      phones: ["0343-5629919", "0333-5559645"],
    },
  ],
};

// const CITY_INTROS: Record<City, string> = {
//   Karachi:
//     "Karachi is home to multiple ELFA Electric Motorcycle dealers. Visit any of these electric bike showrooms for expert service:",
//   Hyderabad:
//     "Find authorized ELFA Electric Motorcycle dealers in Hyderabad for sales, test rides, and support.",
//   Lahore:
//     "Visit our authorized ELFA Electric Motorcycle dealer in Lahore for the complete EV experience.",
//   "Rahim Yar Khan":
//     "Find your nearest ELFA Electric Motorcycle dealer in Rahim Yar Khan.",
//   Rawalpindi:
//     "Visit our authorized ELFA Electric Motorcycle dealer in Rawalpindi.",
// };

const SPARK =
  "linear-gradient(135deg, #00C853 -110%, #000000 50%, #00C853 190%)";

function mapEmbedSrc(dealer: Dealer) {
  const q = dealer.mapQuery || dealer.address;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=m&z=15&output=embed&iwloc=near`;
}

function DealerCard({ dealer }: { dealer: Dealer }) {
  return (
    <article
      className="flex flex-col gap-4 rounded-[16px] border border-brand-primary p-4 shadow-[0_0_40px_-20px_rgba(0,0,0,0.5)] sm:gap-5 sm:rounded-[20px] sm:p-5 lg:flex-row lg:items-stretch lg:gap-6"
      style={{ backgroundImage: SPARK }}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="font-montserrat mb-4 text-[20px] font-bold leading-tight text-text-inverse sm:text-[26px] lg:text-[30px] lg:leading-[1.2]">
          {dealer.name}
        </h3>

        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-text-inverse">
            <Building2 className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="font-montserrat mb-1 text-[16px] font-semibold text-text-inverse sm:text-[18px]">
              Address
            </p>
            <p className="font-roboto text-[14px] leading-relaxed text-text-inverse/90 sm:text-[15px]">
              {dealer.address}
            </p>
          </div>
        </div>

        <div className="mb-3 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-text-inverse">
            <Phone className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="font-montserrat mb-1 text-[16px] font-semibold text-text-inverse sm:text-[18px]">
              Call Us
            </p>
            <div className="flex flex-col gap-0.5">
              {dealer.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[\s-]/g, "")}`}
                  className="font-roboto text-[14px] text-text-inverse/90 transition-colors hover:text-brand-primary sm:text-[15px]"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>

        {dealer.email && (
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary text-text-inverse">
              <Mail className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <p className="font-montserrat mb-1 text-[16px] font-semibold text-text-inverse sm:text-[18px]">
                Mail Now
              </p>
              <a
                href={`mailto:${dealer.email}`}
                className="font-roboto text-[14px] text-text-inverse/90 transition-colors hover:text-brand-primary sm:text-[15px]"
              >
                {dealer.email}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-[12px] sm:h-[220px] lg:h-auto lg:min-h-[220px] lg:w-[min(420px,45%)]">
        <iframe
          title={`Map — ${dealer.name}`}
          src={mapEmbedSrc(dealer)}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </article>
  );
}

export default function DealersDirectory() {
  const [city, setCity] = useState<City | "all">("all");

  const sections = useMemo(() => {
    if (city === "all") {
      return CITIES.map((c) => ({ city: c, dealers: dealersByCity[c] }));
    }
    return [{ city, dealers: dealersByCity[city] }];
  }, [city]);

  return (
    <section className="bg-bg-primary pb-14 pt-4 lg:pb-20">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6">
        <div className="mb-10 flex w-full flex-col gap-3">
          <label
            htmlFor="dealer-city-filter"
            className="font-roboto text-[15px] font-medium text-text-primary sm:text-[16px]"
          >
            Filter by City:
          </label>
          <select
            id="dealer-city-filter"
            value={city}
            onChange={(e) => setCity(e.target.value as City | "all")}
            className="font-roboto h-11 w-full rounded-[6px] border border-brand-primary bg-bg-primary px-3 text-[15px] text-text-primary outline-none focus:ring-1 focus:ring-brand-primary"
          >
            <option value="all">All Cities</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {sections.map(({ city: c, dealers }) => (
          <div key={c} className="mb-14 last:mb-0">
            <h2 className="font-montserrat mb-3 text-start text-[22px] font-bold leading-snug text-text-primary sm:text-[34px] lg:text-[40px] lg:leading-[1.2]">
              Find ELFA Electric Motorcycles Dealers in {c}
            </h2>
            {/* <p className="font-roboto mb-6 text-start text-[14px] leading-relaxed text-text-secondary sm:mb-8 sm:text-[16px]">
              {CITY_INTROS[c]}
            </p> */}
            <div className="flex flex-col gap-5">
              {dealers.map((d) => (
                <DealerCard key={d.name} dealer={d} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
