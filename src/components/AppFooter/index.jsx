// import react
import { NavLink, Link } from "react-router-dom";

// import css
import "./style.scss";

function AppFooter() {
  return (
    <footer>

      <ul>
        <li className="cgu">
          <NavLink to="/cgu"> Conditions Générales d'utilisation </NavLink>
        </li>
      </ul>

    </footer>
  );
}

export default AppFooter;
