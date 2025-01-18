import React from 'react';
import Routes from './routes';
import { JWTProvider as AuthProvider } from '../src/contexts/JWTContext';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;