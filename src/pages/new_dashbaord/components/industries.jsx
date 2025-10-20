export function IndustriesSection() {
    const industries = {
      left: [
        {
          title: "Business Transformation & Advisory",
          description:
            "Guides institutions through change, improving performance and positioning for sustainable growth.",
        },
        {
          title: "Turnaround, Stability & Restructuring Transaction",
          description:
            "Provides strategies to stabilise operations, restore profitability, and restructure for long-term success.",
        },
        {
          title: "Valuation & Financial Advisory Services",
          description:
            "Delivers accurate valuations and expert financial guidance to support informed business decisions.",
        },
        {
          title: "Dispute Advisory",
          description:
            "Offers objective analysis and strategic insight to resolve complex business and financial disputes.",
        },
        {
          title: "Tax Services",
          description: "Ensure compliance and optimises tax strategies to maximise savings and reduce risks.",
        },
      ],
      right: [
        {
          title: "Healthcare",
          description:
            "Supports providers and organisations with tailored solutions to improve care delivery and efficiency.",
        },
        {
          title: "Financial Services",
          description:
            "Delivers innovative strategies to enhance operations, compliance, and customer experience in financial markets.",
        },
        {
          title: "Technology",
          description:
            "Helps businesses leverage emerging technologies to innovate, scale, and maintain competitive advantage.",
        },
        {
          title: "Automotive",
          description:
            "Assists automotive companies in optimising operations, embracing innovation, and navigating market shifts.",
        },
        {
          title: "Oil & Gas",
          description:
            "Provides expert guidance to improve efficiency, manage risks, and achieve growth in a dynamic energy sector.",
        },
      ],
    }
  
    return (
      <section className="py-16 px-4 md:py-24 bg-white">
        <div className="sm:w-[85%] w-[95%] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Industries we serve</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto">
              Our expertise spans multiple industries, enabling us to address unique challenges and create value where it
              matters most.
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-8 md:gap-y-12">
            <div className="space-y-8 md:space-y-12">
              {industries.left.map((industry, index) => (
                <div key={index} className="pb-8 border-b border-gray-200">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{industry.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{industry.description}</p>
                </div>
              ))}
            </div>
  
            <div className="space-y-8 md:space-y-12">
              {industries.right.map((industry, index) => (
                <div key={index} className="pb-8 border-b border-gray-200">
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{industry.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  