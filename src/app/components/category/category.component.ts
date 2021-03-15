import { Component, Input, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { CarComponent } from '../car/car.component';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  isActive: boolean = false;

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    
  }
  
  getCurrentClass() {
    if (this.isActive) {
      return 'list-group-item active';
    } else  {
      return 'list-group-item';
    }
  } 
}
