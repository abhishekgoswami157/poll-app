import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import authApi from "../../apis/auth";
import UserContext from "../Context/UserContext";

function HeaderAfterLogin() {
  let { currentUser, setCurrentUser } = useContext(UserContext);

  let history = useHistory();

  async function handleLogout(event) {
    try {
      await authApi.logout();
      setCurrentUser(null);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="border-b-2 border-gray-300 font-nunito py-3 shadow-md">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <Link to="/">
                <h2 className="text-2xl font-bold text-gray-700 ">Poll-App</h2>
              </Link>
            </div>
          </div>

          <div>
            <ul className="flex text-gray-900">
              <li className="flex flex-col justify-center items-center text-red-600">
                <p className="hover:text-gray-400 tracking-wider">Welcome</p>
                <p className="hover:text-gray-400 tracking-wider">
                  {currentUser.name}
                </p>
              </li>
              <li>
                <NavLink
                  className="ml-6 text-xl hover:text-gray-400 tracking-wider"
                  activeClassName="border-b border-gray-400"
                  to="/"
                  exact
                >
                  Home
                </NavLink>
              </li>

              <li>
                <p
                  className="ml-6 text-xl  hover:text-gray-400 tracking-wider cursor-pointer"
                  // activeClassName="border-b border-gray-400"
                  onClick={() => handleLogout()}
                >
                  logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAfterLogin;
