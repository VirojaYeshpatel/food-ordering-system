import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <main className="container">
      <h1>Food Ordering Admin Panel (Foundation)</h1>
      <section className="panel-grid">
        <LoginPage />
        <DashboardPage />
      </section>
    </main>
  );
}

export default App;
