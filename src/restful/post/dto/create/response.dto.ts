export default class CreateReponseDto {
	data: {
        postId: string
        title: string
        creatorId: string
        courseId: string    
     } 	
	tokens?: {
        accessToken: string,
        refreshToken: string
    }
}