import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const navItems = [
    {
      icon: "/sidebarLogos/stash--dashboard-duotone.svg",
      label: "Overview",
      link: "/dashboard",
    },
    {
      icon: "/sidebarLogos/fluent--class-24-regular.svg",
      label: "Class Manager",
      link: "/classManager",
    },
    {
      icon: "/sidebarLogos/grommet-icons--resources.svg",
      label: "Resources",
      link: "/resources",
    },
    {
      icon: "/sidebarLogos/solar--calendar-linear.svg",
      label: "Calendar",
      link: "/calendar",
    },

    {
      icon: "/sidebarLogos/arcticons--flashcards.svg",
      label: "Study Tools",
      link: "/studytools",
    },
    {
      icon: "/sidebarLogos/ph--robot.svg",
      label: "AI Assistant",
      link: "/chatbot",
    },
    {
      icon: "/sidebarLogos/material-symbols--social-leaderboard-outline-rounded.svg",
      label: "Leaderboard",
      link: "/leaderboard",
    },
    {
      icon: "/sidebarLogos/mage--settings.svg",
      label: "Settings",
      link: "/settings",
    },
  ];

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <aside className="relative w-57 bg-[#0B103E] rounded-2xl flex flex-col p-6">
        <div className="flex items-center mb-4">
          <img
            src="/LogoMaster.png"
            alt="TaskMasterAI Logo"
            className="h-8 w-auto flex-shrink-0"
          />
          <span className="font-extrabold text-xl hover:cursor-pointer bg-gradient-to-r from-[#B09AFF] to-[#465FFF] bg-clip-text text-transparent whitespace-nowrap">
            TaskMasterAI
          </span>
        </div>
        <hr className="border-gray-700 mb-5" />
        <nav className="flex-1 space-y-4 mt-5">
          {navItems.map(({ icon, label, link }) => (
            <button
              key={label}
              onClick={() => navigate(link)}
              className="flex items-center space-x-3 text-white text-base hover:text-blue-400 transition-colors hover:cursor-pointer"
            >
              <img
                src={icon}
                alt={`${label} icon`}
                className="w-5 h-5 flex-shrink-0"
              />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Instructions stuff and logout button */}
        <div className="bg-[#2f333b60] p-3 rounded-3xl text-white text-center">
          <div className="flex items-center ml-4 space-x-2 mb-4">
            <img
              src="/sidebarLogos/fluent-color--warning-16.svg"
              className="w-5 h-5 flex-shrink-0"
            />
            <span className="font-bold">Pre-release</span>
          </div>

          <p className="text-sm">
            Please provide feedback to{" "}
            <a
              target="blank"
              className="underline text-gray-400 text-sm"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfDj5b3Q9GMwtrOaHK08BC0WK0OFvV71s5Kyf4HvjH5YbLKyA/viewform?usp=sharing"
            >
              Dev Team
            </a>
          </p>

          <button
            className="mt-5 w-full py-2 rounded-full text-white font-medium hover:opacity-90 transition-opacity
             bg-[linear-gradient(to_right,#273B7F_0%,#090979_100%)] hover:cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
