import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './../routes/PrivateRoutes';
import { PublicRoutes } from './../routes/PublicRoutes';
import { Home } from "../components/home/Home";
import Login from "../components/login/Login";
import { Store } from '../components/store/Store';
import { StoreContext } from '../context/StoreContext';
import { useState } from 'react';


// Aqui se declara y se exporte el enrutador de la aplicacion

export const AppRouter = () => {

    let token = window.localStorage.getItem('token')
    let user = window.localStorage.getItem('user')
    const [storeDataContext, setStoreDataContext] = useState({})

    return (
        <StoreContext.Provider value={[storeDataContext, setStoreDataContext]}>
            <Router>
                <Routes>
                    {/* Aqui se definen las rutas privadas a las que solo se va a tener acceso cuando se inicie sesion */}
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Home />} path='/home'></Route>
                        <Route element={<Store />} path='/store'></Route>
                    </Route>

                    {/* Aqui se definen las rutas publicas a las que las personas que no hayan iniciado sesion tienen acceso*/}
                    <Route element={<PublicRoutes />}>
                        <Route element={<Login />} path='/login'></Route>
                    </Route>
                    <Route path='*' element={<Navigate to='/login' />}></Route>
                </Routes>
            </Router>
        </StoreContext.Provider>
    );
}