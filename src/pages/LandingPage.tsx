import { useState } from "react";
import Hero from "@/components/LandingPage/Hero";
import LearnMore from "@/components/LandingPage/LearnMore";
import Features from "@/components/LandingPage/Features";
import Carosuel from "@/components/LandingPage/Carosuel";
import AdditionalFeatures from "@/components/LandingPage/AdditionalFeatures";
import CallToAction from "@/components/LandingPage/CallToAction";
import Footer from "@/components/LandingPage/Footer";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [solid, setSolid] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  }

  const signUp = () => {
    navigate("/login"); //Link to login for now
  }

  return (
    <div
      onScroll={(e) => setSolid(e.currentTarget.scrollTop > 90)}
      className="fixed inset-0 min-h-screen w-full overflow-y-auto scrollbar-cool bg-gradient-to-b from-[#110556] to-[#160627]"
    >
      <nav
        className={`fixed left-0 right-0 top-0 z-50 mx-auto mt-5 flex max-w-[900px] items-center justify-between rounded-[40px] ${
          solid ? "border border-[#010EFF]" : ""
        } bg-gradient-to-r from-[#242091]/70 to-[#090979]/80 px-4 py-2 backdrop-blur-sm`}
      >
        <div className="flex items-center gap-3">
          <img
            src="/LogoMaster.png"
            alt="TaskMasterAI Logo"
            className="h-10 w-10"
          />
          <span className="text-xl font-semibold text-white font-(family-name:--font-orbitron)">TaskMasterAI</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-bold text-white hover:text-gray-200 cursor-pointer" onClick={handleLogin}>
            Login
          </button>
          <button className="rounded-full font-bold bg-gradient-to-r from-[#191970] to-[#3030D6] px-6 py-2 text-white hover:opacity-90 cursor-pointer" onClick={signUp}>
            Sign Up
          </button>
        </div>
      </nav>
      <Hero/>
      <LearnMore/>
      <Features/>
      <Carosuel/>
      <AdditionalFeatures/>
      <CallToAction/>
      <Footer/>
    </div>
  );
}
