import { IsBoolean, IsEnum, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { DEMAND_TYPE } from '../../../domain/aggregates/warehouse/warehouse';

export class UpdateWarehouseDTO {

    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public city: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @IsNumber()
    public totalMilkBags: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    public fixedMilkPrice: number;

    @IsOptional()
    @IsBoolean()
    public status: boolean;

    @IsOptional()
    @IsNumber()
    public totalProfits: number;

    @IsOptional()
    @IsPositive()
    @IsInt()
    @IsNumber()
    public noBranchesSubscribed: number;

    @IsOptional()
    @IsIn(["LOW", "HIGH"])
    public demand: DEMAND_TYPE;

}