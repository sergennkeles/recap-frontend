import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCardModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {


  constructor(private httpClient: HttpClient) {}

  payment(payment: Payment): Observable<ResponseModel> {
    let paymentPath = environment.apiUrl+ 'payments/add';
    return this.httpClient.post<ResponseModel>(paymentPath, payment);
  }

   getCardListByCustomerId(
    customerId: number
  ): Observable<ListResponseModel<CreditCard>> {
    let newPath = environment.apiUrl + 'payments/listcards?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  } 

  savecard(payment: Payment): Observable<ResponseModel> {
    let newUrl = environment.apiUrl + 'payments/save';
    return this.httpClient.post<ResponseModel>(newUrl, payment);
  }
}
