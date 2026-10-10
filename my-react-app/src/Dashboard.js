import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <main className="App">
            <section className="dashboard-panel">
                <h1>Welcome to dashboard</h1>
                <nav className="dashboard-grid" aria-label="Dashboard menu">
                    <Link className="dashboard-item" to="/admin">
                        <strong>Admin</strong>
                        <span>Open the admin page</span>
                    </Link>
                    <Link className="dashboard-item" to="/manager">
                        <strong>Manager</strong>
                        <span>Open the manager page</span>
                    </Link>
                    <Link className="dashboard-item" to="/user">
                        <strong>User</strong>
                        <span>Open the user page</span>
                    </Link>
                </nav>
                <p className="dashboard-chat-link">
                    <Link to="/chat">Open chat</Link>
                </p>
            </section>
        </main>
    );
}

export default Dashboard;