export default function Chatbot() {
  return (
    <>
        <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col">
          <h1 className="text-2xl mb-4 font-bold text-white">AI Assistant</h1>
          <div className="grid grid-cols-12 grid-rows-10 gap-3 flex-1">
            {/* Chat Sidebar, click on class to ask questions */}
            <div
              className="
              col-span-3 row-span-9 rounded-2xl
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
            ></div>

            {/* Main chat area */}
            <div
              className="
              col-span-9 row-span-9 rounded-2xl justify-center items-center flex flex-1
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
            >
              {/*Implement friends chat and details later*/}
              <p className="text-white text-2xl font-bold border-2 border-dashed p-3 rounded-2xl">
                AI Assistant coming soon
              </p>
            </div>

            {/* Tools */}
            <div
              className="
              col-span-3 row-span-1 rounded-2xl justify-center items-center flex flex-1
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
            ></div>

            {/*  Messaging area */}
            <div
              className="
              col-span-8 row-span-1 rounded-2xl
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
            ></div>

            {/* Submit button */}
            <button
              className="
              col-span-1 row-span-1 rounded-2xl
              bg-[linear-gradient(90deg,#251BD8_0%,#3925D2_100%)]
            "
            >
              <h1 className="text-white font-bold text-2xl py-3 mx-7">
                <img
                  src="/mynaui--send-solid.svg"
                  alt="TaskMasterAI Logo"
                  className="h-8 w-auto flex-shrink-0"
                />
              </h1>
            </button>
          </div>
        </main>
    </>
  );
}
