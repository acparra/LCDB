import express from "express";
import { check } from "express-validator";
import { loginAccount } from "../controllers/auth";
import { validateData } from "../middlewares/validator";


const router = express.Router()

router.post("/", [
    check("email", "El campo email es necesario").not().isEmpty(),
    check("email", "El campo email no es correcto").isEmail(),
    check("name", "El campo name es necesario").not().isEmpty(),
    check("name", "El campo name es muy corto").isLength({min:3, max:100}),
    check("picture", "El campo picture es necesario").not().isEmpty(),
    validateData
], loginAccount)

export default router;


