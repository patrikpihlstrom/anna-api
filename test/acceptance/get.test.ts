import * as request from 'supertest';
import {app, handle} from '../../src/server';
import {prisma as db} from "../../prisma/generated/prisma-client";

describe('Get /get', () => {
	test('returns 200 Ok', async done => {
		await db.deleteManyJobs({});
		request(app).get('/get').end((err, res) => {
			expect(res.status).toBe(200);
			done();
		});
	});

	test('returns a job if one exists', async done => {
		await db.deleteManyJobs({});
		await db.createJob({driver: 'chrome', site: 'test'});
		request(app).get('/get').end((err, res) => {
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(1);
			expect(res.body[0]).toHaveProperty('driver');
			expect(res.body[0]).toHaveProperty('site');
			expect(res.body[0]).toHaveProperty('status');
			expect(res.body[0]).toHaveProperty('tag');
			expect(res.body[0].driver).toBe('chrome');
			expect(res.body[0].site).toBe('test');
			expect(res.body[0].status).toBe('pending');
			expect(res.body[0].tag).toBe(null);
			done();
		});
	});

	afterAll(() => {
		handle.close();
	});
});
