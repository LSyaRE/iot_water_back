import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('identity', {
    comment: 'Clave primaria de los usuarios.',
  })
  id: number;

  @Column({
    comment: 'Usuario de la persona que va a ingresar.',
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({ comment: 'Correo de recuperacion de la cuenta', nullable: false })
  email: string;

  @Column({ comment: 'Correo de recuperacion de la cuenta' })
  password: string;

  @Column({
    name: 'refresh_token',
    nullable: true,
    comment: 'Token para la actualizacion del login ',
  })
  refreshToken: string;

  @Column({
    name: 'is_active',
    default: true,
    comment: 'Estado de la cuenta para su uso',
  })
  isActive: boolean;
}
