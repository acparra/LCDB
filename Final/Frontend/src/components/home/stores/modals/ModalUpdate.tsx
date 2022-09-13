import { updateStore } from "../../../../services/stores"

const toastr = require('toastr')

export const ModalUpdate = ({ store }: any) => {
    let storeData = store.storeDataUpdate
    let setStoreData = store.setStoreDataUpdate

    const updateStoreAxios = async () => {
        let token = String(window.localStorage.getItem('token'))
        let result = await updateStore(storeData.databaseId, storeData, token)

        if (result?.status == 201) {
            toastr.success("La tienda ha sido actualizada correctamente")
            document.getElementById('modalUpdateClose')?.click()
            window.location.href = '/'
        }else{
            toastr.error(result?.data.msg)
        }
    }

    return (
        <div className="modal fade" id="modalUpdate" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title w-100 text-center fw-bold">EDITAR TIENDA</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="modal-body mx-4">
                        <div className="col-md-12">
                            <label className="form-label mb-1 "> Nombre </label>
                            <input type="text" className="form-control" defaultValue={storeData.name} id="inputUpdateName" required onChange={(e) => setStoreData({ ...storeData, name: e.currentTarget.value })} />
                        </div>
                        <div className="col-md-12 mt-2">
                            <label className="form-label mb-1 "> Tipo </label>
                            <select className="form-select" id="inputUpdateType" defaultValue={storeData["type"]} required onChange={(e) => { setStoreData({ ...storeData, type: e.currentTarget.value }) }}>
                                <option value='Cafe Internet'> Cafe Internet </option>
                                <option value='Miscelanea'> Miscelanea </option>
                                <option value='Corresponsal Bancario'> Corresponsal Bancario </option>
                            </select>
                        </div>
                        <div className="col-md-12 mt-2">
                            <label className="form-label mb-1 "> Direccion </label>
                            <input type="text" className="form-control" defaultValue={storeData.address} id="inputUpdateAdress" required onChange={(e) => setStoreData({ ...storeData, address: e.currentTarget.value })} />
                        </div>
                    </form>
                    <div className="modal-footer">
                        <button type="button" id='modalUpdateClose' className="btn btn-secondary" data-bs-dismiss="modal"> Cerrar </button>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            if (storeData.type == 'Select') {
                                toastr.error("Selecciona un tipo de tienda")
                            } else updateStoreAxios()
                        }}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}