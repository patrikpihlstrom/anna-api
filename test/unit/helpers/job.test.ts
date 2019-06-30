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

describe('get job where input from body', () => {
	test('returns empty job where unique input if no params are specified', () => {
		const body = {};
		const result = helper.getJobWhereUniqueInputFromBody(body);
		expect(result).toHaveProperty('id');
		expect(result.id).toBe(null);
	});

	test('returns empty job where unique input if invalid params are specified', () => {
		const body = {id: ['test', '123']};
		const result = helper.getJobWhereUniqueInputFromBody(body);
		expect(result).toHaveProperty('id');
		expect(result.id).toBe(null);
	});

	test('returns valid job where unique input', () => {
		const body = {id: 'test'};
		const result = helper.getJobWhereUniqueInputFromBody(body);
		expect(result).toHaveProperty('id');
		expect(result.id).toBe('test');
	});
});

describe('get job where input from body', () => {
	test('returns empty job where input if no params are specified', () => {
		const body = {};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toEqual({});
	});

	test('returns job where input with id', () => {
		const body = {id: 0};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('id');
		expect(result.id).toBe(0);
	});

	test('returns job where input with id not eq', () => {
		const body = {id_not: 0};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('id_not');
		expect(result.id_not).toBe(0);
	});

	test('returns job where input with id in', () => {
		const body = {id_in: [0, 1, 2, 3]};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('id_in');
		expect(result.id_in).toHaveLength(4);
		expect(result.id_in).toContain(0);
		expect(result.id_in).toContain(1);
		expect(result.id_in).toContain(2);
		expect(result.id_in).toContain(3);
	});

	test('returns job where input with status', () => {
		const body = {status: 'pending'};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('status');
		expect(result.status).toBe('pending');
	});

	test('returns job where input with status not eq', () => {
		const body = {status_not: 'pending'};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('status_not');
		expect(result.status_not).toBe('pending');
	});

	test('returns job where input with status in', () => {
		const body = {status_in: ['pending', 'starting', 'running', 'done']};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('status_in');
		expect(result.status_in).toHaveLength(4);
		expect(result.status_in).toContain('pending');
		expect(result.status_in).toContain('starting');
		expect(result.status_in).toContain('running');
		expect(result.status_in).toContain('done');
	});

	test('returns job where input with driver', () => {
		const body = {driver: 'chrome'};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('driver');
		expect(result.driver).toBe('chrome');
	});

	test('returns job where input with driver not eq', () => {
		const body = {driver_not: 'chrome'};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('driver_not');
		expect(result.driver_not).toBe('chrome');
	});

	test('returns job where input with driver in', () => {
		const body = {driver_in: ['chrome', 'firefox']};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('driver_in');
		expect(result.driver_in).toHaveLength(2);
		expect(result.driver_in).toContain('chrome');
		expect(result.driver_in).toContain('firefox');
	});

	test('returns job where input with site', () => {
		const body = {site: 'test'};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('site');
		expect(result.site).toBe('test');
	});

	test('returns job where input with site not eq', () => {
		const body = {site_not: 'test'};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('site_not');
		expect(result.site_not).toBe('test');
	});

	test('returns job where input with site in', () => {
		const body = {site_in: ['test', 'annahub']};
		const result = helper.getJobWhereInputFromBody(body);
		expect(result).toHaveProperty('site_in');
		expect(result.site_in).toHaveLength(2);
		expect(result.site_in).toContain('test');
		expect(result.site_in).toContain('annahub');
	});
});

describe('get job update input from body', () => {
	test('returns empty obj with invalid params', () => {
		const body = {};
		const result = helper.getJobUpdateInputFromBody(body);
		expect(result).toEqual({});
	});

	test('only uses string or number params that also exist in the interface', () => {
		const body = {site: ['test', 'annahub'], status: 'done', foo: 'bar'};
		const result = helper.getJobUpdateInputFromBody(body);
		expect(result).toEqual({status: 'done'});
	});
});
