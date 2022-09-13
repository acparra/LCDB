import express from "express";
import { check } from "express-validator";
import { createProduct, updateProduct, deleteProduct } from "../controllers/inventory";
import { validateData } from "../middlewares/validator";
import { validateJwt } from "../middlewares/validator-jwt";


const router = express.Router()

router.post("/create", [
    check("idProduct", "El campo idProduct del producto es necesario").not().isEmpty(),
    check("nameProduct", "El campo nameProduct es necesario").not().isEmpty(),
    check("quantity", "El campo quantity es necesario").not().isEmpty(),
    check("quantity", "El campo quantity debe ser un numero").isNumeric(),
    check("purchaseCost", "El campo purchaseCost es necesario").not().isEmpty(),
    check("purchaseCost", "El campo purchaseCost debe ser un numero").isNumeric(),
    check("saleCost", "El campo saleCost es necesario").not().isEmpty(),
    check("saleCost", "El campo saleCost debe ser un numero").isNumeric(),
    validateData
],validateJwt, createProduct)

router.post("/update", [
    check("idProduct", "El campo idProduct del producto es necesario").not().isEmpty(),
    check("nameProduct", "El campo nameProduct es necesario").not().isEmpty(),
    check("quantity", "El campo quantity es necesario").not().isEmpty(),
    check("quantity", "El campo quantity debe ser un numero").isNumeric(),
    check("purchaseCost", "El campo purchaseCost es necesario").not().isEmpty(),
    check("purchaseCost", "El campo purchaseCost debe ser un numero").isNumeric(),
    check("saleCost", "El campo saleCost es necesario").not().isEmpty(),
    check("saleCost", "El campo saleCost debe ser un numero").isNumeric(),
    validateData
],validateJwt, updateProduct)

router.post("/delete", [
    check("id", "El campo id es necesario").not().isEmpty(),
    check("productId", "El campo productId es necesario").not().isEmpty(),
    validateData
],validateJwt, deleteProduct)

export default router;
