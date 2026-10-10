import { useContext } from 'react';
import withRoleHoc from '../RoleHoc';
import UserContext from '../UserContext';

function Admin() {
  const { user } = useContext(UserContext);
  return (
    <main className="App">
      <section className="role-panel">
        {user.role}
        <p className="eyebrow">ROLE PAGE</p>
        <h1>Admin</h1>
        <p className="login-description">Welcome to the admin page.</p>
      </section>
    </main>
  );
}

export default withRoleHoc(Admin, 'admin');