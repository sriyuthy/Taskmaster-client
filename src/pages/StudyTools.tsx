import FlashCards from "@/components/FlashCards";
import Quizzes from "@/components/Quizzes";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const tabs = [{ label: "Flashcards" }, { label: "Quizzes" }]; //Part of mininavbar


export default function StudyTools() {
  const [activeTab, setActiveTab] = useState("Flashcards");
  function renderContent() {
      switch (activeTab) {
        case "Quizzes":
          return <Quizzes />;
        default:
          return (
            <FlashCards/>
          );
      }
    }
  return (
    <>
      <div className="w-full min-h-screen bg-[#040726] flex py-3 pl-3 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col">
        <h1 className="text-2xl mb-4 font-bold text-white">Study Tools</h1>
          {/* part of mininavbar */}
        <nav
          className="
            mb-4 inline-flex space-x-2 rounded-full p-1 w-max
            bg-[linear-gradient(to_right,#0D0C27_0%,#090979_100%)]
          "
        >
          {tabs.map(({ label }) => {
            const isActive = activeTab === label;
            return (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`
                  px-4 py-1 rounded-full font-medium transition text-white
                  ${
                    isActive
                      ? "bg-[linear-gradient(to_right,#191970_0%,#3030D6_100%)]"
                      : "bg-transparent hover:bg-white/20"
                  }
                `}
              >
                {label}
              </button>
            );
          })}
        </nav>
        {/* put mininavbar as a component later */}

        {renderContent()}
        </main>
      </div>
    </>
  );
}
