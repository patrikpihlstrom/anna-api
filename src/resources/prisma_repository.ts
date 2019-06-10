import {Repository} from "../contracts/repository";
import {Job} from "../models/job";
import {JobCreateInput, prisma} from "../../prisma/generated/prisma-client/index";

export class PrismaRepository implements Repository {
	async jobs(): Promise<Job[]> {
		return await prisma.jobs().$fragment("{driver site status tag}");
	}

	async save(job: JobCreateInput): Promise<Job> {
		return await prisma.createJob(job);
	}
}