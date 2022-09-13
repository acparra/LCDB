import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { StoreContext } from "../../../context/StoreContext";
import { getEmployees, createEmployee, deleteEmployee } from "../../../services/employees";
const toastr = require('toastr')
import { CSVLink } from "react-csv";

export const Employees = () => {

    const [storeDataContext, setStoreDataContext]: any = useContext(StoreContext)
    const navigate = useNavigate()

    const getEmails = () => {
        const employees = storeDataContext.employees
        let emails: Array<String> = []
        for (const key in employees) {
            employees[key].map((element: any) => {
                emails.push(element)
            })
        }
        return emails
    }

    const getEmployeesAxios = async () => {
        let token = window.localStorage.getItem('token')
        let result: any = await getEmployees(getEmails(), String(token))

        if (result?.status == 201) {
            setEmployeesData(result?.data.data)
        }
    }

    const createEmployeeAxios = async () => {
        let token = window.localStorage.getItem('token')
        let result = await createEmployee(storeDataContext.databaseId, newEmployee, String(token))

        if (result?.status == 201) {
            toastr.success("El empleado ha sido creado con exito")
            navigate("/home")
        } else {
            toastr.error(result?.data.msg)
            
        }
    }

    const deleteEmployeeAxios = async (email:String) => {
        let token = window.localStorage.getItem('token')
        let result = await deleteEmployee(storeDataContext.databaseId, email, String(token))

        if (result?.status == 201) {
            toastr.success("El empleado ha sido eliminado con exito")
            navigate("/home")
        } else if (result?.status == 202){
            toastr.error(result?.data.msg)
        }
    }

    const [employeesData, setEmployeesData] = useState([])
    const [newEmployee, setNewEmployee] = useState('')

    useEffect(() => { getEmployeesAxios() }, [])

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const headers = [
        { label: "Foto", key: "picture" },
        { label: "Nombre", key: "name" },
        { label: "Correo", key: "email" }
      ];

    return (
        <Fragment>
            <h3 className="fw-bold content__title"> Empleados </h3>
            <br />
            <CSVLink headers={headers} data={employeesData}  filename={"reporteEmpleados.csv"}  className="Table"><input type="button" className="btn btn-primary" value='Reporte CSV'/></CSVLink>
            <table className="table align-middle table-borderless text-center">
                <thead>
                    <tr>
                        <td colSpan={3}>
                            <input type="text" className="form-control" placeholder='Escribe el correo del empleado nuevo...' onChange={(e) => setNewEmployee(e.currentTarget.value)} />
                        </td>
                        <td className="mr-0 ml-auto">
                            <input type="button" className="btn btn-primary" value='Agregar' onClick={() => {
                                if (newEmployee != '' && newEmployee.match(mailformat)) { createEmployeeAxios() } else { toastr.error("El campo esta vacio o no es un correo valido") }
                            }
                            } />
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesData.map((element: any) => (
                        <tr key={element.email}>
                            <td> <img src={element.picture} width='50px' className="rounded-5" referrerPolicy="no-referrer"></img></td>
                            <td> {element.name} </td>
                            <td> {element.email} </td>
                            <td className='text-primary' onClick={()=>deleteEmployeeAxios(element.email)} role='button'> Eliminar </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}