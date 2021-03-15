import { ResponseModel } from "./responseModel";

export interface ListResponseModel<TEntity> extends ResponseModel{
    data:TEntity[];
}