import {Job} from '../models/job';
import {
	BatchPayload,
	JobCreateInput,
	JobUpdateInput,
	JobWhereInput, JobWhereUniqueInput,
	prisma
} from '../../prisma/generated/prisma-client';

export class JobRepository {
	static async get(filter: JobWhereInput): Promise<Job[]> {
		if (filter == null || filter == {}) {
			return await prisma.jobs({});
		}

		return await prisma.jobs({where: filter});
	}

	static async create(job: JobCreateInput): Promise<Job> {
		return await prisma.createJob(job);
	}

	static async update(data: JobUpdateInput, where: JobWhereUniqueInput): Promise<Job> {
		return await prisma.updateJob({data: data, where: where});
	}

	static async delete(where: JobWhereInput): Promise<BatchPayload> {
		return await prisma.deleteManyJobs(where);
	}
}