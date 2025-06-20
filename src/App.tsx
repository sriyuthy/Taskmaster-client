import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import SocketLayout from "./pages/Socket";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<SocketLayout page={"dashboard"} />} />
          <Route path="calendar" element={<SocketLayout page={"calendar"}/>} />
          <Route path="classManager" element={<SocketLayout page={"classmanager"}/>} />
          <Route path="studytools" element={<SocketLayout page={"studytools"}/>} />
          <Route path="resources" element={<SocketLayout page={"resources"}/>} />
          <Route path="chatbot" element={<SocketLayout page={"chatbot"}/>} />
          <Route path="settings" element={<SocketLayout page={"settings"}/>} />
          <Route path="leaderboard" element={<SocketLayout page={"leaderboard"}/>}/>
          <Route path="" element={<LandingPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
