import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import usersApi from "./apis/users";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import UserContext from "./components/Context/UserContext";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import CreatePoll from "./components/poll/createPoll/CreatePoll";
import ShowPoll from "./components/poll/showPoll/ShowPoll";

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  async function fetchCurrentUser() {
    try {
      const response = await usersApi.show();
      setCurrentUser(response.data.current_user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/polls" component={Dashboard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/polls/create" component={CreatePoll} />
          <Route exact path="/polls/:id" component={ShowPoll} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
