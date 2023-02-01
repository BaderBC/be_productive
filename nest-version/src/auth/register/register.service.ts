import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './register.dto';
import * as sha512 from 'sha512';

@Injectable()
export class RegisterService {
  async addNewUser(userDto: RegisterUserDto) {
    const { email, firstName, lastName, password } = userDto;
    //throw new Error();
    await global.db.none(
      'INSERT INTO users(email, firstname, lastname, hashed_password)' +
        'VALUES ($1, $2, $3, $4)',
      [email, firstName, lastName, sha512(password)],
    );
  }
}
