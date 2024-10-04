import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

// label
export interface ILabel {
  value: number;
  unit: string;
}
export const DefaultLabel: ILabel = {
  value: 0,
  unit: "",
};
export class LabelDTO implements ILabel {
  @IsInt()
  value: number;

  @IsString()
  unit: string;
}

// labelDetail
export interface ILabelDetail extends ILabel {
  score?: number;
  idealValue?: number;
  result?: string;
  stdRangeMin?: number;
  stdRangeMax?: number;
  min?: number;
  max?: number;
  color?: string;
  description?: string;
  image?: string;
}
export const DefaultLabelDetail: ILabelDetail = {
  value: 0,
  unit: "",
  score: 0,
  idealValue: 0,
  result: "",
  stdRangeMin: 0,
  stdRangeMax: 0,
  min: 0,
  max: 0,
  color: "",
  description: "",
  image: "",
};
export class LabelDetailDTO implements ILabelDetail {
  @IsNumber()
  value: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsInt()
  score?: number;

  @IsOptional()
  @IsInt()
  idealValue?: number;

  @IsOptional()
  @IsString()
  result?: string;

  @IsOptional()
  @IsNumber()
  stdRangeMin?: number;

  @IsOptional()
  @IsNumber()
  stdRangeMax?: number;

  @IsOptional()
  @IsNumber()
  min?: number;

  @IsOptional()
  @IsNumber()
  max?: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
