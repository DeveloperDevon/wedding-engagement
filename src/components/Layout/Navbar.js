import { Button } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Drawer from "./Drawer";
import NavLinks from "./NavLinks";

const Navbar = ({ device }) => {
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div style={styles.navbarContainer}>
      <Drawer opened={drawerOpen} setOpened={setDrawerOpen} />
      <div style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {device !== "desktop" &&
            <Button onClick={() => setDrawerOpen((prev) => !prev)}>
              <Menu />
            </Button>}
        </div>
        <h1 style={styles.headerText} onClick={() => {
          localStorage.clear()
          history.push('/')
          }}>
          Chandler & Devon
        </h1>
        <div style={{ width: 64 }}></div>
      </div>
      {device !== "mobile" && <div style={styles.navLinks}>
        <NavLinks />
      </div>}
    </div>
  );
};

const styles = {
  navbarContainer: {
    position: "fixed",
    top: 0,
    width: "100%",
  },
  navbar: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "#efefef",
  },
  navLinks: {},
  headerText: {
    textAlign: "center",
    paddingTop: 10,
    fontFamily: "Allura",
  },
  rightIcon: {
    padding: 15,
  },
};

export default Navbar;
