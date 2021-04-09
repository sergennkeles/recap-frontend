import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDto } from 'src/app/models/carDto';
import { Customer } from 'src/app/models/customer';

import { CarService } from 'src/app/services/car.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FindexService } from 'src/app/services/findex.service';
import { RentalService } from 'src/app/services/rental.service';
@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.scss'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  customers: Customer[] = [];

  currentCar: CarDto;
  rentDate: Date;
  returnDate: Date;
  totalPrice: number;

  filterCar: number;
  filterCustomer: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private customerService: CustomerService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartServiceService,
    private findexService: FindexService
  ) {}

  ngOnInit(): void {
    this.rentDate = new Date();
    this.returnDate = new Date();

    this.createRentalAddForm();
    this.getCustomers();

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.carId) {
        this.getCarById(params.carId);
      }
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }


  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.currentCar = response.data;
    });
  }


  add() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      rentalModel.carId = this.currentCar.id;
      rentalModel.brandName = this.currentCar.brandName;
      rentalModel.colorName = this.currentCar.colorName;
      rentalModel.description = this.currentCar.description;
      rentalModel.modelYear = this.currentCar.modelYear;
      rentalModel.dailyPrice = this.currentCar.dailyPrice;
      rentalModel.totalPrice = this.totalPrice;
     // console.log(rentalModel);

      let customerPoint = this.findexService.getPointByCustomerId(
        rentalModel.customerId
      );
   
      let carPoint = this.findexService.getPointByCarId(rentalModel.carId);
      if (customerPoint >= carPoint) {
      
           this.cartService.addToCart(rentalModel);
           this.toastrService.success(
             'Sepete eklendi',
         this.currentCar.brandName
           );  
       
      } else {
       // console.log("Araç puanı "+carPoint+" Müşteri puanı "+customerPoint);
        
        this.toastrService.error('Findex puanınız yetersiz', 'Hata');
      }
    } else {
      this.toastrService.error('Formunuz eksik', 'Hata');
    }
  }

  calcTotalPrice() {
    let startDate = new Date(this.rentalAddForm.value.rentDate);
    let endDate = new Date(this.rentalAddForm.value.returnDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      this.totalPrice = 0;
    } else if (startDate > endDate) {
      this.totalPrice = 0;
    } else {
      let dateDiff = Math.floor(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
      );

      this.totalPrice = dateDiff * this.currentCar.dailyPrice;

    /*   console.log(
        'Gün ' + dateDiff + ' Dailyprice' + this.currentCar.dailyPrice
      ); */
    }
  }
}
