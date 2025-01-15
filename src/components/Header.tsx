import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";

const Header = () => {
  const { user, signoutUser } = useGlobalContext();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signoutUser();
    navigate("/");
  };
  useEffect(() => {
    console.log(user, " <-- USER IN HEADER");
  }, [user]);
  return (
    <header className="bg-neutral-950 text-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-4 flex items-end justify-between gap-4">
        <Link to={"/"}>
          <h1 className="text-4xl mr-8">Athlete 2 Athlete</h1>
        </Link>
        <ul className="flex space-x-8">
          <li className="hover:text-green-400 transition-colors">
            <Link to="/spotlight-form">Athlete Info Form</Link>
          </li>
          <li className="hover:text-green-500 transition-colors">
            <Link to="/testimonial-form">Testimonial Form</Link>
          </li>{" "}
          {user ? (
            <li
              onClick={signoutUser}
              className="hover:text-green-500 transition-colors"
            >
              Sign Out
            </li>
          ) : (
            <>
              <li className="hover:text-green-500 transition-colors">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-green-500 transition-colors">
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {/* <li className="hover:text-green-500 transition-colors">
            <Link to="https://a2a-training.netlify.app/">Website</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
