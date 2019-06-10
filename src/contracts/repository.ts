import {Job} from '../models/job';
import {JobCreateInput} from "../../prisma/generated/prisma-client";

export interface Repository {
	jobs(): Promise<Job[]>;

	save(job: JobCreateInput): Promise<Job>;
}