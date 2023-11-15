import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("tokens")
export default class TokensEntity {
  @PrimaryGeneratedColumn("uuid")
  	tokenId: string
    
  @Column({ length: 100 })
  	tokenImageUrl: string

  @Column("int")
  	chainId: number

  @Column({ length: 42})
  	tokenAddress: string
}