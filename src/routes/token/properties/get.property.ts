import { ApiProperty } from "@nestjs/swagger"

export default class GetRequestQueryApi {
   @ApiProperty({ example: "0xEdEb5f63537EbAe7E6dD79D95Cd2EF20C75Cd732", description: "Token Address" })
   	tokenAddress: string
  
  @ApiProperty({ example: 1001, description: "Chain ID" })
  	chainId: number
}

