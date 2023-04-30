import AppError from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/users_repository';
import UsersTokensRepository from '../typeorm/repositories/users_tokens_repository copy';



interface IRequest {

  email: string;

}

class ResetPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');

    }
    const token = await userTokensRepository.generate(user.id);

    console.log(token);

  }
}
export default ResetPasswordService;
