import AppError from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/product_repository';


interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('produto não encontrado');
    }
    await productRepository.remove(product);
  }
}
export default DeleteProductService;
