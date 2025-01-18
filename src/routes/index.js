import { Navigate, useRoutes } from 'react-router-dom';

// routes
import LoginRoutes from './LoginRoutes.js';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([LoginRoutes, MainRoutes,
        {
            path: '*',
            element: <NotFoundHandler />,
        },]);
}


function NotFoundHandler() {
    
    return <Navigate to="/" />;
}