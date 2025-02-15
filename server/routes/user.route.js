import express from "express"
import { userLogin, userLogout } from "../controller/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/login",userLogin)
router.put("/logout",protectRoute,userLogout)


export default router