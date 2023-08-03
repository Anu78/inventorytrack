import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import {
  AiOutlineUnorderedList,
  AiFillFileAdd,
  AiOutlineHome,
  AiOutlineSearch,
} from "react-icons/ai";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="footer">
      <div className="icon">
        <Link to="/list">
          <AiOutlineUnorderedList
            size={23}
            className={location.pathname === "/list" ? "" : "opacity-50"}
          />
        </Link>
      </div>
      <div className="icon">
        <Link to="/">
          <AiOutlineHome
            size={23}
            className={location.pathname === "/" ? "" : "opacity-50"}
          />
        </Link>
      </div>
      <div className="icon">
        <Link to="/additem">
          <AiFillFileAdd
            size={23}
            className={location.pathname === "/additem" ? "" : "opacity-50"}
          />
        </Link>
      </div>
      <div className="icon">
        <Link to="/search">
          <AiOutlineSearch
            size={23}
            className={location.pathname === "/search" ? "" : "opacity-50"}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
