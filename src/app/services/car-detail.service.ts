import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {
  
  constructor(private httpClient: HttpClient) {}

  getCarDetail(
    carId: Number
  ): Observable<ItemResponseModel<CarDetail>> {
    let newPath =
      environment.apiUrl + 'cars/getcardetailwithimage?carId=' + carId;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(
      newPath
    );
  }
}
