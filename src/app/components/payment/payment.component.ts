import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCardModel';
import { Rental } from 'src/app/models/rental';
import { CartItem } from 'src/app/models/rentalAdd';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cards: CreditCard[] = [];
  dataLoaded = false;
  paymentForm: FormGroup;
  cartItems: CartItem[] = [];
  cartTotal: number;
  customerId: number;
  rental: Rental;
  cardId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartServiceService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private toastrService: ToastrService,

  ) {}

  ngOnInit(): void {
    this.cartService.data.subscribe((response) => {
      (this.cartTotal = response.cartTotal),
        (this.customerId = response.customerId);
    });
    this.cartItems = this.cartService.cartList();
    this.createPaymentForm();
    this.getCardList();
   
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
      saveCard: [''],
    });
  }

  setCurrentCard(card: CreditCard) {
    this.paymentForm.setValue({
      firstName: card.firstName,
      cardNumber: card.cardNumber,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
      saveCard: false,
    });
    this.cardId = card.id;
  }

  payment() {
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({}, this.paymentForm.value);
      paymentModel.customerId = this.customerId;
      paymentModel.total = this.cartTotal;
      paymentModel.cardId = this.cardId;
      this.paymentService.payment(paymentModel).subscribe(
        (response) => {
          this.cartItems.map((rent) => {
            rent.returnDate = undefined;
            this.rentalService.add(rent).subscribe();
        
          });

          if (paymentModel.saveCard) {
            this.paymentService.savecard(paymentModel).subscribe();
          }

          this.toastrService.success(response.message, 'Ödeme');
        },
        (responseError) => {
          console.log(responseError);

          this.toastrService.error('Ödeme alınamadı', 'Hata');
        }
      );
    }
  }

  getCardList() {
    this.paymentService.getCardListByCustomerId(1).subscribe((response) => {
      this.cards = response.data;
      this.dataLoaded = true;
    });
  }
}
