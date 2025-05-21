import Sidebar from "@/components/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  professor: string;
  location: string;
  gradingPolicy: string;
}

//Form handlers
const fileSchema = z.object({
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "File is required",
  }),
});

type FormData = z.infer<typeof fileSchema>;

export default function ClassManager() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [uploading, setUploading] = useState(false); //For upload button
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  //Form variables from zod
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(fileSchema),
  });

  //Pull class details from user details
  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get<UserData>("http://localhost:4000/user/email/tejassraman@gmail.com")
        .then((userRes) => {
          console.log("success, change to not use hardcoded email");
          setUserInfo(userRes.data);
          return axios.get<ClassData[]>(
            `http://localhost:4000/class/user/${userRes.data._id}`
          );
        })
        .then((classRes) => {
          setClasses(classRes.data);
          console.log("success, change to not use hardcoded email");
        })
        .catch((err) => {
          console.error("Error connection to server 4000", err);
        });
    };
    fetchUserData();
  }, []);

  //Upload handlrs
  const fileName = watch("file")?.[0]?.name ?? null;

  const syllabusHandler = async (data: FormData) => {
    setUploading(true);
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const userId = userInfo?._id;
    axios
      .post(
        `http://localhost:4000/user/aisyllabus/${userId}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        reset();
      })
      .catch((error) => {
        console.error("Upload error: ", error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#040726] flex py-3 pl-3">
        <Sidebar />
        <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col">
          <h1 className="text-2xl mb-4 font-bold text-white">Class Manager</h1>
          <div className="flex flex-col items-center justify-start space-y-6 flex-1 rounded-2xl bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] p-6 overflow-hidden">
            {/* Form submit box */}
            <form onSubmit={handleSubmit(syllabusHandler)} className="w-full">
              <label className="relative w-full h-52 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-7">
                <img
                  src="/material-symbols--upload.svg"
                  className="w-10 h-10 mb-2"
                  alt="Upload Icon"
                />
                <h2 className="text-white text-2xl font-bold text-center">
                  Drop your PDF here
                  <br />
                  <p className="text-sm text-gray-400">
                    {fileName ? (
                      <p className="mt-3">
                        <strong>Selected File:</strong> {fileName}
                      </p>
                    ) : (
                      <p className="mt-3">
                        Drag and drop or browse to upload. Max file size: 10MB
                      </p>
                    )}
                  </p>
                </h2>
                {errors.file && (
                <p className="text-destructive text-sm mt-1">
                  {errors.file.message}
                </p>
                )}
                <input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register("file")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-[linear-gradient(to_right,#191970_0%,#3030D6_100%)] hover:bg-[linear-gradient(to_right,#191970_0%,#3030D6_50%)] text-primary-foreground rounded-md transition disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </form>
            {/* Classes grid */}
            <div className="w-full flex-1 grid grid-cols-3 gap-4 max-h-83 pr-4 overflow-y-auto scrollbar-cool">
              {classes.map((data) => (
                <div
                  key={data._id}
                  className="border-2 border-blue-700 rounded-md bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] p-4"
                >
                  <p className="text-blue-200">
                    <span className="font-bold">Title:</span> {data.name}
                  </p>
                  <p className="text-blue-200">
                    <span className="font-bold">Timing:</span> {data.timing}
                  </p>
                  <p className="text-blue-200">
                    <span className="font-bold">Location:</span> {data.location}
                  </p>
                  <div className="text-blue-200">
                    <span className="font-bold">Grading Policy:</span>
                    <p className="mt-2 border-2 border-blue-700 rounded-md bg-[#1C2032]/50 p-2">
                      {data.gradingPolicy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
