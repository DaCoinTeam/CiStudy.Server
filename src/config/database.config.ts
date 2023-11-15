export default () => {
	return {
		mysql: {
			username: process.env.MYSQL_USERNAME,
			password: process.env.MYSQL_PASSWORD,
			schema: process.env.MYSQL_SCHEMA
		}
	}
}