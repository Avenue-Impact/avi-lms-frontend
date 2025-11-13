import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const CoursesRegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    course: 'Business Analysis Bundle',
    referrerCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="md:flex">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#CC1747] to-[#1E2A3F] text-white p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Ready to Start Your BA Journey?</h2>
          <p className="mb-8 text-blue-100">
            Fill out the form to register for our upcoming training program starting July 21st.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><Mail className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold">Email Us</h4>
                <a href="mailto:info@avenueimpact.com" className="text-blue-100 hover:underline">
                  info@avenueimpact.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><Phone className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <a href="tel:+4480005410720" className="text-blue-100 hover:underline">
                  +4480005410720
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><MapPin className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold">Visit Us</h4>
                <p className="text-blue-100">London, UK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Register Now</h3>

          <form
            action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
            method="POST"
            className="space-y-6"
          >
            <input type="hidden" name="oid" value="00D4J000000FoZV" />
            <input type="hidden" name="retURL" value="https://www.avenueimpact.com/courses/thanks" />

            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                required
                placeholder="John"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                required
                placeholder="Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="referrerCode" className="block text-sm font-medium text-gray-700 mb-1">Referrer Code</label>
              <input
                id="referrerCode"
                name="referrerCode"
                type="text"
                value={formData.referrerCode}
                onChange={handleChange}
                placeholder="Enter Referrer Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className='hidden'>
              <label htmlFor="00NPz00000FTc7l" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input
                id="00NPz00000FTc7l"
                name="00NPz00000FTc7l"
                type="text"
                // value={formData.course}
                value="Business Analysis Bundle"
                // onChange={handleChange}
                required
                placeholder="Business Analysis Bundle"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#1E2A3F] to-[#CC1747] text-white py-4 px-6 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Submit Application <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CoursesRegistrationForm;