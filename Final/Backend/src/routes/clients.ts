import express from "express";
import { check } from "express-validator";
import { createClient, updateClient, deleteClient } from "../controllers/clients";
import { validateData } from "../middlewares/validator";
import { validateJwt } from "../middlewares/validator-jwt";


const router = express.Router()

router.post("/create", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("name", "El campo name es necesario").not().isEmpty(),
    check("phone", "El campo phone es necesario").not().isEmpty(),
    check("phone", "El campo phone debe ser un numero").isNumeric(),
    validateData
],validateJwt, createClient)

router.post("/update", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("clientId", "El campo clientId es necesario").not().isEmpty(),
    check("name", "El campo name es necesario").not().isEmpty(),
    check("phone", "El campo phone es necesario").not().isEmpty(),
    check("phone", "El campo phone debe ser un numero").isNumeric(),
    validateData
],validateJwt, updateClient)

router.post("/delete", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("clientId", "El campo clientId es necesario").not().isEmpty(),
    validateData
],validateJwt, deleteClient)

export default router;
