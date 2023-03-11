import AppError from '@shared/errors/app_error';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/users_repository';


interface IRequest {
  email: string;
  password: string;
}
// interface IResponse {
//   user: User;
// }

class CreateUserSessionService {
  public async execute({email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    const passwordConfirmed = await compare(password,user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    return user;
  }
}
export default CreateUserSessionService;
