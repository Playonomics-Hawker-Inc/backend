import { HttpService, Injectable, Req, Res, } from '@nestjs/common';
const Razorpay = require("razorpay");
const shortid = require("shortid");



@Injectable()
export class PaymentService {
  constructor(private httpService: HttpService) {}

  /**
   * Make call to the session service to create the user sesssion
   * @param accessToken
   */
 
  async createPayment(@Req() req, @Res() res) {
    console.log(req);
    const razorpay = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.SECRET_KEY,
    });
    const payment_capture = 1;
    const amount = 500;
    const currency = "INR";
    const options = {
      amount: amount * 100,
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };
  
    try {
      const response = await razorpay.orders.create(options);
      console.log(response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (error) {
      console.log(error);
    }
  }

  
}


