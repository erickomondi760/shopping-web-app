import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Features/Cart/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../Features/User/UserSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const user = useSelector((user) => user.userState.user);
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    navigate("/");
    queryClient.removeQueries();
  };

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-elements flex justify-center sm:justify-end">
        {user ? (
          <div className="flex items-center sm:gap-8 gap-4">
            <p className="text-xs sm:text-sm">Hello {user.username}</p>
            <button
              className="btn btn-xs btn-primary btn-outline"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in/ Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
