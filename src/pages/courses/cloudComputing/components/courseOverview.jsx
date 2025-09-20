import { Card, CardContent } from "@/Components/ui/card"
import { Cloud, TrendingUp, Users, Award, CheckCircle, Sparkles } from "lucide-react"

export function CourseOverview() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "High Demand Skills",
      description: "Cloud computing jobs are growing 25% annually with average salaries of $120,000+",
    },
    {
      icon: Users,
      title: "Industry Recognition",
      description: "Gain certifications from Azure, AWS, and GCP - the most sought-after credentials",
    },
    {
      icon: Award,
      title: "Career Advancement",
      description: "90% of our graduates receive job offers or promotions within 6 months",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-56 h-56 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4 animate-spin" />
            {"Course Introduction"}
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-black mb-6 text-balance animate-fade-in-up delay-100">
            {"Why Learn "}
            <span className="bg-gradient-to-r text-primary-color-600">
              {"Cloud Computing?"}
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty animate-fade-in-up delay-200 leading-relaxed">
            Cloud computing is revolutionizing how businesses operate, offering scalable, cost-effective solutions that
            drive innovation. Master the three major cloud platforms and position yourself at the forefront of digital
            transformation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8 animate-fade-in-up delay-300">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-primary">What is Cloud Computing?</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cloud computing delivers computing services—including servers, storage, databases, networking, software,
                analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible
                resources, and economies of scale.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Key Cloud Computing Benefits:</h4>
              <div className="space-y-3">
                {[
                  "Cost Efficiency - Pay only for what you use",
                  "Scalability - Scale up or down based on demand",
                  "Reliability - 99.9% uptime with global infrastructure",
                  "Security - Enterprise-grade security and compliance",
                  "Innovation - Access to cutting-edge AI and ML services",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-400">
            <Card className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-2 border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-color-600 to-primary-color-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Cloud Market Growth</h3>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-black text-primary mb-2">$832B</div>
                    <p className="text-sm text-muted-foreground">Global cloud market by 2025</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-secondary">25%</div>
                      <p className="text-xs text-muted-foreground">Annual job growth</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">3.9M</div>
                      <p className="text-xs text-muted-foreground">Unfilled positions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-2 border-primary/10 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${(index + 5) * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-tertiary-color-800 to-tertiary-color-900 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{benefit.title}</h3>
                  <p className="text-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}