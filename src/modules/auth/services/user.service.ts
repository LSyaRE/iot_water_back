import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities';
import { EntityNotFoundError, IsNull, Not, Repository } from 'typeorm';
import { AuthDto, LoginDto } from '@auth/dtos';
import { AUTH_MESSAGE_ERROR } from '@auth/consts';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name, { timestamp: true });

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    this.logger.log('Iniciando busqueda de todos los usuarios');
    const data = await this.usersRepository.find();
    this.logger.log('Fin de la busqueda de todos los usuarios');
    return data;
  }

  async findOneByUsername(login: LoginDto): Promise<UserEntity> {
    try {
      this.logger.log('Iniciando la busqueda del usuario ');
      const data = await this.usersRepository.findOneByOrFail({
        username: login.username,
      });

      this.logger.log('Fin del usuario');
      return data;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        const error = e;
        this.logger.error(
          `No se encontro el usuario: ${error.name}, mensaje: ${error.message}`,
        );
        throw new ForbiddenException(AUTH_MESSAGE_ERROR);
      } else {
        const error = e as Error;
        this.logger.error(`ERR: ${error.name}`);
        this.logger.error(`ERR: ${error.message}`);
        throw new BadRequestException(`Algo salio mal`);
      }
    }
  }

  async findOneById(id: number): Promise<UserEntity> {
    try {
      this.logger.log('Iniciando la busqueda del usuario ');
      const data = await this.usersRepository.findOneByOrFail({
        id,
      });

      this.logger.log('Fin del usuario');
      return data;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        const error = e;
        this.logger.error(
          `No se encontro el usuario: ${error.name}, mensaje: ${error.message}`,
        );
        throw new ForbiddenException(AUTH_MESSAGE_ERROR);
      } else {
        const error = e as Error;
        this.logger.error(`ERR: ${error.name}`);
        this.logger.error(`ERR: ${error.message}`);
        throw new BadRequestException(`Algo salio mal`);
      }
    }
  }

  async create(payload: AuthDto) {
    this.logger.log(
      `Creando un nuevo usuario con el nombre ${payload.username}`,
    );
    const newUser = await this.usersRepository.save({
      email: payload.email,
      password: payload.password,
      username: payload.username,
    });

    this.logger.log('Verficando de que el usuario se creo correctamente');
    if (!newUser) {
      this.logger.error('No se ha guardado correctamente el usuario');
      throw new BadRequestException(
        'El usuario no se ha podido guardar correctamente',
      );
    }

    return newUser;
  }

  async updateRtHash(id: number, refreshToken: string) {
    this.logger.log('Modificando el refresh token');
    const user = await this.usersRepository.update(id, { refreshToken });

    this.logger.log('Verficando de que el usuario se actualizo correctamente');
    if (!user) {
      this.logger.error('No se ha actualizado correctamente el usuario');
      throw new BadRequestException(
        'El usuario no se ha podido guardar correctamente',
      );
    }

    this.logger.log(
      'Devolviendo el usuario despues de la actualizacion del refresh token',
    );
    return user;
  }

  async updateUsersWithRefreshToken(id: number) {
    this.logger.log(id);
    const users = await this.usersRepository.findBy({
      id,
      refreshToken: Not(IsNull()),
    });

    if (users.length < 1) {
      this.logger.error('No se ha actualizado correctamente el usuario');
      throw new BadRequestException(
        'No se pudo cerrar la sesión. Por favor, inténtelo nuevamente.',
      );
    }

    const updatedUsers = users.map((user) => ({
      ...user,
      refreshToken: '',
    }));

    await this.usersRepository.save(updatedUsers);

    return {
      users,
      refreshToken: '',
    };
  }
}
