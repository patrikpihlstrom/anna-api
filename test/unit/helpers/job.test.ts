import * as helper from '../../../src/helpers/job';

describe('get job requests from req object', () => {
	test('returns an empty array if the req object body doesn\'t contain valid parameters', () => {
		const body = {something: ''};
		const result = helper.getJobRequestsFromBody(body);
		expect(result).toHaveLength(0);
	});

	test('returns an array containing one job request', () => {
		const body = {driver: 'chrome', site: 'test'};
		const result = helper.getJobRequestsFromBody(body);
		expect(result).toHaveLength(1);
		expect(result[0]).toHaveProperty('driver');
		expect(result[0]).toHaveProperty('site');
		expect(result[0].driver).toBe('chrome');
		expect(result[0].site).toBe('test');
	});
});
