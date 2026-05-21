import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    text: "Avenue Impact Limited transformed our business, making us more experienced in PowerBI, Power Automate and Power Apps.\n\nThe expert has helped improve our HR Processes which are now automated.",
    logo: "/images/trustee_logos/16e5b94cc9a33a1f1ccb3291935f5cf959fde7af.jpg",
    company: "EAST MIDLAND\nRAILWAY",
    stars: 5,
  },
  {
    id: 2,
    text: "Avenue Impact's training has helped us understand customer service, communication skills, emotional intelligence, digital skills, and team building.\n\nI can't thank Avenue Impact enough for the knowledge and tools they provided. Their expert trainers equipped our team with invaluable skills and we saw immediate improvement in our project delivery.",
    logo: "/images/trustee_logos/394875a02cb49f397630c402edac63c0eee184e4.png",
    company: "CENTRAL BANK\nOF NIGERIA",
    stars: 5,
  },
  {
    id: 3,
    text: "We partnered with Avenue Impact to develop a customised web and mobile application for our luxury hotel in Yorkshire.\n\nThe web and mobile application were professionally made, our booking application has now been completed, and all platforms are user friendly. Our customers are pleased with our services.",
    logo: "/images/trustee_logos/7b8b4b9d4016efca5b56052770812f821e802e78.jpg",
    company: "RUDBY HALL LUXURY\nHOTEL, UK",
    stars: 5,
  },
];

export function TestimonialsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1a1a2e] md:text-4xl lg:text-[42px]">
            Our clients success stories
          </h2>
          <p className="text-sm text-gray-500 md:text-base">
            Real results, real impact — see how we help businesses thrive.
          </p>
        </div>

        {/* Cards Carousel */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex w-full flex-shrink-0 snap-center flex-col justify-between rounded-xl border border-gray-200 bg-[#fafafa] p-8 shadow-sm sm:w-[380px] md:w-[400px]"
            >
              {/* Text Content */}
              <p className="mb-8 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {t.text}
              </p>

              {/* Bottom Footer */}
              <div className="mt-auto flex items-center gap-4 border-t border-gray-200/50 pt-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white shadow-sm">
                  <img
                    src={t.logo}
                    alt={t.company}
                    className="h-14 w-14 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="whitespace-pre-line text-[11px] font-bold uppercase leading-tight tracking-wide text-[#1a1a2e]">
                    {t.company}
                  </h4>
                  <div className="mt-1 flex items-center gap-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-[#FFD700] text-[#FFD700]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label="Previous testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[#1a1a2e] transition-colors hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Next testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#2a2a4e]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
