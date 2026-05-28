import React from "react";
import SEOHead from "@/Components/SEOHead";

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Avenue Impact"
        description="Learn how Avenue Impact collects, processes, stores, and protects your personal information in compliance with UK GDPR and data protection laws."
        canonical="https://avenueimpact.com/privacy-policy"
      />
      <div className="min-h-screen bg-[#F9FAFB] font-sans">
        
        {/* HERO HEADER */}
        <div className="bg-[#030d22] text-white py-16 px-6 md:px-12 lg:px-20 text-center relative overflow-hidden border-b border-[#00d0ff]/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,208,255,0.05),transparent)] pointer-events-none" />
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              Avenue Impact Limited
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Privacy Policy
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
                Avenue Impact Limited (“Avenue Impact”, “we”, “our”, or “us”) is committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, store and protect your personal information when you use our website, learning platforms, services, applications, and associated platforms including, Mentiiv, Prepnhire and ExpertsMerge.
              </p>
              <p>
                We are committed to handling personal data in accordance with the UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018, and other applicable privacy laws.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">2.</span>
                Who We Are
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2">
                <p className="font-bold text-gray-900">Avenue Impact Limited</p>
                <p><span className="font-semibold text-gray-500">Website:</span> <a href="https://avenueimpact.com" className="text-rose-600 hover:underline">https://avenueimpact.com</a></p>
                <p><span className="font-semibold text-gray-500">Email:</span> <a href="mailto:info@avenueimpact.com" className="text-rose-600 hover:underline">info@avenueimpact.com</a></p>
                <p><span className="font-semibold text-gray-500">Registered Address:</span> 19, St Christopher's Way, Derby DE24 8JY</p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">3.</span>
                Information We Collect
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>We may collect and process the following information:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Personal Information</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Telephone number</li>
                    <li>Company information</li>
                    <li>Job title</li>
                    <li>Billing and payment details</li>
                    <li>User account credentials</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Learning & Platform</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                    <li>Course enrolment info</li>
                    <li>Learning progress</li>
                    <li>Assessment results</li>
                    <li>Certificates & awards</li>
                    <li>Attendance records</li>
                    <li>Mentorship participation</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Technical Information</h4>
                  <ul className="list-disc pl-4 space-y-1 text-sm text-gray-600">
                    <li>IP address</li>
                    <li>Browser & device type</li>
                    <li>Cookies & usage analytics</li>
                    <li>Login activity logs</li>
                    <li>System access details</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">4.</span>
                How We Use Your Information
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>We use your information to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Deliver our professional development programmes and digital services</li>
                <li>Provide access to our learning platforms and communities</li>
                <li>Manage registrations, certifications and assessments</li>
                <li>Support recruitment, mentoring and employability services</li>
                <li>Improve our website, services and user experience</li>
                <li>Communicate important updates and service notifications</li>
                <li>Respond to enquiries and support requests</li>
                <li>Meet legal and regulatory obligations</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">5.</span>
                Legal Basis for Processing
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>We process personal data based on:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Your consent</li>
                <li>Performance of a contract</li>
                <li>Legitimate business interests</li>
                <li>Compliance with legal obligations</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">6.</span>
                Data Sharing
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>We do not sell your personal information.</p>
              <p>We may share data with:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Trusted technology and cloud service providers</li>
                <li>Learning and communication platform providers</li>
                <li>Payment processing partners</li>
                <li>Corporate clients where training or workforce services are provided</li>
                <li>Regulatory authorities where legally required</li>
              </ul>
              <p className="text-sm bg-rose-50/50 p-4 rounded-xl border border-rose-100/50 text-rose-900 font-medium">
                All third-party providers are required to maintain appropriate security and confidentiality measures.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">7.</span>
                International Transfers
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Where data is transferred outside the UK, we ensure appropriate safeguards are in place in line with UK GDPR requirements.
              </p>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">8.</span>
                Data Security
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                We implement appropriate technical and organisational security measures to protect personal information, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Encrypted communications</li>
                <li>Access controls and multi-factor authentication</li>
                <li>Secure cloud hosting environments</li>
                <li>Security monitoring and vulnerability management</li>
                <li>Staff confidentiality and security awareness procedures</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">9.</span>
                Data Retention
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                We retain personal information only for as long as necessary to fulfil the purposes outlined in this policy or to comply with legal obligations.
              </p>
            </section>

            {/* Section 10 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">10.</span>
                Your Rights
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Restrict or object to processing</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise your rights, contact us at:{" "}
                <a href="mailto:admin@avenueimpact.com" className="text-rose-600 hover:underline font-semibold">
                  admin@avenueimpact.com
                </a>
              </p>
            </section>

            {/* Section 11 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">11.</span>
                Cookies
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Our website may use cookies and analytics technologies to improve user experience and website performance. Users can manage cookie preferences through their browser settings.
              </p>
            </section>

            {/* Section 12 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">12.</span>
                Third-Party Links
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                Our website may contain links to external websites or services. We are not responsible for the privacy practices of third-party sites.
              </p>
            </section>

            {/* Section 13 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">13.</span>
                Updates to This Policy
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>
                We may update this Privacy Policy periodically. Any updates will be published on this page with the revised effective date.
              </p>
            </section>

            {/* Section 14 */}
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-rose-500 font-extrabold text-lg">14.</span>
                Contact Information
              </h2>
              <div className="h-[1px] bg-gray-100 w-full" />
              <p>For enquiries regarding these Terms or our services, contact:</p>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-2 text-sm text-gray-600">
                <p className="font-bold text-gray-900">Avenue Impact Limited</p>
                <p><span className="font-semibold text-gray-500">Email:</span> <a href="mailto:info@avenueimpact.com" className="text-rose-600 hover:underline">info@avenueimpact.com</a></p>
                <p><span className="font-semibold text-gray-500">Website:</span> <a href="https://avenueimpact.com" className="text-rose-600 hover:underline">https://avenueimpact.com</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
