import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/Components/SEOHead";

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Terms and Conditions | Avenue Impact"
        description="Read the terms of service governing your use of the Avenue Impact learning platforms, advisory services, and digital applications."
        canonical="https://avenueimpact.com/terms-of-service"
      />
      <div className="min-h-screen bg-[#F9FAFB] font-sans">
        
        {/* HERO HEADER */}
        <div className="bg-[#030d22] text-white py-16 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden border-b border-[#00d0ff]/10">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,208,255,0.05),transparent)] pointer-events-none" />
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Avenue Impact Limited
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Terms and Conditions
            </h1>
            <p className="text-gray-400 text-sm md:text-base">
              Effective Date: 21.05.2026
            </p>
          </div>
        </div>

        {/* DOCUMENT CONTAINER */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed text-sm md:text-base">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">1.</span>
                Introduction
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                These Terms and Conditions govern your use of the Avenue Impact website, learning platforms, services, applications, and associated platforms.
              </p>
              <p>
                By accessing or using our services, you agree to comply with these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">2.</span>
                Services
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>Avenue Impact provides:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Professional development programmes</li>
                <li>Corporate workforce capability services</li>
                <li>Consulting and project delivery support</li>
                <li>Digital learning solutions</li>
                <li>Recruitment and employability support</li>
                <li>Mentorship and community platforms</li>
                <li>Digital transformation and AI advisory services</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">3.</span>
                User Accounts
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>Users may be required to create an account to access certain services.</p>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Maintaining confidentiality of login credentials</li>
                <li>Ensuring information provided is accurate</li>
                <li>All activities conducted under your account</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that breach these Terms.</p>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">4.</span>
                Programme Enrolment & Access
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Access to programmes, digital content and services may be subject to payment, eligibility requirements or organisational sponsorship.
              </p>
              <p>
                Programme access is granted for the specified duration outlined at registration.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">5.</span>
                Payments & Refunds
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>All payments are subject to agreed pricing and payment terms. Unless otherwise stated:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Fees are non-refundable once access to digital content or live sessions has commenced</li>
                <li>Refund requests are reviewed on a case-by-case basis</li>
                <li>Corporate contracts may be subject to separate commercial agreements</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">6.</span>
                Intellectual Property
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                All content, materials, branding, learning resources, videos, templates and platform content remain the property of Avenue Impact unless otherwise stated.
              </p>
              <p>Users may not:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Reproduce or redistribute materials without permission</li>
                <li>Share account access with others</li>
                <li>Use materials for commercial resale</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">7.</span>
                Acceptable Use
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>Users must not:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Attempt unauthorised access to systems or data</li>
                <li>Upload malicious software or harmful content</li>
                <li>Misuse community platforms or communication features</li>
                <li>Violate applicable laws or regulations</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">8.</span>
                Certifications
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Certificates issued by Avenue Impact confirm programme participation and completion requirements only. They do not guarantee employment or professional licensing.
              </p>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">9.</span>
                Corporate Services
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Corporate and enterprise engagements may be governed by additional service agreements, statements of work or contractual terms.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">10.</span>
                Limitation of Liability
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>To the fullest extent permitted by law, Avenue Impact shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Indirect or consequential losses</li>
                <li>Loss of business opportunities</li>
                <li>Data loss arising from third-party systems</li>
                <li>Service interruptions outside our reasonable control</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">11.</span>
                Third-Party Platforms
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Some services may integrate with third-party platforms and technologies. Avenue Impact is not responsible for the availability or operation of external services.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">12.</span>
                Termination
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                We reserve the right to suspend or terminate access where users breach these Terms or misuse our services.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">13.</span>
                Governing Law
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                These Terms shall be governed by and interpreted in accordance with the laws of England and Wales.
              </p>
            </section>

            {/* Section 14 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">14.</span>
                Contact Information
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2 text-sm text-gray-600">
                <p className="font-bold text-gray-900">Avenue Impact Limited</p>
                <p><span className="font-semibold text-gray-500">Email:</span> <a href="mailto:info@avenueimpact.com" className="text-rose-600 hover:underline font-semibold">info@avenueimpact.com</a></p>
                <p><span className="font-semibold text-gray-500">Website:</span> <a href="https://avenueimpact.com" className="text-rose-600 hover:underline font-semibold font-semibold">https://avenueimpact.com</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
