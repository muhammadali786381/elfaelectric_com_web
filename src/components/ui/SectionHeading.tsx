type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const titleColor = light ? "text-white" : "text-[#212121]";
  const subtitleColor = light ? "text-white/70" : "text-gray-500";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="font-roboto text-[13px] font-semibold uppercase tracking-[1.5px] text-[#61ce70]">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-montserrat text-[28px] font-extrabold leading-tight sm:text-[34px] lg:text-[40px] ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`font-roboto text-[15px] leading-relaxed sm:text-[17px] ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  );
}
