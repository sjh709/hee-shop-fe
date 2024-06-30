import React from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppLayout from './layout/AppLayout';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;
