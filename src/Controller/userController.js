import {getUserByUsername, saveUser} from "../Model/Repository/userRepository.js";
import {createError} from "../Response/handleResponse.js";
import jwt from "jsonwebtoken";

export const signIn = async (req, res, next) => {
	try{
		let {usernameInput} = req.body;
		if(!usernameInput) return next(createError(404, "Username cannot blank"));

		const result = await getUserByUsername(usernameInput);
		if(result.length == 0) return next(createError(404, "Cannot find username"));

		const {username, id} = result[0]
		const token = jwt.sign({ username, id}, "rahasia");
		console.log(token)
		res.set({"Token": token});
		console.log(id);
		res.status(200).json({ message: "Sucess signIn", code: 200, id});
	}catch(err){
		console.log(err);
		next(createError(500, "Failed signIn"));
	}
}

export const signUp = async (req, res, next) => {
	try{
		let {username} = req.body;
		console.log(username);
		if(!username) return next(createError(404, "Username cannot blank"));

		const result = await getUserByUsername(username);
		if(result.length != 0) return next(createError(404, "Username already used"));

		saveUser(username);
		res.status(200).json({message: "Sucess signUp", code: 200});
	}catch(err){
		console.log(err);
		next(createError(500, "Failed signUp"));
	}
}

export const renderLogin = (req, res, next) => {
		res.render("../View/loginPage.ejs",{title: "Login Page"})
}


export const renderRegister = (req, res, next) => {
	try{
		res.render("../View/registerPage.ejs",{title: "Register Page"})
	}catch(err){
		console.log(err)
		next(createError(500, "Failed to render register"))
	}
}