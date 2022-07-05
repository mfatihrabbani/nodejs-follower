import {followingToUserById, getFollowerById} from "../Model/Repository/followerRepository.js";
import {createError} from "../Error/handleError.js";
import {auth} from "../Middleware/auth.js";

export const followingUser = async (req, res, next) => {
	try{
		const {id} = req.user;
		const {idFollow} = req.body;

		if(!id && !idFollow) return next(createError(404, "Failed To Following"));
		const data = {idUser: id, idFollow};
		const checkAlreadyFollow = await getFollowerById(data);

		if(checkAlreadyFollow.length != 0) return next(createError(400, "You Already Following this user"));
		followingToUserById(data);

		res.status(200).json({status: "Sucess", code: 200, message: `Sucess Following ${idFollow}`});
	}catch(err){
		console.log(err);
		next(createError(500, "Something Error When Following"));
	}
};