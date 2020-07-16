import React from 'react';
import AppRouter from './AppRouter'
import './App.css';
import { AuthProvider } from './contexts/auth'
// https://www.amazon.com/wedding/share/chandleranddevon-november2020

function App() {

  return (
    <AuthProvider>
      <div style={styles.container}>
        <div style={styles.wrapper}>
          <AppRouter />
        </div>
      </div>
    </AuthProvider>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh'
  },
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    backgroundColor: '#f8e7d1'
  }
}

export default App;
