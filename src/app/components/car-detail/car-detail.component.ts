import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDto } from 'src/app/models/carDto';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit {
  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private rentalService: RentalService,
    private carService: CarService,
    private toastrService: ToastrService,
 
  ) {}

  carDetail: CarDetail;
  brand: Brand;
  car: Car;
  brandId: number;
  dataLoaded = false;
  isAvailable: boolean;
  imageBasePath = environment.baseUrl;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.isCarAvailable(params['carId']);
      }
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getById(brandId).subscribe((response) => {
      this.brand = response.data;
    });
  }
  getCarDetail(carId: Number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }

  isCarAvailable(carId: number) {
    this.rentalService.isCarAvailable(carId).subscribe(
      (response) => {
        this.isAvailable = response;
      },
      (responseError) => {
        this.toastrService.error('Bu araç kiralanamaz', 'Uyarı');
      }
    );
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  delete(car: Car) {
    this.carService.delete(car).subscribe();
    this.toastrService.info('Araç silindi.', 'Başarılı');
  }
}
