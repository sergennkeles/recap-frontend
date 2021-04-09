import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/rentalAdd';
import { CartServiceService } from 'src/app/services/cart-service.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  dataLoaded = false;
  cartTotal: number;

  constructor(
    private cartService: CartServiceService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.cartList();

    this.cartService.data.subscribe((response) => {
      this.cartTotal = response.cartTotal;
    });

    this.dataLoaded = true;
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem);
    this.toastrService.error(cartItem.brandName + ' sepetten silindi.', 'Sil');
  }
}
