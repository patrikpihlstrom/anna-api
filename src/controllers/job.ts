import {Response, Request} from 'express';
import {JobRepository} from "../resources/job_repository";
import {getJobRequests} from "../models/job";

class JobController {
	private repository: JobRepository;

	constructor() {
		this.repository = new JobRepository();
	}

	index = async (req: Request, res: Response) => {
		const jobs = await this.repository.get({});
		res.json(jobs);
	};

	push = async (req: Request, res: Response) => {
		let jobRequests = getJobRequests(req);
		if (jobRequests.length == 0) {
			res.status(400).send('specify at least one driver & one site');
			return false;
		}

		let jobs = [];
		for (let i = 0; i < jobRequests.length; ++i) {
			jobs.push((await this.repository.create(jobRequests[i])).id);
		}

		res.status(200).send(jobs);
	};
}

export default new JobController();