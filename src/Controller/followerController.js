import {followingToUserById, getFollowingById, getAllFollowerById, getAllFollowingById, removeFollow} from "../Model/Repository/followerRepository.js";
import {createError, responseSuccess, responseDataSuccess} from "../Response/handleResponse.js";
import {getUserById} from "../Model/Repository/userRepository.js"
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
		console.log(id)
		const followers = await getAllFollowerById(id);
		if(followers.length == 0) return res.status(200).json(responseDataSuccess(200, "You dont have followers", {total: 0}));
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
		if(followings.length == 0) return res.status(200).json(responseDataSuccess(200, "You not following other user", {total: 0}));
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
		var data = {idUser: id, idFollow: idUnFollow};
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

export const renderFollow = async (req, res, next) => {
	try{
		const {id} = req.params;
		console.log(id)
		const user = await getUserById(id);
		if(user.length == 0) return next(createError(404, "No one username"));
		res.render("../View/followPage.ejs", {id, username: user[0].username});
	}catch(err){
		console.log(err)
		next(createError(500, "Something Error when render follow"))
	}
}

export const renderFollowersList = (req, res, next) => {
	try{
		const {id} = req.params;
		console.log(id)
		const user = await getUserById(id);
		if(user.length == 0) return next(createError(404, "No one username"));
		res.render("../View/followerList.ejs", {id, username: user[0].username});
	}catch(err){
		console.log(err)
		next(createError(500, "Something Error when render follower list"))
	}
}