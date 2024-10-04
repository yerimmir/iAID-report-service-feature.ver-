import { Type } from "class-transformer";
import {
    IsNotEmpty,
    IsInt,
    IsNumber,
    IsString,
    ValidateNested,
    IsObject,
} from "class-validator";
import { DefaultLabelDetail, ILabelDetail, LabelDetailDTO } from "./label";

// enum
export enum SarcopeniaTargetType {
    ABDOMEN = "abdomen",
}
type SarcopeniaTarget_TYPE_LIST =
    typeof SarcopeniaTargetType[keyof typeof SarcopeniaTargetType];

export enum SarcopeniaResultType {
    NORMAL = "normal",
    SARCOPENIA = "sarcopenia",
}
type SarcopeniaResult_TYPE_LIST =
    typeof SarcopeniaResultType[keyof typeof SarcopeniaResultType];

export enum StatisticalAnalysisType {
    SMA_HEIGHT2 = "sma_height2",
    MUSCLE_AGE = "muscle_age"
}
type StatisticalAnalysis_TYPE_LIST =
    typeof StatisticalAnalysisType[keyof typeof StatisticalAnalysisType];

// statistical analysis
export interface  IStatisticalAnalysis {
    type: StatisticalAnalysis_TYPE_LIST;
    tscore?: number;
    value: number;
    result?: SarcopeniaResult_TYPE_LIST;
}

export const DefaultStatisticalAnalysis: IStatisticalAnalysis[] = [{
    type: StatisticalAnalysisType.SMA_HEIGHT2,
    tscore: 0,
    value: 0,
    result: SarcopeniaResultType.NORMAL,
},{
    type: StatisticalAnalysisType.MUSCLE_AGE,
    value: 0,
}];

export class StatisticalAnalysisDTO implements IStatisticalAnalysis {
    @IsString()
    type: StatisticalAnalysis_TYPE_LIST;

    @IsNumber()
    tscore?: number;

    @IsNumber()
    value: number;

    @IsString()
    result?: SarcopeniaResult_TYPE_LIST;
}

// measurement
export interface IMeasurement {
    muscle?: ILabelDetail;
    visceralFat?: ILabelDetail;
    subcutaneousFat?: ILabelDetail;
}
export const DefaultMeasurement: IMeasurement = {
    muscle: DefaultLabelDetail,
    visceralFat: DefaultLabelDetail,
    subcutaneousFat: DefaultLabelDetail,
};
export class MeasurementDTO implements IMeasurement {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LabelDetailDTO)
    muscle?: LabelDetailDTO;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LabelDetailDTO)
    visceralFat?: LabelDetailDTO;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => LabelDetailDTO)
    subcutaneousFat?: LabelDetailDTO;
}

// sacopenia diagnosis
export interface ISarcopeniaDiagnosis {
    targetSliceLevel: number;
    measurement: IMeasurement;
    statisticalAnalysis: IStatisticalAnalysis[];
}
export class SarcopeniaDiagnosisDTO implements ISarcopeniaDiagnosis {
    @IsInt()
    targetSliceLevel: number;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => MeasurementDTO)
    measurement: MeasurementDTO;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => StatisticalAnalysisDTO)
    statisticalAnalysis: StatisticalAnalysisDTO[];
}

// sarcopenia
export interface ISarcopenia {
    target: SarcopeniaTarget_TYPE_LIST;
    date: string;
    diagnosis: ISarcopeniaDiagnosis;
}
export class SarcopeniaDTO implements ISarcopenia {
    @IsString()
    target: SarcopeniaTarget_TYPE_LIST;

    @IsString()
    date: string;

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SarcopeniaDiagnosisDTO)
    diagnosis: SarcopeniaDiagnosisDTO;
}

export interface IEvaluation {
    sarcopenia?: ISarcopenia[];
}

export class EvaluationDTO implements IEvaluation {
    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SarcopeniaDTO)
    sarcopenia?: SarcopeniaDTO[];
}
