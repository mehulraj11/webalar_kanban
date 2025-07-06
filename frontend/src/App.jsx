import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Singnup";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  // STATES
  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  }); //SIGNIN_STATE
  const [signupDetails, setSignupDetails] = useState({
    fullname: "",
    email: "",
    password: "",
  }); //SIGNUP_STATE
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Signin
                signinDetails={signinDetails}
                setSigninDetails={setSigninDetails}
              />
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <Signup
                signupDetails={signupDetails}
                setSignupDetails={setSignupDetails}
              />
            }
          ></Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
