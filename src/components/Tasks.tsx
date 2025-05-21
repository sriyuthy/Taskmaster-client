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


interface TaskData {
  _id: string;
  deadline: string;
  topic: string;
  title: string;
  status: "pending" | "completed" | "overdue";
  points: number | null;
  textbook: string | null;
  class: string; // class _id
}

interface ClassData {
  _id: string;
  name: string;
  timing: string;
  location: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);

  //Pull class details from user details
  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get<UserData>("http://localhost:4000/user/email/tejassraman@gmail.com")
        .then((userRes) => {
          console.log("success, change to not use hardcoded email");
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

  // Pull task details
  useEffect(() => {
    const fetchTaskData = () => {
      const requests = classes.map((cls) =>
        axios
          .get<TaskData[]>(`http://localhost:4000/task/classid/${cls?._id}`)
          .then((res) => res.data)
      );

      Promise.all(requests)
        .then((resultsArrays) => {
          const allTasks = resultsArrays.flat();
          setTasks(allTasks);
          console.log("fetched & set all tasks for graphs");
        })
        .catch((err) => {
          console.error("Error with task details", err);
        });
    };

    fetchTaskData();
  }, [classes]);

  return (
    <>
      <div
        className="px-4 py-4
              col-span-1 row-span-9 rounded-2xl flex flex-col h-146
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
      >
        <h2 className="text-white mb-3 font-bold">My Tasks</h2>
        <div className="pr-3 flex-1 grid grid-cols-3 gap-2 gap-x-2 overflow-y-auto scrollbar-cool rounded-2xl">
          {" "}
          {tasks.map((data) => {
            const date = new Date(data.deadline);
            const formattedDate = date.toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            const finalName =
              data.title.length <= 24
                ? data.title
                : `${data.title.slice(0, 24)}...`;

                let status : string = "";
              if(data.status === "completed") status = "Completed";
              if(data.status === "overdue") status = "Overdue";
              if(data.status === "pending") status = "Pending";
            return (
              <div
                key={data._id}
                className="border-blue-700 border-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] mt-3 px-4 py-2 rounded-md"
              >
                <p className="text-blue-200">
                  <span className="font-bold">Title:</span> {finalName}
                </p>
                <p className="text-blue-200">
                  <span className="font-bold">Due Date:</span> {formattedDate}
                </p>
                <p className="text-blue-200">
                  <span className="font-bold">Status:</span> {status}
                </p>
                <p className="text-blue-200">
                  <span className="font-bold">Points:</span>{" "}
                  {data && data.points}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
