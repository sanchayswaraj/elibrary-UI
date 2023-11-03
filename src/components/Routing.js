import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import SurfBooks from "./SurfBooks";
import TakeQuiz from "./TakeQuiz";
import SubscriptionForm from "./SubscriptionForm";
import MyAccount from "./MyAccount";


function Routing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route path="/surf-ebooks" element={<SurfBooks />}></Route>
          <Route path="/take-quiz" element={<TakeQuiz />}></Route>
          <Route path="/subscription" element={<SubscriptionForm />}></Route>
          <Route path="/account" element={<MyAccount />}></Route>




        </Routes>
      </Router>
    </div>
  );
}

export default Routing;
