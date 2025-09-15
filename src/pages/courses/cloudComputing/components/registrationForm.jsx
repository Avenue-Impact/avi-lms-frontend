"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Textarea } from "@/Components/ui/textarea"
import { CheckCircle, Phone, Mail, User, MessageSquare, Star, Trophy, Clock, Users } from "lucide-react"

export function RegistrationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "",
    experience: "",
    message: "",
  })

  useEffect(() => {
    const handleModuleSelection = (event) => {
      const customEvent = event
      if (customEvent.detail?.module) {
        let platformValue = ""
        switch (customEvent.detail.module) {
          case "Microsoft Azure":
            platformValue = "azure"
            break
          case "Amazon AWS":
            platformValue = "aws"
            break
          case "Google Cloud Platform":
            platformValue = "gcp"
            break
          case "All Modules":
            platformValue = "all"
            break
        }
        setFormData((prev) => ({ ...prev, platform: platformValue }))
      }
    }

    window.addEventListener("moduleSelected", handleModuleSelection)
    return () => window.removeEventListener("moduleSelected", handleModuleSelection)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <section id="register" className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="animate-bounce mb-6">
                  <CheckCircle className="w-20 h-20 text-primary mx-auto" />
                </div>
                <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {"Registration Successful!"}
                </h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  {
                    "Welcome to the Cloud Computing Program! We'll contact you within 24 hours with program details and next steps."
                  }
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{"Check Email"}</p>
                    <p className="text-xs text-muted-foreground">{"Confirmation sent"}</p>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium">{"Expect Call"}</p>
                    <p className="text-xs text-muted-foreground">{"Within 24 hours"}</p>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <Trophy className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-sm font-medium">{"Start Date"}</p>
                    <p className="text-xs text-muted-foreground">{"Oct 6, 2025"}</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-primary to-secondary">
                  {"Join WhatsApp Group"}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="registration-form"
      className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-600 px-6 py-3 rounded-full text-sm font-bold mb-6 animate-pulse">
              <Clock className="w-4 h-4" />
              {"⚡ Early Bird Offer - 30% Off"}
            </div>
            <h2 className="text-5xl lg:text-6xl font-black mb-6 text-balance">
              {"Secure Your "}
              <span className="bg-gradient-to-r from-tertiary-color-800 via-primary-color-600 to-primary-color-600 bg-clip-text text-transparent bg-300% animate-gradient">
                {"Future"}
              </span>
              {" Today"}
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
              {
                "Join the next batch starting October 6th, 2025. Only 25 seats available for personalized attention and guaranteed job placement support."
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
              <CardHeader className="pb-6 bg-gradient-to-r from-primary/5 to-secondary/5">
                <CardTitle className="text-3xl font-black text-center flex items-center justify-center gap-3">
                  <Star className="w-8 h-8 text-primary" />
                  {"Register Now"}
                  <Star className="w-8 h-8 text-secondary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-base font-semibold">
                      <User className="w-5 h-5 text-primary" />
                      {"Full Name"}
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-base font-semibold">
                      <Mail className="w-5 h-5 text-primary" />
                      {"Email Address"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-base font-semibold">
                      <Phone className="w-5 h-5 text-primary" />
                      {"Phone Number"}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="h-12 text-base border-2 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platform" className="text-base font-semibold">
                      {"Preferred Cloud Platform"}
                    </Label>
                    <Select
                      name="preferredModule"
                      value={formData.platform}
                      onValueChange={(value) => handleInputChange("platform", value)}
                    >
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary/50">
                        <SelectValue placeholder="Select your preferred platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="azure">{"🔷 Microsoft Azure"}</SelectItem>
                        <SelectItem value="aws">{"🟠 Amazon AWS"}</SelectItem>
                        <SelectItem value="gcp">{"🔴 Google Cloud Platform"}</SelectItem>
                        <SelectItem value="all">{"⭐ All Platforms (Recommended)"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-base font-semibold">
                      {"Current Experience Level"}
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("experience", value)}>
                      <SelectTrigger className="h-12 text-base border-2 focus:border-primary/50">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">{"🌱 Beginner (0-1 years)"}</SelectItem>
                        <SelectItem value="intermediate">{"🚀 Intermediate (1-3 years)"}</SelectItem>
                        <SelectItem value="advanced">{"⚡ Advanced (3+ years)"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2 text-base font-semibold">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      {"Additional Message (Optional)"}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your goals or any questions..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={4}
                      className="text-base border-2 focus:border-primary/50 transition-all duration-300"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-lg py-6 text-white bg-gradient-to-r from-tertiary-color-800 via-primary-color-600 to-primary-color-600 hover:from-primary-color-600 hover:via-primary-color-600 hover:to-primary-color-600 shadow-lg hover:shadow-xl transition-all duration-300 font-bold"
                  >
                    {"🚀 Register for Program - Limited Seats!"}
                  </button>
                </form>
              </CardContent>
            </Card>

            {/* Program Details */}
            <div className="space-y-8">
              <Card className="border-2 border-secondary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-secondary" />
                    {"Program Details"}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {"Duration"}
                      </span>
                      <span className="text-primary font-bold text-lg">{"4 Months"}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="font-medium">{"Start Date"}</span>
                      <span className="text-primary font-bold text-lg">{"6th October 2025"}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="font-medium">{"Schedule"}</span>
                      <span className="text-primary font-bold text-lg">{"8:00 PM Daily"}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="font-medium">{"Format"}</span>
                      <span className="text-primary font-bold text-lg">{"Live Online"}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        {"Batch Size"}
                      </span>
                      <span className="text-primary font-bold text-lg">{"25 Students Max"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-secondary/5 to-accent/5 border-2 border-secondary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">{"Contact Information"}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-color-600" />
                      <span>{"08000541072"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary-color-600" />
                      <span>{"info@avenueimpact.com"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 text-primary-color-600">{"🌐"}</span>
                      <span>{"www.avenueimpact.com"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}