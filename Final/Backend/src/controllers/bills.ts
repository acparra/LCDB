import { response } from "express";
import { DB, deleteFile, uploadFile } from "../database/config";
// import {ref, uploadBytes} from 'firebase/storage'
// import { storage } from './../database/config';

export const createBill = async (req: any, res = response) => {
    try {

        let id = req.body.id
        let newBill = {
            date: req.body.date,
            type: req.body.type,
            description: req.body.description,
            value: req.body.value,
            url: ''
        }

        await DB.ref("stores/" + id + "/bills").push(newBill, (error: any) => {
            if (error) {
                res.status(500).json({
                    msg: "Ocurrio un error al crear el gasto"
                })
            }
        })

        if (res.headersSent == false) {
            if (req.body.file != "undefined") {
                await DB.ref("stores/" + id + "/bills").limitToLast(1).once('value', async (snapshot: any) => {
                    let key = Object.entries(snapshot.val())[0][0]

                    let url = await uploadFile(req.file, key);
                    await DB.ref("stores/" + id + "/bills/" + key).update({ ...newBill, url })
                    res.status(201).json({
                        msg: "El gasto ha sido creado correctamente"
                    })
                })
            } else {
                res.status(201).json({
                    msg: "El gasto ha sido creado correctamente"
                })
            }
        }


    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const updateBill = async (req: any, res = response) => {
    try {

        let id = req.body.id
        let billId = req.body.billId
        let updatedBill = {
            date: req.body.date,
            type: req.body.type,
            description: req.body.description,
            value: req.body.value,
            url: ''
        }

        await DB.ref("stores/" + id + "/bills/" + billId).update(updatedBill)

        if (res.headersSent == false) {

            if (req.body.file != "undefined") {
                let url = ""
                await uploadFile(req.file, billId).then((value) => url = value)
                await DB.ref("stores/" + id + "/bills/" + billId).update({ ...updatedBill, url })

                res.status(201).json({
                    msg: "El gasto ha sido actualizado correctamente"
                })
            }
            else {
                res.status(201).json({
                    msg: "El gasto ha sido actualizado correctamente"
                })
            }
        }


    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const deleteBill = async (req: any, res = response) => {
    try {

        let id = req.body.id
        let billId = req.body.billId

        let result = await DB.ref("stores/" + id + "/bills/" + billId).once("value", (snaphost: any) => snaphost.val())
        if (result) {
            await DB.ref("stores/" + id + "/bills/" + billId).remove()
            if (req.body.state) {
                await deleteFile(billId)
                res.status(201).json({ msg: "El gasto se ha eliminado con exito" })
            }
            else {
                res.status(201).json({ msg: "El gasto se ha eliminado con exito" })
            }
        } else {
            res.status(404).json({
                msg: "El gasto no existe"
            })
        }




    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}