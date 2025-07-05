import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { AuthProvider } from './dashboard/auth-context';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

