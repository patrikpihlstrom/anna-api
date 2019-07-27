import {prisma} from '../../prisma/generated/prisma-client';
import {Response, Request} from 'express';


class Graphql {
	index = async (req: Request, res: Response) => {
		try {
			if (req.query.variables == "null") {
				return res.send(JSON.stringify(await prisma.$graphql(req.query.query, null)));
			}
			else {
				return res.send(JSON.stringify(await prisma.$graphql(req.query.query, req.query.variables)));
			}
		} catch (e) {
			return res.send(JSON.stringify(e));
		}
	}
}

export default new Graphql();
