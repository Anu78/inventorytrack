import { Link } from "react-router-dom";
import "./Footer.css"
import { AiOutlineUnorderedList, AiFillFileAdd, AiOutlineHome } from "react-icons/ai"

const Navbar = () => {
    return (
      <div className="footer">
        <div className="icon">
          <Link to="/list">
            <AiOutlineUnorderedList size={23} />
          </Link>
        </div>
        <div className="icon">
          <Link to="/">
            <AiOutlineHome size={23} />
          </Link>
        </div>
        <div className="icon">
          <Link to="/additem">
            <AiFillFileAdd size={23} />
          </Link>
        </div>
      </div>
    );
}
 
export default Navbar;