import { request, response } from "express";
import { DB } from "../database/config";

export const createClient = async (req = request, res = response) => {
    try {
        let id = req.body.id
        let newClient = {
            name: req.body.name,
            phone: req.body.phone,
            dni: req.body.dni
        }

        await DB.ref("stores/" + id + "/clients").once("value", (snapshot:any) => {
            let data = snapshot.val()
            if (data != null) {
                for (const key in data) {
                    if (data[key].name == req.body.name || data[key].dni == req.body.dni) {
                        res.status(409).json({
                            msg: "Ya existe un cliente con este nombre o numero de documento",
                            data: req.body
                        })
                        break
                    }
                }
            }
        })

        if (res.headersSent == false) {
            await DB.ref("stores/" + id + "/clients").push(newClient)
            res.status(201).json({
                msg: "El cliente ha sido creado con exito",
                data: newClient
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const updateClient = async (req = request, res = response) => {
    try {
        let id = req.body.id
        let clientId = req.body.clientId
        await DB.ref("stores/" + id + "/clients").once("value", (snapshot:any) => {
            let data = snapshot.val()
            if (data != null) {
                for (const key in data) {
                    if ((data[key].name == req.body.name && key != clientId) || (data[key].dni == req.body.dni && key != clientId)) {
                        res.status(409).json({
                            msg: "Ya existe un cliente con este nombre o numero de documento",
                            data: req.body
                        })
                        break
                    }
                }
            }
        })

        const newClient = {
            name: req.body.name,
            phone: req.body.phone,
            dni: req.body.dni
        }

        if (res.headersSent == false) {
            await DB.ref("stores/" + id + "/clients/"+clientId).update(newClient)
            res.status(201).json({
                msg: "El cliente ha sido actualizado con exito",
                data: newClient
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}


export const deleteClient = async (req = request, res = response) => {
    try {
        let id = req.body.id
        let clientId = req.body.clientId

        let result = await DB.ref("stores/"+id+"/clients/"+clientId).once("value", (snaphost:any)=>snaphost.val())
        if (result){
            await DB.ref("stores/"+id+"/clients/"+clientId).remove()
            res.status(201).json({
                msg: "El cliente ha sido eliminado con exito"
            })
        } else {
            res.status(404).json({
                msg: "El cliente no existe"
            })
        }


    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}