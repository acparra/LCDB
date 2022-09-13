import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export const PrivateRoutes = () => {
    let token = window.localStorage.getItem('token') || null

    const checkToken = () => {
        if (token) {
            let decodedToken: any = jwt_decode(String(token));
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                token = null

            }

            return token
        }
    }

    return (
        checkToken() ? <Outlet /> : <Navigate to='/login' />
    );
}