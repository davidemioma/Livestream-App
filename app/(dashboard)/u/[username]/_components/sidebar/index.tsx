import React from "react";
import Routes from "./Routes";
import Toggle from "./Toggle";
import Wrapper from "./Wrapper";

const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />

      <Routes />
    </Wrapper>
  );
};

export default Sidebar;
