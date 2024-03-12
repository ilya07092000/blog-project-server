import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}
