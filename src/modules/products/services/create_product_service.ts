import AppError from '@shared/errors/app_error';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/product';
import ProductRepository from '../typeorm/repositories/product_repository';


interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('Produdo já cadastrado');
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);
    return product;
  }
}
export default CreateProductService;
