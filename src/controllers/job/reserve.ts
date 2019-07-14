import {Response, Request} from 'express';
import {getJobWhereInputFromBody, getLimit, getWorker} from '../../helpers/job';
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

		let where = getJobWhereInputFromBody({status: 'pending'});
		let jobs = await this.repository.get(where);
		let ids = [];
		let data = {worker: worker, status: 'reserved'};
		let limit = getLimit(req);
		for (let i = 0; i < jobs.length; ++i) {
			if (jobs[i].status == null || jobs[i].status == 'pending') {
				let update = await this.repository.update(data, {id: jobs[i].id});
				if (update) {
					ids.push(jobs[i].id);
					if (ids.length >= limit) {
						return res.status(200).send(JSON.stringify(ids, null, 3));
					}
				}
			}
		}
		return res.status(200).send(JSON.stringify(ids, null, 3));
	};
}

export default new Reserve();