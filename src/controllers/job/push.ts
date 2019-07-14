import {Response, Request} from 'express';
import {JobRepository} from '../../resources/job_repository';
import {getJobRequests} from '../../helpers/job';


class Push {
	private repository: JobRepository;

	constructor() {
		this.repository = new JobRepository();
	}

	index = async (req: Request, res: Response) => {
		let jobRequests = await getJobRequests(req);
		if (jobRequests.length == 0) {
			return res.status(400).send('specify at least one driver & one site');
		}

		let jobs = [];
		for (let i = 0; i < jobRequests.length; ++i) {
			let job = await this.repository.create(jobRequests[i]);
			jobs.push(job.id);
		}

		res.status(200).send(jobs);
	};
}

export default new Push();