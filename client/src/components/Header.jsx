import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
 
  return (
    <header className="bg-slate-200">
      <div className="flex p-5 justify-between items-center max-w-[97rem] mx-auto">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap ">
            <span className="text-slate-500">Real</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100  rounded-lg flex items-center px-3">
          <input
            className="bg-transparent hidden sm:inline  px-1 py-1 focus:outline-none w-24 sm:w-64 "
            type="text"
            placeholder="Search..."
          />
          <FaSearch className="text-slate-500 hidden sm:inline" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
