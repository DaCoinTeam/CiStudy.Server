import { ApiProperty } from "@nestjs/swagger"

export default class PostRequestBodyApi {
   @ApiProperty({ example: "https://firebasestorage.googleapis.com/v0/b/supple-century-363201.appspot.com/o/images%2FUSDT.svg?alt=media&token=51b71f86-fd14-4656-a8ed-8e20b5d4d022", description: "Token Image Url" })
   	tokenImageUrl: string
  
   @ApiProperty({ example: "0xEdEb5f63537EbAe7E6dD79D95Cd2EF20C75Cd732", description: "Token Address" })
   	tokenAddress: string
  
  @ApiProperty({ example: 1001, description: "Chain ID" })
  	chainId: number
}

