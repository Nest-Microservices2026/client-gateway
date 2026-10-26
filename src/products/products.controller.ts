import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from '../common/dto/create-product.dto';
import { UpdateProductDto } from '../common/dto/update-product.dto';


@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.productsClient.send({ cmd: 'create_product' }, createProduct)
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find_all_product' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {

    try {
      //firstValueFrom: Converts that Observable into a Promise for clean `await` 
      //when you expect one response.
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id: id })
      );

      return product;

    } catch (error) {
      throw new RpcException(error as { status: number | string; message: string });
    }

  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsClient.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'remove_product' }, { id })
      .pipe(
        catchError((err) => { throw new RpcException(err) })
      );
  }
}
