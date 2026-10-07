import { Link } from 'react-router-dom';

function Admin() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="eyebrow">ROLE PAGE</p>
        <h1>Admin</h1>
        <p className="login-description">Welcome to the admin page.</p>
        <Link className="back-link" to="/">Back to sign in</Link>
      </section>
    </main>
  );
}

export default Admin;