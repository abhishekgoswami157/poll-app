import React from "react";
import { Link, NavLink } from "react-router-dom";
import authApi from "../../apis/auth";

function HeaderAfterLogin({ currentUser, setCurrentUser }) {
  // const handleLogout = async () => {
  //   try {
  //     await authApi.logout();
  //     setToLocalStorage({ authToken: null, email: null, userId: null });
  //     resetAuthTokens();
  //     window.location.href = "/";
  //   } catch (error) {
  //     logger.error(error);
  //   }
  // };
  async function handleLogout(event) {
    console.log("entered in logout");
    try {
      authApi.logout();
      setCurrentUser(null);
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
                {/* <img className="w-36 h-12"
                  src="/img/conduit-logo-header-black-new.png"
                  alt="logo"/> */}
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
                <Link
                  className="ml-6 text-xl  hover:text-gray-400 tracking-wider"
                  activeClassName="border-b border-gray-400"
                  to="/"
                  onClick={() => handleLogout()}
                >
                  logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAfterLogin;