import { Card, CardContent } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Star, Quote } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Cloud Solutions Architect",
      company: "Microsoft",
      image: "/professional-woman-smiling.png",
      content:
        "The program transformed my career completely. Within 3 months of graduation, I landed my dream job as a Cloud Architect. The hands-on projects were invaluable.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "DevOps Engineer",
      company: "Amazon",
      image: "/professional-man-smiling.png",
      content:
        "Excellent mentoring and practical approach. The instructors are industry experts who really care about your success. Highly recommend this program.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Senior Cloud Engineer",
      company: "Google",
      image: "/professional-woman-confident.jpg",
      content:
        "Best investment I made for my career. The comprehensive coverage of all three platforms gave me a competitive edge in the job market.",
      rating: 5,
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {"Success Stories"}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-balance">
            {"What Our "}
            <span className="text-primary">{"Alumni Say"}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {
              "Join hundreds of professionals who have transformed their careers with our comprehensive cloud computing program."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-primary/20" />

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground leading-relaxed italic">{`"${testimonial.content}"`}</p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}