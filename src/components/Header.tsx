import axios from "axios";
import { useEffect, useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
}

//Get current time
const currentTime = () => {
  let greeting: string = "";

  const now = new Date();
  const hours = now.getHours();

  if (hours >= 12 && hours < 18) {
    greeting = "Good Afternoon"; //Between 12pm to 6pm
  } else if (hours >= 18 && hours < 21) {
    greeting = "Good Evening"; //From 6pm to 9pm
  } else if ((hours >= 21 && hours <= 23) || (hours >= 0 && hours < 5)) {
    greeting = "Good Night"; //From 9pm to 5am
  } else {
    greeting = "Good Morning"; // From 5am to 12pm
  }
  console.log(hours);

  return greeting;
};

export default function Header() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const token = localStorage.getItem("token");

  //Pull user details
  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get("http://localhost:3000/user/me",
        { headers: { "x-auth-token": token } })
        .then((userRes) => {
          setUserData(userRes.data);
          console.log("success, change to not use hardcoded email");
        })
        .catch((err) => {
          console.error("Error connection to server 3000", err);
        });
    };
    fetchUserData();
  }, []);



  return (
    <header className="mb-6 flex flex-col space-y-4">
      {/* Greeting */}
      <div>
        <p className="text-sm text-white/70">{currentTime()}</p>
        <h1 className="text-2xl font-bold text-white">
          {userData && userData.firstName} {userData && userData.lastName}
        </h1>
      </div>
    </header>
  );
}
