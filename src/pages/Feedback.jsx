"use client"

import { useState } from "react"
import { Checkbox } from "@/Components/ui/checkbox"
import { Star, GraduationCap, Users, BookOpen, Target, AlertTriangle, CheckCircle } from "lucide-react"
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Textarea } from "@/Components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog"
import Button from "@/Components/Button"
import { WhiteLogo } from "@/Components/Logo"
import { useNavigate } from "react-router-dom"

/**
 * @typedef {Object} FeedbackData
 * @property {string} studentName
 * @property {string} email
 * @property {string} courseName
 * @property {string} instructor
 * @property {string} completionDate
 * @property {string} overallRating
 * @property {string} contentQuality
 * @property {string} instructorEffectiveness
 * @property {string} coursePacing
 * @property {string} materialClarity
 * @property {string} practicalApplication
 * @property {string} mostValuable
 * @property {string} improvements
 * @property {string} recommend
 * @property {string} additionalComments
 * @property {string[]} futureTopics
 */

const ratingOptions = [
  { value: "Excellent (5)", label: "Excellent" },
  { value: "Very Good (4)", label: "Very Good" },
  { value: "Good (3)", label: "Good" },
  { value: "Fair (2)", label: "Fair" },
  { value: "Poor (1)", label: "Poor" },
]

const futureTopicsOptions = [
  "Advanced Analytics",
  "Digital Marketing",
  "Project Management",
  "Leadership Skills",
  "Data Science",
  "Business Strategy",
  "Financial Planning",
  "Communication Skills",
]

export default function StudentFeedbackForm() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    courseName: "",
    instructor: "",
    completionDate: "",
    overallRating: "",
    contentQuality: "",
    instructorEffectiveness: "",
    coursePacing: "",
    materialClarity: "",
    practicalApplication: "",
    mostValuable: "",
    improvements: "",
    recommend: "",
    additionalComments: "",
    futureTopics: [],
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleTopicChange = (topic, checked) => {
    setFormData((prev) => ({
      ...prev,
      futureTopics: checked ? [...prev.futureTopics, topic] : prev.futureTopics.filter((t) => t !== topic),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSubmitted(true)

    const payload = {
      "Student Name": formData.studentName,
      "email address": formData.email,
      "Course Name": formData.courseName,
      "Instructor Name": formData.instructor,
      "Course Completion Date": formData.completionDate,
      "Overall Course Rating": formData.overallRating,
      "Content Quality & Relevance": formData.contentQuality,
      "Instructor Effectiveness": formData.instructorEffectiveness,
      "Course Pacing": formData.coursePacing,
      "Material Clarity": formData.materialClarity,
      "Practical Application": formData.practicalApplication,
      "What was the most valuable part of this course?": formData.mostValuable,
      "What areas could be improved?": formData.improvements,
      "Would you recommend this course to others?": formData.recommend,
      "Additional Comments": formData.additionalComments,
      "What topics would you like to see in future courses?": formData.futureTopics.join(", "),
      "Date created": new Date().toLocaleString(),
    }

    try {
      const response = await axios.post("https://aviproxy-be.onrender.com/api/submit-feedback-form", payload)
      console.log("Form submission successful:", response.data)
      setIsSuccessModalOpen(true)

    // Reset form
    setFormData({
      studentName: "",
      email: "",
      courseName: "",
      instructor: "",
      completionDate: "",
      overallRating: "",
      contentQuality: "",
      instructorEffectiveness: "",
      coursePacing: "",
      materialClarity: "",
      practicalApplication: "",
      mostValuable: "",
      improvements: "",
      recommend: "",
      additionalComments: "",
      futureTopics: [],
    })


    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage(
        error.response?.data?.message || 
        'There was an error submitting your form. Please try again later.'
      )
      setIsErrorModalOpen(true)
    }

    setIsSubmitting(false)
    setIsSubmitted(false)

  }

    // Success Modal
    const SuccessModal = () => (
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-tertiary-color-900" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              "We've received your feedback and will be in touch with you soon"
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              onClick={() => setIsSuccessModalOpen(false)}
              type="submit"
              hover={false}
              className="w-full bg-tertiary-color-900 hover:tertiary-color-800"
              disabled={isSubmitted}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  
    // Error Modal
    const ErrorModal = () => (
      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-center text-2xl font-bold text-gray-900">
              Oops! Something went wrong
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6">
            <Button
              type="button"
              hover={false}
              className="w-full bg-[#cc1747] hover:bg-[#cc1747]/80"
              onClick={() => setIsErrorModalOpen(false)}
            >
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )

  /**
   * @param {Object} props
   * @param {string} props.title
   * @param {keyof FeedbackData} props.field
   * @param {React.ComponentType} props.icon
   */
  const RatingSection = ({
    title,
    field,
    icon: Icon,
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-accent" />
        <Label className="text-sm font-medium">{title}</Label>
      </div>
      <RadioGroup
        value={formData[field]}
        onValueChange={(value) => handleInputChange(field, value)}
        className="flex flex-wrap gap-4"
      >
        {ratingOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${field}-${option.value}`} />
            <Label htmlFor={`${field}-${option.value}`} className="text-sm cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )

  return (
    <div 
      style={{
        backgroundImage: `url('/images/andreea-avramescu-wR56AUlEsE4-unsplash.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
      className="bg-red-600"
    >
      <SuccessModal />
      <ErrorModal />
      <div className="bg-[#000000A8] py-8">
        <div className="max-w-4xl mx-auto space-y-8 max-sm:px-2">
          <div onClick={() => navigate("/")} className="fixed w-[200px] h-[60px] cursor-pointer top-4 left-4">
            <WhiteLogo />
          </div>
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <GraduationCap className="h-8 w-8 text-accent" />
              <h1 className="text-5xl font-bold text-[#cc1747]">Feedback Form</h1>
            </div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your feedback is invaluable in helping us enhance our courses and deliver exceptional learning experiences.
              Please take a few minutes to share your thoughts about your recent course completion.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Information */}
            <Card className="bg-white px-4 py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Student Information
                </CardTitle>
                <CardDescription>Please provide your basic information for our records.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Full Name *</Label>
                    <Input
                      id="studentName"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange("studentName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name *</Label>
                    <Input
                      id="courseName"
                      value={formData.courseName}
                      onChange={(e) => handleInputChange("courseName", e.target.value)}
                      placeholder="Enter the course name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor Name</Label>
                    <Input
                      id="instructor"
                      value={formData.instructor}
                      onChange={(e) => handleInputChange("instructor", e.target.value)}
                      placeholder="Enter instructor's name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Course Completion Date</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => handleInputChange("completionDate", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Evaluation */}
            <Card className="bg-white px-4 py-6 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  Course Evaluation
                </CardTitle>
                <CardDescription>Please rate different aspects of your learning experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RatingSection title="Overall Course Rating *" field="overallRating" icon={Star} />
                <RatingSection title="Content Quality & Relevance" field="contentQuality" icon={BookOpen} />
                <RatingSection title="Instructor Effectiveness" field="instructorEffectiveness" icon={Users} />
                <RatingSection title="Course Pacing" field="coursePacing" icon={Target} />
                <RatingSection title="Material Clarity" field="materialClarity" icon={BookOpen} />
                <RatingSection title="Practical Application" field="practicalApplication" icon={Target} />
              </CardContent>
            </Card>

            {/* Detailed Feedback */}
            <Card className="bg-white px-4 py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  Detailed Feedback
                </CardTitle>
                <CardDescription>Help us understand what worked well and what could be improved.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mostValuable">What was the most valuable part of this course?</Label>
                  <Textarea
                    id="mostValuable"
                    value={formData.mostValuable}
                    onChange={(e) => handleInputChange("mostValuable", e.target.value)}
                    placeholder="Share what you found most beneficial..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="improvements">What areas could be improved?</Label>
                  <Textarea
                    id="improvements"
                    value={formData.improvements}
                    onChange={(e) => handleInputChange("improvements", e.target.value)}
                    placeholder="Suggest improvements or changes..."
                    rows={3}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Would you recommend this course to others? *</Label>
                  <RadioGroup
                    value={formData.recommend}
                    onValueChange={(value) => handleInputChange("recommend", value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="definitely" id="recommend-definitely" />
                      <Label htmlFor="recommend-definitely" className="cursor-pointer">
                        Definitely
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="probably" id="recommend-probably" />
                      <Label htmlFor="recommend-probably" className="cursor-pointer">
                        Probably
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="recommend-maybe" />
                      <Label htmlFor="recommend-maybe" className="cursor-pointer">
                        Maybe
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="recommend-no" />
                      <Label htmlFor="recommend-no" className="cursor-pointer">
                        No
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalComments">Additional Comments</Label>
                  <Textarea
                    id="additionalComments"
                    value={formData.additionalComments}
                    onChange={(e) => handleInputChange("additionalComments", e.target.value)}
                    placeholder="Any other feedback or suggestions..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Future Learning */}
            <Card className="bg-white px-4 py-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent" />
                  Future Learning Interests
                </CardTitle>
                <CardDescription>Help us plan future courses by indicating your areas of interest.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Label>What topics would you like to see in future courses? (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {futureTopicsOptions.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic}`}
                          checked={formData.futureTopics.includes(topic)}
                          onCheckedChange={(checked) => handleTopicChange(topic, checked)}
                        />
                        <Label htmlFor={`topic-${topic}`} className="text-sm cursor-pointer">
                          {topic}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                size="lg"
                disabled={isSubmitting || !formData.studentName || !formData.email || !formData.overallRating}
                className="bg-[#cc1747] hover:bg-[#cc1747]/90 rounded-full sm:w-[70%] w-[90%] text-white px-8 py-3 text-lg font-semibold"
              >
                {isSubmitting ? "Submitting Feedback..." : "Submit Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
