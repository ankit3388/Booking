import express from "express"
import { AddAdmin, AdminLogin } from "../Controller/AdminController.js";

const adminRouter= express.Router();

adminRouter.post("/signIn",AddAdmin);
adminRouter.post("/login",AdminLogin)
export default adminRouter;