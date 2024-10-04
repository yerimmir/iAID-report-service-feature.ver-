import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  Font,
  Text as RPText,
} from "@react-pdf/renderer";

import Typography from "components/atoms/Typography/Typography";
import ListView from "components/molecules/ListView/ListView";

import { Chart2ReactPDFSVG } from "components/atoms/Rechart/Chart";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Text,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import font from "assets/fonts/malgun_base64/MalgunGothicRegular.ttf";
import BulletPoint from "components/molecules/BulletPoint/BulletPoint";
import { logger } from "middleware/logger";
import { ContainerPadding } from "../../../constants";

// rechart (https://recharts.org/en-US/examples)
// https://github.com/diegomura/react-pdf/issues/669 (https://gist.github.com/kidroca/19e5fe2de8e24aa92a41e94f2d41eda4)
// https://stackoverflow.com/questions/45086005/recharts-component-to-png

// react-d3-library (https://github.com/react-d3-library/react-d3-library)

// chart.js (https://github.com/chartjs/Chart.js)
// react용 (https://www.npmjs.com/package/react-chartjs-2)

// Font.register({
//   family: "MalgunGothicRegular",
//   fonts: [{ src: font }, { src: font, fontWeight: 700 }],
// });

Font.register({
  family: "MalgunGothic",
  fonts: [{ src: font }, { src: font, fontWeight: 700 }],
});


export interface TimelineProps {
  className?: string;
  containerStyle?: object;

  graphDatas?: any[];
  tableAttrs?: string[];
  tableItemDatas?: any[];
  itemsInRow?: number;
}

const styles = StyleSheet.create({
  // image
  imageStyle: {
    maxWidth: 130,
    maxHeight: 200,
  },
  imageItemStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  imageContainerStyle: {
    width: "83%",
  },
  imageSectionStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: "10px",
  },

  // table
  tableHeaderStyle: {
    color: "#053791",
    textAlign: "center",
  },
  tableHeaderContainerStyle: {
    width: "15%",
  },
  tableSectionStyle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: "5px",
    marginLeft: ContainerPadding,
  },
  // ※ Chart 가로 길이는 추후에 확인 필요 (현재 가로 700px, marginLeft 50으로 고정) (21.06.10)
  // chart margin이 0인데도 불구하고, 오른쪽으로 살짝 밀려서 나옴
  // chart container인 graphSectionStyle의 가로 길이나, jusityfyContent 등의 문제는 아닌것으로 추정
  // (21.06.10) - yAxis의 width로 추정

  // graph
  graphSectionStyle: {
    margin: 0,
    width: "100%",
  },
  graphTextStyle: {
    fontFamily: "MalgunGothicRegular",
    fontSize: "11px",
    textAlign: "right",
    paddingBottom: "3px",
  },
  graphLabelStyle: {
    width: "10%",
    marginTop: "12px",
  },
  topSectionStyle: {
    display: "flex",
    flexDirection: "row",
  },

  // footer
  footerLineStyle: {
    height: "5px",
  },
  footerLineLeftStyle: {
    width: "0%",
  },
  footerLineRightStyle: {
    width: "100%",
  },
  footerSectionStyle: {
    position: "absolute",
    bottom: 0,
  },

  // container
  containerStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",

    borderRadius: "10px",
    borderColor: "#D4D4D4",
    borderWidth: "1px",
    paddingTop: "2px",
    paddingBottom: ContainerPadding,
  },
});

/**
 * patient의 data를 이용해 그래프 그리는 컴포넌트
 * @param props 
 * @returns 
 */
export const Timeline: React.FC<TimelineProps> = (props) => {
  const newContainerStyle = styles.containerStyle;
  const graphDatas = props.graphDatas;
  const tableAttrs = props.tableAttrs;
  const tableItemDatas = props.tableItemDatas;
  const itemsInRow = props.itemsInRow;

  /**
   * @HACK
   */
  const isSyncGraqphRendering = process.env.APP_TARGET !== "wds";

  const renderCustomLabel = (value, x, y) => {
    return (
      <RPText style={styles.graphTextStyle} x={x} y={y}>
        {value}
      </RPText>
    );
  };

  /** 그래프 데이터가 1개일 때, 그래프 위치 조정을 위해 scale 변경하는 함수 */
  function setScale() {
    return itemsInRow === 1 ? "ordinal" : "band";
  }

  return (
    <>
      <BulletPoint title="Time-line" />
      <View style={newContainerStyle}>
        <View style={styles.topSectionStyle}>
          <View style={styles.graphLabelStyle}>
            {renderCustomLabel("200", 0, 0)}
            {renderCustomLabel("150", 0, 25)}
            {renderCustomLabel("100", 0, 100)}
            {renderCustomLabel("50", 0, 150)}
            {renderCustomLabel("0", 0, 200)}
          </View>
          <View style={styles.graphSectionStyle}>
            <Chart2ReactPDFSVG
              width={500}
              height={100}
              sync={isSyncGraqphRendering}
            >
              <ComposedChart
                width={480}
                height={120}
                data={graphDatas}
                margin={{
                  top: 20,
                  right: -20,
                  left: 20,
                }}
              >
                <XAxis
                  tick={false}
                  padding={{ left: 0, right: 0 }}
                  scale={setScale()}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="Y"
                  domain={[0, 200]}
                  width={0}
                  axisLine={false}
                />
                <ReferenceLine yAxisId="Y" y={0} stroke="#B3B3B3" />
                <ReferenceLine yAxisId="Y" y={50} stroke="#B3B3B3" />
                <ReferenceLine yAxisId="Y" y={100} stroke="#B3B3B3" />
                <ReferenceLine yAxisId="Y" y={150} stroke="#B3B3B3" />
                <ReferenceLine yAxisId="Y" y={200} stroke="#B3B3B3" />
                <Line
                  yAxisId="Y"
                  type="monotone"
                  dataKey="muscle"
                  isAnimationActive={false}
                  stroke="#AC2425"
                  fill="#AC2425"
                  dot={{ r: 3.5 }}
                />
                <Line
                  yAxisId="Y"
                  type="monotone"
                  dataKey="visceralFat"
                  isAnimationActive={false}
                  stroke="#190F2D"
                  fill="#190F2D"
                  dot={{ r: 3.5 }}
                />
                <Line
                  yAxisId="Y"
                  type="monotone"
                  dataKey="subcutaneousFat"
                  isAnimationActive={false}
                  stroke="#341310"
                  fill="#341310"
                  dot={{ r: 3.5 }}
                />
              </ComposedChart>
            </Chart2ReactPDFSVG>
          </View>
        </View>
        <View style={styles.tableSectionStyle}>
          <ListView
            items={tableItemDatas}
            itemsInRow={itemsInRow}
            renderItem={(props) => {
              return <Typography text={props} textAlign={"center"} />;
            }}
            headerItems={tableAttrs}
            headerDirection="column"
            renderHeaderItem={(props) => {
              return (
                <Typography text={props} textStyle={styles.tableHeaderStyle} />
              );
            }}
            headerContainerStyle={styles.tableHeaderContainerStyle}
            itemContainerStyle={{ marginRight: "9px" }}
          />
        </View>
      </View>
    </>
  );
};

export default Timeline;
