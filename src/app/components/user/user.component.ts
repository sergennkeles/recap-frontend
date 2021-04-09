import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User;

  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getUserByEmail();
  }

  getUserByEmail() {
    let email = this.authService.tokenDetail.email;
    this.userService.getByMail(email).subscribe((response) => {
      this.user = response.data;
      this.userForm.setValue({
        id:this.user?.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        passwordHash:this.user.passwordHash,
        passwordSalt:this.user.passwordSalt,
        status:this.user.status
      });
    });
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      id:[""],
      passwordHash:[""],
      passwordSalt:[""],
      status:[""]
    
    });
  }

  update() {
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success('Profil güncellendi');
        },
        (responseError) => {
          this.toastrService.error('Güncelleme yapılamadı', 'Hata');
        }
      );
    }
  }
}
