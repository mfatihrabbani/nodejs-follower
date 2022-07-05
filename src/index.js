import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import db from "./Model/connection.js";
dotenv.config();


const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());


app.get("/", (req, res) => {
	res.send("HELLO");
})

app.use((err, req, res, next) => {
	if(!err) next();
	const errorMessage = err.message;
	const errorStatus = err.status;

	return res.statu(errorStatus).json({
		status: "Failed",
		code: errorStatus,
		message: errorMessage
	})
})

app.listen(process.env.PORT, () => {
	console.log("Server run")
})
