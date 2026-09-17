import Image from "next/image";

export default function Welcome() {
  return (
    <section className="relative flex h-[280px] w-full items-center justify-center overflow-hidden sm:h-[340px]">
      <Image
        src="/assets/images/removed-ppr.webp"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative z-10 px-4 text-center">
        <h2 className="font-poppins text-[32px] font-extrabold italic text-white sm:text-[44px]">Welcome</h2>
        <p className="font-roboto mt-3 text-[16px] font-medium text-[#fcfcfc] sm:text-[20px]">
          Explore, Experience, And Connect With Us
        </p>
      </div>
    </section>
  );
}
