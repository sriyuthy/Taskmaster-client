import Sidebar from "@/components/Sidebar";
import Calendar from "./Calendar";
import Chatbot from "./Chatbot";
import ClassManager from "./ClassManager";
import Dashboard from "./Dashboard";
import TaskMasterNavbar from "./LandingPage";
import Leaderboard from "./Leaderbaord";
import Resources from "./Resources";
import Settings from "./Settings";
import StudyTools from "./StudyTools";
import { useEffect, useState } from "react";

interface Props {
  page: string;
}

export default function SocketLayout({ page }: Props) {
  const [activePage, setActivePage] = useState(page);

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  function renderPage() {
    switch (activePage) {
      case "calendar":
        return <Calendar />;
      case "chatbot":
        return <Chatbot />;
      case "classmanager":
        return <ClassManager />;
      case "dashboard":
        return <Dashboard />;
      case "splashpage":
        return <TaskMasterNavbar />;
      case "leaderboard":
        return <Leaderboard />;
      case "resources":
        return <Resources />;
      case "settings":
        return <Settings />;
      case "studytools":
        return <StudyTools />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <>
      <div className="w-full h-screen bg-[#040726] flex py-3 pl-3 overflow-hidden">
        <Sidebar />
        {renderPage()}
      </div>
    </>
  );
}
