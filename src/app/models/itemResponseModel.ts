import { ResponseModel } from "./responseModel";

export interface ItemResponseModel<TEntity> extends ResponseModel{
    data:TEntity
}