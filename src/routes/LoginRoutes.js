import { lazy } from 'react';

// project imports

// login routing
const AuthLogin = lazy(() => import('../views/login'));

// ==============================|| AUTH ROUTING ||============================== //


const LoginRoutes = {
    path: '/',
    children: [
        {
            path: '/',
            element: <AuthLogin />
        }

    ]
};

export default LoginRoutes;