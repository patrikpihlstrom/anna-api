import {Response, Request} from 'express';
import * as request from 'request-promise-native';

class TaskController {
	validate = function(str: string): string|boolean {
		const notAllowed = '!"\'\\@£$|[]≈±#€%&/()=?`´;:,.*¨ \n\t';
		for (let i = 0; i < str.length; ++i) {
			let c = str[i];
			if (notAllowed.indexOf(c) > -1) {
				return false;
			}
		}

		return str;
	};

	getNamespace = async (req: Request): Promise<string | boolean> => {
		if (req.params.namespace != null && typeof req.params.namespace == 'string') {
			return this.validate(req.params.namespace);
		}
		if (req.body.namespace != null && typeof req.body.namespace == 'string') {
			return this.validate(req.body.namespace);
		}
		if (req.query.namespace != null && typeof req.query.namespace == 'string') {
			return this.validate(req.query.namespace);
		}

		return false;
	};

	tasks = async (req: Request, res: Response) => {
		const namespace = await this.getNamespace(req);
		if (typeof namespace == 'string' && namespace.length > 0) {
			const uri = 'http://tasks.annahub.se:5001/?namespace=';
			try {
				const tasks = await request.get({uri: uri + namespace});
				return res.status(200).send(JSON.parse(tasks));
			} catch (e) {
				return res.status(404).send('unable to find a task package under the provided namespace');
			}
		} else {
			return res.status(400).send('provide a namespace');
		}
	};
}

export default new TaskController();