import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ProfileInfo from "./ProfileInfo";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

// function Navbar({ isLoggedIn, onLogout }) {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

//   return (
//     <nav className="bg-blue-600 text-white px-4 py-3">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">
//           MERN Todo
//         </Link>

//         <div className="hidden md:flex space-x-6">
//           {!isLoggedIn ? (
//             <Link to="/login" className="hover:text-blue-300">
//               Login
//             </Link>
//           ) : (
//             <>
//               <Link to="/profile" className="hover:text-blue-300">
//                 Profile
//               </Link>
//               <button
//                 onClick={onLogout}
//                 className="hover:text-blue-300 focus:outline-none"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={toggleMobileMenu}
//           className="md:hidden text-2xl focus:outline-none"
//         >
//           {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-blue-700 mt-2 rounded shadow-lg">
//           <ul className="flex flex-col space-y-3 px-4 py-3">
//             {!isLoggedIn ? (
//               <li>
//                 <Link
//                   to="/login"
//                   className="hover:text-blue-300"
//                   onClick={toggleMobileMenu}
//                 >
//                   Login
//                 </Link>
//               </li>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     to="/profile"
//                     className="hover:text-blue-300"
//                     onClick={toggleMobileMenu}
//                   >
//                     Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={() => {
//                       onLogout();
//                       toggleMobileMenu();
//                     }}
//                     className="hover:text-blue-300 focus:outline-none"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const onLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="bg-white flex items-center justify-between px-20 py-2">
      <div>
        <h2 className="text-xl font-medium text-violet-950 py-2">MERN TODO</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        {userInfo && (
          <Link to="update-profile" className="">
            Upddate profile
          </Link>
        )}
        {userInfo && <ProfileInfo onLogout={onLogout} />}
      </div>
    </div>
  );
}

export default Navbar;
