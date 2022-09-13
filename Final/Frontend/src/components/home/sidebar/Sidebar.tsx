import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { StoreContext } from '../../../context/StoreContext';
import './Sidebar.sass'

// Exportacion de la barra de navegacion lateral izquierda

export const Sidebar = () => {

    let navigate = useNavigate()

    let [storeDataContext, setStoreDataContext]: any = useContext(StoreContext)


    const handleLogout = () => {
        window.localStorage.clear()
        navigate("/login");
    }

    return (
        <div className="col-md-2 p-0 m-0" id='sidebar-container'>
            <div className='wrapper sticky-top'>
                <nav className='text-light sidebar d-flex flex-column' id='sidebar'>
                    <div className='p-4'>
                        <span className='fs-4 fw-bold lh-1'>LAS CUENTAS <br></br>DEL BARRIO</span>
                    </div>
                    <div className='p-4' id='sidebar__title'>
                        <span className='fs-6'> Barra de navegación </span>
                    </div>
                    {window.location.pathname == '/store' ?
                        <div className='sidebar__items d-flex flex-column'>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Inventario", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-suitcase' />
                                </div>
                                <span> Gestion de inventario</span>
                            </div>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Empleados", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-users' />
                                </div>
                                <span> Gestion de empleados</span>
                            </div>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Clientes", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-user-group' />
                                </div>
                                <span> Gestion de clientes</span>
                            </div>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Microcreditos", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-credit-card' />
                                </div>
                                <span> Gestion de microcreditos</span>
                            </div>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Gastos", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-dollar' />
                                </div>
                                <span> Gestion de gastos</span>
                            </div>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Ventas", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-dollar' />
                                </div>
                                <span> Gestion de ventas</span>
                            </div>
                            <div className="items__item d-flex p-2" role='button' onClick={() => setStoreDataContext({ ...storeDataContext, module: "Pedidos", action: "" })}>
                                <div className='d-flex justify-content-center align-items-center sidebar__icons'>
                                    <i className='fa fa-shopping-cart' />
                                </div>
                                <span> Gestion de pedidos</span>
                            </div>
                        </div>
                        : ""}

                    <div className='p-3 mt-auto sidebar__footer d-flex flex-row align-items-center'>
                        <div className="dropup">
                            <button className="btn p-0" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className='fa fa-user-circle fs-2 text-light'></i>
                            </button>
                            <ul className="dropdown-menu">
                                <li><i className='fa fa-cog fs-4 px-1 pb-2' role='button'></i></li>
                                <li><i className='fa fa-sign-out fs-4 px-1' role='button' onClick={() => handleLogout()}></i></li>
                            </ul>
                        </div>
                        <a className='text-decoration-none text-light ms-auto pe-1 fw-bold' href='/'>Inicio</a>
                    </div>
                </nav >
            </div>
        </div>
    );
}