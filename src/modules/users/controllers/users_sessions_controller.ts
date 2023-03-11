import { Request, Response } from "express";
import CreateUserSessionService from "../services/create_user_session_services";

export default class UsersSessionsController {
  public async create(request: Request, response: Response) : Promise<Response>{
    const {email, password} = request.body;

    const createSession = new CreateUserSessionService();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
