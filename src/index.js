import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import db from "./Model/connection.js";
import pageRouter from "./Route/pageRoute.js";
import userRouter from "./Api/userApi.js";
dotenv.config();


const app = express();

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use(morgan(":method :url :response-time"))

app.get("/", (req, res) => {
	res.send("HELLO");
})
app.use("/", pageRouter);
app.use("/api/user", userRouter);
app.use((err, req, res, next) => {
	if(!err) next();
	const errorMessage = err.message || "Something Error";
	const errorStatus = err.status || 500;

	res.status(errorStatus).json({
		status: "Failed",
		code: errorStatus,
		message: errorMessage
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server run")
})
