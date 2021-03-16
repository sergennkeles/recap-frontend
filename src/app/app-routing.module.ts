import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';


const routes: Routes = [
  { path: '', component: CarComponent },
  { path: 'car', component: CarComponent },
  { path: 'car/brand/:brandId', component: CarComponent },
  { path: 'car/color/:colorId', component: CarComponent },
  { path: 'car/car-detail/:carId', component: CarDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
