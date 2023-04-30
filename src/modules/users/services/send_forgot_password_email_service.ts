import AppError from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import {hash} from 'bcryptjs';
import UsersRepository from '../typeorm/repositories/users_repository';
import {isAfter,addHours} from 'date-fns';
import UsersTokensRepository from '../typeorm/repositories/users_tokens_repository copy';



interface IRequest {

  token: string;
  password: string;

}

class SendForgotPasswordEmailService {
  public async execute({ token,password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UsersTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken){
      throw new AppError('User Token does not exists');

    }
    const user = await userRepository.findById(userToken.userId);

    if(!user){
      throw new AppError('User does not exists');
    }


    const tokenCreatedAt = userToken.createdAt;
    const comprateDate = addHours(tokenCreatedAt,2);

    if(isAfter(Date.now(),comprateDate)){
      throw new AppError('Token expired.');
    }

    user.password = await hash(password,8);




  }
}
export default SendForgotPasswordEmailService;
