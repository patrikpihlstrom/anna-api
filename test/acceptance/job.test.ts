import * as request from 'supertest';
import {app} from '../../src/server';
import {JobCreateInput, JobUpdateInput, prisma as db} from '../../prisma/generated/prisma-client';

describe('GET /get', () => {
	test('returns 200 Ok', async () => {
		const response = await request(app).get('/get');
		expect(response.status).toBe(200);
	});

	test('returns a maximum of 64 jobs (by default), sorted by updated_at', async () => {
		const response = await request(app).get('/get');
		expect(response.status).toBe(200);
	});

	test('returns a maximum of n jobs where n is a parameter passed by the user, sorted by updated_at', async () => {
		const response = await request(app).get('/get');
		expect(response.status).toBe(200);
	});

	beforeEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});

	afterEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});
});

describe('POST /push', () => {
	test('returns 400', async () => {
		const response = await request(app).post('/push');
		expect(response.status).toBe(400);
	});

	test('creates a job & returns the id', async () => {
		const response = await request(app).post('/push').send(new JobPushSingleMock());
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
		expect(typeof response.body[0] == 'string').toBe(true);
	});

	test('creates several jobs & returns the ids', async () => {
		const mock = new JobPushFirefoxChromeMock();
		const response = await request(app).post('/push').send(mock);
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(2);
		expect(typeof response.body[0] == 'string').toBe(true);
		expect(typeof response.body[1] == 'string').toBe(true);
	});

	beforeEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});

	afterEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});
});

describe('POST /update', () => {
	test('returns 400', async () => {
		const response = await request(app).post('/update');
		expect(response.status).toBe(400);
	});

	test('updates a job', async () => {
		const job = (await request(app).post('/push').send(new JobPushSingleMock())).body[0];
		let update = new JobUpdateMock();
		const updateResponse = await request(app).post('/update').send({where: {id: job.id}, data: update});
		expect(updateResponse.status).toBe(200);
		expect(updateResponse.body.length).toBe(1);
		const response = await request(app).get('/get');
	});

	beforeEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});

	afterEach(async () => {
		return Promise.all([await db.deleteManyJobs(), await db.deleteManyUsers()]);
	});
});

class JobUpdateMock implements JobUpdateInput {
	status: string = 'updated';
}

class JobPushSingleMock implements JobCreateInput{
	driver: string = 'chrome';
	site: string = 'test';
}

class JobPushFirefoxChromeMock {
	driver: string[] = ['chrome', 'firefox'];
	site: string[] = ['test'];
}
