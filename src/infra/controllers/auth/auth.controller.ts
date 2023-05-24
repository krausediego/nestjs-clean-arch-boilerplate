import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infra/usecases-proxy/usecases-proxy';
import { UseCasesProxyModule } from 'src/infra/usecases-proxy/usecases-proxy.module';
import { SignUpUseCases } from 'src/usecases/auth/sign-up.usecases';
import { AuthDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    @Inject(UseCasesProxyModule.SIGN_UP_USECASES_PROXY)
    private readonly signUpUsecaseProxy: UseCaseProxy<SignUpUseCases>,
  ) {}

  @Post('signUp')
  @ApiBearerAuth()
  @ApiBody({ type: AuthDto })
  @ApiOperation({ description: 'Sign Up' })
  async signUp(@Body() data: AuthDto) {
    await this.signUpUsecaseProxy.getInstance().createUser(data);
  }
}
