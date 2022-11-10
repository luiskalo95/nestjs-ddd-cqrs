import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class UpdateStoreDTO {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsOptional()
    @IsBoolean()
    public status: boolean;

    @IsOptional()
    @IsString()
    public neighborhood: string;
    
    @IsOptional()
    @IsInt()
    @IsPositive()
    @IsNumber()
    public noBagMilksToSale: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    public percentValuePerMilkBag: number;

}