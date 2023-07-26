import React from "react";
import "./header.css";

function Header() {
  return (
    <header>
      <span className="label-left">Primera</span>
      <img className="imagen" src="https://cdn.icon-icons.com/icons2/851/PNG/512/Pokedex_tool_icon-icons.com_67529.png" alt="" />
      <span className="label-right">Generación</span>
    </header>
  );
}

export default Header;
