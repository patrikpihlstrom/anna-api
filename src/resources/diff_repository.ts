import {Diff} from '../models/diff';
import {
	BatchPayload,
	DiffCreateInput,
	DiffUpdateInput,
	DiffWhereInput,
	DiffWhereUniqueInput,
	prisma
} from "../../prisma/generated/prisma-client";

export class DiffRepository {
	static async get(filter: DiffWhereInput): Promise<Diff[]> {
		return await prisma.diffs({where: filter});
	}

	static async create(diff: DiffCreateInput): Promise<Diff> {
		return await prisma.createDiff(diff);
	}

	static async update(data: DiffUpdateInput, where: DiffWhereUniqueInput): Promise<Diff> {
		return await prisma.updateDiff({data: data, where: where});
	}

	static async delete(where: DiffWhereInput): Promise<BatchPayload> {
		return await prisma.deleteManyDiffs(where);
	}
}