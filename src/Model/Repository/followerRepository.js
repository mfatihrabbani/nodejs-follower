import db from "../connection.js";

export const followingToUserById = (data) => {
	const {idUser, idFollow} = data;
	const sql = "INSERT INTO followers (id_user, id_following) VALUES (?, ?);";
	
	db.query(sql, [idUser, idFollow], err => {
		console.log(err)
		if(err) throw err;
	})
};

export const getFollowingById = (data) => {
	const {idUser, idFollow} = data;
	const sql = "SELECT * FROM followers WHERE id_user = ? AND id_following = ?;";

	return new Promise((resolve, reject) => {
		db.query(sql, [idUser, idFollow], (err, results) => {
			if(err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
};

export const getAllFollowerById = (id) => {
	const sql = "SELECT	followers.id_user, user.username FROM followers JOIN user ON (user.id = followers.id_user) WHERE id_following = ?;";

	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, results) => {
			if(err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
};

export const getAllFollowingById = (id) => {
	const sql = "SELECT	followers.id_following, user.username FROM followers JOIN user ON (user.id = followers.id_following) WHERE id_user = ?;";

	return new Promise((resolve, reject) => {
		db.query(sql, [id], (err, results) => {
			if(err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
};

export const removeFollow = (data) => {
	const {idUser, idUnFollow} = data;
	const sql = "DELETE FROM followers WHERE id_user = ? AND id_following = ?;"

	db.query(sql, [idUser, idUnFollow], (err) => {
		console.log(err);
		if(err) throw err;
	})
}
