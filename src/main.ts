import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS properly
  app.enableCors({
    origin: 'http://localhost:3001', // Frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(3000);
}
void bootstrap();

// users.service.ts
import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, email: 'admin@example.com', password: 'password' },
  ];

  findByEmail(email: string): User | null {
    return this.users.find((user) => user.email === email) || null;
  }
}
