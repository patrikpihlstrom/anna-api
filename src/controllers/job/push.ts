import {Response, Request} from 'express';
import {JobRepository} from '../../resources/job_repository';
import {getJobRequests, getJobUpdateInput, getJobWhereUniqueInput, getJobWhereInput} from '../../helpers/job';


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
			jobs.push((await JobRepository.create(jobRequests[i])).id);
		}

		res.status(200).send(jobs);
	};
}

export default new Push();