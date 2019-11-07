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
}

export = AnnaConfig;