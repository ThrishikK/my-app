import { NavLink } from "react-router-dom";

import "./PageNav.css";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/recursion">Recursion</NavLink>
        </li>
        <li>
          <NavLink to="/window">Sliding window</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
