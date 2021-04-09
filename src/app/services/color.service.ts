import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl = 'https://localhost:44343/api/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl + 'colors/getall';
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  getByColorId(colorId: number): Observable<ItemResponseModel<Color>> {
    let newPath = environment.apiUrl + 'colors/getbycolorid?id=' + colorId;
    return this.httpClient.get<ItemResponseModel<Color>>(newPath);
  }
  
  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      environment.apiUrl + 'colors/add',
      color
    );
  }

  update(color: Color): Observable<ListResponseModel<Color>> {
    let newPath = environment.apiUrl + 'colors/update';
    return this.httpClient.post<ListResponseModel<Color>>(newPath, color);
  }

  delete(color: Color): Observable<ListResponseModel<Color>> {
    let newPath = environment.apiUrl + 'colors/delete';
    return this.httpClient.post<ListResponseModel<Color>>(newPath, color);
  }
}
