import React from "react";
import HeaderAfterLogin from "./HeaderAfterLogin";
import HeaderBeforeLogin from "./HeaderBeforeLogin";

function Header({ currentUser, setCurrentUser }) {
  console.log(currentUser);
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

// {/* <header className="border-b-2 border-green-300 font-nunito py-3 shadow-md">
//       <div className="container">
//         <div className="flex justify-between items-center">
//           <div>
//             <div className="flex items-center">
//               <Link to="/">
//                 <img
//                   className="w-36 h-12"
//                   src="/img/conduit-logo-header-black-new.png"
//                   alt="logo"
//                 />
//               </Link>
//               {/* <Link
//                 to="/"
//                 className="text-2xl font-bold  text-white ml-6 border-l-2 border-white pl-4"
//               >
//                 Conduit
//               </Link> */}
//             </div>
//             <div></div>
//           </div>
//           <div>
//               <ul className="flex text-gray-900">
//                 <li>
//                   <NavLink
//                     className=" text-xl hover:text-green-400 tracking-wider"
//                     activeClassName="border-b border-green-400"
//                     to="/"
//                     exact
//                   >
//                     Home
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     className="ml-6 text-xl  hover:text-green-400 tracking-wider"
//                     activeClassName="border-b border-green-400"
//                     to="/"
//                     onClick={() => {
//                       setActiveModal("signup");
//                       open();
//                     }}
//                   >
//                     Signup
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink
//                     className="ml-6 text-xl  hover:text-green-400 border border-gray-600 py-2 px-5 rounded tracking-wider"
//                     activeClassName="border-b border-green-400"
//                     to="/"
//                     onClick={() => {
//                       setActiveModal("login");
//                       open();
//                     }}
//                   >
//                     Login
//                   </NavLink>
//                 </li>
//               </ul>
//       </div>
//     </header> */}
