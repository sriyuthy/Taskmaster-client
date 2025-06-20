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

//Form handlers
const fileSchema = z.object({
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "File is required",
  }),
});

type FormData = z.infer<typeof fileSchema>;

export default function DropBoxClass() {
  const [uploading, setUploading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const token = localStorage.getItem("token");

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
        .get<UserData>("http://localhost:3000/user/me",
        { headers: { "x-auth-token": token } })
        .then((userRes) => {
          console.log("success, change to not use hardcoded email");
          setUserInfo(userRes.data);
        })
        .catch((err) => {
          console.error("Error connection to server 3000", err);
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
        `http://localhost:3000/user/aisyllabus/${userId}/api/upload`,
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
      {/* Form submit box */}
      <div className=" bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] rounded-2xl p-4">
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
      </div>
    </>
  );
}
