import { Badge, Calculator, Clock, Code, Globe, Palette, Star, Users } from "lucide-react"



const courses = [
    {
      id: 1,
      title: "Business Analysis",
      description: "Master Business AnalysisGet Certified",
      duration: "6 weeks",
      students: 2847,
      rating: 4.8,
      price: "$45",
      icon: Code,
      color: "bg-blue-500",
      url: "/courses/business-analysis",
    },
    {
      id: 2,
      title: "Data Analytics/Business Intelligence",
      description: "Learn practical data skills and tools (No experience needed)",
      duration: "4 months",
      students: 1923,
      rating: 4.9,
      price: "$50",
      icon: Palette,
      color: "bg-purple-500",
      url: "/courses/data-analytics",
    },
    {
      id: 3,
      title: "Cloud Computing",
      description: "Master cloud computing with Microsoft Azure, Amazon AWS, and Google Cloud Platform",
      duration: "16 weeks",
      students: 1456,
      rating: 4.7,
      price: "$40",
      icon: Calculator,
      color: "bg-green-500",
      url: "/courses/cloud-computing",
    },
    {
      id: 4,
      title: "Project Management",
      description: "Learn project management and leadership skills",
      duration: "10 weeks",
      students: 3241,
      rating: 4.6,
      price: "$43",
      icon: Globe,
      color: "bg-orange-500",
      url: "/courses/project-management",
    },
  ]

export const ListOfCourses = ({ onClose }) => {
  return (
    <div className="bg-white px-4 py-10 rounded-sm w-[380px] max-w-[90vw] shadow-2xl">
      {/* Courses Display - Right Side */}
      <div className="space-y-6 max-h-[80vh] overflow-y-auto hideScrollBar pr-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Courses</h2>
          <div className="flex gap-4">
            <button className="text-blue-600 hover:text-blue-700 transition-colors">
              View All
            </button>
            <div className="absolute top-2 right-2  h-8 w-8  border hover:border-red-700 border-gray-500 rounded-full flex items-center justify-center">
                <button 
                onClick={onClose}
                className="text-gray-500 hover:text-red-700 transition-colors text-lg"
                aria-label="Close"
                >
                ✕
                </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
                {courses.map((course, index) => {
                    const IconComponent = course.icon
                    return (
                    <div
                        key={course.id}
                        onClick={() => window.open(course.url, '_blank')}
                        className="group hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
                        style={{
                        animationDelay: `${index * 100}ms`,
                        }}
                    >
                        <div className="p-0">
                        <div className="flex">
                            {/* Course Image */}
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <div
                                    className={`absolute inset-0 ${course.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                                />
                                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                                        <IconComponent className={`h-6 w-6 text-black`} />
                                    </div>
                                <div className={`absolute inset-0 ${course.color} opacity-80`} />
                            </div>

                            {/* Course Info */}
                            <div className="flex-1 p-4 space-y-2">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                <h3 className="font-semibold text-sm leading-tight group-hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">{course.description}</p>
                                </div>
                                {/* <div className="text-right">
                                 <div className="font-bold text-lg text-blue-600">{course.price}</div>
                                </div> */}
                            </div>

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {course.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {course.students.toLocaleString()}
                                </div>
                                </div>
                                <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {course.rating}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}