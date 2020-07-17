import { Button } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { Home, PhotoLibrary, Reply, ShoppingCart } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../contexts/auth';
import { goToRegistry, handleRsvp } from '../../helpers';
import AuthModal from '../Modals/AuthModal';

const SideDrawer = ({ opened, setOpened }) => {
  const history = useHistory();
  const { auth } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)

  const handleRsvpAndCloseModal = () => {
    handleRsvp(auth, history, setModalVisible)
    setOpened(prev => !prev)
  }

  const menuItems = [
    { label: "Home", icon: <Home />, click: () => history.push("/") },
    { label: "RSVP", icon: <Reply />, click: handleRsvpAndCloseModal },
    { label: "Gallery", icon: <PhotoLibrary />, click: () => history.push("/gallery") },
    { label: "Registry", icon: <ShoppingCart />, click: goToRegistry },
  ];

  return (
    <React.Fragment>
      <AuthModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <Drawer anchor={"left"} open={opened} onClose={() => setOpened((prevState) => !prevState)}>
        <div style={styles.drawerContainer}>
          {menuItems.map((item) => (
            <div key={item.label}>
              <Button style={{ color: "white" }} onClick={item.click}>
                <span style={{ marginRight: 15 }}>{item.icon}</span>
                {item.label}
              </Button>
            </div>
          ))}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

const styles = {
  drawerContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#424242",
    padding: 20,
    width: 250,
    height: "100vh",
  },
};

export default SideDrawer;
