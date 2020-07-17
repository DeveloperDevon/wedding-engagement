import { Snackbar } from '@material-ui/core'
import React from 'react'

const MySnackBar = ({visible, setVisible, message}) => {
  return (
    <Snackbar
    open={visible}
    onClose={setVisible}
    anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
    autoHideDuration={3500}
    message={message}
    />
  )
}

export default MySnackBar