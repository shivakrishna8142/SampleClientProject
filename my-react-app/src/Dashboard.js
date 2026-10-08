import React, { useEffect } from 'react';
import axios from 'axios';
import Admin from './admin/Admin';
import User from './user/User';
import Manager from './manager/Manager';
function Dashboard() {
    // useEffect(() => {
    //     const authToken = localStorage.getItem('token');
    //     async function verifyToken() {
    //         try {
    //             const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL || ''}/auth`, {
    //                 headers: { Authorization: `Bearer ${authToken}` }
    //             });
    //         }
    //         catch (error) {
    //             console.error('Unable to verify authentication.', error);
    //         }
    //     }
    //     verifyToken();
    // }, []);
    return (
        <main className="App">
            <section className="dashboard-panel">
                <h1>Welcome to dashboard</h1>
                <Admin/>
                <User/>
                <Manager/>
            </section>
        </main>
    );
}

export default Dashboard;