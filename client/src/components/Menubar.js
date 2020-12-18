import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const items = [
  { key: "home", name: "Home", as: Link, to: "home" },
  { key: "music", name: "Music" },
  { key: "learn", name: "Learn" },
  { key: "register", name: "Register", as: Link, to: "register" },
  { key: "login", name: "Login", as: Link, to: "login" },
];

const Menubar = () => <Menu items={items} />;

export default Menubar;
