import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cartitem } from '../common/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cartItems:Cartitem[]=[];

  storage:Storage = sessionStorage;

  totalPrice:Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity:Subject<number> = new BehaviorSubject<number>(0);

  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if(data != null)
    {
      this.cartItems = data;
      this.computeCartTotals();
    }

  }

  persistCartItems()
  {
    this.storage.setItem('cartItems',JSON.stringify(this.cartItems));
  }

  addToCart(theCartItem:Cartitem)
  {
    let alreadyExistsInCart:boolean = false;
    let existingCartItem:Cartitem = undefined;

    if(this.cartItems.length > 0)
    {
      for(let tempCartItem of this.cartItems)
      {
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }

      alreadyExistsInCart = (existingCartItem != undefined);

    }
    if(alreadyExistsInCart)
      {
        existingCartItem.quantity++;
      }else{
        this.cartItems.push(theCartItem);
      }

      this.computeCartTotals();

  }

  computeCartTotals()
  {
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    for(let currentCartItem of this.cartItems)
    {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue,totalQuantityValue);

    this.persistCartItems();
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name :${tempCartItem.name},qunatity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subtotalPrice=${subTotalPrice}`)
    }
  }



}
