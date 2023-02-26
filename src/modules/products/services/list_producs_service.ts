import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import { ProductRepository } from '../typeorm/repositories/product_repository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.find();

    return product;
  }
}
export default ListProductService;
