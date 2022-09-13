import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { StoreContext } from "../../../context/StoreContext";
import { createClient, deleteClient, updateClient } from "../../../services/clients";
import { CSVLink } from "react-csv";

const toastr = require('toastr')

export const Clients = () => {

    const [storeDataContext, setStoreDataContext]: any = useContext(StoreContext)
    const [clients, setClients]: any = useState([])
    const navigate = useNavigate()

    const getClients = () => {
        const clients = storeDataContext.clients
        const clientsArray: Array<Object> = []

        for (const key in clients) {
            clientsArray.push({ clientId: key, ...clients[key] })
        }

        setClients(clientsArray)
    }

    const createClientAxios = async () => {
        let token = window.localStorage.getItem('token')
        let result:any = await createClient(storeDataContext.databaseId, newClient, String(token))

        console.log("resultado: ", result)

        if (result?.status == 201) {
            toastr.success("El cliente ha sido creado con exito")
            navigate("/home")
        } else {
            toastr.error(result?.data.msg)
        }
    }

    const updateClientAxios = async () => {
        let token = window.localStorage.getItem('token')
        let result = await updateClient(storeDataContext.databaseId, newClientEdit, String(token))

        if (result?.status == 201) {
            toastr.success("El cliente ha sido actualizado con exito")
            navigate("/home")
        } else if (result?.status == 202) {
            toastr.error(result?.data.msg)
        }
    }

    const deleteClientAxios = async (clientId: String) => {
        let token = window.localStorage.getItem('token')
        let result = await deleteClient(storeDataContext.databaseId, clientId, String(token))

        if (result?.status == 201) {
            toastr.success("El empleado ha sido eliminado con exito")
            navigate("/home")
        } else if (result?.status == 202) {
            toastr.error(result?.data.msg)
        }
    }

    const [employeesData, setEmployeesData] = useState([])
    const [newClient, setNewClient]: any = useState({})
    const [newClientEdit, setNewClientEdit] = useState({})

    const [editClient, setEditClient]: any = useState({})

    useEffect(() => { getClients() }, [])

    const headers = [
        { label: "DNI", key: "dni" },
        { label: "Nombre", key: "name" },
        { label: "Telefono", key: "phone" }
      ];

    return (
        <Fragment>
            <h3 className="fw-bold content__title"> Clientes </h3>
            <br />
            <CSVLink headers={headers} data={clients}  filename={"reporteClientes.csv"}  className="Table"><input type="button" className="btn btn-primary" value='Reporte CSV'/></CSVLink>
            <table className="table align-middle table-borderless text-center mt-3">
                <thead>
                    <tr className="border p-3">
                        <td colSpan={1}>
                            <input type="number" className="form-control" placeholder='Numero de documento' onChange={(e) => setNewClient({ ...newClient, dni: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <input type="text" className="form-control" placeholder='Nombre' onChange={(e) => setNewClient({ ...newClient, name: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <input type="number" className="form-control" placeholder='Telefono' onChange={(e) => setNewClient({ ...newClient, phone: e.currentTarget.value })} />
                        </td>
                        <td className="mr-0 ml-auto">
                            <input type="button" className="btn btn-primary" value='Agregar' onClick={() => { if (Object.entries(newClient).length > 1 && newClient.name != '' && newClient.phone && newClient.phone != '' && newClient.dni != '') { createClientAxios() } else { toastr.error("Los campos no pueden estar vacios") } }} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">DNI</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((element: any) => (
                        <tr key={element.clientId}>
                            {editClient.state == true && editClient.id == element.clientId ?
                                <Fragment>
                                    <td> <input className="form-control" type="number" defaultValue={element.dni} onChange={(e) => setNewClientEdit({ ...newClientEdit, dni: e.currentTarget.value })}></input></td>
                                    <td> <input className="form-control" type="text" defaultValue={element.name} onChange={(e) => setNewClientEdit({ ...newClientEdit, name: e.currentTarget.value })}></input></td>
                                    <td> <input className="form-control" type="number" defaultValue={element.phone} onChange={(e) => setNewClientEdit({ ...newClientEdit, phone: e.currentTarget.value })}></input></td>
                                    <td className="text-primary"> <span role='button' onClick={() => { updateClientAxios() }}> Guardar </span> o <span role='button' onClick={() => setEditClient({})}>Cancelar</span> </td>
                                </Fragment>
                                :
                                <Fragment>
                                    <td> {element.dni} </td>
                                    <td> {element.name} </td>
                                    <td> {element.phone} </td>
                                    <td className="text-primary"> <span role="button" onClick={() => { setEditClient({ state: true, id: element.clientId }); setNewClientEdit(element) }}> Editar </span> o <span role="button" onClick={() => deleteClientAxios(element.clientId)}> Eliminar </span></td>
                                </Fragment>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}