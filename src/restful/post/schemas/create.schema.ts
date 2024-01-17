import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

const createSchema : SchemaObject = {
	type: "object",
	properties: {
		data: {
			type: "object",
			properties: {
				title: {
					type: "string",
				},
				courseId: {
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

export default createSchema