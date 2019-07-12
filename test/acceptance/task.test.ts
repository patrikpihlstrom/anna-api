import * as request from 'supertest';
import {app} from '../../src/server';

describe('GET /tasks', () => {
	test('returns 400 if no namespace was provided', async () => {
		const response = await JobRepository.get('/task');
		expect(response.status).toBe(400);
	});

	test('returns 200 Ok', async () => {
		const response = await JobRepository.get('/task/anna_unittasks');
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('tasks');
		expect(response.body.tasks).toHaveLength(12);
		expect(response.body.tasks[0]).toContain('anna_unittasks.send_keys');
		expect(response.body.tasks[1]).toContain('anna_unittasks.submit');
		expect(response.body.tasks[2]).toContain('anna_unittasks.click');
		expect(response.body.tasks[3]).toContain('anna_unittasks.hover');
		expect(response.body.tasks[4]).toContain('anna_unittasks.wait');
		expect(response.body.tasks[5]).toContain('anna_unittasks.select');
		expect(response.body.tasks[6]).toContain('anna_unittasks.switch_to');
		expect(response.body.tasks[7]).toContain('anna_unittasks.iframe.send_keys');
		expect(response.body.tasks[8]).toContain('anna_unittasks.iframe.submit');
		expect(response.body.tasks[9]).toContain('anna_unittasks.iframe.click');
		expect(response.body.tasks[10]).toContain('anna_unittasks.iframe.hover');
		expect(response.body.tasks[11]).toContain('anna_unittasks.iframe.wait');
	});
});
