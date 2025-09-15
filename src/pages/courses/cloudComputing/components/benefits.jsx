import { Card, CardContent } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Video, Users, Briefcase, Award, Clock, Globe, TrendingUp, CheckCircle } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      icon: Video,
      title: "Live Training Sessions",
      description: "Interactive sessions with industry experts, real-time Q&A, and hands-on demonstrations.",
      highlight: "Every Evening 8 PM",
      color: "from-blue-500/10 to-blue-600/10",
      iconColor: "text-blue-600",
      borderColor: "border-blue-500/20",
      stats: "120+ Hours",
    },
    {
      icon: Briefcase,
      title: "Practical Projects",
      description: "Build real-world applications and deploy them on all three cloud platforms.",
      highlight: "12+ Projects",
      color: "from-green-500/10 to-green-600/10",
      iconColor: "text-green-600",
      borderColor: "border-green-500/20",
      stats: "Portfolio Ready",
    },
    {
      icon: Users,
      title: "Expert Mentoring",
      description: "One-on-one guidance from certified cloud architects and senior engineers.",
      highlight: "Personal Mentor",
      color: "from-purple-500/10 to-purple-600/10",
      iconColor: "text-purple-600",
      borderColor: "border-purple-500/20",
      stats: "1:1 Sessions",
    },
    {
      icon: Award,
      title: "Interview Support",
      description: "Mock interviews, resume review, and job placement assistance.",
      highlight: "90% Success Rate",
      color: "from-orange-500/10 to-orange-600/10",
      iconColor: "text-orange-600",
      borderColor: "border-orange-500/20",
      stats: "Job Guarantee",
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Evening classes designed for working professionals with recorded sessions.",
      highlight: "Work-Friendly",
      color: "from-cyan-500/10 to-cyan-600/10",
      iconColor: "text-cyan-600",
      borderColor: "border-cyan-500/20",
      stats: "24/7 Access",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Join a network of cloud professionals and continue learning together.",
      highlight: "500+ Alumni",
      color: "from-pink-500/10 to-pink-600/10",
      iconColor: "text-pink-600",
      borderColor: "border-pink-500/20",
      stats: "Lifetime Network",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float delay-500"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 text-green-600 px-6 py-3 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
            <TrendingUp className="w-4 h-4" />
            {"Why Choose Us"}
            <TrendingUp className="w-4 h-4" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-black mb-6 text-balance animate-fade-in-up delay-100">
            {"Everything You Need to "}
            <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent bg-300% animate-gradient">
              {"Succeed"}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up delay-200">
            {
              "Our comprehensive program is designed to take you from beginner to cloud expert with practical skills that employers demand."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 ${benefit.borderColor} bg-gradient-to-br ${benefit.color} backdrop-blur-sm animate-fade-in-up cursor-pointer overflow-hidden relative`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full blur-sm group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/5 rounded-full blur-sm group-hover:scale-150 transition-transform duration-700"></div>

                <CardContent className="p-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                    >
                      <IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
                    </div>

                    <div className="space-y-4 flex-1">
                      <div className="space-y-2">
                        <h3 className="font-black text-xl group-hover:text-primary transition-colors">
                          {benefit.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs font-bold">
                            {benefit.highlight}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {benefit.stats}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>

                      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{"Proven Results"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm rounded-3xl p-8 border-2 border-primary/10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">{"Our Success Metrics"}</h3>
            <p className="text-muted-foreground">{"Real results from our comprehensive training program"}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Graduates", icon: "🎓" },
              { number: "95%", label: "Job Placement", icon: "💼" },
              { number: "4.9★", label: "Student Rating", icon: "⭐" },
              { number: "₹8L", label: "Avg. Salary", icon: "💰" },
            ].map((metric, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${(index + 9) * 100}ms` }}
              >
                <div className="text-4xl mb-2">{metric.icon}</div>
                <div className="text-3xl font-black text-primary mb-1">{metric.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
