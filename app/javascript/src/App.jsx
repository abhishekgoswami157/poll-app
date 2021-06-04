import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import usersApi from "./apis/users";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import UserContext from "./components/Context/UserContext";
import Dashboard from "./components/dashboard/Dashboard";
import PageLoader from "./components/PageLoader";
import CreatePoll from "./components/poll/createPoll/CreatePoll";
import ShowPoll from "./components/poll/showPoll/ShowPoll";

function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthComplete, setIsAuthComplete] = useState(true);

  async function fetchCurrentUser() {
    try {
      setIsAuthComplete(false);
      const response = await usersApi.show();
      setCurrentUser(response.data.current_user);
      setIsAuthComplete(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCurrentUser();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (!isAuthComplete) {
    return <PageLoader />;
  }
  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/polls">
            <Dashboard />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/polls/create">
            {currentUser ? <CreatePoll /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/polls/:id">
            {currentUser ? <ShowPoll /> : <Redirect to="/login" />}
          </Route>
          <Route component={FourOFour}></Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

function FourOFour() {
  return <h1>Page Not Found</h1>;
}

export default App;
