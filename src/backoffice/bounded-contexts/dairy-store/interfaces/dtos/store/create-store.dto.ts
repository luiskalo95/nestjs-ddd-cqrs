import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateStoreDTO {

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    public warehouseAssociatedID: string;

    @IsString()
    @IsNotEmpty()
    public neighborhood: string;
    
    @IsInt()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    public noBagMilksToSale: number;

}