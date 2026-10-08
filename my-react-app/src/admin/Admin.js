import { Link } from 'react-router-dom';
import withRoleHoc from '../RoleHoc';
function Admin() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="eyebrow">ROLE PAGE</p>
        <h1>Admin</h1>
        <p className="login-description">Welcome to the admin page.</p>
      </section>
    </main>
  );
}

export default withRoleHoc(Admin, 'admin');