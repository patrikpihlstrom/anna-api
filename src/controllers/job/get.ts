import {Response, Request} from 'express';
import {JobRepository} from '../../resources/job_repository';
import {getJobWhereInput} from '../../helpers/job';

class Get {
	private repository: JobRepository;

	constructor() {
		this.repository = new JobRepository();
	}

	index = async (req: Request, res: Response) => {
		let where = await getJobWhereInput(req);
		let jobs = await this.repository.get(where);
		res.json(jobs);
	};
}

export default new Get();