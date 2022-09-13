import { request, response } from "express";

import jwt from 'jsonwebtoken';


export const validateJwt = (req = request, res = response, next: Function) => {

    const token = req.header('authorization')?.split(' ')[1];

    if (typeof token == 'undefined') {
        res.status(401).json({
            msg: "No se ha proporcionado un token valido"
        })
    } else {
        try {
            jwt.verify(token, "secretkey", (error : any) => {
                if (error) {
                    res.status(401).json({
                        msg: "Token invalido",
                        error
                    })
                }else{
                    next()
                }
            })
        } catch (error) {
            res.status(401).json({
                msg: "Ocurrio un error con el token",
                error
            })
        }

    }


}