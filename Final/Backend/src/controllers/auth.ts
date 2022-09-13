import { request, response } from "express"
import { DB } from "../database/config"
import jwt from "jsonwebtoken"

export const loginAccount = async (req = request, res = response) => {
    try {

        const createJWT = (data: Object) => {
            return jwt.sign(data, "secretkey", { expiresIn: '3600s' })
        }

        await DB.ref("users").once("value", (snapshot : any) => { // Esta linea es para consultar si ya existe un correo igual en la base de datos, en ese caso no crea el usuario, solo logea     
            let data = snapshot.val();
            for (const key in data) {
                if (data[key].email === req.body.email) {
                    let token = createJWT(data[key]);
                    res.status(201).json({
                        msg: "El usuario ya existe en la base de datos",
                        data: data[key],
                        token
                    })

                    break;
                }
            }
        })

        const USER = {
            name: req.body.name,
            email: req.body.email,
            picture: req.body.picture
        }

        if (!res.headersSent) {
            await DB.ref("users").push(USER)

            let token = createJWT(USER);
            res.status(201).json({
                msg: "El usuario se ha creado correctamente",
                data: USER,
                token
            })
        }

    } catch (error) {
        res.status(500).json({
            msg: "Ocurrio un error",
            error: error
        })
    }

}