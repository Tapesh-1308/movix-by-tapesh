import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import "./styles.scss";

import Container from "../container/Container";
import logo from "../../assets/movix-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");

  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => window.scrollTo(0, 0), [location]);

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true);
  };

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    navigate(`/search/${query}`);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <Container>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="" />
        </div>

        <ul className="menuItems">
          <li className="menuItem">
            <Link to="/explore/movie" onClick={() => setMobileMenu(false)}>
              Movies
            </Link>
          </li>
          <li className="menuItem">
            <Link to="/explore/tv" onClick={() => setMobileMenu(false)}>
              TV Shows
            </Link>
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </Container>

      {showSearch && (
        <div className="searchBar">
          <Container>
            <form onSubmit={handleSubmit} className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or a tv show...."
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </form>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
