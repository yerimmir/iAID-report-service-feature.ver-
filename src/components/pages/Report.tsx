import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Document,
  Page,
  PDFViewer,
  Text,
} from "@react-pdf/renderer";
import PDFStyle from "assets/PDFStyle";

import { Splitter } from "components/molecules/Splitter/Splitter";
import Typography from "components/atoms/Typography/Typography";
import { PersonalInfo } from "components/organisms/PersonalInfo/PersonalInfo";
import { IPersonalInfo } from "models/personalInfo";

import {
  ISarcopenia,
  IEvaluation,
  DefaultMeasurement,
  DefaultStatisticalAnalysis,
  StatisticalAnalysisType,
  SarcopeniaResultType,
} from "models/sarcopenia";
import { Spacer } from "components/atoms/Spacer/Spacer";
import PropTypes from "prop-types";
import SarcopeniaTable from "components/organisms/SarcopeniaTable/SarcopeniaTable";

import MuscleAgeTable from "components/organisms/MuslceAgeTable/MuscleAgeTable";
import Timeline from "components/organisms/Timeline/Timeline";
import QRCode from "../../assets/images/qrcode_link-to-pdf.png"

export interface ReportProps {
  /**
   * classname
   */
  className?: string;
  /**
   * style
   */
  containerStyle?: object;
  /**
   * report title
   */
  title?: string;
  personalInfo?: IPersonalInfo;
  evaluations?: IEvaluation[];
}

const styles = StyleSheet.create({
  // header
  headerSectionStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",

    // marginBottom: "10px",
  },
  headerTopSectionStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
  },
  headerTitleContainerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "10px",
    // marginBottom : "10px"
  },

  // main
  mainSectionSytle: {
    display: "flex",
    padding: "5px",
  },

  footerSectionStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "450px",
  },

  // container
  containerStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    alignContent: "space-between",
    textAlign: "center",
  },
});

/**
 * report 생성 컴포넌트
 * @param props
 * @returns
 */
export const Report: React.FC<ReportProps> = (props) => {
  const title = props.title;
  const personalInfo = props.personalInfo;

  const sarcopeniaDatas = props.evaluations[props.evaluations.length - 1]["sarcopenia"];
  sarcopeniaDatas.splice(0, sarcopeniaDatas.length - 4); // 최근 4개만 출력되도록 설정, 현재 그래프에 1개만 출력하므로, 사용 x
  const recentData = sarcopeniaDatas[sarcopeniaDatas.length - 1];
  const targetSliceLevel = recentData.diagnosis.targetSliceLevel;
  const measurement = recentData.diagnosis.measurement;
  const sma_height2 = recentData.diagnosis.statisticalAnalysis[0];
  const muscle_age = recentData.diagnosis.statisticalAnalysis[1].value
  const sma_bmi = recentData.diagnosis.statisticalAnalysis[2];

  // console.log("evaluation1",props.evaluations[0]["sarcopenia"][0].diagnosis.measurement);
  console.log("evaluation2",props.evaluations[0]["sarcopenia"][0].diagnosis.statisticalAnalysis);
  console.log("sliceLevel", targetSliceLevel)
  /**
   * graph에 맞는 data 넘겨주기
   */
  const graphDatas = sarcopeniaDatas.map((s) => {
    let date = s.date;
    let muscle =
      s.diagnosis.measurement.muscle.value >= 0
        ? s.diagnosis.measurement.muscle.value >= 200
          ? 200
          : s.diagnosis.measurement.muscle.value
        : 0;
    let visceralFat =
      s.diagnosis.measurement.visceralFat.value >= 0
        ? s.diagnosis.measurement.visceralFat.value >= 200
          ? 200
          : s.diagnosis.measurement.visceralFat.value
        : 0;
    let subcutaneousFat =
      s.diagnosis.measurement.subcutaneousFat.value >= 0
        ? s.diagnosis.measurement.subcutaneousFat.value >= 200
          ? 200
          : s.diagnosis.measurement.subcutaneousFat.value
        : 0;
    return {
      date: date,
      muscle: muscle,
      visceralFat: visceralFat,
      subcutaneousFat: subcutaneousFat,
    };
  });

  const tableAttrs = ["측정일자", "복부근육", "내장지방", "피하지방"];
  const tableItemDatas = [
    ...sarcopeniaDatas.map((s) => { 
      return s.date;
    }),
    ...sarcopeniaDatas.map((s) => {
      let muscle =
        s.diagnosis.measurement.muscle.value >= 0
          ? Math.round(s.diagnosis.measurement.muscle.value * 10) / 10
          : 0;
      return muscle + s.diagnosis.measurement.muscle.unit;
    }),
    ...sarcopeniaDatas.map((s) => {
      let visceralFat =
        s.diagnosis.measurement.visceralFat.value >= 0
          ? Math.round(s.diagnosis.measurement.visceralFat.value * 10) / 10
          : 0;
      return visceralFat + s.diagnosis.measurement.visceralFat.unit;
    }),
    ...sarcopeniaDatas.map((s) => {
      let subcutaneousFat =
        s.diagnosis.measurement.subcutaneousFat.value >= 0
          ? Math.round(s.diagnosis.measurement.subcutaneousFat.value * 10) / 10
          : 0;
      return subcutaneousFat + s.diagnosis.measurement.subcutaneousFat.unit;
    }),
  ];

  console.log("tableItemDatas ", tableItemDatas);

  const itemsInRow = sarcopeniaDatas.length;

  return (
    <View style={[styles.containerStyle, props.containerStyle]}>
      <View style={styles.headerSectionStyle}>
        <View style={styles.headerTopSectionStyle}>
          <Typography
            text={title}
            textStylePreset={"caption"}
            containerStyle={(styles.headerTitleContainerStyle, { flex: 3 })}
          />
          <PersonalInfo
            personalInfo={personalInfo}
            containerStyle={{ flex: 3.5 }}
          />
        </View>
        <Splitter />
      </View>
      <View style={styles.mainSectionSytle}>
        <SarcopeniaTable
          targetSliceLevel={targetSliceLevel}
          measurement={measurement}
          statisticalAnalysis={[sma_height2, sma_bmi]}
        ></SarcopeniaTable>
        <Spacer direction="row" margin="5px" />
        {/* <MuscleAgeTable
          age={personalInfo.age >= 0 ? personalInfo.age : 0}
          muscle_age={muscle_age}
        ></MuscleAgeTable>
        <Spacer direction="row" margin="5px" />
        <Timeline
          graphDatas={graphDatas}
          tableAttrs={tableAttrs}
          tableItemDatas={tableItemDatas}
          itemsInRow={itemsInRow}
        /> */}
      </View>
      <View style={styles.footerSectionStyle}>
        <Splitter lineLeftStyle={{width: '0'}} lineRightStyle={{width: "100%"}}/>
      </View>
    </View>
  );
};

Report.defaultProps = {
  title: "Body-inside",
};
Report.propTypes = {
  className: PropTypes.string,
  containerStyle: PropTypes.object,

  title: PropTypes.string,
  personalInfo: PropTypes.any,
  evaluations: PropTypes.any,
};
export default Report;
