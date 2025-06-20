import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";  // make sure this matches what you installed

export default function Hero() {
  const navigate = useNavigate();

  const signUp = () => {
    navigate("/login"); // Link to login for now
  };
  
  return (
    <div className="mx-auto mt-35 max-w-[800px]">
      <div className="h-[425px] rounded-[40px] bg-[#262298] px-13 py-11">
        <div className="h-full w-full rounded-[35px] bg-[#3530D0] p-1">
          <h1 className="mt-7 px-[2px] text-center text-[32px] font-bold leading-tight text-white font-(family-name:--font-orbitron)">
            A smarter way to manage your <br /> chaos
          </h1>
          <p className="mx-auto mt-4 max-w-[400px] text-center text-[14px] text-white">
            Connect with peers, manage tasks, compete with others and excel in
            your studies together.
          </p>
          <div className="mx-auto mt-12 flex max-w-[600px] justify-center">
            <motion.button
              onClick={signUp}
              className="font-(family-name:--font-orbitron) font-bold rounded-full bg-gradient-to-r from-[#191970] to-[#1E1E3D] px-6 py-2 text-white hover:opacity-90 cursor-pointer"
              animate={{
                // pulse scale
                scale: [1, 1.05, 1],
                // subtle blue glow
                boxShadow: [
                  "0 0 0px rgba(30,30,61, 0)",
                  "0 0 20px rgba(30,30,61, 0.5)",
                  "0 0 0px rgba(30,30,61, 0)",
                ],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
