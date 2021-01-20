import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import CreatePoll from "./components/poll/createPoll/CreatePoll";
import ShowPoll from "./components/poll/showPoll/ShowPoll";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    registerIntercepts();
    setAuthHeaders(setLoading);
  });

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/polls" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/polls/:id" component={ShowPoll} />
      </Switch>
    </Router>
  );
};

export default App;
