import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";

//Interfaces
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

const tabs : String[] = [];


export default function Resources() {



  const [activeTab, setActiveTab] = useState("Overview");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);

  //Pull class details from user details
  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get<UserData>("http://localhost:4000/user/email/tejassraman@gmail.com")
        .then((userRes) => {
          console.log("success, change to not use hardcoded email");
          setUserData(userRes.data);
          return axios.get<ClassData[]>(
            `http://localhost:4000/class/user/${userRes.data._id}`
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

  
  return (
    <>
      <div className="w-full min-h-screen bg-[#040726] flex py-3 pl-3 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-3 mr-3  bg-[#0B103E] rounded-2xl p-6 flex flex-col">
          <h1 className="text-2xl mb-4 font-bold text-white">Resources</h1>
          <div className="grid grid-cols-12 grid-rows-1 gap-3 flex-1">
        <div
          className="
              col-span-3 row-span-1 rounded-2xl
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
         >
          <h1 className="text-white mt-2 mx-3">Classes:</h1>
          <div className="p-2">            
            {classes.map((data) => {
              return (
              <div
              onClick={() => console.log(data._id)}
              key={data._id}
              className="cursor-pointer mt-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)]
              border border-blue-700 rounded-2xl p-3"
              >
                <p className="text-blue-100">
                  {data.name}
                </p>
              </div>)
            })

            }
            

          </div>
            
        </div>
        <div
          className="
              col-span-9 row-span-1 rounded-2xl justify-center items-center flex flex-1
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
        >
          {/*Implement friends chat and details later*/}
          <p className="text-white text-2xl font-bold border-2 border-dashed p-3 rounded-2xl">
            Resources coming soon
          </p>
        </div>
      </div>
        </main>
      </div>
    </>
  );
}
