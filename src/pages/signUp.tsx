import React, { useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { UseUser } from "./_app";
import { useRouter } from "next/router";
import {
  BiCheck,
  BiLock,
  BiUser,
} from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import {
  BsArrowRight,
  BsEye,
  BsEyeSlash,
  BsShieldCheck,
} from "react-icons/bs";
import { PiInfoFill } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";

const SignUp = () => {
  const { users, setUsers } = UseUser();
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: {
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};

    if (!firstname.trim()) {
      newErrors.firstname = "First name is required";
    } else if (firstname.length < 2) {
      newErrors.firstname = "First name must be at least 2 characters";
    }

    if (!lastname.trim()) {
      newErrors.lastname = "Last name is required";
    } else if (lastname.length < 2) {
      newErrors.lastname = "Last name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[0-9])/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const foundUser = users.find((user) => user.email === email);

    if (foundUser) {
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Email Already Exists",
        text: "An account with this email already exists. Please sign in or use a different email.",
        confirmButtonColor: "#37a0ac",
        showCancelButton: true,
        cancelButtonText: "Try Again",
        confirmButtonText: "Sign In",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-lg",
          cancelButton: "rounded-lg",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/signIn");
        }
      });
      return;
    }

    setUsers([
      ...users,
      {
        email,
        firstname,
        lastname,
        password,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        role: "user",
        avatar: "",
      },
    ]);

    await Swal.fire({
      icon: "success",
      title: "Account Created!",
      text: "Welcome to DRSchecker! Redirecting to sign in...",
      timer: 2000,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-2xl",
      },
    });

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsLoading(false);
    router.push("/signIn");
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "bg-red-500" };
    if (strength <= 3)
      return { strength, label: "Medium", color: "bg-yellow-500" };
    return { strength, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen w-full flex poppins-regular">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/bg1.jpg"
          alt="Peaceful background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#37a0ac]/90 to-[#2d8a94]/90" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/logo.png"
                alt="DRSchecker Logo"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <span className="text-2xl font-bold">
              DRS<span className="font-normal">checker</span>
            </span>
          </Link>

          {/* Middle Content */}
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Start Your Journey to
              <span className="block text-emerald-300">
                Better Mental Health
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Join thousands of users who are taking control of their mental
              wellness. Create your free account today and begin your
              transformation.
            </p>

            {/* Benefits */}
            <div className="space-y-4 pt-6">
              {[
                { icon: "✨", text: "Free Forever - No Credit Card Required" },
                { icon: "🎯", text: "Personalized Wellness Tracking" },
                { icon: "🔐", text: "Your Data is Always Private" },
                { icon: "📱", text: "Access Anywhere, Anytime" },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white/90"
                >
                  <span className="text-2xl">{benefit.icon}</span>
                  <span>{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex gap-8">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Check-ins" },
              { number: "4.9", label: "User Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-emerald-300">
                  {stat.number}
                </p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/logo.png"
                  alt="DRSchecker Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-[#37a0ac]">
                DRS<span className="font-normal text-gray-700">checker</span>
              </span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8 cursor-pointer">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-500">Start your wellness journey today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <BiUser
                        className={`w-5 h-5 ${
                          errors.firstname ? "text-red-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                        if (errors.firstname)
                          setErrors({ ...errors, firstname: undefined });
                      }}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                        errors.firstname
                          ? "border-red-300 bg-red-50 focus:border-red-500"
                          : "border-gray-200 focus:border-[#37a0ac] focus:bg-white bg-gray-50"
                      }`}
                      placeholder="Ramel"
                      autoComplete="given-name"
                    />
                  </div>
                  {errors.firstname && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <PiInfoFill className="w-4 h-4" />
                      {errors.firstname}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <BiUser
                        className={`w-5 h-5 ${
                          errors.lastname ? "text-red-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                        if (errors.lastname)
                          setErrors({ ...errors, lastname: undefined });
                      }}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                        errors.lastname
                          ? "border-red-300 bg-red-50 focus:border-red-500"
                          : "border-gray-200 focus:border-[#37a0ac] focus:bg-white bg-gray-50"
                      }`}
                      placeholder="Panis"
                      autoComplete="family-name"
                    />
                  </div>
                  {errors.lastname && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <PiInfoFill className="w-4 h-4" />
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MdOutlineEmail
                      className={`w-5 h-5 ${
                        errors.email ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                      errors.email
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-[#37a0ac] focus:bg-white bg-gray-50"
                    }`}
                    placeholder="ramelpanis@example.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <PiInfoFill className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BiLock
                      className={`w-5 h-5 ${
                        errors.password ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                      errors.password
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-[#37a0ac] focus:bg-white bg-gray-50"
                    }`}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <BsEye className="w-5 h-5" />
                    ) : (
                      <BsEyeSlash className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength.strength
                              ? passwordStrength.color
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-xs ${
                        passwordStrength.strength <= 2
                          ? "text-red-500"
                          : passwordStrength.strength <= 3
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      Password strength: {passwordStrength.label}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <PiInfoFill className="w-4 h-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <BsShieldCheck
                      className={`w-5 h-5 ${
                        errors.confirmPassword
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: undefined });
                    }}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl border-2 transition-all duration-300 outline-none ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50 focus:border-red-500"
                        : confirmPassword && password === confirmPassword
                          ? "border-green-300 bg-green-50 focus:border-green-500"
                          : "border-gray-200 focus:border-[#37a0ac] focus:bg-white bg-gray-50"
                    }`}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <BsEye className="w-5 h-5" />
                    ) : (
                      <BsEyeSlash className="w-5 h-5" />
                    )}
                  </button>
                  {confirmPassword && password === confirmPassword && (
                    <div className="absolute inset-y-0 right-12 flex items-center">
                      <BiCheck className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <PiInfoFill className="w-4 h-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => {
                        setAgreeToTerms(e.target.checked);
                        if (errors.terms)
                          setErrors({ ...errors, terms: undefined });
                      }}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded-md peer-checked:border-[#37a0ac] peer-checked:bg-[#37a0ac] transition-all duration-300 flex items-center justify-center ${
                        errors.terms ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <BiCheck
                        className={`w-3 h-3 text-white transition-opacity ${
                          agreeToTerms ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="text-[#37a0ac] hover:text-[#2d8a94] font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-[#37a0ac] hover:text-[#2d8a94] font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-sm flex items-center gap-1 ml-8">
                    <PiInfoFill className="w-4 h-4" />
                    {errors.terms}
                  </p>
                )}
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#37a0ac]/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <CgSpinner className="animate-spin h-6 w-6 text-white" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <BsArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">
                    Facebook
                  </span>
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="text-[#37a0ac] hover:text-[#2d8a94] font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Protected by reCAPTCHA and subject to our{" "}
            <Link href="/privacy" className="text-gray-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
