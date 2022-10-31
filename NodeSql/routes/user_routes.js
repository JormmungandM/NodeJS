import { Router } from "express";
import { addUserMiddleware } from "../controllers/user_controller.js";
import { MyLogger } from "../app.js";

const router_user = Router();

router_user.route("/user").post(addUserMiddleware, (req, res) => {
    MyLogger.info("file name: 'user_routes.js', route: '/user', type request: 'POST', ip user: " + "'" + req.ip + "'" )
});

export default router_user;