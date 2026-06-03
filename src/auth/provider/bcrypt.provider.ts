import * as bcrypt from 'bcrypt';

import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  /**
   * Hashes a value using bcrypt.
   * @param value
   * @returns
   */
  public async hash(value: string | Buffer): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(value, salt);
      return hash;
    } catch (error) {
      throw new RequestTimeoutException();
    }
  }

  /**
   * Compares a value with a hash using bcrypt.
   * @param hash
   * @returns
   */

  public async compare(value: string, hash: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(value, hash);
      if (!isMatch) throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
