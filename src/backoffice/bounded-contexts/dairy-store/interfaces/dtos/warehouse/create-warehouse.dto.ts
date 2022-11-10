import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateWarehouseDTO {

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public city: string;
    
    @IsInt()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    public totalMilkBags: number;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    public fixedMilkPrice: number;
}