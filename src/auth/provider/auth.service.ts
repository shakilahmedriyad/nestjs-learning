import { Inject, Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { SignInProvider } from './sign-in.provider';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    /**  Inject the HashingProvider to use its hashing capabilities */
    private readonly hashingProvider: HashingProvider,
    /**  Inject the SignInProvider to use its sign-in capabilities */
    private readonly signInProvider: SignInProvider,
  ) {}
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

  public async signIn(signInDto: SignInDto) {
    // validate user by email and password
    return this.signInProvider.signIn(signInDto);
  }
}
