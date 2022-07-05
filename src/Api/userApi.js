import express from "express";
import {signIn, signUp} from "../Controller/userController.js";
import {followingUser} from "../Controller/followerController.js";
import {auth} from "../Middleware/auth.js";
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/follow", [auth], followingUser);

export default router;
