import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

const createSchema: SchemaObject = {
  type: "object",
  properties: {
    lectureTitle: {
      type: "string",
    },
    videoFile: {
      type: "string",
      format: "binary",
    },
  },
}

export default createSchema