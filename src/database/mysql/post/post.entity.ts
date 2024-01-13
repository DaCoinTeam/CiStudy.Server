import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("post")
export default class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    	postId: string
    
    @Column({ type: "varchar", length: 255})
    	title: string

    @Column({ type: "uuid" })
    	creatorId: string
        
    @Column({ type: "uuid"})
    	courseId: string
}

