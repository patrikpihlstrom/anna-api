import {load} from "js-yaml";
import * as fs from "fs";

interface AnnaConfig {
	port: number,
	load_balancer: {
		endpoint: string,
		user: string,
		password: string
		limit: number,
		cron: string
	},
	job: {
		life: number
	}
	task_service: {
		endpoint: string
	}
}

const config: AnnaConfig = load(fs.readFileSync(__dirname + '/../../config.yml', 'utf8'));

export {AnnaConfig, config};
