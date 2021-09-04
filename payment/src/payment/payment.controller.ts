import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
    HttpException,
    HttpStatus, Req, Res 
  } from '@nestjs/common';
  import { PaymentService } from './payment.service';
  
  

  
  @Controller('v1')
  export class PaymentController {
    constructor(
      private paymentService: PaymentService,
      
    ) {}
  
    /**
     *
     * @param userDTO
     */
    @Post('payment')
    async createPayment(@Req() request, @Res() response) {
       
        try {
            await this.paymentService.createPayment(request, response);
          } catch (error) {
            return response
              .status(500)
              .json(`Failed to upload image file: ${error.message}`);
          }
    }
  
 
  }
  