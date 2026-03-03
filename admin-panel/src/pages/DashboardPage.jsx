function DashboardPage({ onLogout }) {
  return (
    <section className="card">
      <h2>Dashboard</h2>
      <p>Welcome to the phase 2 admin dashboard.</p>
      <ul>
        <li>Orders summary (coming soon)</li>
        <li>Menu management (coming soon)</li>
        <li>User activity (coming soon)</li>
      </ul>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </section>
  );
}

export default DashboardPage;
