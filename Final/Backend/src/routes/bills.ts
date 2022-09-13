import express from "express";
import { check } from "express-validator";
import { createBill, updateBill, deleteBill } from "../controllers/bills";
import { validateData } from "../middlewares/validator";
import { validateJwt } from "../middlewares/validator-jwt";


const router = express.Router()


const multer = require("multer")
const upload = multer({ dest: 'uploads/' })

router.post("/create", upload.single("file"), [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("date", "El campo date es necesario").not().isEmpty(),
    check("type", "El campo type es necesario").not().isEmpty(),
    check("description", "El campo description es necesario").not().isEmpty(),
    check("value", "El campo value es necesario").not().isEmpty(),
    validateData
], createBill)

router.post("/update", upload.single("file"), [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("date", "El campo date es necesario").not().isEmpty(),
    check("type", "El campo type es necesario").not().isEmpty(),
    check("description", "El campo description es necesario").not().isEmpty(),
    check("value", "El campo value es necesario").not().isEmpty(),
    validateData
], validateJwt, updateBill)

router.post("/delete", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("billId", "El campo billId es necesario").not().isEmpty(),
    validateData
], validateJwt, deleteBill)

export default router;
