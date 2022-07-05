import express from "express";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
	try{
		const token = req.get("Token");
		if(!token) return res.status(400).json({code: 404, message: "Not Authentication"});

		const decoded = jwt.verify(token, "rahasia");

		req.user = decoded;
		next();
	}catch(err){
		res.status(500).json({status: "Failed",code: 500, message: "Failed to authentication"});
	}
};