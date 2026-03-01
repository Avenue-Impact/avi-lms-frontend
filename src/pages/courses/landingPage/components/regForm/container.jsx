import { CoursesRegistrationForm } from "./index";

export default function RegistrationFormContainer() {
  return (
    <section id="register" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Start Your BA Journey?</h2>
          <p className="text-xl text-gray-600">Fill out the form below to secure your spot in our next training batch</p>
        </div>
        
        <div className="sm:w-[85%] w-[90%] mx-auto">
          <CoursesRegistrationForm />
        </div>
      </div>
    </section>
  )
}
