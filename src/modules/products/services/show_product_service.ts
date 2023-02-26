import { AppError } from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/product_repository';

interface IRequest {
  id: string;

}

class ListProductService {
  public async execute({id}: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if(!product){
      throw new AppError('produto não encontrado');
    }

    return product;
  }
}
export default ListProductService;
