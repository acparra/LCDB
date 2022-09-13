import { useState } from "react";
import { createStore } from "../../../../services/stores";
const toastr = require('toastr')

export const ModalCreate = () => {
    let token = String(window.localStorage.getItem('token'))
    let email = JSON.parse(String(window.localStorage.getItem('user'))).email

    const [storeData, setStoreData] = useState ({
        name: "",
        type: "",
        address: ""
    })

    const createStoreAxios = async () =>{

        let result = await createStore(storeData, token, email)

        if (result?.status == 201){
            toastr.success("La tienda ha sido creada exitosamente")
            document.getElementById('modalUpdateClose')?.click()
            window.location.href='/'
        } else{
            toastr.error(result?.data.msg)
        }

    }

    return (
        <div className="modal fade" id="modalCreate" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title w-100 text-center fw-bold">CREAR TIENDA</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="modal-body mx-4">
                        <div className="col-md-12">
                            <label className="form-label mb-1 "> Nombre </label>
                            <input type="text" className="form-control" placeholder='Papeleria XYZ' id="inputCreateName" required onChange={(e)=>setStoreData({...storeData, name: e.currentTarget.value})}/>
                        </div>
                        <div className="col-md-12 mt-2">
                            <label className="form-label mb-1 "> Tipo </label>
                            <select className="form-select" id="inputCreateType" required onChange={(e)=>setStoreData({...storeData, type: e.currentTarget.value})}>
                                <option value='Select'> Select </option>
                                <option value='Cafe Internet'> Cafe Internet </option>
                                <option value='Miscelanea'> Miscelanea </option>
                                <option value='Corresponsal Bancario'> Corresponsal bancario </option>
                            </select>
                        </div>
                        <div className="col-md-12 mt-2">
                            <label className="form-label mb-1 "> Direccion </label>
                            <input type="text" className="form-control" placeholder='Calle XX #XXX-X' id="inputCreateAdress" required onChange={(e)=>setStoreData({...storeData, address: e.currentTarget.value})}/>
                        </div>
                    </form>
                    <div className="modal-footer">
                        <button type="button" id='modalCreateClose' className="btn btn-secondary" data-bs-dismiss="modal"> Cerrar </button>
                        <button type="button" className="btn btn-primary" onClick={()=>{if (storeData.name != '' && storeData.type != '' && storeData.address != '') {createStoreAxios()} else {toastr.error("Se deben llenar todos los campos")}}}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}