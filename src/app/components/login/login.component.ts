import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  isAuth: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.info(response.message, 'Bilgi');
          this.storageService.set('token', response.data.token);
           this.authService.decodeToken(response.data.token);   
          this.router.navigate(['/']);
          
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error, 'Doğrulama Hatası');
        }
      );
    } else {
      this.toastrService.error('Bilgilerinizi eksiksiz giriniz.', 'Hata');
    }
  }
}
