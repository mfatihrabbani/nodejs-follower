import {followingToUserById, getFollowingById, getAllFollowerById, getAllFollowingById, removeFollow} from "../Model/Repository/followerRepository.js";
import {createError, responseSuccess, responseDataSuccess} from "../Response/handleResponse.js";
import {auth} from "../Middleware/auth.js";

export const followingUser = async (req, res, next) => {
	try{
		const {id} = req.user;
		const {idFollow} = req.params;

		if(id == idFollow) return next(createError(404, "You cant follow yourself"));
		if(!id && !idFollow) return next(createError(404, "Failed To Following"));
		const data = {idUser: id, idFollow};
		const checkAlreadyFollow = await getFollowingById(data);

		if(checkAlreadyFollow.length != 0) return next(createError(400, "You Already Following this user"));
		followingToUserById(data);

		res.status(200).json({status: "Sucess", code: 200, message: `Sucess Following ${idFollow}`});
	}catch(err){
		console.log(err);
		next(createError(500,"Something Error When Following"));
	}
};

export const followerList = async (req, res, next) => {
	try{
		const {id} = req.params;
		const followers = await getAllFollowerById(id);
		if(followers.length == 0) return res.status(200).json({status: "Sucess", code: 200, message: "You dont have followers"});
		res.status(200).json({status: "Sucess",code : 200, message: `Success get list follower ${id}`, data: {total: followers.length, followerList: followers}});
	}catch(err){
		console.log(err)
		next(createError(500, "Something Error when get Followers"))
	}
};

export const followingList = async (req, res, next) => {
	try{
		const {id} = req.params;
		const followings = await getAllFollowingById(id);
		if(followings.length == 0) return res.status(200).json(responseSuccess(200, "You not following other user"));
		res.status(200).json(responseDataSuccess(200, "Success Get Following user", {total: followings.length, followingList: followings}));
	}catch(err){
		console.log(err)
		next(createError(500, "Something Error when get Following"))
	}
}

export const unFollow = async (req, res, next) => {
	try{
		const {id} = req.user;
		const {idUnFollow} = req.params;
		console.log(idUnFollow)
		var data = {idUser: id, idFollow: idUnFollow};
		console.log(data)
		const checkFollowed = await getFollowingById(data);
		if(checkFollowed.length == 0) return next(createError(404, "You not already following this user"));
		data = {idUser: id, idUnFollow};
		removeFollow(data);
		res.status(200).json(responseSuccess(200, `Success unFollow ${idUnFollow}`));
	}catch(err){
		console.log(err);
		next(createError(500, "Something Error when unFollow"));
	}
}