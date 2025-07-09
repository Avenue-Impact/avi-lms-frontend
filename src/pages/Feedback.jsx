import React, { useState } from 'react';
import { Star } from 'lucide-react';

const Poppins = () => (
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
);

const Feedback = () => {
  const [form, setForm] = useState({ name: '', email: '', reason: '', feedback: '', rating: 0 });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email.';
    if (!form.reason) errs.reason = 'Please select a reason.';
    if (!form.feedback.trim()) errs.feedback = 'Feedback is required.';
    if (!form.rating) errs.rating = 'Please rate your experience.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleRating = (r) => {
    setForm({ ...form, rating: r });
    setErrors({ ...errors, rating: undefined });
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
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', reason: '', feedback: '', rating: 0 });
      } else {
        const data = await response.json();
        setErrors({ submit: data.message || 'Failed to submit feedback.' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Poppins />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-16 font-poppins">
        <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 md:p-16 border border-gray-200 overflow-hidden">
          <div className="absolute -top-24 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-3xl z-0" />
          <div className="absolute -bottom-24 left-0 w-64 h-64 bg-gradient-to-br from-pink-400 via-blue-400 to-purple-400 opacity-30 rounded-full blur-3xl z-0" />
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-left">We Value Your Feedback</h1>
            <p className="text-lg text-gray-600 mb-8 text-left">Help us improve your experience. Please share your thoughts below.</p>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center animate-fade-in">
                <h2 className="text-2xl font-bold mb-2">Thank you for your feedback!</h2>
                <p>We appreciate your input and will use it to improve our services.</p>
                <button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-[#1E2A3F] to-[#CC1747] text-white rounded-full font-semibold hover:opacity-90 transition-colors"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-left">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium transition-all`}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 text-left">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-left">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium transition-all`}
                    placeholder="you@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-left">Reason/Purpose</label>
                  <select
                    name="reason"
                    value={form.reason}
                    onChange={handleChange}
                    className={`w-full cursor-pointer px-4 py-3 border ${errors.reason ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium transition-all`}
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="complain">Complain</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="enquiry">Enquiry</option>
                    <option value="compliment">Compliment</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.reason && <p className="text-red-500 text-sm mt-1 text-left">{errors.reason}</p>}
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-left">Your Feedback</label>
                  <textarea
                    name="feedback"
                    value={form.feedback}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 border ${errors.feedback ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium transition-all resize-none`}
                    placeholder="Share your thoughts..."
                  />
                  {errors.feedback && <p className="text-red-500 text-sm mt-1 text-left">{errors.feedback}</p>}
                </div>
                <div>
                  <label className="block text-gray-800 font-semibold mb-2 text-left">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRating(star)}
                        className={`focus:outline-none ${form.rating >= star ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
                        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      >
                        <Star className="w-8 h-8" fill={form.rating >= star ? '#FBBF24' : 'none'} />
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-red-500 text-sm mt-1 text-left">{errors.rating}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1E2A3F] to-[#CC1747] text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5 inline-block align-middle" />
                  ) : null}
                  Submit Feedback
                </button>
                {errors.submit && <p className="text-red-500 text-sm mt-1 text-left">{errors.submit}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback; 