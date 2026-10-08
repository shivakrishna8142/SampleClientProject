import { Link } from 'react-router-dom';
import withRoleHoc from '../RoleHoc';

function authorization() {
  return (
    <main className="App">
      <section className="role-panel">
        <p className="login-description">authorization</p>
      </section>
    </main>
  );
}

export default authorization;