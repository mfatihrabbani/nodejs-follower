import express from "express";

const router = express.Router();

router.get("/:id", (req, res) => {
	res.send("USER PAGE")
})

export default router;