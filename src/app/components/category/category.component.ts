import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CarService } from 'src/app/services/car.service';
import { CarComponent } from '../car/car.component';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  isActive: boolean = false;
  currentCategory: Category = { categoryName: '' };

  constructor() {}

  ngOnInit(): void {}

  getCurrentClass() {
    if (this.isActive) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  setCurrentCategory(category: Category) {
    this.currentCategory = category;
  }
  removeCurrentCategory() {
    this.currentCategory = { categoryName: '' };
  }
  getCurrentCategoryClass(category: Category) {
    if (category == this.currentCategory) {
      return 'list-group-item cursorPointer active';
    } else {
      return 'list-group-item cursorPointer';
    }
  }
  getAllCategoryClass() {
    let defaultBrand: Category = { categoryName: '' };
    if (this.currentCategory.categoryName == defaultBrand.categoryName) {
      return 'list-group-item active cursorPointer';
    } else {
      return 'list-group-item cursorPointer';
    }
  }
}
