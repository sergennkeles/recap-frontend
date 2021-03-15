import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44343/api/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newUrl = this.apiUrl + 'rentals/getrentdetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newUrl);
  }
}
