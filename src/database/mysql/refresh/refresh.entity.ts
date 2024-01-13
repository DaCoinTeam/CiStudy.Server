import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm"

@Entity("refresh")
export default class RefreshEntity {
  @PrimaryGeneratedColumn("uuid")
  	refreshTokenId: string

  @Column({ type: "uuid" })
  	userId: string

  @Column({ type: "varchar", length: 1000 })
  	token: string

  @Column({
  	type: "timestamp",
  	default: () => "CURRENT_TIMESTAMP",
  	onUpdate: "CURRENT_TIMESTAMP",
  })
  	createdAt: Date

  @Column({ type: "boolean", default: false })
  	isDeleted: boolean

  @Column({
  	type: "uuid",
  })
  	clientId: string
  
}
