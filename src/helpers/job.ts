import {Request} from 'express';
import {JobRequest} from '../models/job';
import {JobUpdateInput, JobWhereInput, JobWhereUniqueInput} from '../../prisma/generated/prisma-client';

export function getJobWhereInput(req: Request): JobWhereInput {
	if (!req.body.hasOwnProperty('where')) {
		return getJobWhereInputFromBody(req.body);
	}
	return getJobWhereInputFromBody(req.body.where);
}

export function getJobWhereInputFromBody(body: any): JobWhereInput {
	let where = {};
	if (body != null) {
		for (let key in body) {
			if (!body.hasOwnProperty(key)) {
				continue;
			}

			where[key] = body[key];
		}
	}

	return where;
}

export function getJobWhereUniqueInput(req: Request): JobWhereUniqueInput {
	if (!req.body.hasOwnProperty('where')) {
		return getJobWhereUniqueInputFromBody(req.body);
	}
	return getJobWhereUniqueInputFromBody(req.body.where);
}

export function getJobWhereUniqueInputFromBody(body: any): JobWhereUniqueInput {
	if (body != null && body.hasOwnProperty('id')) {
		return {id: body.id};
	}

	return {id: null};
}

export function getJobUpdateInput(req: Request): JobUpdateInput {
	if (!req.body.hasOwnProperty('data')) {
		return getJobUpdateInputFromBody(req.body);
	}
	return getJobUpdateInputFromBody(req.body.data);
}

export function getJobUpdateInputFromBody(body: any): JobUpdateInput {
	let result = {};
	for (let key in body) {
		if (!body.hasOwnProperty(key)) {
			continue;
		}

		if (['site', 'driver', 'status', 'container', 'log'].indexOf(key) >= 0) {
			result[key] = body[key];
		}
	}

	return result;
}

export function getJobRequests(req: Request): JobRequest[] {
	return getJobRequestsFromBody(req.body);
}

export function getJobRequestsFromBody(body: any): JobRequest[] {
	if (body.driver == null || body.site == null) {
		return [];
	}
	const driver = parseJobRequestParam(body.driver), site = parseJobRequestParam(body.site);
	let jobRequests = [];
	site.forEach(function (s) {
		driver.forEach(function (d) {
			jobRequests.push(new JobRequest(d, s));
		});
	});
	return jobRequests;
}

export function getWorker(req: Request): string | boolean {
	let worker = validate(req.header('worker'));
	if (typeof worker != 'string' || worker.length <= 0) {
		return false;
	}

	return worker;
}

function parseJobRequestParam(param: any): string[] {
	let values = [];
	if (param instanceof Array) {
		for (let i = 0; i < param.length; ++i) {
			if (typeof param[i] != 'string') {
				return [];
			}

			values.push(param[i]);
		}
	} else {
		return [param];
	}
	return values;
}

export function validate(str: string): string | boolean {
	const notAllowed = '!"\'\\@£$|[]≈±#€%&/()=?`´;:,.*¨ \n\t';
	for (let i = 0; i < str.length; ++i) {
		let c = str[i];
		if (notAllowed.indexOf(c) > -1) {
			return false;
		}
	}

	return str;
}
