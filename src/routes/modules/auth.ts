import Router from 'express'
import { signin } from "../../controllers/auth"
import { body } from 'express-validator'
import validateRequest from '../../utils/validateRequest';
import { resolver } from "../../utils/routeAdapters";

const router = Router()

router.post("/signin",
    [
        body('user').isString().withMessage('O campo "user" deve ser uma string.'),
        body('password').isString().withMessage('O campo "password" deve ser uma string.'),
        validateRequest,
    ],
    resolver(signin))

export default router