import {Response, Request} from 'express';
import {JobRepository} from '../../resources/job_repository';
import {getJobWhereInput} from '../../helpers/job';

class Rm {
	private repository: JobRepository;

	constructor() {
		this.repository = new JobRepository();
	}

	index = async (req: Request, res: Response) => {
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

export default new Rm();
