import React from 'react';
import './App.css';
import AppLayout from './layout/AppLayout';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <div>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;
