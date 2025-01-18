import { createContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../helpers/api/apiCall';
import { setToken, setClaims } from '../store/slices/authSlice';
import { Endpoints } from '../utils/Endpoints';
import { useLocation } from 'react-router-dom';

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const dispatch = useDispatch();
    const location = useLocation(); // Sayfa değişikliklerini izlemek için location hook
    const token = useSelector((state) => state.auth.token);


    useEffect(() => {
        if (!verifyToken(token)) {
            dispatch(setToken(''))

        }
    }, [dispatch, token, location.pathname]); // Her sayfa değişikliğinde bu kontrolü yap

    const verifyToken = (serviceToken) => {
        if (!serviceToken) {
            return false;
        }
        const decoded = jwtDecode(serviceToken);
        return decoded.exp > Date.now() / 1000;
    };

    const login = async (username, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await client.post(Endpoints.TOKEN, { username, password });
                const { data } = response;

                if (data?.accessToken.token && verifyToken(data?.accessToken.token)) {
                    dispatch(setToken(data?.accessToken.token));
                    dispatch(setClaims(data?.claims));
                    resolve();
                }
            } catch (err) {
                reject(err);  // Hatalı durum
            }
        });
    };

    const logout = () => {
        dispatch(setToken(''))
        dispatch(setClaims([]))
    };

    return (
        <JWTContext.Provider value={{ login, logout }}>{children}</JWTContext.Provider>
    );
};

export default JWTContext;