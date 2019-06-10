import {Job} from '../models/job';
import {Repository} from '../contracts/repository';
import {JobCreateInput} from "../../prisma/generated/prisma-client";

export class JobRequest implements JobCreateInput {
	driver: string;
	site: string;
	constructor(driver: string, site: string) {
		this.driver = driver;
		this.site = site;
	}
}

export class JobManager {
	private repository: Repository;

	constructor(repository: Repository) {
		this.repository = repository;
	}

	async getJobs(): Promise<Job[]> {
		return await this.repository.jobs();
	}

	async createJobs(jobs: Array<JobRequest>): Promise<Number[]> {
		let ids = [];
		for (let i in jobs) {
			let result = await this.repository.save(jobs[i]);
			ids.push(result.id);
		}

		return ids;
	}
}