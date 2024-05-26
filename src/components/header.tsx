import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface PropsType {
  user: User | null;
}


const Header = ({ user }: PropsType) => {    
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    // try {
    //   await signOut(auth);
    //   toast.success("Sign Out Successfully");
    //   setIsOpen(false);
    // } catch (error) {
    //   toast.error("Sign Out Fail");
    // }
  };

  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link  to="/admin/dashboard"   onClick={() => setIsOpen(false)} >   
                  Admin
               </Link>     
              )}

              <Link  to="/orders" onClick={() => setIsOpen(false)}>  
                Orders
              </Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
