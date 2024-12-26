import { Request, Response } from "express"
import dotenv from 'dotenv';
import { generateTokens } from "../utils/generatePairOfTokens";
import { validationResult } from "express-validator";
dotenv.config();

const pwd = process.env.SENHA || '';
const usr = process.env.USUARIO || '';

export const signin = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ error: result.array() })
        return
    }

    try {
        const { password, user } = req.body;

        //console.log(pwd, password, usr, user)
        if (pwd !== password || user !== usr) {
            res.status(400).json({ error: "Wrong username or password" });
            return
        }

        const [aceToken, refToken] = generateTokens(password);

        res.status(200).json({ acetoken: aceToken, reftoken: refToken });
        return
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
