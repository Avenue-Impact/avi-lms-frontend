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
      <div className="mx-auto max-w-[90%] px-6 md:px-12 lg:px-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          {/* Left label */}
          <div className="flex-shrink-0 md:w-[160px]">
            <p className="text-xs font-semibold leading-relaxed text-gray-500">
              Trusted by
              <br />
              <span className="text-gray-700">
                Government &amp; Enterprise
                <br />
                Organisations
              </span>
            </p>
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden h-14 w-px flex-shrink-0 bg-gray-200 md:block" />

          {/* Logo cards */}
          <div className="flex flex-1 flex-wrap items-center gap-4 md:gap-6">
            {trustees.map((t) => (
              <div
                key={t.alt}
                className="flex min-w-[170px] items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-shadow duration-200 hover:shadow-sm"
              >
                <img
                  src={t.src}
                  alt={t.alt}
                  className="h-auto w-12 flex-shrink-0 whitespace-nowrap object-contain"
                  loading="lazy"
                />
                <span className="whitespace-pre-line text-[10px] font-bold uppercase leading-tight tracking-wide text-gray-700">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
