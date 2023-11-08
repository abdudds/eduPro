import './App.css'
import SignUpPage from './pages/Auth/signUpPage'
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import UserRouter from './Router/UserRouter';
import TutorRouter from "./Router/TutorRouter";

function App() {

  
  return (
    <>
      {/* <div>
        <SignUpPage/>
      </div> */}
      <Router>
        <Routes>
          <Route exact path="/*" element={<UserRouter/>} />
          <Route exact path="/tutor/*" element={<TutorRouter />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
