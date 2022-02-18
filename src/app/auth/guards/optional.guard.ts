import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalGuard extends AuthGuard('jwt') {
  handleRequest(err, member) {
    return member;
  }
}
