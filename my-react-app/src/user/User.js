import { Link } from 'react-router-dom';
import withRoleHoc from '../RoleHoc';

function User() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="eyebrow">ROLE PAGE</p>
        <h1>User</h1>
        <p className="login-description">Welcome to the user page.</p>
      </section>
    </main>
  );
}

export default withRoleHoc(User, 'user');