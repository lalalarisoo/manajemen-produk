import { useState } from 'react';
import AdminView from './components/AdminView';
import CustomerView from './components/CustomerView';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState('customer');

  return (
    <div className="App">
      <header className="app-header">
        <h1>Manajemen Produk</h1>
        <div className="view-toggle">
          <button 
            className={viewMode === 'customer' ? 'active' : ''}
            onClick={() => setViewMode('customer')}
          >
            Mode Pembeli
          </button>
          <button 
            className={viewMode === 'admin' ? 'active' : ''}
            onClick={() => setViewMode('admin')}
          >
            Mode Admin
          </button>
        </div>
      </header>

      <main>
        {viewMode === 'admin' ? <AdminView /> : <CustomerView />}
      </main>

      <footer>
        <p>© 2025 Aplikasi Manajemen Produk</p>
      </footer>
    </div>
  );
}

export default App;