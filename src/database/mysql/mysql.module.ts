import { Module } from "@nestjs/common"
import mysqlProviders from "./mysql.providers"

@Module({
	providers: [...mysqlProviders],
	exports: [...mysqlProviders],
})
export default class MySQLModule {}