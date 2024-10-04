import { IsInt, IsString } from "class-validator";

export enum GenderType {
  M = "Male",
  F = "Female",
}
type GENDER_TYPE_LIST = typeof GenderType[keyof typeof GenderType];

// personal Info
export interface IPersonalInfo {
  name: string;
  age: number;
  gender: GENDER_TYPE_LIST;
  height: number;
  weight: number;
}
export class PersonalInfoDTO implements IPersonalInfo {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  gender: GENDER_TYPE_LIST;

  @IsInt()
  height: number;

  @IsInt()
  weight: number;
}
