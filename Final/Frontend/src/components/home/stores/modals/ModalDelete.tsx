import { deleteStore } from "../../../../services/stores"
const toastr = require('toastr')

export const ModalDelete = ({ store }: any) => {

    let storeData = store

    const deleteStoreAxios = async () => {
        let token = String(window.localStorage.getItem('token'))
        let result = await deleteStore(storeData.databaseId, token)

        if (result?.status == 201) {
            toastr.success("La tienda ha sido eliminada correctamente")
            document.getElementById('modalDeleteClose')?.click()
            window.location.href = '/'
        }
    }

    return (
        <div className="modal fade" id="modalDelete" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title w-100 text-center fw-bold" id="exampleModalLabel">ELIMINAR TIENDA</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="modal-body mx-4 text-">
                        <p className="text-center"> ¿Estás seguro de que deseas eliminar la tienda {storeData.name}?</p>
                        <div className="col-md-12 mt-2 mb-2">
                            <input type="password" className="form-control" placeholder="Ingresa el nombre de la tienda" id="inputDeleteName" />
                        </div>
                        <p className="text-center"> Recuerda que esta es una accion irreversible </p>
                    </form>
                    <div className="modal-footer">
                        <button type="button" id='modalDeleteClose' className="btn btn-secondary" data-bs-dismiss="modal"> Cerrar </button>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            let inputName = document.getElementById('inputDeleteName') as HTMLInputElement
                            if (inputName?.value === storeData.name){
                                deleteStoreAxios()
                            }else{
                                toastr.error("El nombre de las tiendas no coincide")
                                document.getElementById('modalDeleteClose')?.click()
                            }
                        }
                        }>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}