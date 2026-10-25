import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { firstValueFrom } from 'rxjs';


@Controller('products')
export class ProductsController {

  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productsClient: ClientProxy,
  ) { }

  @Post()
  createProduct() {
    return 'Create a product';
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
      throw new RpcException({error});
    }

  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return 'This is a Soft Delete';
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe)
    @Body() body: any) {
    return 'This is the patch method';
  }
}
