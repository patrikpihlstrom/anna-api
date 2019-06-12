import {ID_Input, ID_Output, JobCreateInput, Maybe, String} from "../../prisma/generated/prisma-client";
import {Request} from "express";

export class Job {
	id?: Maybe<ID_Input>;
	container?: Maybe<String>;
	driver: String;
	site: String;
	status?: Maybe<String>;
	log?: Maybe<String>;

	constructor(driver: String, site: String) {
		this.driver = driver;
		this.site = site;
	}
}

export class JobRequest implements JobCreateInput {
	driver: String;
	site: String;

	constructor(driver: String, site: String) {
		this.driver = driver;
		this.site = site;
	}
}

export function getJobRequests(req: Request): JobRequest[] {
	let driver = req.body.driver, site = req.body.site;
	if (!driver || !site ||
		['array', 'string'].indexOf((typeof driver).toLowerCase()) < 0 ||
		['array', 'string'].indexOf((typeof site).toLowerCase()) < 0) {
		return [];
	}

	if (driver instanceof Array) {
		driver.forEach(function (d) {
			if (!(d instanceof String)) {
				return false;
			}
		});
	} else {
		driver = [driver];
	}

	if (site instanceof Array) {
		site.forEach(function (s) {
			if (!(s instanceof String)) {
				return false;
			}
		});
	} else {
		site = [site];
	}

	let jobRequests = [];
	site.forEach(function (s) {
		driver.forEach(function (d) {
			jobRequests.push(new JobRequest(d, s));
		});
	});
	return jobRequests;
}