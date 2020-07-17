import { Button } from '@material-ui/core'
import React from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import { goToRegistry } from '../../helpers'

Modal.setAppElement('#root')

const customStyles = {
  content: {
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(248, 231, 209)',
    fontFamily: 'Allura',
  }
};

const ResponseModal = ({ modalVisible, setModalVisible, attending }) => {
  const history = useHistory()
  return (
    <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)} style={customStyles}>
      <div style={styles.paper}>
        {attending === 'no' && <h2 style={{ textAlign: 'center' }}>We're sorry you are unable to make it. We hope to celebrate with you soon!</h2>}
        {attending === 'yes' && <h2 style={{ textAlign: 'center' }}>We're so happy you are able to make it and can not wait to celebrate!</h2>}

        <h3 style={{ textAlign: 'center', marginTop: 20 }}>What next?</h3>

        <div style={styles.buttonContainer}>
          <Button style={styles.button} onClick={goToRegistry}>Visit Registry</Button>
          <Button style={styles.button} onClick={() => history.push('/gallery')}>View Gallery</Button>
        </div>

      </div>
    </Modal>
  )
}

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 500,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%'
  },
  button: {
    backgroundColor: 'white',
  }
}

export default ResponseModal