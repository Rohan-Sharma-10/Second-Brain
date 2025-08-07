import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

export default function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return void res.status(401).json({
            msg: "Invalid Token Format"
        })
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if(err) {
            return void res.status(403).json({
                msg: "Invalid Token",
                error: err.message
            })
        }
        (req as any).user = user.userId;
        next();
    })
}

