import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Cloud, Server, Database, Shield, Code, Users, CheckCircle, Star, Zap } from "lucide-react"

export function ProgramOverview() {
  const platforms = [
    {
      name: "Microsoft Azure",
      icon: Cloud,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      borderColor: "border-blue-500/20",
      glowColor: "hover:shadow-blue-500/20",
      features: ["Virtual Machines", "App Services", "Azure Functions", "Cosmos DB"],
      description: "Master Microsoft's comprehensive cloud platform with hands-on projects and real-world scenarios.",
      certification: "AZ-900 Prep",
      marketShare: "23%",
    },
    {
      name: "Amazon AWS",
      icon: Server,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      borderColor: "border-orange-500/20",
      glowColor: "hover:shadow-orange-500/20",
      features: ["EC2 Instances", "Lambda Functions", "S3 Storage", "RDS Databases"],
      description: "Learn the world's most popular cloud platform with industry-standard practices and certifications.",
      certification: "AWS CCP Prep",
      marketShare: "32%",
    },
    {
      name: "Google Cloud Platform",
      icon: Database,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      borderColor: "border-red-500/20",
      glowColor: "hover:shadow-red-500/20",
      features: ["Compute Engine", "Cloud Functions", "BigQuery", "Kubernetes Engine"],
      description: "Explore Google's innovative cloud solutions with focus on AI/ML and data analytics capabilities.",
      certification: "GCP ACE Prep",
      marketShare: "10%",
    },
  ]

  const skills = [
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Learn cloud security best practices and compliance frameworks",
      progress: 95,
    },
    {
      icon: Code,
      title: "Infrastructure as Code",
      description: "Automate deployments with Terraform and CloudFormation",
      progress: 88,
    },
    {
      icon: Users,
      title: "DevOps Integration",
      description: "CI/CD pipelines, monitoring, and containerization",
      progress: 92,
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
            <Star className="w-4 h-4 animate-spin" />
            {"Program Overview"}
            <Star className="w-4 h-4 animate-spin" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-black mb-6 text-balance animate-fade-in-up delay-100">
            {"Master All Three Major "}
            <span className="bg-gradient-to-r from-tertiary-color-800 to-primary-color-600 bg-clip-text text-transparent bg-300% animate-gradient">
              {"Cloud Platforms"}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up delay-200">
            {
              "Get comprehensive training across Azure, AWS, and GCP with practical projects, expert mentoring, and industry-recognized certifications."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon
            return (
              <Card
                key={index}
                className={`group hover:shadow-2xl ${platform.glowColor} transition-all duration-500 hover:-translate-y-4 hover:scale-105 border-2 ${platform.borderColor} bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardHeader className="text-center pb-4 relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs font-bold">
                      {platform.marketShare} Market
                    </Badge>
                  </div>

                  <div
                    className={`w-20 h-20 ${platform.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {platform.name}
                  </CardTitle>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">{platform.certification}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground text-center leading-relaxed">{platform.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-primary flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {"Key Technologies"}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {platform.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-primary font-bold">100%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${platform.color} transition-all duration-1000 group-hover:w-full`}
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-primary/10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{"Additional Skills You'll Master"}</h3>
            <p className="text-muted-foreground">
              {"Essential cloud computing skills for modern DevOps and infrastructure management"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{skill.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className="text-sm text-primary font-bold">{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 bg-gradient-to-r from-primary-color-600 to-white rounded-full transition-all duration-1000 group-hover:animate-pulse"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}