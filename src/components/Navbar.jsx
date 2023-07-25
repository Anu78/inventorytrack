import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/additem">Add Items</Link>
          </li>
          <li className="navbar-item">
            <Link to="/list">List</Link>
          </li>
        </ul>
      </nav>
    );
}
 
export default Navbar;