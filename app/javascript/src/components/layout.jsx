import React from "react";
import Header from "./header/Header";

function Layout(props) {
  console.log(props, "PROPS IN LAYOUT");
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
