import AppError from '@shared/errors/app_error';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/users_repository';


interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}

class CreateUserSessionService {
  public async execute({email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const passwordConfirmed = await compare(password,user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({},authConfig.jwt.secret,{
      subject: String(user.id),
      expiresIn:authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default CreateUserSessionService;
