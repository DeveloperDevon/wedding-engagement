import { Button } from '@material-ui/core';
import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { goToRegistry, handleRsvp } from '../../helpers';
import AuthModal from '../Modals/AuthModal';

const NavLinks = () => {
  const history = useHistory()
  const { auth } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)

  const links = [
    { label: 'Home', click: () => history.push('/') },
    { label: 'RSVP', click: () => handleRsvp(auth, history, setModalVisible) },
    { label: 'Gallery', click: () => history.push('/gallery') },
    { label: 'Registry', click: goToRegistry },
  ]

  return (
    <div style={styles.linksContainer}>
      <AuthModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <div style={styles.links}>
        {links.map(link => (
          <Button key={link.label} onClick={link.click}>
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  linksContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    color: "white",
  },
  links: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    maxWidth: 700,
    height: 31,
    padding: 0,
  },
};

export default NavLinks;
