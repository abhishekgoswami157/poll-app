import React from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import HeaderBeforeLogin from "./HeaderBeforeLogin";

function Header({ currentUser, setCurrentUser }) {
  return currentUser ? (
    <HeaderAfterLogin
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
    />
  ) : (
    <HeaderBeforeLogin />
  );
}

export default Header;
