import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// ==============================|| AUTH GUARD ||============================== //

const AuthGuard = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.auth.isLogged);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            if (!isLoggedIn) {
                navigate('/', { replace: true });
            }
        };

        checkAuth();
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;
    }

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthGuard;