import {Request} from 'express';
import {JobRequest} from '../models/job';
import {JobUpdateInput, JobWhereInput, JobWhereUniqueInput} from '../../prisma/generated/prisma-client';

export function getJobWhereInput(req: Request): JobWhereInput {
	return getJobWhereInputFromBody(req.body);
}

export function getJobWhereInputFromBody(body: any): JobWhereInput {
	let input = {};
	for (let key in body) {
		if (!body.hasOwnProperty(key)) {
			continue;
		}

		input[key] = body[key];
	}

	return input;
}

export function getJobWhereUniqueInput(req: Request): JobWhereUniqueInput {
	return getJobWhereUniqueInputFromBody(req.body);
}

export function getJobWhereUniqueInputFromBody(body: any): JobWhereUniqueInput {
	if (body.hasOwnProperty('id') && typeof body.id == 'string' || typeof body.id == 'number') {
		return {id: body.id};
	}

	return {id: null};
}

export function getJobUpdateInput(req: Request): JobUpdateInput {
	return getJobUpdateInputFromBody(req.body);
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
	if (param instanceof Array) {
		for (let i = 0; i < param.length; ++i) {
			if (typeof param[i] != 'string') {
				return [];
			}
		}
	} else {
		return [param];
	}
}
