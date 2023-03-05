import AppError from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/users_repository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    await userRepository.remove(user);
  }
}
export default DeleteUserService;
