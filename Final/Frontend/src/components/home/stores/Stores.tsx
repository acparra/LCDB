import { Fragment, useContext, useEffect, useState } from "react";
import { ModalCreate } from "./modals/ModalCreate";
import { ModalDelete } from "./modals/ModalDelete";
import { ModalUpdate } from "./modals/ModalUpdate";
import { StoreCard } from "./storecard/StoreCard";

import { getStores } from "../../../services/stores";


export const Stores = () => {

    const [storesList, setStoresList] = useState<Array<Object>>([])
    const [storeDataUpdate, setStoreDataUpdate] = useState<Object>({
        name: "",
        type: "",
        adress: ""
    })

    const getStoresAxios = async () => {

        let email = JSON.parse(String(window.localStorage.getItem('user'))).email
        let token = String(window.localStorage.getItem('token'))

        let result = await getStores(token, email)
        let data = result?.data.data
        let tempo: Array<Object> = [];

        for (const key in data) {
            tempo.push({ databaseId: key, ...data[key] })
        }
        setStoresList(tempo)
    }

    useEffect(() => {
        getStoresAxios()
    }, [])

    return (
        <Fragment>
            <div className="container-fluid p-5">
                <h3 className="fw-bold">TUS TIENDAS</h3>
                <div className="row mt-4 d-flex flex-wrap justify-content-center">
                    {
                        storesList.map((store: any) => (
                            <StoreCard store={store} key={store.databaseId} setStoreDataUpdate={setStoreDataUpdate}></StoreCard>
                        ))
                    }
                    <div className="d-flex flex-column justify-content-center col-md-3 p-3 m-3" id='store__card'>
                        <p className="p-0 m-0 fw-bold text-center" style={{ color: '#777' }} role='button' data-bs-toggle="modal" data-bs-target="#modalCreate"> Crear tienda nueva </p>
                    </div>
                </div>
            </div>
            <ModalCreate></ModalCreate>
            <ModalUpdate store={{storeDataUpdate, setStoreDataUpdate}}></ModalUpdate>
            <ModalDelete store={storeDataUpdate}></ModalDelete>
        </Fragment>

    );

}