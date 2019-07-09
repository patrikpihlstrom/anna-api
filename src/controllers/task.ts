import {Response, Request} from 'express';
import * as request from 'request-promise-native';

class TaskController {
	getNamespace = function(req: Request): string|boolean {
		if (req.body.namespace != null && typeof req.body.namespace == 'string') {
			return req.body.namespace;
		}

		if (req.query.namespace != null && typeof req.query.namespace == 'string') {
			return req.query.namespace;
		}

		return false;
	};

	index = async (req: Request, res: Response) => {
		const namespace = this.getNamespace(req);
		if (typeof namespace == 'string' && namespace.length > 0) {
			const uri = 'http://tasks.annahub.se:5001/?namespace=';
			try {
				const tasks = await request.get({uri: uri + namespace});
				return res.status(200).send(JSON.parse(tasks));
			} catch (e) {
				return res.status(404).send('unable to find the provided namespace');
			}
		} else {
			return res.status(400).send('provide a namespace');
		}
	};
}

export default new TaskController();