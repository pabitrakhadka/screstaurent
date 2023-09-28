import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <main style={{ minHeight: "100vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
