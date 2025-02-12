
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <>
      <Link to="/" className="text-foreground hover:text-primary transition-colors font-bold text-[17px]">
        Home
      </Link>
      <Link to="/tools" className="text-foreground hover:text-primary transition-colors font-bold text-[17px]">
        Tools
      </Link>
      <Link to="/resources" className="text-foreground hover:text-primary transition-colors font-bold text-[17px]">
        Resources
      </Link>
    </>
  );
};

export default NavLinks;
