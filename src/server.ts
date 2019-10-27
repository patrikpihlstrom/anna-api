import {scheduleJob} from "node-schedule";

let bodyParser = require("body-parser");
import * as express from "express";
import {router} from "./routes";
import {prisma} from "../prisma/generated/prisma-client";
import {load} from 'js-yaml';
import * as fs from 'fs';
import * as request from "request";

const config = load(fs.readFileSync(__dirname + '/../../config.yml', 'utf8'));

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
		let jobs = await prisma.jobs({
			orderBy: 'updatedAt_ASC',
			where: {
				status: 'PENDING'
			},
			first: 10
		});
		jobs.forEach((job) => {
			try {
				request.post(config['load_balancer']['endpoint'], {body: job.id}, (error, res, body) => {
					if (error) {
						console.error(error);
						return;
					}
					console.log(`statusCode: ${res.statusCode}`);
					console.log(body);
				});
			} catch (Exception) {
			}
		});
	});
	handle = app.listen(5000, () => console.log("Running on http://localhost:5000/"));
}

export {app, handle};
