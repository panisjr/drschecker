import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { UseUser } from "../_app";

export interface NavbarProps {
  isDashboard: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isDashboard }) => {
  const router = useRouter();
  const { currentUser } = UseUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#37a0ac",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg",
        cancelButton: "rounded-lg",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/");
      }
    });
  };

  const isActiveLink = (path: string) => router.pathname === path;

  // Public Navbar (Not logged in)
  if (!isDashboard) {
    return (
      <>
        <nav
          className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
              : "bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/logo.png"
                    alt="DRSchecker Logo"
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <span
                  className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-[#37a0ac]" : "text-white"
                  }`}
                >
                  DRS<span className="font-normal">checker</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {/* Nav Links */}
                <div className="flex items-center gap-6">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/resources", label: "Resources" },
                    { href: "/contact", label: "Contact" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative font-medium transition-colors duration-300 group ${
                        isScrolled
                          ? "text-gray-700 hover:text-[#37a0ac]"
                          : "text-white/90 hover:text-white"
                      } ${isActiveLink(link.href) ? "font-semibold" : ""}`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                          isActiveLink(link.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  ))}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                  <Link
                    href="/signIn"
                    className={`px-5 py-2.5 font-medium rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "text-[#37a0ac] hover:bg-[#37a0ac]/10"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signUp"
                    className={`px-5 py-2.5 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
                      isScrolled
                        ? "bg-[#37a0ac] text-white hover:bg-[#2d8a94] hover:shadow-[#37a0ac]/30"
                        : "bg-white text-[#37a0ac] hover:bg-gray-100 hover:shadow-white/30"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                  />
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div
              className={`px-4 py-6 space-y-4 ${
                isScrolled ? "bg-white" : "bg-[#37a0ac]/95 backdrop-blur-md"
              }`}
            >
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/resources", label: "Resources" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-white/10"
                  } ${isActiveLink(link.href) ? "bg-white/10" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/20 space-y-3">
                <Link
                  href="/signIn"
                  className={`block w-full text-center px-4 py-2.5 rounded-lg font-medium transition-colors ${
                    isScrolled
                      ? "text-[#37a0ac] border border-[#37a0ac] hover:bg-[#37a0ac]/10"
                      : "text-white border border-white/50 hover:bg-white/10"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/signUp"
                  className={`block w-full text-center px-4 py-2.5 rounded-lg font-semibold transition-colors ${
                    isScrolled
                      ? "bg-[#37a0ac] text-white hover:bg-[#2d8a94]"
                      : "bg-white text-[#37a0ac] hover:bg-gray-100"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Spacer for fixed navbar */}
        <div className="h-16 md:h-20" />
      </>
    );
  }

  // Dashboard Navbar (Logged in)
  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo & Nav Links */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/logo.png"
                    alt="DRSchecker Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span
                  className={`text-lg md:text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-[#37a0ac]" : "text-white"
                  }`}
                >
                  DRS<span className="font-normal">checker</span>
                </span>
              </Link>

              {/* Admin Links */}
              {currentUser?.role === "admin" && (
                <div className="hidden md:flex items-center gap-1">
                  {[
                    { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
                    { href: "/admin/users/management", label: "Users", icon: "👥" },
                    { href: "/admin/reports", label: "Reports", icon: "📈" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isScrolled
                          ? isActiveLink(link.href)
                            ? "bg-[#37a0ac]/10 text-[#37a0ac]"
                            : "text-gray-600 hover:bg-gray-100"
                          : isActiveLink(link.href)
                          ? "bg-white/20 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* User Links */}
              {currentUser?.role === "user" && (
                <div className="hidden md:flex items-center gap-1">
                  {[
                    { href: "/dashboard", label: "Dashboard", icon: "🏠" },
                    { href: "/check", label: "Assessment", icon: "📝" },
                    { href: "/history", label: "History", icon: "📜" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isScrolled
                          ? isActiveLink(link.href)
                            ? "bg-[#37a0ac]/10 text-[#37a0ac]"
                            : "text-gray-600 hover:bg-gray-100"
                          : isActiveLink(link.href)
                          ? "bg-white/20 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Profile */}
            <div className="flex items-center gap-4">
              {/* Notifications (Optional) */}
              <button
                className={`hidden md:flex p-2 rounded-lg transition-colors relative ${
                  isScrolled ? "text-gray-600 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center gap-3 p-1.5 pr-3 rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "hover:bg-gray-100"
                      : "hover:bg-white/10"
                  } ${isProfileDropdownOpen ? (isScrolled ? "bg-gray-100" : "bg-white/10") : ""}`}
                >
                  <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden ring-2 ring-white/50">
                    <Image
                      src={currentUser?.avatar || "/images/profile.jpg"}
                      fill
                      sizes="40px"
                      alt="Profile Picture"
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {currentUser?.firstname || "Guest"}
                    </p>
                    <p
                      className={`text-xs transition-colors ${
                        isScrolled ? "text-gray-500" : "text-white/70"
                      }`}
                    >
                      {currentUser?.role === "admin" ? "Administrator" : "Member"}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${
                      isScrolled ? "text-gray-500" : "text-white/70"
                    } ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${
                    isProfileDropdownOpen
                      ? "opacity-100 scale-100 visible"
                      : "opacity-0 scale-95 invisible"
                  }`}
                >
                  {/* User Info Header */}
                  <div className="px-4 py-4 bg-gradient-to-r from-[#37a0ac] to-[#2d8a94]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50">
                        <Image
                          src={currentUser?.avatar || "/images/profile.jpg"}
                          fill
                          sizes="48px"
                          alt="Profile Picture"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">
                          {currentUser?.firstname} {currentUser?.lastname}
                        </p>
                        <p className="text-sm text-white/80">{currentUser?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">👤</span>
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">⚙️</span>
                      <span>Settings</span>
                    </Link>
                    <Link
                      href="/history"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">📊</span>
                      <span>Assessment History</span>
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">❓</span>
                      <span>Help & Support</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 py-2">
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="text-lg">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                  />
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`block h-0.5 rounded-full transition-all duration-300 ${
                      isScrolled ? "bg-gray-700" : "bg-white"
                    } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu for Dashboard */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`px-4 py-6 space-y-2 ${isScrolled ? "bg-white" : "bg-[#37a0ac]"}`}>
            {/* Admin Mobile Links */}
            {currentUser?.role === "admin" && (
              <>
                {[
                  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
                  { href: "/admin/users/management", label: "Users", icon: "👥" },
                  { href: "/admin/reports", label: "Reports", icon: "📈" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isScrolled
                        ? isActiveLink(link.href)
                          ? "bg-[#37a0ac]/10 text-[#37a0ac]"
                          : "text-gray-700 hover:bg-gray-100"
                        : isActiveLink(link.href)
                        ? "bg-white/20 text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}

            {/* User Mobile Links */}
            {currentUser?.role === "user" && (
              <>
                {[
                  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
                  { href: "/check", label: "Assessment", icon: "📝" },
                  { href: "/history", label: "History", icon: "📜" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                      isScrolled
                        ? isActiveLink(link.href)
                          ? "bg-[#37a0ac]/10 text-[#37a0ac]"
                          : "text-gray-700 hover:bg-gray-100"
                        : isActiveLink(link.href)
                        ? "bg-white/20 text-white"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}

            <div className={`border-t ${isScrolled ? "border-gray-200" : "border-white/20"} my-4`} />

            {/* Mobile Profile Links */}
            {[
              { href: "/profile", label: "My Profile", icon: "👤" },
              { href: "/settings", label: "Settings", icon: "⚙️" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={logout}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                isScrolled
                  ? "text-red-600 hover:bg-red-50"
                  : "text-red-300 hover:bg-red-500/20"
              }`}
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-[72px]" />
    </>
  );
};

export default Navbar;