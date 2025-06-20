import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(9, "Password must be at least 9 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [setInvalidPass, setSetInvalidPass] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    await axios
      .post("http://localhost:3000/auth", data)
      .then((response) => {
        const token = response.data;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/dashboard");
        } else {
          console.error("404 Error while authenticating");
        }
      })
      .catch((error) => {
        console.error(
          "Login error: ",
          error.response?.data?.message || error.message
        );
        setSetInvalidPass(true);
      });
  };


  const landingPage = () => {
    navigate("/");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#040726] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 bg-[#060B3B] p-6 rounded-2xl border border-blue-900 shadow-2xl">
        <div className="flex items-center gap-2 self-center font-bold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md">
            <img
              src="LogoMaster.png"
              alt="TaskMasterAI Logo"
            />
          </div>
          <p>
            <span onClick={landingPage} className="hover:cursor-pointer bg-gradient-to-r from-[#B09AFF] to-[#465FFF] bg-clip-text text-transparent">
              TaskMasterAI
            </span>
          </p>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-semibold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="w-full px-3 py-2.5 bg-[#0A1048] border border-blue-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#465FFF] focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-400 text-xs">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="w-full px-3 py-2.5 bg-[#0A1048] border border-blue-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#465FFF] focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">{errors.password.message}</span>
            )}
          </div>

          {setInvalidPass && (
            <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-2">
              Invalid email or password. Please try again.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#465FFF] to-[#B09AFF] hover:from-[#3651E6] hover:to-[#9A85E6] text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#465FFF] focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <span className="text-[#B09AFF] hover:text-[#465FFF] cursor-pointer font-medium transition-colors">
              Sign up#
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
