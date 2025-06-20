export default function Footer() {
  return (
    <>
      <footer className="bg-[#141950] pt-45 pb-10">
        <div className="mx-auto max-w-[1080px] px-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/LogoMaster.png"
                alt="TaskMasterAI Logo"
                className="h-10 w-10"
              />
              <div>
                <span className="text-xl font-bold text-white font-(family-name:--font-orbitron)">
                  TaskMasterAI
                </span>
                <p className="mt-1 text-sm text-gray-300">
                  Your all in one platform for academic success
                </p>
              </div>
            </div>
            <div className="flex gap-16">
              <div>
                <h3 className="mb-4 text-lg font-bold text-white">Team</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Error Reporting
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Interested in Contributing?
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-bold text-white">
                  Platform Info
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Leaderboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Goals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white">
                      Get Started
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-300">
              &copy; 2025 TaskMasterAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
