import { Injectable } from '@nestjs/common';
// Use default import for bcryptjs
import bcrypt from 'bcryptjs';

export interface User {
  id: number;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 10),
    },
  ];

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
