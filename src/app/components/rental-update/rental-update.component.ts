import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental, RentalDetail } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss'],
})
export class RentalUpdateComponent implements OnInit {
  rentalUpdateForm: FormGroup;
  rental: Rental;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService:RentalService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

  this.createRentalUpdateForm();
   this.activatedRoute.queryParams.subscribe((params) => {
     if (params.carId) {
       this.getRentalById(params.carId);
       console.log(params.carId+" paramsdan gelen id");
       
     }
   });
     
  }

  createRentalUpdateForm()
  {
    this.rentalUpdateForm = this.formBuilder.group({
      id: [""],
      carId: [""],
      customerId: ["" ],
      rentDate: [""  ],
      returnDate: ['', Validators.required],
    });
  }

  getRentalById(carId:number)
  {
    this.rentalService.getRentalById(carId).subscribe((response) => {
      this.rental = response.data;
       console.log(this.rental.carId+" rentaldan gelen veriler "+ carId+ " carId");
       this.rentalUpdateForm.setValue({
         id:this.rental.id,
         carId:this.rental.carId,
         customerId:this.rental.customerId,
         rentDate:this.rental.rentDate,
         returnDate:this.rental.returnDate

       })
       
    });
  }

  updateRental()
  {
    if (this.rentalUpdateForm.valid) {
      let rentalModel=Object.assign({},this.rentalUpdateForm.value)
      rentalModel.id=this.rental?.id;      
      this.rentalService.update(rentalModel).subscribe(response=>{
       this.toastrService.success("Araç teslim alındı.","Başarılı")
     },responseError=>{
       this.toastrService.error("Opss! Bir şeyler yanlış gitti.","Hata")
     })
      
    }else
    {
      this.toastrService.error("Form eksik","Hata")
    }
  }

}
