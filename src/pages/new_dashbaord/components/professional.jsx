import { Users, Plug, UserCheck, Shield, BarChart3, TrendingUp, Layout, Lightbulb, Laptop, Cloud } from "lucide-react"

const disciplines = [
  {
    icon: Users,
    title: "Agile and Digital Business Analysis",
    description:
      "Helps organisations adapt quickly by analysing needs, streamlining processes, and delivering value through agile methods.",
  },
  {
    icon: Plug,
    title: "Digital Transformation Solution",
    description: "Modernises processes and technology to enhance efficiency, customer experience, and innovation.",
  },
  {
    icon: UserCheck,
    title: "Product Management",
    description: "Guides products from idea to launch, aligning features with market needs and business goals.",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    description: "Protects your digital assets with advanced security measures to prevent and respond to threats.",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transforms raw data into actionable insights for smarter decisions and growth opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Data Management",
    description: "Organises, stores, and secures data effectively for seamless access and compliance.",
  },
  {
    icon: Layout,
    title: "Power BI",
    description: "Visualises complex data through interactive dashboards, empowering teams with real-time insights.",
  },
  {
    icon: TrendingUp,
    title: "Data Strategy",
    description: "Defines a roadmap for leveraging data to drive innovation, efficiency, and competitive advantage.",
  },
  {
    icon: Lightbulb,
    title: "Business Intelligence",
    description: "Provides tools and strategies to understand trends, optimise operations, and inform strategy.",
  },
  {
    icon: Lightbulb,
    title: "Artificial Intelligence",
    description: "Applies intelligent algorithms to automate tasks, predict outcomes, and unlock new opportunities.",
  },
  {
    icon: Laptop,
    title: "Software Development",
    description: "Designs and builds reliable, user-focused applications to meet your unique business needs.",
  },
  {
    icon: Cloud,
    title: "Cloud Computing",
    description: "Delivers scalable, flexible computing resources to improve collaboration, storage, and performance.",
  },
]

export function ProfessionalsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="sm:w-[85%] w-[95%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Our certified professionals in various disciplines
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our diverse network of certified professionals brings together specialist knowledge and real-world
            experience to address your unique challenges with precision
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {disciplines.map((discipline, index) => (
            <div key={index} className="flex items-center gap-6 pb-8 border-b border-gray-200">
              <div className="flex-shrink-0">
                <discipline.icon className="w-8 h-8 text-navy" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-navy mb-2">{discipline.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{discipline.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
