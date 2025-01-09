import { Link } from "react-router-dom";

const Header = () => {
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
          </li>
          {/* <li className="hover:text-green-500 transition-colors">
            <Link to="https://a2a-training.netlify.app/">Website</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
