import {Response, Request} from 'express';
import {getJobWhereInput, getWorker} from '../../helpers/job';
import {JobRepository} from "../../resources/job_repository";

class Reserve {
	private repository;

	constructor() {
		this.repository = new JobRepository();
	};

	index = async (req: Request, res: Response) => {
		let worker = getWorker(req);
		if (typeof worker != 'string' || worker.length <= 0) {
			return res.status(400).send('please provide a worker id');
		}

		let where = getJobWhereInput(req);
		let jobs = await JobRepository.get(where);

		if (jobs.length <= 0) {
			return res.status(404).send('couldn\'t find any matching jobs');
		}

		let ids = [];
		let data = {worker: worker, status: 'reserved'};
		for (let i = 0; i < jobs.length; ++i) {
			if (jobs[i].status == null || jobs[i].status == 'pending') {
				let update = await JobRepository.update(data, {id: jobs[i].id});
				if (update) {
					ids.push(jobs[i].id);
				}
			}
		}
		return res.status(200).send(JSON.stringify(ids, null, 3));
	};
}

export default new Reserve();