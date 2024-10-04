import React, { Component, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "@react-pdf/renderer";
import PropTypes from "prop-types";

import ListView from "components/molecules/ListView/ListView";
import KeyValue from "components/molecules/KeyValue/KeyValue";

import { GenderType, IPersonalInfo } from "models/personalInfo";

export interface PersonalInfoProps {
  /**
   * classname
   */
  className?: string;
  personalInfo?: IPersonalInfo;
  QRImage?: string; // Img Component를 밖에서 그리도록 (renderItem)
  containerStyle?: object;
}

const styles = StyleSheet.create({
  //
  keyLabelStyle: {},
  keyLabelContainerStyle: {
    width: "25px",
  },
  keyContainerStyle: {
    width: "25px",
  },
  valueLabelStyle: {
    textAlign: "left",
  },
  valueLabelContainerStyle: {
    // personalinfo value 값 너비 조정
    width: "100px",
  },
  valueContainerStyle: { width: "40" },
  keyValueContainerStyle: {
    width: "90px",
  },

  personalInfoContainerStyle: {
    display: "flex",
    width: "200px",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  infoContainerStyle: {
    display: "flex",
    // width: "300px",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  //
  QRImageStyle: {
    width: "55px",
    height: "55px",
  },
  QRContainerStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",

    marginLeft: "20px",
  },

  // container
  containerStyle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

// props data를 아래 컴포넌트에 사용할 수 있도록 convert
const convertToPersonalInfoItems = (personalInfo) => {
  function getName(name: string) {
    let value = "";
    for (let i = 0; i <= Math.ceil(name.length / 5); i++) {
      let num = i >= 1 ? i * 5 : i;
      value += name.substring(num, 5 * (i + 1)) + "\n";
    }
    return value;
  }
  if (!!personalInfo) {
    let name =
      personalInfo.name.length < 8
        ? personalInfo.name
        : personalInfo.name.substring(0, 6) + "...";

    let age = personalInfo.age >= 0 ? personalInfo.age : 0;
    let gender = personalInfo.gender;
    let height =
      personalInfo.height >= 0 ? personalInfo.height + " cm" : 0 + "cm";
    let weight =
      personalInfo.weight >= 0 ? personalInfo.weight + " kg" : 0 + "kg";

    switch (gender) {
      case GenderType.M:
        gender = "남";
        break;
      case GenderType.F:
        gender = "여";
        break;
    }

    const item = [
      { attr: "이름", value: name },
      { attr: "나이", value: age },
      { attr: "성별", value: gender },
      { attr: "키", value: height },
      { attr: "체중", value: weight },
    ];

    return item;
  } else {
    return [];
  }
};

/**
 * report 상단 patient 정보 나타내는 컴포넌트
 * @param props 
 * @returns 
 */
export const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  const [personalInfoItems, setPersonalInfoItems] = useState(
    convertToPersonalInfoItems(props.personalInfo)
  );

  useEffect(() => {
    setPersonalInfoItems(convertToPersonalInfoItems(props.personalInfo));
  }, [props.personalInfo]);

  const renderItem = (data) => {
    return (
      <KeyValue
        data={data}
        containerStyle={styles.keyValueContainerStyle}
        keyLabelContainerStyle={styles.keyLabelContainerStyle}
        keyContainerStyle={styles.keyContainerStyle}
        valueLabelContainerStyle={styles.valueLabelContainerStyle}
        valueLabelStyle={styles.valueLabelStyle}
      />
    );
  };

  return (
    <View style={[styles.containerStyle, props.containerStyle]}>
      <View style={styles.infoContainerStyle}>
        <ListView
          items={personalInfoItems}
          itemsInRow={3}
          renderItem={renderItem}
          containerStyle={{ justifyContent: "flex-start", workBreak: "keep-all" }}
        />
      </View>
    </View>
  );
};

PersonalInfo.defaultProps = {};
PersonalInfo.propTypes = {
  className: PropTypes.string,
  personalInfo: PropTypes.any,
  QRImage: PropTypes.string, // Img Component를 밖에서 그리도록 (renderItem)
  containerStyle: PropTypes.object,
};

export default PersonalInfo;
