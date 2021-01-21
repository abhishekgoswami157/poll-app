import React, { useContext } from "react";
import UserContext from "../Context/UserContext";
import HeaderAfterLogin from "./HeaderAfterLogin";
import HeaderBeforeLogin from "./HeaderBeforeLogin";

function Header() {
  const { currentUser } = useContext(UserContext);

  return currentUser ? <HeaderAfterLogin /> : <HeaderBeforeLogin />;
}

export default Header;
