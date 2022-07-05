import mysql from "mysql2";

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "follower"
});

db.connect(err => {
	if(err){
		console.log(err);
		throw err;
	}

	console.log("Database Connected");
});

export default db;