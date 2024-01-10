import { Global, Module } from "@nestjs/common"
import TokenGeneratorService from "./token-generator.service"
import { JwtService } from "@nestjs/jwt"

@Global()
@Module({
	exports: [TokenGeneratorService, JwtService],
	providers: [TokenGeneratorService, JwtService],
})
export default class TokenGeneratorModule {}