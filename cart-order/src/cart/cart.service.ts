import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartDto } from './dto/cart.dto';
import { Cart } from './types/cart';
import { Experience } from '../common/types/experience';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private model: Model<Cart>,
    @InjectModel('Experience') private experienceModel: Model<Experience>,
  ) {}

  /**
   * Private method to find the user cart
   * @param userId
   */
  private async findOne(userId: string): Promise<Cart> {
    return await this.model.findOne({ 'user._id': userId.toString() });
  }

  /**
   *
   * @param userId
   */
  async getUserCart(userId: string): Promise<Cart> {
    return await this.model.findOne(
      { 'user._id': userId.toString() },
      { experiences: 1 },
    );
  }

  private async createCart(dto: CartDto, userId: string): Promise<Cart> {
    dto.user = { _id: userId.toString() };
    return await new this.model(dto).save();
  }

  /**
   * Add experience to cart
   * @param dto
   * @param userId
   */
  async addToCart(dto: CartDto, userId: string) {
    // console.log(dto);
    const userCart = await this.findOne(userId);
    if (userCart) {
      await userCart.updateOne({
        $push: { experiences: dto.experiences },
      });
      //   const experiences = userCart.experiences;
      //   const experience = experiences.filter(
      //     (experience) => experience.slug === dto.experiences[0].slug,
      //   );

      //   if (experience.length > 0) {
      //     //use case when the experience already exists in the user cart
      //     dto.experiences[0].quantity =
      //       parseInt(experience[0]['quantity'], 10) +
      //       parseInt(dto.experiences[0].quantity, 10);

      //     //we found the experience already in cart, we need to update the quantity, so first we delete
      //     await this.model.updateOne(
      //       { 'user._id': userId.toString() },
      //       { $pull: { experience: { _id: experience[0]._id } } },
      //     );

      //     //We push with updated quantity
      //     await userCart.updateOne({
      //       $push: { experiences: dto.experiences },
      //     });

      //     return await this.findOne(userId);
      //   }
      //   //we did not find the experience in user cart so we push
      //   await userCart.updateOne({
      //     $push: { experiences: dto.experiences },
      //   });

      //return the update cart
      return await this.findOne(userId);
    } else {
      return this.createCart(dto, userId);
    }
  }

  async updateCart(dto: CartDto, userId: string): Promise<Cart> {
    const userCart = await this.findOne(userId.toString());
    if (userCart) {
      await userCart.updateOne(dto);
      return await this.getUserCart(userId);
    } else {
      throw new HttpException('Cart Not found', HttpStatus.NOT_FOUND);
    }
  }
}
