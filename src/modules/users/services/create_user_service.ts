import AppError from '@shared/errors/app_error';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import UsersRepository from '../typeorm/repositories/users_repository';


interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const emailExists = await userRepository.findByName(email);

    if (emailExists) {
      throw new AppError('email do usuário  já cadastrado');
    }
    const hashedPassword = await hash(password,8);

    const product = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(product);
    return product;
  }
}
export default CreateUserService;
