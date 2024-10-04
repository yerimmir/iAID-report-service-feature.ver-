import { Image, StyleSheet, View } from "@react-pdf/renderer";
import { Spacer } from "components/atoms/Spacer/Spacer";
import Typography from "components/atoms/Typography/Typography";
import BulletPoint from "components/molecules/BulletPoint/BulletPoint";
import { KeyValue } from "components/molecules/KeyValue/KeyValue";
import { Table } from "components/molecules/Table/Table";
import {
  IMeasurement,
  IStatisticalAnalysis,
  SarcopeniaResultType,
} from "models/sarcopenia";
import { setNoImage } from "modules/checkError";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { ContainerPadding } from "../../../constants";

export interface SarcopeniaTableProps {
  className?: string;
  containerStyle?: object;

  targetSliceLevel?: number;
  measurement?: IMeasurement;
  statisticalAnalysis?: IStatisticalAnalysis;
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
    paddingTop: ContainerPadding,
    paddingBottom: ContainerPadding,
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

    let SMAImage = muscle.image ? muscle.image : setNoImage();
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
    let tscore = statisticalAnalysis.tscore;
    let value = statisticalAnalysis.value;
    let result = statisticalAnalysis.result;

    switch (result) {
      case SarcopeniaResultType.NORMAL:
        result = "정상";
        break;
      case SarcopeniaResultType.SARCOPENIA:
        result = "근감소증";
        break;
    }

    let newItems = [];
    newItems.push(
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text=" "
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography
              textStylePreset="attribute_medium"
              text="SMA / Height²"
            ></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="T-Score = -2.0"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={tscore} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="측정 결과"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={value} textAlign="center"></Typography>
          </View>
        ),
      },
      {
        value: (
          <View style={styles.sarcopeniaTableColumnContainerStyle}>
            <Typography
              textStylePreset="attribute_medium"
              text="근감소증 여부"
              textAlign="center"
            ></Typography>
            <Spacer direction="row" margin="10px"></Spacer>
            <Typography text={result} textAlign="center"></Typography>
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
      <BulletPoint title="복부 인공지능 분석 결과" />
      {/* <View style={styles.headerContainerStyle}>
        <Typography
          text="근감소증 분석"
          textStylePreset="attribute_medium"
          containerStyle={styles.headerKeyContainerStyle}
        ></Typography>
        <Spacer direction="col" margin="1px" />
        <Typography text={L3SliceLevel}></Typography>
      </View>
      <Spacer direction="row" /> */}
      <Table
        containerStyle={styles.measurementTableStyle}
        items={measurementItems}
      />
      <Spacer direction="row" margin="5px" />
      <BulletPoint title="근감소증 분석 결과" />
      <Table
        containerStyle={styles.statisticalAnalysisTableStyle}
        valueOnly={true}
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
