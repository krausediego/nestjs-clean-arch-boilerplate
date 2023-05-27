import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { IJwtService } from 'src/domain/adapters/jwt.interface';
import { IException } from 'src/domain/exceptions/exceptions.interface';
import { ISignIn } from 'src/domain/interfaces/auth/sign-in.interface';
import { UserRepository } from 'src/domain/repositories/user-repository.interface';

export class SignInUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exception: IException,
    private readonly jwt: IJwtService,
  ) {}

  async validateLogin(data: ISignIn): Promise<Record<string, any>> {
    const { emailOrUsername, password } = data;
    const secret = process.env.JWT_SECRET;

    const user = await this.userRepository.signIn({ emailOrUsername });

    if (!user) {
      this.exception.forbiddenException({ message: 'User not found.' });
    }

    const passwordMatches = this.bcryptService.compare(password, user.password);

    if (!passwordMatches) {
      this.exception.badRequestException({ message: 'Passwords not matches.' });
    }

    const { id, username, email } = user;

    await this.userRepository.updateLastLogin(id);

    const token = this.jwt.createToken({ id, username, email }, secret);

    return { token };
  }
}
