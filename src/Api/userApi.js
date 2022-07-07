import express from "express";
import {signIn, signUp} from "../Controller/userController.js";
import {followingUser, followerList, followingList, unFollow} from "../Controller/followerController.js";
import {auth} from "../Middleware/auth.js";
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/follow/:idFollow", [auth], followingUser);
router.get("/followerlist/:id", followerList);
router.get("/followinglist/:id", followingList);
router.delete("/unfollow/:idUnFollow", [auth], unFollow);

export default router;
