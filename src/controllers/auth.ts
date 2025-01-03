import { Request, Response } from "express"
import dotenv from 'dotenv';
import { generateTokens } from "../utils/generatePairOfTokens";
import { validationResult } from "express-validator";
dotenv.config();

const pwd = process.env.SENHA || '';
const usr = process.env.USUARIO || '';

export const signin = async (req: Request, res: Response) => {
    const { password, user } = req.body;
    if (pwd !== password || user !== usr) {
        res.status(400).json({ error: "Wrong username or password" });
    }

    const [aceToken, refToken] = generateTokens(password);

    res.status(200).json({ acetoken: aceToken, reftoken: refToken });
};
