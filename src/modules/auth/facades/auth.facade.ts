import { AuthDto, LoginDto } from '@auth/dtos';
import { AuthenticationService, UserService } from '@auth/services';
import { TokensDto } from '@core/dtos';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthenticationFacade {
  private readonly logger = new Logger(AuthenticationFacade.name, {
    timestamp: true,
  });

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
  ) {}

  async login(payload: LoginDto) {
    this.logger.log(`Buscando el usuario ${payload.username}`);
    const user = await this.userService.findOneByUsername(payload);
    this.logger.log(
      `Verificando la contraseña del usuario ${payload.username}`,
    );
    await this.authService.passwordMatch(payload.password, user.password);
    return await this.authService.regenerateTokens(user.id, user.username);
  }

  async register(payload: AuthDto): Promise<TokensDto> {
    this.logger.log('Encriptando contraseña...');
    const hashedPassword = { ...payload };
    hashedPassword.password = await this.authService.hashData(payload.password);
    this.logger.log('Se encripto la contraseña');
    const user = await this.userService.create(hashedPassword);
    return await this.authService.regenerateTokens(user.id, user.username);
  }

  // Para colocar el token en una blacklist si es que aun no se expira
  logout(userId: number) {
    return this.userService.updateUsersWithRefreshToken(userId);
  }

  restorePassword(identity: number) {
    return identity;
  }

  async refresh(data: { userId: number; refreshToken: string }) {
    this.logger.log('Refrescando token...');
    const user = await this.userService.findOneById(data.userId);

    this.logger.log('Validando Refresh token');
    await this.authService.rtMatch(data.refreshToken, user.refreshToken);

    return await this.authService.regenerateTokens(user.id, user.username);
  }
}
