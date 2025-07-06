import React from "react";

const Header = function () {
  const headerStyle = {
    background: "#000",
    padding: 20,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
  };
  return <div style={headerStyle}>Phone Directory</div>;
};

export default Header;
