import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/update_user_avatar_service';

export default class UsersAvatarController {


  public async update(request: Request, response: Response): Promise<Response> {

    const updateAvatar = new UpdateUserAvatarService();

    const user = updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file?.fieldname ?? '',
    });

    return response.json(user);

  }
}
