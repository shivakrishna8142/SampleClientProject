import React, { useEffect } from 'react';
import axios from 'axios';
import Admin from './admin/Admin';
import User from './user/User';
import Manager from './manager/Manager';
import { Link } from 'react-router-dom';
function Dashboard() {
    return (
        <main className="App">
            <section className="dashboard-panel">
                <h1>Welcome to dashboard</h1>
                <h2><Link to="/admin">admin</Link></h2>
                <h2><Link to="/user">user</Link></h2>
                <h2><Link to="/manager">manager</Link></h2>
            </section>
        </main>
    );
}

export default Dashboard;