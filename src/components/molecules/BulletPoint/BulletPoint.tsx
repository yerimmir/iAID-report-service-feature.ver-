import Typhography from "components/atoms/Typography/Typography";
import { StyleSheet, View } from "@react-pdf/renderer";
import Splitter from "../Splitter/Splitter";
import React from "react";
import { Spacer } from "components/atoms/Spacer/Spacer";

/**
 * 스타일 지정
 */
const styles = StyleSheet.create({
  containerStyle: {
    display: "flex",
    flexDirection: "row",
  },
  // title
  titleStyle: {
    fontSize: "15px",
    fontWeight: "bold",
    margin: "auto 0",
  },
  titleContainerStyle: {
    // marginBottom: "7px",
  },
  // 글머리 기호
  bulletStyle: {
    width: "5px",
    height: "20px",
    backgroundColor: "gray",
    marginRight: "10px",
    marginTop: "3px",
  },
});

/**
 * 제목 앞 글머리 기호
 * @param props 
 * @returns 
 */
const BulletPoint = (props) => {
  const { title = "" } = props;
  return (
    <>
      <Spacer direction="row" margin="7px" />
      <View style={styles.containerStyle}>
        <View style={styles.bulletStyle}></View>
        <Typhography
          text={title}
          textStyle={styles.titleStyle}
          containerStyle={styles.titleContainerStyle}
        ></Typhography>
      </View>
      <Spacer direction="row" margin="7px" />
    </>
  );
};

export default BulletPoint;
