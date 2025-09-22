"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { Checkbox } from "@/Components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Progress } from "@/Components/ui/progress"
import {
  Building2,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  Heart,
  Clock,
  MessageSquare,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react"
import Button from "@/Components/Button"

const steps = [
  { id: 1, title: "Business & Contact Details", icon: Building2 },
  { id: 2, title: "Your Interests", icon: Heart },
  { id: 3, title: "Timing & Details", icon: Clock },
  { id: 4, title: "Next Steps", icon: Calendar },
]

const interestOptions = [
  "I'd love to host an intern from your training programme",
  "I want to submit a project for your work experience programme",
  "I'm interested in your services (development, business, consultancy)",
  "I'd like to enquire about training or mentorship",
]

const timingOptions = [
  { value: "now", label: "Now" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "6-12-months", label: "In 6–12 months" },
  { value: "unsure", label: "Unsure" },
]

export default function BusinessInterestForms() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    website: "",
    location: "",
    interests: [],
    timing: "",
    businessDescription: "",
    companySize: "",
    howDidYouHear: "",
    preferredContact: "",
    bestTimeToContact: "",
    nextSteps: "",
  })

  const progress = (currentStep / steps.length) * 100

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInterestChange = (interest, checked) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interest] : prev.interests.filter((i) => i !== interest),
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    setIsSubmitted(true)
    // Handle form submission logic here
    const response = await fetch("https://script.google.com/macros/s/AKfycbwB-7IoTJLLTXh9nH9HAOayiRRdc-4JEGjPLKfpZ85HFiemkr7Yz0wazoB38VpqqhgR/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log('response', response)
    const data = await response.json()
    console.log('data', data)
    // https://script.google.com/macros/s/AKfycbwB-7IoTJLLTXh9nH9HAOayiRRdc-4JEGjPLKfpZ85HFiemkr7Yz0wazoB38VpqqhgR/exec
    console.log("Form submitted:", formData)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <Card className="text-center shadow-2xl border-0 bg-gradient-to-br from-card to-muted/50">
          <CardContent className="p-12">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-2">Thank You!</h2>
              <p className="text-muted-foreground text-lg">
                {formData.nextSteps === "book-now"
                  ? "We'll redirect you to our calendar booking system shortly."
                  : "We'll be in touch soon to discuss your business needs."}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Avenue Impact Team</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-in-up">
        <h1 className="text-4xl font-bold text-[#cc1747] mb-2 text-balance">
          Let's Get to Know You and Your Business!
        </h1>
        <p className="text-lg text-muted-foreground text-pretty">
          We're excited to learn more about your goals and see how we can collaborate to create real impact together.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${
                    isActive
                      ? "bg-primary-color-600 border-primary-color-600 text-primary-foreground shadow-lg scale-110"
                      : isCompleted
                        ? "bg-tertiary-color-800 border-tertiary-color-800 text-white"
                        : "bg-background border-border text-muted-foreground"
                  }
                `}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                    w-16 h-0.5 mx-2 transition-colors duration-300
                    ${isCompleted ? "bg-accent" : "bg-border"}
                  `}
                  />
                )}
              </div>
            )
          })}
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </p>
      </div>

      {/* Form Steps */}
      <form 
      action="https://script.google.com/macros/s/AKfycbzkHDXx8j2H07JOWDetbOTbdZGxQqJY-4ntFjB9yP96ZeQqQKsI_1ZDF5LoNjnfzQvj/exec"
      method="POST"
      >
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-card to-background animate-scale-in">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl flex items-center gap-3">
              {(() => {
                const Icon = steps[currentStep - 1].icon
                return <Icon className="w-6 h-6 text-primary" />
              })()}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription className="text-base">
              {currentStep === 1 && "Please provide your business and contact information"}
              {currentStep === 2 && "What brings you to Avenue Impact? Select all that apply"}
              {currentStep === 3 && "Help us understand your timeline and business better"}
              {currentStep === 4 && "How would you like to proceed?"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Business & Contact Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-slide-in-up">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Contact Name
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Location (City/Country)
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Your Interests */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-slide-in-up">
                <div className="space-y-4">
                  {interestOptions.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200 hover:scale-[1.01]"
                    >
                      <Checkbox
                        id={`interest-${index}`}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={(checked) => handleInterestChange(interest, checked)}
                        className="mt-1 border border-primary-color-600"
                      />
                      <Label htmlFor={`interest-${index}`} className="text-sm leading-relaxed cursor-pointer">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Timing & Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-slide-in-up">
                <div className="space-y-4">
                  <Label className="text-base font-medium">When are you looking to get started?</Label>
                  <RadioGroup
                    value={formData?.timing}
                    onValueChange={(value) => handleInputChange("timing", value)}
                    className="space-y-3"
                  >
                    {timingOptions?.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label htmlFor={option.value} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Tell us about your business and what you're hoping to achieve
                  </Label>
                  <Textarea
                    id="businessDescription"
                    value={formData.businessDescription}
                    onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    placeholder="The more you share, the better we can support you!"
                    className="min-h-[120px] transition-all duration-200 focus:scale-[1.01]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Company Size
                    </Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => handleInputChange("companySize", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10 employees</SelectItem>
                        <SelectItem value="11-50">11–50 employees</SelectItem>
                        <SelectItem value="51-200">51–200 employees</SelectItem>
                        <SelectItem value="201+">201+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howDidYouHear">How did you hear about us?</Label>
                    <Select
                      value={formData.howDidYouHear}
                      onValueChange={(value) => handleInputChange("howDidYouHear", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="web-search">Web Search</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                    <Select
                      value={formData.preferredContact}
                      onValueChange={(value) => handleInputChange("preferredContact", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="either">Either</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bestTimeToContact">Best Time to Contact</Label>
                    <Select
                      value={formData.bestTimeToContact}
                      onValueChange={(value) => handleInputChange("bestTimeToContact", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Next Steps */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-slide-in-up">
                <div className="space-y-4">
                  <Label className="text-base font-medium">How would you like to proceed?</Label>
                  <RadioGroup
                    value={formData.nextSteps}
                    onValueChange={(value) => handleInputChange("nextSteps", value)}
                    className="space-y-4"
                  >
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200">
                      <RadioGroupItem value="book-now" id="book-now" className="mt-1" />
                      <div className="space-y-1">
                        <Label htmlFor="book-now" className="cursor-pointer font-medium">
                          Book a consultation now
                        </Label>
                        <p className="text-sm text-muted-foreground">We'll redirect you to our calendar booking system</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-all duration-200">
                      <RadioGroupItem value="contact-later" id="contact-later" className="mt-1" />
                      <div className="space-y-1">
                        <Label htmlFor="contact-later" className="cursor-pointer font-medium">
                          Please contact me
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          We'll reach out to you using your preferred contact method
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-border">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 text-zinc-500 cursor-pointer border border-primary-color-600 py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-primary-color-600 cursor-pointer text-white py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  // onClick={handleSubmit}
                  className="flex items-center gap-2 cursor-pointer text-white py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg bg-gradient-to-r from-primary-color-600 to-tertiary-color-800"
                >
                  Submit Form
                  <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
