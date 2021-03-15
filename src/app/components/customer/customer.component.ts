import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  currentCustomer: Customer = { id: -1, firstName: '' ,lastName:'',companyName:''};
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }
  setCurrentCustomer(customer: Customer) {
    this.currentCustomer = customer;
  }
  removeCurrentCustomer() {
    this.currentCustomer = {
      id: -1,
      firstName: '',
      lastName: '',
      companyName: '',
    };
  }
  getCurrentCustomerClass(customer: Customer) {
    if (customer == this.currentCustomer) {
      return 'list-group-item cursorPointer active';
    } else {
      return 'list-group-item cursorPointer';
    }
  }
  getAllCustomerClass() {
    let defaultCustomer: Customer = {
      id: -1,
      firstName: '',
      lastName: '',
      companyName: '',
    };
    if (this.currentCustomer.id == defaultCustomer.id) {
      return 'list-group-item active cursorPointer';
    } else {
      return 'list-group-item cursorPointer';
    }
  }
}
