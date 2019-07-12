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
		if (!where) {
			return res.status(400).send('unable to construct a where clause from the parameters given');
		}
		let jobs = await JobRepository.get(where);
		return res.status(200).send(JSON.stringify(jobs, null, 3));
	};
}

export default new Get();