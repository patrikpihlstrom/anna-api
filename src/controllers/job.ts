import {Response, Request} from 'express';
import {JobManager, JobRequest} from '../managers/job';
import {PrismaRepository} from "../resources/prisma_repository";

function getJobRequest(req: Request): boolean | Array<JobRequest> {
	let driver = req.body.driver, site = req.body.site;
	if (!driver || !site ||
		['array', 'string'].indexOf((typeof driver).toLowerCase()) < 0 ||
		['array', 'string'].indexOf((typeof site).toLowerCase()) < 0) {
		return false;
	}

	if (driver instanceof Array) {
		driver.forEach(function (d) {
			if (!(d instanceof String)) {
				return false;
			}
		});
	} else {
		driver = [driver];
	}

	if (site instanceof Array) {
		site.forEach(function (s) {
			if (!(s instanceof String)) {
				return false;
			}
		});
	} else {
		site = [site];
	}

	let jobRequests = [];
	site.forEach(function (s) {
		driver.forEach(function (d) {
			jobRequests.push(new JobRequest(d, s));
		});
	});
	return jobRequests;
}

class JobController {
	private jobManager: JobManager;

	constructor() {
		this.jobManager = new JobManager(new PrismaRepository());
	}

	index = async (req: Request, res: Response) => {
		const jobs = await this.jobManager.getJobs();
		res.json(jobs);
	};

	push = async (req: Request, res: Response) => {
		let jobRequest = getJobRequest(req);
		if (!jobRequest || jobRequest == true) {
			res.status(400).send('specify at least one driver & one job');
			return;
		}
		const jobs = await this.jobManager.createJobs(jobRequest);
		res.status(200).send(jobs);
	};
}

export default new JobController();