import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ["https://lorenzon.uz", "https://www.lorenzon.uz"] });
  await app.setGlobalPrefix("api").listen(process.env.PORT);
}
bootstrap();
