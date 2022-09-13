import { request, response } from "express";
import { DB } from "../database/config";

export const createProduct = async (req = request, res = response) => {
    try {
        let id = req.body.id
        let newProduct = {
            idProduct: req.body.idProduct,
            nameProduct: req.body.nameProduct,
            quantity: req.body.quantity,
            purchaseCost: req.body.purchaseCost,
            saleCost:req.body.saleCost,
            category: req.body.category
        }

        await DB.ref("stores/" + id + "/inventory").once("value", (snapshot:any) => {
            let data = snapshot.val()
            if (data != null) {
                for (const key in data) {
                    if (data[key].nameProduct == req.body.nameProduct || data[key].idProduct == req.body.idProduct) {
                        res.status(409).json({
                            msg: "Ya existe un producto con este nombre o numero id",
                            data: req.body
                        })
                        break
                    }
                }
            }

        })

        if (res.headersSent == false) {
            await DB.ref("stores/" + id + "/inventory").push(newProduct)
            res.status(201).json({
                msg: "El producto ha sido ingresado con exito",
                data: newProduct
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}

export const updateProduct = async (req = request, res = response) => {
    try {
        let id = req.body.id
        let productId = req.body.productId
        await DB.ref("stores/" + id + "/inventory").once("value", (snapshot:any) => {
            let data = snapshot.val()
            if (data != null) {
                for (const key in data) {
                    if ((data[key].nameProduct == req.body.nameProduct && key != productId) || (data[key].idProduct == req.body.idProduct && key != productId)) {
                        res.status(409).json({
                            msg: "Ya existe un producto con este nombre o id del producto",
                            data: req.body
                        })
                        break
                    }
                    else{
                        console.log("No pudo ser")
                    }
                }
            }
        })

        const newProduct = {
            idProduct: req.body.idProduct,
            nameProduct: req.body.nameProduct,
            quantity: req.body.quantity,
            purchaseCost: req.body.purchaseCost,
            saleCost:req.body.saleCost,
            category: req.body.category,
        }

        if (res.headersSent == false) {
            await DB.ref("stores/" + id + "/inventory/"+productId).update(newProduct)
            res.status(201).json({
                msg: "El producto ha sido actualizado con exito",
                data: newProduct
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}


export const deleteProduct = async (req = request, res = response) => {
    try {
        let id = req.body.id
        let productId = req.body.productId

        let result = await DB.ref("stores/"+id+"/inventory/"+productId).once("value", (snaphost:any)=>snaphost.val())
        if (result){
            await DB.ref("stores/"+id+"/inventory/"+productId).remove()
            res.status(201).json({
                msg: "El producto ha sido eliminado con exito"
            })
        } else {
            res.status(404).json({
                msg: "El producto no existe"
            })
        }


    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }
}