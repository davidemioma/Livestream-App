import React from "react";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-[45] flex h-16 items-center justify-between bg-white px-2 shadow-sm dark:bg-[#252731] md:px-5">
      <Logo />
    </nav>
  );
};

export default NavBar;
