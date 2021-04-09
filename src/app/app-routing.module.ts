import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { RentalUpdateComponent } from './components/rental-update/rental-update.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: '', component: CarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'car', component: CarComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: UserComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'brands/list', component: BrandListComponent },
  { path: 'colors/list', component: ColorListComponent },

  {
    path: 'rentals/rent',
    component: RentalAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'rentals/update',
    component: RentalUpdateComponent,
    canActivate: [LoginGuard],
  },
  { path: 'rentals/getrentdetails', component: RentalComponent },
  { path: 'cars/add', component: CarAddComponent, canActivate: [LoginGuard] },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'brands/add',
    component: BrandAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'brands/update/:brandId',
    component: BrandUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/update/:colorId',
    component: ColorUpdateComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'car/update/:carId',
    component: CarUpdateComponent,
    canActivate: [LoginGuard],
  },
  { path: 'car/brand/:brandId', component: CarComponent },
  { path: 'car/color/:colorId', component: CarComponent },
  { path: 'car/car-detail/:carId', component: CarDetailComponent },
  { path: 'car/filter/brand/:brandId/color/:colorId', component: CarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
