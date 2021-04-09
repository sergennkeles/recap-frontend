import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {
  colors: Color[] = [];
  dataLoaded = false;
  constructor(private colorService: ColorService, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  delete(color:Color)
  {
    console.log(color);
    
    this.colorService.delete(color).subscribe();
    this.toastrService.info(color.colorName+" Silindi.","Başarılı")

  }
}
