import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './CustomLogger/customLogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true,
    rawBody:true 
  });
  app.setGlobalPrefix('api');
  app.useLogger(app.get(CustomLogger));

  const options = new DocumentBuilder()
    .setTitle('Tasks API')
    .setDescription('takes api for Hot project')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(5000);
}
bootstrap();
