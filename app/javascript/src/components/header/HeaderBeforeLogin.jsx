import React from "react";
import { Link, NavLink } from "react-router-dom";

function HeaderBeforeLogin() {
  return (
    <header className="border-b-2 border-gray-300 font-nunito py-3 shadow-md">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <Link to="/">
                <h2 className="text-xl font-bold text-gray-700 ">Poll-App</h2>
              </Link>
            </div>
          </div>

          <div>
            <ul className="flex text-gray-900">
              <li>
                <NavLink
                  className=" text-md hover:text-gray-400 tracking-wider"
                  activeClassName="border-b border-gray-400"
                  to="/"
                  exact
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="ml-6 text-md  hover:text-gray-400 tracking-wider"
                  activeClassName="border-b border-gray-400"
                  to="/signup"
                  exact
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="ml-6 text-md  hover:text-gray-400 tracking-wider"
                  activeClassName="border-b border-gray-400"
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBeforeLogin;
