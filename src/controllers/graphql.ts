import {prisma} from '../../prisma/generated/prisma-client';
import {Response, Request} from 'express';


class Graphql {
	index = async (req: Request, res: Response) => {
		try {
			let response = await prisma.$graphql(req.body.query, req.body.variables);
			return res.send(JSON.stringify(response));
		} catch (e) {
			return res.send(JSON.stringify(e));
		}
	}
}

export default new Graphql();
