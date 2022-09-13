import { Fragment, useContext, useEffect } from "react";
import { StoreContext } from "../../../context/StoreContext";

const toastr = require('toastr')

// FIREBASE UPLOAD FILE

import { useState } from "react";

import { createBill, updateBill, deleteBill } from "../../../services/bills";
import { useNavigate } from "react-router";

import { CSVLink } from "react-csv";


export const Bills = () => {

    const [storeDataContext, setStoreDataContext]: any = useContext(StoreContext)
    const [bills, setBills]: any = useState([])

    const [newBill, setNewBill]: any = useState({})

    let navigate = useNavigate()

    const getBills = () => {
        const bills = storeDataContext.bills
        const billsArray: Array<Object> = []

        for (const key in bills) {
            billsArray.push({ billId: key, ...bills[key] })
        }

        setBills(billsArray)

    }

    let token = String(window.localStorage.getItem('token'))
    const createBillAxios = async () => {

        let result = await createBill(storeDataContext.databaseId, newBill, token)
        if (result?.status == 201) {
            toastr.success("El gasto se ha creado correctamente")
            navigate("/home")
        }
    }

    const updateBillAxios = async () => {

        let result = await updateBill(storeDataContext.databaseId, newBill, token)
        if (result?.status == 201) {
            toastr.success("El gasto se ha actualizado correctamente")
            navigate("/home")
        }

    }

    const deleteBillAxios = async (billId: string) => {

        let state = true;
        if (storeDataContext.bills[billId].url == ''){
            state = false
        }
        let result = await deleteBill(storeDataContext.databaseId, billId, token, state)
        if (result?.status == 201) {
            toastr.success("El gasto se ha eliminado correctamente")
            navigate("/home")
        }
    }

    const handleSubmit = () => {
        if (Object.entries(newBill).length >= 4 && newBill.date != '' && newBill.description != '' && newBill.type != '' && newBill.value != '') {
            if (newBill.file != undefined) {
                if (newBill.file.type == "application/pdf") {
                    createBillAxios()
                }
                else {
                    toastr.error("Solo se admiten formatos PDF")
                }
            }
            else {
                createBillAxios()
            }
        } else {
            toastr.error("Los datos no pueden estar vacios")
        }

    }

    const handleUpdate = () => {
        if (Object.entries(newBill).length >= 4 && newBill.date != '' && newBill.type != '' && newBill.description != '' && newBill.value != '') {
            if (newBill.file != undefined) {
                if (newBill.file.type == "application/pdf") {
                    updateBillAxios()
                }
                else {
                    toastr.error("Solo se admiten formatos PDF")
                }
            }
            else {
                updateBillAxios()
            }
        } else {
            toastr.error("Los datos no pueden estar vacios")
        }
    }

    const headers = [
        { label: "Fecha", key: "date" },
        { label: "Tipo ", key: "type" },
        { label: "Descripción", key: "description" },
        { label: "Valor", key: "value" },
        { label: "Adjunto", key: "url" }
    ];

    useEffect(() => getBills(), [])

    return (
        <Fragment>
            <h3 className="fw-bold content__title"> Gastos </h3>
            <br />
            <>
                {storeDataContext.action == 'Crear' ?
                    <form className="row">
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Fecha</label>
                            <input type="date" className="form-control" onChange={(e) => setNewBill({ ...newBill, date: e.currentTarget.value })} />
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Tipo</label>
                            <select className="form-select" onChange={(e) => setNewBill({ ...newBill, type: e.currentTarget.value })}>
                                <option value='Select'>  </option>
                                <option value='Servicio publico'> Servicio publico </option>
                                <option value='Arriendo'> Arriendo </option>
                                <option value='Mejoras'> Mejoras </option>
                            </select>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Descripcion</label>
                            <textarea className="form-control" rows={1} onChange={(e) => setNewBill({ ...newBill, description: e.currentTarget.value })}></textarea>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Valor</label>
                            <input type="number" className="form-control" onChange={(e) => setNewBill({ ...newBill, value: e.currentTarget.value })} />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Adjunto</label>
                            <input type="file" className="form-control" accept="application/pdf" onChange={(event) => {
                                if (event.target.files) {
                                    setNewBill({ ...newBill, file: event.target.files[0] });
                                }
                            }} />
                            <div id="fileHelp" className="form-text">El archivo es opcional</div>
                        </div>
                        <div></div>
                        <button type="button" className="btn btn-primary" style={{ width: "fit-content" }} onClick={handleSubmit}>Guardar</button>
                    </form>
                    :
                    storeDataContext.action == 'Editar' ?
                        <>
                            <form className="row">
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Fecha</label>
                                    <input type="date" className="form-control" defaultValue={storeDataContext.bills[storeDataContext.billId].date} onChange={(e) => setNewBill({ ...newBill, date: e.currentTarget.value })} />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Tipo</label>
                                    <select className="form-select" defaultValue={storeDataContext.bills[storeDataContext.billId].type} onChange={(e) => setNewBill({ ...newBill, type: e.currentTarget.value })}>
                                        <option value='Select'>  </option>
                                        <option value='Servicio publico'> Servicio publico </option>
                                        <option value='Arriendo'> Arriendo </option>
                                        <option value='Mejoras'> Mejoras </option>
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Descripcion</label>
                                    <textarea className="form-control" rows={1} defaultValue={storeDataContext.bills[storeDataContext.billId].description} onChange={(e) => setNewBill({ ...newBill, description: e.currentTarget.value })}></textarea>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Valor</label>
                                    <input type="number" className="form-control" defaultValue={storeDataContext.bills[storeDataContext.billId].value} onChange={(e) => setNewBill({ ...newBill, value: e.currentTarget.value })} />
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label className="form-label">Adjunto</label>
                                    <input type="file" className="form-control" accept="application/pdf" onChange={(event) => {
                                        if (event.target.files) {
                                            setNewBill({ ...newBill, file: event.target.files[0] });
                                        }
                                    }} />
                                    <div id="fileHelp" className="form-text"> Si el adjunto no se va a modificar, no se debe adjuntar</div>
                                </div>
                                <div></div>
                                <button type="button" className="btn btn-primary" style={{ width: "fit-content" }} onClick={handleUpdate}>Guardar</button>
                                <button className="btn btn-primary" style={{ width: "fit-content", marginLeft: "10px" }} onClick={() => { setStoreDataContext({ ...storeDataContext, module: "" }); navigate("/store") }}>Cancelar</button>
                            </form>
                        </>
                        :
                        <>
                            <CSVLink headers={headers} data={bills} filename={"reporteGastos.csv"} className="Table"><input type="button" className="btn btn-primary" value='Reporte CSV' /></CSVLink>
                            <table className="table align-middle table-borderless text-center">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Tipo</th>
                                        <th>Descripcion</th>
                                        <th>Valor</th>
                                        <th>Adjunto</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bills.map((element: any) => (
                                        <tr key={element.billId}>
                                            <td> {element.date} </td>
                                            <td> {element.type} </td>
                                            <td> {element.description} </td>
                                            <td> {element.value} </td>
                                            <td> <a href={element.url} className='text-decoration-none'> Descargar </a> </td>
                                            <td> <span role='button' className="text-primary" onClick={() => { setNewBill({ ...storeDataContext.bills[element.billId], billId: element.billId }); setStoreDataContext({ ...storeDataContext, action: 'Editar', billId: element.billId }) }}>Editar</span> o <span role='button' className="text-primary" onClick={() => deleteBillAxios(element.billId)}>Eliminar</span></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="border" role='button' colSpan={6} style={{ color: "#bbb" }} onClick={() => setStoreDataContext({ ...storeDataContext, action: 'Crear' })}> Agregar nuevo gasto </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                }
            </>
        </Fragment>
    );
}