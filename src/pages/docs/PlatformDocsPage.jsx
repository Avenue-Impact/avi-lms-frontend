import React from "react";
import { 
  MoveLeft, 
  Cpu, 
  Cloud, 
  Zap, 
  ShieldCheck, 
  Users, 
  Globe, 
  CreditCard, 
  PlayCircle, 
  BookOpen,
  Server,
  Layers,
  BarChart3,
  Mail,
  Lock,
  Workflow,
  ClipboardList
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSafeBack } from "@/hooks/use-safe-back";

const PlatformDocsPage = () => {
  const navigate = useNavigate();
  const goBack = useSafeBack();

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-10 font-poppins">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <button
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-primary-color-600 transition-colors"
        >
          <MoveLeft className="h-4 w-4" />
          Back
        </button>

        <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100">
          <div className="mb-12 border-b border-gray-100 pb-10">
            <h1 className="mb-4 text-5xl font-extrabold text-gray-900 tracking-tight">
              AVI LMS Platform Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
              This document serves as the central source of truth for the platform's business logic, architectural integrity, and stakeholder workflows. It is designed to provide Business Analysts and Stakeholders with a clear understanding of the platform's capabilities.
            </p>
          </div>

          <div className="grid gap-16">
            
            {/* 1. Value Proposition & Personas */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-primary-color-600" />
                <h2 className="text-3xl font-bold text-gray-900">1. Platform Personas & Governance</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Platform Admin</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Manages the global ecosystem. Controls multi-tenant Zoom credentials, provisions courses, manages global settings (currency, billing), and oversees instructor invitations.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Instructor</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Content delivery experts. Manage assigned cohorts, track student assignments, launch live sessions, and handle real-time student Q&A/Messages.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Student</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    The end consumers. Access structured learning, track their own video progress, attend live classes, and manage their payment installments.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Content Hierarchy & Lifecycle */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Workflow className="h-8 w-8 text-primary-color-600" />
                <h2 className="text-3xl font-bold text-gray-900">2. Learning Content Lifecycle</h2>
              </div>
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div className="grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Structural Hierarchy</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-primary-color-600"></div>
                        <span className="text-sm font-medium">Course (The Parent Entity)</span>
                      </div>
                      <div className="ml-6 flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-primary-color-400"></div>
                        <span className="text-sm font-medium">Cohort (Group-based learning window)</span>
                      </div>
                      <div className="ml-12 flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-primary-color-200"></div>
                        <span className="text-sm font-medium">Sections & Lessons (On-Demand content)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Live Session Mechanism</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      The platform features deep-linked **Zoom Automation**. When a cohort is created, the system uses Server-to-Server OAuth to:
                    </p>
                    <ul className="space-y-2 text-sm text-gray-500">
                      <li className="flex items-center gap-2">→ Auto-schedule meetings with conflict detection</li>
                      <li className="flex items-center gap-2">→ Enforce cloud recording for subsequent replay</li>
                      <li className="flex items-center gap-2">→ Manage dynamic host/attendee join signatures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. The Monetization Engine */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <CreditCard className="h-8 w-8 text-primary-color-600" />
                <h2 className="text-3xl font-bold text-gray-900">3. Revenue & Access Governance</h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Flexible Payment Models</h3>
                      <p className="text-sm text-gray-500">Supports Full Payment, Weekly/Monthly Installments, and Bank Transfer verification.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Dynamic Enrollment Locks</h3>
                      <p className="text-sm text-gray-500">Once a student joins a course (live or on-demand), they are restricted from double-enrolling in that course via server-side 409 Conflict checks.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-dashed border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary-color-600" />
                    Installment Logic for BAs
                  </h3>
                  <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                    <p><strong>Scheduling:</strong> Calculated based on subscription duration (e.g., 4 weeks access = 4 weekly payments).</p>
                    <p><strong>Enforcement:</strong> Agenda background jobs sweep the database daily. If a payment is overdue, the enrollment status is set to "Revoked".</p>
                    <p><strong>Reinstatement:</strong> Instant upon verification of the outstanding balance via Paystack/Stripe webhooks.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Technical Resilience */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Layers className="h-8 w-8 text-primary-color-600" />
                <h2 className="text-3xl font-bold text-gray-900">4. System Integrity & Third-Party Ecosystem</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "AWS S3", desc: "Hardened video storage with private ACLs and expiring pre-signed URLs.", icon: <Cloud /> },
                  { title: "Zoom SDK", icon: <PlayCircle />, desc: "Client-side Meeting SDK for seamless video conferencing inside the portal." },
                  { title: "Salesforce", icon: <Workflow />, desc: "Automated synchronization of leads and customers for CRM workflows." },
                  { title: "Mail Service", icon: <Mail />, desc: "Pug-based HTML templates for transaction and learning notifications." }
                ].map((item, i) => (
                  <div key={i} className="group rounded-2xl bg-white p-6 border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1">
                    <div className="mb-4 text-primary-color-600 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Key Business Workflows */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <ClipboardList className="h-8 w-8 text-primary-color-600" />
                <h2 className="text-3xl font-bold text-gray-900">5. Stakeholder Workflows (Business Map)</h2>
              </div>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-primary-color-100">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary-color-600"></div>
                  <h3 className="font-bold text-gray-900 mb-2">Enrollment & Access Logic</h3>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    Discovery → Plan Selection → Payment Verification → Automatic Cohort Assignment → LMS Access Grant.
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-primary-color-100">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary-color-600"></div>
                  <h3 className="font-bold text-gray-900 mb-2">The Progress Heartbeat</h3>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    Video Watch → Throttled Heartbeat Ping (5s) → Backend UPSERT Progress → Calculate Global Course % → Update Certificate Eligibility.
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-primary-color-100">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary-color-600"></div>
                  <h3 className="font-bold text-gray-900 mb-2">Instructor Engagement</h3>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    Invite → Set Credentials → Role-based Redirect → Cohort Detail View → Assignment Task Creation → Student Submission Review.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Strategic Infrastructure */}
            <section className="rounded-3xl bg-gray-900 p-10 text-white">
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">6. Strategic Infrastructure</h2>
                  <p className="text-gray-400 text-sm">Security, Scalability, and Automated Maintenance</p>
                </div>
                <Globe className="h-12 w-12 text-primary-color-500 opacity-50" />
              </div>
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="text-primary-color-400 font-bold mb-4 uppercase tracking-widest text-xs">Security & Integrity</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="h-5 w-5 text-primary-color-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Encrypted Credentials</p>
                        <p className="text-xs text-gray-400 mt-1">Zoom App Secrets are encrypted using AES-256 before database persistence.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-primary-color-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Token-Based Authentication</p>
                        <p className="text-xs text-gray-400 mt-1">HTTP-Only cookies for JWT management, securing Student and Admin routes independently.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-primary-color-400 font-bold mb-4 uppercase tracking-widest text-xs">Automated Maintenance</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-primary-color-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Agenda Scheduler</p>
                        <p className="text-xs text-gray-400 mt-1">Background jobs handle session expirations, payment reminders, and recording synchronization every hour.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Server className="h-5 w-5 text-primary-color-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Multi-Node Readiness</p>
                        <p className="text-xs text-gray-400 mt-1">Stateless backend architecture designed to scale across multiple instances using PM2 or Docker.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
          
          <div className="mt-16 text-center text-gray-400 text-xs">
            <p>AVI LMS Documentation v1.0 • Confidential & Internal Use Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDocsPage;
