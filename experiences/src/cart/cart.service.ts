import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {Experience} from '../experience/types/experience';
import {Cart} from "./types/cart";
import {CartDto} from "./dto/cart.dto";

@Injectable()
export class CartService {
    constructor(
        @InjectModel('Cart') private model: Model<Cart>,
        @InjectModel('Experience') private productModel: Model<Experience>,
      ) {}

        /**
   * If user cart does not exist, create a new cart
   * @param string
   */
  private async createCart(dto: CartDto, userId: string): Promise<Cart> {
    dto.user = { _id: userId.toString() };
    return await new this.model(dto).save();
  }
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
      { products: 1 },
    );
  }
  /**
   *
   * @param dto
   * @param userId
   */
   async updateQuantity(dto: CartDto, userId: string): Promise<Cart> {
    const userCart = await this.findOne(userId);

    if (!userCart) {
      throw new HttpException('Cart Not found', HttpStatus.NOT_FOUND);
    }
    const experiences = userCart.experiences;

    const experience = experiences.filter(
        experience => experience.slug === dto.experiences[0].slug,
    );
    if (experience.length > 0) {
      //we found the product already in cart, we need to update the quantity, so first we delete
      await this.model.updateOne(
        { 'user._id': userId.toString() },
        { $pull: { experiences: { _id: experience[0]._id } } },
      );

      //We push with updated quantity
      await userCart.updateOne({
        $push: { products: dto.experiences },
      });

      //return update cart
      return await this.findOne(userId);
    }
  }
 /**
   * Remove item from cart
   * @param dto
   * @param userId
   */
  async removeFromCart(dto: CartDto, userId: string): Promise<Cart> {
    const userCart = await this.findOne(userId);

    if (!userCart) {
      throw new HttpException('Cart Not found', HttpStatus.NOT_FOUND);
    }
    //Update cart
    await this.model.updateOne(
      { 'user._id': userId.toString() },
      { $pull: { products: { _id: dto.experiences[0]._id } } },
    );

    //return updated cart
    return await this.findOne(userId);
  }
    /**
   * Add product to cart
   * @param dto
   * @param userId
   */
  async addToCart(dto: CartDto, userId: string) {
    // console.log(dto);
    const userCart = await this.findOne(userId);
    if (userCart) {
      const experiences = userCart.experiences;
      const experience = experiences.filter(
        experience => experience.slug === dto.experiences[0].slug,
      );

      if (experience.length > 0) {
        //use case when the product already exists in the user cart
        dto.experiences[0].quantity =
          parseInt(experience[0]['quantity'], 10) +
          parseInt(dto.experiences[0].quantity, 10);

        //we found the product already in cart, we need to update the quantity, so first we delete
        await this.model.updateOne(
          { 'user._id': userId.toString() },
          { $pull: { products: { _id: experience[0]._id } } },
        );

        //We push with updated quantity
        await userCart.updateOne({
          $push: { experiences: dto.experiences },
        });

        return await this.findOne(userId);
      }
      //we did not find the product in user cart so we push
      await userCart.updateOne({
        $push: { experiences: dto.experiences },
      });

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
    /**
   *
   * @param userId Delete User cart
   */
     async deleteCart(userId: string) {
        const userCart = await this.findOne(userId.toString());
        if (userCart) {
          await userCart.deleteOne();
        } else {
          throw new HttpException('Cart Not found', HttpStatus.NOT_FOUND);
        }
      }
}
