import type { Metadata } from "next";
import { Montserrat, Poppins, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELFA Electric – Best Selling Electric Bike in Pakistan",
  description:
    "ELFA Electric offers the best electric bikes and scooties in Pakistan. The EV-125 Bike and EV-1 Scooty feature advanced Lithium Iron Phosphate batteries, powerful motors, and long range.",
  keywords:
    "ELFA Electric, electric bike Pakistan, electric scooty, EV-125, EV-1, LiFePO4 battery, electric motorcycle Pakistan",
  metadataBase: new URL("https://elfaelectric.com"),
  openGraph: {
    title: "ELFA Electric – Best Selling Electric Bike in Pakistan",
    description:
      "Discover the best electric bikes and scooties in Pakistan. Advanced technology, powerful motors, and long range.",
    url: "https://elfaelectric.com",
    siteName: "ELFA Electric",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
