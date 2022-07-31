import * as React from "react";
import { Outlet } from "react-router-dom";
import DrawerAppBar from "../Navbar/navbar";

const Layout = () => {
  return (
    <>
      <DrawerAppBar />
      <Outlet />
    </>
  );
};

export default Layout;
