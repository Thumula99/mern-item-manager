import { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>MERN Item Manager</h1>
        <p>Simple CRUD application for managing items</p>
      </header>
      
      <main>
        <ItemForm onItemAdded={handleItemAdded} />
        <hr style={{ margin: '2rem 0', opacity: 0.2 }} />
        <ItemList refreshTrigger={refreshTrigger} />
      </main>

      <footer style={{ marginTop: '3rem', textAlign: 'center', color: '#666', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
        <p>&copy; 2026 Item Manager Labs</p>
      </footer>
    </div>
  );
}

export default App;
