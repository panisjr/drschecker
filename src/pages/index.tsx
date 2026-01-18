import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col lexend-normal bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />

        {/* Background Image */}
        <Image
          src={"/images/card9.jpg"}
          className="object-cover"
          alt="Peaceful landscape background"
          fill
          priority
          sizes="100vw"
        />

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6 animate-fade-in">
            ✨ Your mental wellness companion
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-3xl leading-tight mb-6">
            Track Your Mental Wellness with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Clarity & Care
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-8 poppins-regular">
            Understand your emotional well-being through our research-based
            depression rating scale. Start your journey to better mental health
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/check"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10K+", label: "Users Helped" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Support Available" },
            { number: "100%", label: "Confidential" },
          ].map((stat, index) => (
            <div key={index} className="group">
              <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 group-hover:scale-110 transition-transform">
                {stat.number}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
                About DRSChecker
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                A Supportive Space for Your{" "}
                <span className="text-emerald-500">Emotional Well-being</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                DRSChecker is a supportive space designed to help you better
                understand your emotional well-being through a simple,
                research-based depression rating scale.
              </p>
              <ul className="space-y-4">
                {[
                  "Research-based assessment methods",
                  "AI-powered personalized insights",
                  "Complete privacy and security",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 group">
                <Image
                  src={"/images/p1.jpg"}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Peaceful Image"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full -z-10 blur-2xl opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Simple Steps to Better Understanding
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "📝",
                title: "Answer Questions",
                description:
                  "Complete a brief, guided questionnaire about your current mental state and feelings.",
              },
              {
                step: "02",
                icon: "🔍",
                title: "Get Insights",
                description:
                  "Receive a comprehensive analysis based on research-validated assessment methods.",
              },
              {
                step: "03",
                icon: "💬",
                title: "AI Support",
                description:
                  "Get personalized, AI-generated messages that encourage self-care and support.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <span className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-blue-100 transition-colors">
                  {item.step}
                </span>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-6">
              <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
                AI-Powered Insights
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Thoughtful Guidance When You{" "}
                <span className="text-blue-500">Need It Most</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                By answering a few guided questions, you can gain insights into
                your current mental state—and receive thoughtful, AI-generated
                messages that encourage self-care and seeking support when
                needed.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: "🔒", text: "100% Private" },
                  { icon: "🎯", text: "Accurate Results" },
                  { icon: "💡", text: "Actionable Tips" },
                  { icon: "🤖", text: "AI Powered" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 group">
                <Image
                  src={"/images/p3.jpg"}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Peaceful Image"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-blue-900 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "DRSChecker helped me understand my feelings better and gave me the courage to seek professional help.",
                author: "Andrew Philip",
                role: "Front-End Developer",
              },
              {
                quote:
                  "The AI-generated messages were surprisingly comforting and helped me feel less alone during difficult times.",
                author: "Matt Christopher",
                role: "Full Stack Developer",
              },
              {
                quote:
                  "A simple yet powerful tool. The privacy focus made me feel safe to be honest about my mental state.",
                author: "Ulysses Urich.",
                role: "Business Man",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-12 md:p-16 shadow-2xl shadow-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Take the first step towards understanding your mental wellness.
              Our assessment is free, private, and takes just a few minutes.
            </p>
            <Link
              href="/check"
              className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Free Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">DRSChecker</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                A supportive space designed to help you better understand your
                emotional well-being through research-based assessments.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Assessment", "About", "Resources"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {["Contact", "FAQ", "Privacy Policy", "Terms of Service"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="hover:text-white transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>© 2024 DRSChecker. All rights reserved.</p>
            <p className="mt-2 text-sm">
              If you&apos;re in crisis, please contact a{" "}
              <Link href="#" className="text-blue-400 hover:underline">
                mental health helpline
              </Link>{" "}
              in your area.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
