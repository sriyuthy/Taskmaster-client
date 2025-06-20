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
  professor: string;
  timing: string;
  examDates: string[];
  topics: string[];
  gradingPolicy: string;
  contactInfo: string;
  textbooks: string[];
  location: string;
  user: string;
}

export default function ClassDisplay() {
  const [activeClass, setActiveClass] = useState<ClassData | null>(null);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const token = localStorage.getItem("token");

  // load class array
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

  // fetch class
  const fetchClass = (paramId: string) => {
    const cls = classes.find((cls) => cls._id === paramId);
    setActiveClass(cls ? cls : null);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-3 flex-1">
        {/* Class list */}
        <div
          className={`col-span-3 bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] rounded-2xl p-4 ${
            classes.length === 0 && "flex justify-center items-center flex-1"
          }`}
        >
          {classes.length === 0 ? (
            <p className="text-white text-1xl font-bold border-2 border-dashed p-3 rounded-2xl">
              Upload Syllabus first before accessing class manager
            </p>
          ) : (
            <h2 className="text-white mb-2 text-lg">Classes:</h2>
          )}
          {classes.map((c) => (
            <div
              key={c._id}
              onClick={() => fetchClass(c._id)}
              className="cursor-pointer mt-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] border border-blue-700 rounded-2xl p-3"
            >
              <p className="text-blue-100">{c.name}</p>
            </div>
          ))}
        </div>

        {/* Active resource display */}
        <div
          className={`col-span-9 bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] rounded-2xl py-4 px-6 not-even:flex flex-col items-start ${
            classes.length === 0 && "flex justify-center items-center flex-1"
          }`}
        >
          <h2 className="text-white text-lg mb-2">
            {activeClass && activeClass.name}
          </h2>

          {activeClass ? (
            <div className="mt-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] border border-blue-700 rounded-2xl p-3">
              <p className="text-blue-200">
                <span className="font-bold">Instructor: </span>
                {activeClass.professor}
              </p>
              <p className="text-blue-200">
                <span className="font-bold">Timing: </span> {activeClass.timing}
              </p>
              <p className="text-blue-200">
                <span className="font-bold">Exam Dates: </span>{" "}
              </p>
              <div className="mt-2 mb-2 bg-[#31258B] border border-blue-700 rounded-2xl max-h-30 overflow-y-auto scrollbar-cool p-3 text-white">
                <ul>
                  {activeClass.examDates.map((data) => {
                    const date = new Date(data);
                    const formatedDate = date.toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    });

                    return <li>- {formatedDate}</li>;
                  })}
                </ul>
              </div>
              <p className="text-blue-200">
                <span className="font-bold">Topics: </span>
              </p>
              <div className="mt-2 mb-2 bg-[#31258B] border border-blue-700 rounded-2xl max-h-30 overflow-y-auto scrollbar-cool p-3 text-white">
                <ul>
                  {activeClass.topics.map((topic) => (
                    <li>- {topic}</li>
                  ))}
                </ul>
              </div>
              <p className="text-blue-200">
                <span className="font-bold">Grading Policy: </span>
              </p>
              <div className="mt-2 mb-2 bg-[#31258B] border border-blue-700 rounded-2xl max-h-50 overflow-y-auto scrollbar-cool p-3 text-white">
                {activeClass.gradingPolicy}
              </div>
              <p className="text-blue-200">
                <span className="font-bold">Contact Info: </span>{" "}
                {activeClass.contactInfo}
              </p>
              <p className="text-blue-200">
                <span className="font-bold">Room: </span> {activeClass.location}
              </p>
            </div>
          ) : (
            <p className="text-blue-400 mx-auto">
              Select a Class
            </p>
          )}
        </div>
      </div>
    </>
  );
}
