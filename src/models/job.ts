import {ID_Output} from "../../prisma/generated/prisma-client";

export class Job {
	id: ID_Output;
	driver: String;
	site: String;

	constructor(driver: String, site: String) {
		this.driver = driver;
		this.site = site;
	}
}