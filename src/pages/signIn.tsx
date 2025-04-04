import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { UseUser } from "./_app";

const SignIn = () => {
  const { users } = UseUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  // Getting the current logged in user
  const { setCurrentUser } = UseUser();
  const handleSignIn = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const foundUser = users.find((user) => user.email === email);
    if (!foundUser) {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Can't find your account, make sure you fill the fields correctly.",
      });
    } else if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Email field is empty.",
      });
    } else if (password === "") {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Password field is empty.",
      });
    } else if (foundUser?.email != email || foundUser?.password != password) {
      Swal.fire({
        icon: "error",
        title: "Signing In!",
        text: "Your Email or Password is incorrect.",
      });
    }
    if (foundUser?.email === email && foundUser?.password === password) {
      setCurrentUser(foundUser);
      router.push("/dashboard");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center poppins-regular">
      <form
        onSubmit={handleSignIn}
        className="flex flex-col items-center justify-center border border-slate-300 shadow-lg shadow-slate-500 rounded-md p-10 gap-10"
      >
        {/* Logo */}
        <div className="flex items-start w-full">
          <Link href="/" className="flex items-center gap-3">
            <Image
              width={100}
              height={100}
              src={"/images/logo.png"}
              alt="Logo"
              className="cursor-pointer w-14 h-14"
            />
            <p>Ramz</p>
          </Link>
        </div>
        <p className="font-bold text-2xl">Sign In</p>
        {/* Input Fields */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="border-b px-3 py-2 flex items-center gap-3">
              <input
                type="email"
                name="email"
                id="email"
                className="outline-none"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="border-b px-3 py-2 flex items-center gap-3">
              <input
                type="password"
                name="password"
                id="password"
                className="outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Sign In Button */}
        <div className="w-full flex items-center justify-center border-b pb-8">
          <button
            type="submit"
            className="flex items-center justify-center bg-yellow-500 border border-yellow-500 w-full py-2 rounded-md cursor-pointer hover:bg-white duration-300"
          >
            Sign In
          </button>
        </div>
        {/* Sign Up Link */}
        <div className="flex items-center gap-2">
          <i>Don &#39; t have an account?</i>
          <Link href="/signUp" className="text-yellow-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
