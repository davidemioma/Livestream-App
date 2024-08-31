import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import Actions from "./Actions";

const NavBar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-[45] flex h-20 items-center justify-between bg-white px-2 shadow-sm dark:bg-[#252731] md:px-5">
      <Logo />

      <Search />

      <Actions />
    </nav>
  );
};

export default NavBar;
