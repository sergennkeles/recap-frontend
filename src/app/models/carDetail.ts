
import { CarDto } from "./carDto";
import { CarImage } from "./carImage";

export interface CarDetail {
  car: CarDto;
  carImages: CarImage[];
}