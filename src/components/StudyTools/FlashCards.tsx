export default function FlashCards() {
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1 gap-3 flex-1">
        <div
          className="
              col-span-3 row-span-1 rounded-2xl
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
        ></div>

        <div
          className="
              col-span-9 row-span-1 rounded-2xl justify-center items-center flex flex-1
              bg-[linear-gradient(90deg,_#00008B_0%,_#000080_84%)]
            "
        >
          {/*Implement friends chat and details later*/}
          <p className="text-white text-2xl font-bold border-2 border-dashed p-3 rounded-2xl">
            FlashCards chat coming soon
          </p>
        </div>
      </div>
    </>
  );
}
