
import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RcpCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        console.log('It passed by rcp-custome-exception-filter file');
        throw new UnauthorizedException('This is a test that the filter is working')
    }
}
