import {JobRepository} from '../../../src/resources/job_repository';
import {
	JobCreateInput, JobUpdateInput,
	prisma as db
} from '../../../prisma/generated/prisma-client';
import {Job} from '../../../src/models/job';

describe('Job Repository', () => {
	test('get no job', async () => {
		let repository = new EmptyMockRepository();
		let jobs: Job[] = await repository.get({});
		expect(jobs.length).toBe(0);
	});

	test('get a job', async () => {
		let repository = new SingleMockRepository();
		let jobs: Job[] = await repository.get({});
		expect(jobs.length).toBe(1);
	});

	test('create a job', async () => {
		let repository = new EmptyMockRepository();
		let job: Job = await repository.create(new JobRequestMock());
		expect(job.driver).toBe('chrome');
		expect(job.site).toBe('test');
		expect(job.status).toBe('pending');
		let jobs: Job[] = await repository.get({});
		expect(jobs.length).toBe(1);
	});

	test('update a job', async () => {
		let repository = new EmptyMockRepository();
		let job: Job = await repository.create(new JobRequestMock());
		expect(job.driver).toBe('chrome');
		expect(job.site).toBe('test');
		expect(job.status).toBe('pending');
		await repository.update(new JobUpdateMock(), {id: job.id});
		expect((await repository.get({id: job.id}))[0].site).toBe(new JobUpdateMock().site);
	});

	test('delete a job', async () => {
		let repository = new EmptyMockRepository();
		let job: Job = await repository.create(new JobRequestMock());
		expect(job.driver).toBe('chrome');
		expect(job.site).toBe('test');
		expect(job.status).toBe('pending');
		await repository.delete({id: job.id});
		let jobs = await repository.get({id: job.id});
		expect(jobs.length).toBe(0);
	});

	beforeEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});

	afterEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});
});

class EmptyMockRepository extends JobRepository {
	constructor() {
		super();
	}
}

class SingleMockRepository extends JobRepository {
	constructor() {
		super();
		this.create({driver: 'chrome', site: 'test'});
	}
}

class JobRequestMock implements JobCreateInput {
	driver: string;
	site: string;

	constructor() {
		this.driver = 'chrome';
		this.site = 'test';
	}
}

class JobUpdateMock implements JobUpdateInput {
	site: string;

	constructor() {
		this.site = 'updated';
	}
}
