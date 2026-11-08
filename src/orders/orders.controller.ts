import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ORDER_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly ordersClient: ClientProxy,
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send("createOrder", createOrderDto);
  }

  @Get()
  findAll(@Query()  orderPaginationDto:OrderPaginationDto) {
    return this.ordersClient.send("findAllOrders", orderPaginationDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send("findOneOrder", { id })
      )
      return order;
    } catch (error) {
      throw new RpcException(error as Error);
    }
  }

}
