import {scheduleJob} from "node-schedule";

let bodyParser = require("body-parser");
import * as express from "express";
import {router} from "./routes";
import {JobWhereInput, prisma} from "../prisma/generated/prisma-client";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", router);
app.use("/task", router);

let handle = null;
if (process.env.NODE_ENV !== "test") {
	scheduleJob('* * * * *', async () => {
		let date = new Date();
		date.setDate(date.getDate() - 14);
		await prisma.deleteManyJobs({updatedAt_lt: date});
	});
	handle = app.listen(5000, () => console.log("Running on http://localhost:5000/"));
}

export {app, handle};
