import {ID_Input, JobCreateInput, Maybe, String} from '../../prisma/generated/prisma-client';

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