import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class AuthService {
  constructor(private readonly hashingProvider: HashingProvider) {}
  public isAuth(id: number) {
    return {
      id,
      name: 'John Doe',
      age: 30,
      auth: true,
    };
  }

  /**
   * Hashes a password using the hashing provider.
   * @param password
   * @returns
   */
  public async hashPassword(password: string): Promise<string> {
    return this.hashingProvider.hash(password);
  }

  /**
   * Compares a password with a hash using the hashing provider.
   * @param password
   * @param hash
   * @returns
   */
  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return this.hashingProvider.compare(password, hash);
  }

  public async signIn(email: string, password: string) {
    // validate user by email and password
    // if valid, return user object, else return null
  }
}
