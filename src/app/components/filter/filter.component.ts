import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  cars: CarDto[] = [];

  filterBrand: number;
  filterColor: number;
  dataLoaded: boolean = false;
  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  selectBrand(brandId: number) {
    if (this.filterBrand == brandId) {
      return true;
    } else {
      return false;
    }
  }

  selectColor(colorId: number) {
    if (this.filterColor == colorId) {
      return true;
    } else {
      return false;
    }
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
}
