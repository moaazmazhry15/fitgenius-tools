
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <>
      <Link to="/" className="text-foreground hover:text-primary transition-colors">
        Home
      </Link>
      <Link to="/tools" className="text-foreground hover:text-primary transition-colors">
        Tools
      </Link>
      <Link to="/resources" className="text-foreground hover:text-primary transition-colors">
        Resources
      </Link>
    </>
  );
};

export default NavLinks;
