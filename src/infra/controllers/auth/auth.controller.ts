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
import { AuthSignInDto, AuthSignUpDto } from './auth.dto';
import { SignInUseCases } from 'src/usecases/auth/sign-in.usecases';

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
    @Inject(UseCasesProxyModule.SIGN_IN_USECASES_PROXY)
    private readonly signInUsecaseProxy: UseCaseProxy<SignInUseCases>,
  ) {}

  @Post('signUp')
  @ApiBearerAuth()
  @ApiBody({ type: AuthSignUpDto })
  @ApiOperation({ description: 'Sign Up' })
  async signUp(@Body() data: AuthSignUpDto) {
    await this.signUpUsecaseProxy.getInstance().createUser(data);
  }

  @Post('signIn')
  @ApiBearerAuth()
  @ApiBody({ type: AuthSignInDto })
  @ApiOperation({ description: 'Sign In' })
  async signIn(@Body() data: AuthSignInDto) {
    return this.signInUsecaseProxy.getInstance().validateLogin(data);
  }
}
