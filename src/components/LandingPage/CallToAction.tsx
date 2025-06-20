import { useNavigate } from "react-router-dom";

export default function CallToAction() {
  const navigate = useNavigate();

  const signUp = () => {
    navigate("/login"); //Link to login for now
  }
  
  return (
    <>
      <div className="relative mt-80">
        <div className="mx-auto max-w-[1080px]">
          <div className="absolute -bottom-[110px] left-1/2 -translate-x-1/2 w-[655px] h-[298px] rounded-[30px] bg-[#450BA9] px-8 py-5">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-center text-[24px] font-bold leading-tight text-white font-(family-name:--font-orbitron)">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-center text-[16px] text-gray-300">
                Join the one of many students already using TaskMasterAI
              </p>
              <button className="font-(family-name:--font-orbitron) mt-8 rounded-full font-bold bg-gradient-to-r from-[#071881] to-[#09103C] px-8 py-3 text-white hover:opacity-90 cursor-pointer" onClick={signUp}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
