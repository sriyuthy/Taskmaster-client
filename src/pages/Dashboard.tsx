import Header from "@/components/Header";
import Overview from "@/components/Dashboard/Overview";
import Tasks from "@/components/Dashboard/Tasks";
import Friends from "@/components/Dashboard/Friends";
import { useEffect, useState } from "react";
import axios from "axios";

const tabs = [{ label: "Overview" }, { label: "Tasks" }, { label: "Friends" }]; //Part of mininavbar

// Interfaces
interface UserData {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ClassData {
  _id: string;
  name: string;
  timing: string;
  location: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [classes, setClasses] = useState<ClassData[]>([]);
  const token = localStorage.getItem("token");

  //Pull class details from user details
  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get<UserData>("http://localhost:3000/user/me", {
          headers: { "x-auth-token": token },
        })
        .then((userRes) => {
          console.log("success, change to not use hardcoded email");
          return axios.get<ClassData[]>(
            `http://localhost:3000/class/user/${userRes.data._id}`
          );
        })
        .then((classRes) => {
          setClasses(classRes.data);
          console.log("success, change to not use hardcoded email");
        })
        .catch((err) => {
          console.error("Error with user details", err);
        });
    };
    fetchUserData();
  }, []);

  //Part of mininavbar
  function renderContent() {
    switch (activeTab) {
      case "Tasks":
        return <Tasks />;
      case "Friends":
        return <Friends />;
      default:
        return <Overview />;
    }
  }

  return (
      <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col min-h-0">
        <Header />
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
        {classes.length > 0 ? (
          <div className="flex-1 min-h-0 overflow-hidden">
            {renderContent()}
          </div>
        ) : (
          renderContent()
        )}
      </main>
  );
}
