import { notFound } from "next/navigation";
import LoaderPreview from "./preview";

export const metadata = { title: "ELFA · Loader preview", robots: { index: false, follow: false } };

export default function Page() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <LoaderPreview />;
}
