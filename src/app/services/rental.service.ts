import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDto } from '../models/carDto';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental, RentalDetail } from '../models/rental';

import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetail>> {
    let newUrl = environment.apiUrl + 'rentals/getrentdetails';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newUrl);
  }

  getRentalById(carId: number): Observable<ItemResponseModel<RentalDetail>> {
    let newPath = environment.apiUrl + 'rentals/getrentbycarid?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<RentalDetail>>(newPath);
  }

  isCarAvailable(carId: number): Observable<boolean> {
    let newPath = environment.apiUrl + 'rentals/iscaravailable?carId=' + carId;
    return this.httpClient.get<boolean>(newPath);
  }

  add(rentalAdd: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'rentals/rent',
      rentalAdd
    );
  }

  update(rental: Rental): Observable<ListResponseModel<Rental>> {
    let newPath = environment.apiUrl + 'rentals/update';
    return this.httpClient.post<ListResponseModel<Rental>>(newPath, rental);
  }
}
