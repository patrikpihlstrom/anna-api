import {ID_Input, DiffConnectionPromise, Maybe, String} from "../../prisma/generated/prisma-client";

export class Diff {
	id?: Maybe<ID_Input>;
	job?: Maybe<DiffConnectionPromise>;
	field?: String;
	pre?: String;
	post?: String;

	constructor(field: String, pre: String, post: String) {
		this.field = field;
		this.pre = pre;
		this.post = post;
	}
}