import * as request from 'supertest';
import {app, handle} from '../../src/server';
import {prisma as db} from "../../prisma/generated/prisma-client";

describe('Post /push', () => {
	test('returns 400 Bad Request if invalid driver(s) or site(s) are specified', async done => {
		request(app).post('/push').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({site: 'test'}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: null, site: ''}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: 0, site: ''}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: '', site: ''}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: 'chrome'}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: 'chrome', site: null}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: 'chrome', site: 0}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
		request(app).post('/push').send({driver: 'chrome', site: ''}).set('Accept', 'application/json').end((err, res) => {
			expect(res.status).toBe(400);
			done();
		});
	});

	test("creates a job & returns a list containing said job's id", async done => {
		await db.deleteManyJobs({});
		request(app).post('/push').set('Accept', 'application/json').send({driver: 'chrome', site: 'test'}).end((err, res) => {
			expect(res.status).toBe(200);
			expect(res.body).toHaveLength(1);
			done();
		});
	});

	afterAll(() => {
		handle.close();
	});
});
