import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import {  ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId'] && params['brandId']) {
        this.getCarByFilter(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarByBrand(brandId: Number) {
    this.carService.getCarByBrand(brandId).subscribe((response) => {
      (this.cars = response.data), (this.dataLoaded = true);
      console.log(brandId);
    });
  }
  getCarByColor(colorId: Number) {
    console.log(colorId);
    this.carService.getCarByColor(colorId).subscribe((response) => {
      (this.cars = response.data), (this.dataLoaded = true);
    });
  }

  getCarByFilter(brandId: Number, colorId: Number) {
    this.carService
      .getCarByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        (this.cars = response.data), (this.dataLoaded = true);
        if (this.cars.length == 0) {
          this.toastr.info(
            'Arama sonuçunuza ait bir araç bulunmamaktadır.',
            'Arama Sonucu'
          );
        }
      });
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe();
    console.log(car);

    this.toastr.info('Araç silindi.', 'Başarılı');
  }
}
