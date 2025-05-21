import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#040726] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 bg-[#060B3B] p-4 rounded-2xl border border-blue-900">
        <a target="blank" href="https://github.com/Traman2/TaskMasterAI_v2" className="flex items-center gap-2 self-center font-bold">
          <div className="flex h-6 w-6 items-center justify-center rounded-md">
            <img
              src="LogoMaster.png"
              alt="TaskMasterAI Logo"
            />
          </div>
          <p>
            <span className="bg-gradient-to-r from-[#B09AFF] to-[#465FFF] bg-clip-text text-transparent">TaskMasterAI</span>
            <br/>
          <span className="text-white">Temp login form</span>
          </p>
          
        </a>
        <button className="border-blue-600 bg-blue-800 text-white rounded-2xl py-2 hover:cursor-pointer font-bold" onClick={onSubmit}>Go to dashboard</button>
      </div>
    </div>
  )
}
