import express from "express";
import { check } from "express-validator";
import { createStore, deleteStore, getStores, updateStore } from "../controllers/stores";
import { validateData } from "../middlewares/validator";
import { validateJwt } from "../middlewares/validator-jwt";


const router = express.Router()

router.post("/", [
    check("email", "El campo email es necesario").not().isEmpty(),
    check("email", "El campo email no es correcto").isEmail(),
    validateData
],validateJwt, getStores)

router.post("/create", [
    check("name", "El campo name es necesario").not().isEmpty(),
    check("name", "El campo name es muy corto").isLength({min:4, max:100}),
    check("type", "El campo type es necesario").not().isEmpty(),
    check("address", "El campo address es necesario").not().isEmpty(),
    check("email", "El campo email es necesario").not().isEmpty(),
    validateData
],validateJwt, createStore)

router.post("/update", [
    check("name", "El campo name es necesario").not().isEmpty(),
    check("name", "El campo name es muy corto").isLength({min:4, max:100}),
    check("type", "El campo type es necesario").not().isEmpty(),
    check("address", "El campo address es necesario").not().isEmpty(),
    check("id", "El campo id es necesario").not().isEmpty(),
    validateData
],validateJwt, updateStore)

router.post("/delete", [
    check("id", "El campo id es necesario").not().isEmpty(),
    validateData
],validateJwt, deleteStore)

export default router;
