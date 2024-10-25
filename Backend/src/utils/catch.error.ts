import { Request, Response, NextFunction } from "express";
type asyncControler = (
    req:Request,
    res:Response,
    next:NextFunction  ) => Promise<any>

const catchErrors = (controller:asyncControler):asyncControler =>
    async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
        }
    };

export default catchErrors