import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

const createCommentSchema : SchemaObject = {
	type: "object",
	properties: {
		data: {
			type: "object",
			properties: {
				postId: {
					type: "string",
				},
				postCommentContents: {
					type: "array",
					items: {
						type: "object",
						properties: {
							content: {
								type: "string",
							},
							contentType: {
								type: "string",
								enum: ["Image", "Video", "Text"],
							},
						},
					},
				},
			},
		},
		files: {
			type: "array",
			items: {
				type: "string",
				format: "binary"
			},
		},
	}
}

export default createCommentSchema