import React, { Component } from "react";
import Report from "components/pages/Report";
import { IPersonalInfo, GenderType } from "models/personalInfo";
import {
  IEvaluation,
  ISarcopenia,
  SarcopeniaResultType,
  SarcopeniaTargetType,
  StatisticalAnalysisType,
} from "models/sarcopenia";
import { DefaultLabelDetail } from "models/label";
import {
  AnalysisResultImage_SFA,
  AnalysisResultImage_SMA,
  AnalysisResultImage_VFA,
} from "assets/images";
import { Document, Page, PDFViewer } from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

export const App: React.FC = (props) => {
  const title = "Body-inside";

  // client side 화면 출력 위한 데이터 생성
  const personalInfo: IPersonalInfo = {
    name: "dfdfdfkjdkfjkleglekgjalkgj",
    age: 36,
    gender: GenderType.M,
    height: 180,
    weight: -80,
    qrcode: ''
  };
  const evaluations: IEvaluation[] = [
    {
      sarcopenia: [
        {
          date: "2022.12.01",
          target: SarcopeniaTargetType.ABDOMEN,
          diagnosis: {
            targetSliceLevel: 1,
            measurement: {
              muscle: {
                ...DefaultLabelDetail,
                value: 182.1,
                unit: "cm²",
                image: AnalysisResultImage_SMA,
              },
              visceralFat: {
                ...DefaultLabelDetail,
                value: 103.6,
                unit: "cm²",
                image: AnalysisResultImage_VFA,
              },
              subcutaneousFat: {
                ...DefaultLabelDetail,
                value: 57.64,
                unit: "cm²",
                image: AnalysisResultImage_SFA,
              },
            },
          statisticalAnalysis: [{
              type: StatisticalAnalysisType.SMA_HEIGHT2,
              tscore: 39.8,
              value: 40.5,
              result: SarcopeniaResultType.NORMAL
            },
            {
              type: StatisticalAnalysisType.MUSCLE_AGE,
              value: 31
            },
          ]
          },
        },
        {
          date: "2022.12.02",
          target: SarcopeniaTargetType.ABDOMEN,
          diagnosis: {
            targetSliceLevel: 1,
            measurement: {
              muscle: {
                ...DefaultLabelDetail,
                value: 182.1,
                unit: "cm²",
                image: AnalysisResultImage_SMA,
              },
              visceralFat: {
                ...DefaultLabelDetail,
                value: 103.6,
                unit: "cm²",
                image: AnalysisResultImage_VFA,
              },
              subcutaneousFat: {
                ...DefaultLabelDetail,
                value: 57.64,
                unit: "cm²",
                image: AnalysisResultImage_SFA,
              },
            },
            statisticalAnalysis: [{
              type: StatisticalAnalysisType.SMA_HEIGHT2,
              tscore: 39.8,
              value: 40.5,
              result: SarcopeniaResultType.NORMAL
            },
            {
              type: StatisticalAnalysisType.MUSCLE_AGE,
              value: 31
            }
          ]
          },
        },
        {
          date: "2022.12.20",
          target: SarcopeniaTargetType.ABDOMEN,
          diagnosis: {
            targetSliceLevel: 1,
            measurement: {
              muscle: {
                ...DefaultLabelDetail,
                value: 182.1,
                unit: "cm²",
                image: AnalysisResultImage_SMA,
              },
              visceralFat: {
                ...DefaultLabelDetail,
                value: 103.6,
                unit: "cm²",
                image: AnalysisResultImage_VFA,
              },
              subcutaneousFat: {
                ...DefaultLabelDetail,
                value: 57.64,
                unit: "cm²",
                image: AnalysisResultImage_SFA,
              },
            },
            statisticalAnalysis: [{
              type: StatisticalAnalysisType.SMA_HEIGHT2,
              tscore: 39.8,
              value: 40.5,
              result: SarcopeniaResultType.NORMAL
            },
            {
              type: StatisticalAnalysisType.MUSCLE_AGE,
              value: 31
            }
          ]
          },
        },
        {
          date: "2022.12.31",
          target: SarcopeniaTargetType.ABDOMEN,
          diagnosis: {
            targetSliceLevel: 1,
            measurement: {
              muscle: {
                ...DefaultLabelDetail,
                value: 182.1,
                unit: "cm²",
                image: AnalysisResultImage_SMA,
              },
              visceralFat: {
                ...DefaultLabelDetail,
                value: 103.6,
                unit: "cm²",
                image: AnalysisResultImage_VFA,
              },
              subcutaneousFat: {
                ...DefaultLabelDetail,
                value: 57.64,
                unit: "cm²",
                image: AnalysisResultImage_SFA,
              },
            },
            statisticalAnalysis: [{
              type: StatisticalAnalysisType.SMA_HEIGHT2,
              tscore: 39.8,
              value: 40.5,
              result: SarcopeniaResultType.NORMAL
            },
            {
              type: StatisticalAnalysisType.MUSCLE_AGE,
              value: 31
            }
          ]
          },
        },
        {
          date: "2023.01.02",
          target: SarcopeniaTargetType.ABDOMEN,
          diagnosis: {
            targetSliceLevel: 1,
            measurement: {
              muscle: {
                ...DefaultLabelDetail,
                value: 230.90854,
                unit: "cm²",
                image: AnalysisResultImage_SMA,
              },
              visceralFat: {
                ...DefaultLabelDetail,
                value: 150.45648,
                unit: "cm²",
                image: AnalysisResultImage_VFA,
              },
              subcutaneousFat: {
                ...DefaultLabelDetail,
                value: 30.78687,
                unit: "cm²",
                image: AnalysisResultImage_SFA,
              },
            },
            statisticalAnalysis: [{
              type: StatisticalAnalysisType.SMA_HEIGHT2,
              tscore: 39.8,
              value: 40.5,
              result: SarcopeniaResultType.NORMAL
            },
            {
              type: StatisticalAnalysisType.MUSCLE_AGE,
              value: 31
            },
            {
              type: StatisticalAnalysisType.SMA_BMI,
              tscore: 4.97,
              value: 5.6,
              result: SarcopeniaResultType.NORMAL
          }
          ]
          },
        },
      ],
    },
  ];

  if (process.env.APP_TARGET === "wds") {
    console.log("client");
    // client side rendering //

    console.log(evaluations);
    return (
      <PDFViewer width={PDFStyle.viewer.width} height={PDFStyle.viewer.height}>
        <Document>
          <Page size={"A4"} style={PDFStyle.page}>
            <Report
              title={title}
              personalInfo={personalInfo}
              evaluations={evaluations}
            />
          </Page>
        </Document>
      </PDFViewer>
    );
  } else {
    console.log("server");
    // server side rendering //
    return (
      <Document>
        <Page size={"A4"} style={PDFStyle.page}>
          <Report
            title={title}
            personalInfo={personalInfo}
            evaluations={evaluations}
          />
        </Page>
      </Document>
    );
  }
};
