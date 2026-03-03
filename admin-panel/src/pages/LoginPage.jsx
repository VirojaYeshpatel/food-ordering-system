function LoginPage() {
  return (
    <section className="card">
      <h2>Login Placeholder</h2>
      <p>This screen will contain admin authentication.</p>
      <form>
        <input type="email" placeholder="Email" disabled />
        <input type="password" placeholder="Password" disabled />
        <button type="button" disabled>
          Login
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
