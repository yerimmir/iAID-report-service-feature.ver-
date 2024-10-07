import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "@react-pdf/renderer";
import Typography from "components/atoms/Typography/Typography";
import { Table } from "components/molecules/Table/Table";
import { KeyValue } from "components/molecules/KeyValue/KeyValue";
import { setNoImage } from "modules/checkError";
import {
  IMeasurement,
  SarcopeniaResultType,
  IStatisticalAnalysis,
} from "models/sarcopenia";
import { Spacer } from "components/atoms/Spacer/Spacer";
import PropTypes from "prop-types";
import BulletPoint from "components/molecules/BulletPoint/BulletPoint";
import { ContainerPadding } from "../../../constants";

export interface SarcopeniaTableProps {
  className?: string;
  containerStyle?: object;

  targetSliceLevel?: number;
  measurement?: IMeasurement;
  statisticalAnalysis?: IStatisticalAnalysis[];
}

const styles = StyleSheet.create({
  // header
  headerContainerStyle: {
    display: "flex",
    backgroundColor: "#F1F2FF",
    width: "250px",
    height: "25px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "5px",
    paddingLeft: "10px",
    marginBottom: "5px",
  },
  headerKeyContainerStyle: {
    width: "120px",
  },
  keyContainerStyle: {
    width: "30px",
  },
  keyLabelContainerStyle: {
    width: "30px",
  },
  valueLabelContainerStyle: {
    width: "73px",
  },

  measurementTableStyle: {
    height: "180px",
    backgroundColor: "#000000",
    border: "none",
  },
  statisticalAnalysisTableStyle: {
    height: "60 px",
    // paddingTop: ContainerPadding,
    // paddingBottom: ContainerPadding,
  },
  sarcopeniaTableColumnContainerStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    width: "100px",
    alignItems: "center",
  },
  // container
  containerStyle: {
    display: "flex",
    width: "100%",
  },
});

const convertToMeasurementItems = (measurement) => {
  if (!!measurement) {
    let muscle = measurement.muscle;
    let visceralFat = measurement.visceralFat;
    let sma = measurement.sma;
    let subcutaneousFat = measurement.subcutaneousFat;

    
    // let muscleValue = muscle.value >= 0 ? muscle.value : 0; // 이전 코드. 확인을 위해 임시로 muscle -> sma로 변경함.
    let smaValue = sma.value >= 0 ? sma.value : 0; // 수정 코드
    let visceralFatValue = visceralFat.value >= 0 ? visceralFat.value : 0;
    let subcutaneousFatValue =
      subcutaneousFat.value >= 0 ? subcutaneousFat.value : 0;

    let SMA = Math.round(smaValue * 10000) / 10000 + muscle.unit;
    let VFA = Math.round(visceralFatValue * 10000) / 10000 + visceralFat.unit;
    let SFA =
      Math.round(subcutaneousFatValue * 10000) / 10000 + subcutaneousFat.unit;

    let SMAImage = sma.image ? sma.image : setNoImage();
    let VFAImage = visceralFat.image ? visceralFat.image : setNoImage();
    let SFAImage = subcutaneousFat.image ? subcutaneousFat.image : setNoImage();

    let newItems = [];
    newItems.push(
      {
        header: (
          <KeyValue
            data={{ attr: "SMA", value: SMA }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={SMAImage} />,
      },
      {
        header: (
          <KeyValue
            data={{ attr: "VFA", value: VFA }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={VFAImage} />,
      },
      {
        header: (
          <KeyValue
            data={{ attr: "SFA", value: SFA }}
            keyContainerStyle={styles.keyContainerStyle}
            keyLabelContainerStyle={styles.keyLabelContainerStyle}
            valueLabelContainerStyle={styles.valueLabelContainerStyle}
          />
        ),
        value: <Image src={SFAImage} />,
      }
    );

    return newItems;
  } else {
    return [];
  }
};
const convertToStatisticalAnalysis = (statisticalAnalysis) => {
  if (!!statisticalAnalysis) {
    let height2Tscore = statisticalAnalysis[0].tscore;
    let height2Value = statisticalAnalysis[0].value;
    let height2Result = statisticalAnalysis[0].result;
    let bmiTscore = statisticalAnalysis[1].tscore;
    let bmiValue = statisticalAnalysis[1].value;
    let bmiResult = statisticalAnalysis[1].result;

    switch (height2Result) {
      case SarcopeniaResultType.NORMAL:
        height2Result = "정상";
        break;
      case SarcopeniaResultType.SARCOPENIA:
        height2Result = "근감소증";
        break;
    }
    switch (bmiResult) {
      case SarcopeniaResultType.NORMAL:
        bmiResult = "정상";
        break;
      case SarcopeniaResultType.SARCOPENIA:
        bmiResult = "근감소증";
        break;
    }


    let newItems = [];
    newItems.push(
      {
        header: (
          <>
          <Spacer direction="col" margin="1px" />
          <View style={styles.sarcopeniaTableColumnContainerStyle}></View>
          <Spacer direction="col" margin="1px" />
          </>
        ),
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="SMA / Height²"
            ></Typography>
            <Spacer direction="row" margin="5px"></Spacer>
            <Typography
              textStylePreset="attribute_medium"
              text="SMA / BMI"
            ></Typography>
          </View>
        ),
      },
      {
        header: (
          <>
          <Spacer direction="col" margin="1px" />
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
          <Typography
              textStylePreset="attribute_medium"
              text="T-Score = -2.0 기준"
              textAlign="center"
            ></Typography>
        </View>
        <Spacer direction="col" margin="1px" />
        </>
        ),
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography text={height2Tscore} textAlign="center"></Typography>
            <Spacer direction="row" margin="5px"></Spacer>
            <Typography text={bmiTscore} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        header: (
          <>
          <Spacer direction="col" margin="1px" />
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
                textStylePreset="attribute_medium"
                text="측정 결과"
                textAlign="center"
              ></Typography>
          </View>
          <Spacer direction="col" margin="1px" />
          </>
        ),
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography text={height2Value} textAlign="center"></Typography>
            <Spacer direction="row" margin="5px"></Spacer>
            <Typography text={bmiValue} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        header: (
          <>
          <Spacer direction="col" margin="1px" />
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
                textStylePreset="attribute_medium"
                text="근감소증 여부"
                textAlign="center"
              ></Typography>
          </View>
          <Spacer direction="col" margin="1px" />
          </>
        ),
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography text={height2Result} textAlign="center"></Typography>
            <Spacer direction="row" margin="5px"></Spacer>
            <Typography text={bmiResult} textAlign="center"></Typography>
          </View>
        ),
      }
    );
    return newItems;
  } else {
    return [];
  }
};

export const SarcopeniaTable: React.FC<SarcopeniaTableProps> = (props) => {
  const L3SliceLevel = "L3 level slice number : " + `${props.targetSliceLevel}`;
  const [measurementItems, setMeasurementItems] = useState(
    convertToMeasurementItems(props.measurement)
  );
  const [statisticalAnalysisItems, setStatisticalAnalysisItems] = useState(
    convertToStatisticalAnalysis(props.statisticalAnalysis)
  );

  // measurementItems
  useEffect(() => {
    setMeasurementItems(convertToMeasurementItems(props.measurement));
  }, [props.measurement]);

  // statisticalAnalysisItems
  useEffect(() => {
    setStatisticalAnalysisItems(
      convertToStatisticalAnalysis(props.statisticalAnalysis)
    );
  }, [props.statisticalAnalysis]);

  return (
    <View style={[styles.containerStyle, props.containerStyle]}>
      {/* <BulletPoint title="복부 인공지능 분석 결과" /> */}
      <View style={styles.headerContainerStyle}>
      <Spacer direction="col" margin="3px" />
        <Typography
          text="근감소증 분석"
          textStylePreset="attribute_medium"
          containerStyle={styles.headerKeyContainerStyle}
        ></Typography>
        <Spacer direction="col" margin="1px" />
        <Typography text={L3SliceLevel}></Typography>
      </View>
      <Spacer direction="row" />
      <Table
        containerStyle={styles.measurementTableStyle}
        items={measurementItems}
      />
      <Spacer direction="row" margin="5px" />
      {/* <BulletPoint title="근감소증 분석 결과" /> */}
      <Table
        containerStyle={styles.statisticalAnalysisTableStyle}
        // valueOnly={true}
        items={statisticalAnalysisItems}
      ></Table>
    </View>
  );
};

SarcopeniaTable.defaultProps = {};
SarcopeniaTable.propTypes = {
  className: PropTypes.string,
  containerStyle: PropTypes.object,

  targetSliceLevel: PropTypes.number,
  measurement: PropTypes.any,
  statisticalAnalysis: PropTypes.any,
};
export default SarcopeniaTable;
