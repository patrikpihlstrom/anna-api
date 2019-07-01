import {Response, Request} from 'express';
import {JobRepository} from '../resources/job_repository';
import {getJobRequests, getJobUpdateInput, getJobWhereUniqueInput} from '../helpers/job';
import {JobUpdateInput} from '../../prisma/generated/prisma-client';

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

	update = async (req: Request, res: Response) => {
		let where = getJobWhereUniqueInput(req);
		let data = getJobUpdateInput(req);
		if (!where || !data) {
			res.status(400).send('bad request');
			return false;
		}

		try {
			let update = await this.repository.update(data, where);
			if (update) {
				return res.status(200).send(update);
			}
			return res.status(500).send(update);
		}
		catch (e) {
			res.status(400).send(e);
		}
	};
}

export default new JobController();