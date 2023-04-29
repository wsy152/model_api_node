import { Entity, EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/user_token';

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }



  public async generate(userId: string): Promise<UserToken | undefined> {
    const userToken = await this.create({
      userId,
    });
    return userToken;
  }
}
export default UsersTokensRepository;
