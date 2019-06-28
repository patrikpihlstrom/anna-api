import {Request} from 'express';
import {JobRequest} from '../models/job';
import {JobUpdateInput, JobWhereInput, JobWhereUniqueInput} from '../../prisma/generated/prisma-client';

export function getJobWhereInput(req: Request): JobWhereInput {
	return null;
}

export function getJobWhereUniqueInput(req: Request): JobWhereUniqueInput {
	return null;
}

export function getJobUpdateInput(req: Request): JobUpdateInput {
	return null;
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
