import { Global, Module } from "@nestjs/common"
import Sha256Service from "./sha256.service"

@Global()
@Module({
	exports: [Sha256Service],
	providers: [Sha256Service],
})
export default class Sha256Module {}