import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import appConfig from "./config/app.config"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// thêm validation
	app.useGlobalPipes(new ValidationPipe())

	//swagger
	const config = new DocumentBuilder()
		.setTitle("CiSwap Server")
		.setDescription(
			"The CiSwap Server is responsible for handling request from CiSwap client.",
		)
		.setVersion("1.0")
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup("/", app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 },
	})

	//cho phép cors
	app.enableCors()

	// lắng nghe ở port nào
	await app.listen(appConfig().port || 3001)
}
bootstrap()
