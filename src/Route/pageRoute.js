import express from "express";
import {renderLogin, renderRegister} from "../Controller/userController.js";
import {renderFollow} from "../Controller/followerController.js"
const router = express.Router();

router.get("/login", renderLogin);
router.get("/register", renderRegister);
router.get("/:id", renderFollow)

export default router;