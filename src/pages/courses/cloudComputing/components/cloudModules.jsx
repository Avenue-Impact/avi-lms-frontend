"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Cloud, Server, Database, CheckCircle, Star, ArrowRight, Users, Clock, Award } from "lucide-react"
import Button from "@/Components/Button"

export function CloudModules() {
  const modules = [
    {
      name: "Microsoft Azure",
      icon: Cloud,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      borderColor: "border-blue-500/20",
      glowColor: "hover:shadow-blue-500/20",
      description:
        "Master Microsoft's comprehensive cloud platform with enterprise-grade solutions and seamless integration with Microsoft ecosystem.",
      benefits: [
        "Hybrid cloud capabilities",
        "Active Directory integration",
        "Strong enterprise support",
        "AI and ML services",
      ],
      topics: [
        "Azure Virtual Machines & App Services",
        "Azure Functions & Logic Apps",
        "Azure Storage & Cosmos DB",
        "Azure Active Directory & Security",
        "Azure DevOps & Monitoring",
        "Azure AI & Machine Learning",
      ],
      certification: "AZ-900 Fundamentals",
      duration: "6 weeks",
      projects: "8 hands-on projects",
      marketShare: "23%",
    },
    {
      name: "Amazon AWS",
      icon: Server,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      borderColor: "border-orange-500/20",
      glowColor: "hover:shadow-orange-500/20",
      description:
        "Learn the world's leading cloud platform with the most comprehensive set of services and largest global infrastructure.",
      benefits: [
        "Largest service portfolio",
        "Global infrastructure",
        "Market leader reliability",
        "Extensive documentation",
      ],
      topics: [
        "EC2 Instances & Auto Scaling",
        "Lambda Functions & API Gateway",
        "S3 Storage & CloudFront CDN",
        "RDS & DynamoDB Databases",
        "IAM Security & CloudWatch",
        "EKS Kubernetes & DevOps",
      ],
      certification: "AWS Cloud Practitioner",
      duration: "6 weeks",
      projects: "10 hands-on projects",
      marketShare: "32%",
    },
    {
      name: "Google Cloud Platform",
      icon: Database,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      borderColor: "border-red-500/20",
      glowColor: "hover:shadow-red-500/20",
      description:
        "Explore Google's innovative cloud solutions with cutting-edge AI/ML capabilities and data analytics at scale.",
      benefits: ["Advanced AI/ML services", "Big data analytics", "Kubernetes-native", "Competitive pricing"],
      topics: [
        "Compute Engine & App Engine",
        "Cloud Functions & Cloud Run",
        "Cloud Storage & BigQuery",
        "Cloud SQL & Firestore",
        "Identity & Access Management",
        "AI Platform & TensorFlow",
      ],
      certification: "Google Cloud Digital Leader",
      duration: "6 weeks",
      projects: "7 hands-on projects",
      marketShare: "10%",
    },
  ]

  const handleRegister = (moduleName) => {
    // Dispatch custom event with module information
    window.dispatchEvent(
      new CustomEvent("moduleSelected", {
        detail: { module: moduleName },
      }),
    )

    // Scroll to registration form
    const registrationForm = document.getElementById("registration-form")
    if (registrationForm) {
      registrationForm.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border border-primary/20 text-primary px-6 py-3 rounded-full text-sm font-bold mb-6 animate-fade-in-up">
            <Star className="w-4 h-4 animate-spin" />
            {"Cloud Provider Modules"}
            <Star className="w-4 h-4 animate-spin" />
          </div>

          <h2 className="text-5xl lg:text-6xl font-black mb-6 text-balance animate-fade-in-up delay-100">
            {"Choose Your "}
            <span className="bg-gradient-to-r from-primary-color-600 via-tertiary-color-700 to-tertiary-color-800 bg-clip-text text-transparent bg-300% animate-gradient">
              {"Cloud Journey"}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in-up delay-200">
            Deep dive into each major cloud platform with comprehensive modules covering theory, hands-on practice, and
            real-world projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {modules.map((module, index) => {
            const IconComponent = module.icon
            return (
              <Card
                key={index}
                className={`group hover:shadow-2xl ${module.glowColor} transition-all duration-500 hover:-translate-y-4 hover:scale-105 border-2 ${module.borderColor} bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4 relative">
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs font-bold">
                      {module.marketShare} Market
                    </Badge>
                  </div>

                  <div
                    className={`w-20 h-20 ${module.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">
                    {module.name}
                  </CardTitle>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {module.projects}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">{module.certification}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{module.description}</p>

                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-primary">Key Benefits</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {module.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-primary">Topics Covered</h4>
                    <div className="space-y-2">
                      {module.topics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-xs leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => handleRegister(module.name)}
                      className={`w-full ${module.color} hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 group-hover:shadow-lg`}
                    >
                      Register for {module.name}
                      {/* <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /> */}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-2xl p-8 border-2 border-primary/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Complete All Three Modules</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Get comprehensive training across all major cloud platforms and become a versatile cloud professional. Our
              integrated curriculum ensures you understand the strengths and use cases of each platform.
            </p>
            <Button
              onClick={() => handleRegister("All Modules")}
              size="lg"
              className="bg-gradient-to-r from-tertiary-color-800 to-primary-color-600 hover:from-primary-color-600 hover:to-tertiary-color-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
            >
              Register for Complete Program
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
