import {Response, Request} from 'express';
import {JobRepository} from '../resources/job_repository';
import {getJobRequests, getJobUpdateInput, getJobWhereUniqueInput, getJobWhereInput} from '../helpers/job';

class JobController {
	private repository: JobRepository;

	constructor() {
		this.repository = new JobRepository();
	}

	index = async (req: Request, res: Response) => {
		const where = getJobWhereInput(req);
		const jobs = await this.repository.get(where);
		res.json(jobs);
	};

	push = async (req: Request, res: Response) => {
		let jobRequests = getJobRequests(req);
		if (jobRequests.length == 0) {
			return res.status(400).send('specify at least one driver & one site');
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
			return res.status(400).send('bad request');
		}

		try {
			let update = await this.repository.update(data, where);
			if (update) {
				return res.status(200).send(update);
			}
		}
		catch (e) {
			return res.status(400).send(e.message);
		}
		return res.status(500).send('unknown error occurred');
	};

	rm = async (req: Request, res: Response) => {
		let where = getJobWhereInput(req);
		if (!where) {
			return res.status(400).send('bad request');
		}

		try {
			let rm = await this.repository.delete(where);
			if (rm) {
				return res.status(200).send(rm);
			}
		}
		catch (e) {
			res.status(500).send(e.message);
		}
		return res.status(500).send('unknown error occurred');
	};
}

export default new JobController();