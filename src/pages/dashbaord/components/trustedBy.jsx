// Trustee logos from public/images/trustee_logos
const trustees = [
  {
    src: "/images/trustee_logos/16e5b94cc9a33a1f1ccb3291935f5cf959fde7af.jpg",
    alt: "East Midland Railway",
    name: "EAST MIDLAND\nRAILWAY",
  },
  {
    src: "/images/trustee_logos/394875a02cb49f397630c402edac63c0eee184e4.png",
    alt: "Central Bank of Nigeria",
    name: "CENTRAL BANK\nOF NIGERIA",
  },
  {
    src: "/images/trustee_logos/7b8b4b9d4016efca5b56052770812f821e802e78.jpg",
    alt: "Rudby Hall Luxury Hotel, UK",
    name: "RUDBY HALL LUXURY\nHOTEL, UK",
  },
  {
    src: "/images/trustee_logos/c10c9a7bb3599ac78f2ee020057ca8ce13f998b2.jpg",
    alt: "Nigerian in the Diaspora Commission",
    name: "NIGERIAN IN THE\nDIASPORA COMMISSION",
  },
];

export function TrustedBySection() {
  return (
    <section className="w-full border-b border-gray-100 bg-white py-8">
      <div className="mx-auto max-w-[80%] px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
          {/* Left label */}
          <div className="flex-shrink-0 md:w-[140px] lg:w-[180px] xl:w-[240px]">
            <p className="text-sm font-bold text-[#1a2340] md:text-sm lg:text-base">
              Trusted by
              <br />
              <span className="text-xs font-normal text-[#64748b] md:text-[10px] lg:text-xs xl:text-sm">
                Government &amp; Enterprise
                <br />
                Organisations
              </span>
            </p>
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden h-12 w-px flex-shrink-0 bg-gray-200 md:block md:h-8 lg:h-12" />

          {/* Logo list */}
          <div className="flex flex-1 flex-wrap items-center gap-y-6 md:flex-nowrap md:justify-between md:gap-x-1 lg:gap-x-4">
            {trustees.map((t, index) => (
              <div key={t.alt} className="flex min-w-0 items-center">
                {/* Divider before each item except the first (desktop only) */}
                {index > 0 && (
                  <div className="mr-6 hidden h-10 w-px flex-shrink-0 bg-gray-200 md:mr-1 md:block md:h-6 lg:mr-4 lg:h-10 xl:mr-6" />
                )}

                <div className="flex min-w-0 items-center gap-3 pr-6 md:gap-1.5 md:pr-0 lg:gap-2 lg:pr-2 xl:gap-3 xl:pr-6">
                  <img
                    src={t.src}
                    alt={t.alt}
                    className="h-10 w-auto flex-shrink-0 object-contain mix-blend-multiply sm:w-12 md:h-6 md:w-8 lg:h-8 lg:w-10 xl:h-10 xl:w-12"
                    loading="lazy"
                  />
                  <span className="min-w-0 whitespace-pre-line text-[10px] font-bold uppercase leading-tight tracking-wide text-black md:text-[7px] lg:text-[9px] xl:text-[11px]">
                    {t.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
