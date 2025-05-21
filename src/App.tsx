import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import ClassManager from "./pages/ClassManager";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import StudyTools from "./pages/StudyTools";
import Chatbot from "./pages/Chatbot";
import Leaderboard from "./pages/Leaderbaord";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="calendar" element={<Calendar/>} />
          <Route path="classManager" element={<ClassManager/>} />
          <Route path="studytools" element={<StudyTools/>} />
          <Route path="resources" element={<Resources/>} />
          <Route path="chatbot" element={<Chatbot/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="leaderboard" element={<Leaderboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
