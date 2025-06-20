import ClassDisplay from "@/components/ClassManager/ClassDisplay";
import DropBoxClass from "@/components/ClassManager/DropBox";
import { useState } from "react";

const tabs = [{ label: "Class Management" }, { label: "Drop Syllabus" }]; //Part of mininavbar

export default function ClassManager() {
  const [activeTab, setActiveTab] = useState("Class Management");

  //Part of mininavbar
  function renderContent() {
    switch (activeTab) {
      case "Class Management":
        return <ClassDisplay />;
      default:
        return <DropBoxClass />;
    }
  }

  return (
    <>
        <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col">
          <h1 className="text-2xl mb-4 font-bold text-white">Class Manager</h1>
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
          {renderContent()}
        </main>
    </>
  );
}
