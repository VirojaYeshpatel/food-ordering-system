import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="container">
      <h1>Food Ordering Admin Panel (Phase 2)</h1>
      {isLoggedIn ? (
        <DashboardPage onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      )}
    </main>
  );
}

export default App;
