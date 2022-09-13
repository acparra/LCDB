import { request, response } from "express";
import { DB } from "../database/config";

export const getStores = async (req = request, res = response) => {
    try {
        await DB.ref("stores").once("value", (snapshot:any) => {
            let data = snapshot.val()
            let email = req.body.email
            let stores: Object = {};
            let tempoObject = {};
            for (const i in data) {
                for (const j in data[i].employees) {
                    data[i].employees[j].map((element: String) => {
                        if (element === email) {
                            tempoObject = {[i]: data[i]}
                            stores = { ...stores, ...tempoObject }
                        }
                    })
                }

            }
            if (Object.entries(stores).length != 0) {
                res.status(201).json({
                    msg: "Tiendas obtenidas",
                    data: stores
                })
            } else {
                res.status(401).json({
                    msg: "No hay ninguna tienda asociada a este correo"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const createStore = async (req = request, res = response) => {
    try {
        await DB.ref("stores").once("value", (snapshot:any) => { // Esta linea es para consultar si ya existe una tienda con el mismo nombre, en ese caso no la deja crear
            let data = snapshot.val();
            for (const key in data) {
                if (data[key].name === req.body.name) {
                    res.status(409).json({
                        msg: "Ya existe una tienda con este nombre",
                        data: data[key],
                    })
                    break;
                }
            }
        })

        const STORE = {
            name: req.body.name,
            type: req.body.type,
            address: req.body.address
        }

        if (!res.headersSent) {
            await DB.ref("stores").push(STORE)
            await DB.ref("stores").limitToLast(1).once('value', async (snapshot:any) => {
                for (const key in snapshot.val()) {
                    await DB.ref("stores/" + key + "/employees").push([req.body.email])
                }
            })
            res.status(201).json({
                msg: "La tienda se ha creado exitosamente",
                data: STORE,
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const updateStore = async (req = request, res = response) => {
    try {

        const STORE = {
            name: req.body.name,
            type: req.body.type,
            address: req.body.address
        }

        let data;
        await DB.ref("stores/" + req.body.id).once("value", (snapshot:any) => data = snapshot)

        if (data != null) {
            await DB.ref("stores").once("value", (snapshot:any) => {
                for (const key in snapshot.val()) {
                    if (key != req.body.id && snapshot.val()[key].name === req.body.name) {

                        res.status(409).json({
                            msg: "Ya existe una tienda con este nombre",
                            data: snapshot.val()[key],
                        })
                        break;
                    }
                }
            })
        }
        else {
            res.status(404).json({
                msg: "No existe ninguna tienda con el id proporcionado"
            })
        }

        if (res.headersSent == false) {
            await DB.ref("stores/" + req.body.id).update(STORE)
            res.status(201).json({
                msg: "La tienda ha sido actualizada correctamente",
                data: STORE,
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const deleteStore = async (req = request, res = response) => {
    try {
        await DB.ref("stores").once("value", (snapshot:any) => { // Esta linea es para consultar si existe la tienda con ese id
            let data = snapshot.val();
            let existance = false;
            for (const key in data) {
                if (key === req.body.id) {
                    existance = true;
                }
            }
            if (existance == false) {
                res.status(404).json({
                    msg: "No existe ninguna tienda con el id proporcionado"
                })
            }
        })

        if (res.headersSent === false) {
            await DB.ref("stores/" + req.body.id).remove()
            res.status(201).json({
                msg: "La tienda ha sido eliminada correctamente"
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}