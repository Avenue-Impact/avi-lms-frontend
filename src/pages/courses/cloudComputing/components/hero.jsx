
import { ArrowRight, Calendar, Clock, Users, Award, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-color-600/10 via-background to-secondary/5">
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-color-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary-color-600/10 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-secondary/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-3/4 w-3 h-8 bg-accent/30 animate-bounce delay-1000"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-color-600/10 to-secondary/10 backdrop-blur-sm border border-primary-color-600/20 text-primary-color-600 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-color-600 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-200"></span>
                  <span className="w-1 h-1 bg-accent rounded-full animate-pulse delay-400"></span>
                </div>
                {"Now Enrolling - Only 25 Seats Left"}
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-balance leading-tight">
                <span className="inline-block animate-fade-in-up text-foreground">4 Months</span>
                <span className="inline-block animate-fade-in-up delay-100 text-primary-color-600 pr-2">Complete</span>
                <span className="inline-block animate-fade-in-up delay-200 bg-gradient-to-r from-tertiary-color-800 to-primary-color-600 bg-clip-text text-transparent bg-300% animate-gradient">
                  CLOUD
                </span>
                <span className="inline-block animate-fade-in-up delay-300 text-foreground px-2">Computing</span>
                <span className="inline-block animate-fade-in-up delay-400 text-primary-color-600 text-4xl lg:text-5xl">
                  Program
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed animate-fade-in-up delay-500">
                {
                  "Master Azure, AWS & GCP with live training, expert mentoring, and hands-on projects. Transform your career in just 4 months with our industry-leading curriculum."
                }
              </p>

              <div className="grid grid-cols-3 gap-4 animate-fade-in-up delay-600">
                <div className="text-center p-3 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <div className="text-2xl font-bold text-primary-color-600">500+</div>
                  <div className="text-xs text-muted-foreground">Graduates</div>
                </div>
                <div className="text-center p-3 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <div className="text-2xl font-bold text-primary-color-600">95%</div>
                  <div className="text-xs text-muted-foreground">Job Rate</div>
                </div>
                <div className="text-center p-3 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <div className="text-2xl font-bold text-primary-color-600">4.9★</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground animate-fade-in-up delay-700">
                <div className="flex items-center gap-2 bg-card/30 px-3 py-2 rounded-full">
                  <Calendar className="w-4 h-4 text-primary-color-600" />
                  <span>{"6th October 2025"}</span>
                </div>
                <div className="flex items-center gap-2 bg-card/30 px-3 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-primary-color-600" />
                  <span>{"8:00 PM"}</span>
                </div>
                <div className="flex items-center gap-2 bg-card/30 px-3 py-2 rounded-full">
                  <Users className="w-4 h-4 text-primary-color-600" />
                  <span>{"25 Max Students"}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-800">
              <button
                className="text-lg text-white px-8 py-2 group bg-gradient-to-r flex items-center from-primary-color-600 to-tertiary-color-800 hover:from-primary-color-600/90 hover:to-tertiary-color-800/90 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {"Enroll Now"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-900">
            <div className="grid grid-cols-1 gap-6">
              {/* Enhanced Cloud Platform Cards with hover effects and icons */}
              <div className="group bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm border-2 border-blue-500/20 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:rotate-6">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl group-hover:text-blue-600 transition-colors">
                      {"Microsoft Azure"}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-blue-500/80 transition-colors">
                      {"Enterprise cloud platform"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-blue-600 font-medium">{"Industry Leader"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm border-2 border-orange-500/20 rounded-2xl p-6 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:rotate-6">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM5 9v6h4l5 5V4L9 9H5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl group-hover:text-orange-600 transition-colors">
                      {"Amazon Web Services"}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-orange-500/80 transition-colors">
                      {"Market leading platform"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Zap className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-orange-600 font-medium">{"Most Popular"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-sm border-2 border-red-500/20 rounded-2xl p-6 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-red-500/50 transition-all duration-300 group-hover:rotate-6">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl group-hover:text-red-600 transition-colors">
                      {"Google Cloud Platform"}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-red-500/80 transition-colors">
                      {"AI-powered cloud services"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-4 h-4 text-red-500">🚀</span>
                      <span className="text-xs text-red-600 font-medium">{"Fast Growing"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-color-600 to-tertiary-color-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
              {"Certified Training"}
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-primary-color-600 to-tertiary-color-800 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce delay-500">
              {"100% Practical"}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}