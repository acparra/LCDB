import { request, response } from "express";
import { DB } from "../database/config";

export const getEmployees = async (req = request, res = response) => {
    try {

        let emails = req.body.emails
        let employeesData: Array<Object> = []
        await DB.ref("users").once('value', (snapshot:any) => {
            let data = snapshot.val()
            emails.map((email: String) => {
                for (const key in data) {
                    if (email == data[key].email) {
                        employeesData.push(data[key])
                    }
                }
            })

        })

        res.status(201).json({
            msg: "La informacion de los empleados es: ",
            data: employeesData
        })

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const createEmployee = async (req = request, res = response) => {
    try {

        let email = req.body.email
        let id = req.body.id
        let keyEmployees;

        await DB.ref("users").once("value", (snapshot:any) => {
            let data = snapshot.val()
            let counter = Object.entries(data).length - 1
            for (const key in data) {
                if (data[key].email == email) {
                    break;
                }
                if (counter == 0 && data[key].email != email) {
                    res.status(404).json({
                        msg: "El usuario no existe en la base de datos de LCDB",
                        email
                    })
                }
                counter--
            }
        })

        if (res.headersSent == false) {
            await DB.ref("stores/" + id + "/employees").once("value", (snapshot:any) => {
                let data = snapshot.val()
                keyEmployees = Object.entries(data)[0][0]
                data[keyEmployees].map((element: any) => {
                    if (element == email) {
                        res.status(409).json({
                            msg: "Este usuario ya existe en tu tienda",
                            email
                        })
                    }
                })
            })
        }

        if (res.headersSent == false) {
            let arrayEmployees: Array<String> = [];
            await DB.ref("stores/" + id + "/employees/" + keyEmployees).once("value", (snapshot:any) => { arrayEmployees = snapshot.val() })
            arrayEmployees.push(email)
            await DB.ref("stores/" + id + "/employees/" + keyEmployees).set(arrayEmployees)
            res.status(201).json({
                msg: "El empleado ha sido creado con exito"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}


export const deleteEmployee = async (req = request, res = response) => {
    try {

        let id = req.body.id
        let email = req.body.email
        let keyEmployees = ''
        let arrayEmployees: Array<String> = []

        await DB.ref("stores/" + id + "/employees").once("value", (snapshot:any) => {
            let data = snapshot.val()
            keyEmployees = Object.entries(data)[0][0]
            arrayEmployees = data[keyEmployees]
            if (data[keyEmployees][0] == email) {
                res.status(403).json({
                    msg: "No puedes eliminar al creador de la tienda"
                })
            }
        })

        if (res.headersSent == false) {
            arrayEmployees = arrayEmployees.filter((element) => element != email)

            await DB.ref("stores/" + id + "/employees/" + keyEmployees).set(arrayEmployees)
            res.status(201).json({
                msg: "El empleado ha sido eliminado con exito",
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}