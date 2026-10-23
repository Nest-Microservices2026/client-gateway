import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto';


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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsClient.send({ cmd: 'find_one_product' }, {id:id});
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return 'This is a Soft Delete'
  }

  @Patch(':id')
  patchProduct(
    @Param(':id', ParseIntPipe)
    @Body() body: any) {
    return 'This is the patch method'
  }
}
