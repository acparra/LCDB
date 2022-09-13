import { Sidebar } from "../home/sidebar/Sidebar";
import { Navbar } from "../home/navbar/Navbar";
import { StoreContext } from "../../context/StoreContext";

import './Store.sass'
import { useContext, useState } from "react";
import { Inventory } from "./inventory/Inventory";
import { Employees } from "./employees/Employees";
import { Microcredits } from "./microcredits/Microcredits";
import { Bills } from "./bills/Bills";
import { Sales } from "./sales/Sales";
import { Orders } from "./orders/Orders";
import { Clients } from "./clients/Clients";

export const Store = () => {

    const [storeDataContext, setStoreDataContext]: any = useContext(StoreContext)

    return (
        <div className="row p-0 m-0">
            <Sidebar></Sidebar>
            <div className="col p-md-5 p-3 m-0">
                <Navbar />
                <br></br>
                {Object.entries(storeDataContext).length != 0 ?

                    storeDataContext.module === 'Inventario' ? <Inventory /> :
                        storeDataContext.module === 'Empleados' ? <Employees /> :
                            storeDataContext.module === 'Clientes' ? <Clients /> :
                                storeDataContext.module === 'Microcreditos' ? <Microcredits /> :
                                    storeDataContext.module === 'Gastos' ? <Bills /> :
                                        storeDataContext.module === 'Ventas' ? <Sales /> :
                                            storeDataContext.module === 'Pedidos' ? <Orders /> :
                                                <div className="container-fluid d-flex flex-column justify-content-center align-items-center" >
                                                    <h6 className="fw-bold text-center"> Selecciona alguno de los apartados mostrados en la barra de navegacion, para empezar a gestionar tu tienda</h6>
                                                </div>
                    :
                    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" >
                        <h6 className="fw-bold text-center"> Selecciona alguno de los apartados mostrados en la barra de navegacion, para empezar a gestionar tu tienda</h6>
                    </div>
                }
            </div>
        </div>
    );
}