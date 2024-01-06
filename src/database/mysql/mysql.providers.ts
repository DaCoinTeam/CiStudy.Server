import { DataSource } from "typeorm"
import { DATA_SOURCE } from "./mysql.constant"
import { databaseConfig } from "@config"

const mysqlProviders = [
	{
		provide: DATA_SOURCE,
		useFactory: async () => {
			const dataSource = new DataSource({
				type: "mysql",
				host: "26.78.227.119",
				port: 3306,
				username: databaseConfig().mysql.username,
				password: databaseConfig().mysql.password,
				database: databaseConfig().mysql.schema,
				entities: [
					__dirname + "/../**/*.entity{.ts,.js}",
				],
				synchronize: true,
			})

			return dataSource.initialize()
		},
	},
]

export default mysqlProviders 