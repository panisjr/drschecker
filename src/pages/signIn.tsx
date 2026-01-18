import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { User, UseUser } from "./_app";

const userData: User = {
  currentUserEmail: "admin@gmail.com",
  email: "admin@gmail.com",
  firstname: "Ramel",
  lastname: "Panis",
  password: "admin1234",
  date: "August 2, 2002",
  role: "admin",
  avatar: "/images/j.jpeg",
};

const SignIn = () => {
  const { users, setCurrentUser } = UseUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const foundAdmin = userData.email === email;

    if (foundAdmin) {
      if (userData.email !== email || userData.password !== password) {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: "Your email or password is incorrect.",
          confirmButtonColor: "#37a0ac",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        return;
      }

      if (userData.role === "admin" && userData.password === password) {
        setCurrentUser(userData);

        await Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: `Hello, ${userData.firstname}! Redirecting to dashboard...`,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-2xl",
          },
        });

        setEmail("");
        setPassword("");
        router.push("/admin");
      }
    } else {
      const foundUser = users.find((user) => user.email === email);

      if (!foundUser) {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Account Not Found",
          text: "We couldn't find an account with this email. Please check your email or create a new account.",
          confirmButtonColor: "#37a0ac",
          showCancelButton: true,
          cancelButtonText: "Try Again",
          confirmButtonText: "Sign Up",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
            cancelButton: "rounded-lg",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/signUp");
          }
        });
        return;
      }

      if (foundUser?.password !== password) {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Incorrect Password",
          text: "The password you entered is incorrect. Please try again.",
          confirmButtonColor: "#37a0ac",
          customClass: {
            popup: "rounded-2xl",
            confirmButton: "rounded-lg",
          },
        });
        return;
      }

      if (foundUser?.email === email && foundUser?.password === password) {
        setCurrentUser(foundUser);

        await Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: `Hello, ${foundUser.firstname}! Redirecting to your dashboard...`,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-2xl",
          },
        });

        setEmail("");
        setPassword("");
        router.push("/users");
      }
    }

    setIsLoading(false);
  };

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
                className="object-contain brightness-0 invert"
              />
            </div>
            <span className="text-2xl font-bold">
              DRS<span className="font-normal">checker</span>
            </span>
          </Link>

          {/* Middle Content */}
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Welcome Back to Your
              <span className="block text-emerald-300">Wellness Journey</span>
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Continue tracking your mental wellness with clarity and care. Your
              well-being matters to us.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-6">
              {[
                { icon: "🔒", text: "Secure & Private" },
                { icon: "📊", text: "Track Your Progress" },
                { icon: "💬", text: "AI-Powered Insights" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-white/90"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="space-y-2">
            <p className="text-white/60 text-sm">
              &quot;Taking care of your mental health is an act of
              self-love.&quot;
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-emerald-300" />
              <span className="text-white/80 text-sm">DRSchecker Team</span>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
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
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Sign In
              </h2>
              <p className="text-gray-500">
                Welcome back! Please enter your details.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
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
                    <svg
                      className={`w-5 h-5 ${
                        errors.email ? "text-red-400" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
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
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
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
                    <svg
                      className={`w-5 h-5 ${
                        errors.password ? "text-red-400" : "text-gray-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#37a0ac] peer-checked:bg-[#37a0ac] transition-all duration-300 flex items-center justify-center">
                      <svg
                        className={`w-3 h-3 text-white transition-opacity ${
                          rememberMe ? "opacity-100" : "opacity-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#37a0ac] hover:text-[#2d8a94] font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#37a0ac] to-[#2d8a94] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#37a0ac]/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
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
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
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
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
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

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signUp"
                className="text-[#37a0ac] hover:text-[#2d8a94] font-semibold transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-gray-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-gray-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
