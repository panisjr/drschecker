import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col lexend-normal bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-br from-[#37a0ac] to-[#2d8a94]">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm mb-6">
            🌟 About DRSChecker
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight mb-6">
            Empowering Mental Wellness Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-emerald-200">
              Understanding & Care
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto poppins-regular">
            We believe everyone deserves access to tools that help them
            understand and improve their mental well-being.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  🎯
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  To make mental health assessment accessible, private, and
                  empowering for everyone. We strive to break down barriers and
                  provide research-based tools that help individuals understand
                  their emotional well-being and take proactive steps toward
                  better mental health.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6">
                  👁️
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  A world where mental health is understood, prioritized, and
                  supported with the same importance as physical health. We
                  envision a future where seeking help is normalized and
                  everyone has the resources they need to thrive emotionally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 group">
                <Image
                  src={"/images/p2.jpg"}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Our Story Image"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full -z-10 blur-2xl opacity-60" />
            </div>

            <div className="flex-1 space-y-6">
              <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Born from a Passion for{" "}
                <span className="text-emerald-500">Mental Wellness</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                DRSChecker was founded in 2024 by a team of mental health
                advocates, technologists, and healthcare professionals who
                recognized a critical gap in accessible mental health resources.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We witnessed firsthand how many people struggled to understand
                their emotional state or felt too overwhelmed to seek
                professional help. This inspired us to create a platform that
                serves as a first step—a gentle, private, and supportive space
                for self-reflection.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, DRSChecker has helped thousands of individuals gain
                clarity about their mental well-being and has encouraged
                countless others to seek the support they deserve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
              These principles guide everything we do at DRSChecker
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🔒",
                title: "Privacy First",
                description:
                  "Your data is sacred. We ensure complete confidentiality and never share your information.",
                color: "from-blue-500 to-blue-600",
              },
              {
                icon: "🧬",
                title: "Evidence-Based",
                description:
                  "Our assessments are built on validated research and clinical methodologies.",
                color: "from-emerald-500 to-emerald-600",
              },
              {
                icon: "💚",
                title: "Compassion",
                description:
                  "We approach mental health with empathy, understanding, and non-judgment.",
                color: "from-teal-500 to-teal-600",
              },
              {
                icon: "🌍",
                title: "Accessibility",
                description:
                  "Mental health tools should be available to everyone, regardless of background.",
                color: "from-cyan-500 to-cyan-600",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group"
              >
                <div
                  className={`w-16 h-16 mx-auto bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 px-6 bg-gradient-to-br from-blue-900 to-emerald-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-semibold tracking-wide uppercase text-sm">
              Meet The Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              The People Behind DRSChecker
            </h2>
            <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
              A dedicated team of professionals committed to making mental
              health support accessible
            </p>
          </div>

          <div className="flex items-center justify-center gap-8">
            {[
              {
                name: "Ramel Panis",
                role: "CEO & Co-Founder",
                bio: "Tech entrepreneur passionate about using technology to solve real-world health challenges.",
                image: "/images/profile-formal.jpg",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="max-w-[400px] bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 text-center group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-white/20 group-hover:ring-emerald-400/50 transition-all duration-300">
                  <Image
                    src={member.image}
                    fill
                    sizes="128px"
                    alt={member.name}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-emerald-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-300 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-6">
              <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                What Makes DRSChecker{" "}
                <span className="text-emerald-500">Different</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We&apos;re not just another mental health app. We&apos;re a
                comprehensive platform designed with your well-being at the
                center of everything we do.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Clinically Validated",
                    description:
                      "Our assessment tools are developed and reviewed by licensed mental health professionals.",
                  },
                  {
                    title: "AI-Powered Insights",
                    description:
                      "Advanced algorithms provide personalized recommendations based on your unique situation.",
                  },
                  {
                    title: "Complete Privacy",
                    description:
                      "End-to-end encryption ensures your data stays private and secure at all times.",
                  },
                  {
                    title: "24/7 Availability",
                    description:
                      "Access support and resources whenever you need them, day or night.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/50 group">
                <Image
                  src={"/images/why-choose-us.png"}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Why Choose Us Image"
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

      {/* Stats Section */}
      <section className="w-full py-16 bg-gradient-to-r from-[#37a0ac] to-[#2d8a94]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "10K+", label: "Users Helped" },
            { number: "50K+", label: "Assessments Completed" },
            { number: "98%", label: "User Satisfaction" },
            { number: "15+", label: "Expert Advisors" },
          ].map((stat, index) => (
            <div key={index} className="group">
              <h3 className="text-3xl md:text-5xl font-bold text-white group-hover:scale-110 transition-transform">
                {stat.number}
              </h3>
              <p className="text-white/80 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners/Trust Section */}
      {/* <section className="w-full py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 font-medium mb-8">
            Trusted by mental health organizations worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60">
            {[
              "Mental Health Foundation",
              "WHO Partnership",
              "NIMH Certified",
              "APA Approved",
            ].map((partner, index) => (
              <div
                key={index}
                className="text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-3xl p-12 md:p-16 shadow-2xl shadow-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Understand Yourself Better?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Take the first step on your mental wellness journey. Our
              assessment is free, confidential, and takes just a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="inline-block px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Free Assessment →
              </Link>
              <Link
                href="#"
                className="inline-block px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
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
