import {JobManager} from '../../src/managers/job';
import {Job} from '../../src/models/job';
import {Repository} from '../../src/contracts/repository';
import {JobCreateInput, prisma as db} from "../../prisma/generated/prisma-client";

test('get_jobs_empty', async () => {
	await db.deleteManyJobs({});
	const jobManager = new JobManager(new EmptyMockRepository());
	const jobs: Job[] = await jobManager.getJobs();
	expect(jobs.length).toBe(0);
});

test('get_jobs_one', async () => {
	await db.deleteManyJobs({});
	const jobManager = new JobManager(new SingleMockRepository());
	const jobs: Job[] = await jobManager.getJobs();
	expect(jobs.length).toBe(1);
});

test('create_jobs_one', async () => {
	await db.deleteManyJobs({});
	let jobManager = new JobManager(new EmptyMockRepository());
	const job = new ChromeJobRequestMock();
	let ids = await jobManager.createJobs([job]);
	expect(ids.length).toBe(1);
});

class EmptyMockRepository implements Repository {
	async jobs(): Promise<Job[]> {
		return [];
	}

	async save(job: JobCreateInput): Promise<Job> {
		return new Job(job.driver, job.site);
	}
}

class SingleMockRepository implements Repository {
	async jobs(): Promise<Job[]> {
		return [new Job('chrome', 'test')];
	}

	async save(job: JobCreateInput): Promise<Job> {
		return new Job(job.driver, job.site);
	}
}

class ChromeJobRequestMock implements JobCreateInput {
	driver: string;
	site: string;
	constructor() {
		this.driver = 'chrome';
		this.site = 'test';
	}
}
