import {getUserByUsername} from "../Model/Repository/userRepository.js";
import {createError} from "../Error/handleError.js";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
	try{
		var {username} = req.body;
		if(!username) return next(createError(404, "Username cannot blank"));

		const result = await getUserByUsername(usernmae);
		if(result.length == 0) return next(createError(404, "Cannot find username"));

		const {username, id} = result[0]
		const token = jwt.sign({ username, id}, "rahasia");

		res.cookie("Token", token,{httpOnly: true});
		res.status(200).json({ message: "Sucess login", code 200});
	}catch(err){
		console.log(err);
		next(createError(500, "Failed Login"));
	}
}