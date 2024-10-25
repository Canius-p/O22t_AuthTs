import { Router } from "express";
import { registerController } from "../controller/auth.controller,";

const authRoute = Router();

//prefix api/auth

authRoute.post("/register", registerController);
export default authRoute;
