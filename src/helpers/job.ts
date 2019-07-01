import {Request} from 'express';
import {JobRequest} from '../models/job';
import {JobUpdateInput, JobWhereInput, JobWhereUniqueInput} from '../../prisma/generated/prisma-client';

export function getJobWhereInput(req: Request): JobWhereInput {
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
	return getJobWhereUniqueInputFromBody(req.body.where);
}

export function getJobWhereUniqueInputFromBody(body: any): JobWhereUniqueInput {
	if (body != null && (body.hasOwnProperty('id') && typeof body.id == 'string' || typeof body.id == 'number')) {
		return {id: body.id};
	}

	return {id: null};
}

export function getJobUpdateInput(req: Request): JobUpdateInput {
	return getJobUpdateInputFromBody(req.body.data);
}

export function getJobUpdateInputFromBody(body: any): JobUpdateInput {
	let result = {};
	for (let key in body) {
		if (!body.hasOwnProperty(key)) {
			continue;
		}

		if (['site', 'driver', 'status', 'container', 'log'].indexOf(key) >= 0) {
			if (typeof body[key] == 'string' || typeof body[key] == 'number') {
				result[key] = body[key];
			}
		}
	}

	return result;
}

function getDriversAndSites(body: any) {
	if (body.driver == null || body.site == null) {
		return [];
	}
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

function parseJobRequestParam(param: any): string[] {
	let params = [];
	if (param instanceof Array) {
		for (let i = 0; i < param.length; ++i) {
			if (typeof param[i] != 'string') {
				return [];
			}

			params.push(param[i]);
		}
	} else {
		return [param];
	}
	return params;
}
