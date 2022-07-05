import db from "../connection.js";


export const getUserByUsername = (username) => {
	const sql = "SELECT * FROM user WHERE username = ?";

	return new Promise((resolve, reject) => {
		db.query(sql, [username], (err, results) => {
			if(err){
				console.log(err);
				return reject(err);
			}

			const result = JSON.parse(JSON.stringify(results));
			return resolve(result);
		})
	})
}

export const saveUser = (username) => {
	const sql = "INSERT INTO user (username) VALUES (?)";

	db.query(sql, [username], (err) => {
		if(err) throw err;
	})
};