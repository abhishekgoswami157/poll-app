import React from "react";
import Header from "./header/Header";

function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
}

export default Layout;
