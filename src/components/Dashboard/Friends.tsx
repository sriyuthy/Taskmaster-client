import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import ChatComponent from "./FriendChat/ChatComponent";

// Interfaces
interface FriendData {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserData {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  friendsList: string[];
}

const tabs = [{ label: "Chat" }, { label: "Add Friend" }]; //Part of mininavbar

export default function Friends() {
  const [query, setQuery] = useState("");
  const [friendAdd, setFriendAdd] = useState<FriendData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [friendsData, setFriendsData] = useState<FriendData[]>([]);
  const [activeTab, setActiveTab] = useState("Chat");
  const [activeFriend, setActiveFriend] = useState<FriendData | null>(null);
  const token = localStorage.getItem("token");

  function renderContent() {
    switch (activeTab) {
      case "Add Friend":
        return <AddFriend />;
      default:
        return <Chat />;
    }
  }

  useEffect(() => {
    axios
      .get<UserData>("http://localhost:3000/user/me", {
        headers: { "x-auth-token": token },
      })
      .then((userRes) => {
        setUser(userRes.data);
      })
      .catch((err) => {
        console.error("Error getting userdata", err);
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveTab("Add Friend");
  };

  const handleSubmitFriend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(query === user?.email) {
      setFriendAdd(null);
      return;
    }
    axios
      .get<FriendData>(`http://localhost:3000/user/email/${query}`)
      .then((friendRes) => {
        if(friendRes.data._id !== user?._id){
          setFriendAdd(friendRes.data);
        }
      })
      .catch((err) => {
        setFriendAdd(null);
        console.error("Critical Error, ", err);
      });
  };

  const updateFriendList = () => {
    axios
      .patch(`http://localhost:3000/user/add/${friendAdd?._id}/${user?._id}`)
      .then((updatedUser) => {
        setUser(updatedUser.data);
      })
      .catch((err) => {
        console.error("Critical Error: ", err);
      });
  };

  //Update friendlist
  useEffect(() => {
    if (!user?.friendsList?.length) return;

    Promise.all(
      user.friendsList.map((friendId) =>
        axios.get<FriendData>(
          `http://localhost:3000/user/userLookUp/${friendId}`
        )
      )
    )
      .then((responses) => {
        setFriendsData(responses.map((res) => res.data));
      })
      .catch((err) => {
        console.error("Error fetching friends data", err);
      });
  }, [user]);

  return (
    <div className="grid grid-cols-12 gap-3 h-full min-h-0">
      <div className="col-span-3 rounded-2xl bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] p-3 flex flex-col min-h-0">
        <form
          onSubmit={handleSubmitFriend}
          className="flex items-center bg-[#0006B1] border border-blue-600 rounded-full px-4 py-2"
        >
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search Friends"
            className="flex-grow bg-transparent focus:outline-none text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="ml-2 focus:outline-none cursor-pointer"
          >
            <Search className="w-5 h-5 text-gray-200" />
          </button>
        </form>
        {/* Display friends */}
        <div className="bg-[#31258B] mt-4 rounded-2xl p-2 border border-blue-800 flex-1 overflow-y-auto">
          {friendsData.map((c) => (
            <div
              onClick={() => setActiveFriend(c)}
              key={c._id}
              className={`cursor-pointer mt-2 bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] ${(activeFriend?._id === c._id) ? "border-green-700 border-3"  : "border-blue-600 border"} rounded-2xl p-3`}
            >
              <p className="text-blue-100">
                {c.firstName} {c.lastName}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`col-span-9 rounded-2xl bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)] p-3 flex flex-col min-h-0`}
      >
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
        <div className="flex-1 min-h-0 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );

  // Render 1: Add Friend
  function AddFriend() {
    return (
      <div
        className={` ${friendAdd ? "" : "flex items-center justify-center "}`}
      >
        {friendAdd ? (
          <>
            <p className="text-white font-bold">Friend Lookup:</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <button
                onClick={updateFriendList}
                className="text-left cursor-pointer px-4 py-2 text-white bg-[linear-gradient(90deg,_#3C3CB5_0%,_#4444C8_100%)] border border-blue-700 rounded-2xl"
              >
                <p className="text-blue-200">
                  <span className="font-bold">Name: </span>{" "}
                  <span className="truncate">
                    {friendAdd.firstName} {friendAdd.lastName}
                  </span>
                </p>
                <p className="text-blue-200">
                  <span className="font-bold">Email:</span>{" "}
                  <span className="truncate">{friendAdd.email}</span>
                </p>
                <p className="text-blue-200">
                  <span className="font-bold">ID:</span>{" "}
                  <span className="truncate">{friendAdd._id}</span>
                </p>
              </button>
            </div>
          </>
        ) : (
          <p className="text-white text-2xl border-2 border-dashed p-3 rounded-2xl font-bold">
            Search a Valid Friend to Add
          </p>
        )}
      </div>
    );
  }

  // Render 2: Chat
  function Chat() {
    return (
      <div className="h-full flex flex-col min-h-0">
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
          {/* Chat Panel */}
          <div className="col-span-8 bg-[#3389B2]/44 p-4 rounded-2xl flex flex-col min-h-0">
            {activeFriend ? (
              <>
                <p className="text-white mb-2">Chat with {activeFriend.userName}</p>
                {user && (
                  <ChatComponent activeFriend={activeFriend} userid={user._id} />
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-white text-2xl border-2 border-dashed p-3 rounded-2xl font-bold">
                  Click a Friend to chat
                </p>
              </div>
            )}
          </div>
          
          {/* Friend Details Panel */}
          <div className="col-span-4 bg-[#3389B2]/44 p-4 rounded-2xl min-h-0">
            {activeFriend ? (
              <>
                <p className="text-white">Contact Details:</p>
                <div className="text-white mt-2">
                  <p className="text-blue-200">
                    <span className="font-bold">Name: </span>{" "}
                    <span className="truncate">
                      {activeFriend?.firstName} {activeFriend?.lastName}
                    </span>
                  </p>
                  <p className="text-blue-200">
                    <span className="font-bold">Email:</span>{" "}
                    <span className="truncate">{activeFriend?.email}</span>
                  </p>
                  <p className="text-blue-200">
                    <span className="font-bold">ID:</span>{" "}
                    <span className="truncate">{activeFriend?._id}</span>
                  </p>
                </div>
              </>
            ) : (
              <p className="text-white">Click a Friend to view Details</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
