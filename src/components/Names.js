import React from 'react'

const Names = () => {
  return (
    <div style={styles.container}>
        <h1>Chandler Ceccato</h1>
        <h1>&</h1>
        <h1>Devon Reichardt</h1>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8e7d1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 35,
    color: '979797',
    fontFamily: 'Allura',
  }
}

export default Names