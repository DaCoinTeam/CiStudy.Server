import { DataSource } from "typeorm"
import TokensEntity from "./tokens.entity"
import { DATA_SOURCE, TOKENS_REPOSITORY } from "../../mysql.constant"

const tokensProviders = [
	{
		provide: TOKENS_REPOSITORY,
		useFactory: (dataSource: DataSource) => dataSource.getRepository(TokensEntity),
		inject: [DATA_SOURCE],
	},
]

export default tokensProviders