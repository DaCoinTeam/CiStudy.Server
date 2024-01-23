import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

const createSchema: SchemaObject = {
  type: "object",
  properties: {
    lectureId: {
      type: "string",
      format: "uuid",
    },
    resourceLink: {
      type: "string",
      format: "binary",
    },
  },
}

export default createSchema
