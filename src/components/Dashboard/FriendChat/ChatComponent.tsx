import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { io, Socket } from "socket.io-client";
import { useEffect, useState, useRef } from "react";

// Chat Interfaces
const messageSchema = z.object({
  text: z.string().min(1, "Message cant be empty"),
});

type MessageForm = z.infer<typeof messageSchema>;

interface ChatMessage {
  sender: string;
  text: string;
  createdAt: string;
}

// Interfaces
interface FriendData {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

const socket: Socket = io("http://localhost:3000");

interface ChatComponentProps {
  userid: string | null;
  activeFriend: FriendData;
}

export default function ChatComponent({
  userid,
  activeFriend,
}: ChatComponentProps) {
  useEffect(() => {
    console.log(userid);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageForm>({ resolver: zodResolver(messageSchema) });

  useEffect(() => {
    if (!activeFriend || !userid) return;
    socket.emit("history", { userId: userid, friendId: activeFriend._id });
  }, [activeFriend, userid]);

  useEffect(() => {
    socket.on("history", (hist: ChatMessage[]) => setMessages(hist));
    socket.on("message", (data: { message: ChatMessage, senderId: string, receiverId: string }) => {
      const { message, senderId, receiverId } = data;
      if ((senderId === userid && receiverId === activeFriend._id) || 
          (senderId === activeFriend._id && receiverId === userid)) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("history");
      socket.off("message");
    };
  }, [userid, activeFriend]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior : "auto"});
  }, [messages]);

  const onSubmit = (data: MessageForm) => {
    if (!activeFriend) return;
    socket.emit("message", {
      userId: userid,
      friendId: activeFriend._id,
      text: data.text.trim(),
    });
    reset();
  };

  return (
    <>
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-col flex-1 min-h-0 gap-2">
          <div className="flex-1 overflow-y-auto space-y-2 bg-[#3389B2]/44 rounded-2xl p-4 scrollbar-cool">
            {messages.map((m, idx) => {
              const isMine = m.sender === userid;
              return (
                <div
                  key={idx}
                  className={`break-words px-2 py-2 rounded-lg text-white ${
                    isMine
                      ? "bg-blue-500 self-end ml-auto"
                      : "bg-gray-700 self-start mr-auto"
                  }`}
                  style={{ 
                    maxWidth: "60%",
                    width: "fit-content",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {m.text}
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center gap-2 p-3 bg-[#000080]/50 rounded-2xl"
          >
            <input
              {...register("text")}
              className="flex-1 px-3 py-2 rounded-l-lg focus:outline-none text-white bg-transparent"
              placeholder="Type a message…"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-r-lg text-white hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
            {errors.text && (
              <span className="text-red-400 ml-2">{errors.text.message}</span>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
