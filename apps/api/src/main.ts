import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsService } from '@exceptions/exceptions';
import { RabbitMQService } from '@rabbitmq/rabbitmq';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    process.on('uncaughtException', (err: Error) => {
        app.get(ExceptionsService).report(err);
    });

    app.get(RabbitMQService).connect();

    await app.listen(3000);
}
bootstrap();