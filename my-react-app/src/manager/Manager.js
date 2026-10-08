import { Link } from 'react-router-dom';
import withRoleHoc from '../RoleHoc';

function Manager() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="eyebrow">ROLE PAGE</p>
        <h1>Manager</h1>
        <p className="login-description">Welcome to the manager page.</p>
      </section>
    </main>
  );
}

export default withRoleHoc(Manager, 'manager');