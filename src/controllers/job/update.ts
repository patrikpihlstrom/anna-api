import {Response, Request} from 'express';
import {JobRepository} from '../../resources/job_repository';
import {getJobUpdateInput, getJobWhereUniqueInput} from '../../helpers/job';

class Update {
	private repository: JobRepository;

	constructor() {
		this.repository = new JobRepository();
	}

	index = async (req: Request, res: Response) => {
		let where = getJobWhereUniqueInput(req), data = getJobUpdateInput(req);

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
}

export default new Update();
