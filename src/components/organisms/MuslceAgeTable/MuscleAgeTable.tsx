import React, { useState } from "react";
import { StyleSheet, View, Image } from "@react-pdf/renderer";
import { Spacer } from "components/atoms/Spacer/Spacer";
import { Typography } from "components/atoms/Typography/Typography";
import Arrow from "assets/svg/arrow";
import { Chart } from "assets/images/index";
import { SmaBmi } from "assets/images/index";
import BulletPoint from "components/molecules/BulletPoint/BulletPoint";
import { setNoImage } from "modules/checkError";
import { ContainerPadding } from "../../../constants";
import RightArrow from "assets/svg/right-arrow";
import { container } from "webpack";

interface MuscleAgeProps {
  id?: string;
  /**
   * 환자 나이
   */
  age: number;
  muscle_age: number;
}

const styles = StyleSheet.create({
  containerStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    border: "1px solid #D4D4D4",
    borderRadius: "10px",
    paddingTop: ContainerPadding,
    paddingBottom: ContainerPadding,
  },
  ageContainerStyle: {
    flex: 0.2,
    paddingTop: "5px",
  },
  arrowContainerStyle: {
    margin: 0,
    padding: 0,
    flex: 0.2,
    alignItems: "center",
  },
  muscleAgeContainerStyle: {
    margin: 0,
    flex: 0.2,
    paddingTop: "5px",
  },
  infoContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    flex: 0.4,
  },
  infoItemStyle: {
    flex: 1,
  },
});

// props data를 table에 사용하도록 convert
const convertToMuscleAgeInfoItems = (musleAgeInfo: MuscleAgeProps) => {
  if (!!musleAgeInfo) {
    let age = musleAgeInfo.age;
    const muscleAge = musleAgeInfo.muscle_age;
    let ageDiffernence = muscleAge - age;

    const item = [
      { attr: "주민등록나이", value: age, unit: "세" },
      { attr: "근육나이", value: muscleAge, unit: "세" },
      { attr: "나이차이", value: ageDiffernence, unit: "세" },
    ];

    return item;
  } else {
    return [];
  }
};

/**
 * 나이, 근육나이 분석 및 비교 container
 * @param props
 * @returns
 */
const MuscleAgeTable = (props: MuscleAgeProps) => {
  const [muslceAgeItems, setMusleAgeItems] = useState(
    convertToMuscleAgeInfoItems(props)
  );
  const [image, setImage] = useState(SmaBmi ? SmaBmi : setNoImage());

  return (
    <>
      <View>
        <BulletPoint title="근육나이 분석 결과" />
      </View>
      <View id="container" style={styles.containerStyle}>
        <View id="container-item" style={styles.ageContainerStyle}>
          <Typography
            textStylePreset="attribute_medium"
            text={muslceAgeItems[0].attr}
            textAlign="center"
          ></Typography>
          <Spacer direction="row" margin="17px"></Spacer>
          <View id="infoContainer">
            <Typography
              className="age-item-row"
              textStylePreset="caption"
              text={muslceAgeItems[0].value}
              textAlign="right"
              containerStyle={styles.infoItemStyle}
              textStyle={
                String(muslceAgeItems[0].value).length > 2
                  ? { color: "#000000", fontSize: "40px" }
                  : { color: "#000000", fontSize: "45px" }
              }
            ></Typography>
            <Typography
              className="age-item-row"
              text={muslceAgeItems[0].unit}
              textAlign="right"
              textStyle={{ fontWeight: "bold", fontSize: "14px" }}
              containerStyle={
                (styles.infoItemStyle,
                { paddingLeft: "75px", paddingTop: "30px" })
              }
            ></Typography>
          </View>
        </View>
        <Spacer direction="col" margin="5px"></Spacer>
        <View id="container-item" style={styles.arrowContainerStyle}>
          <RightArrow difference={muslceAgeItems[2].value} />
        </View>
        <Spacer direction="col" margin="5px"></Spacer>
        <View
          id="container-item muscleAge-container"
          style={styles.muscleAgeContainerStyle}
        >
          <Typography
            className="muscleAge-item"
            textStylePreset="attribute_medium"
            text={muslceAgeItems[1].attr}
            textAlign="right"
            textStyle={{ marginRight: "5px" }}
          ></Typography>
          <Spacer direction="row" margin="17px"></Spacer>
          <View id="infoContainer">
            <Typography
              className="muscleAge-item-row"
              textStylePreset="caption"
              text={muslceAgeItems[1].value}
              textAlign="right"
              textStyle={
                String(muslceAgeItems[1].value).length > 2
                  ? { color: "#000000", fontSize: "40px" }
                  : { color: "#000000", fontSize: "45px" }
              }
              containerStyle={styles.infoItemStyle}
            ></Typography>
            <Typography
              className="muscleAge-item-row"
              text={muslceAgeItems[1].unit}
              textAlign="right"
              textStyle={{ fontWeight: "bold", fontSize: "14px" }}
              containerStyle={
                (styles.infoItemStyle,
                { paddingLeft: "75px", paddingTop: "30px" })
              }
            ></Typography>
          </View>
        </View>
        <Spacer direction="col" margin="2px" />
        <Image
          src={image}
          style={
            (styles.imageStyle, { width: "180px", height: "115px", padding: 0 })
          }
        />
      </View>
    </>
  );
};

export default MuscleAgeTable;
