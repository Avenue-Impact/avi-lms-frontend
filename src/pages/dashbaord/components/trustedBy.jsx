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
          <div className="flex-shrink-0 md:w-[240px]">
            <p className="text-sm font-bold text-[#1a2340] md:text-base">
              Trusted by
              <br />
              <span className="text-xs font-normal text-[#64748b] md:text-sm">
                Government &amp; Enterprise
                <br />
                Organisations
              </span>
            </p>
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden h-12 w-px flex-shrink-0 bg-gray-200 md:block" />

          {/* Logo list */}
          <div className="flex flex-1 flex-wrap items-center gap-y-6 md:justify-between">
            {trustees.map((t, index) => (
              <div key={t.alt} className="flex items-center">
                {/* Divider before each item except the first (desktop only) */}
                {index > 0 && (
                  <div className="mr-6 hidden h-10 w-px bg-gray-200 md:block lg:mr-8" />
                )}

                <div className="flex items-center gap-3 pr-6 md:pr-0 lg:pr-8">
                  <img
                    src={t.src}
                    alt={t.alt}
                    className="h-10 w-auto flex-shrink-0 object-contain sm:w-12 mix-blend-multiply"
                    loading="lazy"
                  />
                  <span className="whitespace-pre-line text-[10px] font-bold uppercase leading-tight tracking-wide text-black md:text-[11px]">
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
