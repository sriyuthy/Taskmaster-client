import axios from "axios";
import { useEffect, useState } from "react";

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

interface ResourceData {
  _id: string;
  urls: string[];
  class: string;
}

export default function Resources() {
  const [activeResource, setActiveResource] = useState<ResourceData | null>(null);
  const [activeName, setActiveName] = useState("");
  const [classes, setClasses] = useState<ClassData[]>([]);
  const token = localStorage.getItem("token");

  // load first class
  useEffect(() => {
    axios
      .get<UserData>("http://localhost:3000/user/me",
        { headers: { "x-auth-token": token } })
      .then(({ data: user }) => {
        return axios.get<ClassData[]>(
          `http://localhost:3000/class/user/${user._id}`
        );
      })
      .then(({ data: cls }) => {
        setClasses(cls);
      })
      .catch((err) => {
        console.error("Error fetching user or classes:", err);
      });
  }, []);

  // fetch resource
  const fetchResource = (classId: string) => {
    axios
      .get<ResourceData[]>(`http://localhost:3000/resources/class/${classId}`)
      .then(({ data: resources }) => {
        setActiveResource(resources.length ? resources[0] : null);
        const matchedClass = classes.find((c) => c._id === classId);
        setActiveName(matchedClass ? matchedClass.name : "404 Error");
      })
      .catch((err) => {
        console.error("Bad Request fetching resource:", err);
      });
  };

  return (
      <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col">
        <h1 className="text-2xl mb-4 font-bold text-white">Resources</h1>

        <div className="grid grid-cols-12 gap-3 flex-1">
          {/* Class list */}
          <div className="col-span-3 bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] rounded-2xl p-4">
            <h2 className="text-white mb-2 text-lg">Classes:</h2>
            {classes.map((c) => (
              <div
                key={c._id}
                onClick={() => fetchResource(c._id)}
                className="cursor-pointer mt-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] border border-blue-700 rounded-2xl p-3"
              >
                <p className="text-blue-100">{c.name}</p>
              </div>
            ))}
          </div>

          {/* Active resource display */}
          <div className="col-span-9 bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] rounded-2xl py-4 px-6 flex-col items-start">
            <h2 className="text-white text-lg mb-2">Selected Class:</h2>

            {activeResource?.urls?.length ? (
              <div className="mt-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] border border-blue-700 rounded-2xl p-3">
                <p className="text-blue-200 mb-4">{activeName}</p>
                <div className="mt-2 bg-[#31258B] border border-blue-700 rounded-2xl p-3">
                  <ul className="list-disc ml-5 text-blue-100">
                    {activeResource.urls.map((url, i) => (
                      <li key={i}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-blue-400">
                Click a class to load its resources.
              </p>
            )}
          </div>
        </div>
      </main>
  );
}
