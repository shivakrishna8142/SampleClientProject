import { Link } from 'react-router-dom';

function User() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="eyebrow">ROLE PAGE</p>
        <h1>User</h1>
        <p className="login-description">Welcome to the user page.</p>
        <Link className="back-link" to="/">Back to sign in</Link>
      </section>
    </main>
  );
}

export default User;