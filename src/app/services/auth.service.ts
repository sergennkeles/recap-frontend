import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { TokenDetail, TokenModel } from '../models/tokenModel';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  tokenDetail = new TokenDetail();
  private helper: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  login(loginModel: LoginModel) {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(
      environment.apiUrl + 'auth/login',
      loginModel
    );
  }
  register(registerModel: RegisterModel) {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(
      environment.apiUrl + 'auth/register',
      registerModel
    );
  }

  logout() {
    this.storageService.remove('token');
    this.tokenDetail = new TokenDetail();
  }

  decodeToken(token: string) {
    let data = this.helper.decodeToken(token);
    this.tokenDetail.email = data.email;
    this.tokenDetail.username =
      data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.tokenDetail.claims =
      data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

  getCurrentFullName(): string {
    let token: string = localStorage.getItem('token');
    if (token) {
      let decoded = this.helper.decodeToken(token);
      let userName = Object.keys(decoded).filter((x) => x.endsWith('/name'))[0];
      return decoded[userName];
    }
    return null;
  }

  isAuthenticated() {
    let token = this.storageService.get('token');
    if (token) {
      this.decodeToken(token);
      return true;
    } else {
      return false;
    }
  }
}
