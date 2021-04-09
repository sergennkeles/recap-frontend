import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newUrl = environment.apiUrl + 'customers/getcustomerdetails';
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }

  getByCustomerId(customerId:number): Observable<ListResponseModel<Customer>> {
    let newUrl = environment.apiUrl + 'customers/getbycustomerid='+customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newUrl);
  }
}
