import express from "express";
import { check } from "express-validator";
import { createEmployee, deleteEmployee, getEmployees } from "../controllers/employees";
import { validateData } from "../middlewares/validator";
import { validateJwt } from "../middlewares/validator-jwt";


const router = express.Router()

router.post("/", [
    check("emails", "El campo emails es necesario").not().isEmpty(),
    check("emails", "El campo emails debe ser un array").isArray(),
    validateData
],validateJwt, getEmployees)

router.post("/create", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("email", "El campo email es necesario").not().isEmpty(),
    check("email", "El campo email no es correcto").isEmail(),
    validateData
],validateJwt, createEmployee)

router.post("/delete", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("email", "El campo email es necesario").not().isEmpty(),
    validateData
],validateJwt, deleteEmployee)

export default router;
