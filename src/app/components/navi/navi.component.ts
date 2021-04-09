import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/fontawesome-free/';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss'],
})
export class NaviComponent implements OnInit {
  filterText = '';
  userIcon = faUserCircle;
  isAuth: boolean;
  id: number;
  user: User[];
  firstName: string;
  lastName: string;
  findex: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
 
  }


  getFullName(): string {
    return this.authService.getCurrentFullName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isAuth = this.authService.isAuthenticated();
  }

  roleIfExist(claim: string) {
    return this.authService.tokenDetail?.claims?.indexOf(claim) > -1;
  }

  /* getByUserId(userId: number) {
    this.userService.getbyid(userId).subscribe((response) => {
      this.user[0] = response.data[0];
    });
  } */
}
