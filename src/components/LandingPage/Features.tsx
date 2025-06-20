export default function Features() {
  return (
    <>
      <div className="mx-auto mt-20 mb-8 max-w-[1080px]">
        <div className="rounded-[30px] bg-[#262298] px-8 py-5">
          <h2 className="text-left text-[24px] max-w-[450px] font-bold leading-tight text-white font-(family-name:--font-orbitron)">
            Everything you need to automate your academic journey
          </h2>
          <div className="mt-16 flex items-start justify-between gap-8">
            <div className="flex-1">
              <p className="text-[16px] leading-normal text-gray-300">
                Track assignments, deadlines, and progress with our intuitive
                task management system
              </p>
              <p className="mt-4 text-[16px] leading-normal text-gray-300">
                Get alerts for upcoming deadlines and stay on top of your work.
              </p>
            </div>
            <img
              src="/DemoImages/Screenshot 2025-06-08 170302.png"
              alt="Task Management Demo"
              className="h-[352px] w-[671px] object-cover rounded-[20px]"
            />
          </div>
          <div className="mt-16 flex items-start justify-between gap-8 mb-8">
            <img
              src="/DemoImages/Screenshot 2025-06-08 170302.png"
              alt="Task Management Demo"
              className="h-[352px] w-[671px] object-cover rounded-[20px]"
            />
            <div className="flex-1">
              <p className="text-[16px] leading-normal text-gray-300">
                Easily add your assignments to our calendar by dropping your
                syllabus into our RAG powered AI Model and populate the
                assignments onto the calendar
              </p>
              <p className="mt-4 text-[16px] leading-normal text-gray-300">
                View class details with ease by using our class manager portal
                and access details such as the grading policy and units
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
