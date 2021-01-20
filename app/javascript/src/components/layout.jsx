import React from "react";
import Header from "./header/Header";

function Layout(props) {
  return (
    <>
      <Header
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
      {props.children}
    </>
  );
}

export default Layout;
