import db from "../connection.js";

export const followingToUserById = (data) => {
	const {idUser, idFollow} = data;
	const sql = "INSERT INTO followers (id_user, id_following) VALUES (?, ?);";
	
	db.query(sql, [idUser, idFollow], err => {
		console.log(err)
		if(err) throw err;
	})
};

export const getFollowerById = (data) => {
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