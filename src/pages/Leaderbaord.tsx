import Sidebar from "@/components/Sidebar";

export default function Leaderboard() {
  return (
    <>
      <div className="w-full min-h-screen bg-[#040726] flex py-3 pl-3 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-3 mr-3 bg-[#0B103E] rounded-2xl p-6 flex flex-col">
          <h1 className="text-2xl mb-4 font-bold text-white">Leaderboard</h1>
          <div
            className="flex justify-center items-center flex-1
              col-span-1 row-span-9 rounded-2xl
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
          >
            {/* Implement task cards later */}
            <p className="text-white text-2xl font-bold border-2 border-dashed p-3 rounded-2xl">
              Leaderboard feature coming soon
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
