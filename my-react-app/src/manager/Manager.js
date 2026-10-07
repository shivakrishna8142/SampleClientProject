import { Link } from 'react-router-dom';

function Manager() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="eyebrow">ROLE PAGE</p>
        <h1>Manager</h1>
        <p className="login-description">Welcome to the manager page.</p>
        <Link className="back-link" to="/">Back to sign in</Link>
      </section>
    </main>
  );
}

export default Manager;