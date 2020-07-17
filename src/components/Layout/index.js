import React, { useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWindowWidth(window.innerWidth));

  // Fix for Gallery memory leak
  // const isMountedComponent = useRef(true);
  // useEffect(() => {
  //   if (isMountedComponent.current) { console.log(isMountedComponent)}
  //   return () => { isMountedComponent.current = false; }
  // }, [])

  const device = windowWidth > 768 ? "desktop" : "mobile";
  const paddingTop = windowWidth > 768 ? 90 : 60;

  const styles = {
    layoutContainer: {
      paddingTop,
    },
  };

  return (
    <div style={styles.layoutContainer}>
      <Navbar device={device} />
      {children}
    </div>
  );
};

export default Layout;
