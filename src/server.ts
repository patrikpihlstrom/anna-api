import {scheduleJob} from "node-schedule";

let bodyParser = require("body-parser");
import * as express from "express";
import {router} from "./routes";
import {prisma} from "../generated/prisma-client";
import * as request from "request";
import {config} from "./config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", router);
app.use("/task", router);

async function sendJob(job) {
	try {
		await request.post(config.load_balancer.endpoint, {body: job.id}, (error, res, body) => {
			if (error) {
				console.error(error);
				return;
			}
			console.log(body);
		});
	} catch (e) {
		console.error(e.toString());
	}
}

async function sendJobs() {
	let limit = config.load_balancer.limit;
	let jobs = await prisma.jobs({
		orderBy: 'updatedAt_ASC',
		where: {
			status: 'PENDING'
		},
		first: limit
	});

	for (const job of jobs) {
		await sendJob(job);
	}
}

scheduleJob(config.load_balancer.cron, async () => {
	await sendJobs();
});

scheduleJob('* * * * *', async () => {
	let date = new Date();

	date.setDate(date.getDate() - config.job.life);
	await prisma.deleteManyJobs({updatedAt_lt: date});
});
let handle = app.listen(config.port, () => console.log(`Running on http://localhost:${config.port}/`));

export {app, handle};
