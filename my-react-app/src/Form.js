import { useState, useEffect , useReducer} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Form() {
     const initialState = {
        loading: false,
        error: null,
    };

    const navigate = useNavigate();
    const [notice, setNotice] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);

   
    function reducer(state, action) {
        switch (action.type) {
            case 'SET_LOADING':
                return { ...state, loading: action.payload };
            case 'SET_ERROR':
                return { ...state, error: action.payload };
        }
    }

    // useEffect(() => {
    //     if (!authToken) return;

    //     async function verifyToken() {
    //         try {
    //             const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL || ''}/auth`, {
    //                 headers: { Authorization: `Bearer ${authToken}` },
    //             });

    //             const role = response.data.user?.role;
    //             const roleRoutes = {
    //                 admin: '/admin',
    //                 manager: '/manager',
    //                 user: '/user',
    //             };

    //             if (roleRoutes[role]) {
    //                 navigate(roleRoutes[role]);
    //             } else {
    //                 setNotice('Your account role is not recognized.');
    //                 }

    //                 setNotice('Authentication successful.');
    //             } catch {
    //                 setNotice('Unable to verify authentication.');
    //             }
    //         }

    //     verifyToken();
    //     }, [authToken]);

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setIsSubmitting(true);
        setNotice('');

        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
                username: formData.get('username'),
                password: formData.get('password'),
            });

            if (response.data.isAuthenticated) {
                if (!response.data.token) {
                    setNotice('Sign in succeeded, but no token was returned.');
                    return;
                }

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                setNotice('Validation successful.');
                navigate('/dashboard');

            } else {
                setAuthToken(null);
                setNotice('Invalid username or password.');
            }
        } catch {
            dispatch({ type: 'SET_ERROR', payload: 'Unable to sign in. Please try again.' });
            setAuthToken(null);
        } finally {
            setIsSubmitting(false);
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }

    return (
        <section className="login-panel" aria-labelledby="login-title">
            <p className="eyebrow">WELCOME BACK</p>
            <h1 id="login-title">Sign in</h1>
            <p className="login-description">Enter your details to continue.</p>

            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Your username"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    required
                />

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
                <p className="form-notice" role="status">{notice}</p>
                {state.loading && <p className="form-notice" role="status">Loading...</p>}
                {state.error && <p className="form-notice" role="status">{state.error}</p>}
            </form>

        </section>
    );
}

export default Form;