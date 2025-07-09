import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    course: 'Data Analytics and Business Intelligence',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.first_name.trim()) errs.first_name = 'First name is required.';
    if (!formData.last_name.trim()) errs.last_name = 'Last name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errs.email = 'Invalid email.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setFormData({ first_name: '', last_name: '', email: '', phone: '', course: 'Data Analytics and Business Intelligence' });
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || 'Failed to submit registration.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="md:flex">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#CC1747] to-[#1E2A3F] text-white p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Ready to Start Your Data Analytics Journey?</h2>
          <p className="mb-8 text-blue-100">
            Fill out the form to register for our upcoming training program starting September 8th.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><Mail className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold text-left">Email Us</h4>
                <a href="mailto:info@avenueimpact.com" className="text-blue-100 hover:underline">
                  info@avenueimpact.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><Phone className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold text-left">Call Us</h4>
                <a href="tel:+4480005410720" className="text-blue-100 hover:underline">
                  +4480005410720
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><MapPin className="w-5 h-5" /></div>
              <div>
                <h4 className="font-semibold text-left">Visit Us</h4>
                <p className="text-blue-100">London, UK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Register Now</h3>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center animate-fade-in">
              <h2 className="text-2xl font-bold mb-2">Thank you for registering!</h2>
              <p>We have received your application and will contact you soon.</p>
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-[#1E2A3F] to-[#CC1747] text-white rounded-full font-semibold hover:opacity-90 transition-colors"
                onClick={() => setSubmitted(false)}
              >
                Register Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1 text-left">First Name</label>
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
                {errors.first_name && <p className="text-red-500 text-sm mt-1 text-left">{errors.first_name}</p>}
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1 text-left">Last Name</label>
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
                {errors.last_name && <p className="text-red-500 text-sm mt-1 text-left">{errors.last_name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">Email Address</label>
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
                {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-left">Phone Number</label>
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
              <div className='hidden'>
                <label htmlFor="00NPz00000FTc7l" className="block text-sm font-medium text-gray-700 mb-1 text-left">Course</label>
                <input
                  id="00NPz00000FTc7l"
                  name="00NPz00000FTc7l"
                  type="text"
                  value="Data Analytics and Business Intelligence"
                  required
                  placeholder="Data Analytics and Business Intelligence"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1E2A3F] to-[#CC1747] text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block align-middle" />
                ) : null}
                Submit Application <ArrowRight className="w-5 h-5" />
              </button>
              {errors.submit && <p className="text-red-500 text-sm mt-1 text-left">{errors.submit}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm; 