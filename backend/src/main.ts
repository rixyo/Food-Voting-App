import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('Food Voting API')
      .setDescription('API for voting on restaurants and dishes')
      .setVersion('1.0')
      .addTag('restaurants')
      .addTag('votes')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  const allowedOrigins = [
    'http://localhost:3000',
  ];
     app.enableCors({
       origin: allowedOrigins,
       credentials: true,
     });

  await app.listen(3001);
}
bootstrap();
