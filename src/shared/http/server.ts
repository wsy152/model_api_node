import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import routes from './routes';
import { AppError } from '@shared/errors/app_error';


const app = express();

app.use(cors());
app.use(express());

app.use(routes);

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'error',
      message:error.message,
    });
  }
  return res.status(500).json({
    status: 'error',
      message:'Internal server error',
  });
});

app.listen(4444,()=> {
  console.log('Server iniciado na porta: 4444');
});
