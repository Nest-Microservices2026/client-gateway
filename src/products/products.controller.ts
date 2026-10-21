import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() { }

  @Post()
  createProduct() {
    return 'Create a product';
  }

  @Get()
  findAllProducts() {
    return 'Find All Products';
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return 'Find Product By Id';
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
