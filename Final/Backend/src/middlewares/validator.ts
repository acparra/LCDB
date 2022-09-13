import { request, response } from 'express';
import { validationResult } from 'express-validator';

export const validateData = (req = request, resp = response, next: Function) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return resp.status(400).json({
            msg: "Ha ocurrido un error",
            middleware: true,
            errors: errors.mapped()
        });
    }
    next();
    return undefined
}
