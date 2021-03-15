import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded = false;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
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
}
