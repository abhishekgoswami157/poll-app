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
import Home from "./components/Home";
import CreatePoll from "./components/poll/createPoll/CreatePoll";
import ShowPoll from "./components/poll/showPoll/ShowPoll";

function App(props) {
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
        {/* {currentUser ? <PrivateRoute /> : <PublicRoute />} */}
        {/* <Switch>
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
          <Route exact path="/polls/create"> */}
        {/* {currentUser ? <CreatePoll /> : <Redirect to="/login" />} */}
        {/* <CreatePoll />
          </Route>
          <Route exact path="/polls/:id"> */}
        {/* {currentUser ? <ShowPoll /> : <Redirect to="/login" />} */}
        {/* <ShowPoll />
          </Route>
          <Route component={FourOFour}></Route>
        </Switch> */}

        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/polls" component={Dashboard} />
          <Route exact path="/polls/create" component={CreatePoll} />
          <Route exact path="/polls/:id" component={ShowPoll} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route component={FourOFour} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

function FourOFour() {
  return <h1>Page Not Found</h1>;
}

function PrivateRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/polls" component={Dashboard} />
      <Route exact path="/polls/create" component={CreatePoll} />
      <Route exact path="/polls/:id" component={ShowPoll} />
    </Switch>
  );
}
function PublicRoute() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/polls" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default App;
