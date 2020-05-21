import React from 'react';
import Logo from "./crazyworld.png";
//for Heading with Application name and its logo
function Header() {
  return (
    <header>
      <img
        src={Logo}
        alt='Problem?'
      />
      <p>Crazy World</p>
    </header>
  );
}
export default Header;