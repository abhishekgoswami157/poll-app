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
import CreatePoll from "./components/poll/createPoll/CreatePoll";
import ShowPoll from "./components/poll/showPoll/ShowPoll";

function App() {
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
        {/* <Switch>
          <Routes currentUser={currentUser} />
        </Switch> */}

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

function Routes({ currentUser }) {
  console.log("Comming in here in public routes");

  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/polls" component={Dashboard} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/polls/create"
        component={() => {
          console.log(currentUser);
          if (currentUser) {
            return <CreatePoll />;
          }

          return <Redirect to={{ pathname: "/login" }} />;
        }}
      />
      <Route exact path="/polls/:id" component={ShowPoll} />
      {/* <Route
        exact
        path="/polls/:id"
        component={() => {
          console.log(currentUser);
          if (currentUser) {
            return <ShowPoll />;
          }

          return <Redirect to={{ pathname: "/login" }} />;
        }}
      /> */}
    </>
  );
}

export default App;
