import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import App from './App';

import { AuthProvider } from './components/context/authcontext'; // Import your AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot here
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
